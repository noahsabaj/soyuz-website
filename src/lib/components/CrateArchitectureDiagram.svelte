<!--
  CrateArchitectureDiagram.svelte

  SVG diagram showing the accurate Soyuz crate dependency graph.
  Arrows point from dependent crate to dependency (A → B means A depends on B).
  Hovering a crate highlights its connections and shows dependency info.
-->
<script lang="ts">
	let hoveredCrate: string | null = $state(null);

	type CrateName = 'soyuz-math' | 'soyuz-sdf' | 'soyuz-core' | 'soyuz-render' | 'soyuz-script' | 'soyuz-wasm' | 'soyuz-engine' | 'soyuz-app';

	const crateDescriptions: Record<CrateName, { description: string }> = {
		'soyuz-math': {
			description: 'Single source of truth for mathematical formulas. Generates both Rust and WGSL code.'
		},
		'soyuz-sdf': {
			description: 'SdfOp tree representation and WGSL shader code generation.'
		},
		'soyuz-core': {
			description: 'Mesh generation via marching cubes. Export to glTF, GLB, OBJ, STL.'
		},
		'soyuz-render': {
			description: 'GPU-accelerated raymarching preview using WGPU.'
		},
		'soyuz-script': {
			description: 'Rhai scripting engine integration for procedural modeling.'
		},
		'soyuz-wasm': {
			description: 'WebAssembly module for browser-based rendering.'
		},
		'soyuz-engine': {
			description: 'Unified runtime orchestration layer for scripts, preview, and export.'
		},
		'soyuz-app': {
			description: 'Dioxus-based desktop IDE with code editor and 3D preview.'
		}
	};

	// Dependency graph: key depends on values
	const dependsOn: Record<CrateName, CrateName[]> = {
		'soyuz-math': [],
		'soyuz-sdf': ['soyuz-math'],
		'soyuz-core': ['soyuz-math'],
		'soyuz-render': ['soyuz-core', 'soyuz-sdf', 'soyuz-math'],
		'soyuz-script': ['soyuz-core', 'soyuz-sdf', 'soyuz-math'],
		'soyuz-wasm': ['soyuz-script', 'soyuz-sdf'],
		'soyuz-engine': ['soyuz-render', 'soyuz-script', 'soyuz-core', 'soyuz-sdf'],
		'soyuz-app': ['soyuz-engine', 'soyuz-core', 'soyuz-script']
	};

	// Compute reverse dependencies (who depends on this crate)
	const dependedOnBy: Record<CrateName, CrateName[]> = {
		'soyuz-math': [],
		'soyuz-sdf': [],
		'soyuz-core': [],
		'soyuz-render': [],
		'soyuz-script': [],
		'soyuz-wasm': [],
		'soyuz-engine': [],
		'soyuz-app': []
	};

	for (const [crate, deps] of Object.entries(dependsOn) as [CrateName, CrateName[]][]) {
		for (const dep of deps) {
			dependedOnBy[dep].push(crate);
		}
	}

	// Check if a connection should be highlighted
	function isConnectionHighlighted(from: CrateName, to: CrateName): boolean {
		if (!hoveredCrate) return false;
		return from === hoveredCrate || to === hoveredCrate;
	}

	const boxColor = '#f8f7f4';
	const highlightColor = '#5b7a69';
</script>

