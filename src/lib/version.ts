// Fetches the latest Soyuz release version from GitHub API
//
// Returns the version tag (e.g., "v0.5.0") and clean version (e.g., "0.5.0").
// Caches the result for 5 minutes to avoid excessive API calls.

const GITHUB_API_URL = 'https://api.github.com/repos/noahsabaj/soyuz/releases/latest';
const CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutes

interface VersionInfo {
	version: string; // e.g., "v0.5.0"
	versionClean: string; // e.g., "0.5.0"
	releaseUrl: string;
	publishedAt: string;
}

interface CachedVersion {
	data: VersionInfo;
	timestamp: number;
}

let cache: CachedVersion | null = null;

// Default fallback version (used if API fails)
const FALLBACK_VERSION = 'v0.5.0';

export async function fetchLatestVersion(): Promise<VersionInfo> {
	// Check cache first
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

		const release = await response.json();
		const version = release.tag_name as string;
		const versionClean = version.replace(/^v/, '');

		const data: VersionInfo = {
			version,
			versionClean,
			releaseUrl: release.html_url,
			publishedAt: release.published_at
		};

		// Update cache
		cache = { data, timestamp: Date.now() };

		return data;
	} catch (error) {
		console.warn('Failed to fetch latest version from GitHub:', error);

		// Return fallback
		return {
			version: FALLBACK_VERSION,
			versionClean: FALLBACK_VERSION.replace(/^v/, ''),
			releaseUrl: 'https://github.com/noahsabaj/soyuz/releases',
			publishedAt: ''
		};
	}
}
