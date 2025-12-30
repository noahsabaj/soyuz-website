<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
</script>

<svelte:head>
	<title>Primitives API - Soyuz</title>
</svelte:head>

<div class="flex flex-col gap-8">
	<header>
		<h1 class="mb-2">Primitives API</h1>
		<p class="text-lg text-text-muted">Complete reference for all primitive shapes.</p>
	</header>

	<section class="flex flex-col gap-4">
		<h2 class="text-xl pt-4 border-t border-border-light">sphere</h2>
		<p>Creates a sphere centered at the origin.</p>
		<CodeBlock code="sphere(radius: f64) -> Sdf" />
		<div class="overflow-x-auto">
			<table class="w-full text-sm border-2 border-border">
				<thead class="bg-bg-alt">
					<tr>
						<th class="text-left p-2 border-b border-border">Parameter</th>
						<th class="text-left p-2 border-b border-border">Type</th>
						<th class="text-left p-2 border-b border-border">Description</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="p-2 border-b border-border-light font-mono">radius</td>
						<td class="p-2 border-b border-border-light">f64</td>
						<td class="p-2 border-b border-border-light">Radius of the sphere</td>
					</tr>
				</tbody>
			</table>
		</div>
		<CodeBlock code="sphere(0.5)" compact />
	</section>

	<section class="flex flex-col gap-4">
		<h2 class="text-xl pt-4 border-t border-border-light">cube</h2>
		<p>Creates a cube with equal sides, centered at the origin.</p>
		<CodeBlock code="cube(size: f64) -> Sdf" />
		<div class="overflow-x-auto">
			<table class="w-full text-sm border-2 border-border">
				<thead class="bg-bg-alt">
					<tr>
						<th class="text-left p-2 border-b border-border">Parameter</th>
						<th class="text-left p-2 border-b border-border">Type</th>
						<th class="text-left p-2 border-b border-border">Description</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="p-2 border-b border-border-light font-mono">size</td>
						<td class="p-2 border-b border-border-light">f64</td>
						<td class="p-2 border-b border-border-light">Length of each edge</td>
					</tr>
				</tbody>
			</table>
		</div>
		<CodeBlock code="cube(1.0)" compact />
	</section>

	<section class="flex flex-col gap-4">
		<h2 class="text-xl pt-4 border-t border-border-light">box3</h2>
		<p>Creates a rectangular box with different dimensions per axis, centered at the origin.</p>
		<CodeBlock code="box3(width: f64, height: f64, depth: f64) -> Sdf" />
		<div class="overflow-x-auto">
			<table class="w-full text-sm border-2 border-border">
				<thead class="bg-bg-alt">
					<tr>
						<th class="text-left p-2 border-b border-border">Parameter</th>
						<th class="text-left p-2 border-b border-border">Type</th>
						<th class="text-left p-2 border-b border-border">Description</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="p-2 border-b border-border-light font-mono">width</td>
						<td class="p-2 border-b border-border-light">f64</td>
						<td class="p-2 border-b border-border-light">Full width along X axis</td>
					</tr>
					<tr>
						<td class="p-2 border-b border-border-light font-mono">height</td>
						<td class="p-2 border-b border-border-light">f64</td>
						<td class="p-2 border-b border-border-light">Full height along Y axis</td>
					</tr>
					<tr>
						<td class="p-2 border-b border-border-light font-mono">depth</td>
						<td class="p-2 border-b border-border-light">f64</td>
						<td class="p-2 border-b border-border-light">Full depth along Z axis</td>
					</tr>
				</tbody>
			</table>
		</div>
		<CodeBlock code="box3(1.0, 0.5, 0.3)" compact />
	</section>

	<section class="flex flex-col gap-4">
		<h2 class="text-xl pt-4 border-t border-border-light">rounded_box</h2>
		<p>Creates a rectangular box with rounded edges and corners.</p>
		<CodeBlock code="rounded_box(width: f64, height: f64, depth: f64, radius: f64) -> Sdf" />
		<div class="overflow-x-auto">
			<table class="w-full text-sm border-2 border-border">
				<thead class="bg-bg-alt">
					<tr>
						<th class="text-left p-2 border-b border-border">Parameter</th>
						<th class="text-left p-2 border-b border-border">Type</th>
						<th class="text-left p-2 border-b border-border">Description</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="p-2 border-b border-border-light font-mono">width</td>
						<td class="p-2 border-b border-border-light">f64</td>
						<td class="p-2 border-b border-border-light">Full width along X axis</td>
					</tr>
					<tr>
						<td class="p-2 border-b border-border-light font-mono">height</td>
						<td class="p-2 border-b border-border-light">f64</td>
						<td class="p-2 border-b border-border-light">Full height along Y axis</td>
					</tr>
					<tr>
						<td class="p-2 border-b border-border-light font-mono">depth</td>
						<td class="p-2 border-b border-border-light">f64</td>
						<td class="p-2 border-b border-border-light">Full depth along Z axis</td>
					</tr>
					<tr>
						<td class="p-2 border-b border-border-light font-mono">radius</td>
						<td class="p-2 border-b border-border-light">f64</td>
						<td class="p-2 border-b border-border-light">Corner rounding radius</td>
					</tr>
				</tbody>
			</table>
		</div>
		<CodeBlock code="rounded_box(1.0, 0.5, 0.3, 0.1)" compact />
	</section>

	<section class="flex flex-col gap-4">
		<h2 class="text-xl pt-4 border-t border-border-light">cylinder</h2>
		<p>Creates a cylinder aligned along the Y axis, centered at the origin.</p>
		<CodeBlock code="cylinder(radius: f64, height: f64) -> Sdf" />
		<div class="overflow-x-auto">
			<table class="w-full text-sm border-2 border-border">
				<thead class="bg-bg-alt">
					<tr>
						<th class="text-left p-2 border-b border-border">Parameter</th>
						<th class="text-left p-2 border-b border-border">Type</th>
						<th class="text-left p-2 border-b border-border">Description</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="p-2 border-b border-border-light font-mono">radius</td>
						<td class="p-2 border-b border-border-light">f64</td>
						<td class="p-2 border-b border-border-light">Radius of the cylinder</td>
					</tr>
					<tr>
						<td class="p-2 border-b border-border-light font-mono">height</td>
						<td class="p-2 border-b border-border-light">f64</td>
						<td class="p-2 border-b border-border-light">Full height of the cylinder</td>
					</tr>
				</tbody>
			</table>
		</div>
		<CodeBlock code="cylinder(0.4, 1.0)" compact />
	</section>

	<section class="flex flex-col gap-4">
		<h2 class="text-xl pt-4 border-t border-border-light">capsule</h2>
		<p>Creates a pill-shaped primitive (cylinder with hemispherical caps), aligned along Y axis.</p>
		<CodeBlock code="capsule(radius: f64, height: f64) -> Sdf" />
		<div class="overflow-x-auto">
			<table class="w-full text-sm border-2 border-border">
				<thead class="bg-bg-alt">
					<tr>
						<th class="text-left p-2 border-b border-border">Parameter</th>
						<th class="text-left p-2 border-b border-border">Type</th>
						<th class="text-left p-2 border-b border-border">Description</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="p-2 border-b border-border-light font-mono">radius</td>
						<td class="p-2 border-b border-border-light">f64</td>
						<td class="p-2 border-b border-border-light">Radius of the capsule body and caps</td>
					</tr>
					<tr>
						<td class="p-2 border-b border-border-light font-mono">height</td>
						<td class="p-2 border-b border-border-light">f64</td>
						<td class="p-2 border-b border-border-light">Total height including caps</td>
					</tr>
				</tbody>
			</table>
		</div>
		<CodeBlock code="capsule(0.3, 0.8)" compact />
	</section>

	<section class="flex flex-col gap-4">
		<h2 class="text-xl pt-4 border-t border-border-light">torus</h2>
		<p>Creates a donut shape lying in the XZ plane, centered at the origin.</p>
		<CodeBlock code="torus(major_radius: f64, minor_radius: f64) -> Sdf" />
		<div class="overflow-x-auto">
			<table class="w-full text-sm border-2 border-border">
				<thead class="bg-bg-alt">
					<tr>
						<th class="text-left p-2 border-b border-border">Parameter</th>
						<th class="text-left p-2 border-b border-border">Type</th>
						<th class="text-left p-2 border-b border-border">Description</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="p-2 border-b border-border-light font-mono">major_radius</td>
						<td class="p-2 border-b border-border-light">f64</td>
						<td class="p-2 border-b border-border-light">Distance from center to tube center</td>
					</tr>
					<tr>
						<td class="p-2 border-b border-border-light font-mono">minor_radius</td>
						<td class="p-2 border-b border-border-light">f64</td>
						<td class="p-2 border-b border-border-light">Radius of the tube itself</td>
					</tr>
				</tbody>
			</table>
		</div>
		<CodeBlock code="torus(0.5, 0.15)" compact />
	</section>

	<section class="flex flex-col gap-4">
		<h2 class="text-xl pt-4 border-t border-border-light">cone</h2>
		<p>Creates a cone with its tip at the origin, opening upward along the Y axis.</p>
		<CodeBlock code="cone(radius: f64, height: f64) -> Sdf" />
		<div class="overflow-x-auto">
			<table class="w-full text-sm border-2 border-border">
				<thead class="bg-bg-alt">
					<tr>
						<th class="text-left p-2 border-b border-border">Parameter</th>
						<th class="text-left p-2 border-b border-border">Type</th>
						<th class="text-left p-2 border-b border-border">Description</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="p-2 border-b border-border-light font-mono">radius</td>
						<td class="p-2 border-b border-border-light">f64</td>
						<td class="p-2 border-b border-border-light">Radius of the base</td>
					</tr>
					<tr>
						<td class="p-2 border-b border-border-light font-mono">height</td>
						<td class="p-2 border-b border-border-light">f64</td>
						<td class="p-2 border-b border-border-light">Height of the cone</td>
					</tr>
				</tbody>
			</table>
		</div>
		<CodeBlock code="cone(0.5, 1.0)" compact />
	</section>

	<section class="flex flex-col gap-4">
		<h2 class="text-xl pt-4 border-t border-border-light">ellipsoid</h2>
		<p>Creates a stretched sphere with different radii per axis.</p>
		<CodeBlock code="ellipsoid(rx: f64, ry: f64, rz: f64) -> Sdf" />
		<div class="overflow-x-auto">
			<table class="w-full text-sm border-2 border-border">
				<thead class="bg-bg-alt">
					<tr>
						<th class="text-left p-2 border-b border-border">Parameter</th>
						<th class="text-left p-2 border-b border-border">Type</th>
						<th class="text-left p-2 border-b border-border">Description</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="p-2 border-b border-border-light font-mono">rx</td>
						<td class="p-2 border-b border-border-light">f64</td>
						<td class="p-2 border-b border-border-light">Radius along X axis</td>
					</tr>
					<tr>
						<td class="p-2 border-b border-border-light font-mono">ry</td>
						<td class="p-2 border-b border-border-light">f64</td>
						<td class="p-2 border-b border-border-light">Radius along Y axis</td>
					</tr>
					<tr>
						<td class="p-2 border-b border-border-light font-mono">rz</td>
						<td class="p-2 border-b border-border-light">f64</td>
						<td class="p-2 border-b border-border-light">Radius along Z axis</td>
					</tr>
				</tbody>
			</table>
		</div>
		<CodeBlock code="ellipsoid(0.6, 0.4, 0.3)" compact />
	</section>

	<section class="flex flex-col gap-4">
		<h2 class="text-xl pt-4 border-t border-border-light">octahedron</h2>
		<p>Creates an 8-faced platonic solid (diamond shape), centered at the origin.</p>
		<CodeBlock code="octahedron(size: f64) -> Sdf" />
		<div class="overflow-x-auto">
			<table class="w-full text-sm border-2 border-border">
				<thead class="bg-bg-alt">
					<tr>
						<th class="text-left p-2 border-b border-border">Parameter</th>
						<th class="text-left p-2 border-b border-border">Type</th>
						<th class="text-left p-2 border-b border-border">Description</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="p-2 border-b border-border-light font-mono">size</td>
						<td class="p-2 border-b border-border-light">f64</td>
						<td class="p-2 border-b border-border-light">Size of the octahedron</td>
					</tr>
				</tbody>
			</table>
		</div>
		<CodeBlock code="octahedron(0.6)" compact />
	</section>

	<section class="flex flex-col gap-4">
		<h2 class="text-xl pt-4 border-t border-border-light">hex_prism</h2>
		<p>Creates a hexagonal prism (6-sided column), aligned along the Y axis.</p>
		<CodeBlock code="hex_prism(radius: f64, height: f64) -> Sdf" />
		<div class="overflow-x-auto">
			<table class="w-full text-sm border-2 border-border">
				<thead class="bg-bg-alt">
					<tr>
						<th class="text-left p-2 border-b border-border">Parameter</th>
						<th class="text-left p-2 border-b border-border">Type</th>
						<th class="text-left p-2 border-b border-border">Description</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="p-2 border-b border-border-light font-mono">radius</td>
						<td class="p-2 border-b border-border-light">f64</td>
						<td class="p-2 border-b border-border-light">Circumradius of the hexagon</td>
					</tr>
					<tr>
						<td class="p-2 border-b border-border-light font-mono">height</td>
						<td class="p-2 border-b border-border-light">f64</td>
						<td class="p-2 border-b border-border-light">Full height of the prism</td>
					</tr>
				</tbody>
			</table>
		</div>
		<CodeBlock code="hex_prism(0.4, 0.8)" compact />
	</section>

	<section class="flex flex-col gap-4">
		<h2 class="text-xl pt-4 border-t border-border-light">tri_prism</h2>
		<p>Creates a triangular prism, aligned along the Y axis.</p>
		<CodeBlock code="tri_prism(width: f64, height: f64) -> Sdf" />
		<div class="overflow-x-auto">
			<table class="w-full text-sm border-2 border-border">
				<thead class="bg-bg-alt">
					<tr>
						<th class="text-left p-2 border-b border-border">Parameter</th>
						<th class="text-left p-2 border-b border-border">Type</th>
						<th class="text-left p-2 border-b border-border">Description</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="p-2 border-b border-border-light font-mono">width</td>
						<td class="p-2 border-b border-border-light">f64</td>
						<td class="p-2 border-b border-border-light">Base width of the triangle</td>
					</tr>
					<tr>
						<td class="p-2 border-b border-border-light font-mono">height</td>
						<td class="p-2 border-b border-border-light">f64</td>
						<td class="p-2 border-b border-border-light">Height of the prism</td>
					</tr>
				</tbody>
			</table>
		</div>
		<CodeBlock code="tri_prism(0.5, 0.8)" compact />
	</section>

	<section class="flex flex-col gap-4">
		<h2 class="text-xl pt-4 border-t border-border-light">plane</h2>
		<p>Creates an infinite plane defined by a normal vector and offset from the origin.</p>
		<CodeBlock code="plane(nx: f64, ny: f64, nz: f64, offset: f64) -> Sdf" />
		<div class="overflow-x-auto">
			<table class="w-full text-sm border-2 border-border">
				<thead class="bg-bg-alt">
					<tr>
						<th class="text-left p-2 border-b border-border">Parameter</th>
						<th class="text-left p-2 border-b border-border">Type</th>
						<th class="text-left p-2 border-b border-border">Description</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="p-2 border-b border-border-light font-mono">nx</td>
						<td class="p-2 border-b border-border-light">f64</td>
						<td class="p-2 border-b border-border-light">X component of normal (auto-normalized)</td>
					</tr>
					<tr>
						<td class="p-2 border-b border-border-light font-mono">ny</td>
						<td class="p-2 border-b border-border-light">f64</td>
						<td class="p-2 border-b border-border-light">Y component of normal (auto-normalized)</td>
					</tr>
					<tr>
						<td class="p-2 border-b border-border-light font-mono">nz</td>
						<td class="p-2 border-b border-border-light">f64</td>
						<td class="p-2 border-b border-border-light">Z component of normal (auto-normalized)</td>
					</tr>
					<tr>
						<td class="p-2 border-b border-border-light font-mono">offset</td>
						<td class="p-2 border-b border-border-light">f64</td>
						<td class="p-2 border-b border-border-light">Distance from origin along normal</td>
					</tr>
				</tbody>
			</table>
		</div>
		<CodeBlock code={`// Horizontal plane at y=0
plane(0.0, 1.0, 0.0, 0.0)`} compact />
	</section>

	<section class="flex flex-col gap-4">
		<h2 class="text-xl pt-4 border-t border-border-light">ground_plane</h2>
		<p>Convenience function for a horizontal ground plane at y=0.</p>
		<CodeBlock code="ground_plane() -> Sdf" />
		<p class="text-sm text-text-muted">Equivalent to <code>plane(0.0, 1.0, 0.0, 0.0)</code></p>
		<CodeBlock code="ground_plane()" compact />
	</section>
</div>
