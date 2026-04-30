<script lang="ts">
	import { allFunctions } from '$lib/apiManifest';

	interface Props {
		code: string;
		filename?: string;
		compact?: boolean;
	}

	let { code, filename, compact = false }: Props = $props();

	function escapeRegExp(value: string): string {
		return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	}

	const builtinNames = allFunctions.map((fn) => fn.name).sort((a, b) => b.length - a.length);
	const builtinPattern = new RegExp(`\\b(${builtinNames.map(escapeRegExp).join('|')})\\b`, 'g');

	function highlightRhai(source: string): string {
		// Use placeholder tokens to avoid regex collisions between patterns
		// (e.g., strings regex matching "comment" inside span class attributes)
		const tokens: Array<[string, string]> = [];
		let tokenIndex = 0;

		function addToken(match: string, className: string): string {
			// Use \x00 + letters + \x00 to avoid number regex matching digits in placeholder
			const placeholder = `\x00TKN${tokenIndex++}TKN\x00`;
			const escaped = match.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
			tokens.push([placeholder, `<span class="${className}">${escaped}</span>`]);
			return placeholder;
		}

		let result = source;

		// 1. Extract comments first (they take precedence and can contain anything)
		result = result.replace(/(\/\/.*$)/gm, (match) => addToken(match, 'comment'));

		// 2. Extract strings (before other patterns to avoid matching inside strings)
		result = result.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, (match) => addToken(match, 'string'));

		// 3. Now escape HTML in remaining code
		result = result.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

		// 4. Highlight keywords
		result = result.replace(
			/\b(let|if|else|for|while|loop|fn|return|true|false|in|break|continue|throw|try|catch)\b/g,
			'<span class="keyword">$1</span>'
		);

		// 5. Highlight builtins
		result = result.replace(builtinPattern, '<span class="builtin">$1</span>');

		// 6. Highlight numbers
		result = result.replace(/\b(\d+\.?\d*)\b/g, '<span class="number">$1</span>');

		// 7. Restore tokens with their HTML
		for (const [placeholder, html] of tokens) {
			result = result.replace(placeholder, html);
		}

		return result;
	}
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
