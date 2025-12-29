<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
</script>

<svelte:head><title>Environment API - Soyuz</title></svelte:head>
<div class="doc-page">
	<h1>Environment API</h1>
	<p class="lead">Configure lighting and rendering.</p>

	<section>
		<h2>Presets</h2>
		<CodeBlock
			code={`env_studio()    // Neutral (default)
env_daylight()  // Bright outdoor
env_sunset()    // Warm orange
env_night()     // Dark blue
env_clay()      // Soft AO look`}
		/>
	</section>

	<section>
		<h2>Custom Settings</h2>
		<CodeBlock
			code={`set_sun_direction(x, y, z)
set_sun_color(r, g, b)
set_material_color_hex("#ff5500")
set_ao_enabled(true)
set_shadows_enabled(true)`}
		/>
	</section>
</div>

<style>
	.doc-page {
		display: flex;
		flex-direction: column;
		gap: var(--space-8);
	}
	h1 {
		margin-bottom: var(--space-2);
	}
	.lead {
		font-size: var(--text-lg);
		color: var(--color-text-muted);
	}
	section {
		display: flex;
		flex-direction: column;
		gap: var(--space-4);
	}
	section h2 {
		font-size: var(--text-xl);
		padding-top: var(--space-4);
		border-top: 1px solid var(--color-border-light);
	}
</style>
