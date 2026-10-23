<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
 import { base } from '$app/paths';
 import PageCards from '$lib/components/PageCards.svelte';
 import { GUIDE_PAGES } from '$lib/data/site';
 const groups = [...new Set(GUIDE_PAGES.map((entry) => entry.group!))];
</script>
<Seo title="Guides and reference - PIE Framework" description="On-site PIE integration guides, interaction-development material, learner supports, backend recipes and API reference." />
<header class="mb-10"><p class="eyebrow">Docs</p><h1 class="page-title">Guides and reference</h1><p class="page-intro">Integration guides, learner tools and API reference, with links to the source documentation.</p></header>
<form action="{base}/search/" method="get" role="search" aria-label="Content search" class="mb-10">
 <label for="docs-search" class="mb-2 block font-medium">Search guides, interactions and examples</label>
 <div class="flex gap-2"><input class="input site-input min-w-0 w-full" type="search" name="q" id="docs-search" placeholder="Try save answers, read aloud, new interaction…" /><button class="btn btn-primary" type="submit">Search</button></div>
</form>
<section class="mb-12" id="start"><h2 class="section-title">Start here</h2><PageCards pages={[
 { path: '/integrate/', label: 'Integrate PIE', summary: 'Add players, tools and editors to an application.' },
 { path: '/build/', label: 'Build interactions', summary: 'Create or extend a question type.' }
]} /></section>
{#each groups as group (group)}
 <section id={group.toLowerCase().replaceAll(' ', '-')} class="mb-12">
  <h2 class="section-title">{group}</h2><PageCards pages={GUIDE_PAGES.filter((entry) => entry.group === group)} />
 </section>
{/each}
