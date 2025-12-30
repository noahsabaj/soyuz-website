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

<div>
	<header class="mb-10">
		<h1 class="mb-3">Documentation</h1>
		<p class="text-lg text-text-muted">Everything you need to build 3D models with Soyuz.</p>
	</header>

	<div class="grid gap-6 sm:grid-cols-2">
		{#each sections as section}
			<a href={section.href} class="card card-hover no-underline text-inherit">
				<h2 class="text-xl mb-2">{section.title}</h2>
				<p class="text-text-muted text-sm mb-4">{section.description}</p>
				<ul class="flex flex-wrap gap-2 list-none">
					{#each section.items as item}
						<li class="font-mono text-xs text-text-subtle bg-bg-alt py-1 px-2">{item}</li>
					{/each}
				</ul>
			</a>
		{/each}
	</div>
</div>
