<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
</script>

<svelte:head>
	<title>CLI Usage - Soyuz</title>
</svelte:head>

<div class="doc-page">
	<h1>CLI Usage</h1>
	<p class="lead">The command-line interface for batch processing and automation.</p>

	<section>
		<h2>Commands</h2>

		<h3>preview</h3>
		<p>Open a live preview window:</p>
		<CodeBlock code="soyuz preview --script model.rhai" />

		<h3>generate</h3>
		<p>Export to a mesh file:</p>
		<CodeBlock code="soyuz generate --script model.rhai --output model.glb --resolution 128" />

		<h3>watch</h3>
		<p>Watch for changes and auto-refresh:</p>
		<CodeBlock code="soyuz watch --script model.rhai" />

		<h3>repl</h3>
		<p>Interactive scripting shell:</p>
		<CodeBlock code="soyuz repl" />

		<h3>render</h3>
		<p>Render to an image (headless):</p>
		<CodeBlock
			code="soyuz render --script model.rhai --output render.png --width 1920 --height 1080"
		/>
	</section>
</div>

<style>
	.doc-page {
		display: flex;
		flex-direction: column;
		gap: var(--space-8);
	}
	h1 {
		margin-bottom: var(--space-2);
	}
	.lead {
		font-size: var(--text-lg);
		color: var(--color-text-muted);
	}
	section {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}
	section h2 {
		font-size: var(--text-xl);
		padding-top: var(--space-4);
		border-top: 1px solid var(--color-border-light);
	}
	section h3 {
		font-size: var(--text-lg);
		font-family: var(--font-mono);
		color: var(--color-accent);
		margin-top: var(--space-4);
	}
</style>
