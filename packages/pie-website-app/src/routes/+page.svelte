<script lang="ts">
	import { base } from '$app/paths';
	import Diagram from '$lib/components/Diagram.svelte';
	import ExternalLink from '$lib/components/ExternalLink.svelte';
	import {
		AUTHORING_COUNT,
		ELEMENT_COUNT,
		ELEMENT_COUNT_SENTENCE,
		ELEMENTS_WITHOUT_AUTHORING,
		PRINT_COUNT,
		elementsByGroup,
		findElement,
		groupAnchor
	} from '$lib/data/elements';
	import { deliveryCapture } from '$lib/data/element-captures';
	import { DOCS, SITES } from '$lib/data/links';

	const description = `Open-source web components for assessment items: ${ELEMENT_COUNT} element types, composable item and section players, and an accessibility toolkit. MIT licensed.`;

	const withoutAuthoring = ELEMENTS_WITHOUT_AUTHORING.map((e) => e.displayName).join(', ');

	// One delivery capture from each of four groups.
	const tiles = ['multiple-choice', 'fraction-model', 'categorize', 'charting'].map((name) => {
		const element = findElement(name);
		return { element, capture: deliveryCapture(name), href: `${base}/docs/items-elements/#${groupAnchor(element.group)}` };
	});

	const capabilities = [
		{ label: 'Accessibility', path: '/docs/accessibility/', text: 'WCAG 2.2 AA, PNP-driven accommodations, read-aloud with highlighting, sign-language alternates.' },
		{ label: 'Theming', path: '/docs/theming/', text: 'One theme element, ten accessible color schemes, font scaling, adapters for your design system.' },
		{ label: 'Localization', path: '/docs/localization/', text: 'Interface locale, content language and authored language alternates.' },
		{ label: 'Timed media', path: '/docs/timed-media/', text: 'Video stimuli whose playback reveals items and pauses for answers.' },
		{ label: 'Security & CSP', path: '/docs/security/', text: 'Server-side scoring with stripped models, and the origins a strict CSP must allow.' },
		{ label: 'Instrumentation', path: '/docs/instrumentation/', text: 'Telemetry into your own observability backend, and debugger panels for development.' }
	];

	const groups = elementsByGroup().map(({ group, elements }) => ({
		group,
		count: elements.length,
		examples: elements.slice(0, 3).map((e) => e.displayName),
		more: Math.max(elements.length - 3, 0)
	}));

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'SoftwareApplication',
		name: 'PIE Framework',
		alternateName: 'Portable Interactions and Elements',
		description: `Open-source web components framework for creating interactive assessment items and educational content. Provides ${ELEMENT_COUNT} element types, composable item, section and print players, an accessibility toolkit, and QTI interoperability through PIE-QTI.`,
		applicationCategory: 'DeveloperApplication',
		operatingSystem: 'Web Browser',
		offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
		publisher: { '@type': 'Organization', name: 'PIE Framework', url: 'https://pie-framework.org' },
		author: { '@type': 'Organization', name: 'PIE Framework', url: 'https://pie-framework.org' },
		sponsor: [
			{ '@type': 'Organization', name: 'Renaissance', url: 'https://www.renaissance.com' },
			{ '@type': 'Organization', name: 'MCRO', url: 'https://mcro.tech' }
		],
		license: 'https://opensource.org/licenses/MIT',
		programmingLanguage: ['JavaScript', 'TypeScript', 'HTML', 'CSS'],
		codeRepository: 'https://github.com/pie-framework',
		url: 'https://pie-framework.org',
		keywords:
			'assessment, education, web components, interactive questions, e-learning, testing, open source, QTI, accessibility',
		featureList: [
			`${ELEMENT_COUNT} interactive element types`,
			'Item, section and print players with an assessment toolkit',
			'Assessment toolkit with TTS, calculator, accommodations',
			'Web Components (Custom Elements)',
			'Framework-agnostic integration',
			'QTI 2.2 and 3.0 players and QTI-PIE transforms through PIE-QTI (pre-1.0)',
			'Built to WCAG 2.2 AA',
			'WYSIWYG authoring interfaces',
			'MIT licensed, with no per-student fees'
		]
	};
	const jsonLdScript = `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</` + `script>`;
</script>

