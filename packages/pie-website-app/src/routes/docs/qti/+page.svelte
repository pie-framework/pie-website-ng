<script lang="ts">
	import { base } from '$app/paths';
	import Diagram from '$lib/components/Diagram.svelte';
	import ExternalLink from '$lib/components/ExternalLink.svelte';
	import { DOCS, REPOS, SITES } from '$lib/data/links';

	const stats = [
		{ value: '21', label: 'QTI 2.2 interaction types covered', tone: 'primary' },
		{ value: '78', label: 'Response-processing expression kinds', tone: 'primary' },
		{ value: '8', label: 'Supported locales', tone: 'secondary' }
	] as const;
</script>

<svelte:head>
	<title>QTI & Standards - PIE Framework</title>
	<meta
		name="description"
		content="PIE-QTI players for QTI 2.2 and 3.0, transforms between QTI and PIE, and how PIE aligns with QTI 3.0 and LTI."
	/>
</svelte:head>

<div class="container mx-auto px-4 py-12 max-w-7xl">
	<div class="text-center mb-16">
		<h1 class="text-4xl sm:text-5xl font-bold text-secondary mb-4">QTI & Standards</h1>
		<p class="text-xl text-base-content/70 max-w-3xl mx-auto">
			PIE integrates with established assessment standards through dedicated tooling and
			QTI-inspired architectural patterns.
		</p>
	</div>

	<!-- PIE-QTI Overview -->
	<section class="mb-20">
		<h2 class="text-3xl font-bold text-secondary mb-6">PIE-QTI</h2>
		<p class="text-lg text-base-content/70 mb-8 max-w-4xl">
			PIE-QTI, a sibling project, provides QTI item and assessment players for QTI 2.2 and 3.0 content
			(pre-1.0; certification in progress), ingests QTI 2.1, and converts between QTI and PIE. Its
			<ExternalLink href={DOCS.qtiStatus}>status page</ExternalLink> tracks what is ready.
		</p>

		<div class="grid sm:grid-cols-3 gap-6 mb-8">
			{#each stats as stat (stat.label)}
				<div
					class="card border {stat.tone === 'primary'
						? 'bg-primary/5 border-primary/20'
						: 'bg-secondary/5 border-secondary/20'}"
				>
					<div class="card-body text-center">
						<p
							class="text-3xl font-bold {stat.tone === 'primary' ? 'text-primary' : 'text-secondary'}"
						>
							{stat.value}
						</p>
						<p class="text-sm text-base-content/70">{stat.label}</p>
					</div>
				</div>
			{/each}
		</div>
	</section>

	<!-- Version-Agnostic Architecture -->
	<section class="mb-20">
		<h2 class="text-3xl font-bold text-secondary mb-6">Version-agnostic architecture</h2>
		<p class="text-lg text-base-content/70 max-w-4xl">
			PIE-QTI detects the QTI version from the XML and maps QTI 2.x and QTI 3.0 names to one canonical
			form, so both versions share the same extractors, response processing and components.
		</p>

		<Diagram
			name="qti-version-agnostic"
			width={1028}
			height={732}
			alt="A QTI 2.x item and a QTI 3.0 item enter the PIE-QTI item player, which detects the version and maps each through its own element and attribute name mappers to canonical names. One set of interaction extractors, response processing and rendering components then serves both versions."
		/>

		<div class="overflow-x-auto mb-8">
			<table class="table table-zebra w-full">
				<thead>
					<tr>
						<th scope="col">Aspect</th>
						<th scope="col">QTI 2.x</th>
						<th scope="col">QTI 3.0</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th scope="row" class="font-semibold">Element names</th>
						<td><code>choiceInteraction</code></td>
						<td><code>qti-choice-interaction</code></td>
					</tr>
					<tr>
						<th scope="row" class="font-semibold">Attribute names</th>
						<td><code>responseIdentifier</code></td>
						<td><code>response-identifier</code></td>
					</tr>
					<tr>
						<th scope="row" class="font-semibold">Root element</th>
						<td><code>&lt;assessmentItem&gt;</code></td>
						<td><code>&lt;qti-assessment-item&gt;</code></td>
					</tr>
					<tr>
						<th scope="row" class="font-semibold">Convention</th>
						<td>camelCase</td>
						<td>kebab-case with <code>qti-</code> prefix</td>
					</tr>
				</tbody>
			</table>
		</div>

		<div class="grid md:grid-cols-3 gap-6">
			<div class="card bg-base-100 shadow border border-base-300">
				<div class="card-body">
					<h3 class="font-bold text-primary mb-2">Auto-detection</h3>
					<p class="text-sm text-base-content/70">
						Version detection from the namespace URI, the root element name and the
						<code>version</code> attribute recognizes QTI 2.0, 2.1, 2.2 and 3.0. Delivery targets QTI 2.2
						and 3.0; QTI 2.1 content is ingested. An <code>assessmentItem</code> without a version marker
						is read as QTI 2.2.
					</p>
				</div>
			</div>
			<div class="card bg-base-100 shadow border border-base-300">
				<div class="card-body">
					<h3 class="font-bold text-primary mb-2">Element mappers</h3>
					<p class="text-sm text-base-content/70">
						<code>Qti2xElementNameMapper</code> and <code>Qti3ElementNameMapper</code> convert
						version-specific names to a shared canonical form, such as <code>choiceinteraction</code>.
					</p>
				</div>
			</div>
			<div class="card bg-base-100 shadow border border-base-300">
				<div class="card-body">
					<h3 class="font-bold text-primary mb-2">QTI 3.0 mappings</h3>
					<p class="text-sm text-base-content/70">
						About 170 QTI 3.0 element-name mappings and about 120 attribute-name mappings, with a
						camelCase fallback for other attributes.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Bidirectional Transforms -->
	<section class="mb-20">
		<h2 class="text-3xl font-bold text-secondary mb-6">Bidirectional transforms</h2>
		<p class="text-lg text-base-content/70 max-w-4xl">
			Organizations with existing QTI content can import it into PIE, and PIE content can be exported
			to QTI. The transform engine is plugin-based and extensible. For items, each direction embeds the
			source it read and the reverse transform returns that source verbatim, so an item round-trips
			losslessly. The embedded source wins over later edits: an item edited after import exports in its
			original form. Assessments carry no embedded source, so their round trips can lose data.
		</p>

		<Diagram
			name="qti-to-pie"
			width={1028}
			height={412}
			alt="QTI 2.x items and IMS content packages pass through @pie-qti/to-pie into a PIE item config, which the item player renders; @pie-qti/pie-to-qti2 writes the config back as QTI 2.2 items with an IMS manifest. Each direction embeds the item source, and the built-in transformers reject QTI 3.0 items."
		/>

		<div class="grid md:grid-cols-3 gap-6 mb-8">
			<div class="card bg-base-100 shadow border border-base-300">
				<div class="card-body">
					<h3 class="font-bold text-primary mb-2">QTI &rarr; PIE</h3>
					<p class="text-sm text-base-content/70">
						Transform QTI 2.1 and 2.2 XML, as items, assessment tests, passages, stimuli or IMS content
						packages, into PIE configs, with plugin-based extraction of interactions, response declarations and processing
						rules. The built-in transformers reject QTI 3.0 items.
					</p>
				</div>
			</div>
			<div class="card bg-base-100 shadow border border-base-300">
				<div class="card-body">
					<h3 class="font-bold text-primary mb-2">PIE &rarr; QTI</h3>
					<p class="text-sm text-base-content/70">
						Export PIE items to QTI 2.2: native interactions for 13 PIE element types, plus passages,
						rubrics and assessments; other elements travel as <code>customInteraction</code> with the
						PIE model embedded. An item with several interactions converts only its first natively.
					</p>
				</div>
			</div>
			<div class="card bg-base-100 shadow border border-base-300">
				<div class="card-body">
					<h3 class="font-bold text-primary mb-2">Tooling</h3>
					<p class="text-sm text-base-content/70">
						A CLI for batch transforms (in development) and IMS Content Package support. Import
						workflows belong in the host application, built on the transform packages.
					</p>
				</div>
			</div>
		</div>

		<div class="flex flex-wrap gap-4 justify-center">
			<ExternalLink href={SITES.qti} class="btn btn-primary btn-lg">PIE-QTI docs and examples</ExternalLink>
			<ExternalLink href={REPOS.pieQti} class="btn btn-outline btn-lg">pie-qti on GitHub</ExternalLink>
		</div>
	</section>

	<!-- QTI 3.0 alignment -->
	<section class="mb-20">
		<h2 class="text-3xl font-bold text-secondary mb-6">QTI 3.0 alignment in PIE</h2>
		<p class="text-lg text-base-content/70 max-w-4xl">
			The assessment toolkit aligns with QTI 3.0: it reads AfA PNP 3.0 profiles, resolves alternative
			content from accessibility catalogs, and uses a QTI-style assessment model. The
			<a href="{base}/docs/toolkit/" class="link link-primary">Assessment Toolkit</a> page covers each.
		</p>
	</section>

	<!-- Other Standards -->
	<section class="mb-20">
		<h2 class="text-3xl font-bold text-secondary mb-6">Other standards</h2>

		<div class="grid md:grid-cols-2 gap-6">
			<div class="card bg-base-100 shadow border border-base-300">
				<div class="card-body">
					<h3 class="font-bold text-primary text-lg mb-2">LTI (Learning Tools Interoperability)</h3>
					<p class="text-sm text-base-content/70">
						PIE players run inside an LTI tool. The tool host handles the launch, Deep Linking and grade
						passback; the players render items and hand back session snapshots for the host to score
						and report.
					</p>
					<p class="text-sm mt-2">
						<ExternalLink href={DOCS.lti}>LTI integration guide</ExternalLink>
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Navigation -->
	<section class="mb-12">
		<div class="flex flex-col md:flex-row gap-4 justify-between">
			<a href="{base}/docs/integration/" class="btn btn-outline btn-secondary">
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
				</svg>
				Integration & Architecture
			</a>
			<ExternalLink href={SITES.elementsDemo} class="btn btn-primary">Elements Demo</ExternalLink>
		</div>
	</section>
</div>
