<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import { afterNavigate } from '$app/navigation';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
	let query = $state('');
	afterNavigate(() => { query = page.url.searchParams.get('q') ?? ''; });
	const words = $derived(query.toLowerCase().trim().split(/\s+/).filter(Boolean));
	const results = $derived(words.length ? data.entries.filter((entry) => words.every((word) => entry.text.toLowerCase().includes(word)))
		.map((entry) => ({ ...entry, score: words.reduce((score, word) => score + (entry.title.toLowerCase().includes(word) ? 20 : entry.summary.toLowerCase().includes(word) ? 5 : 1), 0) }))
		.sort((left, right) => right.score - left.score) : []);
</script>
<Seo title="Search PIE - Guides, elements and examples" description="Search PIE integration guides, interaction-development material, element types and working examples." noindex />
<div class="site-container reading-page">
	<header class="mb-8"><p class="eyebrow">Search</p><h1 class="page-title">Guides, elements and examples</h1></header>
	<form action="{base}/search/" method="get" role="search" aria-label="Content search">
		<label for="site-search" class="mb-2 block font-medium">Search the site</label>
		<div class="flex gap-2"><input id="site-search" name="q" type="search" class="input site-input min-w-0 w-full" bind:value={query} placeholder="Try save answers, calculator, authoring…" /><button class="btn btn-primary" type="submit">Search</button></div>
	</form>
	<p role="status" class="my-6 text-sm text-site-muted">{words.length ? results.length + ' results' : 'Search on-site guides, element types and working examples.'}</p>
	{#if words.length}
		<ul class="divide-y divide-base-300">
			{#each results.slice(0, 40) as result (result.path)}
				<li class="py-5"><p class="mb-1 text-xs text-site-muted">{result.category}</p><a href="{base}{result.path}" class="text-xl font-semibold text-primary hover:underline">{result.title}</a><p class="mt-2 text-base-content/75">{result.summary}</p></li>
			{/each}
		</ul>
		{#if !results.length}<p class="my-8">No matches. Try fewer words or a task such as “save”, “read aloud”, “calculator” or “new interaction”.</p>{/if}
		{#if results.length > 40}<p class="my-6 text-sm">Showing the first 40 results. Add a more specific term to narrow the search.</p>{/if}
	{:else}
		<div class="mt-8 flex flex-wrap gap-4"><a class="link link-primary" href="{base}/get-started/">Get started</a><a class="link link-primary" href="{base}/docs/">Browse the guides</a><a class="link link-primary" href="{base}/elements/">Browse elements</a></div>
	{/if}
</div>
