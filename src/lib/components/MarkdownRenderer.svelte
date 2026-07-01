<script lang="ts" module>
	import { Marked, Renderer } from 'marked';
	import DOMPurify from 'isomorphic-dompurify';
	import { allFunctions } from '$lib/apiManifest';

	function escapeRegExp(value: string): string {
		return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	}

	function escapeHtml(value: string): string {
		return value
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;');
	}

	function slugify(value: string): string {
		return value
			.toLowerCase()
			.trim()
			.replace(/[^a-z0-9\s-]/g, '')
			.replace(/\s/g, '-');
	}

	const builtinNames = [...allFunctions.map((fn) => fn.name), 'cos', 'sin'].sort(
		(a, b) => b.length - a.length
	);
	const builtinPattern = new RegExp(`\\b(${builtinNames.map(escapeRegExp).join('|')})\\b`, 'g');

	// Syntax highlighting for Rhai code (same as CodeBlock component)
	function highlightRhai(source: string): string {
		const tokens: Array<[string, string]> = [];
		let tokenIndex = 0;

		function addToken(match: string, className: string): string {
			const placeholder = `\x00TKN${tokenIndex++}TKN\x00`;
			const escaped = match.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
			tokens.push([placeholder, `<span class="${className}">${escaped}</span>`]);
			return placeholder;
		}

		let result = source;

		// 1. Extract comments first
		result = result.replace(/(\/\/.*$)/gm, (match) => addToken(match, 'comment'));

		// 2. Extract strings
		result = result.replace(/(["'])(?:(?=(\\?))\2.)*?\1/g, (match) => addToken(match, 'string'));

		// 3. Escape HTML in remaining code
		result = result.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

		// 4. Keywords
		result = result.replace(
			/\b(let|if|else|for|while|loop|fn|return|true|false|in|break|continue|throw|try|catch)\b/g,
			'<span class="keyword">$1</span>'
		);

		// 5. Builtins (Soyuz functions)
		result = result.replace(builtinPattern, '<span class="builtin">$1</span>');

		// 6. Numbers
		result = result.replace(/\b(\d+\.?\d*)\b/g, '<span class="number">$1</span>');

		// 7. Restore tokens
		for (const [placeholder, html] of tokens) {
			result = result.replace(placeholder, html);
		}

		return result;
	}

	// Single Marked instance, configured once when this module is first evaluated.
	// Using a local `new Marked()` instance (instead of the global `marked` singleton)
	// means renderers are not re-registered / shared state is not mutated on every
	// component instantiation as the user navigates between doc pages.
	const markedInstance = new Marked({
		gfm: true,
		breaks: false
	});

	// Custom renderer for code blocks with syntax highlighting
	const renderer = new Renderer();

	renderer.code = ({ text, lang }: { text: string; lang?: string }) => {
		const language = lang || '';
		// Apply Rhai syntax highlighting for rhai code blocks (or unspecified language)
		const highlightedCode =
			language === 'rhai' || language === ''
				? highlightRhai(text)
				: text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

		// Escape the fence info string before interpolating it into markup.
		const safeLang = escapeHtml(language);
		return `<div class="code-block-wrapper">
			${language ? `<div class="code-lang">${safeLang}</div>` : ''}
			<pre class="code-block"><code class="language-${safeLang}">${highlightedCode}</code></pre>
		</div>`;
	};

	renderer.heading = ({
		tokens,
		depth
	}: {
		tokens?: Array<{ raw?: string; text?: string }>;
		depth: number;
	}) => {
		const text = tokens?.map((token) => token.text ?? token.raw ?? '').join('') ?? '';
		const id = slugify(text);
		return `<h${depth} id="${id}">${escapeHtml(text)}</h${depth}>`;
	};

	markedInstance.use({ renderer });

	// Sanitize the generated HTML before it is injected via {@html}.
	// isomorphic-dompurify works both in the browser and during SSR/prerender.
	function renderMarkdown(markdown: string): string {
		const rawHtml = markedInstance.parse(markdown) as string;
		return DOMPurify.sanitize(rawHtml);
	}
</script>

<script lang="ts">
	interface Props {
		content: string;
	}

	let { content }: Props = $props();

	let html = $derived(renderMarkdown(content));
</script>

<div class="markdown-content">
	{@html html}
</div>

<style>
	.markdown-content {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	/* Headings */
	.markdown-content :global(h1) {
		font-size: 2rem;
		font-weight: 700;
		margin-top: 2rem;
		margin-bottom: 0.5rem;
		padding-bottom: 0.5rem;
		border-bottom: 2px solid var(--color-border);
	}

	.markdown-content :global(h1:first-child) {
		margin-top: 0;
	}

	.markdown-content :global(h2) {
		font-size: 1.25rem;
		font-weight: 700;
		margin-top: 2rem;
		margin-bottom: 0.5rem;
		padding-top: 1rem;
		border-top: 1px solid var(--color-border-light);
	}

	.markdown-content :global(h3) {
		font-size: 1rem;
		font-weight: 600;
		margin-top: 1rem;
		margin-bottom: 0.25rem;
		font-family: var(--font-mono);
		color: var(--color-accent);
	}

	.markdown-content :global(h4) {
		font-size: 1rem;
		font-weight: 600;
		margin-top: 1rem;
		margin-bottom: 0.25rem;
	}

	/* Paragraphs */
	.markdown-content :global(p) {
		line-height: 1.7;
		color: var(--color-text);
	}

	/* Lists */
	.markdown-content :global(ul),
	.markdown-content :global(ol) {
		padding-left: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.markdown-content :global(li) {
		line-height: 1.6;
	}

	/* Inline code */
	.markdown-content :global(code) {
		font-family: var(--font-mono);
		font-size: 0.9em;
		background: var(--color-bg-code);
		padding: 0.15em 0.4em;
		border-radius: 2px;
	}

	/* Code blocks */
	.markdown-content :global(.code-block-wrapper) {
		margin: 0.5rem 0;
	}

	.markdown-content :global(.code-lang) {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--color-text-subtle);
		background: var(--color-border-light);
		padding: 0.25rem 0.75rem;
		border: 2px solid var(--color-border);
		border-bottom: none;
		display: inline-block;
	}

	.markdown-content :global(.code-block) {
		background: var(--color-bg-code);
		border: 2px solid var(--color-border);
		padding: 1rem;
		overflow-x: auto;
		margin: 0;
	}

	.markdown-content :global(.code-block code) {
		background: none;
		padding: 0;
		font-size: 0.875rem;
		line-height: 1.6;
		display: block;
		white-space: pre;
	}

	/* Horizontal rule - hidden since h2 headings provide visual separation */
	.markdown-content :global(hr) {
		display: none;
	}

	/* Strong/Bold */
	.markdown-content :global(strong) {
		font-weight: 600;
	}

	/* Links */
	.markdown-content :global(a) {
		color: var(--color-accent);
		text-decoration: underline;
		text-underline-offset: 2px;
	}

	.markdown-content :global(a:hover) {
		color: var(--color-accent-hover);
	}

	/* Blockquotes */
	.markdown-content :global(blockquote) {
		border-left: 3px solid var(--color-accent);
		padding-left: 1rem;
		margin: 1rem 0;
		color: var(--color-text-muted);
		font-style: italic;
	}

	/* Tables */
	.markdown-content :global(table) {
		width: 100%;
		border-collapse: collapse;
		margin: 1rem 0;
	}

	.markdown-content :global(th),
	.markdown-content :global(td) {
		border: 1px solid var(--color-border-light);
		padding: 0.5rem 0.75rem;
		text-align: left;
	}

	.markdown-content :global(th) {
		background: var(--color-bg-alt);
		font-weight: 600;
	}
</style>
