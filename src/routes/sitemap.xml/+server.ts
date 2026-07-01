import { base } from '$app/paths';

export const prerender = true;

// Absolute production origin (GitHub Pages); `base` adds the project subpath.
const SITE_ORIGIN = 'https://noahsabaj.github.io';

// Discover every prerendered page route at build time so the sitemap stays in
// sync automatically as pages are added or removed. No route has dynamic
// parameters, so each file maps directly to one URL.
const pageModules = import.meta.glob('/src/routes/**/+page.svelte');

function routePath(file: string): string {
	const path = file.replace('/src/routes', '').replace(/\/\+page\.svelte$/, '');
	return path === '' ? '/' : path;
}

export function GET() {
	const paths = Array.from(new Set(Object.keys(pageModules).map(routePath))).sort();

	// Prerendered at build time, so a single build-day stamp (YYYY-MM-DD) applies
	// to every URL. changefreq/priority are omitted because Google ignores them.
	const lastmod = new Date().toISOString().split('T')[0];

	const urls = paths
		.map((path) => {
			const loc = `${SITE_ORIGIN}${base}${path === '/' ? '/' : path}`;
			return `\t<url>\n\t\t<loc>${loc}</loc>\n\t\t<lastmod>${lastmod}</lastmod>\n\t</url>`;
		})
		.join('\n');

	const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
}
