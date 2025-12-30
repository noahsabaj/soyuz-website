<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
</script>

<svelte:head>
	<title>Environment API - Soyuz</title>
</svelte:head>

<div class="flex flex-col gap-8">
	<header>
		<h1 class="mb-2">Environment API</h1>
		<p class="text-lg text-text-muted">
			Configure lighting, materials, and rendering settings. Environment functions control how
			your models are displayed in the preview and rendered output.
		</p>
	</header>

	<nav class="p-4 bg-bg-alt border-2 border-border">
		<h2 class="text-sm uppercase tracking-wide text-text-muted mb-3">On This Page</h2>
		<ul class="flex flex-col gap-1 text-sm">
			<li><a href="#presets">Lighting Presets</a></li>
			<li><a href="#lighting">Lighting Settings</a></li>
			<li><a href="#material">Material Settings</a></li>
			<li><a href="#rendering">Rendering Settings</a></li>
		</ul>
	</nav>

	<!-- Presets -->
	<section id="presets" class="scroll-mt-4">
		<h2 class="text-2xl mb-4 pb-2 border-b-2 border-border">Lighting Presets</h2>
		<p class="text-text-muted mb-6">
			Quickly apply predefined lighting configurations. Call any preset function to instantly
			set up sun direction, colors, and rendering options for common scenarios.
		</p>

		<div class="flex flex-col gap-6">
			<!-- env_studio -->
			<div class="card">
				<h3 class="font-mono text-lg text-accent mb-2">env_studio()</h3>
				<p class="text-text-muted mb-4">
					Neutral studio lighting with soft shadows. This is the default environment if no
					preset is specified. Ideal for showcasing models with even, professional lighting.
				</p>
				<div class="overflow-x-auto mb-4">
					<table class="w-full text-sm border-collapse">
						<thead>
							<tr class="border-b-2 border-border">
								<th class="text-left py-2 pr-4">Setting</th>
								<th class="text-left py-2">Value</th>
							</tr>
						</thead>
						<tbody>
							<tr class="border-b border-border-light">
								<td class="py-2 pr-4">Sun Direction</td>
								<td class="py-2 font-mono">(0.5, 1.0, 0.3)</td>
							</tr>
							<tr class="border-b border-border-light">
								<td class="py-2 pr-4">Sun Color</td>
								<td class="py-2">Warm white</td>
							</tr>
							<tr class="border-b border-border-light">
								<td class="py-2 pr-4">Ambient</td>
								<td class="py-2">Neutral gray fill</td>
							</tr>
							<tr>
								<td class="py-2 pr-4">AO/Shadows</td>
								<td class="py-2">Enabled</td>
							</tr>
						</tbody>
					</table>
				</div>
				<CodeBlock
					code={`env_studio()
sphere(0.5)`}
				/>
			</div>

			<!-- env_daylight -->
			<div class="card">
				<h3 class="font-mono text-lg text-accent mb-2">env_daylight()</h3>
				<p class="text-text-muted mb-4">
					Bright outdoor lighting simulating midday sun. High contrast with strong shadows,
					good for architectural or outdoor scene visualization.
				</p>
				<div class="overflow-x-auto mb-4">
					<table class="w-full text-sm border-collapse">
						<thead>
							<tr class="border-b-2 border-border">
								<th class="text-left py-2 pr-4">Setting</th>
								<th class="text-left py-2">Value</th>
							</tr>
						</thead>
						<tbody>
							<tr class="border-b border-border-light">
								<td class="py-2 pr-4">Sun Direction</td>
								<td class="py-2 font-mono">(0.3, 1.0, 0.2)</td>
							</tr>
							<tr class="border-b border-border-light">
								<td class="py-2 pr-4">Sun Color</td>
								<td class="py-2">Bright white/yellow</td>
							</tr>
							<tr class="border-b border-border-light">
								<td class="py-2 pr-4">Ambient</td>
								<td class="py-2">Sky blue fill</td>
							</tr>
							<tr>
								<td class="py-2 pr-4">Background</td>
								<td class="py-2">Light blue sky</td>
							</tr>
						</tbody>
					</table>
				</div>
				<CodeBlock
					code={`env_daylight()
box3(1.0, 0.5, 1.0)  // Architectural element`}
				/>
			</div>

			<!-- env_sunset -->
			<div class="card">
				<h3 class="font-mono text-lg text-accent mb-2">env_sunset()</h3>
				<p class="text-text-muted mb-4">
					Warm orange/golden hour lighting. Creates dramatic, atmospheric renders with long
					shadows and rich warm tones.
				</p>
				<div class="overflow-x-auto mb-4">
					<table class="w-full text-sm border-collapse">
						<thead>
							<tr class="border-b-2 border-border">
								<th class="text-left py-2 pr-4">Setting</th>
								<th class="text-left py-2">Value</th>
							</tr>
						</thead>
						<tbody>
							<tr class="border-b border-border-light">
								<td class="py-2 pr-4">Sun Direction</td>
								<td class="py-2 font-mono">(0.8, 0.3, 0.2)</td>
							</tr>
							<tr class="border-b border-border-light">
								<td class="py-2 pr-4">Sun Color</td>
								<td class="py-2">Orange/gold</td>
							</tr>
							<tr class="border-b border-border-light">
								<td class="py-2 pr-4">Ambient</td>
								<td class="py-2">Purple/blue fill</td>
							</tr>
							<tr>
								<td class="py-2 pr-4">Background</td>
								<td class="py-2">Gradient warm to cool</td>
							</tr>
						</tbody>
					</table>
				</div>
				<CodeBlock
					code={`env_sunset()
// Dramatic scene lighting
cylinder(0.3, 2.0).union(sphere(0.5).translate_y(1.2))`}
				/>
			</div>

			<!-- env_night -->
			<div class="card">
				<h3 class="font-mono text-lg text-accent mb-2">env_night()</h3>
				<p class="text-text-muted mb-4">
					Dark, cool-toned night scene. Low-key lighting with blue tones, suitable for
					moody or mysterious renders.
				</p>
				<div class="overflow-x-auto mb-4">
					<table class="w-full text-sm border-collapse">
						<thead>
							<tr class="border-b-2 border-border">
								<th class="text-left py-2 pr-4">Setting</th>
								<th class="text-left py-2">Value</th>
							</tr>
						</thead>
						<tbody>
							<tr class="border-b border-border-light">
								<td class="py-2 pr-4">Sun Direction</td>
								<td class="py-2 font-mono">(0.2, 0.5, 0.8)</td>
							</tr>
							<tr class="border-b border-border-light">
								<td class="py-2 pr-4">Sun Color</td>
								<td class="py-2">Pale blue (moonlight)</td>
							</tr>
							<tr class="border-b border-border-light">
								<td class="py-2 pr-4">Ambient</td>
								<td class="py-2">Dark blue</td>
							</tr>
							<tr>
								<td class="py-2 pr-4">Background</td>
								<td class="py-2">Near black</td>
							</tr>
						</tbody>
					</table>
				</div>
				<CodeBlock
					code={`env_night()
sphere(0.5).shell(0.05)  // Ethereal hollow sphere`}
				/>
			</div>

			<!-- env_clay -->
			<div class="card">
				<h3 class="font-mono text-lg text-accent mb-2">env_clay()</h3>
				<p class="text-text-muted mb-4">
					Soft ambient occlusion look without directional lighting. Shows form and detail
					clearly, similar to clay renders in traditional 3D software. Ideal for evaluating
					shape without lighting distractions.
				</p>
				<div class="overflow-x-auto mb-4">
					<table class="w-full text-sm border-collapse">
						<thead>
							<tr class="border-b-2 border-border">
								<th class="text-left py-2 pr-4">Setting</th>
								<th class="text-left py-2">Value</th>
							</tr>
						</thead>
						<tbody>
							<tr class="border-b border-border-light">
								<td class="py-2 pr-4">Sun</td>
								<td class="py-2">Disabled/very soft</td>
							</tr>
							<tr class="border-b border-border-light">
								<td class="py-2 pr-4">Ambient</td>
								<td class="py-2">Bright, even</td>
							</tr>
							<tr class="border-b border-border-light">
								<td class="py-2 pr-4">Material</td>
								<td class="py-2">Neutral gray</td>
							</tr>
							<tr>
								<td class="py-2 pr-4">AO</td>
								<td class="py-2">Enhanced</td>
							</tr>
						</tbody>
					</table>
				</div>
				<CodeBlock
					code={`env_clay()
// Focus on form without lighting distraction
torus(0.4, 0.15).smooth_union(sphere(0.3), 0.1)`}
				/>
			</div>
		</div>
	</section>

	<!-- Lighting Settings -->
	<section id="lighting" class="scroll-mt-4">
		<h2 class="text-2xl mb-4 pb-2 border-b-2 border-border">Lighting Settings</h2>
		<p class="text-text-muted mb-6">
			Fine-tune directional and ambient lighting. All color values use normalized RGB (0.0 to 1.0 range).
		</p>

		<div class="flex flex-col gap-6">
			<!-- set_sun_direction -->
			<div class="card">
				<h3 class="font-mono text-lg text-accent mb-2">set_sun_direction(x, y, z)</h3>
				<p class="text-text-muted mb-4">
					Set the direction of the main directional light (sun). The vector is automatically
					normalized, so only the direction matters, not the magnitude.
				</p>
				<div class="overflow-x-auto mb-4">
					<table class="w-full text-sm border-collapse">
						<thead>
							<tr class="border-b-2 border-border">
								<th class="text-left py-2 pr-4">Parameter</th>
								<th class="text-left py-2 pr-4">Type</th>
								<th class="text-left py-2">Description</th>
							</tr>
						</thead>
						<tbody>
							<tr class="border-b border-border-light">
								<td class="py-2 pr-4 font-mono">x</td>
								<td class="py-2 pr-4 text-text-muted">float</td>
								<td class="py-2">X component of light direction</td>
							</tr>
							<tr class="border-b border-border-light">
								<td class="py-2 pr-4 font-mono">y</td>
								<td class="py-2 pr-4 text-text-muted">float</td>
								<td class="py-2">Y component (positive = from above)</td>
							</tr>
							<tr>
								<td class="py-2 pr-4 font-mono">z</td>
								<td class="py-2 pr-4 text-text-muted">float</td>
								<td class="py-2">Z component of light direction</td>
							</tr>
						</tbody>
					</table>
				</div>
				<CodeBlock
					code={`// Top-down lighting
set_sun_direction(0.0, 1.0, 0.0)

// Dramatic side lighting
set_sun_direction(1.0, 0.3, 0.0)

// Low angle (sunrise/sunset feel)
set_sun_direction(0.8, 0.2, 0.3)

sphere(0.5)`}
				/>
			</div>

			<!-- set_sun_color -->
			<div class="card">
				<h3 class="font-mono text-lg text-accent mb-2">set_sun_color(r, g, b)</h3>
				<p class="text-text-muted mb-4">
					Set the color of the directional light. Values are normalized RGB (0.0 to 1.0).
					Higher values increase light intensity.
				</p>
				<div class="overflow-x-auto mb-4">
					<table class="w-full text-sm border-collapse">
						<thead>
							<tr class="border-b-2 border-border">
								<th class="text-left py-2 pr-4">Parameter</th>
								<th class="text-left py-2 pr-4">Type</th>
								<th class="text-left py-2">Description</th>
							</tr>
						</thead>
						<tbody>
							<tr class="border-b border-border-light">
								<td class="py-2 pr-4 font-mono">r</td>
								<td class="py-2 pr-4 text-text-muted">float</td>
								<td class="py-2">Red component (0.0 to 1.0+)</td>
							</tr>
							<tr class="border-b border-border-light">
								<td class="py-2 pr-4 font-mono">g</td>
								<td class="py-2 pr-4 text-text-muted">float</td>
								<td class="py-2">Green component (0.0 to 1.0+)</td>
							</tr>
							<tr>
								<td class="py-2 pr-4 font-mono">b</td>
								<td class="py-2 pr-4 text-text-muted">float</td>
								<td class="py-2">Blue component (0.0 to 1.0+)</td>
							</tr>
						</tbody>
					</table>
				</div>
				<CodeBlock
					code={`// Warm sunlight
set_sun_color(1.0, 0.9, 0.7)

// Cool moonlight
set_sun_color(0.6, 0.7, 1.0)

// Intense white (overexposed)
set_sun_color(1.5, 1.5, 1.5)

sphere(0.5)`}
				/>
			</div>

			<!-- set_ambient_color -->
			<div class="card">
				<h3 class="font-mono text-lg text-accent mb-2">set_ambient_color(r, g, b)</h3>
				<p class="text-text-muted mb-4">
					Set the ambient/fill light color. This affects areas not directly lit by the sun,
					simulating light bouncing from the environment.
				</p>
				<div class="overflow-x-auto mb-4">
					<table class="w-full text-sm border-collapse">
						<thead>
							<tr class="border-b-2 border-border">
								<th class="text-left py-2 pr-4">Parameter</th>
								<th class="text-left py-2 pr-4">Type</th>
								<th class="text-left py-2">Description</th>
							</tr>
						</thead>
						<tbody>
							<tr class="border-b border-border-light">
								<td class="py-2 pr-4 font-mono">r</td>
								<td class="py-2 pr-4 text-text-muted">float</td>
								<td class="py-2">Red component (0.0 to 1.0)</td>
							</tr>
							<tr class="border-b border-border-light">
								<td class="py-2 pr-4 font-mono">g</td>
								<td class="py-2 pr-4 text-text-muted">float</td>
								<td class="py-2">Green component (0.0 to 1.0)</td>
							</tr>
							<tr>
								<td class="py-2 pr-4 font-mono">b</td>
								<td class="py-2 pr-4 text-text-muted">float</td>
								<td class="py-2">Blue component (0.0 to 1.0)</td>
							</tr>
						</tbody>
					</table>
				</div>
				<CodeBlock
					code={`// Sky blue ambient (outdoor)
set_ambient_color(0.4, 0.5, 0.7)

// Warm interior bounce light
set_ambient_color(0.5, 0.4, 0.3)

// High contrast (dark shadows)
set_ambient_color(0.1, 0.1, 0.1)

sphere(0.5)`}
				/>
			</div>

			<!-- set_background_color -->
			<div class="card">
				<h3 class="font-mono text-lg text-accent mb-2">set_background_color(r, g, b)</h3>
				<p class="text-text-muted mb-4">
					Set the background/sky color of the viewport. Does not affect lighting, only the
					visible background behind the model.
				</p>
				<div class="overflow-x-auto mb-4">
					<table class="w-full text-sm border-collapse">
						<thead>
							<tr class="border-b-2 border-border">
								<th class="text-left py-2 pr-4">Parameter</th>
								<th class="text-left py-2 pr-4">Type</th>
								<th class="text-left py-2">Description</th>
							</tr>
						</thead>
						<tbody>
							<tr class="border-b border-border-light">
								<td class="py-2 pr-4 font-mono">r</td>
								<td class="py-2 pr-4 text-text-muted">float</td>
								<td class="py-2">Red component (0.0 to 1.0)</td>
							</tr>
							<tr class="border-b border-border-light">
								<td class="py-2 pr-4 font-mono">g</td>
								<td class="py-2 pr-4 text-text-muted">float</td>
								<td class="py-2">Green component (0.0 to 1.0)</td>
							</tr>
							<tr>
								<td class="py-2 pr-4 font-mono">b</td>
								<td class="py-2 pr-4 text-text-muted">float</td>
								<td class="py-2">Blue component (0.0 to 1.0)</td>
							</tr>
						</tbody>
					</table>
				</div>
				<CodeBlock
					code={`// White background (product shot)
set_background_color(1.0, 1.0, 1.0)

// Dark background
set_background_color(0.1, 0.1, 0.12)

// Gradient-like teal
set_background_color(0.2, 0.3, 0.35)

sphere(0.5)`}
				/>
			</div>
		</div>
	</section>

	<!-- Material Settings -->
	<section id="material" class="scroll-mt-4">
		<h2 class="text-2xl mb-4 pb-2 border-b-2 border-border">Material Settings</h2>
		<p class="text-text-muted mb-6">
			Control the appearance of the model's surface material.
		</p>

		<div class="flex flex-col gap-6">
			<!-- set_material_color -->
			<div class="card">
				<h3 class="font-mono text-lg text-accent mb-2">set_material_color(r, g, b)</h3>
				<p class="text-text-muted mb-4">
					Set the base color of the model using normalized RGB values.
				</p>
				<div class="overflow-x-auto mb-4">
					<table class="w-full text-sm border-collapse">
						<thead>
							<tr class="border-b-2 border-border">
								<th class="text-left py-2 pr-4">Parameter</th>
								<th class="text-left py-2 pr-4">Type</th>
								<th class="text-left py-2">Description</th>
							</tr>
						</thead>
						<tbody>
							<tr class="border-b border-border-light">
								<td class="py-2 pr-4 font-mono">r</td>
								<td class="py-2 pr-4 text-text-muted">float</td>
								<td class="py-2">Red component (0.0 to 1.0)</td>
							</tr>
							<tr class="border-b border-border-light">
								<td class="py-2 pr-4 font-mono">g</td>
								<td class="py-2 pr-4 text-text-muted">float</td>
								<td class="py-2">Green component (0.0 to 1.0)</td>
							</tr>
							<tr>
								<td class="py-2 pr-4 font-mono">b</td>
								<td class="py-2 pr-4 text-text-muted">float</td>
								<td class="py-2">Blue component (0.0 to 1.0)</td>
							</tr>
						</tbody>
					</table>
				</div>
				<CodeBlock
					code={`// Red material
set_material_color(0.9, 0.2, 0.2)

// Gold/brass
set_material_color(0.8, 0.6, 0.2)

// Teal
set_material_color(0.2, 0.6, 0.7)

sphere(0.5)`}
				/>
			</div>

			<!-- set_material_color_hex -->
			<div class="card">
				<h3 class="font-mono text-lg text-accent mb-2">set_material_color_hex(hex)</h3>
				<p class="text-text-muted mb-4">
					Set the base color using a hex color string. More convenient when working with
					colors from design tools or CSS.
				</p>
				<div class="overflow-x-auto mb-4">
					<table class="w-full text-sm border-collapse">
						<thead>
							<tr class="border-b-2 border-border">
								<th class="text-left py-2 pr-4">Parameter</th>
								<th class="text-left py-2 pr-4">Type</th>
								<th class="text-left py-2">Description</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td class="py-2 pr-4 font-mono">hex</td>
								<td class="py-2 pr-4 text-text-muted">string</td>
								<td class="py-2">Hex color string (with or without #)</td>
							</tr>
						</tbody>
					</table>
				</div>
				<CodeBlock
					code={`// Coral red
set_material_color_hex("#ff5544")

// Forest green
set_material_color_hex("#2d5a27")

// Also works without #
set_material_color_hex("5b7a69")

sphere(0.5)`}
				/>
			</div>
		</div>
	</section>

	<!-- Rendering Settings -->
	<section id="rendering" class="scroll-mt-4">
		<h2 class="text-2xl mb-4 pb-2 border-b-2 border-border">Rendering Settings</h2>
		<p class="text-text-muted mb-6">
			Toggle rendering features that affect visual quality and performance.
		</p>

		<div class="flex flex-col gap-6">
			<!-- set_ao_enabled -->
			<div class="card">
				<h3 class="font-mono text-lg text-accent mb-2">set_ao_enabled(enabled)</h3>
				<p class="text-text-muted mb-4">
					Enable or disable ambient occlusion. AO adds soft shadows in crevices and corners,
					enhancing the perception of depth and form.
				</p>
				<div class="overflow-x-auto mb-4">
					<table class="w-full text-sm border-collapse">
						<thead>
							<tr class="border-b-2 border-border">
								<th class="text-left py-2 pr-4">Parameter</th>
								<th class="text-left py-2 pr-4">Type</th>
								<th class="text-left py-2">Description</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td class="py-2 pr-4 font-mono">enabled</td>
								<td class="py-2 pr-4 text-text-muted">bool</td>
								<td class="py-2"><code>true</code> to enable, <code>false</code> to disable</td>
							</tr>
						</tbody>
					</table>
				</div>
				<CodeBlock
					code={`// Disable AO for cleaner look
set_ao_enabled(false)

// Enable AO (default)
set_ao_enabled(true)

// AO is particularly visible on complex shapes
torus(0.4, 0.1).smooth_union(sphere(0.25), 0.1)`}
				/>
			</div>

			<!-- set_shadows_enabled -->
			<div class="card">
				<h3 class="font-mono text-lg text-accent mb-2">set_shadows_enabled(enabled)</h3>
				<p class="text-text-muted mb-4">
					Enable or disable cast shadows from the directional light. Shadows add realism
					but can be disabled for a flatter, illustrative look.
				</p>
				<div class="overflow-x-auto mb-4">
					<table class="w-full text-sm border-collapse">
						<thead>
							<tr class="border-b-2 border-border">
								<th class="text-left py-2 pr-4">Parameter</th>
								<th class="text-left py-2 pr-4">Type</th>
								<th class="text-left py-2">Description</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td class="py-2 pr-4 font-mono">enabled</td>
								<td class="py-2 pr-4 text-text-muted">bool</td>
								<td class="py-2"><code>true</code> to enable, <code>false</code> to disable</td>
							</tr>
						</tbody>
					</table>
				</div>
				<CodeBlock
					code={`// Flat look without shadows
set_shadows_enabled(false)

// Enable shadows (default)
set_shadows_enabled(true)

// Ground plane to catch shadows
sphere(0.4).translate_y(0.4)
    .union(ground_plane())`}
				/>
			</div>
		</div>
	</section>

	<!-- Complete Example -->
	<section class="p-6 bg-bg-alt border-2 border-border">
		<h2 class="text-xl mb-4">Complete Example</h2>
		<p class="text-text-muted mb-4">
			Combine multiple environment settings to create a custom scene:
		</p>
		<CodeBlock
			code={`// Custom sunset scene
set_sun_direction(0.9, 0.3, 0.1)
set_sun_color(1.2, 0.7, 0.4)
set_ambient_color(0.3, 0.3, 0.5)
set_background_color(0.15, 0.1, 0.2)
set_material_color_hex("#c9a87c")
set_ao_enabled(true)
set_shadows_enabled(true)

// Scene with ground
let monument = cylinder(0.2, 1.5)
    .smooth_union(sphere(0.35).translate_y(0.8), 0.1);

monument.union(ground_plane())`}
		/>
	</section>

	<div class="p-4 bg-accent-light border-l-4 border-accent">
		<p class="text-sm">
			<strong>Tip:</strong> Start with a preset that's close to your desired look, then
			fine-tune individual settings. This is faster than configuring everything from scratch.
		</p>
	</div>

	<footer class="text-sm text-text-muted pt-4 border-t border-border-light">
		See also: <a href="/docs/api/primitives">Primitives</a> |
		<a href="/docs/api/operations">Operations</a> |
		<a href="/docs/api/transforms">Transforms</a>
	</footer>
</div>
