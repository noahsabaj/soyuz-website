<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
</script>

<svelte:head>
	<title>Operations API - Soyuz</title>
</svelte:head>

<div class="flex flex-col gap-8">
	<header>
		<h1 class="mb-2">Operations API</h1>
		<p class="text-lg text-text-muted">Complete reference for boolean operations, smooth blends, and modifiers.</p>
	</header>

	<section class="flex flex-col gap-6">
		<h2 class="text-xl pt-4 border-t border-border-light">Boolean Operations</h2>
		<p>Combine shapes using standard constructive solid geometry (CSG) operations.</p>

		<div class="flex flex-col gap-4">
			<h3 class="text-lg font-semibold">.union()</h3>
			<p>Combines two shapes together (logical OR).</p>
			<CodeBlock code="shape.union(other: Sdf) -> Sdf" />
			<CodeBlock code={`// Combine a sphere and cube
sphere(0.5).union(cube(0.7))`} compact />
		</div>

		<div class="flex flex-col gap-4">
			<h3 class="text-lg font-semibold">.subtract()</h3>
			<p>Removes one shape from another (A minus B).</p>
			<CodeBlock code="shape.subtract(other: Sdf) -> Sdf" />
			<CodeBlock code={`// Cut a hole in a cube
cube(1.0).subtract(sphere(0.7))`} compact />
		</div>

		<div class="flex flex-col gap-4">
			<h3 class="text-lg font-semibold">.intersect()</h3>
			<p>Keeps only the overlapping region of two shapes (logical AND).</p>
			<CodeBlock code="shape.intersect(other: Sdf) -> Sdf" />
			<CodeBlock code={`// Keep only where sphere and cube overlap
sphere(0.6).intersect(cube(0.8))`} compact />
		</div>
	</section>

	<section class="flex flex-col gap-6">
		<h2 class="text-xl pt-4 border-t border-border-light">Smooth Operations</h2>
		<p>Blend shapes together with organic, filleted transitions. The <code>k</code> parameter controls the blend radius.</p>

		<div class="p-4 bg-bg-alt border-2 border-border">
			<h4 class="font-semibold mb-2">The k parameter (blend radius)</h4>
			<ul class="list-none flex flex-col gap-1 text-sm">
				<li><code>k = 0.01</code> - Barely visible blend</li>
				<li><code>k = 0.05</code> - Subtle fillet</li>
				<li><code>k = 0.1</code> - Noticeable blend</li>
				<li><code>k = 0.2+</code> - Organic, blobby appearance</li>
			</ul>
		</div>

		<div class="flex flex-col gap-4">
			<h3 class="text-lg font-semibold">.smooth_union()</h3>
			<p>Blends two shapes together with a smooth transition.</p>
			<CodeBlock code="shape.smooth_union(other: Sdf, k: f64) -> Sdf" />
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
							<td class="p-2 border-b border-border-light font-mono">other</td>
							<td class="p-2 border-b border-border-light">Sdf</td>
							<td class="p-2 border-b border-border-light">Shape to blend with</td>
						</tr>
						<tr>
							<td class="p-2 border-b border-border-light font-mono">k</td>
							<td class="p-2 border-b border-border-light">f64</td>
							<td class="p-2 border-b border-border-light">Blend radius (larger = softer)</td>
						</tr>
					</tbody>
				</table>
			</div>
			<CodeBlock code={`// Organic blob from two spheres
let a = sphere(0.4);
let b = sphere(0.4).translate_x(0.5);
a.smooth_union(b, 0.2)`} compact />
		</div>

		<div class="flex flex-col gap-4">
			<h3 class="text-lg font-semibold">.smooth_subtract()</h3>
			<p>Subtracts with a filleted edge instead of a sharp cut.</p>
			<CodeBlock code="shape.smooth_subtract(other: Sdf, k: f64) -> Sdf" />
			<CodeBlock code={`// Soft-edged cavity
cube(1.0).smooth_subtract(sphere(0.6), 0.1)`} compact />
		</div>

		<div class="flex flex-col gap-4">
			<h3 class="text-lg font-semibold">.smooth_intersect()</h3>
			<p>Intersection with filleted edges where shapes meet.</p>
			<CodeBlock code="shape.smooth_intersect(other: Sdf, k: f64) -> Sdf" />
			<CodeBlock code={`// Rounded intersection
sphere(0.6).smooth_intersect(cube(0.8), 0.1)`} compact />
		</div>
	</section>

	<section class="flex flex-col gap-6">
		<h2 class="text-xl pt-4 border-t border-border-light">Surface Modifiers</h2>
		<p>Transform the surface or volume of shapes.</p>

		<div class="flex flex-col gap-4">
			<h3 class="text-lg font-semibold">.shell() / .hollow()</h3>
			<p>Makes a shape hollow with specified wall thickness. Both methods are equivalent.</p>
			<CodeBlock code={`shape.shell(thickness: f64) -> Sdf
shape.hollow(thickness: f64) -> Sdf`} />
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
							<td class="p-2 border-b border-border-light font-mono">thickness</td>
							<td class="p-2 border-b border-border-light">f64</td>
							<td class="p-2 border-b border-border-light">Wall thickness</td>
						</tr>
					</tbody>
				</table>
			</div>
			<CodeBlock code={`// Hollow sphere with 0.05 thick walls
sphere(0.5).shell(0.05)`} compact />
		</div>

		<div class="flex flex-col gap-4">
			<h3 class="text-lg font-semibold">.round()</h3>
			<p>Rounds all edges and corners of a shape.</p>
			<CodeBlock code="shape.round(radius: f64) -> Sdf" />
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
							<td class="p-2 border-b border-border-light">Rounding radius</td>
						</tr>
					</tbody>
				</table>
			</div>
			<CodeBlock code={`// Cube with rounded corners
cube(1.0).round(0.1)`} compact />
		</div>

		<div class="flex flex-col gap-4">
			<h3 class="text-lg font-semibold">.onion()</h3>
			<p>Creates concentric shells like an onion.</p>
			<CodeBlock code="shape.onion(thickness: f64) -> Sdf" />
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
							<td class="p-2 border-b border-border-light font-mono">thickness</td>
							<td class="p-2 border-b border-border-light">f64</td>
							<td class="p-2 border-b border-border-light">Spacing between shells</td>
						</tr>
					</tbody>
				</table>
			</div>
			<CodeBlock code={`// Concentric spherical shells
sphere(0.5).onion(0.1)`} compact />
		</div>

		<div class="flex flex-col gap-4">
			<h3 class="text-lg font-semibold">.elongate()</h3>
			<p>Stretches a shape by inserting flat sections along each axis.</p>
			<CodeBlock code="shape.elongate(x: f64, y: f64, z: f64) -> Sdf" />
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
							<td class="p-2 border-b border-border-light font-mono">x</td>
							<td class="p-2 border-b border-border-light">f64</td>
							<td class="p-2 border-b border-border-light">Elongation along X axis</td>
						</tr>
						<tr>
							<td class="p-2 border-b border-border-light font-mono">y</td>
							<td class="p-2 border-b border-border-light">f64</td>
							<td class="p-2 border-b border-border-light">Elongation along Y axis</td>
						</tr>
						<tr>
							<td class="p-2 border-b border-border-light font-mono">z</td>
							<td class="p-2 border-b border-border-light">f64</td>
							<td class="p-2 border-b border-border-light">Elongation along Z axis</td>
						</tr>
					</tbody>
				</table>
			</div>
			<CodeBlock code={`// Stretched sphere (capsule-like)
sphere(0.3).elongate(0.5, 0.0, 0.0)`} compact />
		</div>
	</section>

	<section class="flex flex-col gap-6">
		<h2 class="text-xl pt-4 border-t border-border-light">Deformations</h2>
		<p>Warp and bend shapes in space.</p>

		<div class="flex flex-col gap-4">
			<h3 class="text-lg font-semibold">.twist()</h3>
			<p>Twists a shape around the Y axis progressively along its height.</p>
			<CodeBlock code="shape.twist(amount: f64) -> Sdf" />
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
							<td class="p-2 border-b border-border-light font-mono">amount</td>
							<td class="p-2 border-b border-border-light">f64</td>
							<td class="p-2 border-b border-border-light">Twist per unit height (radians)</td>
						</tr>
					</tbody>
				</table>
			</div>
			<CodeBlock code={`// Twisted column
box3(0.3, 2.0, 0.3).twist(2.0)`} compact />
		</div>

		<div class="flex flex-col gap-4">
			<h3 class="text-lg font-semibold">.bend()</h3>
			<p>Bends a shape around the Y axis.</p>
			<CodeBlock code="shape.bend(amount: f64) -> Sdf" />
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
							<td class="p-2 border-b border-border-light font-mono">amount</td>
							<td class="p-2 border-b border-border-light">f64</td>
							<td class="p-2 border-b border-border-light">Bend curvature amount</td>
						</tr>
					</tbody>
				</table>
			</div>
			<CodeBlock code={`// Curved bar
box3(2.0, 0.2, 0.3).bend(1.0)`} compact />
		</div>
	</section>

	<section class="flex flex-col gap-6">
		<h2 class="text-xl pt-4 border-t border-border-light">Repetition</h2>
		<p>Create patterns by repeating shapes.</p>

		<div class="flex flex-col gap-4">
			<h3 class="text-lg font-semibold">.repeat()</h3>
			<p>Infinitely repeats a shape with the given spacing. Use with caution - creates infinite geometry.</p>
			<CodeBlock code="shape.repeat(sx: f64, sy: f64, sz: f64) -> Sdf" />
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
							<td class="p-2 border-b border-border-light font-mono">sx</td>
							<td class="p-2 border-b border-border-light">f64</td>
							<td class="p-2 border-b border-border-light">Spacing along X axis</td>
						</tr>
						<tr>
							<td class="p-2 border-b border-border-light font-mono">sy</td>
							<td class="p-2 border-b border-border-light">f64</td>
							<td class="p-2 border-b border-border-light">Spacing along Y axis</td>
						</tr>
						<tr>
							<td class="p-2 border-b border-border-light font-mono">sz</td>
							<td class="p-2 border-b border-border-light">f64</td>
							<td class="p-2 border-b border-border-light">Spacing along Z axis</td>
						</tr>
					</tbody>
				</table>
			</div>
			<CodeBlock code={`// Infinite grid of spheres
sphere(0.2).repeat(1.0, 1.0, 1.0)`} compact />
		</div>

		<div class="flex flex-col gap-4">
			<h3 class="text-lg font-semibold">.repeat_limited()</h3>
			<p>Creates a finite grid of copies with specified count per axis.</p>
			<CodeBlock code="shape.repeat_limited(sx: f64, sy: f64, sz: f64, cx: f64, cy: f64, cz: f64) -> Sdf" />
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
							<td class="p-2 border-b border-border-light font-mono">sx, sy, sz</td>
							<td class="p-2 border-b border-border-light">f64</td>
							<td class="p-2 border-b border-border-light">Spacing between copies</td>
						</tr>
						<tr>
							<td class="p-2 border-b border-border-light font-mono">cx, cy, cz</td>
							<td class="p-2 border-b border-border-light">f64</td>
							<td class="p-2 border-b border-border-light">Number of copies per axis</td>
						</tr>
					</tbody>
				</table>
			</div>
			<CodeBlock code={`// 3x3x3 grid of spheres
sphere(0.1).repeat_limited(0.3, 0.3, 0.3, 3.0, 3.0, 3.0)`} compact />
		</div>

		<div class="flex flex-col gap-4">
			<h3 class="text-lg font-semibold">.repeat_polar()</h3>
			<p>Repeats a shape in a circular pattern around the Y axis.</p>
			<CodeBlock code="shape.repeat_polar(count: i64) -> Sdf" />
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
							<td class="p-2 border-b border-border-light font-mono">count</td>
							<td class="p-2 border-b border-border-light">i64</td>
							<td class="p-2 border-b border-border-light">Number of copies around circle</td>
						</tr>
					</tbody>
				</table>
			</div>
			<CodeBlock code={`// Gear teeth pattern
let tooth = box3(0.1, 0.5, 0.1).translate_x(0.5);
tooth.repeat_polar(8)`} compact />
		</div>
	</section>
</div>
