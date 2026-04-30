<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { docsPages, docsSections } from '$lib/docs.generated';

	let { children } = $props();

	// Compute previous and next pages based on current URL
	function getNavigation(pathname: string) {
		// Strip base path from pathname for comparison
		const path = pathname.startsWith(base) ? pathname.slice(base.length) || '/' : pathname;
		const currentIndex = docsPages.findIndex((p) => p.href === path);
		if (currentIndex === -1) return { prev: null, next: null };

		return {
			prev: currentIndex > 0 ? docsPages[currentIndex - 1] : null,
			next: currentIndex < docsPages.length - 1 ? docsPages[currentIndex + 1] : null
		};
	}

	function isActive(href: string, pathname: string): boolean {
		// Strip base path from pathname for comparison
		const path = pathname.startsWith(base) ? pathname.slice(base.length) || '/' : pathname;
		return path === href;
	}

	// Reactive navigation based on current page
	let navigation = $derived(getNavigation($page.url.pathname));
</script>

<div
	class="container grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12 pt-10 pb-16 min-h-[calc(100vh-64px-200px)]"
>
	<aside
		class="lg:sticky lg:top-[88px] lg:h-fit lg:max-h-[calc(100vh-88px-48px)] lg:overflow-y-auto max-lg:border-b-2 max-lg:border-border max-lg:pb-6 max-lg:mb-6"
	>
		<nav class="flex flex-col gap-6 max-lg:flex-row max-lg:flex-wrap max-lg:gap-8">
			{#each docsSections as section (section.title)}
				<div>
					<h4 class="text-xs font-semibold uppercase tracking-widest text-text-muted mb-2">
						{section.title}
					</h4>
					<ul class="list-none flex flex-col gap-1">
						{#each section.items as item (item.href)}
							<li>
								<a
									href="{base}{item.href}"
									class="block text-sm text-text-muted no-underline py-1 px-3 -ml-3 border-l-2 border-transparent transition-all duration-150 hover:text-text {isActive(
										item.href,
										$page.url.pathname
									)
										? 'text-text border-l-accent bg-bg-alt'
										: ''}"
								>
									{item.title}
								</a>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</nav>
	</aside>

	<article class="max-w-[720px]">
		{@render children()}

		<!-- Automatic Prev/Next Navigation -->
		{#if navigation.prev || navigation.next}
			<nav class="flex justify-between pt-8 border-t-2 border-border mt-8 gap-4">
				{#if navigation.prev}
					<a
						href="{base}{navigation.prev.href}"
						class="flex flex-col no-underline py-3 px-4 bg-bg-alt border-2 border-border transition-all duration-150 hover:bg-surface hover:shadow-sm"
					>
						<span class="text-xs text-text-subtle uppercase tracking-wide">Previous</span>
						<span class="font-semibold text-text">{navigation.prev.title}</span>
					</a>
				{:else}
					<div></div>
				{/if}
				{#if navigation.next}
					<a
						href="{base}{navigation.next.href}"
						class="flex flex-col no-underline py-3 px-4 bg-bg-alt border-2 border-border transition-all duration-150 hover:bg-surface hover:shadow-sm ml-auto text-right"
					>
						<span class="text-xs text-text-subtle uppercase tracking-wide">Next</span>
						<span class="font-semibold text-text">{navigation.next.title}</span>
					</a>
				{/if}
			</nav>
		{/if}
	</article>
</div>
