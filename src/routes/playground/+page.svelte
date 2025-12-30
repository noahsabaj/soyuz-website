<script lang="ts">
	import { onMount } from 'svelte';
	import WebGPURenderer from '$lib/components/WebGPURenderer.svelte';

	let code = $state(`// Create a simple barrel shape
let body = cylinder(0.5, 1.0);
let ring_top = torus(0.5, 0.08).translate_y(0.4);
let ring_bot = torus(0.5, 0.08).translate_y(-0.4);

// Combine with smooth union for organic look
body
    .smooth_union(ring_top, 0.05)
    .smooth_union(ring_bot, 0.05)`);

	let wgslOutput = $state('');
	let error = $state('');
	let isLoading = $state(true);
	let wasmReady = $state(false);
	let showWgsl = $state(false);
	let shaderError = $state('');

	let compileToWgsl: ((code: string) => string) | null = null;

	onMount(async () => {
		try {
			const wasm = await import('$lib/wasm');
			await wasm.initWasm();
			compileToWgsl = wasm.compile_to_wgsl;
			wasmReady = true;
			compile();
		} catch (e) {
			error = `Failed to load WASM module: ${e}`;
		}
		isLoading = false;
	});

	function compile() {
		if (!compileToWgsl) return;

		error = '';
		shaderError = '';
		try {
			wgslOutput = compileToWgsl(code);
		} catch (e) {
			error = e instanceof Error ? e.message : String(e);
			wgslOutput = '';
		}
	}

	function handleInput(event: Event) {
		const target = event.target as HTMLTextAreaElement;
		code = target.value;
		compile();
	}

	function handleShaderError(msg: string) {
		shaderError = msg;
	}

	const examples = [
		{
			name: 'Sphere',
			code: `sphere(0.5)`
		},
		{
			name: 'Barrel',
			code: `let body = cylinder(0.5, 1.0);
let ring_top = torus(0.5, 0.08).translate_y(0.4);
let ring_bot = torus(0.5, 0.08).translate_y(-0.4);

body
    .smooth_union(ring_top, 0.05)
    .smooth_union(ring_bot, 0.05)`
		},
		{
			name: 'Gear',
			code: `let hub = cylinder(0.3, 0.15);
let tooth = box3(0.1, 0.15, 0.08).translate_x(0.5);
let teeth = tooth.repeat_polar(12);

hub.union(teeth)`
		},
		{
			name: 'Twisted Column',
			code: `let base = box3(0.3, 1.0, 0.3);
base.twist(2.0)`
		},
		{
			name: 'Hollow Sphere',
			code: `let outer = sphere(0.5);
let inner = sphere(0.4);

outer.subtract(inner)`
		}
	];

	function loadExample(example: (typeof examples)[0]) {
		code = example.code;
		compile();
	}
</script>

<svelte:head>
	<title>Playground - Soyuz</title>
</svelte:head>

