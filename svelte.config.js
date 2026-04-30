import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectDir = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		alias: {
			'@soyuz-docs': path.resolve(projectDir, '../soyuz')
		},
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true
		}),
		paths: {
			base: process.env.NODE_ENV === 'production' ? '/soyuz-website' : ''
		}
	}
};

export default config;
