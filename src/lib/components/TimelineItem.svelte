<!--
  TimelineItem.svelte

  Reusable timeline item component for displaying chronological events.
  Uses neobrutalist styling with vertical line connector and dot marker.
-->
<script lang="ts">
	interface Props {
		date: string;
		title: string;
		description?: string;
		isLast?: boolean;
	}

	let { date, title, description = '', isLast = false }: Props = $props();
</script>

<div class="relative pl-8 pb-8" class:pb-0={isLast}>
	<!-- Vertical line -->
	{#if !isLast}
		<div class="absolute left-[11px] top-3 w-0.5 h-full bg-border"></div>
	{/if}

	<!-- Dot marker -->
	<div class="absolute left-0 top-1 w-6 h-6 bg-accent border-2 border-border flex items-center justify-center">
		<div class="w-2 h-2 bg-surface"></div>
	</div>

	<!-- Content -->
	<div class="flex flex-col gap-1">
		<span class="font-mono text-xs text-accent uppercase tracking-wide">{date}</span>
		<h4 class="text-base font-semibold m-0">{title}</h4>
		{#if description}
			<p class="text-sm text-text-muted m-0">{description}</p>
		{/if}
	</div>
</div>
