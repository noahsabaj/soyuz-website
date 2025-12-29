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

<div class="playground">
	<header class="playground-header">
		<h1>Playground</h1>
		<p>Write Rhai scripts, see live 3D preview, and inspect generated WGSL shader code.</p>
	</header>

	<div class="examples">
		<span class="examples-label">Examples:</span>
		{#each examples as example}
			<button class="example-btn" onclick={() => loadExample(example)}>
				{example.name}
			</button>
		{/each}
	</div>

	<div class="editor-container">
		<!-- Left Panel: Rhai Script Editor -->
		<div class="panel editor-panel">
			<div class="panel-header">
				<span class="panel-title">Rhai Script</span>
				{#if wasmReady}
					<span class="status status-ready">Ready</span>
				{:else if isLoading}
					<span class="status status-loading">Loading...</span>
				{:else}
					<span class="status status-error">Error</span>
				{/if}
			</div>
			<textarea
				class="code-input"
				value={code}
				oninput={handleInput}
				spellcheck="false"
				placeholder="// Write your Rhai script here..."
			></textarea>
		</div>

		<!-- Center Panel: 3D Preview -->
		<div class="panel preview-panel">
			<div class="panel-header">
				<span class="panel-title">3D Preview</span>
				{#if error}
					<span class="status status-error">Script Error</span>
				{:else if shaderError}
					<span class="status status-error">Shader Error</span>
				{:else if wgslOutput}
					<span class="status status-success">Live</span>
				{/if}
			</div>
			<div class="preview-content">
				{#if error}
					<div class="error-display">
						<p class="error-title">Script Error</p>
						<pre class="error-message">{error}</pre>
					</div>
				{:else if isLoading}
					<div class="loading-display">Loading WASM module...</div>
				{:else if wgslOutput}
					<WebGPURenderer wgslCode={wgslOutput} onError={handleShaderError} />
				{:else}
					<div class="loading-display">Write a script to see the preview</div>
				{/if}
			</div>
		</div>

		<!-- Right Panel: WGSL Output (Collapsible) -->
		<div class="panel wgsl-panel" class:collapsed={!showWgsl}>
			<button class="panel-header panel-header-clickable" onclick={() => (showWgsl = !showWgsl)}>
				<span class="toggle-content">
					<span class="toggle-icon">{showWgsl ? '▶' : '◀'}</span>
					<span class="panel-title">WGSL</span>
				</span>
				{#if wgslOutput && showWgsl}
					<span class="status status-success">Compiled</span>
				{/if}
			</button>
			{#if showWgsl}
				<div class="wgsl-output">
					{#if wgslOutput}
						<pre><code>{wgslOutput}</code></pre>
					{:else if error}
						<div class="wgsl-error">Fix script errors to see WGSL output</div>
					{:else}
						<div class="wgsl-empty">No output</div>
					{/if}
				</div>
			{/if}
		</div>
	</div>

	<div class="info">
		<p>
			This playground uses WebAssembly to compile Rhai scripts and WebGPU to render SDFs in
			real-time. The generated WGSL shader code can be inspected by expanding the WGSL panel.
		</p>
	</div>
</div>

<style>
	.playground {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
		max-width: 1600px;
		margin: 0 auto;
		padding: var(--space-4);
	}

	.playground-header {
		text-align: center;
	}

	.playground-header h1 {
		margin-bottom: var(--space-2);
	}

	.playground-header p {
		color: var(--color-text-muted);
		font-size: var(--text-lg);
	}

	.examples {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-2);
	}

	.examples-label {
		font-weight: 500;
		color: var(--color-text-muted);
	}

	.example-btn {
		padding: var(--space-1) var(--space-3);
		font-size: var(--text-sm);
		background: var(--color-bg);
		border: 2px solid var(--color-border);
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.example-btn:hover {
		background: var(--color-border-light);
		border-color: var(--color-border);
	}

	.editor-container {
		display: grid;
		grid-template-columns: 1fr 1.5fr auto;
		gap: var(--space-3);
		height: 500px;
	}

	@media (max-width: 1100px) {
		.editor-container {
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
		}
	}

	@media (max-width: 700px) {
		.editor-container {
			grid-template-columns: 1fr;
		}

		.editor-panel {
			height: 250px;
		}

		.preview-panel {
			height: 350px;
		}
	}

	.panel {
		display: flex;
		flex-direction: column;
		border: 2px solid var(--color-border);
		background: var(--color-bg);
		overflow: hidden;
	}

	.preview-panel {
		min-width: 0;
	}

	.wgsl-panel {
		width: 350px;
	}

	.wgsl-panel.collapsed {
		width: 50px;
	}

	.panel-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: var(--space-2) var(--space-3);
		background: var(--color-border-light);
		border-bottom: 2px solid var(--color-border);
		flex-shrink: 0;
	}

	.panel-title {
		font-weight: 600;
		font-size: var(--text-sm);
	}

	.panel-header-clickable {
		cursor: pointer;
		width: 100%;
		text-align: left;
		font: inherit;
		border: none;
		color: inherit;
	}

	.panel-header-clickable:hover {
		background: var(--color-bg-alt);
	}

	.toggle-content {
		display: flex;
		align-items: center;
		gap: var(--space-2);
	}

	.toggle-icon {
		font-size: var(--text-xs);
		opacity: 0.6;
	}

	.wgsl-panel.collapsed .panel-title {
		writing-mode: vertical-rl;
		text-orientation: mixed;
	}

	.wgsl-panel.collapsed .toggle-icon {
		margin-bottom: var(--space-2);
	}

	.wgsl-panel.collapsed .panel-header {
		flex-direction: column;
		padding: var(--space-3) var(--space-2);
		height: 100%;
	}

	.wgsl-panel.collapsed .toggle-content {
		flex-direction: column;
	}

	.status {
		font-size: var(--text-xs);
		padding: var(--space-1) var(--space-2);
		font-weight: 500;
	}

	.status-ready,
	.status-success {
		background: #d4edda;
		color: #155724;
	}

	.status-loading {
		background: #fff3cd;
		color: #856404;
	}

	.status-error {
		background: #f8d7da;
		color: #721c24;
	}

	.code-input {
		flex: 1;
		min-height: 0;
		padding: var(--space-3);
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		line-height: 1.6;
		border: none;
		resize: none;
		background: var(--color-bg);
		color: var(--color-text);
	}

	.code-input:focus {
		outline: none;
	}

	.preview-content {
		flex: 1;
		min-height: 0;
		position: relative;
	}

	.error-display {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		padding: var(--space-4);
		background: #2d2d2d;
		color: #ff6b6b;
	}

	.error-title {
		font-weight: 600;
		margin-bottom: var(--space-2);
	}

	.error-message {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: #ffaa88;
		max-width: 100%;
		overflow: auto;
		white-space: pre-wrap;
		word-break: break-word;
		text-align: left;
		background: transparent;
		border: none;
		padding: 0;
	}

	.loading-display {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		background: #2d2d2d;
		color: var(--color-text-muted);
		font-style: italic;
	}

	.wgsl-output {
		flex: 1;
		min-height: 0;
		overflow: auto;
		background: #2d2d2d;
	}

	.wgsl-output pre {
		margin: 0;
		padding: var(--space-3);
		border: none;
		background: transparent;
		overflow: visible;
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		line-height: 1.5;
		white-space: pre-wrap;
		word-break: break-word;
	}

	.wgsl-output code {
		color: #e6e6e6;
		background: transparent;
		padding: 0;
	}

	.wgsl-error,
	.wgsl-empty {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		color: var(--color-text-muted);
		font-style: italic;
		padding: var(--space-4);
	}

	.info {
		padding: var(--space-4);
		background: var(--color-border-light);
		border: 2px solid var(--color-border);
	}

	.info p {
		margin: 0;
		color: var(--color-text-muted);
		font-size: var(--text-sm);
	}
</style>
