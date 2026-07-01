<!--
  About Page - /about

  Comprehensive overview of Soyuz Studio: what it is, how it works, and why it exists.
  Uses progressive disclosure to serve both casual visitors and technical deep-divers.
-->
<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import CrateArchitectureDiagram from '$lib/components/CrateArchitectureDiagram.svelte';
	import ComparisonTable from '$lib/components/ComparisonTable.svelte';
	import { getCategory } from '$lib/apiManifest';

	// Counts are derived from SOYUZ_API.json (via apiManifest) so they can never
	// drift from the real API. The manifest's "modifiers" category bundles
	// modifiers, deformations, and repetition; we split it back out here for
	// presentation, deriving each subgroup from the manifest's function names.
	const modifierFns = getCategory('modifiers').functions.map((fn) => fn.name);
	const deformationNames = modifierFns.filter((name) =>
		['twist', 'bend', 'displace'].includes(name)
	);
	const repetitionNames = modifierFns.filter((name) =>
		['repeat', 'repeat_limited', 'repeat_polar'].includes(name)
	);
	const pureModifierNames = modifierFns.filter(
		(name) => !deformationNames.includes(name) && !repetitionNames.includes(name)
	);

	const primitiveCount = getCategory('primitives').functions.length;
	const booleanCount = getCategory('operations').functions.length;
	const transformCount = getCategory('transforms').functions.length;

	const toolkit = [
		{
			category: 'Primitives',
			count: primitiveCount,
			examples: 'sphere, cube, cylinder, torus, capsule, cone, ellipsoid, plane, octahedron'
		},
		{
			category: 'Boolean Operations',
			count: booleanCount,
			examples: 'union, subtract, intersect, smooth_union, smooth_subtract, smooth_intersect, xor'
		},
		{
			category: 'Modifiers',
			count: pureModifierNames.length,
			examples: 'shell, hollow, round, onion, elongate'
		},
		{
			category: 'Transforms',
			count: transformCount,
			examples: 'translate, translate_x/y/z, rotate_x/y/z, scale, mirror_x/y/z, symmetry_x/y/z'
		},
		{ category: 'Deformations', count: deformationNames.length, examples: 'twist, bend, displace' },
		{
			category: 'Repetition',
			count: repetitionNames.length,
			examples: 'repeat, repeat_limited, repeat_polar'
		}
	];

	const totalOperations = toolkit.reduce((sum, item) => sum + item.count, 0);

	const comparisonHeaders = ['Feature', 'Soyuz', 'OpenSCAD', 'SDF Libraries', 'Houdini'];
	const comparisonRows = [
		{ feature: 'Paradigm', values: ['SDF + Script', 'CSG + Script', 'SDF only', 'Node graph'] },
		{ feature: 'Real-time Preview', values: ['Yes (GPU)', 'No (CPU)', 'Varies', 'Yes'] },
		{ feature: 'Price', values: ['Free / Open Source', 'Free / Open Source', 'Free', '$$$'] },
		{ feature: 'Learning Curve', values: ['Medium', 'Medium', 'High', 'Very High'] },
		{
			feature: 'Export Formats',
			values: ['glTF, GLB, OBJ, STL', 'STL, OFF, AMF', 'Usually none', 'Everything']
		},
		{ feature: 'GPU Acceleration', values: ['Yes (WGPU)', 'No', 'Rarely', 'Yes'] },
		{ feature: 'Scripting', values: ['Rhai', 'OpenSCAD lang', 'Host language', 'VEX / Python'] }
	];
</script>

