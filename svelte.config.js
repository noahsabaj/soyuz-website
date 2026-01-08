import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true
		}),
		paths: {
			base: process.env.NODE_ENV === 'production' ? '/soyuz-website' : ''
		},
		prerender: {
			// Handle missing anchor IDs by logging a warning instead of failing
			// This occurs when markdown content has links to headings that get slugified differently
			handleMissingId: 'warn',
			// Handle HTTP errors during prerender (e.g., favicon without base path)
			handleHttpError: ({ path, message }) => {
				// Ignore favicon errors - browsers request it at root regardless of base path
				if (path === '/favicon.ico') {
					return;
				}
				throw new Error(message);
			}
		}
	}
};

export default config;
