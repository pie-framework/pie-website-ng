<script lang="ts">
	import { base } from '$app/paths';
</script>

<svelte:head>
	<title>PIE Framework - Open Source Assessment Items</title>
	<meta name="description" content="Enterprise-proven web components for rendering 20+ interactive question types. Zero licensing costs. Modern web standards. Built by educators, for educators." />

	<!-- JSON-LD Structured Data for LLMs and Search Engines -->
	{@html `<script type="application/ld+json">
	{
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		"name": "PIE Framework",
		"alternateName": "Portable Interactive Elements Framework",
		"description": "Open-source web components framework for creating interactive assessment items and educational content. Provides 20+ question types including multiple choice, constructed response, math input, graphing, and drag-and-drop interactions.",
		"applicationCategory": "DeveloperApplication",
		"operatingSystem": "Web Browser",
		"offers": {
			"@type": "Offer",
			"price": "0",
			"priceCurrency": "USD"
		},
		"publisher": {
			"@type": "Organization",
			"name": "Renaissance",
			"url": "https://www.renaissance.com"
		},
		"author": [
			{
				"@type": "Organization",
				"name": "Renaissance",
				"url": "https://www.renaissance.com"
			},
			{
				"@type": "Organization",
				"name": "MCRO",
				"url": "https://mcro.tech"
			}
		],
		"license": "https://opensource.org/licenses/ISC",
		"programmingLanguage": ["JavaScript", "TypeScript", "HTML", "CSS"],
		"softwareVersion": "latest",
		"codeRepository": "https://github.com/pie-framework",
		"url": "https://pie.org",
		"keywords": "assessment, education, web components, interactive questions, e-learning, testing, open source, ISC license",
		"featureList": [
			"20+ interactive question types",
			"Web Components (Custom Elements)",
			"Framework-agnostic integration",
			"Server-side scoring",
			"Role-based access control",
			"Accessible design (WCAG compliant)",
			"Battle-tested at enterprise scale",
			"Zero licensing costs"
		],
		"aggregateRating": {
			"@type": "AggregateRating",
			"ratingValue": "5",
			"reviewCount": "1",
			"bestRating": "5"
		}
	}
	</script>`}
</svelte:head>

<!-- Hero Section -->
<div class="hero bg-gradient-to-br from-base-100 to-base-200">
	<div class="hero-content text-center py-8">
		<div class="max-w-4xl">
			<h1 class="text-4xl md:text-5xl font-extrabold text-secondary mb-3 leading-tight">
				PIE Framework
			</h1>
			<p class="text-lg md:text-xl font-semibold text-primary">
				Open Source Assessment Items
			</p>
		</div>
	</div>
</div>

<!-- Why PIE? Section -->
<section class="py-12 bg-base-200">
	<div class="container mx-auto px-4 max-w-7xl">
		<div class="text-center mb-8">
			<p class="text-lg text-base-content/70 max-w-3xl mx-auto">
				Modern assessment demands more than multiple-choice bubbles. Choose PIE for interactive, accessible, production-ready question types.
			</p>
		</div>

		<div class="grid md:grid-cols-2 gap-8 items-center mb-8">
			<div>
				<h3 class="text-2xl font-bold text-primary mb-6">The Challenge</h3>
				<div class="space-y-4">
					<div class="flex items-start gap-3">
						<div class="w-8 h-8 bg-error/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
							<span class="text-error font-bold">✕</span>
						</div>
						<div>
							<p class="font-semibold mb-1">Commercial Platforms</p>
							<p class="text-sm text-base-content/70">Great if you are looking for a complete solution and it does what you need, but limited configurability and cost can add up.</p>
						</div>
					</div>
					<div class="flex items-start gap-3">
						<div class="w-8 h-8 bg-error/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
							<span class="text-error font-bold">✕</span>
						</div>
						<div>
							<p class="font-semibold mb-1">Partial Standards (QTI)</p>
							<p class="text-sm text-base-content/70">Interoperable data but no guarantee about how it will be rendered. Also doesn't come with authoring capabilities.</p>
						</div>
					</div>
					<div class="flex items-start gap-3">
						<div class="w-8 h-8 bg-error/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
							<span class="text-error font-bold">✕</span>
						</div>
						<div>
							<p class="font-semibold mb-1">Build from Scratch</p>
							<p class="text-sm text-base-content/70">Complete control but significant investment. Frameworks like <a href="https://khan.github.io/perseus" target="_blank">Perseus</a>
								from <a href="https://www.khanacademy.org" target="_blank">Khan Academy</a>&nbsp;can help you along, but PIE was created as an open source
								project with extensibility and wide adoption from the get-go.</p>
						</div>
					</div>
				</div>
			</div>

			<div>
				<h3 class="text-2xl font-bold text-success mb-6">The PIE Solution</h3>
				<div class="space-y-4">
					<div class="flex items-start gap-3">
						<div class="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
							<span class="text-success font-bold">✓</span>
						</div>
						<div>
							<p class="font-semibold mb-1">Open Source & Free</p>
							<p class="text-sm text-base-content/70">ISC/MIT licensed. Zero per-student costs. Full source code access and modification rights.</p>
						</div>
					</div>
					<div class="flex items-start gap-3">
						<div class="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
							<span class="text-success font-bold">✓</span>
						</div>
						<div>
							<p class="font-semibold mb-1">Modern & Interactive</p>
							<p class="text-sm text-base-content/70">Rich Web Components. 20+ production-ready question types. WYSIWYG authoring interfaces.</p>
						</div>
					</div>
					<div class="flex items-start gap-3">
						<div class="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
							<span class="text-success font-bold">✓</span>
						</div>
						<div>
							<p class="font-semibold mb-1">Enterprise Proven</p>
							<p class="text-sm text-base-content/70">Serving millions of learners in production. Battle-tested reliability at Renaissance scale.</p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="my-8">
			<img
				src="{base}/images/landing/pie-primer-openvsprop.png"
				alt="Open Source vs Proprietary Comparison"
				width="845"
				height="461"
				loading="lazy"
				class="rounded-lg shadow-lg w-full max-w-3xl mx-auto"
			/>
		</div>
	</div>
