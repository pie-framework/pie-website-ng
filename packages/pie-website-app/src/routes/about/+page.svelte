<script lang="ts">
	const technologies = [
		{ name: 'Custom Elements', description: 'W3C Web Components standard' },
		{ name: 'ES Modules', description: 'ES6 preferred, CommonJS supported' },
		{ name: 'JSON', description: 'For configuration data' },
		{ name: 'NPM', description: 'Package management' }
	];

	const ecosystem = [
		{
			title: 'PIE Elements',
			icon: '🧩',
			description: 'A suite of open source question types and UI components',
			features: ['Multiple choice', 'Text entry', 'Math expressions', 'Drag and drop', 'Graphing']
		},
		{
			title: 'PIE Player',
			icon: '▶️',
			description: 'Open source runtime for rendering PIE-based assessments',
			features: ['Framework agnostic', 'Element loading', 'Session management', 'Event handling']
		},
		{
			title: 'PIE Author',
			icon: '✏️',
			description: 'Authoring components for creating and configuring PIE elements',
			features: ['Visual editing', 'Configuration UI', 'Live preview', 'Reusable components']
		},
		{
			title: 'PIE Tools',
			icon: '🛠️',
			description: 'Development and packaging tools',
			features: ['CLI tooling', 'Module bundling', 'Development server', 'Package creation']
		}
	];
</script>

