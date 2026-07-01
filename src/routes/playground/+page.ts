import type { PageLoad } from './$types';

export const load: PageLoad = () => ({
	title: 'Playground - Soyuz',
	description:
		'Try Soyuz in your browser: write Rhai SDF scripts, compile with WebAssembly, and render geometry live with WebGPU.'
});
