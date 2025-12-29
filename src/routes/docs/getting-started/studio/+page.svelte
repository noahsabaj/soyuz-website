<svelte:head>
	<title>Soyuz Studio - Soyuz</title>
</svelte:head>

<div class="doc-page">
	<h1>Soyuz Studio</h1>
	<p class="lead">The desktop IDE for Soyuz.</p>

	<section>
		<h2>Interface Overview</h2>
		<p>Soyuz Studio provides a complete environment for writing scripts and previewing models:</p>
		<ul>
			<li><strong>File Browser</strong> - Navigate and open script files</li>
			<li><strong>Code Editor</strong> - Write Rhai scripts with syntax highlighting</li>
			<li><strong>Preview Window</strong> - Real-time GPU-rendered view of your model</li>
			<li><strong>Export Panel</strong> - Configure and export meshes</li>
		</ul>
	</section>

	<section>
		<h2>Keyboard Shortcuts</h2>
		<table>
			<tbody>
				<tr><td><code>Ctrl+Enter</code></td><td>Run preview</td></tr>
				<tr><td><code>Ctrl+S</code></td><td>Save file</td></tr>
				<tr><td><code>Ctrl+O</code></td><td>Open file</td></tr>
				<tr><td><code>Ctrl+N</code></td><td>New tab</td></tr>
				<tr><td><code>Ctrl+W</code></td><td>Close tab</td></tr>
				<tr><td><code>Ctrl+Z</code></td><td>Undo</td></tr>
				<tr><td><code>Ctrl+Shift+Z</code></td><td>Redo</td></tr>
				<tr><td><code>Ctrl+\</code></td><td>Split pane vertically</td></tr>
			</tbody>
		</table>
	</section>
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

	table {
		width: 100%;
		border-collapse: collapse;
	}

	td {
		padding: var(--space-2) var(--space-4);
		border: 1px solid var(--color-border-light);
	}

	td:first-child {
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		width: 160px;
	}
</style>
