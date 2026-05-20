<script lang="ts">
	import { base } from '$app/paths';

	const technologies = [
		{ name: 'Custom Elements', description: 'W3C Web Components standard for framework-agnostic UI' },
		{ name: 'ES Modules', description: 'Native browser imports with tree-shaking and caching' },
		{ name: 'JSON', description: 'Item configuration, session state, and API communication' },
		{ name: 'NPM', description: 'Package distribution and dependency management' }
	];

	const ecosystem = [
		{
			title: 'PIE Elements',
			description: '20+ production-ready question types with delivery, authoring, and controller interfaces',
			features: ['Multiple choice, text entry, math expressions', 'Drag-and-drop, graphing, hotspot', 'WYSIWYG authoring with live preview', 'Partial credit scoring and feedback']
		},
		{
			title: 'PIE Players',
			description: 'A layered player hierarchy from individual questions to full assessment delivery',
			features: ['Item player with multiple loading strategies', 'Section player for page-level composition', 'Assessment player for multi-section orchestration', 'All delivered as Web Components']
		},
		{
			title: 'Assessment Toolkit',
			description: 'Composable services for tools, accommodations, and accessibility coordinated through ToolkitCoordinator',
			features: ['Calculator, ruler, protractor, graph tools', 'Text-to-speech with word-level highlighting', 'Annotation toolbar and answer eliminator', 'QTI 3.0-inspired PNP accommodation model']
		},
		{
			title: 'PIE-QTI',
			description: 'Sibling project providing QTI players and bidirectional transforms with version-agnostic architecture',
			features: ['QTI 2.x and 3.0 item and assessment players', 'Auto-detection of QTI version from XML', 'Plugin-based transform engine with CLI', 'IMS Content Package support']
		}
	];
</script>

<svelte:head>
	<title>About - PIE Framework</title>
	<meta name="description" content="Learn about PIE (Portable Interactions and Elements), the open-source assessment framework built on web standards." />
</svelte:head>

<div class="container mx-auto px-4 py-12 max-w-7xl">
	<div class="text-center mb-20">
		<h1 class="text-6xl font-bold text-secondary mb-6">About PIE Framework</h1>
		<p class="text-2xl text-base-content/70 max-w-4xl mx-auto leading-relaxed">
			Portable Interactions and Elements &mdash; a modern, open-source frontend framework for rendering interactive assessment items
		</p>
	</div>

	<section class="mb-24">
		<h2 class="text-4xl font-bold text-secondary mb-8">What is PIE?</h2>

		<div class="prose prose-lg max-w-none mb-8">
			<p class="text-base-content/80">
				PIE is an open-source frontend framework for rendering interactive assessment items. Unlike commercial platforms that bundle frontend, backend, and hosting into a single service, PIE focuses exclusively on what appears in the browser: the question types, authoring interfaces, and delivery players. You bring your own backend &mdash; your content management system, your item bank, your assessment administration platform, your authentication system, your scoring engine, your infrastructure.
			</p>
		</div>

		<div class="grid lg:grid-cols-2 gap-8 mb-12">
			<div class="card bg-base-100 shadow-xl border border-base-300">
				<div class="card-body">
					<h3 class="card-title text-2xl mb-4">Key Differentiators</h3>
					<ul class="space-y-3">
						<li class="flex items-start gap-3">
							<span class="text-primary text-xl mt-1 flex-shrink-0">&bull;</span>
							<span><strong>WYSIWYG Authoring</strong> &mdash; Graphical authoring interfaces with live previewing built right in</span>
						</li>
						<li class="flex items-start gap-3">
							<span class="text-primary text-xl mt-1 flex-shrink-0">&bull;</span>
							<span><strong>Framework-Agnostic</strong> &mdash; Web Components work with React, Vue, Angular, Svelte, or vanilla JS</span>
						</li>
						<li class="flex items-start gap-3">
							<span class="text-primary text-xl mt-1 flex-shrink-0">&bull;</span>
							<span><strong>Accessibility First</strong> &mdash; Every element includes keyboard navigation, screen reader support, ARIA labels, and high-contrast compatibility</span>
						</li>
						<li class="flex items-start gap-3">
							<span class="text-primary text-xl mt-1 flex-shrink-0">&bull;</span>
							<span><strong>Production-Ready</strong> &mdash; Powers some of the highest-volume assessment platforms in education</span>
						</li>
					</ul>
				</div>
			</div>

			<div class="card bg-base-100 shadow-xl border border-base-300">
				<div class="card-body">
					<h3 class="card-title text-2xl mb-4">Standards Alignment</h3>
					<ul class="space-y-3">
						<li class="flex items-start gap-3">
							<span class="text-success text-xl mt-1 flex-shrink-0">&bull;</span>
							<span><strong>QTI Interoperability</strong> &mdash; PIE-QTI provides production-ready QTI 2.x and 3.0 players alongside bidirectional transforms</span>
						</li>
						<li class="flex items-start gap-3">
							<span class="text-success text-xl mt-1 flex-shrink-0">&bull;</span>
							<span><strong>QTI-Inspired Architecture</strong> &mdash; Section and assessment models map naturally to QTI 3.0 structures</span>
						</li>
						<li class="flex items-start gap-3">
							<span class="text-success text-xl mt-1 flex-shrink-0">&bull;</span>
							<span><strong>WCAG 2.2 Level AA</strong> &mdash; Comprehensive accessibility throughout elements, players, and toolkit</span>
						</li>
						<li class="flex items-start gap-3">
							<span class="text-success text-xl mt-1 flex-shrink-0">&bull;</span>
							<span><strong>LTI Compatible</strong> &mdash; Players can be embedded in LTI tools for LMS integration</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</section>

	<section class="mb-24">
		<h2 class="text-4xl font-bold text-secondary mb-6">How Does it Work?</h2>
		<p class="text-lg text-base-content/70 mb-8 max-w-4xl">
			PIE adopts web standards wherever possible. All players and elements are distributed as HTML5 custom elements, integrating into any web page as standard HTML tags.
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
		<h2 class="text-4xl font-bold text-secondary mb-8">Open Source</h2>
		<div class="card bg-base-100 shadow-xl border-2 border-primary/30">
			<div class="card-body">
				<h3 class="text-2xl font-bold text-primary mb-4">ISC & MIT Licensed</h3>
				<p class="text-base-content/70 mb-4">
					PIE is licensed with permissive open source software licensing &mdash; ISC and MIT. Use, modify, and distribute freely for any purpose, including commercial use, without fees or royalties.
				</p>
				<p class="text-base-content/70 mb-6">
					PIE's primary sponsor, Renaissance, aims to accelerate learning for all children and adults of all ability levels and ethnic and social backgrounds, worldwide. Contributing PIE as open source supports that mission, and we welcome the community to help make the framework even better.
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
							<span>Active development by full-time team</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</section>

</div>
