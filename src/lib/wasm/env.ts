// Shim for WASM 'env' imports
// Provides required environment functions for the WASM module

// Performance.now() returns milliseconds since page load
export function now(): number {
	return performance.now();
}

// Some WASM modules may need other env functions
export function abort(): never {
	throw new Error('WASM abort called');
}
