// WASM module wrapper for Soyuz scripting
import init, {
	validate_script,
	compile_to_wgsl,
	parse_script,
	ScriptResult
} from './soyuz_wasm.js';

let initialized = false;

export async function initWasm(): Promise<void> {
	if (initialized) return;
	await init();
	initialized = true;
}

export { validate_script, compile_to_wgsl, parse_script };
export type { ScriptResult };
