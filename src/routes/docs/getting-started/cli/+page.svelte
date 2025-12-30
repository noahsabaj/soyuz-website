<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
</script>

<svelte:head>
	<title>CLI Usage - Soyuz</title>
</svelte:head>

<div class="flex flex-col gap-8">
	<header>
		<h1 class="mb-2">CLI Usage</h1>
		<p class="text-lg text-text-muted">The command-line interface for batch processing and automation.</p>
	</header>

	<section class="flex flex-col gap-4">
		<h2 class="text-xl pt-4 border-t border-border-light">Commands</h2>

		<h3 class="text-lg font-mono text-accent mt-4">preview</h3>
		<p>Open a live preview window:</p>
		<CodeBlock code="soyuz preview --script model.rhai" />

		<h3 class="text-lg font-mono text-accent mt-4">generate</h3>
		<p>Export to a mesh file:</p>
		<CodeBlock code="soyuz generate --script model.rhai --output model.glb --resolution 128" />

		<h3 class="text-lg font-mono text-accent mt-4">watch</h3>
		<p>Watch for changes and auto-refresh:</p>
		<CodeBlock code="soyuz watch --script model.rhai" />

		<h3 class="text-lg font-mono text-accent mt-4">repl</h3>
		<p>Interactive scripting shell:</p>
		<CodeBlock code="soyuz repl" />

		<h3 class="text-lg font-mono text-accent mt-4">render</h3>
		<p>Render to an image (headless):</p>
		<CodeBlock
			code="soyuz render --script model.rhai --output render.png --width 1920 --height 1080"
		/>
	</section>
</div>
