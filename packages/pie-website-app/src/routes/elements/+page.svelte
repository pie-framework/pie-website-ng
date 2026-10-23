<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
 import ExternalLink from '$lib/components/ExternalLink.svelte';
 import { base } from '$app/paths';
 import { ELEMENTS, ELEMENT_GROUPS, groupAnchor } from '$lib/data/elements';
 import { SITES } from '$lib/data/links';
 import { deliveryCapture } from '$lib/data/element-captures';
 let query = $state('');
 let group = $state('All');
 let view = $state('all');
 const visible = $derived(ELEMENTS.filter((element) => {
  const words = (element.displayName + ' ' + element.name + ' ' + element.group + ' ' + deliveryCapture(element.name).caption).toLowerCase();
  return words.includes(query.toLowerCase().trim()) && (group === 'All' || element.group === group) && (view === 'all' || (view === 'authoring' ? element.views.authoring : element.views.print));
 }));
 const filtered = $derived(query.trim() !== '' || group !== 'All' || view !== 'all');
 function reset() { query = ''; group = 'All'; view = 'all'; }
</script>
<Seo title="Element library - PIE Framework" description="Browse PIE question types, content and rubrics, with examples, supported views and data reference." />
<div class="site-container">
 <header class="mb-8"><p class="eyebrow">Element library</p><h1 class="page-title">Questions, content and rubrics</h1><p class="page-intro">Interactions, passages, video and rubrics, each with its supported views and data reference.</p><p class="mt-5"><ExternalLink class="btn btn-primary" href={SITES.elementsDemo}>Open the live sample library</ExternalLink></p></header>
 <form class="mb-8 flex flex-wrap items-end gap-4" onsubmit={(event) => event.preventDefault()}>
  <label class="min-w-48 flex-1 font-medium">Find an element<input class="input site-input mt-2 block w-full" type="search" bind:value={query} placeholder="Name, task or interaction family" /></label>
  <label class="font-medium">Family<select class="site-select mt-2 block" bind:value={group}><option>All</option>{#each ELEMENT_GROUPS as name}<option>{name}</option>{/each}</select></label>
  <label class="font-medium">Required view<select class="site-select mt-2 block" bind:value={view}><option value="all">Any</option><option value="authoring">Authoring</option><option value="print">Print</option></select></label>
  <button type="button" class="btn btn-ghost" onclick={reset}>Clear filters</button>
 </form>
 <p role="status" class="mb-5 text-sm text-site-muted">{filtered ? visible.length + ' matching ' + (visible.length === 1 ? 'element' : 'elements') : ''}</p>
 {#each ELEMENT_GROUPS as family (family)}
 {@const items = visible.filter((element) => element.group === family)}
 {#if items.length}
 <section id={groupAnchor(family)} class="mb-12"><h2 class="section-title">{family}</h2>
 <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
  {#each items as element (element.name)}
   {@const capture = deliveryCapture(element.name)}
   <a href="{base}/elements/{element.name}/" class="overflow-hidden rounded-box border border-base-300 hover:border-primary">
    <div class="flex h-52 items-center bg-white p-4"><img src="{base}/images/elements/{capture.file}" alt={capture.alt} width={capture.width} height={capture.height} loading="lazy" class="max-h-full w-full object-contain" /></div>
    <div class="p-5"><p class="mb-2 text-xs text-site-muted">{element.group} · {element.kind === 'question' ? 'Interaction' : element.kind === 'content' ? 'Content' : 'Rubric'}</p><h3 class="mb-2 text-xl font-semibold text-primary">{element.displayName}</h3><p class="text-sm text-base-content/75">{capture.caption}</p><p class="mt-4 text-xs text-site-muted">Authoring: {element.views.authoring ? 'yes' : 'no'} · Print: {element.views.print ? 'yes' : 'no'}</p></div>
   </a>
  {/each}
 </div></section>
 {/if}
 {/each}
 {#if visible.length === 0}<p class="py-10">No elements match these filters. <button class="btn btn-ghost" onclick={reset}>Show all elements</button></p>{/if}
 <section class="mt-12 border-t border-base-300 pt-8"><h2 class="section-title">Custom interactions</h2><p class="text-base-content/75">Adapt an existing element, combine several in an item, or build a new type.</p><a class="btn btn-outline mt-4" href="{base}/build/">Build interactions</a></section>
</div>
