<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import { base } from '$app/paths';
	import PageCards from '$lib/components/PageCards.svelte';
	import Diagram from '$lib/components/Diagram.svelte';
	import { BUILD_PAGES } from '$lib/data/site';
</script>
<Seo title="Build interactions - PIE Framework" description="Create question types for PIE players, or adapt the existing element library. Learn the model, session, controller and view contracts." />
<header class="mb-10"><p class="eyebrow">Build interactions</p><h1 class="page-title">Create a question type</h1><p class="page-intro">PIE elements define how a question is edited, displayed and scored. You can adapt an existing element or build one that works with the same players.</p></header>
<section id="choose" class="mb-12">
	<h2 class="section-title">Before building a new element</h2>
	<ol class="list-decimal space-y-4 pl-6 text-base-content/80">
		<li><strong>Configure an existing element.</strong> Change its authored content or editor settings. <a class="link link-primary" href="{base}/elements/">Browse the library</a>.</li>
		<li><strong>Compose an item.</strong> Combine existing interaction elements in markup with one model per instance. <a class="link link-primary" href="{base}/integrate/item-player/">Use the item player</a>.</li>
		<li><strong>Customize the application.</strong> Add a layout, tool or provider. <a class="link link-primary" href="{base}/integrate/extending/">See extension points</a>.</li>
		<li><strong>Create an interaction.</strong> Implement a new response behavior and its authoring view against the element contract.</li>
	</ol>
</section>
<section id="learn" class="mb-12"><h2 class="section-title">Element development guides</h2><PageCards pages={BUILD_PAGES} /></section>
<section id="philosophy">
	<h2 class="section-title">How an element works</h2>
	<p class="text-base-content/75">The model describes the question; the session holds the learner's response. A controller prepares the data for each mode and role, and can score the response. Delivery and authoring views use HTML custom elements, so they work across frontend frameworks.</p>
	<Diagram name="element-package" width={1028} height={692} alt="An element package exports delivery, authoring and controller modules, plus an optional print view. The host and player communicate through the shared model and session contracts." />
	<p class="text-base-content/75">The library includes React and Svelte implementations you can use as examples, including accessibility, validation and packaging.</p>
</section>
