<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/state';

	const isNotFound = $derived(page.status === 404);
	const heading = $derived(isNotFound ? 'Page not found' : 'Something went wrong');
	const detail = $derived(
		page.error?.message ??
			(isNotFound
				? 'This page could not be found. It may have moved, or the link may be incorrect.'
				: 'An unexpected error occurred while rendering this page.')
	);
</script>

<svelte:head>
	<title>{page.status} · {heading} - Soyuz</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<section class="py-24">
	<div class="container">
		<div
			class="mx-auto max-w-[640px] rounded-lg border border-border bg-surface p-8 text-center shadow-md md:p-12"
		>
			<p class="soyuz-kicker mb-4">Error</p>
			<div class="mb-6 font-mono text-6xl font-bold text-sdf md:text-7xl">{page.status}</div>
			<h1 class="mb-4 text-2xl md:text-3xl">{heading}</h1>
			<p class="mx-auto mb-8 max-w-[440px] text-text-muted">{detail}</p>
			<div class="flex flex-wrap justify-center gap-3">
				<a href="{base}/" class="btn btn-primary">Back to home</a>
				<a href="{base}/docs" class="btn">Read the docs</a>
			</div>
		</div>
	</div>
</section>
