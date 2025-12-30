<script lang="ts">
	interface Props {
		title: string;
		description: string;
		icon: string;
	}

	let { title, description, icon }: Props = $props();
</script>

<div class="card flex flex-col gap-3">
	<div
		class="w-10 h-10 flex items-center justify-center bg-accent-light border-2 border-border text-accent"
		data-icon={icon}
	>
		{#if icon === 'sdf'}
			<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<circle cx="12" cy="12" r="8" />
				<path d="M12 4v16M4 12h16" stroke-dasharray="2 2" />
			</svg>
		{:else if icon === 'preview'}
			<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<rect x="3" y="3" width="18" height="18" rx="0" />
				<path d="M9 12l3 3 3-3M12 9v6" />
			</svg>
		{:else if icon === 'code'}
			<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M8 6l-4 6 4 6M16 6l4 6-4 6" />
			</svg>
		{:else if icon === 'export'}
			<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M12 3v12M12 3l4 4M12 3l-4 4" />
				<path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
			</svg>
		{/if}
	</div>
	<h3 class="text-lg">{title}</h3>
	<p class="text-text-muted text-sm leading-relaxed">{description}</p>
</div>
