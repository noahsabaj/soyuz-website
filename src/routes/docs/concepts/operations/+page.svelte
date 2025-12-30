<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
</script>

<svelte:head>
	<title>Boolean Operations - Soyuz</title>
</svelte:head>

<div class="flex flex-col gap-8">
	<header>
		<h1 class="mb-2">Boolean Operations</h1>
		<p class="text-lg text-text-muted">Combine shapes with union, subtract, and intersect.</p>
	</header>

	<section class="flex flex-col gap-4">
		<h2 class="text-xl pt-4 border-t border-border-light">Basic Operations</h2>
		<CodeBlock
			code={`// Union - combine two shapes
sphere(0.5).union(cube(0.7))

// Subtract - cut one from another
cube(1.0).subtract(sphere(0.8))

// Intersect - keep only the overlap
sphere(0.6).intersect(cube(0.8))`}
		/>
	</section>

	<section class="flex flex-col gap-4">
		<h2 class="text-xl pt-4 border-t border-border-light">Smooth Operations</h2>
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
