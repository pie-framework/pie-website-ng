<script lang="ts">
	import ExternalLink from '$lib/components/ExternalLink.svelte';
	import {
		AUTHORING_COUNT,
		ELEMENT_COUNT,
		ELEMENT_COUNT_SENTENCE,
		PRINT_COUNT
	} from '$lib/data/elements';
	import { DOCS, REPOS } from '$lib/data/links';

	const technologies = [
		{ name: 'Custom elements', description: 'Framework-agnostic HTML tags for every player and element' },
		{
			name: 'IIFE bundles',
			description: "Pre-built element bundles from the PIE bundle host; the item player's default"
		},
		{
			name: 'ES modules',
			description: 'Static browser builds from a CDN, with shared dependencies through an import map'
		},
		{ name: 'JSON', description: 'Item configuration, session state and API communication' },
		{ name: 'npm', description: 'Package distribution and dependency management' }
	];

	const ecosystem = [
		{
			title: 'PIE Elements',
			description: `${ELEMENT_COUNT_SENTENCE} Each ships a delivery view and a controller; ${AUTHORING_COUNT} add an authoring view and ${PRINT_COUNT} a print view.`,
			features: [
				'Multiple choice, constructed response, math entry',
				'Drag-and-drop, graphing, hotspot',
				'Authoring views that emit every change for a live preview',
				'Partial credit scoring and feedback'
			]
		},
		{
			title: 'PIE Players',
			description:
				'Composable players that each host assembles into its own assessment experience',
			features: [
				'Item player with three loading strategies',
				'Section players for page-level composition',
				'Print player for printable versions of items',
				'A reference assessment player that shows one assembly'
			]
		},
		{
			title: 'Assessment Toolkit',
			description:
				'Composable services for tools, accommodations and accessibility, coordinated through ToolkitCoordinator',
			features: [
				'Calculator, ruler, protractor, graph tools',
				'Text-to-speech with word-level highlighting',
				'Annotation toolbar and answer eliminator',
				'AfA PNP 3.0 accommodation model (as used by QTI 3.0)'
			]
		},
		{
			title: 'PIE-QTI',
			description:
				'Sibling project providing QTI players and bidirectional transforms with a version-agnostic architecture',
			features: [
				'QTI 2.2 and 3.0 item and assessment players (pre-1.0)',
				'Auto-detection of the QTI version from the XML',
				'Plugin-based transform engine with a CLI (in development)',
				'IMS Content Package support'
			]
		}
	];

	const licenceTerms = [
		'Use commercially without restriction',
		'Modify and customize freely',
		'No royalties or fees ever',
		'Active development by full-time team'
	];
</script>

<svelte:head>
	<title>About - PIE Framework</title>
	<meta
		name="description"
		content="PIE (Portable Interactions and Elements): open-source assessment elements and players built on web standards, MIT licensed."
	/>
</svelte:head>

