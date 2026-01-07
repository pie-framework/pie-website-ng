<script lang="ts">
	const gettingStarted = [
		{
			title: 'Quick Start',
			href: '/docs/getting-started',
			icon: '🚀',
			description: 'Install PIE and render your first question',
			difficulty: 'Beginner',
			time: '10 min'
		},
		{
			title: 'Core Concepts',
			href: '/docs/core-concepts',
			icon: '🧠',
			description: "Understand PIE's architecture",
			difficulty: 'Beginner',
			time: '15 min'
		}
	];

	const buildingElements = [
		{
			title: 'Creating a New PIE Element',
			href: '/docs/tutorials/creating-elements',
			icon: '🛠️',
			description: 'Design and build a custom element from scratch',
			difficulty: 'Intermediate',
			time: '45 min'
		},
		{
			title: 'Element Interface & Packaging',
			href: '/docs/tutorials/element-interface',
			icon: '📦',
			description: 'Understanding the PIE element contract',
			difficulty: 'Intermediate',
			time: '30 min',
			comingSoon: true
		},
		{
			title: 'Setting Up in pie-elements',
			href: '/docs/tutorials/pie-elements-setup',
			icon: '⚙️',
			description: 'Working within the monorepo',
			difficulty: 'Advanced',
			time: '20 min',
			comingSoon: true
		}
	];

	const elementLogic = [
		{
			title: 'Designing the Model Function',
			href: '/docs/tutorials/model-function',
			icon: '🎨',
			description: 'Build student and instructor views',
			difficulty: 'Intermediate',
			time: '40 min'
		},
		{
			title: 'Implementing Scoring with outcome()',
			href: '/docs/tutorials/outcome-function',
			icon: '📊',
			description: 'Calculate scores and validate responses',
			difficulty: 'Intermediate',
			time: '35 min'
		},
		{
			title: 'Role-Based Display Logic',
			href: '/docs/tutorials/role-based-logic',
			icon: '👥',
			description: 'Handle different modes and roles',
			difficulty: 'Intermediate',
			time: '25 min',
			comingSoon: true
		}
	];

	const authoringTutorials = [
		{
			title: 'Building an Authoring Interface',
			href: '/docs/tutorials/authoring-interface',
			icon: '✏️',
			description: 'Design the configuration UI',
			difficulty: 'Advanced',
			time: '60 min'
		},
		{
			title: 'Using pie-author Components',
			href: '/docs/tutorials/pie-author-components',
			icon: '🧩',
			description: 'Leverage existing authoring tools',
			difficulty: 'Intermediate',
			time: '30 min',
			comingSoon: true
		}
	];

	const backendTutorials = [
		{
			title: 'Designing a PIE Backend',
			href: '/docs/tutorials/backend-design',
			icon: '🏗️',
			description: 'Architecture and API design',
			difficulty: 'Advanced',
			time: '90 min'
		},
		{
			title: 'Learning from pie-api-aws',
			href: '/docs/tutorials/pie-api-aws-guide',
			icon: '☁️',
			description: 'Real-world backend implementation',
			difficulty: 'Advanced',
			time: '60 min',
			comingSoon: true
		},
		{
			title: 'Securing Assessment Data',
			href: '/docs/tutorials/security-best-practices',
			icon: '🔒',
			description: 'Keep answers and scoring logic safe',
			difficulty: 'Advanced',
			time: '30 min',
			comingSoon: true
		}
	];

	const advancedTopics = [
		{
			title: 'Testing PIE Elements',
			href: '/docs/tutorials/testing-elements',
			icon: '🧪',
			description: 'Unit and integration testing strategies',
			difficulty: 'Advanced',
			comingSoon: true
		},
		{
			title: 'Performance Optimization',
			href: '/docs/tutorials/performance',
			icon: '⚡',
			description: 'Make your elements fast',
			difficulty: 'Advanced',
			comingSoon: true
		},
		{
			title: 'Accessibility Guidelines',
			href: '/docs/tutorials/accessibility',
			icon: '♿',
			description: 'Build inclusive question types',
			difficulty: 'Advanced',
			comingSoon: true
		},
		{
			title: 'Internationalization',
			href: '/docs/tutorials/i18n',
			icon: '🌍',
			description: 'Support multiple languages',
			difficulty: 'Advanced',
			comingSoon: true
		}
	];

	const examples = [
		{
			title: 'Simple Multiple Choice',
			href: '/docs/tutorials/examples/multiple-choice',
			icon: '✅',
			description: 'Basic selection element',
			comingSoon: true
		},
		{
			title: 'Text Entry with Validation',
			href: '/docs/tutorials/examples/text-entry',
			icon: '✍️',
			description: 'Input with custom validation',
			comingSoon: true
		},
		{
			title: 'Interactive Graphing',
			href: '/docs/tutorials/examples/graphing',
			icon: '📈',
			description: 'Visual response element',
			comingSoon: true
		},
		{
			title: 'Multi-Part Item',
			href: '/docs/tutorials/examples/multi-part',
			icon: '🔗',
			description: 'Combining multiple elements',
			comingSoon: true
		}
	];

	function getDifficultyColor(difficulty: string): string {
		switch (difficulty) {
			case 'Beginner':
				return 'badge-success';
			case 'Intermediate':
				return 'badge-warning';
			case 'Advanced':
				return 'badge-error';
			default:
				return 'badge-ghost';
		}
	}
