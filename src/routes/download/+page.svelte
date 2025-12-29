<script lang="ts">
	import { onMount } from 'svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import LinuxIcon from '$lib/components/icons/LinuxIcon.svelte';
	import AppleIcon from '$lib/components/icons/AppleIcon.svelte';
	import WindowsIcon from '$lib/components/icons/WindowsIcon.svelte';

	import type { Component } from 'svelte';

	type Platform = 'linux' | 'macos' | 'windows' | 'unknown';

	const VERSION = 'v0.1.1';
	const VERSION_CLEAN = VERSION.replace('v', '');
	let detectedPlatform: Platform = $state('unknown');

	// Linux has two download options
	const linuxDownloads = {
		deb: {
			label: '.deb Installer',
			subtitle: 'Ubuntu, Debian, Mint',
			filename: `soyuz-studio_${VERSION_CLEAN}-1_amd64.deb`
		},
		appimage: {
			label: 'AppImage',
			subtitle: 'Other distros',
			filename: `soyuz-studio-${VERSION}-linux-x86_64.AppImage`
		}
	};

	const downloads: Record<Exclude<Platform, 'unknown'>, { label: string; filename: string; icon: Component }> = {
		linux: {
			label: 'Download for Linux',
			filename: linuxDownloads.deb.filename,
			icon: LinuxIcon
		},
		macos: {
			label: 'Download for macOS',
			filename: `soyuz-${VERSION}-macos-universal.dmg`,
			icon: AppleIcon
		},
		windows: {
			label: 'Download for Windows',
			filename: `soyuz-${VERSION}-windows-x86_64.msi`,
			icon: WindowsIcon
		}
	};

	function detectPlatform(): Platform {
		if (typeof navigator === 'undefined') return 'unknown';

		const ua = navigator.userAgent.toLowerCase();
		const platform = navigator.platform?.toLowerCase() || '';

		if (platform.includes('mac') || ua.includes('mac')) return 'macos';
		if (platform.includes('win') || ua.includes('win')) return 'windows';
		if (platform.includes('linux') || ua.includes('linux')) return 'linux';

		return 'unknown';
	}

	function getDownloadUrl(filename: string): string {
		return `https://github.com/noahsabaj/soyuz/releases/download/${VERSION}/${filename}`;
	}

	function getOtherPlatforms(): Array<Exclude<Platform, 'unknown'>> {
		const all: Array<Exclude<Platform, 'unknown'>> = ['linux', 'macos', 'windows'];
		if (detectedPlatform === 'unknown') return all;
		return all.filter((p) => p !== detectedPlatform);
	}

	onMount(() => {
		detectedPlatform = detectPlatform();
	});
</script>

<svelte:head>
	<title>Download - Soyuz</title>
</svelte:head>

