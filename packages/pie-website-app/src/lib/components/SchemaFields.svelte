<script lang="ts">
	import type { SchemaField } from '$lib/data/element-example';
	let { fields }: { fields: SchemaField[] } = $props();
</script>
<div class="guide-table"><table>
	<thead><tr><th>Field</th><th>Type</th><th>Meaning</th><th>Default / values</th></tr></thead>
	<tbody>{#each fields as field (field.name)}
		<tr>
			<td><code>{field.name}</code>{#if field.required}<span class="mt-1 block text-xs">Required</span>{/if}</td>
			<td><code>{field.type}</code></td>
			<td>{field.description || 'See the named type or the example model.'}</td>
			<td><code>{field.defaultValue}</code>{#if field.values}<span class="mt-2 block text-xs">{field.values}</span>{/if}</td>
		</tr>
	{/each}</tbody>
</table></div>
