<script lang="ts">
	// Component metadata - no runtime state needed
</script>

<footer class="footer">
	<div class="footer-inner container">
		<div class="footer-brand">
			<span class="logo">
				<span class="logo-mark">//</span>
				<span class="logo-text">soyuz</span>
			</span>
			<p class="tagline">Procedural 3D asset generation</p>
		</div>

		<div class="footer-links">
			<div class="footer-section">
				<h4>Product</h4>
				<a href="/docs">Documentation</a>
				<a href="/examples">Examples</a>
				<a href="/download">Download</a>
			</div>

			<div class="footer-section">
				<h4>Resources</h4>
				<a href="/docs/getting-started">Getting Started</a>
				<a href="/docs/api">API Reference</a>
				<a href="/docs/cookbook">Cookbook</a>
			</div>

			<div class="footer-section">
				<h4>Community</h4>
				<a href="https://github.com/noahsabaj/soyuz" target="_blank" rel="noopener noreferrer"
					>GitHub</a
				>
				<a
					href="https://github.com/noahsabaj/soyuz/issues"
					target="_blank"
					rel="noopener noreferrer">Issues</a
				>
				<a
					href="https://github.com/noahsabaj/soyuz/discussions"
					target="_blank"
					rel="noopener noreferrer">Discussions</a
				>
			</div>
		</div>

		<div class="footer-bottom">
			<p class="copyright">MIT / Apache-2.0</p>
		</div>
	</div>
</footer>

<style>
	.footer {
		background: var(--color-bg-alt);
		border-top: var(--border-width) solid var(--color-border);
		padding: var(--space-12) 0 var(--space-8);
		margin-top: var(--space-16);
	}

	.footer-inner {
		display: grid;
		gap: var(--space-10);
	}

	.footer-brand {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.logo {
		display: flex;
		align-items: center;
		gap: var(--space-1);
		font-family: var(--font-mono);
		font-size: var(--text-lg);
		font-weight: 600;
		color: var(--color-text);
	}

	.logo-mark {
		color: var(--color-accent);
	}

	.tagline {
		color: var(--color-text-muted);
		font-size: var(--text-sm);
	}

	.footer-links {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
		gap: var(--space-8);
	}

	.footer-section {
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
	}

	.footer-section h4 {
		font-size: var(--text-xs);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--color-text-muted);
		margin-bottom: var(--space-1);
	}

	.footer-section a {
		font-size: var(--text-sm);
		color: var(--color-text);
		text-decoration: none;
		transition: color 0.15s ease;
	}

	.footer-section a:hover {
		color: var(--color-accent);
	}

	.footer-bottom {
		padding-top: var(--space-8);
		border-top: 1px solid var(--color-border-light);
	}

	.copyright {
		font-family: var(--font-mono);
		font-size: var(--text-xs);
		color: var(--color-text-subtle);
	}

	@media (min-width: 768px) {
		.footer-inner {
			grid-template-columns: 1fr 2fr;
		}

		.footer-bottom {
			grid-column: 1 / -1;
		}
	}
</style>