<div class="download-page container">
	<header class="page-header">
		<h1>Download Soyuz</h1>
		<p class="lead">Get started with procedural 3D modeling.</p>
		<p class="version">Latest: {VERSION}</p>
	</header>

	<section class="download-hero">
		{#if detectedPlatform === 'linux'}
			<!-- Linux gets two side-by-side options -->
			<p class="platform-label">Download for Linux</p>
			<div class="linux-options">
				<a href={getDownloadUrl(linuxDownloads.deb.filename)} class="download-button primary">
					<span class="icon"><LinuxIcon size={28} /></span>
					<span class="text">
						<span class="label">{linuxDownloads.deb.label}</span>
						<span class="subtitle">{linuxDownloads.deb.subtitle}</span>
					</span>
				</a>
				<a href={getDownloadUrl(linuxDownloads.appimage.filename)} class="download-button primary-alt">
					<span class="icon"><LinuxIcon size={28} /></span>
					<span class="text">
						<span class="label">{linuxDownloads.appimage.label}</span>
						<span class="subtitle">{linuxDownloads.appimage.subtitle}</span>
					</span>
				</a>
			</div>
			<p class="install-hint">.deb: Double-click to install. AppImage: Make executable, then run.</p>
		{:else if detectedPlatform !== 'unknown'}
			{@const Icon = downloads[detectedPlatform].icon}
			<a href={getDownloadUrl(downloads[detectedPlatform].filename)} class="download-button primary">
				<span class="icon"><Icon size={28} /></span>
				<span class="text">
					<span class="label">{downloads[detectedPlatform].label}</span>
					<span class="filename">{downloads[detectedPlatform].filename}</span>
				</span>
			</a>
		{:else}
			<p class="detecting">Select your platform below</p>
		{/if}

		<div class="other-platforms">
			{#each getOtherPlatforms() as platform}
				{@const Icon = downloads[platform].icon}
				<a href={getDownloadUrl(downloads[platform].filename)} class="download-button secondary">
					<span class="icon"><Icon size={20} /></span>
					<span class="text">{downloads[platform].label}</span>
				</a>
			{/each}
		</div>

		<a href="https://github.com/noahsabaj/soyuz/releases" class="all-releases">
			View all releases on GitHub
		</a>
	</section>

	<div class="download-grid">
		<section class="install-instructions card">
			<h2>Installation</h2>

			<div class="tabs">
				<details open>
					<summary>Linux</summary>
					<div class="tab-content">
						<h4>.deb Installer (Ubuntu/Debian/Mint)</h4>
						<p>Double-click the .deb file to open the package installer, then click "Install Package".</p>
						<p class="note">
							Or from terminal: <code>sudo dpkg -i soyuz-studio_*.deb</code>
						</p>

						<h4>AppImage (Other distros)</h4>
						<p>
							Right-click the downloaded file, select Properties, go to Permissions, and check
							"Allow executing as program". Then double-click to run.
						</p>
						<p class="note">
							Or from terminal: <code>chmod +x *.AppImage && ./*.AppImage</code>
						</p>
					</div>
				</details>

				<details>
					<summary>macOS</summary>
					<div class="tab-content">
						<p>Open the .dmg file and drag Soyuz Studio to your Applications folder.</p>
						<p class="note">
							On first launch, you may need to right-click and select "Open" to bypass Gatekeeper
							since the app is not yet notarized.
						</p>
					</div>
				</details>

				<details>
					<summary>Windows</summary>
					<div class="tab-content">
						<h4>MSI installer (recommended)</h4>
						<p>Double-click the .msi file and follow the setup wizard.</p>

						<h4>Alternative: Portable</h4>
						<p>Extract the .zip file and run soyuz-studio.exe directly.</p>
					</div>
				</details>
			</div>
		</section>

		<aside class="download-info">
			<div class="info-card card">
				<h3>What's Included</h3>
				<ul>
					<li><strong>Soyuz Studio</strong> - Desktop IDE with real-time 3D preview</li>
					<li><strong>soyuz</strong> - CLI for scripting and batch processing</li>
				</ul>
			</div>

			<div class="info-card card">
				<h3>System Requirements</h3>
				<ul>
					<li><strong>GPU:</strong> Vulkan-capable graphics card</li>
					<li><strong>RAM:</strong> 4GB minimum, 8GB recommended</li>
					<li><strong>Disk:</strong> ~100MB for installation</li>
				</ul>
			</div>
		</aside>
	</div>

	<section class="source-section card">
		<h2>Build from Source</h2>
		<p>For developers or unsupported platforms. Requires Rust 1.75+.</p>

		<div class="steps">
			<CodeBlock
				code={`git clone https://github.com/noahsabaj/soyuz
cd soyuz
cargo build --release

# Run the desktop IDE
./target/release/soyuz-studio

# Or the CLI
./target/release/soyuz --help`}
			/>
		</div>
	</section>

	<section class="cli-section">
		<h2>CLI Commands</h2>
		<p>The <code>soyuz</code> CLI provides these commands:</p>

		<div class="commands-grid">
			<div class="command card">
				<h4>preview</h4>
				<p>Open a live preview window for a script.</p>
				<CodeBlock code="soyuz preview --script model.rhai" compact />
			</div>

			<div class="command card">
				<h4>generate</h4>
				<p>Export a script to a mesh file.</p>
				<CodeBlock code="soyuz generate --script model.rhai --output model.glb" compact />
			</div>

			<div class="command card">
				<h4>watch</h4>
				<p>Watch a file and auto-refresh preview on changes.</p>
				<CodeBlock code="soyuz watch --script model.rhai" compact />
			</div>

			<div class="command card">
				<h4>repl</h4>
				<p>Interactive scripting shell.</p>
				<CodeBlock code="soyuz repl" compact />
			</div>
		</div>
	</section>
</div>

<style>
	.download-page {
		padding: var(--space-10) var(--space-6) var(--space-16);
	}

	.page-header {
		text-align: center;
		margin-bottom: var(--space-8);
	}

	.page-header h1 {
		margin-bottom: var(--space-3);
	}

	.lead {
		font-size: var(--text-lg);
		color: var(--color-text-muted);
	}

	.version {
		font-size: var(--text-sm);
		color: var(--color-accent);
		font-family: var(--font-mono);
		margin-top: var(--space-2);
	}

	.download-hero {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-6);
		padding: var(--space-10) var(--space-6);
		background: var(--color-bg-alt);
		border: var(--border-width) solid var(--color-border);
		margin-bottom: var(--space-12);
	}

	.download-button {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		padding: var(--space-4) var(--space-6);
		text-decoration: none;
		border: var(--border-width) solid var(--color-border);
		transition: all 0.15s ease;
	}

	.download-button.primary {
		background: var(--color-accent);
		border-color: var(--color-accent);
		color: var(--color-bg);
		font-size: var(--text-lg);
	}

	.download-button.primary:hover {
		background: var(--color-accent-hover);
		transform: translateY(-2px);
		box-shadow: var(--shadow-md);
	}

	.download-button.primary .text {
		display: flex;
		flex-direction: column;
	}

	.download-button.primary .filename {
		font-size: var(--text-xs);
		opacity: 0.8;
		font-family: var(--font-mono);
	}

	.download-button.primary-alt {
		background: var(--color-surface);
		border-color: var(--color-accent);
		color: var(--color-text);
		font-size: var(--text-lg);
	}

	.download-button.primary-alt:hover {
		background: var(--color-bg-alt);
		transform: translateY(-2px);
		box-shadow: var(--shadow-md);
	}

	.download-button.primary-alt .text,
	.download-button.primary .text {
		display: flex;
		flex-direction: column;
	}

	.download-button .subtitle {
		font-size: var(--text-xs);
		opacity: 0.7;
	}

	.platform-label {
		font-size: var(--text-xl);
		font-weight: 600;
		margin-bottom: var(--space-4);
	}

	.linux-options {
		display: flex;
		gap: var(--space-4);
		flex-wrap: wrap;
		justify-content: center;
	}

	.install-hint {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		margin-top: var(--space-3);
	}

	.download-button.secondary {
		background: var(--color-surface);
		color: var(--color-text);
		font-size: var(--text-sm);
	}

	.download-button.secondary:hover {
		background: var(--color-bg-alt);
		box-shadow: var(--shadow-sm);
	}

	.download-button .icon {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.other-platforms {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-3);
		justify-content: center;
	}

	.all-releases {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
	}

	.detecting {
		font-size: var(--text-lg);
		color: var(--color-text-muted);
	}

	.download-grid {
		display: grid;
		gap: var(--space-8);
		margin-bottom: var(--space-12);
	}

	.install-instructions h2 {
		font-size: var(--text-xl);
		margin-bottom: var(--space-6);
	}

	.tabs {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.tabs details {
		border: var(--border-width) solid var(--color-border);
		background: var(--color-bg-alt);
	}

	.tabs summary {
		padding: var(--space-3) var(--space-4);
		cursor: pointer;
		font-weight: 600;
		user-select: none;
	}

	.tabs summary:hover {
		background: var(--color-surface);
	}

	.tab-content {
		padding: var(--space-4);
		border-top: var(--border-width) solid var(--color-border);
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}

	.tab-content h4 {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		margin-top: var(--space-2);
	}

	.tab-content .note {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		padding: var(--space-3);
		background: var(--color-surface);
		border-left: 3px solid var(--color-accent);
	}

	.download-info {
		display: flex;
		flex-direction: column;
		gap: var(--space-6);
	}

	.info-card {
		padding: var(--space-5);
	}

	.info-card h3 {
		font-size: var(--text-sm);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--color-text-muted);
		margin-bottom: var(--space-3);
	}

	.info-card ul {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
		font-size: var(--text-sm);
	}

	.source-section {
		padding: var(--space-8);
		margin-bottom: var(--space-12);
	}

	.source-section h2 {
		font-size: var(--text-xl);
		margin-bottom: var(--space-2);
	}

	.source-section > p {
		color: var(--color-text-muted);
		margin-bottom: var(--space-6);
	}

	.cli-section {
		border-top: var(--border-width) solid var(--color-border);
		padding-top: var(--space-12);
	}

	.cli-section h2 {
		font-size: var(--text-2xl);
		margin-bottom: var(--space-3);
	}

	.cli-section > p {
		color: var(--color-text-muted);
		margin-bottom: var(--space-8);
	}

	.commands-grid {
		display: grid;
		gap: var(--space-6);
	}

	.command {
		padding: var(--space-5);
	}

	.command h4 {
		font-family: var(--font-mono);
		font-size: var(--text-base);
		color: var(--color-accent);
		margin-bottom: var(--space-2);
	}

	.command p {
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		margin-bottom: var(--space-3);
	}

	@media (min-width: 900px) {
		.download-grid {
			grid-template-columns: 2fr 1fr;
		}

		.commands-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
