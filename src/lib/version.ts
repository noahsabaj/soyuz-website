// Fetches the latest Soyuz release metadata from GitHub.
//
// The download page resolves links from actual release assets instead of
// assuming every platform filename exists for every release.

const GITHUB_API_URL = 'https://api.github.com/repos/noahsabaj/soyuz/releases/latest';
const CACHE_DURATION_MS = 5 * 60 * 1000;

export interface ReleaseAsset {
	name: string;
	browserDownloadUrl: string;
}

export interface VersionInfo {
	version: string;
	versionClean: string;
	releaseUrl: string;
	publishedAt: string;
	assets: ReleaseAsset[];
	isFallback: boolean;
}

interface CachedVersion {
	data: VersionInfo;
	timestamp: number;
}

interface GitHubReleaseAsset {
	name: string;
	browser_download_url: string;
}

interface GitHubRelease {
	tag_name: string;
	html_url: string;
	published_at: string;
	assets?: GitHubReleaseAsset[];
}

let cache: CachedVersion | null = null;

const FALLBACK_VERSION = 'v0.6.0';
const FALLBACK_RELEASE_URL = 'https://github.com/noahsabaj/soyuz/releases';

export function resolveReleaseAsset(info: VersionInfo, filename: string): ReleaseAsset | null {
	return info.assets.find((asset) => asset.name === filename) ?? null;
}

export function releaseFallbackAsset(filename: string): ReleaseAsset {
	return {
		name: filename,
		browserDownloadUrl: FALLBACK_RELEASE_URL
	};
}

export async function fetchLatestVersion(): Promise<VersionInfo> {
	if (cache && Date.now() - cache.timestamp < CACHE_DURATION_MS) {
		return cache.data;
	}

	try {
		const response = await fetch(GITHUB_API_URL, {
			headers: {
				Accept: 'application/vnd.github.v3+json'
			}
		});

		if (!response.ok) {
			throw new Error(`GitHub API returned ${response.status}`);
		}

		const release = (await response.json()) as GitHubRelease;
		const version = release.tag_name;
		const versionClean = version.replace(/^v/, '');

		const data: VersionInfo = {
			version,
			versionClean,
			releaseUrl: release.html_url,
			publishedAt: release.published_at,
			assets:
				release.assets?.map((asset) => ({
					name: asset.name,
					browserDownloadUrl: asset.browser_download_url
				})) ?? [],
			isFallback: false
		};

		cache = { data, timestamp: Date.now() };
		return data;
	} catch (error) {
		console.warn('Failed to fetch latest version from GitHub:', error);

		return {
			version: FALLBACK_VERSION,
			versionClean: FALLBACK_VERSION.replace(/^v/, ''),
			releaseUrl: FALLBACK_RELEASE_URL,
			publishedAt: '',
			assets: [],
			isFallback: true
		};
	}
}