<div class="container mx-auto px-4 py-12 max-w-7xl">
	<!-- Hero Section -->
	<div class="text-center mb-20">
		<h1 class="text-6xl font-bold text-secondary mb-6">About PIE Framework</h1>
		<p class="text-2xl text-base-content/70 max-w-4xl mx-auto leading-relaxed">
			Portable Interactions and Elements (PIE) is an open source framework for building, distributing, and rendering re-usable UI elements and interactions for assessments
		</p>
	</div>

	<!-- What is PIE For -->
	<section class="mb-24">
		<h2 class="text-4xl font-bold text-secondary mb-8">What is it For?</h2>

		<div class="grid lg:grid-cols-2 gap-8 mb-12">
			<!-- Challenges -->
			<div class="card bg-base-100 shadow-xl border border-base-300">
				<div class="card-body">
					<h3 class="card-title text-2xl mb-4">Challenges PIE Addresses</h3>
					<ul class="space-y-3">
						<li class="flex items-start gap-3">
							<span class="text-error text-xl mt-1">•</span>
							<span>Assessment items don't look and behave the same way across different systems</span>
						</li>
						<li class="flex items-start gap-3">
							<span class="text-error text-xl mt-1">•</span>
							<span>Advanced, engaging interactions are difficult to create and share</span>
						</li>
						<li class="flex items-start gap-3">
							<span class="text-error text-xl mt-1">•</span>
							<span>Content portability between platforms is limited</span>
						</li>
						<li class="flex items-start gap-3">
							<span class="text-error text-xl mt-1">•</span>
							<span>Advanced scoring algorithms are hard to implement consistently</span>
						</li>
					</ul>
				</div>
			</div>

			<!-- Solutions -->
			<div class="card bg-base-100 shadow-xl border border-base-300">
				<div class="card-body">
					<h3 class="card-title text-2xl mb-4">What PIE Provides</h3>
					<ul class="space-y-3">
						<li class="flex items-start gap-3">
							<span class="text-success text-xl mt-1">✓</span>
							<span>A framework for developing re-usable assessment interactions</span>
						</li>
						<li class="flex items-start gap-3">
							<span class="text-success text-xl mt-1">✓</span>
							<span>An open source player for rendering assessments</span>
						</li>
						<li class="flex items-start gap-3">
							<span class="text-success text-xl mt-1">✓</span>
							<span>Tools for sharing assessments in a distributable format</span>
						</li>
						<li class="flex items-start gap-3">
							<span class="text-success text-xl mt-1">✓</span>
							<span>A suite of open source question types and UI components</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</section>

	<!-- How Does it Work -->
	<section class="mb-24">
		<h2 class="text-4xl font-bold text-secondary mb-6">How Does it Work?</h2>
		<p class="text-lg text-base-content/70 mb-8 max-w-4xl">
			PIE adopts web standards wherever possible and uses web development best practices to make development straightforward.
		</p>

		<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
			{#each technologies as tech}
				<div class="card bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/30 shadow-lg">
					<div class="card-body">
						<h3 class="card-title text-lg text-primary">{tech.name}</h3>
						<p class="text-sm text-base-content/70">{tech.description}</p>
					</div>
				</div>
			{/each}
		</div>
	</section>

	<!-- The PIE Ecosystem -->
	<section class="mb-24">
		<h2 class="text-4xl font-bold text-secondary mb-12 text-center">The PIE Ecosystem</h2>

		<div class="grid md:grid-cols-2 gap-8">
			{#each ecosystem as component}
				<div class="card bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition-all">
					<div class="card-body">
						<div class="flex items-center gap-4 mb-4">
							<div class="text-5xl">{component.icon}</div>
							<div>
								<h3 class="card-title text-2xl text-secondary">{component.title}</h3>
							</div>
						</div>
						<p class="text-base-content/70 mb-4">{component.description}</p>
						<ul class="space-y-2">
							{#each component.features as feature}
								<li class="flex items-center gap-2 text-sm">
									<svg class="w-4 h-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
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

	<!-- Origin and Development -->
	<section class="mb-24">
		<div class="card bg-gradient-to-br from-secondary/10 to-secondary/5 shadow-xl">
			<div class="card-body">
				<h2 class="text-3xl font-bold text-secondary mb-4">Development History</h2>
				<div class="prose prose-lg max-w-none">
					<p class="text-base-content/80">
						The PIE Framework originated from work by CoreSpring.org in building authoring and rendering tools for assessment interactions. It was created as an open source project to help educators have better access to high-quality and more interactive assessment interactions, designed to be compatible with the approach suggested by Smarter Balanced in their ARI (Accessible Rendering and Interoperability) proposal.
					</p>
					<p class="text-base-content/80">
						Since those early days, PIE has been consistently developed and maintained by Renaissance Learning (and before that Illuminate Education, which was acquired by Renaissance Learning). Renaissance Learning has invested in PIE's ongoing development, ensuring the framework continues to evolve with modern web standards and educational needs.
					</p>
					<p class="text-base-content/80">
						Today, PIE is the preferred framework for assessment items at Renaissance Learning, powering assessment item delivery across their product portfolio including Star Assessments, DnA, SchoolCity, and Accelerated Reader—products used by schools worldwide. Beyond Renaissance, school districts leverage PIE to author custom assessment items tailored to their specific curriculum needs, and content providers have integrated PIE into their content management systems to deliver interactive assessments at scale.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- License -->
	<section class="mb-24">
		<h2 class="text-4xl font-bold text-secondary mb-8">Open Source License</h2>
		<div class="card bg-base-100 shadow-xl border-2 border-primary/30">
			<div class="card-body">
				<div class="flex items-start gap-6">
					<div class="text-6xl">🔓</div>
					<div class="flex-1">
						<h3 class="text-2xl font-bold text-primary mb-4">ISC License</h3>
						<p class="text-base-content/70 mb-6">
							PIE is licensed under the ISC License, one of the most permissive open-source licenses available. This means you can use, modify, and distribute PIE freely for any purpose, including commercial use, without fees or royalties.
						</p>

						<div class="grid md:grid-cols-2 gap-4">
							<ul class="space-y-2">
								<li class="flex items-start gap-2">
									<svg class="w-5 h-5 text-success mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
									</svg>
									<span>Use commercially without restriction</span>
								</li>
								<li class="flex items-start gap-2">
									<svg class="w-5 h-5 text-success mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
									</svg>
									<span>Modify and customize freely</span>
								</li>
								<li class="flex items-start gap-2">
									<svg class="w-5 h-5 text-success mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
									</svg>
									<span>Distribute as you wish</span>
								</li>
							</ul>
							<ul class="space-y-2">
								<li class="flex items-start gap-2">
									<svg class="w-5 h-5 text-success mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
									</svg>
									<span>No royalties or fees ever</span>
								</li>
								<li class="flex items-start gap-2">
									<svg class="w-5 h-5 text-success mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
									</svg>
									<span>Keep your modifications private if needed</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Standards Compatibility -->
	<section class="mb-24">
		<h2 class="text-4xl font-bold text-secondary mb-8">Education Technology Standards</h2>
		<div class="alert mb-6">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info shrink-0 w-6 h-6">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
			</svg>
			<span>PIE itself is not a standard—it is a working open source implementation designed to provide a full-stack solution for creating, packaging, and rendering assessment items.</span>
		</div>

		<div class="grid md:grid-cols-3 gap-6">
			<div class="card bg-base-100 shadow-lg border border-base-300">
				<div class="card-body">
					<h3 class="card-title text-lg">IMS Caliper / xAPI</h3>
					<p class="text-sm text-base-content/70">
						PIE supports exporting activity events during user interaction, enabling integration with IMS Caliper and xAPI (Tin Can/CMI5).
					</p>
				</div>
			</div>

			<div class="card bg-base-100 shadow-lg border border-base-300">
				<div class="card-body">
					<h3 class="card-title text-lg">IMS LTI</h3>
					<p class="text-sm text-base-content/70">
						PIE rendering can be wrapped in pages that use LTI Launch, and outcomes can be returned through LTI outcomes services.
					</p>
				</div>
			</div>

			<div class="card bg-base-100 shadow-lg border border-base-300">
				<div class="card-body">
					<h3 class="card-title text-lg">IMS QTI</h3>
					<p class="text-sm text-base-content/70">
						QTI items can be converted into PIE format and compiled for distribution with full visual rendering and behavior preserved.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Get Involved -->
	<section class="mb-24">
		<h2 class="text-4xl font-bold text-secondary text-center mb-6">Get Involved</h2>
		<p class="text-center text-base-content/70 mb-12 text-lg">PIE is community-driven and welcomes contributions</p>

		<div class="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
			<div class="card bg-base-100 shadow-lg border border-base-300 hover:shadow-2xl transition-all">
				<div class="card-body items-center text-center">
					<div class="text-5xl mb-4">💻</div>
					<h3 class="card-title text-lg mb-2">Contribute Code</h3>
					<p class="text-sm text-base-content/70">Submit pull requests with improvements, bug fixes, or new elements</p>
				</div>
			</div>

			<div class="card bg-base-100 shadow-lg border border-base-300 hover:shadow-2xl transition-all">
				<div class="card-body items-center text-center">
					<div class="text-5xl mb-4">🐛</div>
					<h3 class="card-title text-lg mb-2">Report Issues</h3>
					<p class="text-sm text-base-content/70">Found a bug or have a feature request? Open an issue on GitHub</p>
				</div>
			</div>

			<div class="card bg-base-100 shadow-lg border border-base-300 hover:shadow-2xl transition-all">
				<div class="card-body items-center text-center">
					<div class="text-5xl mb-4">📖</div>
					<h3 class="card-title text-lg mb-2">Share Knowledge</h3>
					<p class="text-sm text-base-content/70">Write tutorials, help others learn, and share your experiences</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Connect Section -->
	<section>
		<div class="card bg-gradient-to-br from-primary to-secondary text-primary-content shadow-2xl">
			<div class="card-body items-center text-center py-12">
				<h2 class="text-4xl font-bold mb-8">Connect With Us</h2>
				<div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-4xl">
					<a href="https://github.com/pie-framework" target="_blank" rel="noopener noreferrer"
					   class="btn btn-outline btn-primary-content">
						<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
							<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
						</svg>
						GitHub
					</a>
					<a href="/docs" class="btn btn-outline btn-primary-content">
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
						</svg>
						Documentation
					</a>
					<a href="https://github.com/pie-framework/discussions" target="_blank" rel="noopener noreferrer"
					   class="btn btn-outline btn-primary-content">
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
						</svg>
						Community
					</a>
					<a href="/docs/getting-started" class="btn btn-outline btn-primary-content">
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
						</svg>
						Get Started
					</a>
				</div>
			</div>
		</div>
	</section>
</div>