<div class="container mx-auto px-4 py-12 max-w-7xl">
	<div class="text-center mb-20">
		<h1 class="text-4xl sm:text-6xl font-bold text-secondary mb-6">About PIE Framework</h1>
		<p class="text-xl sm:text-2xl text-base-content/70 max-w-4xl mx-auto leading-relaxed">
			Portable Interactions and Elements &mdash; an open-source framework for rendering and authoring
			interactive assessment items
		</p>
	</div>

	<section class="mb-24">
		<h2 class="text-3xl sm:text-4xl font-bold text-secondary mb-8">PIE in brief</h2>

		<div class="prose prose-lg max-w-none mb-8">
			<p class="text-base-content/80">
				PIE renders assessment content in the browser: the question types, their authoring views, and
				the players that deliver them. You bring the backend: content storage, authentication, scoring
				service, reporting and infrastructure. Element controllers and the text-to-speech server
				packages can run on your servers.
			</p>
		</div>

		<div class="grid lg:grid-cols-2 gap-8 mb-12">
			<div class="card bg-base-100 shadow-xl border border-base-300">
				<div class="card-body">
					<h3 class="card-title text-2xl mb-4">Key differentiators</h3>
					<ul class="space-y-3">
						<li class="flex items-start gap-3">
							<span class="text-primary text-xl mt-1 flex-shrink-0" aria-hidden="true">&bull;</span>
							<span
								><strong>Graphical authoring</strong> &mdash; Authoring views for {AUTHORING_COUNT} of the
								{ELEMENT_COUNT} element types; hosts pair them with a live delivery preview</span
							>
						</li>
						<li class="flex items-start gap-3">
							<span class="text-primary text-xl mt-1 flex-shrink-0" aria-hidden="true">&bull;</span>
							<span
								><strong>Framework-agnostic</strong> &mdash; Custom elements work with React, Vue, Angular,
								Svelte, or plain JavaScript</span
							>
						</li>
						<li class="flex items-start gap-3">
							<span class="text-primary text-xl mt-1 flex-shrink-0" aria-hidden="true">&bull;</span>
							<span
								><strong>Accessibility first</strong> &mdash; Elements are built for keyboard navigation,
								screen readers and high-contrast color schemes</span
							>
						</li>
						<li class="flex items-start gap-3">
							<span class="text-primary text-xl mt-1 flex-shrink-0" aria-hidden="true">&bull;</span>
							<span
								><strong>Production-ready</strong> &mdash; Powers some of the highest-volume assessment
								platforms in education</span
							>
						</li>
					</ul>
				</div>
			</div>

			<div class="card bg-base-100 shadow-xl border border-base-300">
				<div class="card-body">
					<h3 class="card-title text-2xl mb-4">Standards alignment</h3>
					<ul class="space-y-3">
						<li class="flex items-start gap-3">
							<span class="text-success text-xl mt-1 flex-shrink-0" aria-hidden="true">&bull;</span>
							<span
								><strong>QTI interoperability</strong> &mdash; PIE-QTI provides QTI 2.2 and 3.0 item and
								assessment players (pre-1.0) alongside bidirectional transforms</span
							>
						</li>
						<li class="flex items-start gap-3">
							<span class="text-success text-xl mt-1 flex-shrink-0" aria-hidden="true">&bull;</span>
							<span
								><strong>QTI-inspired architecture</strong> &mdash; Section and assessment models follow
								QTI 3.0's test parts, sections and item references</span
							>
						</li>
						<li class="flex items-start gap-3">
							<span class="text-success text-xl mt-1 flex-shrink-0" aria-hidden="true">&bull;</span>
							<span
								><strong>WCAG 2.2 AA</strong> &mdash; Built to WCAG 2.2 AA. Automated axe checks cover every
								element and the item, section and assessment players, and their findings are being
								worked down; manual assistive-technology validation is in progress.
								<ExternalLink href={DOCS.accessibility}>Accessibility docs</ExternalLink></span
							>
						</li>
						<li class="flex items-start gap-3">
							<span class="text-success text-xl mt-1 flex-shrink-0" aria-hidden="true">&bull;</span>
							<span
								><strong>LTI compatible</strong> &mdash; PIE players run inside an LTI tool; the tool host
								handles the launch, Deep Linking and grade passback.
								<ExternalLink href={DOCS.lti}>LTI integration guide</ExternalLink></span
							>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</section>

	<section class="mb-24">
		<h2 class="text-3xl sm:text-4xl font-bold text-secondary mb-6">Web standards</h2>
		<p class="text-lg text-base-content/70 mb-8 max-w-4xl">
			PIE adopts web standards wherever possible. All players and elements are distributed as HTML5
			custom elements, integrating into any web page as standard HTML tags. The item player loads
			elements as IIFE bundles, as ES modules, or preloaded by the host;
			<ExternalLink href={DOCS.loadingStrategies}>loading strategies</ExternalLink> compares them.
		</p>

		<div class="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
			{#each technologies as tech (tech.name)}
				<div class="card bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/30 shadow-lg">
					<div class="card-body">
						<h3 class="card-title text-lg text-primary">{tech.name}</h3>
						<p class="text-sm text-base-content/70">{tech.description}</p>
					</div>
				</div>
			{/each}
		</div>
	</section>

	<section class="mb-24">
		<h2 class="text-3xl sm:text-4xl font-bold text-secondary mb-12 text-center">The PIE ecosystem</h2>

		<div class="grid md:grid-cols-2 gap-8">
			{#each ecosystem as component (component.title)}
				<div class="card bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition-all">
					<div class="card-body">
						<h3 class="card-title text-2xl text-secondary mb-4">{component.title}</h3>
						<p class="text-base-content/70 mb-4">{component.description}</p>
						<ul class="space-y-2">
							{#each component.features as feature (feature)}
								<li class="flex items-center gap-2 text-sm">
									<svg
										class="w-4 h-4 text-primary flex-shrink-0"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										aria-hidden="true"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2.5"
											d="M4.5 12.5l4.2 4.3c0.1 0.1 0.2 0.1 0.3 0 L19.5 6.8"
											style="paint-order: stroke;"
										></path>
									</svg>
									<span>{feature}</span>
								</li>
							{/each}
						</ul>
					</div>
				</div>
			{/each}
		</div>
	</section>

	<section class="mb-24">
		<div class="card bg-gradient-to-br from-secondary/10 to-secondary/5 shadow-xl">
			<div class="card-body">
				<h2 class="text-3xl font-bold text-secondary mb-4">Development History</h2>
				<div class="prose prose-lg max-w-none">
					<p class="text-base-content/80">
						The PIE Framework originated from work by CoreSpring.org in building authoring and rendering tools for assessment interactions. It was created as an open source project to help educators have better access to high-quality and more interactive assessment interactions, designed to be compatible with the approach suggested by Smarter Balanced in their ARI (Accessible Rendering and Interoperability) proposal.
					</p>
					<p class="text-base-content/80">
						Since those early days, PIE has been consistently sponsored and developed by a sizable team of full-time developers, with Renaissance (previously Illuminate Education) as the project's primary sponsor. The framework continues to evolve with modern web standards and educational needs.
					</p>
					<p class="text-base-content/80">
						Today, PIE powers assessment delivery at enterprise scale, serving approximately 40% of U.S. schools and processing hundreds of millions of student interactions annually. The framework's eight-year development history reflects continuous refinement based on production feedback &mdash; features like the section player composition model, the ToolkitCoordinator, the multi-strategy item player architecture, and QTI-inspired accommodation resolution all emerged from real operational requirements.
					</p>
				</div>
			</div>
		</div>
	</section>

	<section class="mb-24">
		<h2 class="text-3xl sm:text-4xl font-bold text-secondary mb-8">Open source</h2>
		<div class="card bg-base-100 shadow-xl border-2 border-primary/30">
			<div class="card-body">
				<h3 class="text-2xl font-bold text-primary mb-4">MIT licensed</h3>
				<p class="text-base-content/70 mb-4">
					PIE is MIT licensed (legacy pie-elements and pie-lib: ISC). Use, modify and distribute it
					freely for any purpose, including commercial use, without fees or royalties.
				</p>
				<p class="text-base-content/70 mb-6">
					PIE's primary sponsor, Renaissance, aims to accelerate learning for all children and adults of all ability levels and ethnic and social backgrounds, worldwide. Contributing PIE as open source supports that mission, and we welcome the community to help make the framework even better.
				</p>

				<ul class="grid md:grid-cols-2 gap-x-4 gap-y-2 mb-6">
					{#each licenceTerms as term (term)}
						<li class="flex items-start gap-2">
							<svg
								class="w-5 h-5 text-success mt-0.5 flex-shrink-0"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2.5"
									d="M4.5 12.5l4.2 4.3c0.1 0.1 0.2 0.1 0.3 0 L19.5 6.8"
									style="paint-order: stroke;"
								></path>
							</svg>
							<span>{term}</span>
						</li>
					{/each}
				</ul>

				<div class="flex flex-wrap gap-3">
					<ExternalLink href={REPOS.piePlayers} class="btn btn-outline btn-sm">pie-players</ExternalLink>
					<ExternalLink href={REPOS.pieElementsNg} class="btn btn-outline btn-sm"
						>pie-elements-ng</ExternalLink
					>
					<ExternalLink href={REPOS.pieQti} class="btn btn-outline btn-sm">pie-qti</ExternalLink>
				</div>
			</div>
		</div>
	</section>
</div>
