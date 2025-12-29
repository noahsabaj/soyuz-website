<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
</script>

<svelte:head><title>Common Patterns - Soyuz</title></svelte:head>
<div class="doc-page">
	<h1>Common Patterns</h1>
	<p class="lead">Reusable techniques for everyday modeling.</p>

	<section>
		<h2>Making Things Hollow</h2>
		<CodeBlock code="sphere(0.5).shell(0.05)" />
	</section>

	<section>
		<h2>Cutting Clean Holes</h2>
		<CodeBlock
			code={`let body = cylinder(0.5, 1.0);
let hole = cylinder(0.2, 1.1);  // Slightly taller
body.subtract(hole)`}
		/>
	</section>

	<section>
		<h2>Radial Patterns</h2>
		<CodeBlock
			code={`let spoke = box3(0.1, 0.5, 0.05).translate_x(0.5);
spoke.repeat_polar(8)`}
		/>
	</section>

	<section>
		<h2>Symmetry Shortcut</h2>
		<CodeBlock
			code={`let half = sphere(0.3).translate_x(0.5);
half.symmetry_x()  // Creates both sides`}
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
