<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
 import { base } from '$app/paths';
 import HomepageExperience from '$lib/components/HomepageExperience.svelte';
 import PageCards from '$lib/components/PageCards.svelte';
 import Diagram from '$lib/components/Diagram.svelte';
 import SiteIcon from '$lib/components/SiteIcon.svelte';
 import PartnerCredits from '$lib/components/PartnerCredits.svelte';
 import ExternalLink from '$lib/components/ExternalLink.svelte';
 import { ELEMENTS } from '$lib/data/elements';
 import { SITES } from '$lib/data/links';
 import { deliveryCapture } from '$lib/data/element-captures';
 import { INTEGRATE_PAGES } from '$lib/data/site';
 const featured = ELEMENTS.filter((element) => ['multiple-choice', 'fraction-model', 'categorize', 'graphing'].includes(element.name));
</script>
<Seo title="PIE Framework - Portable Interactions and Elements" description="Open-source assessment players, learner tools and item editors. Use PIE's interaction library or build your own question types." />

<div class="site-container home-page">
 <header class="home-hero">
  <h1 class="home-title"><span>Portable Interactions</span> <span>and Elements</span></h1>
  <p class="hero-description">Open-source players, learner tools and item editors for assessment applications. Use the interaction library or build your own question types.</p>
  <div class="hero-actions">
   <a class="btn btn-primary" href="{base}/integrate/">Integrate PIE <SiteIcon name="arrow-right" /></a>
   <a class="btn btn-outline" href="{base}/build/">Build interactions</a>
  </div>
 </header>

 <HomepageExperience />

 <section id="ownership" class="ownership-section">
  <div class="ownership-copy">
   <h2 class="section-title">How PIE<br class="hidden lg:block" /> fits</h2>
   <p>PIE renders and edits items, arranges sections, provides learner tools and reports responses and scores.</p>
   <p>Your application manages content, learner accounts, storage, assessment navigation and submission.</p>
   <a class="text-link" href="{base}/integrate/assessment-shell/">Assessment integration guide <SiteIcon name="arrow-right" /></a>
  </div>
  <Diagram name="home-browser-backend" width={1008} height={648} alt="The host application embeds PIE players and the toolkit in the browser. The host's servers own content, learner sessions, scores, identity and infrastructure." class="ownership-diagram" />
 </section>

 <nav class="discovery-links" aria-label="Explore PIE">
  <a class="fraction-link" href="{base}/elements/fraction-model/"><img src="{base}/images/editorial/fraction-preview.png" width="64" height="64" alt="" loading="lazy" /><span>Try a fraction</span></a>
  <a href="{base}/elements/"><SiteIcon name="book-open" /><span><strong>Explore the element library <SiteIcon name="arrow-right" /></strong><small>Browse interaction types and examples.</small></span></a>
  <a href="{base}/docs/"><SiteIcon name="file-text" /><span><strong>Read the integration guides <SiteIcon name="arrow-right" /></strong><small>Add PIE to your application.</small></span></a>
 </nav>

 <section id="integrate" class="home-section">
  <div class="section-heading"><h2 class="section-title">Players, tools and authoring</h2><a class="text-link" href="{base}/integrate/">All integrations <SiteIcon name="arrow-right" /></a></div>
  <PageCards pages={[INTEGRATE_PAGES[0], INTEGRATE_PAGES[1], INTEGRATE_PAGES[2], INTEGRATE_PAGES[4]]} />
 </section>

 <section id="elements" class="home-section">
  <div class="section-heading"><h2 class="section-title">Questions, content and rubrics</h2><a class="text-link" href="{base}/elements/">Element library <SiteIcon name="arrow-right" /></a></div>
  <p class="section-description">Questions in choice, text, math and other formats, plus passages, video and rubrics. Try every sample in the <ExternalLink href={SITES.elementsDemo}>live sample library</ExternalLink>.</p>
  <div class="element-previews">
   {#each featured as element (element.name)}
    {@const capture = deliveryCapture(element.name)}
    <a href="{base}/elements/{element.name}/" class="element-preview">
     <div class="preview-image"><img src="{base}/images/elements/{capture.file}" alt={capture.alt} width={capture.width} height={capture.height} loading="lazy" /></div>
     <h3>{element.displayName} <SiteIcon name="arrow-right" /></h3><p>{capture.caption}</p>
    </a>
   {/each}
  </div>
  <a class="text-link mt-6" href="{base}/build/how-elements-work/">How elements work <SiteIcon name="arrow-right" /></a>
 </section>

 <section id="adoption" class="home-section">
  <h2 class="section-title">Integration guides</h2>
  <PageCards pages={[
   { path: '/docs/accessibility/', label: 'Accessibility', summary: 'Learner supports, content alternatives and WCAG testing.' },
   { path: '/docs/sessions/', label: 'Save and resume', summary: 'Save responses and restore an attempt.' },
   { path: '/docs/security/', label: 'Graded delivery', summary: 'Protect answer keys and score responses on your server.' },
   { path: '/docs/theming/', label: 'Themes and branding', summary: 'Set colors, fonts and learner color schemes.' }
  ]} />
 </section>

 <aside class="qti-note">
  <h2 class="section-title">Already have QTI content?</h2>
  <div><p>PIE-QTI has full-featured QTI item and assessment players that work independently of PIE. It also includes QTI ↔ PIE conversion tools.</p>
  <a class="text-link mt-4" href="{base}/qti/">About PIE-QTI <SiteIcon name="arrow-right" /></a></div>
 </aside>
 <section class="partners-section" aria-labelledby="partners-heading">
  <div class="section-heading"><h2 id="partners-heading" class="section-title">Supported by</h2><a class="text-link" href="{base}/about/#partners">Sponsors and partners <SiteIcon name="arrow-right" /></a></div>
  <PartnerCredits />
 </section>
</div>

<style>
 .home-page { padding-top: 2rem; }
 .home-hero { display: grid; grid-template-columns: minmax(0, 1fr) 13rem; gap: 0.875rem 3rem; margin-bottom: 2.25rem; }
 .home-title { grid-column: 1; margin: 0; font-family: var(--font-editorial); font-size: clamp(3rem, 6.9vw, 5.5rem); font-weight: 500; line-height: 0.99; letter-spacing: -0.04em; }
 .home-title span { display: block; }
 .hero-description { grid-column: 1; max-width: 35rem; font-size: clamp(1.05rem, 2vw, 1.3rem); line-height: 1.6; color: var(--site-muted); }
 .hero-actions { grid-column: 2; grid-row: 1 / span 2; align-self: end; display: flex; flex-direction: column; gap: 0.875rem; padding-bottom: 1rem; }
 .hero-actions .btn { min-height: 3rem; padding-inline: 1.1rem; font-size: 1rem; }
 .hero-actions .btn-primary { background: var(--pie-brand-orange); border-color: var(--pie-brand-orange); color: #fff; font-size: 1.17rem; font-weight: 700; }
 .hero-actions .btn-primary:hover { background: #d64120; border-color: #d64120; }
 .hero-actions :global(.site-icon) { margin-left: auto; }
 .ownership-section { display: grid; grid-template-columns: 13rem minmax(0, 1fr); align-items: center; gap: 2rem; padding-top: 2rem; border-top: 1px solid var(--color-base-300); }
 .ownership-copy p { margin-bottom: 1rem; color: var(--site-muted); font-size: 0.95rem; line-height: 1.75; }
 .ownership-copy .section-title { font-size: clamp(2.5rem, 4vw, 3.2rem); }
 .ownership-section :global(.site-diagram) { margin-block: 0; }
 .ownership-section :global(.diagram-paper) { border: 0; }
 .text-link { display: inline-flex; align-items: center; gap: 0.5rem; color: var(--color-primary); font-size: 0.875rem; font-weight: 500; line-height: 1.6; }
 .text-link:hover { text-decoration: underline; text-underline-offset: 0.2em; }
 .discovery-links { display: grid; grid-template-columns: 12rem 1fr 1fr; gap: 1.5rem; align-items: center; margin: 1.5rem 0 4.5rem; }
 .discovery-links > a { display: flex; align-items: center; gap: 0.75rem; color: var(--color-primary); }
 .discovery-links > a + a { border-left: 1px solid var(--color-base-300); padding-left: 1.5rem; }
 .discovery-links > a > :global(.site-icon) { font-size: 1.5rem; }
 .discovery-links strong { font-weight: 500; font-size: 0.9rem; }
 .discovery-links small { display: block; margin-top: 0.2rem; color: var(--site-muted); font-size: 0.75rem; line-height: 1.5; }
 .discovery-links a:hover strong { text-decoration: underline; text-underline-offset: 0.2em; }
 .fraction-link img { width: 3.5rem; height: 3.5rem; object-fit: contain; background: #fff; border-radius: 50%; }
 .fraction-link span { font-family: var(--font-annotation); font-size: 1.3rem; transform: rotate(-3deg); }
 .home-section { margin-bottom: 4rem; }
 .section-heading { display: flex; align-items: baseline; justify-content: space-between; gap: 1rem; }
 .section-description { max-width: 48rem; color: var(--site-muted); line-height: 1.75; margin-bottom: 1.75rem; }
 .element-previews { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 1.25rem; }
 .preview-image { display: flex; align-items: center; height: 12rem; padding: 0.75rem; background: #fff; border: 1px solid var(--color-base-300); border-radius: 0.375rem; overflow: hidden; }
 .preview-image img { max-height: 100%; width: 100%; object-fit: contain; }
 .element-preview h3 { display: flex; justify-content: space-between; align-items: center; margin-top: 1rem; font-size: 1rem; font-weight: 600; }
 .element-preview p { margin-top: 0.5rem; font-size: 0.8rem; line-height: 1.7; color: var(--site-muted); }
 .element-preview:hover h3 { color: var(--color-primary); }
 .qti-note { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; padding: 2rem 0; border-top: 1px solid var(--color-base-300); }
 .qti-note .section-title { font-size: 2rem; }
 .qti-note p { font-size: 0.95rem; line-height: 1.75; color: var(--site-muted); }
 .partners-section { border-top: 1px solid var(--color-base-300); padding-top: 2rem; }
 .partners-section .section-title { font-size: 2rem; }
 @media (max-width: 900px) {
  .home-hero { grid-template-columns: minmax(0, 1fr); gap: 1.5rem; }
  .home-title { font-size: clamp(3rem, 8.5vw, 4.75rem); }
  .hero-actions { grid-column: 1; grid-row: auto; flex-direction: row; justify-content: flex-start; flex-wrap: wrap; padding-bottom: 0; }
  .hero-actions .btn { min-width: 11rem; }
  .hero-actions :global(.site-icon) { margin-left: 0.5rem; }
  .ownership-section { grid-template-columns: minmax(0, 1fr); gap: 1rem; }
  .ownership-copy { max-width: 42rem; }
  .ownership-copy p { display: inline; }
  .ownership-copy p + p::before { content: ' '; }
  .ownership-copy .text-link { display: flex; margin-top: 1rem; }
  .discovery-links { grid-template-columns: 1fr 1fr; }
  .discovery-links .fraction-link { display: none; }
  .discovery-links > a:nth-child(2) { border-left: 0; padding-left: 0; }
  .element-previews { grid-template-columns: repeat(2, minmax(0, 1fr)); }
 }
 @media (max-width: 600px) {
  .home-page { padding-top: 2rem; }
  .home-title { font-size: clamp(2.2rem, 9.2vw, 3.5rem); line-height: 1.03; }
  .hero-description { font-size: 1rem; }
  .hero-actions { gap: 0.6rem; }
  .hero-actions .btn { min-width: 0; font-size: 0.875rem; padding-inline: 0.8rem; }
  .hero-actions .btn-primary { background: var(--color-primary); border-color: var(--color-primary); color: var(--color-primary-content); }
  .section-heading { display: block; margin-bottom: 1.5rem; }
  .section-heading .section-title { margin-bottom: 0.5rem; }
  .discovery-links { grid-template-columns: minmax(0, 1fr); gap: 1.25rem; margin-bottom: 3rem; }
  .discovery-links > a + a { border: 0; padding-left: 0; }
  .element-previews { gap: 1.5rem 1rem; }
  .preview-image { height: 9rem; padding: 0.5rem; }
  .element-preview h3 { font-size: 0.875rem; }
  .qti-note { grid-template-columns: minmax(0, 1fr); gap: 0; }
 }
</style>
