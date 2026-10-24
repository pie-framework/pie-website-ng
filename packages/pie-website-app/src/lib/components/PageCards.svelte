<script lang="ts">
	import { base } from '$app/paths';
	import type { SitePage } from '$lib/data/site';
	import SiteIcon from './SiteIcon.svelte';
	let { pages }: { pages: Pick<SitePage, 'path' | 'label' | 'summary'>[] } = $props();
</script>
<div class="page-links">
	{#each pages as entry (entry.path)}
		<a href="{base}{entry.path}" class="page-link">
			<h3 class="mb-2 text-lg font-semibold">{entry.label} <SiteIcon name="arrow-right" /></h3>
			<p class="text-sm leading-relaxed text-base-content/75">{entry.summary}</p>
		</a>
	{/each}
</div>

<style>
	.page-links { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: 2rem; }
	.page-link { padding: 1rem 0 1.125rem; border-top: 1px solid var(--color-base-300); }
	h3 { display: flex; align-items: center; justify-content: space-between; gap: 1rem; color: var(--color-base-content); transition: color 150ms ease; }
	.page-link:hover h3 { color: var(--color-primary); }
	@media (max-width: 600px) { .page-links { grid-template-columns: minmax(0, 1fr); } }
</style>
