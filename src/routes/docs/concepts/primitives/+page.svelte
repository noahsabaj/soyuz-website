<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
</script>

<svelte:head><title>Primitives - Soyuz</title></svelte:head>

<div class="doc-page">
	<h1>Primitives</h1>
	<p class="lead">Basic shapes that form the building blocks of your models.</p>

	<section>
		<h2>3D Primitives</h2>
		<CodeBlock
			code={`sphere(radius)                    // Ball
cube(size)                        // Box with equal sides
box3(width, height, depth)        // Rectangular box
cylinder(radius, height)          // Cylinder along Y axis
capsule(radius, height)           // Pill shape
torus(major_radius, minor_radius) // Donut
cone(radius, height)              // Cone pointing up
ellipsoid(rx, ry, rz)             // Stretched sphere`}
		/>
	</section>

	<section>
		<h2>Additional Shapes</h2>
		<CodeBlock
			code={`rounded_box(w, h, d, radius)  // Box with rounded edges
octahedron(size)              // 8-faced platonic solid
hex_prism(radius, height)     // Hexagonal column
tri_prism(width, height)      // Triangular prism
plane(nx, ny, nz, offset)     // Infinite plane
ground_plane()                // Shortcut for y=0 plane`}
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
