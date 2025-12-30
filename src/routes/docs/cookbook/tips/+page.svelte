<svelte:head>
	<title>Tips & Tricks - Soyuz</title>
</svelte:head>

<div class="flex flex-col gap-8">
	<header>
		<h1 class="mb-2">Tips & Tricks</h1>
		<p class="text-lg text-text-muted">Best practices for effective modeling.</p>
	</header>

	<section class="flex flex-col gap-4">
		<h2 class="text-xl pt-4 border-t border-border-light">Transform Order Matters</h2>
		<p>
			Transforms apply left to right. <code>translate().rotate()</code> gives different results than
			<code>rotate().translate()</code>.
		</p>
	</section>

	<section class="flex flex-col gap-4">
		<h2 class="text-xl pt-4 border-t border-border-light">Smooth Blend Values</h2>
		<ul class="pl-6 flex flex-col gap-2">
			<li><code>k = 0.01</code> - barely visible</li>
			<li><code>k = 0.05</code> - subtle fillet</li>
			<li><code>k = 0.1</code> - noticeable blend</li>
			<li><code>k = 0.2+</code> - organic, blobby</li>
		</ul>
	</section>

	<section class="flex flex-col gap-4">
		<h2 class="text-xl pt-4 border-t border-border-light">Return an SDF</h2>
		<p>Your script must return an SDF. Don't end the last line with a semicolon.</p>
	</section>
</div>
