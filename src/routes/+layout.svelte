<script lang="ts">
	import '../styles/global.css';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>Soyuz - Procedural 3D Asset Generation</title>
	<meta
		name="description"
		content="Create 3D models with code. Soyuz is a procedural asset generation framework using Signed Distance Fields."
	/>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="app">
	<Nav />
	<main>
		{@render children()}
	</main>
	<Footer />
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
	}
</style>
