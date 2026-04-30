<script lang="ts">
	import type { ApiCategory } from '$lib/apiManifest';
	import CodeBlock from '$lib/components/CodeBlock.svelte';

	interface Props {
		categories: ApiCategory[];
		intro?: string;
	}

	let { categories, intro = '' }: Props = $props();
</script>

<div class="flex flex-col gap-8">
	{#if intro}
		<p class="text-lg text-text-muted">{intro}</p>
	{/if}

	{#each categories as category (category.id)}
		<section id={category.id} class="flex flex-col gap-4 scroll-mt-4">
			<h2 class="text-2xl mb-0 pb-2 border-b-2 border-border">{category.title}</h2>

			<div class="grid gap-4">
				{#each category.functions as fn (fn.name)}
					<article id={fn.name} class="card scroll-mt-4">
						<div class="flex flex-wrap items-baseline gap-2 mb-3">
							<h3 class="font-mono text-lg text-accent m-0">{fn.name}</h3>
							<span class="font-mono text-xs text-text-subtle bg-bg-alt py-1 px-2">{fn.kind}</span>
						</div>

						<p class="text-text-muted mb-4">{fn.description}</p>

						<div class="flex flex-col gap-3">
							<CodeBlock code={fn.signature} compact />
							<CodeBlock code={fn.example} compact />
						</div>

						{#if fn.aliasOf}
							<p class="text-sm text-text-subtle mt-4 mb-0">Alias for {fn.aliasOf}.</p>
						{/if}
					</article>
				{/each}
			</div>
		</section>
	{/each}
</div>
