import type { LayoutLoad } from './$types';
import { docsSections, docsSite, getDocPage, type DocsPage } from '$lib/docs.generated';

// Breadcrumb entries are site-relative hrefs (no origin/base); `+layout.svelte`
// turns them into absolute production URLs for the BreadcrumbList JSON-LD.
type Crumb = { name: string; href: string };

const TITLE_SUFFIX = ' - Soyuz';

// The landing page of a section is its shortest href (e.g. "/docs/api" for the
// API Reference section), used as the breadcrumb's section link.
function sectionLandingHref(section: string): string | undefined {
	const match = docsSections.find((s) => s.title === section);
	return match?.items.reduce<string | undefined>(
		(shortest, item) =>
			shortest === undefined || item.href.length < shortest.length ? item.href : shortest,
		undefined
	);
}

function buildBreadcrumb(doc: DocsPage): Crumb[] {
	const crumbs: Crumb[] = [
		{ name: 'Home', href: '/' },
		{ name: 'Docs', href: '/docs' }
	];
	const landing = sectionLandingHref(doc.section);
	if (landing && landing !== '/docs' && landing !== doc.href) {
		crumbs.push({ name: doc.section, href: landing });
	}
	if (doc.href !== '/docs') {
		crumbs.push({ name: doc.title, href: doc.href });
	}
	return crumbs;
}

// Every docs route is static, so `route.id` (e.g. "/docs/api/primitives") maps
// directly to a docs page, giving one source of truth for its title/description.
export const load: LayoutLoad = ({ route }) => {
	const doc = route.id ? getDocPage(route.id) : undefined;
	if (!doc) {
		return { title: `${docsSite.title}${TITLE_SUFFIX}`, description: docsSite.description };
	}
	return {
		title: `${doc.title}${TITLE_SUFFIX}`,
		description: doc.description,
		breadcrumb: buildBreadcrumb(doc)
	};
};
