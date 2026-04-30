import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '..', '..');
const manifestPath = path.join(repoRoot, 'soyuz', 'SOYUZ_API.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

const seenFunctions = new Set();

for (const category of manifest.categories) {
	if (!category.id || !category.title) {
		throw new Error('API category is missing id or title');
	}

	for (const fn of category.functions) {
		for (const field of ['name', 'signature', 'description', 'example', 'kind']) {
			if (!fn[field]) {
				throw new Error(
					`API function ${category.id}.${fn.name ?? '<missing>'} is missing ${field}`
				);
			}
		}

		if (seenFunctions.has(fn.name)) {
			throw new Error(`Duplicate API function name in manifest: ${fn.name}`);
		}
		seenFunctions.add(fn.name);
	}
}

for (const required of [
	'pyramid',
	'link',
	'extrude_rounded_rect',
	'revolve_rect',
	'set_background_color',
	'env_default',
	'env_daylight',
	'env_clay'
]) {
	if (!seenFunctions.has(required)) {
		throw new Error(`Required API function missing from docs manifest: ${required}`);
	}
}
