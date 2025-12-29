<svelte:head>
	<title>Signed Distance Fields - Soyuz</title>
</svelte:head>

<div class="doc-page">
	<h1>Signed Distance Fields</h1>
	<p class="lead">The mathematical foundation of Soyuz.</p>

	<section>
		<h2>What is an SDF?</h2>
		<p>
			A Signed Distance Field (SDF) is a function that takes any point in 3D space and returns the <strong
				>distance to the nearest surface</strong
			>:
		</p>
		<ul>
			<li><strong>Positive values</strong> = outside the shape</li>
			<li><strong>Negative values</strong> = inside the shape</li>
			<li><strong>Zero</strong> = exactly on the surface</li>
		</ul>
	</section>

	<section>
		<h2>Why SDFs?</h2>
		<ul>
			<li><strong>Boolean operations</strong> - Union, subtract, intersect are simple math</li>
			<li><strong>Smooth blending</strong> - Organic shapes emerge naturally</li>
			<li><strong>Resolution independent</strong> - The math works at any scale</li>
			<li><strong>GPU friendly</strong> - Raymarching renders SDFs efficiently</li>
		</ul>
	</section>

	<section>
		<h2>From SDF to Mesh</h2>
		<p>
			SDFs are great for modeling and previewing, but games and 3D software need triangle meshes.
			Soyuz uses <strong>Marching Cubes</strong> to convert SDFs to meshes for export.
		</p>
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
