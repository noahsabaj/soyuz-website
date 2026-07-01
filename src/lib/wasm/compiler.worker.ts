// Web Worker that runs the ~2.4MB Soyuz WASM compiler OFF the main thread.
//
// The playground compiles user Rhai -> WGSL on every (debounced) keystroke.
// A pathological script can make compile_to_wgsl run for a long time; doing
// that on the main thread freezes the tab. Running it here keeps the UI
// responsive no matter what the user types.
//
// This is a module worker (`{ type: 'module' }`), so Vite resolves the same
// module graph it does for the main bundle: the `env` import inside
// soyuz_wasm.js is satisfied by the `env` alias in vite.config.ts, and the
// `new URL('soyuz_wasm_bg.wasm', import.meta.url)` inside the glue is emitted
// as an asset and fetched relative to this worker's own URL (so it also works
// under the static adapter's `/soyuz-website` base path).
import { initWasm, compile_to_wgsl } from './index';

/** Request posted from the page: compile `code`, tagged with a monotonic `id`. */
export interface CompileRequest {
	id: number;
	code: string;
}

/** Response posted back to the page. `error` is '' on success. */
export interface CompileResponse {
	id: number;
	wgsl: string;
	error: string;
}

// Initialize the WASM module exactly once, lazily, on the first request.
let ready: Promise<void> | null = null;
function ensureReady(): Promise<void> {
	return (ready ??= initWasm());
}

// `self` is typed as the DOM `Window` under this project's lib config; cast to
// a minimal shape so postMessage takes our typed payload (Worker.postMessage,
// not Window.postMessage which would require a targetOrigin argument).
function post(message: CompileResponse): void {
	(self as unknown as { postMessage: (m: CompileResponse) => void }).postMessage(message);
}

self.addEventListener('message', async (event: MessageEvent<CompileRequest>) => {
	const { id, code } = event.data;
	try {
		await ensureReady();
		const wgsl = compile_to_wgsl(code);
		post({ id, wgsl, error: '' });
	} catch (e) {
		post({ id, wgsl: '', error: e instanceof Error ? e.message : String(e) });
	}
});
