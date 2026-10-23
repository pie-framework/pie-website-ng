<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import { base } from '$app/paths';
	import DemoExperience from '$lib/components/demos/DemoExperience.svelte';
	import Diagram from '$lib/components/Diagram.svelte';
	import PageCards from '$lib/components/PageCards.svelte';
	import ExternalLink from '$lib/components/ExternalLink.svelte';
	import { sitePageFor } from '$lib/data/site';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
</script>
<Seo title="{data.experience.title} - Explore PIE" description={data.experience.summary} />
<div class="site-container">
	<a class="link link-primary text-sm" href="{base}/explore/">← All examples</a>
	<header class="mb-8 mt-6"><p class="eyebrow">{data.experience.category}</p><h1 class="page-title">{data.experience.title}</h1><p class="page-intro">{data.experience.summary}</p></header>
	<section aria-labelledby="live-example"><h2 id="live-example" class="sr-only">Live example</h2><DemoExperience kind={data.experience.kind} /></section>
	<section class="mt-12" id="learn"><h2 class="section-title">What to look for</h2><ul class="list-disc space-y-3 pl-6 text-base-content/80">{#each data.experience.learn as point}<li>{point}</li>{/each}</ul></section>
	{#if data.experience.kind === 'section'}
		<Diagram name="section-tool-placement" width={1008} height={678} alt="A section pairs passages and item cards with toolbars at passage, item and section scope." />
	{:else if data.experience.kind === 'authoring' || data.experience.kind === 'item'}
		<Diagram name="element-views" width={1028} height={626} alt="An element provides delivery and authoring views and a controller, with an optional print view." />
	{:else if data.experience.kind === 'tools'}
		<Diagram name="tool-policy-precedence" width={656} height={768} alt="Tool policy considers district, administration, item and profile rules, with the first matching rule deciding." />
	{/if}
	<section class="mt-12" id="integrate"><h2 class="section-title">Integration guides</h2><PageCards pages={data.experience.guides.map((guide) => ({ ...guide, summary: sitePageFor(guide.path)?.summary ?? 'Read the integration guide.' }))} /></section>
	<p class="mt-8 text-sm text-site-muted">Based on the player examples. <ExternalLink href={'https://github.com/pie-framework/pie-players/blob/develop/' + data.experience.source}>View source</ExternalLink>.</p>
</div>
