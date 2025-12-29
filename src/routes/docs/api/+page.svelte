<svelte:head><title>API Reference - Soyuz</title></svelte:head>

<div class="doc-page">
	<h1>API Reference</h1>
	<p class="lead">Complete reference for all Soyuz functions.</p>

	<section>
		<p>
			The Soyuz scripting API is built on Rhai, a JavaScript-like language. Functions are organized
			into categories:
		</p>
		<ul>
			<li><a href="/docs/api/primitives">Primitives</a> - Basic shapes</li>
			<li><a href="/docs/api/operations">Operations</a> - Boolean and smooth operations</li>
			<li><a href="/docs/api/transforms">Transforms</a> - Position, rotation, scale</li>
			<li><a href="/docs/api/environment">Environment</a> - Lighting and rendering settings</li>
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
	section {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}
	section ul {
		padding-left: var(--space-6);
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}
</style>
