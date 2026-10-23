<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import { base } from '$app/paths';
	import ExternalLink from '$lib/components/ExternalLink.svelte';
	import Diagram from '$lib/components/Diagram.svelte';
	import { SITES } from '$lib/data/links';
</script>
<Seo title="QTI and PIE - Independent players and interoperability" description="PIE-QTI provides standalone QTI item and assessment players independently of PIE, plus packages for optional conversion between QTI and PIE." />
<div class="site-container reading-page">
	<header class="mb-10"><p class="eyebrow">Related project</p><h1 class="page-title">QTI players and conversion</h1><p class="page-intro">PIE-QTI has full-featured QTI item and assessment players that run independently of PIE. You can play QTI content directly, without conversion.</p></header>
	<section id="delivery" class="mb-10">
		<h2 class="section-title">Standalone QTI delivery</h2>
		<p class="leading-relaxed text-base-content/75">The players support QTI 2.x and 3.0, with response processing, assessment navigation, session control, themes and localization. You can also add custom interaction renderers.</p>
		<p class="mt-4 text-base-content/75">The players are in beta. Check the project's status and conformance reports for supported content and certification details, and test your own items.</p>
		<div class="mt-5 flex flex-wrap gap-3"><ExternalLink href={SITES.qtiExamples} class="btn btn-primary">Try the QTI examples</ExternalLink><ExternalLink href={SITES.qti} class="btn btn-outline">QTI documentation</ExternalLink></div>
	</section>
	<section id="conversion" class="mb-10">
		<h2 class="section-title">Optional QTI ↔ PIE conversion</h2>
		<p class="leading-relaxed text-base-content/75">Packages and CLI tools convert between QTI and PIE. A CMS can use them to import or export content.</p>
		<Diagram name="qti-pie-independent-paths" format="png" width={1008} height={520} alt="QTI content goes directly to the standalone QTI player, while PIE content goes directly to PIE players. Optional conversion connects the two content formats." caption="Each format has its own players. Conversion is optional." />
	</section>
	<section id="standards" class="mb-10">
		<h2 class="section-title">Standards in PIE</h2>
		<p class="leading-relaxed text-base-content/75">PIE's assessment structure and accessibility catalogs draw on QTI concepts. Learner profiles follow AfA PNP 3.0. QTI conversion is optional.</p>
		<p class="mt-4"><a class="link link-primary" href="{base}/integrate/">Integrate PIE players</a> · <a class="link link-primary" href="{base}/docs/tool-policy/">Learner profiles</a> · <a class="link link-primary" href="{base}/docs/accessibility-catalogs/">Accessibility catalogs</a></p>
	</section>
	<p class="border-t border-base-300 pt-6 text-sm text-site-muted"><ExternalLink href="https://github.com/pie-framework/pie-qti/blob/master/STATUS.md">PIE-QTI current status</ExternalLink> · <ExternalLink href="https://github.com/pie-framework/pie-qti">Source repository</ExternalLink></p>
</div>
