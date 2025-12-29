<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
</script>

<svelte:head><title>Boolean Operations - Soyuz</title></svelte:head>

<div class="doc-page">
	<h1>Boolean Operations</h1>
	<p class="lead">Combine shapes with union, subtract, and intersect.</p>

	<section>
		<h2>Basic Operations</h2>
		<CodeBlock
			code={`// Union - combine two shapes
sphere(0.5).union(cube(0.7))

// Subtract - cut one from another
cube(1.0).subtract(sphere(0.8))

// Intersect - keep only the overlap
sphere(0.6).intersect(cube(0.8))`}
		/>
	</section>

	<section>
		<h2>Smooth Operations</h2>
		<p>Add a blend radius <code>k</code> for organic transitions:</p>
		<CodeBlock
			code={`// Smooth union - blend shapes together
a.smooth_union(b, 0.1)

// Smooth subtract - filleted cut
a.smooth_subtract(b, 0.1)

// Smooth intersect - filleted intersection
a.smooth_intersect(b, 0.1)`}
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
