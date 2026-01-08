<script lang="ts">
	// Download page - fetches latest version from GitHub API at runtime
	//
	// Dynamically fetches the latest Soyuz release version so the download links
	// stay current without requiring a website rebuild.

	import { onMount } from 'svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import LinuxIcon from '$lib/components/icons/LinuxIcon.svelte';
	import AppleIcon from '$lib/components/icons/AppleIcon.svelte';
	import WindowsIcon from '$lib/components/icons/WindowsIcon.svelte';
	import { fetchLatestVersion } from '$lib/version';

	import type { Component } from 'svelte';

	type Platform = 'linux' | 'macos' | 'windows' | 'unknown';

	// Version state - fetched from GitHub API on mount
	let VERSION = $state('v0.0.0');
	let VERSION_CLEAN = $state('0.0.0');
	let isLoading = $state(true);

	let detectedPlatform: Platform = $state('unknown');

	// Linux has two download options
	const linuxDownloads = $derived({
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
	});

	const downloads: Record<Exclude<Platform, 'unknown'>, { label: string; filename: () => string; icon: Component }> = {
		linux: {
			label: 'Download for Linux',
			filename: () => linuxDownloads.deb.filename,
			icon: LinuxIcon
		},
		macos: {
			label: 'Download for macOS',
			filename: () => `soyuz-${VERSION}-macos-universal.dmg`,
			icon: AppleIcon
		},
		windows: {
			label: 'Download for Windows',
			filename: () => `soyuz-${VERSION}-windows-x86_64.msi`,
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

	onMount(async () => {
		detectedPlatform = detectPlatform();

		// Fetch latest version from GitHub API
		const versionInfo = await fetchLatestVersion();
		VERSION = versionInfo.version;
		VERSION_CLEAN = versionInfo.versionClean;
		isLoading = false;
	});
</script>

<svelte:head>
	<title>Download - Soyuz</title>
</svelte:head>

<div class="container py-10 px-6 pb-16">
	<header class="text-center mb-8">
		<h1 class="mb-3">Download Soyuz</h1>
		<p class="text-lg text-text-muted">Get started with procedural 3D modeling.</p>
		{#if isLoading}
			<p class="text-sm text-text-muted font-mono mt-2">Loading latest version...</p>
		{:else}
			<p class="text-sm text-accent font-mono mt-2">Latest: {VERSION}</p>
		{/if}
	</header>

	<section class="flex flex-col items-center gap-6 py-10 px-6 bg-bg-alt border-2 border-border mb-12">
		{#if isLoading}
			<p class="text-lg text-text-muted">Loading download options...</p>
		{:else if detectedPlatform === 'linux'}
			<!-- Linux gets two side-by-side options -->
			<p class="text-xl font-semibold mb-4">Download for Linux</p>
			<div class="flex gap-4 flex-wrap justify-center">
				<a href={getDownloadUrl(linuxDownloads.deb.filename)} class="download-btn-primary flex items-center gap-3 py-4 px-6 no-underline border-2 border-accent bg-accent text-white text-lg transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md">
					<span class="flex items-center justify-center"><LinuxIcon size={28} /></span>
					<span class="flex flex-col">
						<span>{linuxDownloads.deb.label}</span>
						<span class="text-xs opacity-70">{linuxDownloads.deb.subtitle}</span>
					</span>
				</a>
				<a href={getDownloadUrl(linuxDownloads.appimage.filename)} class="download-btn-alt flex items-center gap-3 py-4 px-6 no-underline border-2 border-accent bg-surface text-text text-lg transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md hover:bg-bg-alt">
					<span class="flex items-center justify-center"><LinuxIcon size={28} /></span>
					<span class="flex flex-col">
						<span>{linuxDownloads.appimage.label}</span>
						<span class="text-xs opacity-70">{linuxDownloads.appimage.subtitle}</span>
					</span>
				</a>
			</div>
			<p class="text-sm text-text-muted mt-3">.deb: Double-click to install. AppImage: Make executable, then run.</p>
		{:else if detectedPlatform !== 'unknown'}
			{@const Icon = downloads[detectedPlatform].icon}
			{@const filename = downloads[detectedPlatform].filename()}
			<a href={getDownloadUrl(filename)} class="download-btn-primary flex items-center gap-3 py-4 px-6 no-underline border-2 border-accent bg-accent text-white text-lg transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md">
				<span class="flex items-center justify-center"><Icon size={28} /></span>
				<span class="flex flex-col">
					<span>{downloads[detectedPlatform].label}</span>
					<span class="text-xs opacity-80 font-mono">{filename}</span>
				</span>
			</a>
		{:else}
			<p class="text-lg text-text-muted">Select your platform below</p>
		{/if}

		{#if !isLoading}
			<div class="flex flex-wrap gap-3 justify-center">
				{#each getOtherPlatforms() as platform}
					{@const Icon = downloads[platform].icon}
					{@const filename = downloads[platform].filename()}
					<a href={getDownloadUrl(filename)} class="flex items-center gap-3 py-4 px-6 no-underline border-2 border-border bg-surface text-text text-sm transition-all duration-150 hover:bg-bg-alt hover:shadow-sm">
						<span class="flex items-center justify-center"><Icon size={20} /></span>
						<span>{downloads[platform].label}</span>
					</a>
				{/each}
			</div>
		{/if}

		<a
			href="https://github.com/noahsabaj/soyuz/releases"
			class="text-sm text-text-muted"
			target="_blank"
			rel="noopener noreferrer"
		>
			View all releases on GitHub
		</a>
	</section>

	<div class="grid gap-8 mb-12 lg:grid-cols-[2fr_1fr]">
		<section class="card">
			<h2 class="text-xl mb-6">Installation</h2>

			<div class="flex flex-col gap-2">
				<details class="border-2 border-border bg-bg-alt" open>
					<summary class="py-3 px-4 cursor-pointer font-semibold select-none hover:bg-surface">Linux</summary>
					<div class="p-4 border-t-2 border-border flex flex-col gap-4">
						<h4 class="text-sm text-text-muted mt-2">.deb Installer (Ubuntu/Debian/Mint)</h4>
						<p>Double-click the .deb file to open the package installer, then click "Install Package".</p>
						<p class="text-sm text-text-muted p-3 bg-surface border-l-[3px] border-accent">
							Or from terminal: <code>sudo dpkg -i soyuz-studio_*.deb</code>
						</p>

						<h4 class="text-sm text-text-muted mt-2">AppImage (Other distros)</h4>
						<p>
							Right-click the downloaded file, select Properties, go to Permissions, and check
							"Allow executing as program". Then double-click to run.
						</p>
						<p class="text-sm text-text-muted p-3 bg-surface border-l-[3px] border-accent">
							Or from terminal: <code>chmod +x *.AppImage && ./*.AppImage</code>
						</p>
					</div>
				</details>

				<details class="border-2 border-border bg-bg-alt">
					<summary class="py-3 px-4 cursor-pointer font-semibold select-none hover:bg-surface">macOS</summary>
					<div class="p-4 border-t-2 border-border flex flex-col gap-4">
						<p>Open the .dmg file and drag Soyuz Studio to your Applications folder.</p>
						<p class="text-sm text-text-muted p-3 bg-surface border-l-[3px] border-accent">
							On first launch, you may need to right-click and select "Open" to bypass Gatekeeper
							since the app is not yet notarized.
						</p>
					</div>
				</details>

				<details class="border-2 border-border bg-bg-alt">
					<summary class="py-3 px-4 cursor-pointer font-semibold select-none hover:bg-surface">Windows</summary>
					<div class="p-4 border-t-2 border-border flex flex-col gap-4">
						<h4 class="text-sm text-text-muted mt-2">MSI installer (recommended)</h4>
						<p>Double-click the .msi file and follow the setup wizard.</p>

						<h4 class="text-sm text-text-muted mt-2">Alternative: Portable</h4>
						<p>Extract the .zip file and run soyuz-studio.exe directly.</p>
					</div>
				</details>
			</div>
		</section>

		<aside class="flex flex-col gap-6">
			<div class="card p-5">
				<h3 class="text-sm uppercase tracking-wide text-text-muted mb-3">What's Included</h3>
				<ul class="list-none flex flex-col gap-2 text-sm">
					<li><strong>Soyuz Studio</strong> - Desktop IDE with real-time 3D preview and mesh export</li>
				</ul>
			</div>

			<div class="card p-5">
				<h3 class="text-sm uppercase tracking-wide text-text-muted mb-3">System Requirements</h3>
				<ul class="list-none flex flex-col gap-2 text-sm">
					<li><strong>GPU:</strong> Vulkan-capable graphics card</li>
					<li><strong>RAM:</strong> 4GB minimum, 8GB recommended</li>
					<li><strong>Disk:</strong> ~100MB for installation</li>
				</ul>
			</div>
		</aside>
	</div>

	<section class="card p-8 mb-12">
		<h2 class="text-xl mb-2">Build from Source</h2>
		<p class="text-text-muted mb-6">For developers or unsupported platforms. Requires Rust 1.75+.</p>

		<CodeBlock
			code={`git clone https://github.com/noahsabaj/soyuz
cd soyuz
cargo build --release

# Run Soyuz Studio
./target/release/soyuz-studio`}
		/>
	</section>
</div>
