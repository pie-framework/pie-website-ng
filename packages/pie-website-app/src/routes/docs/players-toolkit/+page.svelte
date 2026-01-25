<script lang="ts">
	import CodeEditor from '$lib/components/CodeEditor.svelte';

	const playerPropertiesExample = `player.config = itemConfig;

player.env = {
  mode: 'gather',
  role: 'student'
};

player.session = {
  id: 'session-123',
  data: []
};`;

	const playerEventsExample = `player.addEventListener(
  'session-changed',
  (e) => {
    save(e.detail);
  }
);

player.addEventListener(
  'load-complete',
  () => console.log('Ready')
);`;

	const playerMethodsExample = `// Calculate score
const outcome =
  await player
    .provideScore();

// Reset state
player.reset();

// Validate
player.validate();`;

	const fullIntegrationExample = `// Load PIE Player from CDN
import '@pie-framework/pie-esm-player';

// Initialize toolkit services (optional)
import {
  ToolCoordinator,
  HighlightCoordinator,
  TTSService,
  ThemeProvider
} from '@pie-framework/assessment-toolkit';

const toolCoordinator = new ToolCoordinator();
const highlightCoordinator = new HighlightCoordinator();
const ttsService = TTSService.getInstance();
const themeProvider = new ThemeProvider();

// Configure player
const player = document.querySelector('pie-esm-player');

player.config = {
  elements: {
    'pie-multiple-choice': '@pie-element/multiple-choice@11.0.1'
  },
  models: [{
    id: '1',
    element: 'pie-multiple-choice',
    prompt: 'What is 2+2?',
    choices: [
      { label: '3', value: 'a' },
      { label: '4', value: 'b', correct: true }
    ]
  }],
  markup: '<pie-multiple-choice id="1"></pie-multiple-choice>'
};

player.env = { mode: 'gather', role: 'student' };
player.session = { id: 'session-123', data: [] };

// Handle events
player.addEventListener('session-changed', async (e) => {
  await backend.saveSession(e.detail);
});

// Enable tools (if using toolkit)
toolCoordinator.registerTool('calculator', 'Calculator', calcElement);
toolCoordinator.showTool('calculator');`;
</script>

<svelte:head>
	<title>PIE Players and Assessment Toolkit - PIE Framework</title>
	<meta
		name="description"
		content="Learn how PIE players orchestrate elements and how the assessment toolkit provides tools, accommodations, and complete test delivery."
	/>
</svelte:head>

