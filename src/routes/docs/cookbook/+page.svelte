<script lang="ts">
	import MarkdownRenderer from '$lib/components/MarkdownRenderer.svelte';
	// Import the cookbook markdown file directly from the soyuz project (SSOT)
	// This ensures the website always reflects the latest cookbook content
	import cookbookContent from '@soyuz-docs/SOYUZ_COOKBOOK.md?raw';
</script>

<svelte:head>
	<title>Cookbook - Soyuz</title>
</svelte:head>

<div class="cookbook-page">
	<MarkdownRenderer content={cookbookContent} />
</div>

<style>
	.cookbook-page {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
</style>