</section>

<!-- What PIE Provides -->
<section class="py-12 bg-base-100">
	<div class="container mx-auto px-4 max-w-7xl">
		<div class="text-center mb-10">
			<h2 class="text-3xl md:text-4xl font-bold text-secondary mb-3">What PIE Provides</h2>
			<p class="text-lg text-base-content/70 max-w-2xl mx-auto">
				Everything you need to build, deliver, and scale interactive assessments
			</p>
		</div>

		<div class="grid md:grid-cols-3 gap-8">
			<div class="card bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition-shadow">
				<div class="card-body">
					<div class="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
						</svg>
					</div>
					<h3 class="card-title text-2xl text-primary mb-2">Secure by Design</h3>
					<p class="text-base-content/80 leading-relaxed">
						Server-side scoring protects against tinkering. And controllers filter sensitive data based on user role. Built with security as a foundational principle.
					</p>
				</div>
			</div>

			<div class="card bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition-shadow">
				<div class="card-body">
					<div class="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
						</svg>
					</div>
					<h3 class="card-title text-2xl text-primary mb-2">20+ Question Types</h3>
					<p class="text-base-content/80 leading-relaxed">
						Multiple choice to graphing, math input to drag-and-drop. Extensive (and growing) TEI coverage with rich, interactive experiences.
					</p>
				</div>
			</div>

			<div class="card bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition-shadow">
				<div class="card-body">
					<div class="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
						</svg>
					</div>
					<h3 class="card-title text-2xl text-primary mb-2">Web Standards</h3>
					<p class="text-base-content/80 leading-relaxed">
						HTML5 Custom Elements, React/ Svelte/ ..., NPM. Use tools you already know. Embed anywhere. Framework-agnostic and future-proof.
					</p>
				</div>
			</div>
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
				PIE focuses on the frontend: question types, authoring interfaces, and delivery players. You control the backend.
			</p>
		</div>

		<div class="grid md:grid-cols-2 gap-8 items-center mb-8">
			<div>
				<h3 class="text-2xl font-bold text-primary mb-6">PIE Provides</h3>
				<ul class="space-y-3">
					<li class="flex items-start gap-3">
						<svg class="w-6 h-6 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						<div>
							<p class="font-semibold">Production-Ready Question Types</p>
							<p class="text-sm text-base-content/70">Multiple choice, graphing, drag-and-drop, constructed response, and more</p>
						</div>
					</li>
					<li class="flex items-start gap-3">
						<svg class="w-6 h-6 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						<div>
							<p class="font-semibold">WYSIWYG Authoring Interfaces</p>
							<p class="text-sm text-base-content/70">Educators create content without code using visual editors</p>
						</div>
					</li>
					<li class="flex items-start gap-3">
						<svg class="w-6 h-6 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						<div>
							<p class="font-semibold">Delivery Players</p>
							<p class="text-sm text-base-content/70">Render items for students and teachers with built-in accessibility</p>
						</div>
					</li>
					<li class="flex items-start gap-3">
						<svg class="w-6 h-6 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						<div>
							<p class="font-semibold">Assessment Toolkit</p>
							<p class="text-sm text-base-content/70">Calculator, TTS, accommodations, and test delivery services</p>
						</div>
					</li>
					<li class="flex items-start gap-3">
						<svg class="w-6 h-6 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						<div>
							<p class="font-semibold">A framework to build your own</p>
							<p class="text-sm text-base-content/70">Contribute to or fork the project and build your own question types</p>
						</div>
					</li>
				</ul>
			</div>

			<div>
				<h3 class="text-2xl font-bold text-secondary mb-6">You Provide</h3>
				<ul class="space-y-3">
					<li class="flex items-start gap-3">
						<svg class="w-6 h-6 text-secondary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
						</svg>
						<div>
							<p class="font-semibold">Item Storage & Retrieval</p>
							<p class="text-sm text-base-content/70">Your CMS, item bank, or content repository</p>
						</div>
					</li>
					<li class="flex items-start gap-3">
						<svg class="w-6 h-6 text-secondary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
						</svg>
						<div>
							<p class="font-semibold">Authentication & Authorization</p>
							<p class="text-sm text-base-content/70">User management, permissions, session handling</p>
						</div>
					</li>
					<li class="flex items-start gap-3">
						<svg class="w-6 h-6 text-secondary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
						</svg>
						<div>
							<p class="font-semibold">Reporting & Analytics</p>
							<p class="text-sm text-base-content/70">Score reports, analytics, learning insights</p>
						</div>
					</li>
					<li class="flex items-start gap-3">
						<svg class="w-6 h-6 text-secondary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 00-2-2m-2-4h.01M17 16h.01" />
						</svg>
						<div>
							<p class="font-semibold">Infrastructure & Hosting</p>
							<p class="text-sm text-base-content/70">Your servers, databases, deployment pipeline</p>
						</div>
					</li>
				</ul>
			</div>
		</div>

		<div class="my-8">
			<img
				src="{base}/images/landing/pie-overall-arch.png"
				alt="PIE Overall Architecture"
				width="845"
				height="461"
				loading="lazy"
				class="rounded-lg shadow-lg w-full max-w-4xl mx-auto"
			/>
		</div>

		<div class="text-center">
			<p class="text-lg text-base-content/70 max-w-3xl mx-auto">
				This separation means PIE integrates with any backend technology. Use your existing infrastructure or build exactly what you need.
			</p>
		</div>
	</div>
