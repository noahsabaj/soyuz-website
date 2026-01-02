<!--
  ComparisonTable.svelte

  Responsive comparison table component with highlighted primary column.
  Horizontal scroll on mobile, full display on desktop.
-->
<script lang="ts">
	interface Props {
		headers: string[];
		rows: { feature: string; values: string[] }[];
		highlightColumn?: number;
	}

	let { headers, rows, highlightColumn = 1 }: Props = $props();
</script>

<div class="overflow-x-auto -mx-6 px-6">
	<table class="w-full border-collapse min-w-[600px]">
		<thead>
			<tr>
				{#each headers as header, i}
					<th
						class="p-3 text-left text-sm font-semibold border-2 border-border bg-bg-alt"
						class:bg-accent-light={i === highlightColumn}
						class:text-accent={i === highlightColumn}
						class:font-bold={i === highlightColumn}
					>
						{header}
					</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each rows as row}
				<tr>
					<td class="p-3 text-sm border-2 border-border bg-surface font-medium">{row.feature}</td>
					{#each row.values as value, i}
						<td
							class="p-3 text-sm border-2 border-border"
							class:bg-accent-light={i + 1 === highlightColumn}
							class:bg-surface={i + 1 !== highlightColumn}
						>
							{value}
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.bg-accent-light {
		background-color: #e8eeeb;
	}
</style>