<svelte:head>
	<title>PIE Framework - Open Source Assessment Items</title>
	<meta name="description" content={description} />
	{@html jsonLdScript}
</svelte:head>

<!-- Hero Section -->
<div class="hero bg-gradient-to-br from-base-100 to-base-200">
	<div class="hero-content text-center py-10">
		<div class="max-w-4xl">
			<h1 class="text-4xl md:text-5xl font-extrabold text-secondary mb-3 leading-tight">
				PIE Framework
			</h1>
			<p class="text-lg md:text-xl font-semibold text-primary mb-4">
				Open Source Assessment Items
			</p>
			<p class="text-base text-base-content/70 max-w-2xl mx-auto">
				A modern, open-source framework for assessment item rendering that combines the interactive richness
				of commercial platforms with the flexibility of open standards. Built on Web Components and distributed
				as framework-agnostic custom elements.
			</p>
			<div class="flex flex-wrap justify-center gap-3 mt-6">
				<ExternalLink href={DOCS.gettingStarted} class="btn btn-primary">Get started</ExternalLink>
				<ExternalLink href={SITES.elementsDemo} class="btn btn-outline btn-secondary"
					>Try the elements</ExternalLink
				>
				<a href="{base}/docs/" class="btn btn-ghost">Read the docs</a>
			</div>
		</div>
	</div>
</div>

<!-- Why PIE? Section -->
<section class="py-12 bg-base-200">
	<div class="container mx-auto px-4 max-w-7xl">
		<div class="text-center mb-8">
			<h2 class="text-3xl md:text-4xl font-bold text-secondary mb-3">Why PIE</h2>
			<p class="text-lg text-base-content/70 max-w-3xl mx-auto">
				Today's assessments demand interactive question types &mdash; graphing, drag-and-drop, mathematical
				expression input &mdash; delivered accessibly through browsers to millions of students.
				Organizations building assessment platforms face a difficult choice.
			</p>
		</div>

		<div class="grid md:grid-cols-2 gap-8 items-center mb-8">
			<div>
				<h3 class="text-2xl font-bold text-primary mb-6">The Challenge</h3>
				<div class="space-y-4">
					<div class="flex items-start gap-3">
						<div class="w-8 h-8 bg-error/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
							<span class="text-error font-bold" aria-hidden="true">&#x2715;</span>
						</div>
						<div>
							<p class="font-semibold mb-1">Commercial Platforms</p>
							<p class="text-sm text-base-content/70">Comprehensive solutions but with significant per-student licensing costs and limited customization.</p>
						</div>
					</div>
					<div class="flex items-start gap-3">
						<div class="w-8 h-8 bg-error/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
							<span class="text-error font-bold" aria-hidden="true">&#x2715;</span>
						</div>
						<div>
							<p class="font-semibold mb-1">Standards Alone (QTI)</p>
							<p class="text-sm text-base-content/70">QTI defines an exchange format; each platform supplies its own rendering and authoring.</p>
						</div>
					</div>
					<div class="flex items-start gap-3">
						<div class="w-8 h-8 bg-error/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
							<span class="text-error font-bold" aria-hidden="true">&#x2715;</span>
						</div>
						<div>
							<p class="font-semibold mb-1">Build from Scratch</p>
							<p class="text-sm text-base-content/70">Complete control but years of development to cover the range of content types with production quality and accessibility.</p>
						</div>
					</div>
				</div>
			</div>

			<div>
				<h3 class="text-2xl font-bold text-success mb-6">The PIE Solution</h3>
				<div class="space-y-4">
					<div class="flex items-start gap-3">
						<div class="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
							<span class="text-success font-bold" aria-hidden="true">&#x2713;</span>
						</div>
						<div>
							<p class="font-semibold mb-1">Open Source & Free</p>
							<p class="text-sm text-base-content/70">MIT licensed, with no per-student fees, and full source access and modification rights. Optional calculator and cloud read-aloud providers carry their own terms.</p>
						</div>
					</div>
					<div class="flex items-start gap-3">
						<div class="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
							<span class="text-success font-bold" aria-hidden="true">&#x2713;</span>
						</div>
						<div>
							<p class="font-semibold mb-1">Modern & Interactive</p>
							<p class="text-sm text-base-content/70">{ELEMENT_COUNT} element types, {AUTHORING_COUNT} of them with WYSIWYG authoring views, composable players and an assessment toolkit.</p>
						</div>
					</div>
					<div class="flex items-start gap-3">
						<div class="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
							<span class="text-success font-bold" aria-hidden="true">&#x2713;</span>
						</div>
						<div>
							<p class="font-semibold mb-1">Enterprise Proven</p>
							<p class="text-sm text-base-content/70">PIE powers assessment delivery at enterprise scale, serving hundreds of millions of student interactions annually across approximately 40% of U.S. schools.</p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<Diagram
			name="home-options"
			width={939}
			height={460}
			class="max-w-3xl"
			alt="A two-by-two grid running from proprietary to open and from build-it-yourself to ready-made. Commercial platforms are proprietary and ready-made, building from scratch is proprietary work you do yourself, standards alone (QTI) are open but leave rendering to each platform, and PIE is open and ready-made."
		/>
	</div>
