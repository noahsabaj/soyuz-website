/* tslint:disable */

export const memory: WebAssembly.Memory;
export const validate_script: (a: number, b: number) => [number, number, number];
export const compile_to_wgsl: (a: number, b: number) => [number, number, number, number];
export const __wbg_scriptresult_free: (a: number, b: number) => void;
export const scriptresult_success: (a: number) => number;
export const scriptresult_error_message: (a: number) => [number, number];
export const scriptresult_error_line: (a: number) => number;
export const parse_script: (a: number, b: number) => number;
export const init: () => void;
export const __wbindgen_free: (a: number, b: number, c: number) => void;
export const __wbindgen_exn_store: (a: number) => void;
export const __externref_table_alloc: () => number;
export const __wbindgen_externrefs: WebAssembly.Table;
export const __wbindgen_malloc: (a: number, b: number) => number;
export const __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
export const __externref_table_dealloc: (a: number) => void;
export const __wbindgen_start: () => void;