<div class="container mx-auto px-4 py-12 max-w-7xl">
	<!-- Header -->
	<div class="mb-12">
		<h1 class="text-5xl font-bold text-secondary mb-4">PIE Players and Assessment Toolkit</h1>
		<p class="text-xl text-base-content/70 max-w-3xl">
			From individual elements to complete assessments: players orchestrate content delivery while
			the toolkit provides tools, accommodations, and test infrastructure.
		</p>
	</div>

	<!-- Players Overview -->
	<section class="mb-12">
		<h2 class="text-3xl font-bold text-secondary mb-6">Players Overview</h2>

		<div class="prose max-w-none mb-8">
			<p class="text-lg">
				While elements represent individual question types, <strong>players</strong> orchestrate how
				elements are rendered, managed, and integrated into assessment experiences. PIE provides players
				at three levels of granularity.
			</p>
		</div>

		<div class="my-8">
			<img
				src="/images/docs/players/pie-item-players.png"
				alt="PIE Item Players"
				class="rounded-lg shadow-lg w-full max-w-4xl mx-auto"
			/>
		</div>

		<div class="grid md:grid-cols-3 gap-6 mb-8">
			<div class="card bg-base-100 shadow-xl border border-base-300">
				<div class="card-body">
					<h3 class="card-title text-primary">Element Player</h3>
					<p class="text-sm mb-3">
						Renders a single element (one question type). Primarily used for testing and
						development.
					</p>
					<ul class="text-xs space-y-1">
						<li>• Loads element JavaScript bundle</li>
						<li>• Manages element state</li>
						<li>• Handles mode transitions</li>
						<li>• Emits session change events</li>
					</ul>
				</div>
			</div>

			<div class="card bg-base-100 shadow-xl border border-base-300">
				<div class="card-body">
					<h3 class="card-title text-primary">Item Player</h3>
					<p class="text-sm mb-3">
						Renders complete assessment items with one or more questions, passages, and rubrics.
					</p>
					<ul class="text-xs space-y-1">
						<li>• Manages multiple elements</li>
						<li>• Handles passages and rubrics</li>
						<li>• Unified session model</li>
						<li>• Built-in layout system</li>
					</ul>
				</div>
			</div>

			<div class="card bg-base-100 shadow-xl border border-base-300">
				<div class="card-body">
					<h3 class="card-title text-primary">Assessment Player</h3>
					<p class="text-sm mb-3">
						Complete test delivery with navigation, tools, and accommodations. Reference
						implementation.
					</p>
					<ul class="text-xs space-y-1">
						<li>• Item navigation</li>
						<li>• Toolkit integration</li>
						<li>• Timer and controls</li>
						<li>• Multi-item orchestration</li>
					</ul>
				</div>
			</div>
		</div>

		<div class="alert alert-info">
			<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
			<div>
				<p class="font-semibold">Web Components Standard</p>
				<p class="text-sm">
					All PIE players are implemented as Web Components, making them framework-agnostic and
					usable with React, Vue, Angular, Svelte, or vanilla JavaScript.
				</p>
			</div>
		</div>
	</section>

	<!-- Player Types -->
	<section class="mb-12">
		<h2 class="text-3xl font-bold text-secondary mb-6">Player Types</h2>

		<div class="prose max-w-none mb-6">
			<p class="text-lg">
				PIE provides multiple player implementations, each optimized for different deployment
				scenarios. All implement the same Web Component interface, making them interchangeable.
			</p>
		</div>

		<div class="my-8">
			<img
				src="/images/docs/players/pie-itemplayer-packaging-strategies.png"
				alt="PIE Item Player Packaging Strategies"
				class="rounded-lg shadow-lg w-full max-w-4xl mx-auto"
			/>
		</div>

		<div class="space-y-6">
			<!-- ESM Player -->
			<div class="card bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-700">
				<div class="card-body">
					<div class="flex items-start justify-between">
						<div class="flex-1">
							<div class="flex items-center gap-3 mb-3">
								<div class="badge badge-success gap-2">
									<svg
										class="w-3 h-3"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M5 13l4 4L19 7"
										/>
									</svg>
									Recommended
								</div>
								<h3 class="card-title">ESM Player</h3>
								<span class="badge badge-outline">Modern</span>
							</div>
							<p class="mb-4">
								Uses native browser ESM (ECMAScript Modules) for loading PIE elements. Best for
								modern browsers with smaller bundle sizes and better caching.
							</p>
							<div class="grid md:grid-cols-2 gap-4 text-sm">
								<div>
									<p class="font-semibold text-success mb-2">Benefits:</p>
									<ul class="list-disc list-inside text-xs space-y-1">
										<li>~85% smaller bundles vs IIFE</li>
										<li>Native browser module loading</li>
										<li>Better dependency caching</li>
										<li>Import maps for resolution</li>
									</ul>
								</div>
								<div>
									<p class="font-semibold text-warning mb-2">Requirements:</p>
									<ul class="list-disc list-inside text-xs space-y-1">
										<li>Modern browsers (Chrome 89+)</li>
										<li>Firefox 108+, Safari 16.4+</li>
										<li>ESM-compatible elements</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- IIFE Player -->
			<div class="card bg-base-100 border border-base-300">
				<div class="card-body">
					<div class="flex items-center gap-3 mb-3">
						<h3 class="card-title">IIFE Player</h3>
						<span class="badge badge-outline">Legacy Compatible</span>
					</div>
					<p class="mb-4">
						Loads pre-bundled element packages dynamically from a bundle hosting service. Supports
						older browsers through CommonJS bundles.
					</p>
					<div class="grid md:grid-cols-2 gap-4 text-sm">
						<div>
							<p class="font-semibold text-primary mb-2">Use Cases:</p>
							<ul class="list-disc list-inside text-xs space-y-1">
								<li>Drop-in replacement for legacy PIE</li>
								<li>Backwards compatibility needed</li>
								<li>Dynamic element loading</li>
								<li>All browser support</li>
							</ul>
						</div>
						<div>
							<p class="font-semibold text-warning mb-2">Trade-offs:</p>
							<ul class="list-disc list-inside text-xs space-y-1">
								<li>Larger bundle sizes</li>
								<li>Requires build service</li>
								<li>Limited caching benefits</li>
								<li>Being deprecated (2026-2027)</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			<!-- Fixed Player -->
			<div class="card bg-base-100 border border-base-300">
				<div class="card-body">
					<div class="flex items-center gap-3 mb-3">
						<h3 class="card-title">Fixed Player</h3>
						<span class="badge badge-outline">Pre-bundled</span>
					</div>
					<p class="mb-4">
						Elements are bundled directly into the player at build time. Optimal for
						performance-critical deployments with known question type sets.
					</p>
					<div class="grid md:grid-cols-2 gap-4 text-sm">
						<div>
							<p class="font-semibold text-success mb-2">Benefits:</p>
							<ul class="list-disc list-inside text-xs space-y-1">
								<li>Zero runtime bundle loading</li>
								<li>Smallest API payload (data only)</li>
								<li>Fastest initial render</li>
								<li>Deterministic builds</li>
							</ul>
						</div>
						<div>
							<p class="font-semibold text-warning mb-2">Constraints:</p>
							<ul class="list-disc list-inside text-xs space-y-1">
								<li>Fixed element versions</li>
								<li>Requires rebuild for updates</li>
								<li>Larger player bundle</li>
								<li>Less flexible</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Comparison Table -->
		<div class="overflow-x-auto mt-8">
			<table class="table table-zebra">
				<thead>
					<tr>
						<th>Feature</th>
						<th>IIFE Player</th>
						<th>ESM Player</th>
						<th>Fixed Player</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="font-semibold">Bundle Format</td>
						<td>IIFE</td>
						<td>ESM</td>
						<td>Pre-bundled</td>
					</tr>
					<tr>
						<td class="font-semibold">Loading Strategy</td>
						<td>Dynamic</td>
						<td>Dynamic</td>
						<td>Static</td>
					</tr>
					<tr>
						<td class="font-semibold">Browser Support</td>
						<td>All browsers</td>
						<td>Modern only</td>
						<td>All browsers</td>
					</tr>
					<tr>
						<td class="font-semibold">Bundle Size</td>
						<td>Large</td>
						<td>Small</td>
						<td>Smallest (data only)</td>
					</tr>
					<tr>
						<td class="font-semibold">Performance</td>
						<td>Medium</td>
						<td>Medium</td>
						<td>Fast</td>
					</tr>
					<tr>
						<td class="font-semibold">Flexibility</td>
						<td>High</td>
						<td>High</td>
						<td>Low</td>
					</tr>
					<tr>
						<td class="font-semibold">Best For</td>
						<td>Legacy compat</td>
						<td>Modern apps</td>
						<td>Performance</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>

	<!-- Assessment Toolkit -->
	<section class="mb-12">
		<h2 class="text-3xl font-bold text-secondary mb-6">Assessment Toolkit Architecture</h2>

		<div class="prose max-w-none mb-6">
			<p class="text-lg">
				Real-world assessments require more than question rendering. The PIE Assessment Toolkit
				provides composable services for tools, accommodations, and complete test delivery.
			</p>
		</div>

		<div class="my-8">
			<img
				src="/images/docs/assessment-toolkit/pie-assessment-toolkit-arch.png"
				alt="PIE Assessment Toolkit Architecture"
				class="rounded-lg shadow-lg w-full max-w-4xl mx-auto"
			/>
		</div>

		<div class="alert alert-info mb-8">
			<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
			<div>
				<p class="font-semibold">Toolkit, Not Framework</p>
				<p class="text-sm">
					The toolkit follows a "use what you need" philosophy. Import only the services you need
					for your specific deployment scenario.
				</p>
			</div>
		</div>

		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
			<div class="card bg-base-100 border border-base-300">
				<div class="card-body">
					<h4 class="font-bold text-primary mb-2">ToolCoordinator</h4>
					<p class="text-sm">
						Central service managing tool visibility and z-index layering for proper stacking of
						calculators, rulers, and other tools.
					</p>
				</div>
			</div>

			<div class="card bg-base-100 border border-base-300">
				<div class="card-body">
					<h4 class="font-bold text-primary mb-2">HighlightCoordinator</h4>
					<p class="text-sm">
						Manages text highlighting for TTS and annotations using CSS Custom Highlight API for
						framework-friendly overlays.
					</p>
				</div>
			</div>

			<div class="card bg-base-100 border border-base-300">
				<div class="card-body">
					<h4 class="font-bold text-primary mb-2">TTSService</h4>
					<p class="text-sm">
						Singleton text-to-speech service with word-level highlighting synchronization and voice
						control.
					</p>
				</div>
			</div>

			<div class="card bg-base-100 border border-base-300">
				<div class="card-body">
					<h4 class="font-bold text-primary mb-2">ThemeProvider</h4>
					<p class="text-sm">
						Accessibility theming for high contrast modes, color schemes, and font size adjustments
						via CSS custom properties.
					</p>
				</div>
			</div>

			<div class="card bg-base-100 border border-base-300">
				<div class="card-body">
					<h4 class="font-bold text-primary mb-2">ToolConfigResolver</h4>
					<p class="text-sm">
						Resolves three-tier accommodation configuration (student IEP/504, roster settings, item
						requirements).
					</p>
				</div>
			</div>

			<div class="card bg-base-100 border border-base-300">
				<div class="card-body">
					<h4 class="font-bold text-primary mb-2">TypedEventBus</h4>
					<p class="text-sm">
						Type-safe communication layer for component coordination without direct coupling.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Tools & Accommodations -->
	<section class="mb-12">
		<h2 class="text-3xl font-bold text-secondary mb-6">Tools & Accommodations</h2>

		<div class="prose max-w-none mb-6">
			<p class="text-lg">
				The toolkit includes 15+ assessment tools organized in three tiers based on dependencies and
				functionality.
			</p>
		</div>

		<div class="my-8">
			<img
				src="/images/docs/assessment-toolkit/pie-tool-tiers.png"
				alt="PIE Tool Tiers"
				class="rounded-lg shadow-lg w-full max-w-4xl mx-auto"
			/>
		</div>

		<div class="grid md:grid-cols-3 gap-6 mb-8">
			<div class="card bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700">
				<div class="card-body">
					<div class="badge badge-info mb-3">Tier 1</div>
					<h4 class="font-bold mb-2">Standalone Tools</h4>
					<p class="text-sm mb-3">Direct user interaction, no dependencies</p>
					<ul class="text-xs space-y-1">
						<li>• Calculator (scientific, graphing)</li>
						<li>• Ruler (metric, imperial)</li>
						<li>• Protractor</li>
						<li>• Periodic Table</li>
						<li>• Line Reader</li>
						<li>• Magnifier</li>
						<li>• Color Scheme selector</li>
					</ul>
				</div>
			</div>

			<div class="card bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700">
				<div class="card-body">
					<div class="badge badge-secondary mb-3">Tier 2</div>
					<h4 class="font-bold mb-2">Orchestrator Tools</h4>
					<p class="text-sm mb-3">Enable other tools by detecting user intent</p>
					<ul class="text-xs space-y-1">
						<li>• Annotation Toolbar (detects selection)</li>
						<li>• Answer Eliminator (manages masking)</li>
						<li>• Main Toolbar (launches tools)</li>
					</ul>
				</div>
			</div>

			<div class="card bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700">
				<div class="card-body">
					<div class="badge badge-warning mb-3">Tier 3</div>
					<h4 class="font-bold mb-2">Dependent Tools</h4>
					<p class="text-sm mb-3">Require Tier 2 input to function</p>
					<ul class="text-xs space-y-1">
						<li>• Text-to-Speech (from selection)</li>
						<li>• Dictionary lookup</li>
						<li>• Translation</li>
					</ul>
				</div>
			</div>
		</div>

		<div class="card bg-success/10 border border-success/30">
			<div class="card-body">
				<div class="flex items-start gap-4">
					<svg
						class="w-8 h-8 text-success flex-shrink-0"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
						/>
					</svg>
					<div>
						<h4 class="font-bold text-success text-lg mb-2">WCAG 2.2 Level AA Compliance</h4>
						<p class="text-sm">
							All toolkit features target WCAG 2.2 Level AA standards: keyboard navigation, screen
							reader support, color contrast, touch targets, and alternative content access.
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Integration Patterns -->
	<section class="mb-12">
		<h2 class="text-3xl font-bold text-secondary mb-6">Integration Patterns</h2>

		<div class="prose max-w-none mb-6">
			<p class="text-lg">
				Players communicate through standard DOM APIs: properties for configuration, events for
				state changes, and methods for programmatic control.
			</p>
		</div>

		<div class="my-8">
			<img
				src="/images/docs/assessment-toolkit/pie-integration-flow.png"
				alt="PIE Integration Flow"
				class="rounded-lg shadow-lg w-full max-w-4xl mx-auto"
			/>
		</div>

		<div class="grid md:grid-cols-3 gap-6 mb-8">
			<div class="card bg-base-200">
				<div class="card-body">
					<h4 class="font-bold text-primary mb-3">Properties (Input)</h4>
					<CodeEditor value={playerPropertiesExample} language="javascript" readonly={true} height="200px" />
				</div>
			</div>

			<div class="card bg-base-200">
				<div class="card-body">
					<h4 class="font-bold text-primary mb-3">Events (Output)</h4>
					<CodeEditor value={playerEventsExample} language="javascript" readonly={true} height="200px" />
				</div>
			</div>

			<div class="card bg-base-200">
				<div class="card-body">
					<h4 class="font-bold text-primary mb-3">Methods (Control)</h4>
					<CodeEditor value={playerMethodsExample} language="javascript" readonly={true} height="200px" />
				</div>
			</div>
		</div>

		<div class="alert alert-warning">
			<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
			<div>
				<p class="font-semibold">Three-Tier Accommodation Configuration</p>
				<p class="text-sm">
					Tool availability is resolved from three sources with precedence rules: (1) Roster block
					(highest), (2) Item restrictions/requirements, (3) Student accommodations (IEP/504), (4)
					Roster defaults, (5) System defaults.
				</p>
			</div>
		</div>
	</section>

	<!-- High-Level Code Example -->
	<section class="mb-12">
		<h2 class="text-3xl font-bold text-secondary mb-6">High-Level Integration Example</h2>

		<CodeEditor value={fullIntegrationExample} language="javascript" readonly={true} height="700px" />
	</section>

	<!-- Next Steps -->
	<section>
		<h2 class="text-3xl font-bold text-secondary mb-6">Next Steps</h2>

		<div class="grid md:grid-cols-2 gap-6">
			<a
				href="/docs/items-elements"
				class="card bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition-shadow"
			>
				<div class="card-body">
					<h3 class="card-title text-primary">
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M15 19l-7-7 7-7"
							/>
						</svg>
						Items and Elements
					</h3>
					<p class="text-sm">
						Learn about PIE items and elements, and try a live interactive example with mode
						switching.
					</p>
				</div>
			</a>

			<a
				href="/docs/element-structure"
				class="card bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition-shadow"
			>
				<div class="card-body">
					<h3 class="card-title text-primary">
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M15 19l-7-7 7-7"
							/>
						</svg>
						Element Structure
					</h3>
					<p class="text-sm">
						Deep dive into element architecture: delivery UI, authoring UI, controllers, and the
						MVVM security model.
					</p>
				</div>
			</a>
		</div>

		<div class="card bg-primary text-primary-content shadow-xl mt-8">
			<div class="card-body">
				<h3 class="card-title text-2xl mb-3">Ready to Get Started?</h3>
				<p class="mb-4">
					Explore our GitHub repositories to see PIE players and toolkit in action, or check out the
					live playground to experiment with different configurations.
				</p>
				<div class="card-actions">
					<a
						href="https://github.com/pie-framework"
						target="_blank"
						rel="noopener noreferrer"
						class="btn btn-secondary"
					>
						<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
							<path
								fill-rule="evenodd"
								d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
								clip-rule="evenodd"
							/>
						</svg>
						View on GitHub
					</a>
					<a
						href="https://pieoneer.pie-api.com/etl/playground/pie"
						target="_blank"
						rel="noopener noreferrer"
						class="btn btn-outline btn-secondary"
					>
						Try Playground
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
							/>
						</svg>
					</a>
				</div>
			</div>
		</div>
	</section>
</div>