</section>

<!-- PIE Elements Section -->
<section class="py-12 bg-base-100">
	<div class="container mx-auto px-4 max-w-7xl">
		<div class="text-center mb-8">
			<h2 class="text-3xl md:text-4xl font-bold text-secondary mb-3">
				PIE Elements: assessment interaction components
			</h2>
			<p class="text-lg text-base-content/70 max-w-3xl mx-auto">
				Comprehensive library covering simple to highly complex interactions. Every element includes delivery UI, and controllers,
				many include an authoring UI, and interfaces like print and list views are either partially supported or planned.
			</p>
		</div>

		<div class="my-8">
			<img
				src="{base}/images/landing/pie-ecosystem-flow.jpg"
				alt="PIE Ecosystem Flow"
				width="1408"
				height="768"
				loading="lazy"
				class="rounded-lg shadow-lg w-full max-w-2xl mx-auto"
			/>
		</div>

		<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
			<div class="card bg-base-100 border border-base-300">
				<div class="card-body p-5">
					<h4 class="font-bold text-primary mb-3">Simple Response</h4>
					<ul class="text-sm space-y-2">
						<li>• Multiple Choice</li>
						<li>• Text Entry</li>
						<li>• Extended Text</li>
						<li>• Inline Choice</li>
						<li>• Math Inline</li>
					</ul>
				</div>
			</div>

			<div class="card bg-base-100 border border-base-300">
				<div class="card-body p-5">
					<h4 class="font-bold text-primary mb-3">Matching & Categorization</h4>
					<ul class="text-sm space-y-2">
						<li>• Match</li>
						<li>• Match List</li>
						<li>• Categorize</li>
						<li>• Placement Ordering</li>
						<li>• Drag in the Blank</li>
					</ul>
				</div>
			</div>

			<div class="card bg-base-100 border border-base-300">
				<div class="card-body p-5">
					<h4 class="font-bold text-primary mb-3">Visual & Graphical</h4>
					<ul class="text-sm space-y-2">
						<li>• Hotspot</li>
						<li>• Image Cloze</li>
						<li>• Drawing Response</li>
						<li>• Graphing</li>
						<li>• Number Line</li>
					</ul>
				</div>
			</div>

			<div class="card bg-base-100 border border-base-300">
				<div class="card-body p-5">
					<h4 class="font-bold text-primary mb-3">Support Elements</h4>
					<ul class="text-sm space-y-2">
						<li>• Passage</li>
						<li>• Rubric</li>
						<li>• Image</li>
						<li>• Math Templated</li>
					</ul>
				</div>
			</div>
		</div>

		<div class="my-8">
			<img
				src="{base}/images/landing/pie-question-type-example.png"
				alt="PIE Question Type Examples"
				width="2816"
				height="1536"
				loading="lazy"
				class="rounded-lg shadow-lg w-full max-w-4xl mx-auto"
			/>
		</div>

		<div class="text-center">
			<a href="/docs/items-elements" class="btn btn-primary btn-lg">
				Explore PIE Elements
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
				</svg>
			</a>
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
				PIE works alongside QTI as the standard for content transport and interoperability.
			</p>
		</div>

		<div class="grid md:grid-cols-2 gap-8 items-center">
			<div>
				<div class="prose max-w-none">
					<p class="text-lg mb-4">
						QTI (Question and Test Interoperability) is the industry standard for exchanging assessment content between systems. PIE complements QTI by providing:
					</p>
					<ul class="space-y-3">
						<li class="flex items-start gap-3">
							<svg class="w-6 h-6 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
							<div>
								<strong>Rich Interactive Experiences</strong> - Rendering and authoring beyond QTI's specification, with a predictable user experience
							</div>
						</li>
						<li class="flex items-start gap-3">
							<svg class="w-6 h-6 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
							<div>
								<strong>Bi-directional Conversion</strong> - Comprehensive tooling to import QTI content into PIE, export PIE to QTI
							</div>
						</li>
						<li class="flex items-start gap-3">
							<svg class="w-6 h-6 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
							</svg>
							<div>
								<strong>QTI Assessment compatibility</strong> - We are working towards a high degree of compatibility with the QTI assessment model
								to make imports and exports compatible
							</div>
						</li>
					</ul>
				</div>
			</div>

			<div>
				<div class="card bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20">
					<div class="card-body">
						<div class="flex items-center gap-3 mb-4">
							<div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
								<svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
								</svg>
							</div>
							<h3 class="text-2xl font-bold text-primary">PIE-QTI Tooling</h3>
						</div>
						<p class="mb-4">
							We're actively developing importers and exporters to seamlessly move between QTI (2.x and 3.x) and PIE formats.
						</p>
						<a href="https://pie-framework.github.io/pie-qti" target="_blank" class="btn btn-primary btn-block">
							Explore PIE-QTI Tools
							<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
							</svg>
						</a>
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
				PIE was built through collaboration between Renaissance and MCRO, combining educational expertise with technical excellence.
			</p>
		</div>

		<div class="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
			<!-- Renaissance -->
			<div class="card bg-secondary-content/10 backdrop-blur-sm border border-secondary-content/20">
				<div class="card-body text-center">
					<div class="flex justify-center mb-4">
						<img src="{base}/renaissance-logo.svg" alt="Renaissance" class="h-12 brightness-0 invert" />
					</div>
					<p class="opacity-90 mb-4 leading-relaxed">
						PIE powers assessment delivery for millions of learners at Renaissance. Battle-tested at enterprise scale in K-12 education.
					</p>
					<a href="https://www.renaissance.com" target="_blank" class="btn btn-accent btn-sm">
						Learn More
					</a>
				</div>
			</div>

			<!-- MCRO -->
			<div class="card bg-secondary-content/10 backdrop-blur-sm border border-secondary-content/20">
				<div class="card-body text-center">
					<div class="flex justify-center mb-4">
						<img src="{base}/mcro-logo.svg" alt="MCRO" class="h-12" />
					</div>
					<p class="opacity-90 mb-4 leading-relaxed">
						Implementation partner since 2017. MCRO has been instrumental in developing PIE from concept to production-ready framework.
					</p>
					<a href="https://mcro.tech" target="_blank" class="btn btn-accent btn-sm">
						Learn More
					</a>
				</div>
			</div>
		</div>
	</div>
</section>

