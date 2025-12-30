<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
</script>

<svelte:head>
	<title>Transforms - Soyuz</title>
</svelte:head>

<div class="flex flex-col gap-8">
	<header>
		<h1 class="mb-2">Transforms</h1>
		<p class="text-lg text-text-muted">Move, rotate, scale, and mirror shapes.</p>
	</header>

	<section class="flex flex-col gap-4">
		<h2 class="text-xl pt-4 border-t border-border-light">Position</h2>
		<CodeBlock
			code={`shape.translate(x, y, z)
shape.translate_x(x)
shape.translate_y(y)
shape.translate_z(z)`}
		/>
	</section>

	<section class="flex flex-col gap-4">
		<h2 class="text-xl pt-4 border-t border-border-light">Rotation</h2>
		<CodeBlock
			code={`// Angles in radians
shape.rotate_x(angle)
shape.rotate_y(angle)
shape.rotate_z(angle)

// Use deg() for degrees
shape.rotate_y(deg(45.0))`}
		/>
	</section>

	<section class="flex flex-col gap-4">
		<h2 class="text-xl pt-4 border-t border-border-light">Scale and Mirror</h2>
		<CodeBlock
			code={`shape.scale(factor)     // Uniform scale
shape.mirror_x()        // Flip across YZ plane
shape.symmetry_x()      // Fold space for symmetry`}
		/>
	</section>
</div>
