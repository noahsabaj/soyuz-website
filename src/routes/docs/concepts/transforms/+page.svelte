<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
</script>

<svelte:head><title>Transforms - Soyuz</title></svelte:head>

<div class="doc-page">
	<h1>Transforms</h1>
	<p class="lead">Move, rotate, scale, and mirror shapes.</p>

	<section>
		<h2>Position</h2>
		<CodeBlock
			code={`shape.translate(x, y, z)
shape.translate_x(x)
shape.translate_y(y)
shape.translate_z(z)`}
		/>
	</section>

	<section>
		<h2>Rotation</h2>
		<CodeBlock
			code={`// Angles in radians
shape.rotate_x(angle)
shape.rotate_y(angle)
shape.rotate_z(angle)

// Use deg() for degrees
shape.rotate_y(deg(45.0))`}
		/>
	</section>

	<section>
		<h2>Scale and Mirror</h2>
		<CodeBlock
			code={`shape.scale(factor)     // Uniform scale
shape.mirror_x()        // Flip across YZ plane
shape.symmetry_x()      // Fold space for symmetry`}
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
