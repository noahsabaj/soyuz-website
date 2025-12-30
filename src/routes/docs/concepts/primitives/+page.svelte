<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
</script>

<svelte:head>
	<title>Primitives - Soyuz</title>
</svelte:head>

<div class="flex flex-col gap-8">
	<header>
		<h1 class="mb-2">Primitives</h1>
		<p class="text-lg text-text-muted">Basic shapes that form the building blocks of your models.</p>
	</header>

	<section class="flex flex-col gap-4">
		<h2 class="text-xl pt-4 border-t border-border-light">3D Primitives</h2>
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

	<section class="flex flex-col gap-4">
		<h2 class="text-xl pt-4 border-t border-border-light">Additional Shapes</h2>
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
