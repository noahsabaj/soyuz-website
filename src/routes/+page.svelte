<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import FeatureCard from '$lib/components/FeatureCard.svelte';

	const heroCode = `// A gear in 12 lines
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

<div class="page">
	<!-- Hero Section -->
	<section class="hero">
		<div class="container">
			<div class="hero-content">
				<div class="hero-text">
					<p class="hero-label">Procedural 3D Asset Generation</p>
					<h1>Create 3D models<br />with code</h1>
					<p class="hero-description">
						Soyuz is a framework for building 3D assets using Signed Distance Fields. Write scripts,
						preview in real-time, export production-ready meshes.
					</p>
					<div class="hero-actions">
						<a href="/docs/getting-started" class="btn btn-primary">Get Started</a>
						<a href="/examples" class="btn">View Examples</a>
					</div>
				</div>
				<div class="hero-code">
					<CodeBlock code={heroCode} filename="gear.rhai" />
				</div>
			</div>
		</div>
	</section>

	<!-- How it Works -->
	<section class="how-it-works">
		<div class="container">
			<h2>How it works</h2>
			<div class="steps">
				<div class="step">
					<div class="step-number">1</div>
					<h3>Write a script</h3>
					<p>
						Use primitives like <code>sphere()</code>, <code>cube()</code>, <code>cylinder()</code> and
						combine them with operations.
					</p>
				</div>
				<div class="step-arrow"></div>
				<div class="step">
					<div class="step-number">2</div>
					<h3>Preview instantly</h3>
					<p>GPU raymarching renders your SDF in real-time. See changes as you type.</p>
				</div>
				<div class="step-arrow"></div>
				<div class="step">
					<div class="step-number">3</div>
					<h3>Export mesh</h3>
					<p>Marching cubes converts your SDF to a triangle mesh. Export to glTF, GLB, or OBJ.</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Features -->
	<section class="features">
		<div class="container">
			<h2>Built for procedural generation</h2>
			<div class="features-grid">
				{#each features as feature}
					<FeatureCard {...feature} />
				{/each}
			</div>
		</div>
	</section>

	<!-- Code Examples -->
	<section class="examples-preview">
		<div class="container">
			<div class="examples-header">
				<h2>From simple to complex</h2>
				<p class="text-muted">Start with a sphere, end with a spaceship.</p>
			</div>
			<div class="examples-grid">
				<div class="example-card card">
					<h4>Primitives</h4>
					<CodeBlock
						code={`sphere(0.5)
cube(1.0)
cylinder(0.3, 1.0)
torus(0.5, 0.15)`}
						compact
					/>
				</div>
				<div class="example-card card">
					<h4>Boolean Operations</h4>
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
				<div class="example-card card">
					<h4>Transforms</h4>
					<CodeBlock
						code={`shape.translate(1.0, 0.0, 0.0)
shape.rotate_y(deg(45.0))
shape.scale(0.5)
shape.mirror_x()`}
						compact
					/>
				</div>
				<div class="example-card card">
					<h4>Modifiers</h4>
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
			<div class="examples-cta">
				<a href="/examples" class="btn">See more examples</a>
			</div>
		</div>
	</section>

	<!-- CTA -->
	<section class="cta">
		<div class="container">
			<div class="cta-box card">
				<h2>Ready to build?</h2>
				<p>Soyuz is open source and free to use. Get started in minutes.</p>
				<div class="cta-actions">
					<a href="/download" class="btn btn-primary">Download</a>
					<a href="/docs" class="btn">Read the docs</a>
				</div>
			</div>
		</div>
	</section>
</div>

<style>
	.page {
		padding-bottom: var(--space-16);
	}

	/* Hero */
	.hero {
		padding: var(--space-16) 0 var(--space-20);
		border-bottom: var(--border-width) solid var(--color-border);
	}

	.hero-content {
		display: grid;
		gap: var(--space-12);
		align-items: center;
	}

	.hero-label {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--color-accent);
		margin-bottom: var(--space-4);
	}

	.hero h1 {
		margin-bottom: var(--space-6);
	}

	.hero-description {
		font-size: var(--text-lg);
		color: var(--color-text-muted);
		max-width: 480px;
		margin-bottom: var(--space-8);
	}

	.hero-actions {
		display: flex;
		gap: var(--space-4);
		flex-wrap: wrap;
	}

	.hero-code {
		border: var(--border-width) solid var(--color-border);
		box-shadow: var(--shadow-lg);
	}

	@media (min-width: 900px) {
		.hero-content {
			grid-template-columns: 1fr 1fr;
			gap: var(--space-16);
		}
	}

	/* How it Works */
	.how-it-works {
		padding: var(--space-16) 0;
		background: var(--color-bg-alt);
		border-bottom: var(--border-width) solid var(--color-border);
	}

	.how-it-works h2 {
		margin-bottom: var(--space-12);
	}

	.steps {
		display: flex;
		flex-direction: column;
		gap: var(--space-6);
	}

	.step {
		background: var(--color-surface);
		border: var(--border-width) solid var(--color-border);
		padding: var(--space-6);
		box-shadow: var(--shadow-sm);
	}

	.step-number {
		font-family: var(--font-mono);
		font-size: var(--text-xl);
		font-weight: 700;
		color: var(--color-accent);
		margin-bottom: var(--space-3);
	}

	.step h3 {
		font-size: var(--text-lg);
		margin-bottom: var(--space-2);
	}

	.step p {
		color: var(--color-text-muted);
		font-size: var(--text-sm);
	}

	.step-arrow {
		display: none;
	}

	@media (min-width: 900px) {
		.steps {
			flex-direction: row;
			align-items: stretch;
		}

		.step {
			flex: 1;
		}

		.step-arrow {
			display: flex;
			align-items: center;
			font-size: var(--text-2xl);
			color: var(--color-border);
			padding: 0 var(--space-2);
		}

		.step-arrow::before {
			content: '\2192';
		}
	}

	/* Features */
	.features {
		padding: var(--space-16) 0;
		border-bottom: var(--border-width) solid var(--color-border);
	}

	.features h2 {
		margin-bottom: var(--space-10);
	}

	.features-grid {
		display: grid;
		gap: var(--space-6);
	}

	@media (min-width: 640px) {
		.features-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	/* Examples Preview */
	.examples-preview {
		padding: var(--space-16) 0;
		border-bottom: var(--border-width) solid var(--color-border);
	}

	.examples-header {
		margin-bottom: var(--space-10);
	}

	.examples-header h2 {
		margin-bottom: var(--space-2);
	}

	.examples-grid {
		display: grid;
		gap: var(--space-6);
	}

	.example-card {
		padding: var(--space-5);
	}

	.example-card h4 {
		font-size: var(--text-sm);
		font-weight: 600;
		margin-bottom: var(--space-3);
	}

	.examples-cta {
		margin-top: var(--space-10);
		text-align: center;
	}

	@media (min-width: 640px) {
		.examples-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	/* CTA */
	.cta {
		padding: var(--space-16) 0 0;
	}

	.cta-box {
		text-align: center;
		padding: var(--space-12);
		background: var(--color-bg-alt);
	}

	.cta-box h2 {
		margin-bottom: var(--space-3);
	}

	.cta-box p {
		color: var(--color-text-muted);
		margin-bottom: var(--space-8);
	}

	.cta-actions {
		display: flex;
		gap: var(--space-4);
		justify-content: center;
		flex-wrap: wrap;
	}
</style>
