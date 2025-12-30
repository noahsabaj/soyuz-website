<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
</script>

<svelte:head>
	<title>Quick Start - Soyuz</title>
</svelte:head>

<div class="flex flex-col gap-8">
	<header>
		<h1 class="mb-2">Quick Start</h1>
		<p class="text-lg text-text-muted">Create your first 3D model in 5 minutes.</p>
	</header>

	<section class="flex flex-col gap-4">
		<h2 class="text-xl pt-4 border-t border-border-light">The simplest script</h2>
		<p>
			A Soyuz script is a Rhai file that returns an SDF (Signed Distance Field). The simplest
			possible script:
		</p>
		<CodeBlock code="sphere(0.5)" filename="simple.rhai" />
		<p>This creates a sphere with radius 0.5 units, centered at the origin.</p>
	</section>

	<section class="flex flex-col gap-4">
		<h2 class="text-xl pt-4 border-t border-border-light">Combining shapes</h2>
		<p>Use method chaining to combine primitives:</p>
		<CodeBlock
			code={`// Union: combine two shapes
sphere(0.5).union(cube(0.7))

// Subtract: cut one from another
cube(1.0).subtract(sphere(0.8))

// Intersect: keep only the overlap
sphere(0.6).intersect(cube(0.8))`}
			filename="combine.rhai"
		/>
	</section>

	<section class="flex flex-col gap-4">
		<h2 class="text-xl pt-4 border-t border-border-light">Transforms</h2>
		<p>Move, rotate, and scale shapes:</p>
		<CodeBlock
			code={`// Move a shape
sphere(0.3).translate(1.0, 0.0, 0.0)

// Rotate (angles in radians, use deg() for degrees)
cube(0.5).rotate_y(deg(45.0))

// Scale uniformly
torus(1.0, 0.3).scale(0.5)`}
			filename="transforms.rhai"
		/>
	</section>

	<section class="flex flex-col gap-4">
		<h2 class="text-xl pt-4 border-t border-border-light">Variables and logic</h2>
		<p>Rhai supports variables, loops, and conditionals:</p>
		<CodeBlock
			code={`let radius = 0.4;
let height = 1.0;

// Build a simple cup
let body = cylinder(radius, height);
let hollow = cylinder(radius - 0.05, height - 0.1)
    .translate_y(0.05);
let handle = torus(0.15, 0.04)
    .rotate_x(deg(90.0))
    .translate(radius + 0.1, 0.0, 0.0);

body.subtract(hollow).union(handle)`}
			filename="cup.rhai"
		/>
	</section>

	<section class="flex flex-col gap-4">
		<h2 class="text-xl pt-4 border-t border-border-light">Preview and export</h2>
		<p><strong>In Soyuz Studio:</strong></p>
		<ul class="pl-6 flex flex-col gap-2">
			<li>Press <code>Ctrl+Enter</code> to preview your model</li>
			<li>Use the Export panel to save as GLB, GLTF, or OBJ</li>
		</ul>
		<p><strong>Using the CLI:</strong></p>
		<CodeBlock
			code={`# Preview in a window
soyuz preview --script cup.rhai

# Export to mesh
soyuz generate --script cup.rhai --output cup.glb`}
		/>
	</section>

	<section class="flex flex-col gap-4">
		<h2 class="text-xl pt-4 border-t border-border-light">Key rule</h2>
		<p class="text-sm p-3 px-4 bg-bg-alt border-l-[3px] border-accent">
			Your script must <strong>return an SDF</strong>. This means the last expression should not end
			with a semicolon. If nothing renders, check that your final line returns a shape.
		</p>
	</section>

</div>
