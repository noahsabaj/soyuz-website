<svelte:head><title>Cookbook - Soyuz</title></svelte:head>
<div class="doc-page">
	<h1>Cookbook</h1>
	<p class="lead">Recipes and patterns for common modeling tasks.</p>

	<section>
		<ul>
			<li><a href="/docs/cookbook/patterns">Common Patterns</a> - Reusable techniques</li>
			<li><a href="/docs/cookbook/tips">Tips & Tricks</a> - Best practices</li>
			<li><a href="/examples">Examples</a> - Complete working models</li>
		</ul>
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
	section ul {
		padding-left: var(--space-6);
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}
</style>
