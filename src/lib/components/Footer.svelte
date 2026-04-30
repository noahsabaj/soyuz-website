<script lang="ts">
	import { base } from '$app/paths';
</script>

<footer class="mt-16 border-t border-border bg-bg-alt py-12 pb-8">
	<div class="container grid gap-10 md:grid-cols-[1fr_2fr]">
		<div class="flex flex-col gap-2">
			<span class="soyuz-wordmark text-lg">
				<span class="soyuz-mark" aria-hidden="true">
					<img src="{base}/favicon.svg" alt="" />
				</span>
				<span>Soyuz Studio</span>
			</span>
			<p class="text-sm text-text-muted">Procedural 3D workbench for SDF assets.</p>
		</div>

		<div class="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-8">
			<div class="flex flex-col gap-3">
				<h4 class="text-xs font-semibold uppercase tracking-widest text-text-muted mb-1">
					Product
				</h4>
				<a
					href="{base}/download"
					class="text-sm text-text no-underline transition-colors duration-150 hover:text-accent"
					>Download</a
				>
				<a
					href="{base}/playground"
					class="text-sm text-text no-underline transition-colors duration-150 hover:text-accent"
					>Playground</a
				>
				<a
					href="{base}/docs"
					class="text-sm text-text no-underline transition-colors duration-150 hover:text-accent"
					>Documentation</a
				>
			</div>

			<div class="flex flex-col gap-3">
				<h4 class="text-xs font-semibold uppercase tracking-widest text-text-muted mb-1">
					Resources
				</h4>
				<a
					href="{base}/docs/getting-started"
					class="text-sm text-text no-underline transition-colors duration-150 hover:text-accent"
					>Getting Started</a
				>
				<a
					href="{base}/docs/api"
					class="text-sm text-text no-underline transition-colors duration-150 hover:text-accent"
					>API Reference</a
				>
				<a
					href="{base}/docs/cookbook"
					class="text-sm text-text no-underline transition-colors duration-150 hover:text-accent"
					>Cookbook</a
				>
				<a
					href="{base}/examples"
					class="text-sm text-text no-underline transition-colors duration-150 hover:text-accent"
					>Examples</a
				>
			</div>

			<div class="flex flex-col gap-3">
				<h4 class="text-xs font-semibold uppercase tracking-widest text-text-muted mb-1">
					Community
				</h4>
				<a
					href="https://github.com/noahsabaj/soyuz"
					target="_blank"
					rel="noopener noreferrer"
					class="text-sm text-text no-underline transition-colors duration-150 hover:text-accent"
					>GitHub</a
				>
				<a
					href="https://github.com/noahsabaj/soyuz/issues"
					target="_blank"
					rel="noopener noreferrer"
					class="text-sm text-text no-underline transition-colors duration-150 hover:text-accent"
					>Issues</a
				>
				<a
					href="https://github.com/noahsabaj/soyuz/discussions"
					target="_blank"
					rel="noopener noreferrer"
					class="text-sm text-text no-underline transition-colors duration-150 hover:text-accent"
					>Discussions</a
				>
			</div>
		</div>

		<div class="pt-8 border-t border-border-light md:col-span-full">
			<p class="font-mono text-xs text-text-subtle">MIT / Apache-2.0</p>
		</div>
	</div>
</footer>
