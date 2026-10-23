<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import { base } from '$app/paths';
	import PageCards from '$lib/components/PageCards.svelte';
	import { INTEGRATE_PAGES, BUILD_PAGES } from '$lib/data/site';
	const starts = [INTEGRATE_PAGES[0], INTEGRATE_PAGES[1], INTEGRATE_PAGES[4], BUILD_PAGES[1]];
</script>
<Seo title="Get started - PIE Framework" description="Choose your first task: embed an item, deliver a section with tools, integrate authoring or build an assessment interaction." />
<div class="site-container">
	<header class="mb-10"><p class="eyebrow">Get started</p><h1 class="page-title">Choose a starting point</h1><p class="page-intro">Each guide includes an example and the code to integrate it.</p></header>
	<section aria-labelledby="starting-points"><h2 id="starting-points" class="sr-only">Ways to start</h2><PageCards pages={starts} /></section>
	<section class="mt-12"><h2 class="section-title">Installation</h2><p class="max-w-3xl text-base-content/75">The players use HTML custom elements and work with any frontend framework. Install packages with npm or load a versioned script from a CDN. Your application supplies content, learner accounts and storage.</p><p class="mt-5"><a class="link link-primary" href="{base}/integrate/">Compare integration options</a> · <a class="link link-primary" href="{base}/docs/loading/">Loading options</a> · <a class="link link-primary" href="{base}/docs/versioning/">Versions and upgrades</a></p></section>
</div>
