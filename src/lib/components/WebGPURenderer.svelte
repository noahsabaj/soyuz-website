<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { soyuzTheme } from '$lib/theme.generated';

	// Props
	let {
		wgslCode = '',
		onError = () => {}
	}: {
		wgslCode?: string;
		onError?: (msg: string, kind?: 'unavailable' | 'shader') => void;
	} = $props();

	// State
	let canvas: HTMLCanvasElement;
	let gpuSupported = $state(true);
	let errorMessage = $state('');
	let isInitialized = $state(false);

	// WebGPU resources
	let device: GPUDevice | null = null;
	let context: GPUCanvasContext | null = null;
	let pipeline: GPURenderPipeline | null = null;
	let uniformBuffer: GPUBuffer | null = null;
	let envUniformBuffer: GPUBuffer | null = null;
	let bindGroup: GPUBindGroup | null = null;
	let animationFrameId: number | null = null;

	// Camera state
	let cameraDistance = 3.0;
	let cameraTheta = 0.5;
	let cameraPhi = 0.4;
	let isDragging = false;
	let lastMouseX = 0;
	let lastMouseY = 0;

	// Time tracking
	let startTime = 0;

	// Performance: Cached values
	let cachedWidth = 0;
	let cachedHeight = 0;
	let devicePixelRatio = 1;
	let resizeObserver: ResizeObserver | null = null;
	let needsResize = true;
	let envUniformsWritten = false;

	// Performance: Reusable buffers (created once)
	const UNIFORM_SIZE = 144;
	const ENV_UNIFORM_SIZE = 128;
	let uniformArrayBuffer: ArrayBuffer | null = null;
	let uniformDataView: DataView | null = null;
	let envArrayBuffer: ArrayBuffer | null = null;
	let envDataView: DataView | null = null;

	onMount(async () => {
		if (!navigator.gpu) {
			gpuSupported = false;
			errorMessage = 'WebGPU is not supported in this browser';
			onError(errorMessage, 'unavailable');
			return;
		}

		// Cache DPR
		devicePixelRatio = window.devicePixelRatio || 1;

		// Create reusable buffers once
		uniformArrayBuffer = new ArrayBuffer(UNIFORM_SIZE);
		uniformDataView = new DataView(uniformArrayBuffer);
		envArrayBuffer = new ArrayBuffer(ENV_UNIFORM_SIZE);
		envDataView = new DataView(envArrayBuffer);

		try {
			await initWebGPU();
			setupResizeObserver();
			startTime = performance.now();
			render();
		} catch (e) {
			// The adapter/device request failed: WebGPU exists but there's no usable
			// GPU here (common on Linux Chrome without Vulkan). Treat it like
			// "unsupported" so the browser-hint overlay shows instead of a false
			// "Shader Error" — the compiled WGSL is still available in the panel.
			gpuSupported = false;
			errorMessage = e instanceof Error ? e.message : 'Failed to initialize WebGPU';
			onError(errorMessage, 'unavailable');
		}
	});

	onDestroy(() => {
		if (animationFrameId !== null) {
			cancelAnimationFrame(animationFrameId);
		}
		resizeObserver?.disconnect();
		uniformBuffer?.destroy();
		envUniformBuffer?.destroy();
		// Release the GPUDevice so it isn't leaked across remount cycles (e.g. the
		// playground error <-> fix loop). destroy() is a no-op if already destroyed,
		// and the optional chain guards the not-yet-initialized case.
		device?.destroy();
		device = null;
	});

	function setupResizeObserver() {
		// Use ResizeObserver for efficient size tracking
		resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
				const { width, height } = entry.contentRect;
				const newWidth = Math.floor(width * devicePixelRatio);
				const newHeight = Math.floor(height * devicePixelRatio);

				if (newWidth !== cachedWidth || newHeight !== cachedHeight) {
					cachedWidth = newWidth;
					cachedHeight = newHeight;
					needsResize = true;
				}
			}
		});
		resizeObserver.observe(canvas);
	}

	async function initWebGPU() {
		const adapter = await navigator.gpu.requestAdapter();
		if (!adapter) {
			throw new Error('No WebGPU adapter found');
		}

		device = await adapter.requestDevice();
		context = canvas.getContext('webgpu');
		if (!context) {
			throw new Error('Failed to get WebGPU context');
		}

		const format = navigator.gpu.getPreferredCanvasFormat();
		context.configure({
			device,
			format,
			alphaMode: 'premultiplied'
		});

		uniformBuffer = device.createBuffer({
			size: UNIFORM_SIZE,
			usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
		});

		envUniformBuffer = device.createBuffer({
			size: ENV_UNIFORM_SIZE,
			usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
		});

		await createPipeline(format);
		isInitialized = true;
	}

	async function createPipeline(format: GPUTextureFormat) {
		if (!device || !wgslCode) return;

		try {
			const shaderModule = device.createShaderModule({
				code: wgslCode
			});

			const compilationInfo = await shaderModule.getCompilationInfo();
			const errors = compilationInfo.messages.filter(
				(m: GPUCompilationMessage) => m.type === 'error'
			);
			if (errors.length > 0) {
				throw new Error(`Shader compilation error: ${errors[0].message}`);
			}

			const bindGroupLayout = device.createBindGroupLayout({
				entries: [
					{
						binding: 0,
						visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT,
						buffer: { type: 'uniform' }
					},
					{
						binding: 1,
						visibility: GPUShaderStage.FRAGMENT,
						buffer: { type: 'uniform' }
					}
				]
			});

			const pipelineLayout = device.createPipelineLayout({
				bindGroupLayouts: [bindGroupLayout]
			});

			pipeline = device.createRenderPipeline({
				layout: pipelineLayout,
				vertex: {
					module: shaderModule,
					entryPoint: 'vs_main'
				},
				fragment: {
					module: shaderModule,
					entryPoint: 'fs_main',
					targets: [{ format }]
				},
				primitive: {
					topology: 'triangle-list'
				}
			});

			bindGroup = device.createBindGroup({
				layout: bindGroupLayout,
				entries: [
					{ binding: 0, resource: { buffer: uniformBuffer! } },
					{ binding: 1, resource: { buffer: envUniformBuffer! } }
				]
			});

			// Reset env uniforms flag so they get written with new pipeline
			envUniformsWritten = false;
			errorMessage = '';
		} catch (e) {
			errorMessage = e instanceof Error ? e.message : 'Shader compilation failed';
			onError(errorMessage, 'shader');
			pipeline = null;
		}
	}

	function writeEnvUniforms() {
		if (!device || !envUniformBuffer || !envDataView || envUniformsWritten) return;

		const env = soyuzTheme.renderer.environment;
		let offset = 0;
		const writeFloat = (value: number) => {
			envDataView!.setFloat32(offset, value, true);
			offset += 4;
		};
		const writeVec3 = (values: readonly number[]) => {
			writeFloat(values[0]);
			writeFloat(values[1]);
			writeFloat(values[2]);
		};

		writeVec3(normalize([...env.sunDirection]));
		writeFloat(env.sunIntensity);
		writeVec3(env.sunColor);
		writeFloat(env.ambientIntensity);
		writeVec3(env.ambientColor);
		writeFloat(env.materialShininess);
		writeVec3(env.materialColor);
		writeFloat(env.specularIntensity);
		writeVec3(env.skyHorizon);
		writeFloat(env.fogDensity);
		writeVec3(env.skyZenith);
		writeFloat(env.aoIntensity);
		writeVec3(env.fogColor);
		writeFloat(env.shadowSoftness);
		writeFloat(env.aoEnabled);
		writeFloat(env.shadowsEnabled);
		writeFloat(0); // _pad1
		writeFloat(0); // _pad2

		device.queue.writeBuffer(envUniformBuffer, 0, envArrayBuffer!);
		envUniformsWritten = true;
	}

	function updateUniforms() {
		if (!device || !uniformBuffer || !uniformDataView) return;

		const width = cachedWidth || 1;
		const height = cachedHeight || 1;
		const time = (performance.now() - startTime) / 1000;

		// Calculate camera position from spherical coordinates
		const camX = cameraDistance * Math.sin(cameraPhi) * Math.cos(cameraTheta);
		const camY = cameraDistance * Math.cos(cameraPhi);
		const camZ = cameraDistance * Math.sin(cameraPhi) * Math.sin(cameraTheta);

		const cameraPos = [camX, camY, camZ];
		const target = [0, 0, 0];
		const up = [0, 1, 0];

		const forward = normalize(subtract(target, cameraPos));
		const right = normalize(cross(forward, up));
		const camUp = cross(right, forward);

		const fov = (45 * Math.PI) / 180;
		const fovTan = Math.tan(fov / 2);
		const near = 0.1;
		const far = 100.0;

		// Reuse the pre-allocated DataView
		let offset = 0;

		// view_proj: identity mat4x4 (64 bytes)
		for (let i = 0; i < 16; i++) {
			uniformDataView.setFloat32(offset, i % 5 === 0 ? 1 : 0, true);
			offset += 4;
		}

		// camera_pos + time
		uniformDataView.setFloat32(offset, camX, true);
		offset += 4;
		uniformDataView.setFloat32(offset, camY, true);
		offset += 4;
		uniformDataView.setFloat32(offset, camZ, true);
		offset += 4;
		uniformDataView.setFloat32(offset, time, true);
		offset += 4;

		// resolution + near + far
		uniformDataView.setFloat32(offset, width, true);
		offset += 4;
		uniformDataView.setFloat32(offset, height, true);
		offset += 4;
		uniformDataView.setFloat32(offset, near, true);
		offset += 4;
		uniformDataView.setFloat32(offset, far, true);
		offset += 4;

		// camera_right + pad
		uniformDataView.setFloat32(offset, right[0], true);
		offset += 4;
		uniformDataView.setFloat32(offset, right[1], true);
		offset += 4;
		uniformDataView.setFloat32(offset, right[2], true);
		offset += 4;
		uniformDataView.setFloat32(offset, 0, true);
		offset += 4;

		// camera_up + pad
		uniformDataView.setFloat32(offset, camUp[0], true);
		offset += 4;
		uniformDataView.setFloat32(offset, camUp[1], true);
		offset += 4;
		uniformDataView.setFloat32(offset, camUp[2], true);
		offset += 4;
		uniformDataView.setFloat32(offset, 0, true);
		offset += 4;

		// camera_forward + fov_tan
		uniformDataView.setFloat32(offset, forward[0], true);
		offset += 4;
		uniformDataView.setFloat32(offset, forward[1], true);
		offset += 4;
		uniformDataView.setFloat32(offset, forward[2], true);
		offset += 4;
		uniformDataView.setFloat32(offset, fovTan, true);
		offset += 4;

		device.queue.writeBuffer(uniformBuffer, 0, uniformArrayBuffer!);
	}

	function render() {
		if (!device || !context || !pipeline || !bindGroup) {
			animationFrameId = requestAnimationFrame(render);
			return;
		}

		// Only resize canvas when needed (detected by ResizeObserver)
		if (needsResize && cachedWidth > 0 && cachedHeight > 0) {
			canvas.width = cachedWidth;
			canvas.height = cachedHeight;
			needsResize = false;
		}

		// Write env uniforms once (they're static)
		writeEnvUniforms();

		// Update dynamic uniforms
		updateUniforms();

		const commandEncoder = device.createCommandEncoder();
		const textureView = context.getCurrentTexture().createView();

		const renderPass = commandEncoder.beginRenderPass({
			colorAttachments: [
				{
					view: textureView,
					clearValue: soyuzTheme.renderer.clearValue,
					loadOp: 'clear',
					storeOp: 'store'
				}
			]
		});

		renderPass.setPipeline(pipeline);
		renderPass.setBindGroup(0, bindGroup);
		renderPass.draw(3);
		renderPass.end();

		device.queue.submit([commandEncoder.finish()]);
		animationFrameId = requestAnimationFrame(render);
	}

	// Reactively update pipeline when WGSL code changes
	$effect(() => {
		if (isInitialized && wgslCode && device) {
			const format = navigator.gpu.getPreferredCanvasFormat();
			createPipeline(format);
		}
	});

	// Mouse handlers
	function handleMouseDown(e: MouseEvent) {
		isDragging = true;
		lastMouseX = e.clientX;
		lastMouseY = e.clientY;
	}

	function handleMouseMove(e: MouseEvent) {
		if (!isDragging) return;

		const deltaX = e.clientX - lastMouseX;
		const deltaY = e.clientY - lastMouseY;

		cameraTheta += deltaX * 0.01;
		cameraPhi = Math.max(0.1, Math.min(Math.PI - 0.1, cameraPhi - deltaY * 0.01));

		lastMouseX = e.clientX;
		lastMouseY = e.clientY;
	}

	function handleMouseUp() {
		isDragging = false;
	}

	function handleWheel(e: WheelEvent) {
		e.preventDefault();
		cameraDistance = Math.max(0.5, Math.min(20, cameraDistance + e.deltaY * 0.01));
	}

	// Vector math helpers (inlined for performance)
	function normalize(v: number[]): number[] {
		const len = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
		return [v[0] / len, v[1] / len, v[2] / len];
	}

	function subtract(a: number[], b: number[]): number[] {
		return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
	}

	function cross(a: number[], b: number[]): number[] {
		return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
	}
