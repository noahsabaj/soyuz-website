<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
</script>

<svelte:head>
	<title>Transforms API - Soyuz</title>
</svelte:head>

<div class="flex flex-col gap-8">
	<header>
		<h1 class="mb-2">Transforms API</h1>
		<p class="text-lg text-text-muted">
			Complete reference for spatial transform operations. Transforms modify the position,
			orientation, and scale of shapes without changing their underlying geometry.
		</p>
	</header>

	<nav class="p-4 bg-bg-alt border-2 border-border">
		<h2 class="text-sm uppercase tracking-wide text-text-muted mb-3">On This Page</h2>
		<ul class="flex flex-col gap-1 text-sm">
			<li><a href="#translation">Translation</a></li>
			<li><a href="#rotation">Rotation</a></li>
			<li><a href="#scale">Scale</a></li>
			<li><a href="#mirror">Mirror</a></li>
			<li><a href="#symmetry">Symmetry</a></li>
			<li><a href="#math-helpers">Math Helpers</a></li>
		</ul>
	</nav>

	<!-- Translation -->
	<section id="translation" class="scroll-mt-4">
		<h2 class="text-2xl mb-4 pb-2 border-b-2 border-border">Translation</h2>
		<p class="text-text-muted mb-6">
			Move shapes in 3D space. Translation shifts the shape's position without affecting its
			orientation or size.
		</p>

		<div class="flex flex-col gap-6">
			<!-- translate -->
			<div class="card">
				<h3 class="font-mono text-lg text-accent mb-2">translate(x, y, z)</h3>
				<p class="text-text-muted mb-4">
					Move a shape by the specified offset in all three dimensions simultaneously.
				</p>
				<div class="overflow-x-auto mb-4">
					<table class="w-full text-sm border-collapse">
						<thead>
							<tr class="border-b-2 border-border">
								<th class="text-left py-2 pr-4">Parameter</th>
								<th class="text-left py-2 pr-4">Type</th>
								<th class="text-left py-2">Description</th>
							</tr>
						</thead>
						<tbody>
							<tr class="border-b border-border-light">
								<td class="py-2 pr-4 font-mono">x</td>
								<td class="py-2 pr-4 text-text-muted">float</td>
								<td class="py-2">Offset along X axis (positive = right)</td>
							</tr>
							<tr class="border-b border-border-light">
								<td class="py-2 pr-4 font-mono">y</td>
								<td class="py-2 pr-4 text-text-muted">float</td>
								<td class="py-2">Offset along Y axis (positive = up)</td>
							</tr>
							<tr>
								<td class="py-2 pr-4 font-mono">z</td>
								<td class="py-2 pr-4 text-text-muted">float</td>
								<td class="py-2">Offset along Z axis (positive = forward)</td>
							</tr>
						</tbody>
					</table>
				</div>
				<CodeBlock
					code={`// Move a sphere to position (1, 2, 0.5)
sphere(0.3).translate(1.0, 2.0, 0.5)

// Create a diagonal arrangement
let a = cube(0.2);
let b = cube(0.2).translate(0.5, 0.5, 0.5);
let c = cube(0.2).translate(1.0, 1.0, 1.0);
a.union(b).union(c)`}
				/>
			</div>

			<!-- translate_x -->
			<div class="card">
				<h3 class="font-mono text-lg text-accent mb-2">translate_x(distance)</h3>
				<p class="text-text-muted mb-4">Move a shape along the X axis only.</p>
				<div class="overflow-x-auto mb-4">
					<table class="w-full text-sm border-collapse">
						<thead>
							<tr class="border-b-2 border-border">
								<th class="text-left py-2 pr-4">Parameter</th>
								<th class="text-left py-2 pr-4">Type</th>
								<th class="text-left py-2">Description</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td class="py-2 pr-4 font-mono">distance</td>
								<td class="py-2 pr-4 text-text-muted">float</td>
								<td class="py-2">Offset along X axis</td>
							</tr>
						</tbody>
					</table>
				</div>
				<CodeBlock
					code={`// Position gear teeth around a hub
let tooth = box3(0.1, 0.15, 0.08).translate_x(0.5);
tooth.repeat_polar(12)`}
				/>
			</div>

			<!-- translate_y -->
			<div class="card">
				<h3 class="font-mono text-lg text-accent mb-2">translate_y(distance)</h3>
				<p class="text-text-muted mb-4">Move a shape along the Y axis only (vertical).</p>
				<div class="overflow-x-auto mb-4">
					<table class="w-full text-sm border-collapse">
						<thead>
							<tr class="border-b-2 border-border">
								<th class="text-left py-2 pr-4">Parameter</th>
								<th class="text-left py-2 pr-4">Type</th>
								<th class="text-left py-2">Description</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td class="py-2 pr-4 font-mono">distance</td>
								<td class="py-2 pr-4 text-text-muted">float</td>
								<td class="py-2">Offset along Y axis (positive = up)</td>
							</tr>
						</tbody>
					</table>
				</div>
				<CodeBlock
					code={`// Stack rings on a barrel
let ring_top = torus(0.5, 0.08).translate_y(0.4);
let ring_bot = torus(0.5, 0.08).translate_y(-0.4);

cylinder(0.5, 1.0)
    .smooth_union(ring_top, 0.05)
    .smooth_union(ring_bot, 0.05)`}
				/>
			</div>

			<!-- translate_z -->
			<div class="card">
				<h3 class="font-mono text-lg text-accent mb-2">translate_z(distance)</h3>
				<p class="text-text-muted mb-4">Move a shape along the Z axis only (depth).</p>
				<div class="overflow-x-auto mb-4">
					<table class="w-full text-sm border-collapse">
						<thead>
							<tr class="border-b-2 border-border">
								<th class="text-left py-2 pr-4">Parameter</th>
								<th class="text-left py-2 pr-4">Type</th>
								<th class="text-left py-2">Description</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td class="py-2 pr-4 font-mono">distance</td>
								<td class="py-2 pr-4 text-text-muted">float</td>
								<td class="py-2">Offset along Z axis (positive = forward)</td>
							</tr>
						</tbody>
					</table>
				</div>
				<CodeBlock
					code={`// Create depth layers
let front = sphere(0.3).translate_z(0.5);
let back = sphere(0.3).translate_z(-0.5);
front.union(back)`}
				/>
			</div>
		</div>
	</section>

	<!-- Rotation -->
	<section id="rotation" class="scroll-mt-4">
		<h2 class="text-2xl mb-4 pb-2 border-b-2 border-border">Rotation</h2>
		<p class="text-text-muted mb-6">
			Rotate shapes around the coordinate axes. Use the <code>deg()</code> helper to specify
			angles in degrees, or pass radians directly.
		</p>

		<div class="flex flex-col gap-6">
			<!-- rotate_x -->
			<div class="card">
				<h3 class="font-mono text-lg text-accent mb-2">rotate_x(angle)</h3>
				<p class="text-text-muted mb-4">
					Rotate around the X axis (pitch). Positive angles rotate counterclockwise when
					looking down the positive X axis.
				</p>
				<div class="overflow-x-auto mb-4">
					<table class="w-full text-sm border-collapse">
						<thead>
							<tr class="border-b-2 border-border">
								<th class="text-left py-2 pr-4">Parameter</th>
								<th class="text-left py-2 pr-4">Type</th>
								<th class="text-left py-2">Description</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td class="py-2 pr-4 font-mono">angle</td>
								<td class="py-2 pr-4 text-text-muted">float</td>
								<td class="py-2">Rotation angle in radians (use <code>deg()</code> for degrees)</td>
							</tr>
						</tbody>
					</table>
				</div>
				<CodeBlock
					code={`// Tilt a cylinder 45 degrees forward
cylinder(0.3, 1.0).rotate_x(deg(45))

// Lay a capsule flat
capsule(0.2, 0.8).rotate_x(deg(90))`}
				/>
			</div>

			<!-- rotate_y -->
			<div class="card">
				<h3 class="font-mono text-lg text-accent mb-2">rotate_y(angle)</h3>
				<p class="text-text-muted mb-4">
					Rotate around the Y axis (yaw). Positive angles rotate counterclockwise when
					looking down from above.
				</p>
				<div class="overflow-x-auto mb-4">
					<table class="w-full text-sm border-collapse">
						<thead>
							<tr class="border-b-2 border-border">
								<th class="text-left py-2 pr-4">Parameter</th>
								<th class="text-left py-2 pr-4">Type</th>
								<th class="text-left py-2">Description</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td class="py-2 pr-4 font-mono">angle</td>
								<td class="py-2 pr-4 text-text-muted">float</td>
								<td class="py-2">Rotation angle in radians (use <code>deg()</code> for degrees)</td>
							</tr>
						</tbody>
					</table>
				</div>
				<CodeBlock
					code={`// Rotate a box 30 degrees around vertical axis
box3(0.5, 0.3, 0.2).rotate_y(deg(30))

// Create a fan pattern manually
let blade = box3(0.1, 0.02, 0.4).translate_z(0.3);
let b1 = blade;
let b2 = blade.rotate_y(deg(90));
let b3 = blade.rotate_y(deg(180));
let b4 = blade.rotate_y(deg(270));
b1.union(b2).union(b3).union(b4)`}
				/>
			</div>

			<!-- rotate_z -->
			<div class="card">
				<h3 class="font-mono text-lg text-accent mb-2">rotate_z(angle)</h3>
				<p class="text-text-muted mb-4">
					Rotate around the Z axis (roll). Positive angles rotate counterclockwise when
					looking toward the camera.
				</p>
				<div class="overflow-x-auto mb-4">
					<table class="w-full text-sm border-collapse">
						<thead>
							<tr class="border-b-2 border-border">
								<th class="text-left py-2 pr-4">Parameter</th>
								<th class="text-left py-2 pr-4">Type</th>
								<th class="text-left py-2">Description</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td class="py-2 pr-4 font-mono">angle</td>
								<td class="py-2 pr-4 text-text-muted">float</td>
								<td class="py-2">Rotation angle in radians (use <code>deg()</code> for degrees)</td>
							</tr>
						</tbody>
					</table>
				</div>
				<CodeBlock
					code={`// Tilt a shape 45 degrees
box3(0.4, 0.1, 0.4).rotate_z(deg(45))

// Diamond orientation
cube(0.4).rotate_z(deg(45)).rotate_x(deg(45))`}
				/>
			</div>
		</div>

		<div class="p-4 bg-accent-light border-l-4 border-accent mt-6">
			<p class="text-sm">
				<strong>Tip:</strong> Rotation order matters! <code>rotate_x().rotate_y()</code> produces
				different results than <code>rotate_y().rotate_x()</code>. When combining rotations,
				apply them from right to left (last rotation applied first in the chain is performed first
				in world space).
			</p>
		</div>
	</section>

	<!-- Scale -->
	<section id="scale" class="scroll-mt-4">
		<h2 class="text-2xl mb-4 pb-2 border-b-2 border-border">Scale</h2>
		<p class="text-text-muted mb-6">
			Resize shapes uniformly or along specific axes. Scaling is applied from the shape's origin.
		</p>

		<div class="flex flex-col gap-6">
			<!-- scale -->
			<div class="card">
				<h3 class="font-mono text-lg text-accent mb-2">scale(factor)</h3>
				<p class="text-text-muted mb-4">
					Uniformly scale a shape in all dimensions. Values greater than 1 enlarge,
					values between 0 and 1 shrink.
				</p>
				<div class="overflow-x-auto mb-4">
					<table class="w-full text-sm border-collapse">
						<thead>
							<tr class="border-b-2 border-border">
								<th class="text-left py-2 pr-4">Parameter</th>
								<th class="text-left py-2 pr-4">Type</th>
								<th class="text-left py-2">Description</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td class="py-2 pr-4 font-mono">factor</td>
								<td class="py-2 pr-4 text-text-muted">float</td>
								<td class="py-2">Scale multiplier (1.0 = no change)</td>
							</tr>
						</tbody>
					</table>
				</div>
				<CodeBlock
					code={`// Double the size of a sphere
sphere(0.3).scale(2.0)

// Create nested shells at different scales
let s1 = sphere(0.5).shell(0.02);
let s2 = sphere(0.5).scale(0.7).shell(0.02);
let s3 = sphere(0.5).scale(0.4).shell(0.02);
s1.union(s2).union(s3)`}
				/>
			</div>

			<!-- scale_xyz -->
			<div class="card">
				<h3 class="font-mono text-lg text-accent mb-2">scale_xyz(x, y, z)</h3>
				<p class="text-text-muted mb-4">
					Scale a shape non-uniformly along each axis independently. Useful for stretching
					or squashing shapes.
				</p>
				<div class="overflow-x-auto mb-4">
					<table class="w-full text-sm border-collapse">
						<thead>
							<tr class="border-b-2 border-border">
								<th class="text-left py-2 pr-4">Parameter</th>
								<th class="text-left py-2 pr-4">Type</th>
								<th class="text-left py-2">Description</th>
							</tr>
						</thead>
						<tbody>
							<tr class="border-b border-border-light">
								<td class="py-2 pr-4 font-mono">x</td>
								<td class="py-2 pr-4 text-text-muted">float</td>
								<td class="py-2">Scale factor along X axis</td>
							</tr>
							<tr class="border-b border-border-light">
								<td class="py-2 pr-4 font-mono">y</td>
								<td class="py-2 pr-4 text-text-muted">float</td>
								<td class="py-2">Scale factor along Y axis</td>
							</tr>
							<tr>
								<td class="py-2 pr-4 font-mono">z</td>
								<td class="py-2 pr-4 text-text-muted">float</td>
								<td class="py-2">Scale factor along Z axis</td>
							</tr>
						</tbody>
					</table>
				</div>
				<CodeBlock
					code={`// Flatten a sphere into a disc
sphere(0.5).scale_xyz(1.0, 0.2, 1.0)

// Stretch a cube into a beam
cube(0.3).scale_xyz(0.5, 3.0, 0.5)`}
				/>
			</div>
		</div>

		<div class="p-4 bg-bg-alt border-l-4 border-border mt-6">
			<p class="text-sm">
				<strong>Note:</strong> Non-uniform scaling can distort SDF distance calculations,
				which may affect boolean operations and surface quality. For precise work, prefer
				using primitives with the correct proportions (like <code>ellipsoid</code> instead of
				a scaled sphere).
			</p>
		</div>
	</section>

	<!-- Mirror -->
	<section id="mirror" class="scroll-mt-4">
		<h2 class="text-2xl mb-4 pb-2 border-b-2 border-border">Mirror</h2>
		<p class="text-text-muted mb-6">
			Reflect shapes across coordinate planes. Mirror operations flip the shape to the opposite
			side of the specified plane, replacing the original.
		</p>

		<div class="flex flex-col gap-6">
			<!-- mirror_x -->
			<div class="card">
				<h3 class="font-mono text-lg text-accent mb-2">mirror_x()</h3>
				<p class="text-text-muted mb-4">
					Mirror across the YZ plane (flip left/right). Points with positive X become negative X.
				</p>
				<CodeBlock
					code={`// Flip a shape to the opposite side
sphere(0.3).translate_x(0.5).mirror_x()
// Result: sphere at x = -0.5`}
				/>
			</div>

			<!-- mirror_y -->
			<div class="card">
				<h3 class="font-mono text-lg text-accent mb-2">mirror_y()</h3>
				<p class="text-text-muted mb-4">
					Mirror across the XZ plane (flip up/down). Points with positive Y become negative Y.
				</p>
				<CodeBlock
					code={`// Flip a shape vertically
cone(0.3, 0.6).translate_y(0.3).mirror_y()
// Result: cone pointing up, positioned below origin`}
				/>
			</div>

			<!-- mirror_z -->
			<div class="card">
				<h3 class="font-mono text-lg text-accent mb-2">mirror_z()</h3>
				<p class="text-text-muted mb-4">
					Mirror across the XY plane (flip front/back). Points with positive Z become negative Z.
				</p>
				<CodeBlock
					code={`// Flip a shape in depth
box3(0.2, 0.2, 0.4).translate_z(0.3).mirror_z()
// Result: box at z = -0.3`}
				/>
			</div>
		</div>
	</section>

	<!-- Symmetry -->
	<section id="symmetry" class="scroll-mt-4">
		<h2 class="text-2xl mb-4 pb-2 border-b-2 border-border">Symmetry</h2>
		<p class="text-text-muted mb-6">
			Create symmetric shapes by mirroring and combining with the original. Unlike mirror operations,
			symmetry keeps both the original and the mirrored copy.
		</p>

		<div class="flex flex-col gap-6">
			<!-- symmetry_x -->
			<div class="card">
				<h3 class="font-mono text-lg text-accent mb-2">symmetry_x()</h3>
				<p class="text-text-muted mb-4">
					Create left/right symmetry across the YZ plane. Equivalent to
					<code>shape.union(shape.mirror_x())</code>.
				</p>
				<CodeBlock
					code={`// Create a symmetric shape from one side
sphere(0.3).translate_x(0.5).symmetry_x()
// Result: two spheres at x = 0.5 and x = -0.5

// Build half a model, then mirror it
let half = box3(0.2, 0.3, 0.1).translate_x(0.3);
let detail = sphere(0.1).translate(0.4, 0.1, 0.0);
half.union(detail).symmetry_x()`}
				/>
			</div>

			<!-- symmetry_y -->
			<div class="card">
				<h3 class="font-mono text-lg text-accent mb-2">symmetry_y()</h3>
				<p class="text-text-muted mb-4">
					Create top/bottom symmetry across the XZ plane. Equivalent to
					<code>shape.union(shape.mirror_y())</code>.
				</p>
				<CodeBlock
					code={`// Create vertical symmetry
cone(0.3, 0.5).translate_y(0.25).symmetry_y()
// Result: double cone (diamond shape)`}
				/>
			</div>

			<!-- symmetry_z -->
			<div class="card">
				<h3 class="font-mono text-lg text-accent mb-2">symmetry_z()</h3>
				<p class="text-text-muted mb-4">
					Create front/back symmetry across the XY plane. Equivalent to
					<code>shape.union(shape.mirror_z())</code>.
				</p>
				<CodeBlock
					code={`// Create depth symmetry
box3(0.3, 0.2, 0.1).translate_z(0.2).symmetry_z()
// Result: boxes at z = 0.2 and z = -0.2`}
				/>
			</div>
		</div>

		<div class="p-4 bg-accent-light border-l-4 border-accent mt-6">
			<p class="text-sm">
				<strong>Workflow tip:</strong> Symmetry operations are powerful for character and
				mechanical modeling. Design one half of your model, then use <code>symmetry_x()</code>
				to complete it. This ensures perfect symmetry and halves your modeling work.
			</p>
		</div>
	</section>

	<!-- Math Helpers -->
	<section id="math-helpers" class="scroll-mt-4">
		<h2 class="text-2xl mb-4 pb-2 border-b-2 border-border">Math Helpers</h2>
		<p class="text-text-muted mb-6">
			Utility functions for angle conversion and common mathematical constants.
		</p>

		<div class="flex flex-col gap-6">
			<!-- deg -->
			<div class="card">
				<h3 class="font-mono text-lg text-accent mb-2">deg(degrees)</h3>
				<p class="text-text-muted mb-4">
					Convert degrees to radians. All rotation functions expect radians, so use this
					helper for more intuitive angle specification.
				</p>
				<div class="overflow-x-auto mb-4">
					<table class="w-full text-sm border-collapse">
						<thead>
							<tr class="border-b-2 border-border">
								<th class="text-left py-2 pr-4">Parameter</th>
								<th class="text-left py-2 pr-4">Type</th>
								<th class="text-left py-2">Description</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td class="py-2 pr-4 font-mono">degrees</td>
								<td class="py-2 pr-4 text-text-muted">float</td>
								<td class="py-2">Angle in degrees</td>
							</tr>
						</tbody>
					</table>
				</div>
				<p class="text-sm text-text-muted mb-3">Returns: Angle in radians</p>
				<CodeBlock
					code={`// Common rotations
cube(0.3).rotate_y(deg(45))   // 45 degrees
cube(0.3).rotate_y(deg(90))   // Quarter turn
cube(0.3).rotate_y(deg(180))  // Half turn
cube(0.3).rotate_y(deg(360))  // Full turn (same as original)`}
				/>
			</div>

			<!-- rad -->
			<div class="card">
				<h3 class="font-mono text-lg text-accent mb-2">rad(radians)</h3>
				<p class="text-text-muted mb-4">
					Identity function for radians (included for API consistency). Returns the input unchanged.
				</p>
				<div class="overflow-x-auto mb-4">
					<table class="w-full text-sm border-collapse">
						<thead>
							<tr class="border-b-2 border-border">
								<th class="text-left py-2 pr-4">Parameter</th>
								<th class="text-left py-2 pr-4">Type</th>
								<th class="text-left py-2">Description</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td class="py-2 pr-4 font-mono">radians</td>
								<td class="py-2 pr-4 text-text-muted">float</td>
								<td class="py-2">Angle in radians</td>
							</tr>
						</tbody>
					</table>
				</div>
				<CodeBlock
					code={`// Using radians directly
cube(0.3).rotate_y(rad(PI / 4))  // Same as deg(45)
cube(0.3).rotate_y(PI / 2)       // Also works without rad()`}
				/>
			</div>

			<!-- Constants -->
			<div class="card">
				<h3 class="font-mono text-lg text-accent mb-2">PI, TAU</h3>
				<p class="text-text-muted mb-4">
					Mathematical constants for angle calculations.
				</p>
				<div class="overflow-x-auto mb-4">
					<table class="w-full text-sm border-collapse">
						<thead>
							<tr class="border-b-2 border-border">
								<th class="text-left py-2 pr-4">Constant</th>
								<th class="text-left py-2 pr-4">Value</th>
								<th class="text-left py-2">Description</th>
							</tr>
						</thead>
						<tbody>
							<tr class="border-b border-border-light">
								<td class="py-2 pr-4 font-mono">PI</td>
								<td class="py-2 pr-4 text-text-muted">3.14159...</td>
								<td class="py-2">Half turn in radians (180 degrees)</td>
							</tr>
							<tr>
								<td class="py-2 pr-4 font-mono">TAU</td>
								<td class="py-2 pr-4 text-text-muted">6.28318...</td>
								<td class="py-2">Full turn in radians (360 degrees, equals 2 * PI)</td>
							</tr>
						</tbody>
					</table>
				</div>
				<CodeBlock
					code={`// Using constants for rotations
cube(0.3).rotate_y(PI)        // Half turn (180 deg)
cube(0.3).rotate_y(TAU)       // Full turn (360 deg)
cube(0.3).rotate_y(PI / 4)    // Eighth turn (45 deg)
cube(0.3).rotate_y(TAU / 6)   // Sixth turn (60 deg)`}
				/>
			</div>
		</div>
	</section>

	<!-- Transform Order -->
	<section class="p-6 bg-bg-alt border-2 border-border">
		<h2 class="text-xl mb-4">Transform Order</h2>
		<p class="text-text-muted mb-4">
			Transforms are applied in the order they are chained. The result can vary significantly
			based on order:
		</p>
		<div class="grid gap-4 md:grid-cols-2">
			<div>
				<h4 class="font-mono text-sm text-accent mb-2">Translate then Rotate</h4>
				<CodeBlock
					code={`// Orbits around origin
sphere(0.2)
    .translate_x(1.0)
    .rotate_y(deg(45))`}
					compact
				/>
				<p class="text-sm text-text-muted mt-2">
					Shape moves to x=1, then rotates around origin (orbiting motion).
				</p>
			</div>
			<div>
				<h4 class="font-mono text-sm text-accent mb-2">Rotate then Translate</h4>
				<CodeBlock
					code={`// Rotates in place, then moves
sphere(0.2)
    .rotate_y(deg(45))
    .translate_x(1.0)`}
					compact
				/>
				<p class="text-sm text-text-muted mt-2">
					Shape rotates around its center, then moves along world X axis.
				</p>
			</div>
		</div>
	</section>

	<footer class="text-sm text-text-muted pt-4 border-t border-border-light">
		See also: <a href="/docs/api/primitives">Primitives</a> |
		<a href="/docs/api/operations">Operations</a> |
		<a href="/docs/api/environment">Environment</a>
	</footer>
</div>
