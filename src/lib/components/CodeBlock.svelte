<script lang="ts">
	import { highlightRhai } from '$lib/rhaiHighlight';

	interface Props {
		code: string;
		filename?: string;
		compact?: boolean;
	}

	let { code, filename, compact = false }: Props = $props();
</script>

<div class="code-block bg-bg-code font-mono text-sm overflow-hidden">
	{#if filename}
		<div class="bg-bg-alt py-2 px-4 border-b border-border-light">
			<span class="text-xs text-text-muted">{filename}</span>
		</div>
	{/if}
	<pre
		class="m-0 p-4 overflow-x-auto bg-transparent border-none {compact ? 'p-3 text-xs' : ''}"><code
			class="bg-transparent p-0 leading-relaxed">{@html highlightRhai(code)}</code
		></pre>
</div>
