import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	resolve: {
		alias: {
			// Shim for wasm-bindgen 'env' imports
			env: path.resolve('./src/lib/wasm/env.ts'),
			// Alias to access soyuz docs from parent directory
			'@soyuz-docs': path.resolve('../soyuz')
		}
	},
	server: {
		fs: {
			// Allow serving files from the parent soyuz directory
			allow: ['..']
		}
	}
});
