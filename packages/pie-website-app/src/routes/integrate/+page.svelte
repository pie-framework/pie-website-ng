<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import { base } from '$app/paths';
	import { INTEGRATE_PAGES } from '$lib/data/site';
	import PageCards from '$lib/components/PageCards.svelte';
	import Diagram from '$lib/components/Diagram.svelte';
</script>
<Seo title="Integrate PIE - Players, tools and authoring" description="Embed an item, a section with learner tools, or item editors. Compare the integration options and find a guide." />
<header class="mb-10">
	<p class="eyebrow">Integrate PIE</p><h1 class="page-title">Players, tools and authoring</h1>
	<p class="page-intro">Embed an item or a section of questions, add learner tools, or include visual editors in your CMS.</p>
</header>
<section class="mb-12" id="choose">
	<h2 class="section-title">Integration options</h2>
	<div class="guide-table"><table class="table">
		<thead><tr><th>You need</th><th>Start with</th><th>Your application handles</th></tr></thead>
		<tbody>
			<tr><td>One question or an editor</td><td><a class="link link-primary" href="{base}/integrate/item-player/">Item player</a></td><td>Page layout, content and persistence</td></tr>
			<tr><td>One item with learner tools</td><td><a class="link link-primary" href="{base}/integrate/toolkit/">Item player + toolkit</a></td><td>Page layout and workflow</td></tr>
			<tr><td>Passages and several questions</td><td><a class="link link-primary" href="{base}/integrate/section-player/">Section player</a></td><td>Assessment navigation and backend</td></tr>
			<tr><td>A complete assessment flow</td><td><a class="link link-primary" href="{base}/integrate/assessment-shell/">Your shell + sections + toolkit</a></td><td>Timing, identity, storage and submission policy</td></tr>
		</tbody>
	</table></div>
</section>
<section id="building-blocks" class="mb-12">
	<h2 class="section-title">Integration guides</h2>
	<PageCards pages={INTEGRATE_PAGES} />
</section>
<section id="ownership">
	<h2 class="section-title">Application responsibilities</h2>
	<p class="text-base-content/75">PIE handles rendering and learner tools. Your application manages content, learner accounts, storage and assessment policy. The reference assessment player shows how to connect sections into an assessment.</p>
	<Diagram name="content-host-separation" width={1028} height={542} alt="PIE provides players, interaction rendering and learner tools. The host application provides content storage, identity, durable sessions and product policy." />
	<p><a class="link link-primary" href="{base}/docs/security/">Plan graded delivery</a> · <a class="link link-primary" href="{base}/docs/sessions/">Save and resume</a> · <a class="link link-primary" href="{base}/docs/versioning/">Choose exact package versions</a></p>
</section>
