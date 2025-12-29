<script lang="ts">
	const sections = [
		{
			title: 'Getting Started',
			description: 'Install Soyuz and create your first 3D model in minutes.',
			href: '/docs/getting-started',
			items: ['Installation', 'Quick Start', 'Soyuz Studio', 'CLI Usage']
		},
		{
			title: 'Concepts',
			description: 'Understand the fundamentals of Signed Distance Fields.',
			href: '/docs/concepts',
			items: ['What are SDFs', 'Primitives', 'Boolean Operations', 'Transforms']
		},
		{
			title: 'API Reference',
			description: 'Complete reference for all Soyuz functions.',
			href: '/docs/api',
			items: ['Primitives', 'Operations', 'Transforms', 'Environment']
		},
		{
			title: 'Cookbook',
			description: 'Recipes and patterns for common modeling tasks.',
			href: '/docs/cookbook',
			items: ['Common Patterns', 'Tips & Tricks', 'Example Models']
		}
	];
</script>

<svelte:head>
	<title>Documentation - Soyuz</title>
</svelte:head>

<div class="docs-home">
	<header class="docs-header">
		<h1>Documentation</h1>
		<p class="lead">Everything you need to build 3D models with Soyuz.</p>
	</header>

	<div class="docs-grid">
		{#each sections as section}
			<a href={section.href} class="section-card card card-hover">
				<h2>{section.title}</h2>
				<p>{section.description}</p>
				<ul class="section-items">
					{#each section.items as item}
						<li>{item}</li>
					{/each}
				</ul>
			</a>
		{/each}
	</div>
</div>

<style>
	.docs-header {
		margin-bottom: var(--space-10);
	}

	.docs-header h1 {
		margin-bottom: var(--space-3);
	}

	.lead {
		font-size: var(--text-lg);
		color: var(--color-text-muted);
	}

	.docs-grid {
		display: grid;
		gap: var(--space-6);
	}

	.section-card {
		text-decoration: none;
		color: inherit;
	}

	.section-card h2 {
		font-size: var(--text-xl);
		margin-bottom: var(--space-2);
	}

	.section-card p {
		color: var(--color-text-muted);
		font-size: var(--text-sm);
		margin-bottom: var(--space-4);
	}

	.section-items {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
		list-style: none;
	}

	.section-items li {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--color-text-subtle);
		background: var(--color-bg-alt);
		padding: var(--space-1) var(--space-2);
	}

	@media (min-width: 640px) {
		.docs-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
