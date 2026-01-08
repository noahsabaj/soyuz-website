/* tslint:disable */
/* eslint-disable */
/**
 * Initialize panic hook for better error messages in browser console
 */
export function init(): void;
/**
 * Compile a Rhai script and return any errors
 */
export function validate_script(code: string): any;
/**
 * Compile a Rhai script and return the generated WGSL shader code
 */
export function compile_to_wgsl(code: string): string;
/**
 * Parse and validate a script, returning detailed error information
 */
export function parse_script(code: string): ScriptResult;
export class ScriptResult {
	private constructor();
	free(): void;
	[Symbol.dispose](): void;
	readonly success: boolean;
	readonly error_message: string | undefined;
	readonly error_line: number | undefined;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
	readonly memory: WebAssembly.Memory;
	readonly validate_script: (a: number, b: number) => [number, number, number];
	readonly compile_to_wgsl: (a: number, b: number) => [number, number, number, number];
	readonly __wbg_scriptresult_free: (a: number, b: number) => void;
	readonly scriptresult_success: (a: number) => number;
	readonly scriptresult_error_message: (a: number) => [number, number];
	readonly scriptresult_error_line: (a: number) => number;
	readonly parse_script: (a: number, b: number) => number;
	readonly init: () => void;
	readonly __wbindgen_free: (a: number, b: number, c: number) => void;
	readonly __wbindgen_exn_store: (a: number) => void;
	readonly __externref_table_alloc: () => number;
	readonly __wbindgen_externrefs: WebAssembly.Table;
	readonly __wbindgen_malloc: (a: number, b: number) => number;
	readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
	readonly __externref_table_dealloc: (a: number) => void;
	readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
 *
 * @returns {InitOutput}
 */
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init(
	module_or_path?:
		| { module_or_path: InitInput | Promise<InitInput> }
		| InitInput
		| Promise<InitInput>
): Promise<InitOutput>;
