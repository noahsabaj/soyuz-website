<script lang="ts">
	interface Props {
		title: string;
		description: string;
		icon: string;
	}

	let { title, description, icon }: Props = $props();
</script>

<div class="feature-card card">
	<div class="icon" data-icon={icon}>
		{#if icon === 'sdf'}
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<circle cx="12" cy="12" r="8" />
				<path d="M12 4v16M4 12h16" stroke-dasharray="2 2" />
			</svg>
		{:else if icon === 'preview'}
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<rect x="3" y="3" width="18" height="18" rx="0" />
				<path d="M9 12l3 3 3-3M12 9v6" />
			</svg>
		{:else if icon === 'code'}
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M8 6l-4 6 4 6M16 6l4 6-4 6" />
			</svg>
		{:else if icon === 'export'}
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<path d="M12 3v12M12 3l4 4M12 3l-4 4" />
				<path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
			</svg>
		{/if}
	</div>
	<h3>{title}</h3>
	<p>{description}</p>
</div>

<style>
	.feature-card {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	.icon {
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--color-accent-light);
		border: var(--border-width) solid var(--color-border);
		color: var(--color-accent);
	}

	.icon svg {
		width: 20px;
		height: 20px;
	}

	h3 {
		font-size: var(--text-lg);
	}

	p {
		color: var(--color-text-muted);
		font-size: var(--text-sm);
		line-height: var(--leading-relaxed);
	}
</style>
