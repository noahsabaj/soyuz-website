<script lang="ts">
	import { onMount } from 'svelte';
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import LinuxIcon from '$lib/components/icons/LinuxIcon.svelte';
	import AppleIcon from '$lib/components/icons/AppleIcon.svelte';
	import WindowsIcon from '$lib/components/icons/WindowsIcon.svelte';
	import {
		fetchLatestVersion,
		releaseFallbackAsset,
		resolveReleaseAsset,
		type ReleaseAsset,
		type VersionInfo
	} from '$lib/version';

	import type { Component } from 'svelte';

	type Platform = 'linux' | 'macos' | 'windows' | 'unknown';

	let releaseInfo = $state<VersionInfo | null>(null);
	let isLoading = $state<boolean>(true);
	let detectedPlatform = $state<Platform>('unknown');

	const version = $derived(releaseInfo?.version ?? 'v0.0.0');
	const releaseUrl = $derived(
		releaseInfo?.releaseUrl ?? 'https://github.com/noahsabaj/soyuz/releases'
	);

	// Filenames must match the assets produced by soyuz's release.yml exactly.
	// Every artifact is named from the git tag (`version`, e.g. v0.7.0); the
	// release workflow builds them with `dx bundle` so they ship styled.
	const linuxDownloads = $derived({
		deb: {
			label: '.deb Installer',
			subtitle: 'Ubuntu, Debian, Mint',
			filename: `soyuz-${version}-linux-x86_64.deb`
		},
		rpm: {
			label: '.rpm Installer',
			subtitle: 'Fedora, RHEL, openSUSE',
			filename: `soyuz-${version}-linux-x86_64.rpm`
		},
		appimage: {
			label: 'AppImage',
			subtitle: 'Other distros (incl. Fedora)',
			filename: `soyuz-studio-${version}-linux-x86_64.AppImage`
		}
	});

	const downloads: Record<
		Exclude<Platform, 'unknown'>,
		{ label: string; filename: () => string; icon: Component }
	> = {
		linux: {
			label: 'Download for Linux',
			filename: () => linuxDownloads.deb.filename,
			icon: LinuxIcon
		},
		macos: {
			label: 'Download for macOS',
			filename: () => `soyuz-${version}-macos-aarch64.dmg`,
			icon: AppleIcon
		},
		windows: {
			label: 'Download for Windows',
			filename: () => `soyuz-${version}-windows-x86_64.msi`,
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

	function getOtherPlatforms(): Array<Exclude<Platform, 'unknown'>> {
		const all: Array<Exclude<Platform, 'unknown'>> = ['linux', 'macos', 'windows'];
		if (detectedPlatform === 'unknown') return all;
		return all.filter((platform) => platform !== detectedPlatform);
	}

	function getAsset(filename: string): ReleaseAsset {
		if (!releaseInfo) return releaseFallbackAsset(filename);
		return (
			resolveReleaseAsset(releaseInfo, filename) ?? {
				name: filename,
				browserDownloadUrl: releaseUrl
			}
		);
	}

	function isMissingAsset(filename: string): boolean {
		return !!releaseInfo && !resolveReleaseAsset(releaseInfo, filename);
	}

	onMount(async () => {
		detectedPlatform = detectPlatform();
		releaseInfo = await fetchLatestVersion();
		isLoading = false;
	});
</script>

<div class="container py-10 px-6 pb-16">
	<header class="mb-8 text-center">
		<p class="soyuz-kicker mb-3">Desktop Workbench</p>
		<h1 class="mb-3">Download Soyuz Studio</h1>
		<p class="text-lg text-text-muted">Install the procedural 3D workbench for Rhai SDF assets.</p>
		{#if isLoading}
			<p class="mt-2 font-mono text-sm text-text-muted">Loading latest release...</p>
		{:else}
			<p class="mt-2 font-mono text-sm text-accent">
				Latest: {version}{releaseInfo?.isFallback ? ' (fallback)' : ''}
			</p>
		{/if}
	</header>

	<section
		class="mb-12 flex flex-col items-center gap-6 rounded-lg border border-border bg-bg-alt py-10 px-6"
	>
		{#if isLoading}
			<p class="text-lg text-text-muted">Loading download options...</p>
		{:else if detectedPlatform === 'linux'}
			<p class="mb-2 text-xl font-semibold">Download for Linux</p>
			{@const debAsset = getAsset(linuxDownloads.deb.filename)}
			{@const rpmAsset = getAsset(linuxDownloads.rpm.filename)}
			{@const appImageAsset = getAsset(linuxDownloads.appimage.filename)}
			<div class="flex flex-wrap justify-center gap-4">
				<a
					href={debAsset.browserDownloadUrl}
					class="btn btn-primary px-6 py-4 text-base"
					aria-label={isMissingAsset(linuxDownloads.deb.filename)
						? 'Open Soyuz releases for Linux deb installer'
						: 'Download Linux deb installer'}
				>
					<span class="flex items-center justify-center"><LinuxIcon size={28} /></span>
					<span class="flex flex-col text-left">
						<span>{linuxDownloads.deb.label}</span>
						<span class="text-xs opacity-75"
							>{isMissingAsset(linuxDownloads.deb.filename)
								? 'Open releases'
								: linuxDownloads.deb.subtitle}</span
						>
					</span>
				</a>
				<a
					href={rpmAsset.browserDownloadUrl}
					class="btn px-6 py-4 text-base"
					aria-label={isMissingAsset(linuxDownloads.rpm.filename)
						? 'Open Soyuz releases for Linux rpm installer'
						: 'Download Linux rpm installer'}
				>
					<span class="flex items-center justify-center"><LinuxIcon size={28} /></span>
					<span class="flex flex-col text-left">
						<span>{linuxDownloads.rpm.label}</span>
						<span class="text-xs opacity-75"
							>{isMissingAsset(linuxDownloads.rpm.filename)
								? 'Open releases'
								: linuxDownloads.rpm.subtitle}</span
						>
					</span>
				</a>
				<a
					href={appImageAsset.browserDownloadUrl}
					class="btn px-6 py-4 text-base"
					aria-label={isMissingAsset(linuxDownloads.appimage.filename)
						? 'Open Soyuz releases for Linux AppImage'
						: 'Download Linux AppImage'}
				>
					<span class="flex items-center justify-center"><LinuxIcon size={28} /></span>
					<span class="flex flex-col text-left">
						<span>{linuxDownloads.appimage.label}</span>
						<span class="text-xs opacity-75"
							>{isMissingAsset(linuxDownloads.appimage.filename)
								? 'Open releases'
								: linuxDownloads.appimage.subtitle}</span
						>
					</span>
				</a>
			</div>
			<p class="mt-3 max-w-[560px] text-center text-sm text-text-muted">
				.deb / .rpm: double-click to install. AppImage: make executable, then run. Missing artifacts
				link to the release page instead of a broken file.
			</p>
		{:else if detectedPlatform !== 'unknown'}
			{@const Icon = downloads[detectedPlatform].icon}
			{@const filename = downloads[detectedPlatform].filename()}
			{@const asset = getAsset(filename)}
			<a href={asset.browserDownloadUrl} class="btn btn-primary px-6 py-4 text-base">
				<span class="flex items-center justify-center"><Icon size={28} /></span>
				<span class="flex flex-col text-left">
					<span
						>{isMissingAsset(filename)
							? 'Open Soyuz releases'
							: downloads[detectedPlatform].label}</span
					>
					<span class="font-mono text-xs opacity-80">{filename}</span>
				</span>
			</a>
		{:else}
			<p class="text-lg text-text-muted">Select your platform below</p>
		{/if}

		{#if !isLoading}
			<div class="flex flex-wrap justify-center gap-3">
				{#each getOtherPlatforms() as platform (platform)}
					{@const Icon = downloads[platform].icon}
					{@const filename = downloads[platform].filename()}
					{@const asset = getAsset(filename)}
					<a href={asset.browserDownloadUrl} class="btn py-3 px-4 text-sm">
						<span class="flex items-center justify-center"><Icon size={20} /></span>
						<span
							>{isMissingAsset(filename)
								? `Releases for ${platform}`
								: downloads[platform].label}</span
						>
					</a>
				{/each}
			</div>
		{/if}

		<a href={releaseUrl} class="text-sm text-text-muted" target="_blank" rel="noopener noreferrer">
			View all releases on GitHub
		</a>
	</section>

	<div class="mb-12 grid gap-8 lg:grid-cols-[2fr_1fr]">
		<section class="card">
			<h2 class="mb-6 text-xl">Installation</h2>

			<div class="flex flex-col gap-2">
				<details class="border border-border bg-bg-alt" open>
					<summary class="cursor-pointer select-none py-3 px-4 font-semibold hover:bg-surface">
						Linux
					</summary>
					<div class="flex flex-col gap-4 border-t border-border p-4">
						<h4 class="mt-2 text-sm text-text-muted">.deb Installer (Ubuntu/Debian/Mint)</h4>
						<p>Double-click the .deb file to open the package installer, then install.</p>
						<p class="border-l-[3px] border-accent bg-surface p-3 text-sm text-text-muted">
							Or from terminal: <code>sudo dpkg -i soyuz-studio_*.deb</code>
						</p>

						<h4 class="mt-2 text-sm text-text-muted">.rpm Installer (Fedora/RHEL/openSUSE)</h4>
						<p>Double-click the .rpm file to open the package installer, then install.</p>
						<p class="border-l-[3px] border-accent bg-surface p-3 text-sm text-text-muted">
							Or from terminal: <code>sudo dnf install ./soyuz-*.rpm</code>
						</p>

						<h4 class="mt-2 text-sm text-text-muted">AppImage (Other distros, incl. Fedora)</h4>
						<p>Make the file executable, then run it directly.</p>
						<p class="border-l-[3px] border-accent bg-surface p-3 text-sm text-text-muted">
							Or from terminal: <code>chmod +x *.AppImage && ./*.AppImage</code>
						</p>
					</div>
				</details>

				<details class="border border-border bg-bg-alt">
					<summary class="cursor-pointer select-none py-3 px-4 font-semibold hover:bg-surface">
						macOS
					</summary>
					<div class="flex flex-col gap-4 border-t border-border p-4">
						<p>Open the .dmg file and drag Soyuz Studio to your Applications folder.</p>
						<p class="border-l-[3px] border-accent bg-surface p-3 text-sm text-text-muted">
							If no macOS asset is attached to the latest release, the download button opens the
							release page.
						</p>
					</div>
				</details>

				<details class="border border-border bg-bg-alt">
					<summary class="cursor-pointer select-none py-3 px-4 font-semibold hover:bg-surface">
						Windows
					</summary>
					<div class="flex flex-col gap-4 border-t border-border p-4">
						<p>Run the MSI installer if a Windows build is attached to the release.</p>
						<p class="border-l-[3px] border-accent bg-surface p-3 text-sm text-text-muted">
							If the artifact is missing, use the GitHub release page for source or alternative
							builds.
						</p>
					</div>
				</details>
			</div>
		</section>

		<aside class="flex flex-col gap-6">
			<div class="card p-5">
				<h3 class="mb-3 text-sm uppercase text-text-muted">What's Included</h3>
				<ul class="flex list-none flex-col gap-2 text-sm">
					<li>
						<strong>Soyuz Studio</strong> - Desktop IDE with editor, Preview tab, and Export tab
					</li>
					<li>
						<strong>Preview process</strong> - Built into the Studio binary, no separate helper install
					</li>
				</ul>
			</div>

			<div class="card p-5">
				<h3 class="mb-3 text-sm uppercase text-text-muted">System Requirements</h3>
				<ul class="flex list-none flex-col gap-2 text-sm">
					<li><strong>GPU:</strong> Vulkan-capable graphics card</li>
					<li><strong>RAM:</strong> 4GB minimum, 8GB recommended</li>
					<li><strong>Linux:</strong> primary target, X11 best for docked native preview</li>
				</ul>
			</div>
		</aside>
	</div>

	<section class="card mb-12 p-8">
		<h2 class="mb-2 text-xl">Build from Source</h2>
		<p class="mb-6 text-text-muted">
			For developers or unsupported platforms. Requires Rust 1.85+.
		</p>

		<CodeBlock
			code={`git clone https://github.com/noahsabaj/soyuz
cd soyuz
cargo build --release -p soyuz-app --bin soyuz-studio

# Run Soyuz Studio
./target/release/soyuz-studio`}
		/>
	</section>
</div>
