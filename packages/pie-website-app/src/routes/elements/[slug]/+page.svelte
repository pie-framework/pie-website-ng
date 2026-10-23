<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import { base } from '$app/paths';
	import ElementDemo from '$lib/components/demos/ElementDemo.svelte';
	import SchemaFields from '$lib/components/SchemaFields.svelte';
	import ExternalLink from '$lib/components/ExternalLink.svelte';
	import { elementSamplesUrl } from '$lib/data/links';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
	const packagePath = $derived('https://github.com/pie-framework/pie-elements-ng/tree/develop/packages/' + (data.element.framework === 'React' ? 'elements-react/' : 'elements-svelte/') + data.element.name);
</script>
<Seo title="{data.element.displayName} - PIE element library" description={data.capture.caption + ' Live example, authoring and print support, scoring notes and model/session reference.'} />
<div class="site-container max-w-6xl">
	<a class="link link-primary text-sm" href="{base}/elements/">← Element library</a>
	<header class="mb-8 mt-6"><p class="eyebrow">{data.element.group}</p><h1 class="page-title">{data.element.displayName}</h1><p class="page-intro">{data.capture.caption}</p><p class="mt-5"><ExternalLink class="btn btn-outline" href={elementSamplesUrl(data.element.name)}>All {data.element.displayName} samples</ExternalLink></p></header>
	<div class="mb-8 grid gap-4 sm:grid-cols-3">
		<div class="border-l-2 border-base-300 pl-4"><p class="font-semibold">Delivery</p><p class="mt-1 text-sm text-base-content/70">Respond, review and evaluate</p></div>
		<div class="border-l-2 border-base-300 pl-4"><p class="font-semibold">Authoring</p><p class="mt-1 text-sm text-base-content/70">{data.element.views.authoring ? 'Visual editor available' : 'No authoring view in this package'}</p></div>
		<div class="border-l-2 border-base-300 pl-4"><p class="font-semibold">Print</p><p class="mt-1 text-sm text-base-content/70">{data.element.views.print ? 'Print view available' : 'No print view in this package'}</p></div>
	</div>
	<section id="try-it"><h2 class="section-title">Try the interaction</h2>{#key data.element.name}<ElementDemo element={data.element} example={data.example} />{/key}</section>
	<section id="integration" class="mt-12">
		<h2 class="section-title">Use it in an item</h2>
		<p class="text-base-content/75">Map the tag to an exact package version and match the model ID to the markup. The item player loads the views. You can use any frontend framework.</p>
		<pre class="mt-5 overflow-auto rounded-box bg-base-200 text-sm">{JSON.stringify({ elements: { [data.element.name]: data.element.package + '@' + data.element.version }, markup: '<' + data.element.name + ' id="example"></' + data.element.name + '>', models: [data.example.model] }, null, 2)}</pre>
		<p class="mt-4"><a class="link link-primary" href="{base}/integrate/item-player/">Embed an item</a> · <a class="link link-primary" href="{base}/integrate/authoring/">Embed authoring</a> · <a class="link link-primary" href="{base}/integrate/print/">Print integration</a></p>
	</section>
	<section id="scoring" class="mt-12">
		<h2 class="section-title">Responses and scoring</h2>
		<p class="text-base-content/75">{data.element.kind === 'rubric' ? 'This element defines manual scoring criteria. Your application supplies the scoring workflow and records the grade.' : data.element.kind === 'content' ? 'This element displays content and collects no scored response.' : data.element.name === 'drawing-response' || data.element.name === 'extended-text-entry' ? 'Your application needs to arrange manual or external scoring for this response.' : 'The controller defines scoring for this element. Browser scoring returns one outcome per element. Your application combines those outcomes into an item score and handles trusted server scoring.'}</p>
		<p class="mt-3"><a class="link link-primary" href="{base}/docs/scoring/">Scoring, partial credit and rubrics →</a></p>
	</section>
	<section id="data-contract" class="mt-12">
		<h2 class="section-title">Model, configuration and session reference</h2>
		<p class="mb-5 text-base-content/75">The model holds content, configuration controls the editor, and the session holds the response. Fields below come from generated JSON Schemas.</p>
		<p class="mb-5 text-sm text-site-muted">Schema version: {data.element.package}@{data.reference.version}. Example version: {data.element.version}. Use the schema matching your content. Schema checks cover data structure; controller validation checks authoring rules.</p>
		{#each data.reference.contracts as contract (contract.kind)}
			<details class="mb-4 rounded-box border border-base-300 p-5">
				<summary class="cursor-pointer font-semibold capitalize">{contract.kind} fields ({contract.fields.length})</summary>
				<SchemaFields fields={contract.fields} />
				{#if contract.definitions.length}<h3 class="my-4 font-semibold">Named object types</h3>{/if}
				{#each contract.definitions as definition (definition.name)}
					<details class="my-3 border-l border-base-300 pl-4"><summary class="cursor-pointer font-medium">{definition.name}</summary><SchemaFields fields={definition.fields} /></details>
				{/each}
				<a href="{base}{contract.url}" class="link link-primary text-sm">Open the complete JSON Schema</a>
			</details>
		{/each}
		<p><a class="link link-primary" href="{base}/docs/content-and-schemas/">How to use the schemas →</a></p>
	</section>
	<section id="accessibility" class="mt-12">
		<h2 class="section-title">Accessibility and content requirements</h2>
		<p class="text-base-content/75">PIE targets WCAG 2.2 AA. Provide clear prompts and media alternatives, and test the question with a keyboard and assistive technology. Manual testing is still incomplete; see the coverage notes below.</p>
		<p class="mt-3"><a href="{base}/docs/accessibility/" class="link link-primary">Accessibility and evidence</a> · <ExternalLink href={'https://github.com/pie-framework/pie-elements-ng/blob/develop/docs/a11y/' + (data.element.name === 'video-stimulus' ? 'TRACKING' : data.element.name) + '.md'}>{data.element.name === 'video-stimulus' ? 'Element coverage tracking' : 'Element evidence and manual checks'}</ExternalLink></p>
	</section>
	<p class="mt-10 border-t border-base-300 pt-6 text-sm text-site-muted"><ExternalLink href={packagePath}>Element package source</ExternalLink> · <ExternalLink href={'https://github.com/pie-framework/pie-elements-ng/blob/develop/' + data.example.source}>Example source</ExternalLink> · Snapshot {data.example.commit.slice(0, 8)}</p>
</div>
