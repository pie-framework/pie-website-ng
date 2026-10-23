<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import { base } from '$app/paths';
	import { EXPERIENCES } from '$lib/data/examples';
	let category = $state('All');
	const categories = ['All', 'Delivery', 'Learner supports', 'Authoring', 'Integration'];
	const examples = $derived(EXPERIENCES.filter((entry) => category === 'All' || entry.category === category));
</script>
<Seo title="Explore PIE - Examples" description="Try PIE players, learner tools, item editors, practice questions and video lessons." />
<div class="site-container">
	<header class="mb-10"><p class="eyebrow">Explore</p><h1 class="page-title">Examples</h1><p class="page-intro">Try the players, tools and editors. Each example links to its integration guide and source.</p></header>
	<div class="mb-8 flex flex-wrap items-center justify-between gap-4">
		<label class="flex items-center gap-3 font-medium">Show
			<select class="site-select" bind:value={category}>{#each categories as name}<option>{name}</option>{/each}</select>
		</label>
		<p role="status" class="text-sm text-site-muted">{examples.length} examples</p>
	</div>
	<div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
		{#each examples as example (example.slug)}
			<a href="{base}/explore/{example.slug}/" class="rounded-box border border-base-300 p-6 hover:border-primary">
				<p class="eyebrow">{example.category}</p><h2 class="mb-3 text-xl font-semibold text-secondary">{example.title}</h2><p class="text-base-content/75">{example.summary}</p><p class="mt-5 font-medium text-primary">Try the example <span aria-hidden="true">→</span></p>
			</a>
		{/each}
	</div>
	<aside class="mt-12 border-t border-base-300 pt-8"><h2 class="section-title">Element examples</h2><p class="text-base-content/75">The element library has examples and data reference for each question type.</p><a href="{base}/elements/" class="btn btn-outline mt-4">Browse the element library</a></aside>
</div>
