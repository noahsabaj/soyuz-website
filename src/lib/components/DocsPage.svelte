<script lang="ts">
	import ApiFunctionList from '$lib/components/ApiFunctionList.svelte';
	import MarkdownRenderer from '$lib/components/MarkdownRenderer.svelte';
	import { getCategory } from '$lib/apiManifest';
	import { getDocPage } from '$lib/docs.generated';

	interface Props {
		route: string;
	}

	let { route }: Props = $props();
	let page = $derived(getDocPage(route));
	let apiCategories = $derived(
		page?.kind === 'api' ? (page.apiCategories ?? []).map((id) => getCategory(id)) : []
	);
</script>

<svelte:head>
	<title>{page?.title ?? 'Documentation'} - Soyuz</title>
</svelte:head>

{#if page}
	{#if page.kind === 'markdown' && page.content}
		<MarkdownRenderer content={page.content} />
	{:else if page.kind === 'api'}
		<div class="flex flex-col gap-8">
			<header>
				<h1 class="mb-2">{page.title}</h1>
				<p class="text-lg text-text-muted">{page.description}</p>
			</header>

			<ApiFunctionList categories={apiCategories} />
		</div>
	{/if}
{:else}
	<div>
		<h1>Documentation</h1>
		<p class="text-text-muted">This documentation page was not found.</p>
	</div>
{/if}
