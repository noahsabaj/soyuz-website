<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
</script>

<svelte:head>
	<title>Modifiers - Soyuz</title>
</svelte:head>

<div class="flex flex-col gap-8">
	<header>
		<h1 class="mb-2">Modifiers</h1>
		<p class="text-lg text-text-muted">Transform the surface of shapes.</p>
	</header>

	<section class="flex flex-col gap-4">
		<h2 class="text-xl pt-4 border-t border-border-light">Surface Modifiers</h2>
		<CodeBlock
			code={`shape.shell(thickness)   // Make hollow
shape.round(radius)      // Round all edges
shape.onion(thickness)   // Concentric shells
shape.elongate(x, y, z)  // Stretch with flat sections`}
		/>
	</section>

	<section class="flex flex-col gap-4">
		<h2 class="text-xl pt-4 border-t border-border-light">Deformations</h2>
		<CodeBlock
			code={`shape.twist(amount)  // Twist around Y axis
shape.bend(amount)   // Bend around Y axis`}
		/>
	</section>

	<section class="flex flex-col gap-4">
		<h2 class="text-xl pt-4 border-t border-border-light">Repetition</h2>
		<CodeBlock
			code={`shape.repeat_polar(count)              // Circle around Y
shape.repeat_limited(sx, sy, sz, cx, cy, cz)  // Finite grid`}
		/>
	</section>
</div>
