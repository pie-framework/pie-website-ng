<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import { base } from '$app/paths';
	import type { renderGuide } from '$lib/server/guides';
	import { sourceUrl } from '$lib/data/site';
	import ExternalLink from './ExternalLink.svelte';
	import DemoExperience from './demos/DemoExperience.svelte';
	import Diagram from './Diagram.svelte';

	let { guide }: { guide: ReturnType<typeof renderGuide> } = $props();
</script>

<Seo title="{guide.page.label} - PIE Framework" description={guide.page.summary} />

<article>
	<header class="mb-10">
		<p class="eyebrow">{guide.page.area === 'build' ? 'Build interactions' : guide.page.area === 'integrate' ? 'Integrate PIE' : 'Guide and reference'}</p>
		<h1 class="page-title">{guide.page.label}</h1>
		<p class="page-intro">{guide.page.summary}</p>
		{#if guide.page.source}
			<p class="mt-4 text-sm text-site-muted">
				From the {guide.page.source.repo} documentation ·
				<ExternalLink href={sourceUrl(guide.page.source)}>View source</ExternalLink>
			</p>
		{/if}
	</header>
	{#if guide.page.path === '/docs/sessions/'}
		<Diagram name="response-persistence-lifecycle" format="png" width={928} height={517} alt="Learner responses become item sessions and a section snapshot. Your application saves the snapshot to attempt storage and restores it to resume. Tool state uses a separate storage path." caption="Your application stores the section snapshot. Tool state stays separate from the learner's answers." />
	{:else if guide.page.path === '/build/first-element/'}
		<Diagram name="interaction-lifecycle" format="png" width={928} height={588} alt="The authoring view edits a question model. A controller prepares the model for the delivery view, which updates the learner session. The authored model and session can be used together to calculate an outcome." caption="Question data and learner responses have separate lifecycles. An outcome combines them when scoring is needed." />
	{/if}

	{#if guide.page.demo}
		<section id="try-it" class="mb-12">
			<h2 class="section-title">Try it</h2>
			<DemoExperience kind={guide.page.demo} />
		</section>
	{/if}

	<div class="guide-prose">{@html guide.html}</div>

	<aside class="mt-12 border-t border-base-300 pt-6 text-sm text-base-content/70">
		{#if guide.provenance}
			<p>Documentation snapshot: <code>{guide.provenance.repository}@{guide.provenance.commit.slice(0, 8)}</code>. See the source for later changes.</p>
		{/if}
		<p class="mt-3">
			<a class="link link-primary" href="{base}/get-started/">Get started</a> ·
			<a class="link link-primary" href="{base}/docs/reference/">Package reference</a> ·
			<a class="link link-primary" href="{base}/docs/troubleshooting/">Troubleshooting</a>
		</p>
	</aside>
</article>
