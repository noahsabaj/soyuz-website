<script lang="ts">
	import { page } from '$app/stores';

	let { children } = $props();

	const sections = [
		{
			title: 'Getting Started',
			items: [
				{ href: '/docs/getting-started', label: 'Installation' },
				{ href: '/docs/getting-started/quick-start', label: 'Quick Start' },
				{ href: '/docs/getting-started/studio', label: 'Soyuz Studio' },
				{ href: '/docs/getting-started/cli', label: 'CLI Usage' }
			]
		},
		{
			title: 'Concepts',
			items: [
				{ href: '/docs/concepts', label: 'Signed Distance Fields' },
				{ href: '/docs/concepts/primitives', label: 'Primitives' },
				{ href: '/docs/concepts/operations', label: 'Boolean Operations' },
				{ href: '/docs/concepts/transforms', label: 'Transforms' },
				{ href: '/docs/concepts/modifiers', label: 'Modifiers' }
			]
		},
		{
			title: 'API Reference',
			items: [
				{ href: '/docs/api', label: 'Overview' },
				{ href: '/docs/api/primitives', label: 'Primitives' },
				{ href: '/docs/api/operations', label: 'Operations' },
				{ href: '/docs/api/transforms', label: 'Transforms' },
				{ href: '/docs/api/environment', label: 'Environment' }
			]
		},
		{
			title: 'Cookbook',
			items: [
				{ href: '/docs/cookbook', label: 'Recipes Overview' },
				{ href: '/docs/cookbook/patterns', label: 'Common Patterns' },
				{ href: '/docs/cookbook/tips', label: 'Tips & Tricks' }
			]
		}
	];

	function isActive(href: string, pathname: string): boolean {
		return pathname === href;
	}
</script>

<div class="docs-layout container">
	<aside class="docs-sidebar">
		<nav class="docs-nav">
			{#each sections as section}
				<div class="nav-section">
					<h4 class="nav-section-title">{section.title}</h4>
					<ul class="nav-list">
						{#each section.items as item}
							<li>
								<a
									href={item.href}
									class="nav-item"
									class:active={isActive(item.href, $page.url.pathname)}
								>
									{item.label}
								</a>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</nav>
	</aside>

	<article class="docs-content">
		{@render children()}
	</article>
</div>

<style>
	.docs-layout {
		display: grid;
		grid-template-columns: 240px 1fr;
		gap: var(--space-12);
		padding-top: var(--space-10);
		padding-bottom: var(--space-16);
		min-height: calc(100vh - var(--nav-height) - 200px);
	}

	.docs-sidebar {
		position: sticky;
		top: calc(var(--nav-height) + var(--space-6));
		height: fit-content;
		max-height: calc(100vh - var(--nav-height) - var(--space-12));
		overflow-y: auto;
	}

	.docs-nav {
		display: flex;
		flex-direction: column;
		gap: var(--space-6);
	}

	.nav-section-title {
		font-size: var(--text-xs);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--color-text-muted);
		margin-bottom: var(--space-2);
	}

	.nav-list {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
	}

	.nav-item {
		display: block;
		font-size: var(--text-sm);
		color: var(--color-text-muted);
		text-decoration: none;
		padding: var(--space-1) var(--space-3);
		margin-left: calc(-1 * var(--space-3));
		border-left: 2px solid transparent;
		transition: all 0.15s ease;
	}

	.nav-item:hover {
		color: var(--color-text);
	}

	.nav-item.active {
		color: var(--color-text);
		border-left-color: var(--color-accent);
		background: var(--color-bg-alt);
	}

	.docs-content {
		max-width: var(--max-width-prose);
	}

	@media (max-width: 900px) {
		.docs-layout {
			grid-template-columns: 1fr;
		}

		.docs-sidebar {
			position: static;
			border-bottom: var(--border-width) solid var(--color-border);
			padding-bottom: var(--space-6);
			margin-bottom: var(--space-6);
		}

		.docs-nav {
			flex-direction: row;
			flex-wrap: wrap;
			gap: var(--space-8);
		}
	}
</style>
