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
			"name": "Renaissance Learning",
			"url": "https://www.renaissance.com"
		},
		"author": {
			"@type": "Organization",
			"name": "Renaissance Learning"
		},
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
<div class="hero min-h-[calc(100vh-4rem)] bg-gradient-to-br from-base-100 to-base-200">
	<div class="hero-content text-center py-20">
		<div class="max-w-4xl">
			<div class="flex justify-center mb-8">
				<img src="/pie-logo.svg" alt="PIE Framework Logo - Orange circular pie chart icon representing Portable Interactive Elements" class="h-24 w-24" />
			</div>
			<h1 class="text-6xl md:text-7xl font-extrabold text-secondary mb-6 leading-tight">
				PIE Framework
			</h1>
			<p class="text-2xl md:text-3xl font-semibold text-primary mb-6">
				Open Source Assessment Items
			</p>
			<p class="text-xl text-base-content/80 max-w-2xl mx-auto mb-8 leading-relaxed">
				Enterprise-proven web components for rendering 20+ interactive question types. Zero licensing costs. Modern web standards. Built by educators, for educators.
			</p>

			<!-- Trust Badges -->
			<div class="flex flex-wrap gap-3 justify-center mb-10">
				<div class="badge badge-lg badge-accent gap-2 py-4 px-4">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
					</svg>
					Battle-Tested at Enterprise Scale
				</div>
				<div class="badge badge-lg badge-accent gap-2 py-4 px-4">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
					</svg>
					20+ Question Types
				</div>
				<div class="badge badge-lg badge-accent gap-2 py-4 px-4">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
					</svg>
					Open Source & Extensible
				</div>
			</div>

			<!-- CTAs -->
			<div class="flex flex-wrap gap-4 justify-center">
				<a href="/docs/getting-started" class="btn btn-primary btn-lg text-lg px-8">
					Get Started
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
					</svg>
				</a>
				<a href="/elements" class="btn btn-secondary btn-lg text-lg px-8">
					View Elements
				</a>
				<a href="https://github.com/pie-framework" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-accent btn-lg text-lg px-8">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
						<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
					</svg>
					GitHub
				</a>
			</div>
		</div>
	</div>
</div>

<!-- What PIE Provides -->
<section class="py-20 bg-base-100">
	<div class="container mx-auto px-4 max-w-7xl">
		<div class="text-center mb-16">
			<h2 class="text-4xl md:text-5xl font-bold text-secondary mb-4">What PIE Provides</h2>
			<p class="text-xl text-base-content/70 max-w-2xl mx-auto">
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
						Server-side scoring keeps answers safe. Controllers filter sensitive data based on user role. Built with security as a foundational principle.
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
						Multiple choice to graphing, math input to drag-and-drop. Full TEI coverage with rich, interactive experiences for every question type.
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
						HTML5 Custom Elements, React, NPM. Use tools you already know. Embed anywhere. Framework-agnostic and future-proof.
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Renaissance Trust Section -->
<section class="py-20 bg-secondary text-secondary-content">
	<div class="container mx-auto px-4 max-w-5xl text-center">
		<h2 class="text-3xl md:text-4xl font-bold mb-6">
			Trusted by Renaissance Learning
		</h2>
		<p class="text-xl opacity-90 mb-8 leading-relaxed max-w-3xl mx-auto">
			PIE powers assessment delivery for Renaissance's 100+ million student interactions annually. Battle-tested at scale, now available as open source for the entire education community.
		</p>
		<a href="/about/renaissance" class="btn btn-accent btn-lg">
			Learn More About Renaissance
		</a>
	</div>
</section>

<!-- Quick Start CTA -->
<section class="py-20 bg-base-200">
	<div class="container mx-auto px-4 max-w-4xl text-center">
		<h2 class="text-4xl md:text-5xl font-bold text-secondary mb-6">
			Ready to Get Started?
		</h2>
		<p class="text-xl text-base-content/70 mb-10 max-w-2xl mx-auto">
			Install PIE Player with NPM and start rendering interactive assessments in minutes
		</p>
		<div class="mockup-code bg-neutral text-neutral-content mb-8 text-left max-w-2xl mx-auto">
			<pre data-prefix="$"><code>npm install @pie-framework/pie-player-components</code></pre>
		</div>
		<div class="flex flex-wrap gap-4 justify-center">
			<a href="/docs/getting-started" class="btn btn-primary btn-lg">
				View Quick Start Guide
			</a>
			<a href="/playground" class="btn btn-outline btn-secondary btn-lg">
				Try the Playground
			</a>
		</div>
	</div>
</section>