<div class="flex flex-col gap-4 max-w-[1600px] mx-auto p-4">
	<header class="text-center">
		<h1 class="mb-2">Playground</h1>
		<p class="text-text-muted text-lg">Write Rhai scripts, see live 3D preview, and inspect generated WGSL shader code.</p>
	</header>

	<div class="flex flex-wrap items-center gap-2">
		<span class="font-medium text-text-muted">Examples:</span>
		{#each examples as example}
			<button class="py-1 px-3 text-sm bg-bg border-2 border-border cursor-pointer transition-all duration-150 hover:bg-border-light hover:border-border" onclick={() => loadExample(example)}>
				{example.name}
			</button>
		{/each}
	</div>

	<div class="editor-grid grid gap-3 h-[500px]">
		<!-- Left Panel: Rhai Script Editor -->
		<div class="panel flex flex-col border-2 border-border bg-bg overflow-hidden">
			<div class="flex justify-between items-center py-2 px-3 bg-border-light border-b-2 border-border shrink-0">
				<span class="font-semibold text-sm">Rhai Script</span>
				{#if wasmReady}
					<span class="status-ready text-xs py-1 px-2 font-medium bg-[#d4edda] text-[#155724]">Ready</span>
				{:else if isLoading}
					<span class="status-loading text-xs py-1 px-2 font-medium bg-[#fff3cd] text-[#856404]">Loading...</span>
				{:else}
					<span class="status-error text-xs py-1 px-2 font-medium bg-[#f8d7da] text-[#721c24]">Error</span>
				{/if}
			</div>
			<textarea
				class="flex-1 min-h-0 p-3 font-mono text-sm leading-relaxed border-none resize-none bg-bg text-text focus:outline-none"
				value={code}
				oninput={handleInput}
				spellcheck="false"
				placeholder="// Write your Rhai script here..."
			></textarea>
		</div>

		<!-- Center Panel: 3D Preview -->
		<div class="preview-panel panel flex flex-col border-2 border-border bg-bg overflow-hidden min-w-0">
			<div class="flex justify-between items-center py-2 px-3 bg-border-light border-b-2 border-border shrink-0">
				<span class="font-semibold text-sm">3D Preview</span>
				{#if error}
					<span class="text-xs py-1 px-2 font-medium bg-[#f8d7da] text-[#721c24]">Script Error</span>
				{:else if shaderError}
					<span class="text-xs py-1 px-2 font-medium bg-[#f8d7da] text-[#721c24]">Shader Error</span>
				{:else if wgslOutput}
					<span class="text-xs py-1 px-2 font-medium bg-[#d4edda] text-[#155724]">Live</span>
				{/if}
			</div>
			<div class="flex-1 min-h-0 relative">
				{#if error}
					<div class="flex flex-col items-center justify-center h-full p-4 bg-[#2d2d2d] text-[#ff6b6b]">
						<p class="font-semibold mb-2">Script Error</p>
						<pre class="font-mono text-xs text-[#ffaa88] max-w-full overflow-auto whitespace-pre-wrap break-words text-left bg-transparent border-none p-0">{error}</pre>
					</div>
				{:else if isLoading}
					<div class="flex items-center justify-center h-full bg-[#2d2d2d] text-text-muted italic">Loading WASM module...</div>
				{:else if wgslOutput}
					<WebGPURenderer wgslCode={wgslOutput} onError={handleShaderError} />
				{:else}
					<div class="flex items-center justify-center h-full bg-[#2d2d2d] text-text-muted italic">Write a script to see the preview</div>
				{/if}
			</div>
		</div>

		<!-- Right Panel: WGSL Output (Collapsible) -->
		<div class="wgsl-panel panel flex flex-col border-2 border-border bg-bg overflow-hidden" class:collapsed={!showWgsl}>
			<button class="flex justify-between items-center py-2 px-3 bg-border-light border-b-2 border-border shrink-0 cursor-pointer w-full text-left font-inherit border-none text-inherit hover:bg-bg-alt" onclick={() => (showWgsl = !showWgsl)}>
				<span class="toggle-content flex items-center gap-2">
					<span class="text-xs opacity-60">{showWgsl ? '\u25B6' : '\u25C0'}</span>
					<span class="panel-title font-semibold text-sm">WGSL</span>
				</span>
				{#if wgslOutput && showWgsl}
					<span class="text-xs py-1 px-2 font-medium bg-[#d4edda] text-[#155724]">Compiled</span>
				{/if}
			</button>
			{#if showWgsl}
				<div class="flex-1 min-h-0 overflow-auto bg-[#2d2d2d]">
					{#if wgslOutput}
						<pre class="bg-transparent m-0 p-3 border-none overflow-visible font-mono text-xs leading-relaxed whitespace-pre-wrap break-words"><code class="text-[#e6e6e6] bg-transparent p-0">{wgslOutput}</code></pre>
					{:else if error}
						<div class="flex items-center justify-center h-full text-text-muted italic p-4">Fix script errors to see WGSL output</div>
					{:else}
						<div class="flex items-center justify-center h-full text-text-muted italic p-4">No output</div>
					{/if}
				</div>
			{/if}
		</div>
	</div>

	<div class="p-4 bg-border-light border-2 border-border">
		<p class="m-0 text-text-muted text-sm">
			This playground uses WebAssembly to compile Rhai scripts and WebGPU to render SDFs in
			real-time. The generated WGSL shader code can be inspected by expanding the WGSL panel.
		</p>
	</div>
</div>

<style>
	/* Grid layout - needs custom CSS for responsive behavior */
	.editor-grid {
		grid-template-columns: 1fr 1.5fr auto;
	}

	.wgsl-panel {
		width: 350px;
	}

	.wgsl-panel.collapsed {
		width: 50px;
	}

	.wgsl-panel.collapsed .panel-title {
		writing-mode: vertical-rl;
		text-orientation: mixed;
	}

	.wgsl-panel.collapsed .toggle-content {
		flex-direction: column;
	}

	.wgsl-panel.collapsed button {
		flex-direction: column;
		padding: 0.75rem 0.5rem;
		height: 100%;
	}

	@media (max-width: 1100px) {
		.editor-grid {
			grid-template-columns: 1fr 1fr;
			grid-template-rows: 1fr auto;
			height: auto;
		}

		.preview-panel {
			grid-column: 1 / -1;
			height: 400px;
		}

		.wgsl-panel {
			grid-column: 1 / -1;
			width: 100%;
		}

		.wgsl-panel.collapsed {
			width: 100%;
		}
	}

	@media (max-width: 700px) {
		.editor-grid {
			grid-template-columns: 1fr;
		}

		.panel:first-child {
			height: 250px;
		}

		.preview-panel {
			height: 350px;
		}
	}
</style>