</section>

<!-- What PIE Provides -->
<section class="py-12 bg-base-100">
	<div class="container mx-auto px-4 max-w-7xl">
		<div class="text-center mb-10">
			<h2 class="text-3xl md:text-4xl font-bold text-secondary mb-3">What PIE Provides</h2>
			<p class="text-lg text-base-content/70 max-w-2xl mx-auto">
				Elements, players and tools for delivering and authoring interactive assessments
			</p>
		</div>

		<div class="grid md:grid-cols-3 gap-8">
			<div class="card bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition-shadow">
				<div class="card-body">
					<div class="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
						</svg>
					</div>
					<h3 class="card-title text-2xl text-primary mb-2">Secure Delivery for High Stakes</h3>
					<p class="text-base-content/80 leading-relaxed">
						Each element's controller turns the stored model into a view model for the current mode and role. By default the controllers run in the browser, which suits practice and formative use. A hosted player loads elements without their controllers and renders models your server has processed; with answer keys stripped from those models and scores computed on your server, neither the key nor the scoring logic reaches the browser.
					</p>
					<p class="text-sm mt-2">
						<a href="{base}/docs/security/#graded-delivery" class="link link-primary">Graded delivery</a>
					</p>
				</div>
			</div>

			<div class="card bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition-shadow">
				<div class="card-body">
					<div class="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
						</svg>
					</div>
					<h3 class="card-title text-2xl text-primary mb-2">{ELEMENT_COUNT} Element Types</h3>
					<p class="text-base-content/80 leading-relaxed">
						From multiple choice and inline dropdowns to graphing, charting, math entry and drag-and-drop. Each ships a delivery view and a controller; {AUTHORING_COUNT} ship an authoring view.
					</p>
					<p class="text-sm mt-2">
						<a href="{base}/docs/items-elements/" class="link link-primary">All {ELEMENT_COUNT} elements</a>
					</p>
				</div>
			</div>

			<div class="card bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition-shadow">
				<div class="card-body">
					<div class="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
						</svg>
					</div>
					<h3 class="card-title text-2xl text-primary mb-2">Composable Players</h3>
					<p class="text-base-content/80 leading-relaxed">
						The item player renders one item. Section players lay out a page of items and passages, with tools and accommodations from the assessment toolkit. The print player renders printable versions. Hosts assemble these into their own assessment experience; a reference assessment player shows one way to do it.
					</p>
					<p class="text-sm mt-2">
						<a href="{base}/docs/players/" class="link link-primary">Players</a>
					</p>
				</div>
			</div>
		</div>

		<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
			{#each capabilities as cap (cap.path)}
				<a
					href="{base}{cap.path}"
					class="card bg-base-100 shadow-sm border border-base-300 hover:border-primary hover:shadow-md transition"
				>
					<div class="card-body p-5">
						<h3 class="card-title text-lg text-primary">{cap.label}</h3>
						<p class="text-sm text-base-content/70">{cap.text}</p>
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>

<!-- Core Architecture Section -->
<section class="py-12 bg-base-200">
	<div class="container mx-auto px-4 max-w-7xl">
		<div class="text-center mb-8">
			<h2 class="text-3xl md:text-4xl font-bold text-secondary mb-3">
				Core Architecture
			</h2>
			<p class="text-lg text-base-content/70 max-w-3xl mx-auto">
				PIE renders and scores items in the browser, and ships server packages for read-aloud synthesis; element controllers can also run on your server for secure delivery. You bring the backend: content storage, authentication, session storage, reporting and infrastructure.
			</p>
		</div>

		<div class="grid md:grid-cols-2 gap-8 items-start mb-8">
			<div>
				<h3 class="text-2xl font-bold text-primary mb-6">PIE Provides</h3>
				<ul class="space-y-3">
					<li class="flex items-start gap-3">
						<svg class="w-6 h-6 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						<div>
							<p class="font-semibold">{ELEMENT_COUNT} Element Types</p>
							<p class="text-sm text-base-content/70">Multiple choice, graphing, drag-and-drop, constructed response, and more</p>
						</div>
					</li>
					<li class="flex items-start gap-3">
						<svg class="w-6 h-6 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						<div>
							<p class="font-semibold">WYSIWYG Authoring Interfaces</p>
							<p class="text-sm text-base-content/70">Educators build content in visual editors, with a live preview the host renders beside them</p>
						</div>
					</li>
					<li class="flex items-start gap-3">
						<svg class="w-6 h-6 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						<div>
							<p class="font-semibold">Item, Section and Print Players</p>
							<p class="text-sm text-base-content/70">The item player renders one item, section players lay out pages of items and passages with tools, and the print player renders printable versions</p>
						</div>
					</li>
					<li class="flex items-start gap-3">
						<svg class="w-6 h-6 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						<div>
							<p class="font-semibold">Assessment Toolkit</p>
							<p class="text-sm text-base-content/70">Calculator, text-to-speech, accommodations, and more &mdash; coordinated through a centralized ToolkitCoordinator, around a section player or a single item player</p>
						</div>
					</li>
					<li class="flex items-start gap-3">
						<svg class="w-6 h-6 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						<div>
							<p class="font-semibold">QTI-Inspired Models</p>
							<p class="text-sm text-base-content/70">Sections and assessments follow QTI 3.0's test parts, sections and item references</p>
						</div>
					</li>
				</ul>
			</div>

			<div>
				<h3 class="text-2xl font-bold text-secondary mb-6">You Provide</h3>
				<ul class="space-y-3">
					<li class="flex items-start gap-3">
						<svg class="w-6 h-6 text-secondary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
						</svg>
						<div>
							<p class="font-semibold">Item Storage & Retrieval</p>
							<p class="text-sm text-base-content/70">Your CMS, item bank, or content repository</p>
						</div>
					</li>
					<li class="flex items-start gap-3">
						<svg class="w-6 h-6 text-secondary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
						</svg>
						<div>
							<p class="font-semibold">Authentication & Authorization</p>
							<p class="text-sm text-base-content/70">User management, permissions, session handling</p>
						</div>
					</li>
					<li class="flex items-start gap-3">
						<svg class="w-6 h-6 text-secondary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
						</svg>
						<div>
							<p class="font-semibold">Session Storage</p>
							<p class="text-sm text-base-content/70">Durable storage for the learner sessions the players hand back</p>
						</div>
					</li>
					<li class="flex items-start gap-3">
						<svg class="w-6 h-6 text-secondary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
						</svg>
						<div>
							<p class="font-semibold">Assessment Shell</p>
							<p class="text-sm text-base-content/70">Navigation, timing and submission, assembled around the players</p>
						</div>
					</li>
					<li class="flex items-start gap-3">
						<svg class="w-6 h-6 text-secondary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
						</svg>
						<div>
							<p class="font-semibold">Server-Side Scoring for High Stakes</p>
							<p class="text-sm text-base-content/70">For hosted delivery: a server that runs the element controllers, strips answer keys from models and computes scores</p>
						</div>
					</li>
					<li class="flex items-start gap-3">
						<svg class="w-6 h-6 text-secondary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
						</svg>
						<div>
							<p class="font-semibold">Provider Accounts</p>
							<p class="text-sm text-base-content/70">A Desmos API key and license for the default calculator, a GeoGebra license, or the bundled open-source Cortex calculator; a synthesis endpoint, <code>/api/tts</code> by default, for server read-aloud</p>
						</div>
					</li>
					<li class="flex items-start gap-3">
						<svg class="w-6 h-6 text-secondary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
						</svg>
						<div>
							<p class="font-semibold">Reporting & Analytics</p>
							<p class="text-sm text-base-content/70">Score reports, analytics, learning insights</p>
						</div>
					</li>
					<li class="flex items-start gap-3">
						<svg class="w-6 h-6 text-secondary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
						</svg>
						<div>
							<p class="font-semibold">Infrastructure & Hosting</p>
							<p class="text-sm text-base-content/70">Your servers, databases, deployment pipeline</p>
						</div>
					</li>
				</ul>
			</div>
		</div>

		<Diagram
			name="home-browser-backend"
			width={1008}
			height={648}
			class="max-w-4xl"
			alt="In the browser, your application hosts the PIE players and assessment toolkit, which render the PIE elements; item config and session go in as JSON and DOM events come out. Your servers hold the item bank, sessions and scores, authentication and hosting, reached through your own API."
		/>

		<div class="text-center">
			<p class="text-lg text-base-content/70 max-w-3xl mx-auto">
				This separation means PIE integrates with any backend technology. Your authoring CMS and production delivery system can be unified or separate &mdash; PIE works because it speaks JSON and emits standard events.
			</p>
		</div>
	</div>
</section>

<!-- PIE Elements Section -->
<section class="py-12 bg-base-100">
	<div class="container mx-auto px-4 max-w-7xl">
		<div class="text-center mb-8">
			<h2 class="text-3xl md:text-4xl font-bold text-secondary mb-3">
				PIE Elements: The Question Type Framework
			</h2>
			<p class="text-lg text-base-content/70 max-w-3xl mx-auto">
				{ELEMENT_COUNT_SENTENCE} Each element ships a delivery view and a controller. All but {withoutAuthoring}
				ship an authoring view, and {PRINT_COUNT} ship a print view rendered by <code>&lt;pie-print&gt;</code>.
			</p>
		</div>

		<Diagram
			name="home-page-anatomy"
			width={1008}
			height={644}
			class="max-w-4xl"
			alt="A section player inside your application, with a section toolbar for tools such as the color scheme, graph, periodic table, line reader and ruler. It holds item players, each with an item toolbar for read aloud, highlighting and the calculator, around a passage, a multiple-choice element and a graphing element."
		/>

		<div class="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
			{#each groups as g (g.group)}
				<div class="card bg-base-100 border border-base-300">
					<div class="card-body p-5">
						<h3 class="font-bold text-primary">{g.group}</h3>
						<p class="text-xs uppercase tracking-wide text-base-content/60 mb-2">
							{g.count} elements
						</p>
						<ul class="text-sm space-y-1">
							{#each g.examples as name (name)}
								<li>{name}</li>
							{/each}
							{#if g.more > 0}
								<li class="text-base-content/60">and {g.more} more</li>
							{/if}
						</ul>
					</div>
				</div>
			{/each}
		</div>

		<ul class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
			{#each tiles as { element, capture, href } (element.name)}
				<li class="card bg-base-100 border border-base-300 shadow-sm overflow-hidden">
					<figure class="bg-white p-3 border-b border-base-300 h-48">
						<img
							src="{base}/images/elements/{capture.file}"
							alt={capture.alt}
							width={capture.width}
							height={capture.height}
							loading="lazy"
							decoding="async"
							class="w-full h-full object-contain object-top"
						/>
					</figure>
					<div class="card-body p-4 gap-1">
						<h3 class="font-semibold"><a {href} class="link link-hover text-primary">{element.displayName}</a></h3>
						<p class="text-sm text-base-content/70">{capture.caption}</p>
					</div>
				</li>
			{/each}
		</ul>

		<div class="flex flex-wrap justify-center gap-3">
			<a href="{base}/docs/items-elements/" class="btn btn-primary btn-lg">
				Explore PIE Elements
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
				</svg>
			</a>
			<ExternalLink href={SITES.elementsDemo} class="btn btn-outline btn-primary btn-lg"
				>Try them live</ExternalLink
			>
		</div>
	</div>
</section>

<!-- QTI Interoperability Section -->
<section class="py-12 bg-base-200">
	<div class="container mx-auto px-4 max-w-7xl">
		<div class="text-center mb-8">
			<h2 class="text-3xl md:text-4xl font-bold text-secondary mb-3">
				QTI Interoperability
			</h2>
			<p class="text-lg text-base-content/70 max-w-3xl mx-auto">
				PIE-QTI, a sibling project, provides QTI item and assessment players for QTI 2.2 and 3.0 content (pre-1.0; certification in progress), ingests QTI 2.1, and converts between QTI and PIE.
			</p>
		</div>

		<div class="grid md:grid-cols-2 gap-8 items-center">
			<div>
				<ul class="space-y-3">
					<li class="flex items-start gap-3">
						<svg class="w-6 h-6 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						<div>
							<strong>Version-Agnostic Architecture</strong> &mdash; Auto-detects QTI version from XML and maps both QTI 2.x (camelCase) and QTI 3.0 (kebab-case with <code>qti-</code> prefix) to a shared canonical model
						</div>
					</li>
					<li class="flex items-start gap-3">
						<svg class="w-6 h-6 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						<div>
							<strong>QTI Item & Assessment Players</strong> &mdash; extractors for all 21 QTI 2.2 interaction types and 78 response-processing expression kinds; coverage is broad but not yet fully conformant
						</div>
					</li>
					<li class="flex items-start gap-3">
						<svg class="w-6 h-6 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						<div>
							<strong>Bidirectional Transforms</strong> &mdash; plugin-based transform packages and a CLI (in development) for converting between QTI and PIE
						</div>
					</li>
					<li class="flex items-start gap-3">
						<svg class="w-6 h-6 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
						<div>
							<strong>QTI 3.0 Influence on PIE</strong> &mdash; QTI 3.0 accessibility catalogs shaped the toolkit's catalog model, and its personal needs profiles follow AfA PNP 3.0, the model QTI 3.0 uses
						</div>
					</li>
				</ul>
			</div>

			<div>
				<div class="card bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20">
					<div class="card-body">
						<div class="flex items-center gap-3 mb-4">
							<div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
								<svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
								</svg>
							</div>
							<h3 class="text-2xl font-bold text-primary">PIE-QTI</h3>
						</div>
						<p class="mb-4">
							QTI 2.2 and 3.0 item and assessment players (pre-1.0) with version detection and shared response processing, plus transforms between QTI and PIE.
						</p>
						<div class="flex flex-col gap-2">
							<a href="{base}/docs/qti/" class="btn btn-primary btn-block">
								QTI & Standards Docs
								<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
								</svg>
							</a>
							<ExternalLink href={SITES.qti} class="btn btn-outline btn-primary btn-block"
								>PIE-QTI docs and examples</ExternalLink
							>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Partners Section -->
<section class="py-12 bg-secondary text-secondary-content">
	<div class="container mx-auto px-4 max-w-6xl">
		<div class="text-center mb-10">
			<h2 class="text-3xl md:text-4xl font-bold mb-4">
				Trusted Partners
			</h2>
			<p class="text-lg opacity-90 max-w-3xl mx-auto">
				PIE is sponsored and developed in collaboration with leading organizations in educational technology.
			</p>
		</div>

		<div class="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
			<div class="card bg-secondary-content/10 backdrop-blur-sm border border-secondary-content/20">
				<div class="card-body text-center">
					<div class="flex justify-center mb-4">
						<img src="{base}/renaissance-logo.svg" alt="Renaissance" class="h-12 brightness-0 invert" />
					</div>
					<p class="opacity-90 mb-4 leading-relaxed">
						PIE's primary sponsor and largest production user, serving approximately 40% of U.S. schools.
					</p>
					<a href="https://www.renaissance.com" target="_blank" rel="noopener noreferrer" class="btn btn-accent btn-sm" aria-label="Learn more about Renaissance">
						Learn More
					</a>
				</div>
			</div>

			<div class="card bg-secondary-content/10 backdrop-blur-sm border border-secondary-content/20">
				<div class="card-body text-center">
					<div class="flex justify-center mb-4">
						<img src="{base}/mcro-logo.svg" alt="MCRO" class="h-12" />
					</div>
					<p class="opacity-90 mb-4 leading-relaxed">
						Implementation partner since 2017. MCRO has been instrumental in developing PIE from concept to production-ready framework.
					</p>
					<a href="https://mcro.tech" target="_blank" rel="noopener noreferrer" class="btn btn-accent btn-sm" aria-label="Learn more about MCRO">
						Learn More
					</a>
				</div>
			</div>
		</div>
	</div>
</section>
