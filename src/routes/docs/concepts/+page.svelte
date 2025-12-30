<svelte:head>
	<title>Signed Distance Fields - Soyuz</title>
</svelte:head>

<div class="flex flex-col gap-8">
	<header>
		<h1 class="mb-2">Signed Distance Fields</h1>
		<p class="text-lg text-text-muted">The mathematical foundation of Soyuz.</p>
	</header>

	<section class="flex flex-col gap-4">
		<h2 class="text-xl pt-4 border-t border-border-light">What is an SDF?</h2>
		<p>
			A Signed Distance Field (SDF) is a function that takes any point in 3D space and returns the <strong
				>distance to the nearest surface</strong
			>:
		</p>
		<ul class="pl-6 flex flex-col gap-2">
			<li><strong>Positive values</strong> = outside the shape</li>
			<li><strong>Negative values</strong> = inside the shape</li>
			<li><strong>Zero</strong> = exactly on the surface</li>
		</ul>
	</section>

	<section class="flex flex-col gap-4">
		<h2 class="text-xl pt-4 border-t border-border-light">Why SDFs?</h2>
		<ul class="pl-6 flex flex-col gap-2">
			<li><strong>Boolean operations</strong> - Union, subtract, intersect are simple math</li>
			<li><strong>Smooth blending</strong> - Organic shapes emerge naturally</li>
			<li><strong>Resolution independent</strong> - The math works at any scale</li>
			<li><strong>GPU friendly</strong> - Raymarching renders SDFs efficiently</li>
		</ul>
	</section>

	<section class="flex flex-col gap-4">
		<h2 class="text-xl pt-4 border-t border-border-light">From SDF to Mesh</h2>
		<p>
			SDFs are great for modeling and previewing, but games and 3D software need triangle meshes.
			Soyuz uses <strong>Marching Cubes</strong> to convert SDFs to meshes for export.
		</p>
	</section>
</div>
