<svelte:head>
	<title>Soyuz Studio - Soyuz</title>
</svelte:head>

<div class="flex flex-col gap-8">
	<header>
		<h1 class="mb-2">Soyuz Studio</h1>
		<p class="text-lg text-text-muted">The desktop IDE for Soyuz.</p>
	</header>

	<section class="flex flex-col gap-4">
		<h2 class="text-xl pt-4 border-t border-border-light">Interface Overview</h2>
		<p>Soyuz Studio provides a complete environment for writing scripts and previewing models:</p>
		<ul class="pl-6 flex flex-col gap-2">
			<li><strong>File Browser</strong> - Navigate and open script files</li>
			<li><strong>Code Editor</strong> - Write Rhai scripts with syntax highlighting</li>
			<li><strong>Preview Window</strong> - Real-time GPU-rendered view of your model</li>
			<li><strong>Export Panel</strong> - Configure and export meshes</li>
		</ul>
	</section>

	<section class="flex flex-col gap-4">
		<h2 class="text-xl pt-4 border-t border-border-light">Keyboard Shortcuts</h2>
		<table class="w-full border-collapse">
			<tbody>
				<tr><td class="p-2 px-4 border border-border-light font-mono text-sm w-40"><code>Ctrl+Enter</code></td><td class="p-2 px-4 border border-border-light">Run preview</td></tr>
				<tr><td class="p-2 px-4 border border-border-light font-mono text-sm w-40"><code>Ctrl+S</code></td><td class="p-2 px-4 border border-border-light">Save file</td></tr>
				<tr><td class="p-2 px-4 border border-border-light font-mono text-sm w-40"><code>Ctrl+O</code></td><td class="p-2 px-4 border border-border-light">Open file</td></tr>
				<tr><td class="p-2 px-4 border border-border-light font-mono text-sm w-40"><code>Ctrl+N</code></td><td class="p-2 px-4 border border-border-light">New tab</td></tr>
				<tr><td class="p-2 px-4 border border-border-light font-mono text-sm w-40"><code>Ctrl+W</code></td><td class="p-2 px-4 border border-border-light">Close tab</td></tr>
				<tr><td class="p-2 px-4 border border-border-light font-mono text-sm w-40"><code>Ctrl+Z</code></td><td class="p-2 px-4 border border-border-light">Undo</td></tr>
				<tr><td class="p-2 px-4 border border-border-light font-mono text-sm w-40"><code>Ctrl+Shift+Z</code></td><td class="p-2 px-4 border border-border-light">Redo</td></tr>
				<tr><td class="p-2 px-4 border border-border-light font-mono text-sm w-40"><code>Ctrl+\</code></td><td class="p-2 px-4 border border-border-light">Split pane vertically</td></tr>
			</tbody>
		</table>
	</section>
</div>