<div class="flex flex-col gap-6">
	<svg viewBox="0 0 640 540" class="w-full max-w-[640px] mx-auto" role="img" aria-label="Soyuz crate dependency diagram">
		<defs>
			<marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
				<polygon points="0 0, 8 3, 0 6" fill="#1a1a1a"/>
			</marker>
			<marker id="arrowhead-highlight" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
				<polygon points="0 0, 8 3, 0 6" fill={highlightColor}/>
			</marker>
		</defs>

		<!-- Connection lines (drawn first so they appear behind boxes) -->

		<!-- soyuz-app dependencies -->
		<line
			x1="320" y1="50" x2="320" y2="100"
			stroke={isConnectionHighlighted('soyuz-app', 'soyuz-engine') ? highlightColor : '#1a1a1a'}
			stroke-width={isConnectionHighlighted('soyuz-app', 'soyuz-engine') ? 2.5 : 1.5}
			marker-end={isConnectionHighlighted('soyuz-app', 'soyuz-engine') ? 'url(#arrowhead-highlight)' : 'url(#arrowhead)'}
		/>
		<path
			d="M 250 40 Q 120 40, 120 280"
			stroke={isConnectionHighlighted('soyuz-app', 'soyuz-core') ? highlightColor : '#1a1a1a'}
			stroke-width={isConnectionHighlighted('soyuz-app', 'soyuz-core') ? 2.5 : 1.5}
			fill="none"
			marker-end={isConnectionHighlighted('soyuz-app', 'soyuz-core') ? 'url(#arrowhead-highlight)' : 'url(#arrowhead)'}
		/>
		<path
			d="M 390 40 Q 520 80, 520 180"
			stroke={isConnectionHighlighted('soyuz-app', 'soyuz-script') ? highlightColor : '#1a1a1a'}
			stroke-width={isConnectionHighlighted('soyuz-app', 'soyuz-script') ? 2.5 : 1.5}
			fill="none"
			marker-end={isConnectionHighlighted('soyuz-app', 'soyuz-script') ? 'url(#arrowhead-highlight)' : 'url(#arrowhead)'}
		/>

		<!-- soyuz-engine dependencies -->
		<line
			x1="260" y1="140" x2="190" y2="180"
			stroke={isConnectionHighlighted('soyuz-engine', 'soyuz-render') ? highlightColor : '#1a1a1a'}
			stroke-width={isConnectionHighlighted('soyuz-engine', 'soyuz-render') ? 2.5 : 1.5}
			marker-end={isConnectionHighlighted('soyuz-engine', 'soyuz-render') ? 'url(#arrowhead-highlight)' : 'url(#arrowhead)'}
		/>
		<line
			x1="380" y1="140" x2="450" y2="180"
			stroke={isConnectionHighlighted('soyuz-engine', 'soyuz-script') ? highlightColor : '#1a1a1a'}
			stroke-width={isConnectionHighlighted('soyuz-engine', 'soyuz-script') ? 2.5 : 1.5}
			marker-end={isConnectionHighlighted('soyuz-engine', 'soyuz-script') ? 'url(#arrowhead-highlight)' : 'url(#arrowhead)'}
		/>
		<path
			d="M 270 140 Q 200 220, 160 280"
			stroke={isConnectionHighlighted('soyuz-engine', 'soyuz-core') ? highlightColor : '#1a1a1a'}
			stroke-width={isConnectionHighlighted('soyuz-engine', 'soyuz-core') ? 2.5 : 1.5}
			fill="none"
			marker-end={isConnectionHighlighted('soyuz-engine', 'soyuz-core') ? 'url(#arrowhead-highlight)' : 'url(#arrowhead)'}
		/>
		<line
			x1="320" y1="140" x2="320" y2="380"
			stroke={isConnectionHighlighted('soyuz-engine', 'soyuz-sdf') ? highlightColor : '#1a1a1a'}
			stroke-width={isConnectionHighlighted('soyuz-engine', 'soyuz-sdf') ? 2.5 : 1.5}
			marker-end={isConnectionHighlighted('soyuz-engine', 'soyuz-sdf') ? 'url(#arrowhead-highlight)' : 'url(#arrowhead)'}
		/>

		<!-- soyuz-render dependencies -->
		<line
			x1="140" y1="220" x2="140" y2="280"
			stroke={isConnectionHighlighted('soyuz-render', 'soyuz-core') ? highlightColor : '#1a1a1a'}
			stroke-width={isConnectionHighlighted('soyuz-render', 'soyuz-core') ? 2.5 : 1.5}
			marker-end={isConnectionHighlighted('soyuz-render', 'soyuz-core') ? 'url(#arrowhead-highlight)' : 'url(#arrowhead)'}
		/>
		<path
			d="M 190 220 Q 260 300, 290 380"
			stroke={isConnectionHighlighted('soyuz-render', 'soyuz-sdf') ? highlightColor : '#1a1a1a'}
			stroke-width={isConnectionHighlighted('soyuz-render', 'soyuz-sdf') ? 2.5 : 1.5}
			fill="none"
			marker-end={isConnectionHighlighted('soyuz-render', 'soyuz-sdf') ? 'url(#arrowhead-highlight)' : 'url(#arrowhead)'}
		/>
		<path
			d="M 100 220 Q 60 350, 260 460"
			stroke={isConnectionHighlighted('soyuz-render', 'soyuz-math') ? highlightColor : '#1a1a1a'}
			stroke-width={isConnectionHighlighted('soyuz-render', 'soyuz-math') ? 2.5 : 1.5}
			fill="none"
			marker-end={isConnectionHighlighted('soyuz-render', 'soyuz-math') ? 'url(#arrowhead-highlight)' : 'url(#arrowhead)'}
		/>

		<!-- soyuz-script dependencies -->
		<path
			d="M 450 220 Q 300 260, 200 280"
			stroke={isConnectionHighlighted('soyuz-script', 'soyuz-core') ? highlightColor : '#1a1a1a'}
			stroke-width={isConnectionHighlighted('soyuz-script', 'soyuz-core') ? 2.5 : 1.5}
			fill="none"
			marker-end={isConnectionHighlighted('soyuz-script', 'soyuz-core') ? 'url(#arrowhead-highlight)' : 'url(#arrowhead)'}
		/>
		<path
			d="M 450 220 Q 380 300, 350 380"
			stroke={isConnectionHighlighted('soyuz-script', 'soyuz-sdf') ? highlightColor : '#1a1a1a'}
			stroke-width={isConnectionHighlighted('soyuz-script', 'soyuz-sdf') ? 2.5 : 1.5}
			fill="none"
			marker-end={isConnectionHighlighted('soyuz-script', 'soyuz-sdf') ? 'url(#arrowhead-highlight)' : 'url(#arrowhead)'}
		/>
		<path
			d="M 540 220 Q 580 350, 380 460"
			stroke={isConnectionHighlighted('soyuz-script', 'soyuz-math') ? highlightColor : '#1a1a1a'}
			stroke-width={isConnectionHighlighted('soyuz-script', 'soyuz-math') ? 2.5 : 1.5}
			fill="none"
			marker-end={isConnectionHighlighted('soyuz-script', 'soyuz-math') ? 'url(#arrowhead-highlight)' : 'url(#arrowhead)'}
		/>

		<!-- soyuz-wasm dependencies -->
		<line
			x1="500" y1="280" x2="500" y2="230"
			stroke={isConnectionHighlighted('soyuz-wasm', 'soyuz-script') ? highlightColor : '#1a1a1a'}
			stroke-width={isConnectionHighlighted('soyuz-wasm', 'soyuz-script') ? 2.5 : 1.5}
			marker-end={isConnectionHighlighted('soyuz-wasm', 'soyuz-script') ? 'url(#arrowhead-highlight)' : 'url(#arrowhead)'}
		/>
		<path
			d="M 430 310 Q 380 350, 350 380"
			stroke={isConnectionHighlighted('soyuz-wasm', 'soyuz-sdf') ? highlightColor : '#1a1a1a'}
			stroke-width={isConnectionHighlighted('soyuz-wasm', 'soyuz-sdf') ? 2.5 : 1.5}
			fill="none"
			marker-end={isConnectionHighlighted('soyuz-wasm', 'soyuz-sdf') ? 'url(#arrowhead-highlight)' : 'url(#arrowhead)'}
		/>

		<!-- soyuz-core dependencies -->
		<path
			d="M 140 320 Q 140 400, 260 460"
			stroke={isConnectionHighlighted('soyuz-core', 'soyuz-math') ? highlightColor : '#1a1a1a'}
			stroke-width={isConnectionHighlighted('soyuz-core', 'soyuz-math') ? 2.5 : 1.5}
			fill="none"
			marker-end={isConnectionHighlighted('soyuz-core', 'soyuz-math') ? 'url(#arrowhead-highlight)' : 'url(#arrowhead)'}
		/>

		<!-- soyuz-sdf dependencies -->
		<line
			x1="320" y1="420" x2="320" y2="460"
			stroke={isConnectionHighlighted('soyuz-sdf', 'soyuz-math') ? highlightColor : '#1a1a1a'}
			stroke-width={isConnectionHighlighted('soyuz-sdf', 'soyuz-math') ? 2.5 : 1.5}
			marker-end={isConnectionHighlighted('soyuz-sdf', 'soyuz-math') ? 'url(#arrowhead-highlight)' : 'url(#arrowhead)'}
		/>

		<!-- Row 1: soyuz-app -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<g
			class="crate cursor-pointer"
			class:hovered={hoveredCrate === 'soyuz-app'}
			onmouseenter={() => hoveredCrate = 'soyuz-app'}
			onmouseleave={() => hoveredCrate = null}
		>
			<rect x="250" y="10" width="140" height="40" rx="0" fill={boxColor} stroke={hoveredCrate === 'soyuz-app' ? highlightColor : '#1a1a1a'} stroke-width={hoveredCrate === 'soyuz-app' ? 3 : 2}/>
			<rect x="254" y="14" width="140" height="40" rx="0" fill="#1a1a1a" opacity="0.1"/>
			<text x="320" y="35" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="12" font-weight="600" fill="#1a1a1a">soyuz-app</text>
		</g>

		<!-- Row 2: soyuz-engine -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<g
			class="crate cursor-pointer"
			class:hovered={hoveredCrate === 'soyuz-engine'}
			onmouseenter={() => hoveredCrate = 'soyuz-engine'}
			onmouseleave={() => hoveredCrate = null}
		>
			<rect x="250" y="100" width="140" height="40" rx="0" fill={boxColor} stroke={hoveredCrate === 'soyuz-engine' ? highlightColor : '#1a1a1a'} stroke-width={hoveredCrate === 'soyuz-engine' ? 3 : 2}/>
			<rect x="254" y="104" width="140" height="40" rx="0" fill="#1a1a1a" opacity="0.1"/>
			<text x="320" y="125" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="12" font-weight="600" fill="#1a1a1a">soyuz-engine</text>
		</g>

		<!-- Row 3: soyuz-render, soyuz-script -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<g
			class="crate cursor-pointer"
			class:hovered={hoveredCrate === 'soyuz-render'}
			onmouseenter={() => hoveredCrate = 'soyuz-render'}
			onmouseleave={() => hoveredCrate = null}
		>
			<rect x="70" y="180" width="140" height="40" rx="0" fill={boxColor} stroke={hoveredCrate === 'soyuz-render' ? highlightColor : '#1a1a1a'} stroke-width={hoveredCrate === 'soyuz-render' ? 3 : 2}/>
			<rect x="74" y="184" width="140" height="40" rx="0" fill="#1a1a1a" opacity="0.1"/>
			<text x="140" y="205" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="12" font-weight="600" fill="#1a1a1a">soyuz-render</text>
		</g>

		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<g
			class="crate cursor-pointer"
			class:hovered={hoveredCrate === 'soyuz-script'}
			onmouseenter={() => hoveredCrate = 'soyuz-script'}
			onmouseleave={() => hoveredCrate = null}
		>
			<rect x="430" y="180" width="140" height="40" rx="0" fill={boxColor} stroke={hoveredCrate === 'soyuz-script' ? highlightColor : '#1a1a1a'} stroke-width={hoveredCrate === 'soyuz-script' ? 3 : 2}/>
			<rect x="434" y="184" width="140" height="40" rx="0" fill="#1a1a1a" opacity="0.1"/>
			<text x="500" y="205" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="12" font-weight="600" fill="#1a1a1a">soyuz-script</text>
		</g>

		<!-- Row 4: soyuz-core, soyuz-wasm -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<g
			class="crate cursor-pointer"
			class:hovered={hoveredCrate === 'soyuz-core'}
			onmouseenter={() => hoveredCrate = 'soyuz-core'}
			onmouseleave={() => hoveredCrate = null}
		>
			<rect x="70" y="280" width="140" height="40" rx="0" fill={boxColor} stroke={hoveredCrate === 'soyuz-core' ? highlightColor : '#1a1a1a'} stroke-width={hoveredCrate === 'soyuz-core' ? 3 : 2}/>
			<rect x="74" y="284" width="140" height="40" rx="0" fill="#1a1a1a" opacity="0.1"/>
			<text x="140" y="305" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="12" font-weight="600" fill="#1a1a1a">soyuz-core</text>
		</g>

		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<g
			class="crate cursor-pointer"
			class:hovered={hoveredCrate === 'soyuz-wasm'}
			onmouseenter={() => hoveredCrate = 'soyuz-wasm'}
			onmouseleave={() => hoveredCrate = null}
		>
			<rect x="430" y="280" width="140" height="40" rx="0" fill={boxColor} stroke={hoveredCrate === 'soyuz-wasm' ? highlightColor : '#1a1a1a'} stroke-width={hoveredCrate === 'soyuz-wasm' ? 3 : 2}/>
			<rect x="434" y="284" width="140" height="40" rx="0" fill="#1a1a1a" opacity="0.1"/>
			<text x="500" y="305" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="12" font-weight="600" fill="#1a1a1a">soyuz-wasm</text>
		</g>

		<!-- Row 5: soyuz-sdf -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<g
			class="crate cursor-pointer"
			class:hovered={hoveredCrate === 'soyuz-sdf'}
			onmouseenter={() => hoveredCrate = 'soyuz-sdf'}
			onmouseleave={() => hoveredCrate = null}
		>
			<rect x="250" y="380" width="140" height="40" rx="0" fill={boxColor} stroke={hoveredCrate === 'soyuz-sdf' ? highlightColor : '#1a1a1a'} stroke-width={hoveredCrate === 'soyuz-sdf' ? 3 : 2}/>
			<rect x="254" y="384" width="140" height="40" rx="0" fill="#1a1a1a" opacity="0.1"/>
			<text x="320" y="405" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="12" font-weight="600" fill="#1a1a1a">soyuz-sdf</text>
		</g>

		<!-- Row 6: soyuz-math -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<g
			class="crate cursor-pointer"
			class:hovered={hoveredCrate === 'soyuz-math'}
			onmouseenter={() => hoveredCrate = 'soyuz-math'}
			onmouseleave={() => hoveredCrate = null}
		>
			<rect x="250" y="460" width="140" height="40" rx="0" fill={boxColor} stroke={hoveredCrate === 'soyuz-math' ? highlightColor : '#1a1a1a'} stroke-width={hoveredCrate === 'soyuz-math' ? 3 : 2}/>
			<rect x="254" y="464" width="140" height="40" rx="0" fill="#1a1a1a" opacity="0.1"/>
			<text x="320" y="485" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="12" font-weight="600" fill="#1a1a1a">soyuz-math</text>
		</g>
	</svg>

	<!-- Description panel -->
	<div class="min-h-[100px] p-4 bg-bg-alt border-2 border-border">
		{#if hoveredCrate && crateDescriptions[hoveredCrate as CrateName]}
			{@const deps = dependsOn[hoveredCrate as CrateName]}
			{@const usedBy = dependedOnBy[hoveredCrate as CrateName]}
			<div class="flex flex-col gap-2">
				<span class="font-mono text-sm font-semibold text-accent">{hoveredCrate}</span>
				<p class="text-sm text-text-muted m-0">{crateDescriptions[hoveredCrate as CrateName].description}</p>
				<div class="flex flex-col gap-1 text-xs font-mono">
					{#if deps.length > 0}
						<p class="m-0 text-text-subtle">
							<span class="text-text-muted">Depends on:</span> {deps.join(', ')}
						</p>
					{:else}
						<p class="m-0 text-text-subtle">
							<span class="text-text-muted">Depends on:</span> <span class="italic">none (foundation crate)</span>
						</p>
					{/if}
					{#if usedBy.length > 0}
						<p class="m-0 text-text-subtle">
							<span class="text-text-muted">Used by:</span> {usedBy.join(', ')}
						</p>
					{:else}
						<p class="m-0 text-text-subtle">
							<span class="text-text-muted">Used by:</span> <span class="italic">none (top-level crate)</span>
						</p>
					{/if}
				</div>
			</div>
		{:else}
			<p class="text-sm text-text-subtle m-0 italic">Hover over a crate to see its description and dependencies</p>
		{/if}
	</div>
</div>

<style>
	.crate {
		transition: transform 0.1s ease-out;
	}
</style>
