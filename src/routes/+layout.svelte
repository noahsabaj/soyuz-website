<script lang="ts">
	import '../styles/global.css';
	import { page } from '$app/state';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();

	// Production site lives on GitHub Pages at this origin + project subpath.
	// We build absolute social URLs from these constants rather than `base` from
	// `$app/paths`, because SvelteKit relativizes `base` inside pages (paths.relative)
	// which would corrupt absolute URLs. `page.url.pathname` already carries the
	// real base during prerender, so it is safe for the per-page canonical URL.
	const SITE_ORIGIN = 'https://noahsabaj.github.io';
	const SITE_URL = `${SITE_ORIGIN}/soyuz-website`;
	const SOCIAL_TITLE = 'Soyuz - Procedural 3D Asset Generation';
	const SOCIAL_DESCRIPTION =
		'Create 3D models with code. Soyuz is a procedural asset generation framework using Signed Distance Fields.';
	const ogImage = `${SITE_URL}/og-image.png`;
	const canonicalUrl = $derived(`${SITE_ORIGIN}${page.url.pathname}`);
</script>

<svelte:head>
	<title>Soyuz - Procedural 3D Asset Generation</title>
	<link rel="canonical" href={canonicalUrl} />

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content={SOCIAL_TITLE} />
	<meta property="og:description" content={SOCIAL_DESCRIPTION} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:url" content={canonicalUrl} />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={SOCIAL_TITLE} />
	<meta name="twitter:description" content={SOCIAL_DESCRIPTION} />
	<meta name="twitter:image" content={ogImage} />

	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="flex flex-col min-h-screen">
	<Nav />
	<main class="flex-1">
		{@render children()}
	</main>
	<Footer />
</div>
