<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
</script>

<svelte:head>
	<title>Installation - Soyuz</title>
</svelte:head>

<div class="flex flex-col gap-8">
	<header>
		<h1 class="mb-2">Installation</h1>
		<p class="text-lg text-text-muted">Get Soyuz running on your machine.</p>
	</header>

	<section class="flex flex-col gap-4">
		<h2 class="text-xl pt-4 border-t border-border-light">Prerequisites</h2>
		<ul class="pl-6 flex flex-col gap-2">
			<li><strong>Rust toolchain</strong> (1.75 or later)</li>
			<li><strong>Linux</strong> with X11 or Wayland</li>
		</ul>
		<p class="text-sm text-text-muted p-3 px-4 bg-bg-alt border-l-[3px] border-accent">
			macOS and Windows support is planned. Currently, the desktop app is Linux-focused.
		</p>
	</section>

	<section class="flex flex-col gap-4">
		<h2 class="text-xl pt-4 border-t border-border-light">Build from source</h2>
		<p>Clone the repository and build:</p>
		<CodeBlock
			code={`git clone https://github.com/noahsabaj/soyuz
cd soyuz
cargo build --release`}
		/>
		<p>This creates the Soyuz Studio binary at <code>./target/release/soyuz-studio</code>.</p>
	</section>

	<section class="flex flex-col gap-4">
		<h2 class="text-xl pt-4 border-t border-border-light">Run Soyuz Studio</h2>
		<CodeBlock code="cargo run --release -p soyuz-app" />
		<p>This launches Soyuz Studio, the desktop IDE for editing scripts, previewing models, and exporting meshes.</p>
	</section>

</div>
