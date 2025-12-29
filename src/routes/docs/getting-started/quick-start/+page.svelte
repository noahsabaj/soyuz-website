<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
</script>

<svelte:head>
	<title>Quick Start - Soyuz</title>
</svelte:head>

<div class="doc-page">
	<h1>Quick Start</h1>
	<p class="lead">Create your first 3D model in 5 minutes.</p>

	<section>
		<h2>The simplest script</h2>
		<p>
			A Soyuz script is a Rhai file that returns an SDF (Signed Distance Field). The simplest
			possible script:
		</p>
		<CodeBlock code="sphere(0.5)" filename="simple.rhai" />
		<p>This creates a sphere with radius 0.5 units, centered at the origin.</p>
	</section>

	<section>
		<h2>Combining shapes</h2>
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

	<section>
		<h2>Transforms</h2>
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

	<section>
		<h2>Variables and logic</h2>
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

	<section>
		<h2>Preview and export</h2>
		<p><strong>In Soyuz Studio:</strong></p>
		<ul>
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

	<section>
		<h2>Key rule</h2>
		<p class="note">
			Your script must <strong>return an SDF</strong>. This means the last expression should not end
			with a semicolon. If nothing renders, check that your final line returns a shape.
		</p>
	</section>

	<nav class="doc-nav">
		<a href="/docs/getting-started" class="prev">
			<span class="label">Previous</span>
			<span class="title">Installation</span>
		</a>
		<a href="/docs/getting-started/studio" class="next">
			<span class="label">Next</span>
			<span class="title">Soyuz Studio</span>
		</a>
	</nav>
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

	.note {
		font-size: var(--text-sm);
		padding: var(--space-3) var(--space-4);
		background: var(--color-bg-alt);
		border-left: 3px solid var(--color-accent);
	}

	.doc-nav {
		display: flex;
		justify-content: space-between;
		padding-top: var(--space-8);
		border-top: var(--border-width) solid var(--color-border);
		margin-top: var(--space-8);
		gap: var(--space-4);
	}

	.doc-nav a {
		display: flex;
		flex-direction: column;
		text-decoration: none;
		padding: var(--space-3) var(--space-4);
		background: var(--color-bg-alt);
		border: var(--border-width) solid var(--color-border);
		transition: all 0.15s ease;
	}

	.doc-nav a:hover {
		background: var(--color-surface);
		box-shadow: var(--shadow-sm);
	}

	.doc-nav .label {
		font-size: var(--text-xs);
		color: var(--color-text-subtle);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.doc-nav .title {
		font-weight: 600;
		color: var(--color-text);
	}

	.doc-nav .next {
		margin-left: auto;
		text-align: right;
	}
</style>
