import manifestData from '@soyuz-docs/SOYUZ_API.json';

export interface ApiFunction {
	name: string;
	signature: string;
	description: string;
	example: string;
	kind: string;
	aliasOf?: string;
}

export interface ApiCategory {
	id: string;
	title: string;
	functions: ApiFunction[];
}

interface ApiManifest {
	categories: ApiCategory[];
}

export const apiManifest = manifestData as ApiManifest;

export const allFunctions = apiManifest.categories.flatMap((category) => category.functions);

export function getCategory(id: string): ApiCategory {
	const category = apiManifest.categories.find((item) => item.id === id);
	if (!category) {
		throw new Error(`Unknown API category: ${id}`);
	}
	return category;
}
