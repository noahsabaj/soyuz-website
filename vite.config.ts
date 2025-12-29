import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		alias: {
			// Shim for wasm-bindgen 'env' imports
			env: path.resolve('./src/lib/wasm/env.ts')
		}
	},
	optimizeDeps: {
		exclude: ['soyuz_wasm']
	}
});