</script>

<div class="renderer-container">
	{#if !gpuSupported}
		<div class="error-overlay">
			<p>Preview needs WebGPU</p>
			<p class="hint">
				The script compiled — only the 3D render needs a GPU via WebGPU, which isn't available here.
				The generated shader is in the WGSL panel. To enable the preview:
			</p>
			<ul class="hint-list">
				<li><strong>Chrome/Edge 113+</strong> with hardware acceleration enabled</li>
				<li>
					<strong>Chrome on Linux</strong>: check <code>chrome://gpu</code>; if needed enable
					<code>chrome://flags/#enable-unsafe-webgpu</code> and install Vulkan drivers
				</li>
				<li>
					<strong>Firefox Nightly</strong>: <code>about:config</code> →
					<code>dom.webgpu.enabled</code>
				</li>
			</ul>
			{#if errorMessage}<p class="error-detail">{errorMessage}</p>{/if}
		</div>
	{:else if errorMessage}
		<div class="error-overlay">
			<p>Shader Error</p>
			<p class="error-detail">{errorMessage}</p>
		</div>
	{/if}
	<canvas
		bind:this={canvas}
		onmousedown={handleMouseDown}
		onmousemove={handleMouseMove}
		onmouseup={handleMouseUp}
		onmouseleave={handleMouseUp}
		onwheel={handleWheel}
	></canvas>
	<div class="controls-hint">Drag to rotate | Scroll to zoom</div>
</div>

<style>
	.renderer-container {
		position: relative;
		width: 100%;
		height: 100%;
		background: var(--renderer-bg);
	}

	canvas {
		width: 100%;
		height: 100%;
		display: block;
		cursor: grab;
	}

	canvas:active {
		cursor: grabbing;
	}

	.error-overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background: var(--renderer-overlay-bg);
		color: var(--status-error-text);
		padding: var(--space-4);
		text-align: center;
	}

	.error-overlay p {
		margin: 0;
		font-weight: 600;
	}

	.error-overlay .hint {
		margin-top: var(--space-2);
		color: var(--color-text-muted);
		font-weight: 400;
		font-size: var(--text-sm);
	}

	.error-overlay .error-detail {
		margin-top: var(--space-2);
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--renderer-error-detail);
		max-width: 100%;
		overflow-wrap: break-word;
	}

	.hint-list {
		margin-top: var(--space-2);
		text-align: left;
		font-size: var(--text-xs);
		color: var(--color-text-muted);
		list-style: none;
	}

	.hint-list li {
		margin: var(--space-1) 0;
	}

	.hint-list code {
		background: var(--renderer-hint-code-bg);
		padding: 0.1em 0.3em;
		border-radius: 2px;
		font-size: 0.9em;
	}

	.controls-hint {
		position: absolute;
		bottom: var(--space-2);
		left: 50%;
		transform: translateX(-50%);
		font-size: var(--text-xs);
		color: var(--renderer-control-text);
		pointer-events: none;
	}
</style>
