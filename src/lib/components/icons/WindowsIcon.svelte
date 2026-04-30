<script lang="ts">
	let { size = 24, color = 'currentColor' }: { size?: number; color?: string } = $props();
</script>

<svg width={size} height={size} viewBox="0 0 20 20" fill={color} xmlns="http://www.w3.org/2000/svg">
	<path d="M9.172,9.179V0.146H0v9.033H9.172z" />
	<path d="M19.132,9.179V0.146H9.959v9.033H19.132z" />
	<path d="M19.132,18.986V9.955H9.959v9.032H19.132z" />
	<path d="M9.172,18.986V9.955H0v9.032H9.172z" />
</svg>
