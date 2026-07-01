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
	const OG_IMAGE_ALT =
		'Soyuz Studio - a procedural 3D workbench for building assets from Rhai SDF scripts.';
	const ogImage = `${SITE_URL}/og-image.png`;

	// Title and description are the single source of truth per route: each page's
	// `load` sets them on `page.data`, and they drive <title>, the meta
	// description, and every Open Graph / Twitter tag below. Sharing a deep link
	// therefore previews that specific page. Falls back to the site-wide social
	// copy for any route that does not set its own.
	const pageTitle = $derived(page.data.title ?? SOCIAL_TITLE);
	const pageDescription = $derived(page.data.description ?? SOCIAL_DESCRIPTION);

	// `trailingSlash: 'never'` serves every page without a trailing slash except
	// the site root (`/soyuz-website/`). `page.url.pathname` already matches that
	// convention during prerender, so the canonical never points at a redirect.
	const canonicalUrl = $derived(`${SITE_ORIGIN}${page.url.pathname}`);

	// --- Structured data (JSON-LD) -----------------------------------------
	// Build the full script element here and inject it with {@html}. The closing
	// tag is split (`</` + `script>`) so the literal token never appears in
	// source; otherwise it would terminate this component's script block early
	// (and confuse tooling). Values are build-time constants, but the less-than
	// sign is escaped so a string can never break out of the element.
	function jsonLdScript(data: unknown): string {
		const json = JSON.stringify(data).replace(/</g, '\\u003c');
		return `<script type="application/ld+json">${json}</` + `script>`;
	}

	const websiteScript = jsonLdScript({
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: 'Soyuz',
		url: SITE_URL,
		description: SOCIAL_DESCRIPTION
	});

	const softwareAppScript = jsonLdScript({
		'@context': 'https://schema.org',
		'@type': 'SoftwareApplication',
		name: 'Soyuz',
		description: SOCIAL_DESCRIPTION,
		applicationCategory: 'DeveloperApplication',
		operatingSystem: 'Windows, macOS, Linux',
		url: SITE_URL,
		image: ogImage,
		screenshot: ogImage,
		offers: {
			'@type': 'Offer',
			price: '0',
			priceCurrency: 'USD'
		}
	});

	// Only docs routes set `breadcrumb`; other pages render no BreadcrumbList.
	const breadcrumbScript = $derived.by(() => {
		const crumbs = page.data.breadcrumb;
		if (!crumbs || crumbs.length === 0) return '';
		return jsonLdScript({
			'@context': 'https://schema.org',
			'@type': 'BreadcrumbList',
			itemListElement: crumbs.map((crumb, index) => ({
				'@type': 'ListItem',
				position: index + 1,
				name: crumb.name,
				item: `${SITE_URL}${crumb.href}`
			}))
		});
	});
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
	<link rel="canonical" href={canonicalUrl} />

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Soyuz" />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={pageDescription} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content={OG_IMAGE_ALT} />
	<meta property="og:url" content={canonicalUrl} />

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={pageDescription} />
	<meta name="twitter:image" content={ogImage} />

	<!-- Structured data -->
	{@html websiteScript}
	{@html softwareAppScript}
	{#if breadcrumbScript}{@html breadcrumbScript}{/if}

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