</script>

<div class="container mx-auto px-4 py-12 max-w-7xl">
	<!-- Hero Section -->
	<div class="text-center mb-16">
		<h1 class="text-5xl font-bold text-secondary mb-4">PIE Tutorials</h1>
		<p class="text-xl text-base-content/70 max-w-3xl mx-auto">
			Learn how to build with PIE through step-by-step guides and practical examples
		</p>
	</div>

	<!-- Getting Started -->
	<section class="mb-16">
		<div class="flex items-center gap-4 mb-8">
			<div class="text-4xl">🎯</div>
			<div>
				<h2 class="text-3xl font-bold text-secondary">Getting Started</h2>
				<p class="text-base-content/60">New to PIE? Start here</p>
			</div>
		</div>

		<div class="grid md:grid-cols-2 gap-6">
			{#each gettingStarted as tutorial}
				<a
					href={tutorial.href}
					class="card bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/30 shadow-lg hover:shadow-2xl hover:border-primary transition-all"
				>
					<div class="card-body">
						<div class="flex items-start justify-between">
							<div class="text-5xl mb-4">{tutorial.icon}</div>
							<div class="flex gap-2">
								<div class="badge {getDifficultyColor(tutorial.difficulty)}">{tutorial.difficulty}</div>
								<div class="badge badge-ghost">{tutorial.time}</div>
							</div>
						</div>
						<h3 class="card-title text-xl text-secondary">{tutorial.title}</h3>
						<p class="text-base-content/70">{tutorial.description}</p>
						<div class="card-actions justify-end mt-4">
							<div class="btn btn-primary btn-sm">
								Start Tutorial
								<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
								</svg>
							</div>
						</div>
					</div>
				</a>
			{/each}
		</div>
	</section>

	<!-- Development Tutorials -->
	<div class="divider text-xl font-semibold">Development Tutorials</div>

	<!-- Building PIE Elements -->
	<section class="mb-16">
		<div class="flex items-center gap-4 mb-8">
			<div class="text-4xl">🔨</div>
			<div>
				<h2 class="text-3xl font-bold text-secondary">Building PIE Elements</h2>
				<p class="text-base-content/60">Learn how to create custom question types</p>
			</div>
		</div>

		<div class="grid md:grid-cols-3 gap-6">
			{#each buildingElements as tutorial}
				<a
					href={tutorial.href}
					class="card bg-base-100 border border-base-300 shadow-lg hover:shadow-2xl hover:border-secondary transition-all {tutorial.comingSoon
						? 'opacity-50 pointer-events-none'
						: ''}"
				>
					<div class="card-body">
						<div class="text-4xl mb-3">{tutorial.icon}</div>
						<div class="flex gap-2 mb-3">
							<div class="badge {getDifficultyColor(tutorial.difficulty)} badge-sm">{tutorial.difficulty}</div>
							<div class="badge badge-ghost badge-sm">{tutorial.time}</div>
						</div>
						<h3 class="card-title text-lg">{tutorial.title}</h3>
						<p class="text-sm text-base-content/70">{tutorial.description}</p>
						{#if tutorial.comingSoon}
							<div class="badge badge-outline badge-sm mt-2">Coming Soon</div>
						{/if}
					</div>
				</a>
			{/each}
		</div>
	</section>

	<!-- Implementing Element Logic -->
	<section class="mb-16">
		<div class="flex items-center gap-4 mb-8">
			<div class="text-4xl">⚙️</div>
			<div>
				<h2 class="text-3xl font-bold text-secondary">Implementing Element Logic</h2>
				<p class="text-base-content/60">Master the controller functions</p>
			</div>
		</div>

		<div class="grid md:grid-cols-3 gap-6">
			{#each elementLogic as tutorial}
				<a
					href={tutorial.href}
					class="card bg-base-100 border border-base-300 shadow-lg hover:shadow-2xl hover:border-secondary transition-all {tutorial.comingSoon
						? 'opacity-50 pointer-events-none'
						: ''}"
				>
					<div class="card-body">
						<div class="text-4xl mb-3">{tutorial.icon}</div>
						<div class="flex gap-2 mb-3">
							<div class="badge {getDifficultyColor(tutorial.difficulty)} badge-sm">{tutorial.difficulty}</div>
							<div class="badge badge-ghost badge-sm">{tutorial.time}</div>
						</div>
						<h3 class="card-title text-lg">{tutorial.title}</h3>
						<p class="text-sm text-base-content/70">{tutorial.description}</p>
						{#if tutorial.comingSoon}
							<div class="badge badge-outline badge-sm mt-2">Coming Soon</div>
						{/if}
					</div>
				</a>
			{/each}
		</div>
	</section>

	<!-- Authoring Interface -->
	<section class="mb-16">
		<div class="flex items-center gap-4 mb-8">
			<div class="text-4xl">🎨</div>
			<div>
				<h2 class="text-3xl font-bold text-secondary">Authoring Interface</h2>
				<p class="text-base-content/60">Create visual editors for your elements</p>
			</div>
		</div>

		<div class="grid md:grid-cols-2 gap-6">
			{#each authoringTutorials as tutorial}
				<a
					href={tutorial.href}
					class="card bg-base-100 border border-base-300 shadow-lg hover:shadow-2xl hover:border-secondary transition-all {tutorial.comingSoon
						? 'opacity-50 pointer-events-none'
						: ''}"
				>
					<div class="card-body">
						<div class="flex items-start justify-between">
							<div class="text-4xl mb-3">{tutorial.icon}</div>
							<div class="flex gap-2">
								<div class="badge {getDifficultyColor(tutorial.difficulty)} badge-sm">{tutorial.difficulty}</div>
								<div class="badge badge-ghost badge-sm">{tutorial.time}</div>
							</div>
						</div>
						<h3 class="card-title text-lg">{tutorial.title}</h3>
						<p class="text-sm text-base-content/70">{tutorial.description}</p>
						{#if tutorial.comingSoon}
							<div class="badge badge-outline badge-sm mt-2">Coming Soon</div>
						{/if}
					</div>
				</a>
			{/each}
		</div>
	</section>

	<!-- Backend Integration -->
	<section class="mb-16">
		<div class="flex items-center gap-4 mb-8">
			<div class="text-4xl">🖥️</div>
			<div>
				<h2 class="text-3xl font-bold text-secondary">Backend Integration</h2>
				<p class="text-base-content/60">Build a complete PIE-powered application</p>
			</div>
		</div>

		<div class="grid md:grid-cols-3 gap-6">
			{#each backendTutorials as tutorial}
				<a
					href={tutorial.href}
					class="card bg-base-100 border border-base-300 shadow-lg hover:shadow-2xl hover:border-secondary transition-all {tutorial.comingSoon
						? 'opacity-50 pointer-events-none'
						: ''}"
				>
					<div class="card-body">
						<div class="text-4xl mb-3">{tutorial.icon}</div>
						<div class="flex gap-2 mb-3">
							<div class="badge {getDifficultyColor(tutorial.difficulty)} badge-sm">{tutorial.difficulty}</div>
							<div class="badge badge-ghost badge-sm">{tutorial.time}</div>
						</div>
						<h3 class="card-title text-lg">{tutorial.title}</h3>
						<p class="text-sm text-base-content/70">{tutorial.description}</p>
						{#if tutorial.comingSoon}
							<div class="badge badge-outline badge-sm mt-2">Coming Soon</div>
						{/if}
					</div>
				</a>
			{/each}
		</div>
	</section>

	<!-- Advanced Topics -->
	<div class="divider text-xl font-semibold">Advanced Topics</div>

	<section class="mb-16">
		<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
			{#each advancedTopics as tutorial}
				<a
					href={tutorial.href}
					class="card bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/30 shadow-lg hover:shadow-2xl hover:border-secondary transition-all {tutorial.comingSoon
						? 'opacity-50 pointer-events-none'
						: ''}"
				>
					<div class="card-body">
						<div class="text-4xl mb-3">{tutorial.icon}</div>
						<div class="badge {getDifficultyColor(tutorial.difficulty)} badge-sm mb-3">{tutorial.difficulty}</div>
						<h3 class="card-title text-base">{tutorial.title}</h3>
						<p class="text-sm text-base-content/70">{tutorial.description}</p>
						{#if tutorial.comingSoon}
							<div class="badge badge-outline badge-sm mt-2">Coming Soon</div>
						{/if}
					</div>
				</a>
			{/each}
		</div>
	</section>

	<!-- Example Projects -->
	<div class="divider text-xl font-semibold">Example Projects</div>

	<section class="mb-16">
		<p class="text-center text-base-content/70 mb-8">Complete working examples</p>
		<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
			{#each examples as example}
				<a
					href={example.href}
					class="card bg-base-100 border-2 border-primary/20 shadow-lg hover:shadow-2xl hover:border-primary transition-all {example.comingSoon
						? 'opacity-50 pointer-events-none'
						: ''}"
				>
					<div class="card-body items-center text-center">
						<div class="text-5xl mb-3">{example.icon}</div>
						<h3 class="card-title text-base">{example.title}</h3>
						<p class="text-sm text-base-content/70">{example.description}</p>
						{#if example.comingSoon}
							<div class="badge badge-outline badge-sm mt-2">Coming Soon</div>
						{/if}
					</div>
				</a>
			{/each}
		</div>
	</section>

	<!-- Help CTA -->
	<div class="card bg-primary text-primary-content shadow-xl">
		<div class="card-body items-center text-center">
			<h2 class="card-title text-2xl mb-2">Need Help?</h2>
			<p class="mb-4">Join our community and connect with other PIE developers</p>
			<div class="flex gap-4">
				<a
					href="https://github.com/pie-framework/discussions"
					target="_blank"
					rel="noopener noreferrer"
					class="btn btn-outline btn-primary-content"
				>
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path>
					</svg>
					GitHub Discussions
				</a>
				<a href="/docs/api" class="btn btn-outline btn-primary-content">
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
					</svg>
					API Reference
				</a>
			</div>
		</div>
	</div>
</div>
