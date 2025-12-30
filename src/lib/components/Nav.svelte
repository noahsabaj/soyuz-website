<script lang="ts">
	import { page } from '$app/stores';

	const navLinks = [
		{ href: '/docs', label: 'Docs' },
		{ href: '/examples', label: 'Examples' },
		{ href: '/playground', label: 'Playground' },
		{ href: '/download', label: 'Download' }
	];

	let mobileMenuOpen = $state(false);

	function isActive(href: string, pathname: string): boolean {
		if (href === '/') return pathname === '/';
		return pathname.startsWith(href);
	}

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}
</script>

<nav class="sticky top-0 z-50 bg-bg border-b-2 border-border h-16">
	<div class="container flex items-center justify-between h-full gap-8">
		<a href="/" class="flex items-center gap-1 font-mono text-lg font-semibold text-text no-underline">
			<span class="text-accent">//</span>
			<span class="tracking-tight">soyuz</span>
		</a>

		<div class="hidden sm:flex items-center gap-1">
			{#each navLinks as link}
				<a
					href={link.href}
					class="text-sm font-medium text-text-muted no-underline py-2 px-3 transition-colors duration-150 hover:text-text hover:bg-bg-alt {isActive(link.href, $page.url.pathname) ? 'text-text bg-bg-alt' : ''}"
				>
					{link.label}
				</a>
			{/each}
		</div>

		<div class="flex items-center gap-4">
			<a
				href="https://github.com/noahsabaj/soyuz"
				class="font-mono text-xs uppercase tracking-wider text-text-muted no-underline py-2 px-3 transition-colors duration-150 hover:text-text hover:bg-bg-alt"
				target="_blank"
				rel="noopener noreferrer"
			>
				GitHub
			</a>
			<button
				class="sm:hidden bg-transparent border-none p-2 cursor-pointer ml-2"
				onclick={toggleMobileMenu}
				aria-label="Toggle navigation menu"
				aria-expanded={mobileMenuOpen}
			>
				<span class="hamburger flex flex-col justify-between w-5 h-3.5" class:open={mobileMenuOpen}>
					<span class="block h-0.5 w-full bg-text transition-all duration-200"></span>
					<span class="block h-0.5 w-full bg-text transition-all duration-200"></span>
					<span class="block h-0.5 w-full bg-text transition-all duration-200"></span>
				</span>
			</button>
		</div>
	</div>

	{#if mobileMenuOpen}
		<div class="sm:hidden flex flex-col bg-surface border-t border-border-light p-4 gap-1">
			{#each navLinks as link}
				<a
					href={link.href}
					class="block py-3 px-4 text-base font-medium text-text-muted no-underline transition-colors duration-150 hover:text-text hover:bg-bg-alt {isActive(link.href, $page.url.pathname) ? 'text-text bg-bg-alt' : ''}"
					onclick={closeMobileMenu}
				>
					{link.label}
				</a>
			{/each}
		</div>
	{/if}
</nav>

<style>
	/* Hamburger animation - custom CSS for the transform */
	.hamburger.open span:nth-child(1) {
		transform: translateY(6px) rotate(45deg);
	}

	.hamburger.open span:nth-child(2) {
		opacity: 0;
	}

	.hamburger.open span:nth-child(3) {
		transform: translateY(-6px) rotate(-45deg);
	}
</style>
