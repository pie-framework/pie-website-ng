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
			description: 'A suite of open source question types and UI components',
			features: ['Multiple choice', 'Text entry', 'Math expressions', 'Drag and drop', 'Graphing']
		},
		{
			title: 'PIE Players',
			description: 'Open source runtimes for rendering PIE items, assessments and tools and accommodations',
			features: ['Framework agnostic', 'Element loading', 'Session management', 'Event handling']
		},
		{
			title: 'PIE Author',
			description: 'Authoring components for creating and configuring PIE elements',
			features: ['Visual editing', 'Configuration UI', 'Live preview', 'Reusable components']
		},
		{
			title: 'PIE Tools',
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
						<h3 class="card-title text-2xl text-secondary mb-4">{component.title}</h3>
						<p class="text-base-content/70 mb-4">{component.description}</p>
						<ul class="space-y-2">
							{#each component.features as feature}
								<li class="flex items-center gap-2 text-sm">
									<svg class="w-4 h-4 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4.5 12.5l4.2 4.3c0.1 0.1 0.2 0.1 0.3 0 L19.5 6.8" style="paint-order: stroke;"></path>
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
						Since those early days, PIE has been consistently developed and maintained by Renaissance (and before that Illuminate Education, which was acquired by Renaissance). Renaissance has invested in PIE's ongoing development, ensuring the framework continues to evolve with modern web standards and educational needs.
					</p>
					<p class="text-base-content/80">
						Today, PIE is the preferred framework for assessment items at Renaissance, powering assessment item delivery across their product portfolio including Star Assessments, DnA, SchoolCity, and Accelerated Reader—products used by schools worldwide. Beyond Renaissance, school districts leverage PIE to author custom assessment items tailored to their specific curriculum needs, and content providers have integrated PIE into their content management systems to deliver interactive assessments at scale.
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
				<h3 class="text-2xl font-bold text-primary mb-4">Open Source: MIT & ISC Licenses</h3>
				<p class="text-base-content/70 mb-6">
					PIE projects are licensed under permissive open-source licenses (primarily MIT and ISC), allowing you to use, modify, and distribute PIE freely for any purpose, including commercial use, without fees or royalties.
				</p>

				<div class="grid md:grid-cols-2 gap-4">
					<ul class="space-y-2">
						<li class="flex items-start gap-2">
							<svg class="w-5 h-5 text-success mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4.5 12.5l4.2 4.3c0.1 0.1 0.2 0.1 0.3 0 L19.5 6.8" style="paint-order: stroke;"></path>
							</svg>
							<span>Use commercially without restriction</span>
						</li>
						<li class="flex items-start gap-2">
							<svg class="w-5 h-5 text-success mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4.5 12.5l4.2 4.3c0.1 0.1 0.2 0.1 0.3 0 L19.5 6.8" style="paint-order: stroke;"></path>
							</svg>
							<span>Modify and customize freely</span>
						</li>
						<li class="flex items-start gap-2">
							<svg class="w-5 h-5 text-success mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4.5 12.5l4.2 4.3c0.1 0.1 0.2 0.1 0.3 0 L19.5 6.8" style="paint-order: stroke;"></path>
							</svg>
							<span>Distribute as you wish</span>
						</li>
					</ul>
					<ul class="space-y-2">
						<li class="flex items-start gap-2">
							<svg class="w-5 h-5 text-success mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4.5 12.5l4.2 4.3c0.1 0.1 0.2 0.1 0.3 0 L19.5 6.8" style="paint-order: stroke;"></path>
							</svg>
							<span>No royalties or fees ever</span>
						</li>
						<li class="flex items-start gap-2">
							<svg class="w-5 h-5 text-success mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4.5 12.5l4.2 4.3c0.1 0.1 0.2 0.1 0.3 0 L19.5 6.8" style="paint-order: stroke;"></path>
							</svg>
							<span>Keep your modifications private if needed</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</section>
</div>
