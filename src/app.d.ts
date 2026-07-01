// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		interface PageData {
			// Per-page SEO metadata surfaced by each route's `load` and consumed by
			// `+layout.svelte` to drive <title>, meta description, and social tags.
			title?: string;
			description?: string;
			// Docs breadcrumb trail (site-relative hrefs) for BreadcrumbList JSON-LD.
			breadcrumb?: Array<{ name: string; href: string }>;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
