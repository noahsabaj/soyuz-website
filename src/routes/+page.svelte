<script lang="ts">
	import { base } from '$app/paths';
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import FeatureCard from '$lib/components/FeatureCard.svelte';

	const heroCode = `// Barrel - procedural asset in Rhai
let body = cylinder(0.5, 1.2);

let band_top = torus(0.5, 0.08).translate_y(0.5);
let band_bottom = torus(0.5, 0.08).translate_y(-0.5);
let band_middle = torus(0.52, 0.06);

body
    .smooth_union(band_top, 0.05)
    .smooth_union(band_bottom, 0.05)
    .smooth_union(band_middle, 0.03)
    .hollow(0.05)`;

	const features = [
		{
			title: 'Studio-first workflow',
			description:
				'Write Rhai scripts in a focused workbench with files, tabs, command palette, output, and docked preview.',
			icon: 'preview'
		},
		{
			title: 'Signed Distance Fields',
			description:
				'Compose primitives with boolean operations, smooth blends, transforms, repetition, and modifiers.',
			icon: 'sdf'
		},
		{
			title: 'Browser playground',
			description:
				'Try Soyuz in the web with WebAssembly compilation and WebGPU rendering before installing Studio.',
			icon: 'code'
		},
		{
			title: 'Export-ready meshes',
			description:
				'Generate marching-cubes meshes and export GLB, glTF, OBJ, or STL for downstream 3D tools.',
			icon: 'export'
		}
	];
</script>

<div>
	<section class="border-b border-border bg-bg/95 py-14 lg:py-18">
		<div class="container">
			<div class="grid gap-10 lg:grid-cols-[0.92fr_1.35fr] lg:items-center">
				<div>
					<p class="soyuz-kicker mb-4">Procedural 3D Workbench</p>
					<h1 class="mb-6 text-4xl md:text-5xl lg:text-6xl">Soyuz Studio</h1>
					<p class="mb-8 max-w-[560px] text-lg leading-8 text-text-muted">
						A desktop IDE for building 3D assets with code. Write Rhai SDF scripts, preview geometry
						in a docked workbench, and export clean meshes for your pipeline.
					</p>
					<div class="flex flex-wrap gap-3">
						<a href="{base}/download" class="btn btn-primary">Download Soyuz Studio</a>
						<a href="{base}/playground" class="btn">Try Playground</a>
					</div>
					<div class="mt-8 grid max-w-[560px] grid-cols-3 gap-3 text-sm">
						<div class="border border-border bg-bg-alt p-3">
							<div class="font-mono text-sdf">Rhai</div>
							<div class="text-text-subtle">scripting</div>
						</div>
						<div class="border border-border bg-bg-alt p-3">
							<div class="font-mono text-sdf">WGPU</div>
							<div class="text-text-subtle">preview</div>
						</div>
						<div class="border border-border bg-bg-alt p-3">
							<div class="font-mono text-sdf">GLB/STL</div>
							<div class="text-text-subtle">export</div>
						</div>
					</div>
				</div>

				<div class="overflow-hidden rounded-lg border border-border bg-surface shadow-lg">
					<div class="flex items-center justify-between border-b border-border bg-bg-alt px-4 py-2">
						<div class="flex items-center gap-2">
							<span class="h-2.5 w-2.5 rounded-full bg-error"></span>
							<span class="h-2.5 w-2.5 rounded-full bg-warning"></span>
							<span class="h-2.5 w-2.5 rounded-full bg-sdf"></span>
						</div>
						<span class="font-mono text-xs text-text-subtle">Soyuz Studio</span>
					</div>
					<img
						src="{base}/product/studio-workbench-preview.webp"
						alt="Soyuz Studio workbench showing a Rhai script beside a docked 3D preview tab"
						class="block aspect-[16/9] w-full bg-bg-code object-cover"
					/>
				</div>
			</div>
		</div>
	</section>

	<section class="border-b border-border py-16">
		<div class="container">
			<div class="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
				<div>
					<p class="soyuz-kicker mb-3">Modeling Loop</p>
					<h2 class="text-3xl">Code, preview, export</h2>
				</div>
				<p class="max-w-[520px] text-text-muted">
					Soyuz keeps the procedural loop tight: the script is the source of truth, the preview is
					interactive, and export is built into the same workbench.
				</p>
			</div>
			<div class="grid gap-4 lg:grid-cols-3">
				<div class="card">
					<div class="mb-4 font-mono text-sm text-sdf">01 / Script</div>
					<h3 class="mb-2 text-xl">Describe geometry</h3>
					<p class="text-sm leading-6 text-text-muted">
						Build shapes from primitives and compose them with SDF operations instead of pushing
						vertices by hand.
					</p>
				</div>
				<div class="card">
					<div class="mb-4 font-mono text-sm text-sdf">02 / Preview</div>
					<h3 class="mb-2 text-xl">Inspect in the tab</h3>
					<p class="text-sm leading-6 text-text-muted">
						Run the docked Preview tab for the current script, then pop it out only when you want a
						separate native window.
					</p>
				</div>
				<div class="card">
					<div class="mb-4 font-mono text-sm text-sdf">03 / Export</div>
					<h3 class="mb-2 text-xl">Ship a mesh</h3>
					<p class="text-sm leading-6 text-text-muted">
						Choose mesh resolution, format, and optimization settings from the integrated Export
						tab.
					</p>
				</div>
			</div>
		</div>
	</section>

	<section class="border-b border-border bg-bg-alt/70 py-16">
		<div class="container">
			<div class="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
				<div>
					<p class="soyuz-kicker mb-3">Try It Online</p>
					<h2 class="mb-4 text-3xl">A browser playground for the same modeling language</h2>
					<p class="mb-6 text-text-muted">
						The web playground compiles Rhai through WebAssembly and renders SDFs with WebGPU. It is
						the fastest way to understand Soyuz before installing Studio.
					</p>
					<a href="{base}/playground" class="btn btn-primary">Open Playground</a>
				</div>
				<div class="overflow-hidden rounded-lg border border-border bg-bg-code shadow-md">
					<CodeBlock code={heroCode} filename="barrel.rhai" />
				</div>
			</div>
		</div>
	</section>

	<section class="border-b border-border py-16">
		<div class="container">
			<div class="mb-10">
				<p class="soyuz-kicker mb-3">Capabilities</p>
				<h2 class="text-3xl">Built for procedural asset generation</h2>
			</div>
			<div class="grid gap-5 sm:grid-cols-2">
				{#each features as feature (feature.title)}
					<FeatureCard {...feature} />
				{/each}
			</div>
		</div>
	</section>

	<section class="py-16">
		<div class="container">
			<div class="rounded-lg border border-border bg-surface p-8 text-center shadow-md md:p-12">
				<p class="soyuz-kicker mb-3">Open Source</p>
				<h2 class="mb-4 text-3xl">Install the workbench or start in the browser</h2>
				<p class="mx-auto mb-8 max-w-[620px] text-text-muted">
					Soyuz is free to use, inspect, and extend. Download Studio for the full desktop workflow,
					or open the Playground for a fast browser trial.
				</p>
				<div class="flex flex-wrap justify-center gap-3">
					<a href="{base}/download" class="btn btn-primary">Download</a>
					<a href="{base}/docs" class="btn">Read Docs</a>
					<a href="https://github.com/noahsabaj/soyuz" class="btn" target="_blank" rel="noreferrer"
						>GitHub</a
					>
				</div>
			</div>
		</div>
	</section>
</div>