<div class="about-page">
	<!-- Section 1: Hero / Vision Statement -->
	<section class="py-20 border-b-2 border-border">
		<div class="container text-center">
			<p class="font-mono text-xs uppercase tracking-widest text-accent mb-4">Soyuz Studio</p>
			<h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
				A workbench for procedural geometry
			</h1>
			<p class="text-xl md:text-2xl text-text-muted max-w-[700px] mx-auto mb-8">
				Create 3D models with scripts, not manual mesh editing.
			</p>
			<p class="text-lg text-text-muted max-w-[600px] mx-auto">
				Write Rhai SDF scripts in Studio, preview the result interactively, and export meshes for
				the rest of your pipeline.
			</p>

			<!-- Simple code-to-shape visualization -->
			<div class="mt-12 flex justify-center">
				<svg viewBox="0 0 340 110" class="w-full max-w-[340px]" aria-hidden="true">
					<!-- Code block representation -->
					<rect
						x="20"
						y="10"
						width="140"
						height="90"
						fill="none"
						stroke="#1a1a1a"
						stroke-width="2"
					/>
					<text x="35" y="35" font-family="JetBrains Mono, monospace" font-size="11" fill="#5b7a69"
						>sphere(0.5)</text
					>
					<text x="35" y="53" font-family="JetBrains Mono, monospace" font-size="11" fill="#5c5c5c"
						>.union(</text
					>
					<text x="45" y="71" font-family="JetBrains Mono, monospace" font-size="11" fill="#5b7a69"
						>cube(0.3)</text
					>
					<text x="35" y="89" font-family="JetBrains Mono, monospace" font-size="11" fill="#5c5c5c"
						>)</text
					>

					<!-- Arrow -->
					<path d="M 170 55 L 210 55" stroke="#1a1a1a" stroke-width="2" stroke-dasharray="4 4" />
					<polygon points="210,50 220,55 210,60" fill="#1a1a1a" />

					<!-- Output: sphere with box merged -->
					<circle cx="280" cy="55" r="35" fill="none" stroke="#5b7a69" stroke-width="2" />
					<rect
						x="260"
						y="35"
						width="40"
						height="40"
						fill="none"
						stroke="#5b7a69"
						stroke-width="2"
					/>
				</svg>
			</div>
		</div>
	</section>

	<!-- Section 2: What is an SDF? -->
	<section class="py-16 border-b-2 border-border">
		<div class="container">
			<h2 class="text-2xl md:text-3xl font-bold mb-8">
				Signed Distance Fields: The Mathematical Heart
			</h2>

			<!-- Beginner: The Simple Idea -->
			<div class="mb-10">
				<h3 class="text-lg font-semibold mb-4 text-accent">The Simple Idea</h3>
				<p class="text-text-muted mb-6 max-w-[700px]">
					An SDF (Signed Distance Function) answers a simple question: <strong
						>"How far is this point from the surface?"</strong
					>
				</p>

				<div class="grid md:grid-cols-2 gap-8 items-center">
					<div class="flex flex-col gap-4">
						<div class="flex items-center gap-3">
							<span class="font-mono text-lg text-accent">+</span>
							<span class="text-text-muted"
								>Positive distance = point is <strong>outside</strong></span
							>
						</div>
						<div class="flex items-center gap-3">
							<span class="font-mono text-lg text-accent">-</span>
							<span class="text-text-muted"
								>Negative distance = point is <strong>inside</strong></span
							>
						</div>
						<div class="flex items-center gap-3">
							<span class="font-mono text-lg text-accent">0</span>
							<span class="text-text-muted">Zero = point is <strong>on the surface</strong></span>
						</div>
					</div>

					<!-- SDF visualization -->
					<div class="flex justify-center">
						<svg
							viewBox="0 0 200 200"
							class="w-full max-w-[200px]"
							aria-label="SDF distance field visualization"
						>
							<!-- Distance rings -->
							<circle cx="100" cy="100" r="80" fill="none" stroke="#d4d3cf" stroke-width="1" />
							<circle cx="100" cy="100" r="60" fill="none" stroke="#d4d3cf" stroke-width="1" />
							<circle cx="100" cy="100" r="40" fill="none" stroke="#5b7a69" stroke-width="2" />
							<circle cx="100" cy="100" r="20" fill="none" stroke="#d4d3cf" stroke-width="1" />

							<!-- Labels -->
							<text x="182" y="104" font-size="10" fill="#5c5c5c">+2</text>
							<text x="162" y="104" font-size="10" fill="#5c5c5c">+1</text>
							<text x="138" y="104" font-size="10" fill="#5b7a69" font-weight="600">0</text>
							<text x="118" y="104" font-size="10" fill="#5c5c5c">-1</text>

							<!-- Center point -->
							<circle cx="100" cy="100" r="3" fill="#1a1a1a" />

							<!-- Sample points -->
							<circle cx="160" cy="100" r="4" fill="none" stroke="#1a1a1a" stroke-width="2" />
							<circle cx="80" cy="100" r="4" fill="#1a1a1a" />
						</svg>
					</div>
				</div>
			</div>

			<!-- Beginner: Why It Matters -->
			<div class="mb-10">
				<h3 class="text-lg font-semibold mb-4 text-accent">Why It Matters</h3>
				<p class="text-text-muted mb-6 max-w-[700px]">
					SDFs unlock incredibly simple boolean operations. Combining shapes becomes basic math:
				</p>

				<div class="grid sm:grid-cols-3 gap-4">
					<div class="card p-4 text-center">
						<div class="font-mono text-sm text-accent mb-2">min(a, b)</div>
						<div class="text-sm text-text-muted">Union</div>
						<div class="text-xs text-text-subtle mt-1">Combine two shapes</div>
					</div>
					<div class="card p-4 text-center">
						<div class="font-mono text-sm text-accent mb-2">max(a, -b)</div>
						<div class="text-sm text-text-muted">Subtract</div>
						<div class="text-xs text-text-subtle mt-1">Carve one from another</div>
					</div>
					<div class="card p-4 text-center">
						<div class="font-mono text-sm text-accent mb-2">max(a, b)</div>
						<div class="text-sm text-text-muted">Intersect</div>
						<div class="text-xs text-text-subtle mt-1">Keep only overlap</div>
					</div>
				</div>

				<p class="text-sm text-text-subtle mt-4">
					No polygon meshes. No vertex counts. Just pure mathematical expressions that scale to any
					resolution.
				</p>
			</div>

			<!-- Intermediate: The SDF Formula (Collapsible) -->
			<details class="border-2 border-border bg-bg-alt">
				<summary class="py-3 px-4 cursor-pointer font-semibold select-none hover:bg-surface">
					Technical Deep-Dive: The SDF Formula
				</summary>
				<div class="p-4 border-t-2 border-border flex flex-col gap-4">
					<p class="text-sm text-text-muted">
						Here's the actual WGSL code for a sphere SDF. The elegance is in its simplicity:
					</p>
					<CodeBlock
						code={`fn sd_sphere(p: vec3<f32>, radius: f32) -> f32 {
    return length(p) - radius;
}`}
						filename="sphere.wgsl"
					/>
					<div class="text-sm text-text-muted">
						<p class="mb-2"><code class="text-accent">p</code> - The 3D point we're testing</p>
						<p class="mb-2">
							<code class="text-accent">length(p)</code> - Distance from origin to point
						</p>
						<p class="mb-2"><code class="text-accent">radius</code> - The sphere's radius</p>
						<p>The result: positive outside, negative inside, zero on surface. That's it.</p>
					</div>
				</div>
			</details>
		</div>
	</section>

	<!-- Section 3: The Soyuz Toolkit -->
	<section class="py-16 border-b-2 border-border">
		<div class="container">
			<h2 class="text-2xl md:text-3xl font-bold mb-4">Everything You Need to Build</h2>
			<p class="text-text-muted mb-8 max-w-[600px]">
				Soyuz provides a complete toolkit for procedural 3D modeling. Here's what's available:
			</p>

			<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{#each toolkit as item (item.category)}
					<div class="card p-4">
						<div class="flex items-baseline gap-2 mb-2">
							<span class="font-mono text-2xl font-bold text-accent">{item.count}</span>
							<span class="font-semibold text-sm">{item.category}</span>
						</div>
						<p class="text-xs text-text-muted font-mono">{item.examples}</p>
					</div>
				{/each}
			</div>

			<p class="text-sm text-text-subtle mt-6">
				Total: <strong>{totalOperations} operations</strong> that can be combined infinitely through method
				chaining.
			</p>
		</div>
	</section>

	<!-- Section 4: Crate Architecture -->
	<section class="py-16 border-b-2 border-border">
		<div class="container">
			<h2 class="text-2xl md:text-3xl font-bold mb-4">Built for Modularity</h2>
			<p class="text-text-muted mb-8 max-w-[600px]">
				Soyuz is organized into focused, reusable crates. Each has a single responsibility, making
				the system easy to understand and extend.
			</p>

			<CrateArchitectureDiagram />
		</div>
	</section>

	<!-- Section 5: The Rendering Pipeline -->
	<section class="py-16 border-b-2 border-border">
		<div class="container">
			<h2 class="text-2xl md:text-3xl font-bold mb-8">From Script to Screen</h2>

			<!-- Beginner: 30-Second Version -->
			<div class="mb-10">
				<h3 class="text-lg font-semibold mb-4 text-accent">The 30-Second Version</h3>
				<div class="flex flex-col md:flex-row items-center gap-4 md:gap-8">
					<div class="card p-4 text-center flex-1">
						<div class="font-mono text-sm mb-2">1. Write Script</div>
						<div class="text-xs text-text-muted">Rhai code describing your shape</div>
					</div>
					<div class="hidden md:block text-2xl text-text-subtle">&#8594;</div>
					<div class="md:hidden text-2xl text-text-subtle">&#8595;</div>
					<div class="card p-4 text-center flex-1">
						<div class="font-mono text-sm mb-2">2. Generate GPU Code</div>
						<div class="text-xs text-text-muted">Soyuz compiles to WGSL shaders</div>
					</div>
					<div class="hidden md:block text-2xl text-text-subtle">&#8594;</div>
					<div class="md:hidden text-2xl text-text-subtle">&#8595;</div>
					<div class="card p-4 text-center flex-1">
						<div class="font-mono text-sm mb-2">3. See Your Shape</div>
						<div class="text-xs text-text-muted">Real-time 3D preview appears</div>
					</div>
				</div>
			</div>

			<!-- Intermediate: How Raymarching Works -->
			<div class="mb-10">
				<h3 class="text-lg font-semibold mb-4 text-accent">How Raymarching Works</h3>
				<p class="text-text-muted mb-6 max-w-[700px]">
					Soyuz uses <strong>sphere tracing</strong>, a raymarching technique where the SDF value
					tells us the maximum safe distance to step:
				</p>

				<div class="grid md:grid-cols-2 gap-8 items-center">
					<div class="flex flex-col gap-4">
						<p class="text-sm text-text-muted">
							For each pixel, we cast a ray into the scene. At each step, we evaluate the SDF to get
							the distance to the nearest surface.
						</p>
						<p class="text-sm text-text-muted">
							<strong>Key insight:</strong> The SDF value is a guaranteed safe step size. If we're 2 units
							from any surface, we can safely step 2 units forward without missing anything.
						</p>
						<p class="text-sm text-text-muted">
							This makes raymarching incredibly efficient: large steps far from surfaces, tiny steps
							near them.
						</p>
					</div>

					<!-- Raymarching visualization -->
					<div class="flex justify-center">
						<svg
							viewBox="0 0 340 130"
							class="w-full max-w-[340px]"
							aria-label="Raymarching sphere tracing visualization"
						>
							<!--
								Accurate sphere tracing visualization.
								Key property: each step point is EXACTLY at the right edge of the previous circle.
								The radius at each point represents the SDF value (distance to nearest surface).
								Surface is at x=290.

								Calculations (each point is at previous center + previous radius):
								- Point 0 (eye): x=30
								- Circle 0: center=30, radius=70, right edge at 100
								- Point 1: x=100
								- Circle 1: center=100, radius=50, right edge at 150
								- Point 2: x=150
								- Circle 2: center=150, radius=36, right edge at 186
								- Point 3: x=186
								- Circle 3: center=186, radius=26, right edge at 212
								- Point 4: x=212
								- Circle 4: center=212, radius=19, right edge at 231
								- Point 5: x=231
								- Circle 5: center=231, radius=14, right edge at 245
								- Point 6: x=245
								- Circle 6: center=245, radius=10, right edge at 255
								- Point 7: x=255
								- Circle 7: center=255, radius=7, right edge at 262
								- Point 8 (final): x=262
							-->

							<!-- Ray line (behind everything) -->
							<line
								x1="34"
								y1="65"
								x2="280"
								y2="65"
								stroke="#1a1a1a"
								stroke-width="1"
								stroke-dasharray="4 2"
							/>

							<!-- Surface (curved) - at approximately x=290 -->
							<path d="M 290 20 Q 315 65 290 110" fill="none" stroke="#5b7a69" stroke-width="3" />
							<text x="295" y="25" font-size="10" fill="#5b7a69">surface</text>

							<!-- Step 0: Large initial sphere -->
							<circle
								cx="30"
								cy="65"
								r="70"
								fill="none"
								stroke="#d4d3cf"
								stroke-width="1"
								stroke-dasharray="4 2"
							/>

							<!-- Step 1 -->
							<circle
								cx="100"
								cy="65"
								r="50"
								fill="none"
								stroke="#d4d3cf"
								stroke-width="1"
								stroke-dasharray="4 2"
							/>
							<circle cx="100" cy="65" r="3" fill="#5b7a69" />

							<!-- Step 2 -->
							<circle
								cx="150"
								cy="65"
								r="36"
								fill="none"
								stroke="#d4d3cf"
								stroke-width="1"
								stroke-dasharray="4 2"
							/>
							<circle cx="150" cy="65" r="3" fill="#5b7a69" />

							<!-- Step 3 -->
							<circle
								cx="186"
								cy="65"
								r="26"
								fill="none"
								stroke="#d4d3cf"
								stroke-width="1"
								stroke-dasharray="4 2"
							/>
							<circle cx="186" cy="65" r="3" fill="#5b7a69" />

							<!-- Step 4 -->
							<circle
								cx="212"
								cy="65"
								r="19"
								fill="none"
								stroke="#d4d3cf"
								stroke-width="1"
								stroke-dasharray="4 2"
							/>
							<circle cx="212" cy="65" r="3" fill="#5b7a69" />

							<!-- Step 5 -->
							<circle
								cx="231"
								cy="65"
								r="14"
								fill="none"
								stroke="#d4d3cf"
								stroke-width="1"
								stroke-dasharray="4 2"
							/>
							<circle cx="231" cy="65" r="3" fill="#5b7a69" />

							<!-- Step 6 -->
							<circle
								cx="245"
								cy="65"
								r="10"
								fill="none"
								stroke="#d4d3cf"
								stroke-width="1"
								stroke-dasharray="4 2"
							/>
							<circle cx="245" cy="65" r="3" fill="#5b7a69" />

							<!-- Step 7 -->
							<circle
								cx="255"
								cy="65"
								r="7"
								fill="none"
								stroke="#d4d3cf"
								stroke-width="1"
								stroke-dasharray="4 2"
							/>
							<circle cx="255" cy="65" r="3" fill="#5b7a69" />

							<!-- Step 8 (final - very close to surface) -->
							<circle
								cx="262"
								cy="65"
								r="5"
								fill="none"
								stroke="#d4d3cf"
								stroke-width="1"
								stroke-dasharray="4 2"
							/>
							<circle cx="262" cy="65" r="3" fill="#5b7a69" />

							<!-- Final contact point -->
							<circle cx="267" cy="65" r="3" fill="#5b7a69" />

							<!-- Ray origin (drawn last to be on top) -->
							<circle cx="30" cy="65" r="5" fill="#1a1a1a" />
							<text x="22" y="95" font-size="10" fill="#5c5c5c">eye</text>
						</svg>
					</div>
				</div>
			</div>

			<!-- Advanced: Technical Details (Collapsible) -->
			<details class="border-2 border-border bg-bg-alt">
				<summary class="py-3 px-4 cursor-pointer font-semibold select-none hover:bg-surface">
					Technical Deep-Dive: Raymarching Implementation
				</summary>
				<div class="p-4 border-t-2 border-border flex flex-col gap-4">
					<p class="text-sm text-text-muted">
						Here are the key constants and techniques used in Soyuz's raymarcher:
					</p>

					<div class="grid sm:grid-cols-2 gap-4">
						<div class="bg-surface p-3 border-2 border-border">
							<div class="font-mono text-xs text-accent mb-1">MAX_STEPS</div>
							<div class="text-sm">128 iterations per ray</div>
						</div>
						<div class="bg-surface p-3 border-2 border-border">
							<div class="font-mono text-xs text-accent mb-1">MAX_DIST</div>
							<div class="text-sm">100.0 units maximum travel</div>
						</div>
						<div class="bg-surface p-3 border-2 border-border">
							<div class="font-mono text-xs text-accent mb-1">MIN_SURF_DIST</div>
							<div class="text-sm">0.0001 surface threshold</div>
						</div>
						<div class="bg-surface p-3 border-2 border-border">
							<div class="font-mono text-xs text-accent mb-1">Shadow Steps</div>
							<div class="text-sm">32 samples for soft shadows</div>
						</div>
					</div>

					<CodeBlock
						code={`fn raymarch(ro: vec3<f32>, rd: vec3<f32>) -> RayResult {
    var dist = 0.0;
    for (var i = 0; i < MAX_STEPS; i++) {
        let p = ro + rd * dist;
        let d = scene_sdf(p);

        // Adaptive threshold: relaxes with distance
        if (d < MIN_SURF_DIST + 0.0002 * dist) {
            return RayResult(true, dist, p);
        }

        dist += d;
        if (dist > MAX_DIST) { break; }
    }
    return RayResult(false, dist, vec3(0.0));
}`}
						filename="raymarch.wgsl"
					/>

					<p class="text-sm text-text-muted">
						<strong>Optimizations:</strong> Distance-adaptive surface threshold, unrolled AO loops (3
						samples), adaptive shadow stepping, and pre-computed sin/cos at shader generation time.
					</p>
				</div>
			</details>
		</div>
	</section>

	<!-- Section 6: Key Differentiators -->
	<section class="py-16 border-b-2 border-border">
		<div class="container">
			<h2 class="text-2xl md:text-3xl font-bold mb-8">Why Soyuz?</h2>

			<div class="grid sm:grid-cols-2 gap-6">
				<div class="card p-6">
					<h3 class="font-semibold mb-2">Platform Parity</h3>
					<p class="text-sm text-text-muted mb-3">
						The same SDF definition runs identically everywhere:
					</p>
					<ul class="text-xs text-text-subtle font-mono flex flex-col gap-1">
						<li>Desktop GPU (WGPU)</li>
						<li>Browser (WebAssembly)</li>
						<li>CPU (headless mesh export)</li>
					</ul>
				</div>

				<div class="card p-6">
					<h3 class="font-semibold mb-2">Single Source of Truth</h3>
					<p class="text-sm text-text-muted mb-3">
						Mathematical formulas are defined once in <code>soyuz-math</code> and automatically generate:
					</p>
					<ul class="text-xs text-text-subtle font-mono flex flex-col gap-1">
						<li>Verified Rust code</li>
						<li>Matching WGSL shaders</li>
						<li>No formula drift between platforms</li>
					</ul>
				</div>

				<div class="card p-6">
					<h3 class="font-semibold mb-2">Script-First Workflow</h3>
					<p class="text-sm text-text-muted mb-3">Everything is a text file:</p>
					<ul class="text-xs text-text-subtle font-mono flex flex-col gap-1">
						<li>Version control friendly (git diff works!)</li>
						<li>Reproducible builds</li>
						<li>No binary blob assets</li>
					</ul>
				</div>

				<div class="card p-6">
					<h3 class="font-semibold mb-2">Tight Integration</h3>
					<p class="text-sm text-text-muted mb-3">Geometry and rendering are unified:</p>
					<ul class="text-xs text-text-subtle font-mono flex flex-col gap-1">
						<li>Lighting, materials, environment in scripts</li>
						<li>Sun direction, fog, shadows configurable</li>
						<li>No separate config files</li>
					</ul>
				</div>
			</div>
		</div>
	</section>

	<!-- Section 7: Comparisons -->
	<section class="py-16 border-b-2 border-border">
		<div class="container">
			<h2 class="text-2xl md:text-3xl font-bold mb-4">Soyuz vs. The World</h2>
			<p class="text-text-muted mb-8 max-w-[600px]">
				A fair comparison. Every tool has strengths; here's where Soyuz fits.
			</p>

			<ComparisonTable headers={comparisonHeaders} rows={comparisonRows} highlightColumn={1} />

			<p class="text-xs text-text-subtle mt-4">
				Note: Houdini is industry-standard for complex VFX work. OpenSCAD pioneered script-based
				CAD. Soyuz aims to bring SDF-based modeling to a wider audience with modern tooling.
			</p>
		</div>
	</section>

	<!-- Section 8: Performance -->
	<section class="py-16">
		<div class="container">
			<h2 class="text-2xl md:text-3xl font-bold mb-8">Performance Characteristics</h2>

			<div class="grid sm:grid-cols-3 gap-6 mb-10">
				<div class="card p-6 text-center">
					<div class="font-mono text-3xl font-bold text-accent mb-2">{totalOperations}</div>
					<div class="text-sm text-text-muted">SDF operations</div>
					<div class="text-xs text-text-subtle mt-1">
						{primitiveCount} primitives, {booleanCount} booleans, {transformCount} transforms, more
					</div>
				</div>
				<div class="card p-6 text-center">
					<div class="font-mono text-3xl font-bold text-accent mb-2">4</div>
					<div class="text-sm text-text-muted">Export formats</div>
					<div class="text-xs text-text-subtle mt-1">OBJ, GLTF, GLB, STL</div>
				</div>
				<div class="card p-6 text-center">
					<div class="font-mono text-3xl font-bold text-accent mb-2">~600KB</div>
					<div class="text-sm text-text-muted">WASM module size</div>
					<div class="text-xs text-text-subtle mt-1">Gzipped</div>
				</div>
			</div>

			<details class="border-2 border-border bg-bg-alt">
				<summary class="py-3 px-4 cursor-pointer font-semibold select-none hover:bg-surface">
					Optimization Techniques & Honest Limitations
				</summary>
				<div class="p-4 border-t-2 border-border flex flex-col gap-4">
					<div class="grid sm:grid-cols-2 gap-6">
						<div>
							<h4 class="text-sm font-semibold text-accent mb-2">Optimizations Used</h4>
							<ul class="text-sm text-text-muted flex flex-col gap-1">
								<li>Unrolled AO loops (3 samples)</li>
								<li>Adaptive shadow stepping</li>
								<li>Distance-adaptive surface threshold</li>
								<li>Pre-computed sin/cos at code generation</li>
								<li>Full-screen triangle (1 draw call)</li>
							</ul>
						</div>
						<div>
							<h4 class="text-sm font-semibold text-text-muted mb-2">Known Limitations</h4>
							<ul class="text-sm text-text-muted flex flex-col gap-1">
								<li>Very complex scenes (deep nesting) can slow down</li>
								<li>Raymarching has 128 step limit per ray</li>
								<li>Maximum ray distance of 100 units</li>
								<li>WASM runs in browser sandbox (no filesystem)</li>
							</ul>
						</div>
					</div>
				</div>
			</details>
		</div>
	</section>
</div>
