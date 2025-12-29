<svelte:head><title>Tips & Tricks - Soyuz</title></svelte:head>
<div class="doc-page">
	<h1>Tips & Tricks</h1>
	<p class="lead">Best practices for effective modeling.</p>

	<section>
		<h2>Transform Order Matters</h2>
		<p>
			Transforms apply left to right. <code>translate().rotate()</code> gives different results than
			<code>rotate().translate()</code>.
		</p>
	</section>

	<section>
		<h2>Smooth Blend Values</h2>
		<ul>
			<li><code>k = 0.01</code> - barely visible</li>
			<li><code>k = 0.05</code> - subtle fillet</li>
			<li><code>k = 0.1</code> - noticeable blend</li>
			<li><code>k = 0.2+</code> - organic, blobby</li>
		</ul>
	</section>

	<section>
		<h2>Return an SDF</h2>
		<p>Your script must return an SDF. Don't end the last line with a semicolon.</p>
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
	section ul {
		padding-left: var(--space-6);
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}
</style>
