<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import { base } from '$app/paths';
	import { ITEM_PLAYER_VERSION } from '$lib/versions';
	import { AUTHORING_COUNT, ELEMENT_COUNT, PRINT_COUNT } from '$lib/data/elements';
	import ExternalLink from '$lib/components/ExternalLink.svelte';
</script>
<Seo title="Project status - PIE Framework" description="PIE release policy, supported components, accessibility testing and known limitations." />
<div class="site-container max-w-5xl">
	<header class="mb-10"><p class="eyebrow">Project status</p><h1 class="page-title">Releases and limitations</h1><p class="page-intro">Release policies, test coverage and things to check before integrating.</p></header>
	<div class="guide-prose">
		<h2 id="scope">Components and the reference assessment player</h2>
		<p>The item and section players, assessment toolkit, tools, theme and print player are the project's production components.</p>
		<p>The assessment player is a reference implementation using those components. It can change without the same compatibility guarantees. Your application manages accounts, content, storage, navigation, timing and submission.</p>
		<h2 id="versions">Pin the versions you test</h2>
		<p>Site examples use player suite version <code>{ITEM_PLAYER_VERSION}</code>. Install all packages in the suite at the same exact version.</p>
		<p>The suite's documented policy permits breaking changes in patch releases. Read the intervening changelogs before upgrading. Element packages version independently, and item content names the exact element versions it uses.</p>
		<p><a href="{base}/docs/versioning/">Versions and upgrades</a> · <a href="{base}/docs/migration/">Legacy-player migration</a></p>
		<h2 id="coverage">Element and view coverage</h2>
		<p>The library has {ELEMENT_COUNT} types: {AUTHORING_COUNT} with editors and {PRINT_COUNT} with print views. Each element page lists its supported views and scoring behavior.</p>
		<p>Data reference comes from versioned schema snapshots. Use the schema matching your element version. Documentation and examples link to their source revisions.</p>
		<h2 id="accessibility">Accessibility target and evidence</h2>
		<p>PIE targets WCAG 2.2 AA. Automated and browser tests run, but manual assistive-technology testing is incomplete and known issues remain. Test the complete application with your content.</p>
		<p>Some interface translations are generated and unreviewed. Accessibility catalogs can also hold alternative content types that require a custom renderer.</p>
		<p><a href="{base}/docs/accessibility/">Accessibility and learner supports</a> · <ExternalLink href="https://github.com/pie-framework/pie-players/blob/develop/docs/wcag/deferred-issues.md">Known player issues and evidence gaps</ExternalLink> · <ExternalLink href="https://github.com/pie-framework/pie-elements-ng/blob/develop/docs/a11y/TRACKING.md">Element coverage</ExternalLink></p>
		<h3 id="website-accessibility">Accessibility of this site</h3>
		<p>The website is reviewed against WCAG 2.2 AA, with automated checks in both themes and browser checks for keyboard navigation, focus, narrow layouts and text spacing.</p>
		<p>Live demos use published player and element packages. Known findings include unnamed authoring controls, a mismatch between visible and accessible labels in the theme tool, and duplicate landmarks in section demos. Some graphical interactions and assistive-technology workflows still need manual testing. Full conformance has not been established.</p>
		<p>To report an access problem, <ExternalLink href="https://github.com/pie-framework/pie-website-ng/issues">open a website issue</ExternalLink> with the page, task and browser or assistive technology you were using.</p>
		<h2 id="delivery">Graded delivery</h2>
		<p>For secure grading, keep answer keys and scoring on your server, using hosted rendering and server-redacted models. Player modes and roles control presentation; your application enforces access permissions and supplies the backend.</p>
		<p><a href="{base}/docs/security/">Secure delivery and CSP</a> · <a href="{base}/docs/sessions/">Persistence boundaries</a></p>
		<h2 id="proposals">Proposals and implementation</h2>
		<p>Design documents may describe features that are still proposals. Check the status records for branching, process events, evidence capture, embedded speech recognition and authoritative submission. The timed-media and formative guides describe the implemented APIs.</p>
		<p><ExternalLink href="https://github.com/pie-framework/pie-players/blob/develop/docs/prds/shared-contracts/README.md">Shared-contract status</ExternalLink> · <a href="{base}/qti/">Independent QTI project and status</a></p>
	</div>
</div>
