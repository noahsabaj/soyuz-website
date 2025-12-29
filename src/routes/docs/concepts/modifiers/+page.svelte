<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
</script>

<svelte:head><title>Modifiers - Soyuz</title></svelte:head>

<div class="doc-page">
	<h1>Modifiers</h1>
	<p class="lead">Transform the surface of shapes.</p>

	<section>
		<h2>Surface Modifiers</h2>
		<CodeBlock
			code={`shape.shell(thickness)   // Make hollow
shape.round(radius)      // Round all edges
shape.onion(thickness)   // Concentric shells
shape.elongate(x, y, z)  // Stretch with flat sections`}
		/>
	</section>

	<section>
		<h2>Deformations</h2>
		<CodeBlock
			code={`shape.twist(amount)  // Twist around Y axis
shape.bend(amount)   // Bend around Y axis`}
		/>
	</section>

	<section>
		<h2>Repetition</h2>
		<CodeBlock
			code={`shape.repeat_polar(count)              // Circle around Y
shape.repeat_limited(sx, sy, sz, cx, cy, cz)  // Finite grid`}
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
</style>
