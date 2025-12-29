<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
</script>

<svelte:head>
	<title>Installation - Soyuz</title>
</svelte:head>

<div class="doc-page">
	<h1>Installation</h1>
	<p class="lead">Get Soyuz running on your machine.</p>

	<section>
		<h2>Prerequisites</h2>
		<ul>
			<li><strong>Rust toolchain</strong> (1.75 or later)</li>
			<li><strong>Linux</strong> with X11 or Wayland</li>
		</ul>
		<p class="note">
			macOS and Windows support is planned. Currently, the desktop app is Linux-focused.
		</p>
	</section>

	<section>
		<h2>Build from source</h2>
		<p>Clone the repository and build:</p>
		<CodeBlock
			code={`git clone https://github.com/noahsabaj/soyuz
cd soyuz
cargo build --release`}
		/>
		<p>This creates two binaries:</p>
		<ul>
			<li><code>./target/release/soyuz-studio</code> - Desktop IDE</li>
			<li><code>./target/release/soyuz</code> - Command-line tool</li>
		</ul>
	</section>

	<section>
		<h2>Run the Studio</h2>
		<CodeBlock code="cargo run --release -p app" />
		<p>This launches Soyuz Studio, the desktop IDE for editing scripts and previewing models.</p>
	</section>

	<section>
		<h2>Run the CLI</h2>
		<CodeBlock code="cargo run --release -p soyuz-cli -- --help" />
		<p>
			The CLI provides commands for batch processing, previewing, and exporting without the GUI.
		</p>
	</section>

	<nav class="doc-nav">
		<a href="/docs/getting-started/quick-start" class="next">
			<span class="label">Next</span>
			<span class="title">Quick Start</span>
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
		color: var(--color-text-muted);
		padding: var(--space-3) var(--space-4);
		background: var(--color-bg-alt);
		border-left: 3px solid var(--color-accent);
	}

	.doc-nav {
		display: flex;
		justify-content: flex-end;
		padding-top: var(--space-8);
		border-top: var(--border-width) solid var(--color-border);
		margin-top: var(--space-8);
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
</style>
