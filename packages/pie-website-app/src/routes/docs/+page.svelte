<script lang="ts">
	const sections = [
		{
			title: 'Getting Started',
			icon: '🚀',
			description: 'New to PIE? Start here to install and render your first question in minutes',
			links: [
				{ label: 'Getting Started', href: '/docs/getting-started', description: 'Quick start guide' },
				{
					label: 'Core Concepts',
					href: '/docs/core-concepts',
					description: 'Architecture and design principles'
				}
			]
		},
		{
			title: 'Tutorials',
			icon: '📚',
			description: 'Step-by-step guides for building with PIE',
			links: [
				{ label: 'Tutorials Hub', href: '/docs/tutorials', description: 'All tutorials' },
				{
					label: 'Creating PIE Elements',
					href: '/docs/tutorials/creating-elements',
					description: 'Build custom question types'
				},
				{
					label: 'Implementing Controllers',
					href: '/docs/tutorials/model-function',
					description: 'Master model() and outcome()'
				},
				{
					label: 'Building Authoring UIs',
					href: '/docs/tutorials/authoring-interface',
					description: 'Create configuration interfaces'
				},
				{
					label: 'Designing a Backend',
					href: '/docs/tutorials/backend-design',
					description: 'Build a complete PIE-powered system'
				}
			]
		},
		{
			title: 'Guides',
			icon: '📖',
			description: 'Dive deeper into specific topics',
			links: [
				{
					label: 'PIE Player',
					href: '/docs/player',
					description: 'Runtime orchestration',
					comingSoon: true
				},
				{
					label: 'PIE Author',
					href: '/docs/author',
					description: 'Rich authoring experiences',
					comingSoon: true
				},
				{
					label: 'Integration Guide',
					href: '/docs/integration',
					description: 'Add PIE to your app',
					comingSoon: true
				}
			]
		},
		{
			title: 'Reference',
			icon: '📋',
			description: 'Technical specifications and API documentation',
			links: [
				{ label: 'API Reference', href: '/docs/api', description: 'Complete API docs', comingSoon: true },
				{ label: 'Element Catalog', href: '/elements', description: '20+ question types' },
				{
					label: 'Configuration Options',
					href: '/docs/config',
					description: 'Customize PIE behavior',
					comingSoon: true
				}
			]
		}
	];

	const helpResources = [
		{ label: 'FAQ', href: '/docs/faq', comingSoon: true },
		{ label: 'Troubleshooting', href: '/docs/troubleshooting', comingSoon: true },
		{ label: 'GitHub Discussions', href: 'https://github.com/pie-framework/discussions', external: true },
		{ label: 'GitHub Issues', href: 'https://github.com/pie-framework/issues', external: true }
	];
</script>

<div class="container mx-auto px-4 py-12 max-w-7xl">
	<!-- Hero Section -->
	<div class="text-center mb-16">
		<h1 class="text-5xl font-bold text-secondary mb-4">Documentation</h1>
		<p class="text-xl text-base-content/70 max-w-3xl mx-auto">
			Everything you need to build, integrate, and extend interactive assessment items with PIE
			Framework
		</p>
	</div>

	<!-- Main Sections Grid -->
	<div class="grid md:grid-cols-2 gap-8 mb-16">
		{#each sections as section}
			<div class="card bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition-all">
				<div class="card-body">
					<div class="flex items-center gap-4 mb-4">
						<div class="text-5xl">{section.icon}</div>
						<h2 class="card-title text-2xl text-secondary">{section.title}</h2>
					</div>
					<p class="text-base-content/70 mb-4">{section.description}</p>
					<div class="space-y-2">
						{#each section.links as link}
							<a
								href={link.href}
								class="flex items-start gap-2 p-3 rounded-lg hover:bg-base-200 transition-colors group {link.comingSoon
									? 'opacity-50 pointer-events-none'
									: ''}"
							>
								<svg
									class="w-5 h-5 text-primary mt-0.5 group-hover:translate-x-1 transition-transform"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M13 7l5 5m0 0l-5 5m5-5H6"
									></path>
								</svg>
								<div class="flex-1">
									<div class="font-medium text-secondary group-hover:text-primary transition-colors">
										{link.label}
										{#if link.comingSoon}
											<span class="badge badge-sm ml-2">Coming Soon</span>
										{/if}
									</div>
									<div class="text-sm text-base-content/60">{link.description}</div>
								</div>
							</a>
						{/each}
					</div>
				</div>
			</div>
		{/each}
	</div>

	<!-- Help Section -->
	<div class="card bg-primary text-primary-content shadow-xl">
		<div class="card-body">
			<h2 class="card-title text-2xl mb-4">Need Help?</h2>
			<div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
				{#each helpResources as resource}
					<a
						href={resource.href}
						target={resource.external ? '_blank' : undefined}
						rel={resource.external ? 'noopener noreferrer' : undefined}
						class="btn btn-outline btn-primary-content {resource.comingSoon
							? 'opacity-50 pointer-events-none'
							: ''}"
					>
						{resource.label}
						{#if resource.external}
							<svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
								></path>
							</svg>
						{/if}
						{#if resource.comingSoon}
							<span class="badge badge-sm ml-2">Soon</span>
						{/if}
					</a>
				{/each}
			</div>
		</div>
	</div>

	<!-- Footer CTA -->
	<div class="text-center mt-16">
		<p class="text-base-content/60">
			Can't find what you're looking for? Let us know on
			<a
				href="https://github.com/pie-framework/discussions"
				target="_blank"
				rel="noopener noreferrer"
				class="link link-primary">GitHub Discussions</a
			>
		</p>
	</div>
</div>
