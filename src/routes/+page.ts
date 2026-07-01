import type { PageLoad } from './$types';

// Per-page SEO metadata. `+layout.svelte` reads these from `page.data` to drive
// the document title, meta description, and all Open Graph / Twitter tags, so a
// shared deep link previews this specific page.
export const load: PageLoad = () => ({
	title: 'Soyuz Studio - Procedural 3D Workbench',
	description:
		'Soyuz Studio is a procedural 3D workbench for writing Rhai SDF scripts, previewing geometry, and exporting production-ready meshes.'
});
