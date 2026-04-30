<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';

	const examples = [
		{
			title: 'Gear',
			description: 'A mechanical gear with teeth and spoke holes.',
			difficulty: 'Beginner',
			code: `let teeth_count = 12;
let outer_radius = 1.0;
let inner_radius = 0.3;
let thickness = 0.2;
let tooth_size = 0.15;

// Main body
let body = cylinder(outer_radius - tooth_size, thickness);

// Center hole
let hole = cylinder(inner_radius, thickness + 0.1);

// Single tooth, repeated
let tooth = box3(tooth_size * 2.0, thickness, tooth_size * 1.5)
    .translate(outer_radius - tooth_size * 0.3, 0.0, 0.0);
let teeth = tooth.repeat_polar(teeth_count);

// Spoke holes
let spoke = cylinder(0.08, thickness + 0.1)
    .translate((outer_radius + inner_radius) / 2.0, 0.0, 0.0);
let spokes = spoke.repeat_polar(6);

body.union(teeth).subtract(hole).subtract(spokes)`
		},
		{
			title: 'Barrel',
			description: 'A hollow barrel with metal bands.',
			difficulty: 'Beginner',
			code: `// Main body
let body = cylinder(0.5, 1.2);

// Metal bands
let band_top = torus(0.5, 0.08).translate_y(0.5);
let band_bottom = torus(0.5, 0.08).translate_y(-0.5);
let band_middle = torus(0.52, 0.06);

// Combine with smooth blending
let solid = body
    .smooth_union(band_top, 0.05)
    .smooth_union(band_bottom, 0.05)
    .smooth_union(band_middle, 0.03);

// Make hollow
solid.hollow(0.05)`
		},
		{
			title: 'Twisted Column',
			description: 'An architectural column with flutes and twist deformation.',
			difficulty: 'Intermediate',
			code: `let column_radius = 0.4;
let column_height = 2.0;
let twist_amount = 1.5;
let flute_count = 8;
let flute_depth = 0.08;

// Main shaft with flutes
let shaft = cylinder(column_radius, column_height);
let flute = cylinder(flute_depth, column_height + 0.1)
    .translate(column_radius, 0.0, 0.0);
let fluted_shaft = shaft.subtract(flute.repeat_polar(flute_count));

// Apply twist
let twisted = fluted_shaft.twist(twist_amount);

// Base and capital
let base = cylinder(column_radius * 1.3, 0.15)
    .translate_y(-column_height / 2.0 - 0.075);

let capital = cylinder(column_radius * 1.2, 0.12)
    .smooth_union(
        torus(column_radius * 1.1, 0.08).translate_y(0.1),
        0.05
    )
    .translate_y(column_height / 2.0 + 0.06);

twisted.union(base).union(capital)`
		},
		{
			title: 'Sci-Fi Crate',
			description: 'A futuristic cargo container with panel details.',
			difficulty: 'Intermediate',
			code: `let width = 1.0;
let height = 0.8;
let depth = 0.7;
let corner_radius = 0.08;
let wall_thickness = 0.04;

// Hollow rounded box
let body = rounded_box(width, height, depth, corner_radius)
    .shell(wall_thickness);

// Edge reinforcements
let edge_h = box3(width + 0.02, 0.06, 0.06);
let top_edge = edge_h.translate_y(height / 2.0);
let bottom_edge = edge_h.translate_y(-height / 2.0);

// Side handles
let handle = capsule(0.03, 0.15)
    .rotate_z(deg(90.0))
    .translate(width / 2.0 + 0.02, 0.0, 0.0);

// Panel details (recessed)
let panel = box3(width * 0.6, height * 0.4, 0.02)
    .translate(0.0, 0.0, depth / 2.0 - 0.01);

body
    .union(top_edge)
    .union(bottom_edge)
    .union(handle)
    .union(handle.mirror_x())
    .subtract(panel)
    .subtract(panel.mirror_z())`
		},
		{
			title: 'Lattice Sphere',
			description: '3D repeating lattice pattern bounded by a sphere.',
			difficulty: 'Intermediate',
			code: `let cell_size = 0.5;
let strut_radius = 0.05;

// Struts along each axis
let strut_x = capsule(strut_radius, cell_size * 0.9).rotate_z(deg(90.0));
let strut_y = capsule(strut_radius, cell_size * 0.9);
let strut_z = capsule(strut_radius, cell_size * 0.9).rotate_x(deg(90.0));

// Junction sphere
let junction = sphere(strut_radius * 1.5);

// Unit cell
let unit_cell = strut_x
    .union(strut_y)
    .union(strut_z)
    .union(junction);

// Repeat in 3D (limited)
let lattice = unit_cell.repeat_limited(
    cell_size, cell_size, cell_size,
    3.0, 3.0, 3.0
);

// Bound with sphere
lattice.intersect(sphere(cell_size * 2.5))`
		},
		{
			title: 'Donut with Frosting',
			description: 'Organic shape blending demonstration.',
			difficulty: 'Beginner',
			code: `let donut = torus(0.5, 0.2);

// Frosting - larger torus with bottom cut off
let frosting_shape = torus(0.5, 0.22);
let cutter = box3(2.0, 0.5, 2.0).translate_y(-0.25);
let frosting = frosting_shape.subtract(cutter);

// Smooth blend
donut.smooth_union(frosting, 0.05)`
		}
	];
</script>

<svelte:head>
	<title>Examples - Soyuz</title>
</svelte:head>

<div class="container py-10 px-6 pb-16">
	<header class="mb-12">
		<h1 class="mb-3">Examples</h1>
		<p class="text-lg text-text-muted">
			Learn by example. Each script is complete and ready to run.
		</p>
	</header>

	<div class="flex flex-col gap-8">
		{#each examples as example (example.title)}
			<div class="card flex flex-col gap-4">
				<div class="flex items-center justify-between gap-4">
					<h2 class="text-xl">{example.title}</h2>
					<span class="tag">{example.difficulty}</span>
				</div>
				<p class="text-text-muted">{example.description}</p>
				<div class="border-2 border-border overflow-hidden">
					<CodeBlock
						code={example.code}
						filename="{example.title.toLowerCase().replace(/ /g, '_')}.rhai"
					/>
				</div>
			</div>
		{/each}
	</div>
</div>
