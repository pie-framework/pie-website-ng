<script lang="ts">
	import { base } from '$app/paths';

	const elementsDemoUrl = 'https://elements.pie-framework.org/';
</script>

<svelte:head>
	<title>QTI & Standards - PIE Framework</title>
	<meta name="description" content="PIE-QTI: version-agnostic QTI players supporting 2.x and 3.0, bidirectional transforms, and standards interoperability with LTI." />
</svelte:head>

<div class="container mx-auto px-4 py-12 max-w-7xl">
	<div class="text-center mb-16">
		<h1 class="text-5xl font-bold text-secondary mb-4">QTI & Standards</h1>
		<p class="text-xl text-base-content/70 max-w-3xl mx-auto">
			PIE integrates with established assessment standards through dedicated tooling and QTI-inspired architectural patterns.
		</p>
	</div>

	<!-- PIE-QTI Overview -->
	<section class="mb-20">
		<h2 class="text-3xl font-bold text-secondary mb-6">PIE-QTI</h2>
		<p class="text-lg text-base-content/70 mb-8 max-w-4xl">
			PIE-QTI is a sibling project that provides production-ready QTI item and assessment players alongside a version-agnostic architecture supporting both QTI 2.x and QTI 3.0. It also includes bidirectional transform tooling for converting between QTI and PIE formats.
		</p>

		<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
			<div class="card bg-primary/5 border border-primary/20">
				<div class="card-body text-center">
					<p class="text-3xl font-bold text-primary">21</p>
					<p class="text-sm text-base-content/70">Interaction types</p>
				</div>
			</div>
			<div class="card bg-primary/5 border border-primary/20">
				<div class="card-body text-center">
					<p class="text-3xl font-bold text-primary">45+</p>
					<p class="text-sm text-base-content/70">Response processing operators</p>
				</div>
			</div>
			<div class="card bg-secondary/5 border border-secondary/20">
				<div class="card-body text-center">
					<p class="text-3xl font-bold text-secondary">65-70%</p>
					<p class="text-sm text-base-content/70">Code reuse across QTI versions</p>
				</div>
			</div>
			<div class="card bg-secondary/5 border border-secondary/20">
				<div class="card-body text-center">
					<p class="text-3xl font-bold text-secondary">8</p>
					<p class="text-sm text-base-content/70">Supported locales</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Version-Agnostic Architecture -->
	<section class="mb-20">
		<h2 class="text-3xl font-bold text-secondary mb-6">Version-Agnostic Architecture</h2>
		<p class="text-lg text-base-content/70 mb-8 max-w-4xl">
			PIE-QTI auto-detects QTI version from XML and maps both QTI 2.x and QTI 3.0 content to a common internal model. This achieves 65-70% code reuse between versions.
		</p>

		<div class="my-8">
			<img
				src="{base}/images/docs/qti/pie-qti-version-agnostic-1-1773773720649.jpg"
				alt="QTI Version-Agnostic Architecture: both QTI 2.x and 3.0 map to a common internal model"
				width="845"
				height="461"
				loading="lazy"
				class="rounded-lg shadow-lg w-full max-w-4xl mx-auto"
			/>
		</div>

		<div class="overflow-x-auto mb-8">
			<table class="table table-zebra w-full">
				<thead>
					<tr>
						<th>Aspect</th>
						<th>QTI 2.x</th>
						<th>QTI 3.0</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="font-semibold">Element names</td>
						<td><code>choiceInteraction</code></td>
						<td><code>qti-choice-interaction</code></td>
					</tr>
					<tr>
						<td class="font-semibold">Attribute names</td>
						<td><code>responseIdentifier</code></td>
						<td><code>response-identifier</code></td>
					</tr>
					<tr>
						<td class="font-semibold">Root element</td>
						<td><code>&lt;assessmentItem&gt;</code></td>
						<td><code>&lt;qti-assessment-item&gt;</code></td>
					</tr>
					<tr>
						<td class="font-semibold">Convention</td>
						<td>camelCase</td>
						<td>kebab-case with <code>qti-</code> prefix</td>
					</tr>
				</tbody>
			</table>
		</div>

		<div class="grid md:grid-cols-3 gap-6">
			<div class="card bg-base-100 shadow border border-base-300">
				<div class="card-body">
					<h4 class="font-bold text-primary mb-2">Auto-Detection</h4>
					<p class="text-sm text-base-content/70">
						Version detection from namespace URI, root element name, and <code>version</code> attribute. Supports QTI 2.0, 2.1, 2.2, and 3.0.
					</p>
				</div>
			</div>
			<div class="card bg-base-100 shadow border border-base-300">
				<div class="card-body">
					<h4 class="font-bold text-primary mb-2">Element Mappers</h4>
					<p class="text-sm text-base-content/70">
						<code>Qti2ElementNameMapper</code> and <code>Qti3ElementNameMapper</code> convert version-specific names to a shared canonical form, e.g., <code>choiceinteraction</code>.
					</p>
				</div>
			</div>
			<div class="card bg-base-100 shadow border border-base-300">
				<div class="card-body">
					<h4 class="font-bold text-primary mb-2">172 Element Mappings</h4>
					<p class="text-sm text-base-content/70">
						QTI 3.0 element mapping covers 172 elements with corresponding attribute name mappings for full specification coverage.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Bidirectional Transforms -->
	<section class="mb-20">
		<h2 class="text-3xl font-bold text-secondary mb-6">Bidirectional Transforms</h2>
		<p class="text-lg text-base-content/70 mb-8 max-w-4xl">
			Organizations with existing QTI content can import it into PIE, and PIE content can be exported to QTI. The transform engine is plugin-based and extensible.
		</p>

		<div class="grid md:grid-cols-3 gap-6 mb-8">
			<div class="card bg-base-100 shadow border border-base-300">
				<div class="card-body">
					<h4 class="font-bold text-primary mb-2">QTI &rarr; PIE</h4>
					<p class="text-sm text-base-content/70">
						Transform QTI 2.x and 3.0 XML into PIE JSON format. Auto-detected version, plugin-based extraction of interactions, response declarations, and processing rules.
					</p>
				</div>
			</div>
			<div class="card bg-base-100 shadow border border-base-300">
				<div class="card-body">
					<h4 class="font-bold text-primary mb-2">PIE &rarr; QTI</h4>
					<p class="text-sm text-base-content/70">
						Export PIE items to QTI 2.2 XML format. Generates valid QTI with response declarations, outcome declarations, and response processing.
					</p>
				</div>
			</div>
			<div class="card bg-base-100 shadow border border-base-300">
				<div class="card-body">
					<h4 class="font-bold text-primary mb-2">Tooling</h4>
					<p class="text-sm text-base-content/70">
						CLI for batch transforms, a web application for upload/analyze/transform/preview workflows, and IMS Content Package support for standards-compliant exchange.
					</p>
				</div>
			</div>
		</div>

		<div class="text-center">
			<a href="https://qti.pie-framework.org" target="_blank" class="btn btn-primary btn-lg">
				Explore PIE-QTI Transform Tools
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
				</svg>
			</a>
		</div>
	</section>

	<!-- QTI 3.0 Influence on PIE -->
	<section class="mb-20">
		<h2 class="text-3xl font-bold text-secondary mb-6">QTI 3.0 Influence on PIE</h2>
		<p class="text-lg text-base-content/70 mb-8 max-w-4xl">
			QTI 3.0 concepts directly inspired several PIE architectural features, making content naturally mappable between the two ecosystems.
		</p>

		<div class="grid md:grid-cols-2 gap-6">
			<div class="card bg-base-100 shadow border border-base-300">
				<div class="card-body">
					<h4 class="font-bold text-primary text-lg mb-2">Personal Needs Profiles (PNP)</h4>
					<p class="text-sm text-base-content/70">
						PIE's assessment toolkit uses QTI 3.0 Personal Needs Profiles for accommodation resolution. The PNPToolResolver maps student accommodation profiles to PIE tool IDs using a multi-layer precedence hierarchy.
					</p>
				</div>
			</div>
			<div class="card bg-base-100 shadow border border-base-300">
				<div class="card-body">
					<h4 class="font-bold text-primary text-lg mb-2">Accessibility Catalogs</h4>
					<p class="text-sm text-base-content/70">
						The AccessibilityCatalogResolver uses QTI 3.0-inspired catalogs for alternative content: pre-recorded audio, sign language videos, braille alternatives, with priority ordering at item and assessment levels.
					</p>
				</div>
			</div>
			<div class="card bg-base-100 shadow border border-base-300">
				<div class="card-body">
					<h4 class="font-bold text-primary text-lg mb-2">Section & Assessment Models</h4>
					<p class="text-sm text-base-content/70">
						PIE's assessment definitions use QTI-inspired structures: test parts containing sections, sections containing assessment item references, rubric blocks for stimulus and instructions, and nested section support.
					</p>
				</div>
			</div>
			<div class="card bg-base-100 shadow border border-base-300">
				<div class="card-body">
					<h4 class="font-bold text-primary text-lg mb-2">Context Declarations</h4>
					<p class="text-sm text-base-content/70">
						QTI 3.0's context declarations for cross-item shared state are supported in PIE's assessment entity model, enabling shared data across items within an assessment.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Other Standards -->
	<section class="mb-20">
		<h2 class="text-3xl font-bold text-secondary mb-6">Other Standards</h2>

		<div class="grid md:grid-cols-2 gap-6">
			<div class="card bg-base-100 shadow border border-base-300">
				<div class="card-body">
					<h4 class="font-bold text-primary text-lg mb-2">LTI (Learning Tools Interoperability)</h4>
					<p class="text-sm text-base-content/70">
						LTI support is planned as an upcoming addition to pie-players, enabling PIE-based assessments to be embedded as LTI tools within LMS platforms like Canvas, Moodle, and Blackboard.
					</p>
					<span class="badge badge-outline badge-sm mt-2">Planned</span>
				</div>
			</div>
		</div>
	</section>

	<!-- Navigation -->
	<section class="mb-12">
		<div class="flex flex-col md:flex-row gap-4 justify-between">
			<a href="{base}/docs/integration/" class="btn btn-outline btn-secondary">
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
				</svg>
				Integration & Architecture
			</a>
			<a href={elementsDemoUrl} class="btn btn-primary">
				Elements Demo
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
				</svg>
			</a>
		</div>
	</section>
</div>
