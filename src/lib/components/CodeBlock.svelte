<script lang="ts">
	interface Props {
		code: string;
		filename?: string;
		compact?: boolean;
	}

	let { code, filename, compact = false }: Props = $props();

	function highlightRhai(source: string): string {
		const keywords =
			/\b(let|if|else|for|while|loop|fn|return|true|false|in|break|continue|throw|try|catch)\b/g;
		const builtins =
			/\b(sphere|cube|box3|cylinder|capsule|torus|cone|ellipsoid|plane|octahedron|hex_prism|tri_prism|rounded_box|ground_plane|union|subtract|intersect|smooth_union|smooth_subtract|smooth_intersect|translate|translate_x|translate_y|translate_z|rotate_x|rotate_y|rotate_z|scale|mirror_x|mirror_y|mirror_z|symmetry_x|symmetry_y|symmetry_z|shell|hollow|round|onion|elongate|twist|bend|repeat|repeat_limited|repeat_polar|deg|rad|PI|TAU)\b/g;
		const numbers = /\b(\d+\.?\d*)\b/g;
		const strings = /(["'])(?:(?=(\\?))\2.)*?\1/g;
		const comments = /(\/\/.*$)/gm;

		let result = source
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(comments, '<span class="comment">$1</span>')
			.replace(strings, '<span class="string">$&</span>')
			.replace(keywords, '<span class="keyword">$1</span>')
			.replace(builtins, '<span class="builtin">$1</span>')
			.replace(numbers, '<span class="number">$1</span>');

		return result;
	}
</script>

<div class="code-block" class:compact>
	{#if filename}
		<div class="code-header">
			<span class="filename">{filename}</span>
		</div>
	{/if}
	<pre><code>{@html highlightRhai(code)}</code></pre>
</div>

<style>
	.code-block {
		background: var(--color-bg-code);
		font-family: var(--font-mono);
		font-size: var(--text-sm);
		overflow: hidden;
	}

	.code-header {
		background: var(--color-bg-alt);
		padding: var(--space-2) var(--space-4);
		border-bottom: 1px solid var(--color-border-light);
	}

	.filename {
		font-size: var(--text-xs);
		color: var(--color-text-muted);
	}

	pre {
		margin: 0;
		padding: var(--space-4);
		overflow-x: auto;
		background: transparent;
		border: none;
	}

	.compact pre {
		padding: var(--space-3);
		font-size: var(--text-xs);
	}

	code {
		background: transparent;
		padding: 0;
		line-height: 1.6;
	}

	:global(.code-block .keyword) {
		color: #7c6f9f;
	}

	:global(.code-block .builtin) {
		color: var(--color-accent);
	}

	:global(.code-block .string) {
		color: #6a9955;
	}

	:global(.code-block .number) {
		color: #b5734a;
	}

	:global(.code-block .comment) {
		color: var(--color-text-subtle);
		font-style: italic;
	}
</style>
