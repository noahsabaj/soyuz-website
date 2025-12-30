<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
</script>

<svelte:head>
	<title>Common Patterns - Soyuz</title>
</svelte:head>

<div class="flex flex-col gap-8">
	<header>
		<h1 class="mb-2">Common Patterns</h1>
		<p class="text-lg text-text-muted">Reusable techniques for everyday modeling.</p>
	</header>

	<section class="flex flex-col gap-4">
		<h2 class="text-xl pt-4 border-t border-border-light">Making Things Hollow</h2>
		<CodeBlock code="sphere(0.5).shell(0.05)" />
	</section>

	<section class="flex flex-col gap-4">
		<h2 class="text-xl pt-4 border-t border-border-light">Cutting Clean Holes</h2>
		<CodeBlock
			code={`let body = cylinder(0.5, 1.0);
let hole = cylinder(0.2, 1.1);  // Slightly taller
body.subtract(hole)`}
		/>
	</section>

	<section class="flex flex-col gap-4">
		<h2 class="text-xl pt-4 border-t border-border-light">Radial Patterns</h2>
		<CodeBlock
			code={`let spoke = box3(0.1, 0.5, 0.05).translate_x(0.5);
spoke.repeat_polar(8)`}
		/>
	</section>

	<section class="flex flex-col gap-4">
		<h2 class="text-xl pt-4 border-t border-border-light">Symmetry Shortcut</h2>
		<CodeBlock
			code={`let half = sphere(0.3).translate_x(0.5);
half.symmetry_x()  // Creates both sides`}
		/>
	</section>
</div>
