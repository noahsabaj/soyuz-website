<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import FeatureCard from '$lib/components/FeatureCard.svelte';

	const heroCode = `// A gear in 6 lines
let body = cylinder(0.8, 0.2);
let tooth = box3(0.2, 0.2, 0.15)
    .translate_x(0.85);
let teeth = tooth.repeat_polar(12);
let hole = cylinder(0.25, 0.3);

body.union(teeth).subtract(hole)`;

	const features = [
		{
			title: 'Signed Distance Fields',
			description:
				'Mathematical functions that describe shapes. Combine primitives with boolean operations, smooth blends, and transforms.',
			icon: 'sdf'
		},
		{
			title: 'Real-time Preview',
			description:
				'GPU-accelerated raymarching shows your model instantly. Edit code and see changes in real-time.',
			icon: 'preview'
		},
		{
			title: 'Script-based Workflow',
			description:
				'Write in Rhai, a JavaScript-like language. Variables, loops, conditionals - procedural generation made simple.',
			icon: 'code'
		},
		{
			title: 'Export Ready',
			description:
				'Generate meshes via marching cubes. Export to glTF, GLB, or OBJ for your game engine or 3D software.',
			icon: 'export'
		}
	];
</script>

<div class="pb-16">
	<!-- Hero Section -->
	<section class="py-16 pb-20 border-b-2 border-border">
		<div class="container">
			<div class="grid gap-12 items-center lg:grid-cols-2 lg:gap-16">
				<div>
					<p class="font-mono text-xs font-medium uppercase tracking-widest text-accent mb-4">Procedural 3D Asset Generation</p>
					<h1 class="text-4xl md:text-5xl lg:text-6xl mb-6">Create 3D models<br />with code</h1>
					<p class="text-lg text-text-muted max-w-[480px] mb-8">
						Soyuz is a framework for building 3D assets using Signed Distance Fields. Write scripts,
						preview in real-time, export production-ready meshes.
					</p>
					<div class="flex gap-4 flex-wrap">
						<a href="/docs/getting-started" class="btn btn-primary">Get Started</a>
						<a href="/examples" class="btn">View Examples</a>
					</div>
				</div>
				<div class="border-2 border-border shadow-lg">
					<CodeBlock code={heroCode} filename="gear.rhai" />
				</div>
			</div>
		</div>
	</section>

	<!-- How it Works -->
	<section class="py-16 bg-bg-alt border-b-2 border-border">
		<div class="container">
			<h2 class="mb-12">How it works</h2>
			<div class="flex flex-col gap-6 lg:flex-row lg:items-stretch">
				<div class="bg-surface border-2 border-border p-6 shadow-sm lg:flex-1">
					<div class="font-mono text-xl font-bold text-accent mb-3">1</div>
					<h3 class="text-lg mb-2">Write a script</h3>
					<p class="text-text-muted text-sm">
						Use primitives like <code>sphere()</code>, <code>cube()</code>, <code>cylinder()</code> and
						combine them with operations.
					</p>
				</div>
				<div class="hidden lg:flex items-center text-2xl text-border px-2">
					<span aria-hidden="true">&#8594;</span>
				</div>
				<div class="bg-surface border-2 border-border p-6 shadow-sm lg:flex-1">
					<div class="font-mono text-xl font-bold text-accent mb-3">2</div>
					<h3 class="text-lg mb-2">Preview instantly</h3>
					<p class="text-text-muted text-sm">GPU raymarching renders your SDF in real-time. See changes as you type.</p>
				</div>
				<div class="hidden lg:flex items-center text-2xl text-border px-2">
					<span aria-hidden="true">&#8594;</span>
				</div>
				<div class="bg-surface border-2 border-border p-6 shadow-sm lg:flex-1">
					<div class="font-mono text-xl font-bold text-accent mb-3">3</div>
					<h3 class="text-lg mb-2">Export mesh</h3>
					<p class="text-text-muted text-sm">Marching cubes converts your SDF to a triangle mesh. Export to glTF, GLB, or OBJ.</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Features -->
	<section class="py-16 border-b-2 border-border">
		<div class="container">
			<h2 class="mb-10">Built for procedural generation</h2>
			<div class="grid gap-6 sm:grid-cols-2">
				{#each features as feature}
					<FeatureCard {...feature} />
				{/each}
			</div>
		</div>
	</section>

	<!-- Code Examples -->
	<section class="py-16 border-b-2 border-border">
		<div class="container">
			<div class="mb-10">
				<h2 class="mb-2">From simple to complex</h2>
				<p class="text-text-muted">Start with a sphere, end with a spaceship.</p>
			</div>
			<div class="grid gap-6 sm:grid-cols-2">
				<div class="card p-5">
					<h4 class="text-sm font-semibold mb-3">Primitives</h4>
					<CodeBlock
						code={`sphere(0.5)
cube(1.0)
cylinder(0.3, 1.0)
torus(0.5, 0.15)`}
						compact
					/>
				</div>
				<div class="card p-5">
					<h4 class="text-sm font-semibold mb-3">Boolean Operations</h4>
					<CodeBlock
						code={`// Combine shapes
sphere(0.5).union(cube(0.6))

// Cut holes
cube(1.0).subtract(sphere(0.7))

// Smooth blend
a.smooth_union(b, 0.1)`}
						compact
					/>
				</div>
				<div class="card p-5">
					<h4 class="text-sm font-semibold mb-3">Transforms</h4>
					<CodeBlock
						code={`shape.translate(1.0, 0.0, 0.0)
shape.rotate_y(deg(45.0))
shape.scale(0.5)
shape.mirror_x()`}
						compact
					/>
				</div>
				<div class="card p-5">
					<h4 class="text-sm font-semibold mb-3">Modifiers</h4>
					<CodeBlock
						code={`// Make hollow
sphere(0.5).shell(0.05)

// Round edges
cube(1.0).round(0.1)

// Twist and bend
column.twist(2.0)`}
						compact
					/>
				</div>
			</div>
			<div class="mt-10 text-center">
				<a href="/examples" class="btn">See more examples</a>
			</div>
		</div>
	</section>

	<!-- CTA -->
	<section class="pt-16">
		<div class="container">
			<div class="card text-center p-12 bg-bg-alt">
				<h2 class="mb-3">Ready to build?</h2>
				<p class="text-text-muted mb-8">Soyuz is open source and free to use. Get started in minutes.</p>
				<div class="flex gap-4 justify-center flex-wrap">
					<a href="/download" class="btn btn-primary">Download</a>
					<a href="/docs" class="btn">Read the docs</a>
				</div>
			</div>
		</div>
	</section>
</div>
