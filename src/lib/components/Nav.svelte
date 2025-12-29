<script lang="ts">
	import { page } from '$app/stores';

	const navLinks = [
		{ href: '/docs', label: 'Docs' },
		{ href: '/examples', label: 'Examples' },
		{ href: '/playground', label: 'Playground' },
		{ href: '/download', label: 'Download' }
	];

	function isActive(href: string, pathname: string): boolean {
		if (href === '/') return pathname === '/';
		return pathname.startsWith(href);
	}
</script>

<nav class="nav">
	<div class="nav-inner container">
		<a href="/" class="logo">
			<span class="logo-mark">//</span>
			<span class="logo-text">soyuz</span>
		</a>

		<div class="nav-links">
			{#each navLinks as link}
				<a href={link.href} class="nav-link" class:active={isActive(link.href, $page.url.pathname)}>
					{link.label}
				</a>
			{/each}
		</div>

		<div class="nav-actions">
			<a
				href="https://github.com/noahsabaj/soyuz"
				class="nav-link github-link"
				target="_blank"
				rel="noopener noreferrer"
			>
				GitHub
			</a>
		</div>
	</div>
</nav>

<style>
	.nav {
		position: sticky;
		top: 0;
		z-index: 100;
		background: var(--color-bg);
		border-bottom: var(--border-width) solid var(--color-border);
		height: var(--nav-height);
	}

	.nav-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 100%;
		gap: var(--space-8);
	}

	.logo {
		display: flex;
		align-items: center;
		gap: var(--space-1);
		font-family: var(--font-mono);
		font-size: var(--text-lg);
		font-weight: 600;
		color: var(--color-text);
		text-decoration: none;
	}

	.logo-mark {
		color: var(--color-accent);
	}

	.logo-text {
		letter-spacing: -0.03em;
	}

	.nav-links {
		display: flex;
		align-items: center;
		gap: var(--space-1);
	}

	.nav-link {
		font-size: var(--text-sm);
		font-weight: 500;
		color: var(--color-text-muted);
		text-decoration: none;
		padding: var(--space-2) var(--space-3);
		transition:
			color 0.15s ease,
			background 0.15s ease;
	}

	.nav-link:hover {
		color: var(--color-text);
		background: var(--color-bg-alt);
	}

	.nav-link.active {
		color: var(--color-text);
		background: var(--color-bg-alt);
	}

	.nav-actions {
		display: flex;
		align-items: center;
		gap: var(--space-4);
	}

	.github-link {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	@media (max-width: 640px) {
		.nav-links {
			display: none;
		}
	}
</style>
