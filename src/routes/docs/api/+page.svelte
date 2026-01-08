<script lang="ts">
	import { base } from '$app/paths';
</script>

<svelte:head>
	<title>API Reference - Soyuz</title>
</svelte:head>

<div class="flex flex-col gap-8">
	<header>
		<h1 class="mb-2">API Reference</h1>
		<p class="text-lg text-text-muted">Complete reference for all Soyuz functions.</p>
	</header>

	<section class="flex flex-col gap-4">
		<p>
			The Soyuz scripting API is built on Rhai, a JavaScript-like language. Functions are organized
			into categories:
		</p>
		<ul class="pl-6 flex flex-col gap-2">
			<li><a href="{base}/docs/api/primitives">Primitives</a> - Basic shapes</li>
			<li><a href="{base}/docs/api/operations">Operations</a> - Boolean and smooth operations</li>
			<li><a href="{base}/docs/api/transforms">Transforms</a> - Position, rotation, scale</li>
			<li><a href="{base}/docs/api/environment">Environment</a> - Lighting and rendering settings</li>
		</ul>
	</section>
</div>
