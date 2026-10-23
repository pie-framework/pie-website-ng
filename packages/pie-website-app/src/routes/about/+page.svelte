<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
 import { base } from '$app/paths';
 import ExternalLink from '$lib/components/ExternalLink.svelte';
 import PartnerCredits from '$lib/components/PartnerCredits.svelte';
 import { REPOS, SITES } from '$lib/data/links';
 import { ELEMENT_COUNT, AUTHORING_COUNT, PRINT_COUNT } from '$lib/data/elements';
</script>

<Seo title="About and community - PIE Framework" description="Why PIE, its projects, sponsors and development partners, and how to contribute." />
<div class="site-container max-w-5xl">
 <header class="mb-12">
  <p class="eyebrow">About and community</p>
  <h1 class="page-title">About PIE</h1>
  <p class="page-intro">PIE is an open-source framework for authoring and delivering assessment items.</p>
  <nav class="mt-6" aria-label="About PIE sections">
   <ul class="flex flex-wrap gap-x-6 gap-y-3 text-sm text-primary">
    <li><a class="link link-hover" href="#philosophy">Why PIE?</a></li>
    <li><a class="link link-hover" href="#projects">Projects</a></li>
    <li><a class="link link-hover" href="#partners">Sponsors and partners</a></li>
    <li><a class="link link-hover" href="#community">Contribute</a></li>
    <li><a class="link link-hover" href="#history">History and licensing</a></li>
   </ul>
  </nav>
 </header>

 <section id="philosophy" class="mb-12 guide-prose">
  <h2>Why PIE?</h2>
  <p>An assessment item should work in more than one application. PIE separates question content from learner responses and the delivery environment. Its elements share a contract, so applications can use the library, combine elements in an item, or add new types.</p>
  <p>The players and elements use HTML custom elements. You can choose your frontend framework and backend, and control how content is stored, assessments are delivered and results are reported.</p>
  <p><a href="{base}/integrate/">Integrate PIE →</a> · <a href="{base}/build/">Build interactions →</a></p>
 </section>

 <section id="projects" class="mb-12">
  <h2 class="section-title">Projects</h2>
  <div class="space-y-6">
   <div class="border-l-2 border-primary pl-5"><h3 class="text-xl font-semibold text-secondary">PIE Players</h3><p class="my-3 leading-relaxed text-base-content/75">Item and section players, the assessment toolkit, learner tools, print and item summaries. A reference assessment player shows how to combine them.</p><ExternalLink href={REPOS.piePlayers}>Source and contributions</ExternalLink> · <a class="link link-primary" href="{base}/integrate/">Integration guides</a></div>
   <div class="border-l-2 border-primary pl-5"><h3 class="text-xl font-semibold text-secondary">PIE Elements</h3><p class="my-3 leading-relaxed text-base-content/75">{ELEMENT_COUNT} interaction, content and rubric types, with React and Svelte implementations. {AUTHORING_COUNT} include editors; {PRINT_COUNT} include print views.</p><ExternalLink href={REPOS.pieElementsNg}>Source and contributions</ExternalLink> · <a class="link link-primary" href="{base}/elements/">Element library</a></div>
   <div class="border-l-2 border-base-300 pl-5"><h3 class="text-xl font-semibold text-secondary">PIE-QTI</h3><p class="my-3 leading-relaxed text-base-content/75">Full-featured QTI item and assessment players that run independently of PIE, plus QTI ↔ PIE conversion tools.</p><a class="link link-primary" href="{base}/qti/">About PIE-QTI →</a></div>
  </div>
 </section>

 <section id="partners" class="mb-12">
  <span id="sponsors" class="guide-anchor"></span>
  <h2 class="section-title">Sponsors and partners</h2>
  <PartnerCredits />
 </section>

 <section id="evidence" class="mb-12 guide-prose">
  <h2>Accessibility</h2>
  <p>PIE targets WCAG 2.2 AA. Authors supply accessible content and alternatives; applications need testing with their content and learner tasks.</p>
  <p>See <a href="{base}/docs/accessibility/">accessibility</a> and <a href="{base}/status/">project status</a> for test coverage and known gaps. Optional calculator and speech providers have their own requirements and terms.</p>
 </section>

 <section id="community" class="mb-12 guide-prose">
  <h2>Contribute</h2>
  <p>Report bugs and suggest improvements in the relevant repository. For a bug report, include versions, loading strategy, expected behavior and a reproducible example using content you can share.</p>
  <ul>
   <li><ExternalLink href={SITES.slack}>Join the PIE community</ExternalLink> to discuss integrations and interaction development.</li>
   <li><ExternalLink href={REPOS.piePlayers + '/issues'}>Player and toolkit issues</ExternalLink> cover delivery, learner tools and host integration.</li>
   <li><ExternalLink href={REPOS.pieElementsNg + '/issues'}>Element issues</ExternalLink> cover existing interactions, authoring, accessibility and new types.</li>
   <li><ExternalLink href="https://github.com/pie-framework/pie-website-ng/issues">Website issues</ExternalLink> cover guides, examples and documentation.</li>
  </ul>
 </section>

 <section id="history" class="guide-prose">
  <h2>History and licensing</h2>
  <p>PIE originated in CoreSpring's work on assessment authoring and rendering.</p>
  <p>The current pie-players, pie-elements-ng and pie-qti repositories declare the MIT license. Legacy pie-elements and pie-lib use ISC. Check the packages and optional providers used in your deployment.</p>
 </section>
</div>
