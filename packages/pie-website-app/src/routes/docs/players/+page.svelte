<script lang="ts">
	import { base } from '$app/paths';
	import CodeEditor from '$lib/components/CodeEditor.svelte';

	const itemPlayerExample = `<pie-item-player
  strategy="iife"
  env='{"mode":"gather","role":"student"}'>
</pie-item-player>`;

	const sectionPlayerExample = `<!-- HTML attributes for string configuration -->
<pie-section-player-splitpane
  assessment-id="my-assessment-001"
  section-id="section-a"
  attempt-id="attempt-xyz"
  show-toolbar="true"
  enabled-tools="calculator,textToSpeech,theme"
  player-type="iife">
</pie-section-player-splitpane>`;

	const sectionPlayerJsExample = `// Content and environment are set via JS properties
const player = document.querySelector('pie-section-player-splitpane');
player.section = sectionDefinition;  // section content data (items, passages)
player.env = { mode: 'gather', role: 'student' };

// Or pass a pre-built coordinator for full lifecycle control
player.coordinator = myToolkitCoordinator;`;

	const assessmentPlayerExample = `<pie-assessment-player-default
  assessment-id="assessment-001"
  attempt-id="attempt-xyz"
  section-player-layout="splitpane"
  show-navigation="true"
  player-type="iife">
</pie-assessment-player-default>

<script>
  const player = document.querySelector('pie-assessment-player-default');
  player.assessment = assessmentDefinition;
  player.coordinator = coordinator;

  player.addEventListener('assessment-controller-ready', (e) => {
    const { controller } = e.detail;
    const moved = controller.navigateNext();  // returns boolean
  });
<\/script>`;

	const controllerExample = `// The section-controller-ready event provides a
// SectionControllerHandle — the primary integration surface.
player.addEventListener('section-controller-ready', (e) => {
  const { controller } = e.detail;

  // Single subscribe() with discriminated event types
  const unsubscribe = controller.subscribe((event) => {
    switch (event.type) {
      case 'item-session-data-changed':
        persistToBackend(controller.getSession());
        break;
      case 'section-loading-complete':
        console.log('All items loaded');
        break;
      case 'section-items-complete-changed':
        updateProgress(event.completedCount, event.totalItems);
        break;
      case 'section-error':
        reportError(event.error);
        break;
    }
  });
});

// Or obtain the controller asynchronously:
const controller = await player.waitForSectionController(5000);

// Session lifecycle methods
const snapshot = controller.getSession();   // current state
await controller.hydrate();                 // load persisted state
await controller.persist();                 // save current state`;
</script>

<svelte:head>
	<title>Players - PIE Framework</title>
	<meta name="description" content="PIE's four-level player hierarchy: element, item, section, and assessment players. Learn about loading strategies, section composition, and assessment orchestration." />
</svelte:head>

<div class="container mx-auto px-4 py-12 max-w-7xl">
	<div class="text-center mb-16">
		<h1 class="text-5xl font-bold text-secondary mb-4">Players</h1>
		<p class="text-xl text-base-content/70 max-w-3xl mx-auto">
			From individual questions to complete assessments &mdash; PIE provides players at four levels, each independently usable depending on your architecture needs.
		</p>
	</div>

	<!-- Four-Level Hierarchy -->
	<section class="mb-20">
		<h2 class="text-3xl font-bold text-secondary mb-6">Four-Level Player Hierarchy</h2>
		<p class="text-lg text-base-content/70 mb-8 max-w-4xl">
			You can adopt just the item player for embedding single questions, add the section player when you need page-level composition with tools, or use the full assessment player for multi-section test delivery. Each level is an independent Web Component.
		</p>

		<div class="my-8">
			<img
				src="{base}/images/docs/players/pie-four-level-players-1-1773773717829.jpg"
				alt="PIE four-level player hierarchy"
				width="845"
				height="461"
				loading="lazy"
				class="rounded-lg shadow-lg w-full max-w-4xl mx-auto"
			/>
		</div>

		<div class="grid md:grid-cols-2 gap-6">
			<div class="card bg-base-100 shadow-lg border border-base-300">
				<div class="card-body">
					<div class="flex items-center gap-3 mb-3">
						<div class="badge badge-primary badge-lg">1</div>
						<h3 class="card-title text-xl">Element Player</h3>
					</div>
					<p class="text-base-content/70">
						Renders a single element (one question type). Primarily used for testing and development. Loads the element's JavaScript bundle, manages its state, handles mode transitions, and emits events when responses change.
					</p>
				</div>
			</div>

			<div class="card bg-base-100 shadow-lg border border-base-300">
				<div class="card-body">
					<div class="flex items-center gap-3 mb-3">
						<div class="badge badge-primary badge-lg">2</div>
						<h3 class="card-title text-xl">Item Player</h3>
					</div>
					<p class="text-base-content/70">
						Renders complete assessment items containing one or more question elements with optional passage content and rubrics. A single unified component (<code>&lt;pie-item-player&gt;</code>) with a <code>strategy</code> attribute that controls how PIE element bundles are loaded.
					</p>
				</div>
			</div>

			<div class="card bg-base-100 shadow-lg border border-base-300">
				<div class="card-body">
					<div class="flex items-center gap-3 mb-3">
						<div class="badge badge-secondary badge-lg">3</div>
						<h3 class="card-title text-xl">Section Player</h3>
					</div>
					<p class="text-base-content/70">
						The rendering workhorse. A section maps to a page &mdash; grouping a passage with items, or a set of standalone items, into a single view with shared tools, session state, and navigation scope. Integrates with the ToolkitCoordinator for calculator, TTS, and annotation.
					</p>
				</div>
			</div>

			<div class="card bg-base-100 shadow-lg border border-base-300">
				<div class="card-body">
					<div class="flex items-center gap-3 mb-3">
						<div class="badge badge-secondary badge-lg">4</div>
						<h3 class="card-title text-xl">Assessment Player</h3>
					</div>
					<p class="text-base-content/70">
						An orchestration layer above the section player. Coordinates which section is active, manages assessment-level session continuity across sections, provides navigation controls, and handles the delivery lifecycle. Does not render content itself.
					</p>
				</div>
			</div>
		</div>

		<div class="my-8">
			<img
				src="{base}/images/docs/players/pie-layers-overview.jpg"
				alt="PIE layered architecture from item rendering through section composition to assessment orchestration"
				width="845"
				height="461"
				loading="lazy"
				class="rounded-lg shadow-lg w-full max-w-4xl mx-auto"
			/>
		</div>
	</section>

	<!-- Item Player Loading Strategies -->
	<section class="mb-20">
		<h2 class="text-3xl font-bold text-secondary mb-6">Item Player Loading Strategies</h2>
		<p class="text-lg text-base-content/70 mb-8 max-w-4xl">
			The item player (<code>&lt;pie-item-player&gt;</code>) uses a <code>strategy</code> attribute to control how PIE element bundles are fetched and registered. Three strategies are available, all producing identical rendering behavior.
		</p>

		<div class="my-8">
			<img
				src="{base}/images/docs/players/pie-item-player-strategies.jpg"
				alt="PIE item player loading strategies: IIFE, ESM, and Preloaded"
				width="845"
				height="461"
				loading="lazy"
				class="rounded-lg shadow-lg w-full max-w-4xl mx-auto"
			/>
		</div>

		<div class="grid md:grid-cols-3 gap-6 mb-8">
			<div class="card bg-base-100 shadow-lg border border-base-300">
				<div class="card-body">
					<div class="flex items-center justify-between mb-3">
						<h3 class="card-title text-lg">IIFE Strategy</h3>
						<div class="badge badge-accent">Default</div>
					</div>
					<p class="text-sm text-base-content/70 mb-3">
						Loads pre-bundled element packages by injecting <code>&lt;script&gt;</code> tags from a bundle hosting service. The most widely deployed strategy and the safe default for production systems.
					</p>
					<div class="text-xs text-base-content/50">
						<code>strategy="iife"</code>
					</div>
				</div>
			</div>

			<div class="card bg-base-100 shadow-lg border border-base-300">
				<div class="card-body">
					<div class="flex items-center justify-between mb-3">
						<h3 class="card-title text-lg">ESM Strategy</h3>
						<div class="badge badge-info">Target by 2026</div>
					</div>
					<p class="text-sm text-base-content/70 mb-3">
						Uses native browser <code>import()</code> from an ESM CDN. Modules are cached by the browser's native module cache, shared dependencies are deduplicated, and roughly 85% bundle size reduction vs IIFE.
					</p>
					<div class="text-xs text-base-content/50">
						<code>strategy="esm"</code>
					</div>
				</div>
			</div>

			<div class="card bg-base-100 shadow-lg border border-base-300">
				<div class="card-body">
					<div class="flex items-center justify-between mb-3">
						<h3 class="card-title text-lg">Preloaded Strategy</h3>
					</div>
					<p class="text-sm text-base-content/70 mb-3">
						All required PIE custom elements are pre-bundled at build time &mdash; no network requests at runtime. Zero-latency rendering for offline environments, strict performance budgets, or controlled test harnesses.
					</p>
					<div class="text-xs text-base-content/50">
						<code>strategy="preloaded"</code>
					</div>
				</div>
			</div>
		</div>

		<div class="card bg-base-200 border border-base-300">
			<div class="card-body">
				<h4 class="font-bold text-secondary mb-2">Usage</h4>
				<CodeEditor value={itemPlayerExample} language="html" readonly={true} />
			</div>
		</div>
	</section>

	<!-- Section Player -->
	<section class="mb-20">
		<h2 class="text-3xl font-bold text-secondary mb-6">Section Player: Page-Level Composition</h2>
		<p class="text-lg text-base-content/70 mb-8 max-w-4xl">
			Step back and look at what a real assessment screen looks like in practice. There's a reading passage on the left paired with questions on the right. A toolbar at the bottom offers section-wide tools: calculator, graph, periodic table, protractor, line reader, ruler. Each item has its own controls &mdash; text-to-speech playback, annotation, answer elimination. Accommodation controls manage audio, contrast, and fullscreen mode. All of this needs coordination, shared state, and a coherent lifecycle.
		</p>
		<p class="text-lg text-base-content/70 mb-8 max-w-4xl">
			Every team that builds beyond the item player level ends up rebuilding some version of this composition. The section player exists to provide that layer as a ready-made, well-tested foundation &mdash; so integration teams can focus on their product's unique concerns rather than re-solving passage-item layout, tool coordination, session persistence, and accessibility plumbing.
		</p>

		<div class="my-8">
			<img
				src="{base}/images/docs/players/pie-section-real-assessment.png"
				alt="A section as students see it: passage, items, tools, accommodations, and navigation composed into a single view"
				width="845"
				height="461"
				loading="lazy"
				class="rounded-lg shadow-lg w-full max-w-4xl mx-auto"
			/>
		</div>

		<h3 class="text-2xl font-bold text-primary mb-4">Three-Layer Architecture</h3>

		<div class="my-8">
			<img
				src="{base}/images/docs/players/pie-section-player-three-layers.png"
				alt="Section Player three-layer architecture"
				width="845"
				height="461"
				loading="lazy"
				class="rounded-lg shadow-lg w-full max-w-3xl mx-auto"
			/>
		</div>

		<div class="grid md:grid-cols-3 gap-6 mb-8">
			<div class="card bg-primary/5 border border-primary/20">
				<div class="card-body">
					<h4 class="font-bold text-primary mb-2">Section Player CE</h4>
					<p class="text-sm text-base-content/70">
						Renders the section composition &mdash; items, passages, toolbars &mdash; and bridges between host runtime contracts and the internal rendering engine. Dispatches lifecycle events and exposes a controller handle.
					</p>
				</div>
			</div>

			<div class="card bg-secondary/5 border border-secondary/20">
				<div class="card-body">
					<h4 class="font-bold text-secondary mb-2">Assessment Toolkit</h4>
					<p class="text-sm text-base-content/70">
						Orchestrates toolkit services: tool availability, TTS, highlight coordination, accessibility catalogs, and section controller lifecycle. The single authoritative service hub for an assessment context.
					</p>
				</div>
			</div>

			<div class="card bg-base-200 border border-base-300">
				<div class="card-body">
					<h4 class="font-bold mb-2">Host Application</h4>
					<p class="text-sm text-base-content/70">
						Owns everything with business meaning: attempt identity, navigation continuity across page loads, backend persistence, reset policy, and telemetry.
					</p>
				</div>
			</div>
		</div>

		<div class="grid md:grid-cols-2 gap-6 mb-8">
			<div class="card bg-base-100 shadow border border-base-300">
				<div class="card-body">
					<h4 class="font-bold text-lg mb-2">Splitpane Layout</h4>
					<p class="text-sm text-base-content/70">
						<code>&lt;pie-section-player-splitpane&gt;</code> &mdash; passage on the left, items on the right. The most common layout for passage-based assessments.
					</p>
				</div>
			</div>
			<div class="card bg-base-100 shadow border border-base-300">
				<div class="card-body">
					<h4 class="font-bold text-lg mb-2">Vertical Layout</h4>
					<p class="text-sm text-base-content/70">
						<code>&lt;pie-section-player-vertical&gt;</code> &mdash; stacked layout for standalone items or narrow viewports.
					</p>
				</div>
			</div>
		</div>

		<h3 class="text-2xl font-bold text-primary mb-4">Integration Modes</h3>
		<p class="text-base text-base-content/70 mb-6 max-w-4xl">
			The section player supports two integration modes, both producing identical runtime behavior:
		</p>
		<div class="grid md:grid-cols-2 gap-6 mb-8">
			<div class="card bg-base-100 shadow border border-base-300">
				<div class="card-body">
					<h4 class="font-bold text-lg mb-2">CE-First</h4>
					<p class="text-sm text-base-content/70">
						Pass tool and section configuration as element attributes. The player creates the ToolkitCoordinator internally &mdash; simplest path for standard deployments.
					</p>
				</div>
			</div>
			<div class="card bg-base-100 shadow border border-base-300">
				<div class="card-body">
					<h4 class="font-bold text-lg mb-2">JS API</h4>
					<p class="text-sm text-base-content/70">
						Construct the ToolkitCoordinator yourself for full lifecycle control. Allows wiring standalone TTS panels, custom annotation toolbars, or advanced service configuration.
					</p>
				</div>
			</div>
		</div>

		<p class="text-base text-base-content/70 mb-6 max-w-4xl">
			When connected to the section player, the toolkit automatically handles SSML extraction from passages and items, manages accessibility catalog lifecycle, renders TTS tools inline in passage/item headers, coordinates z-index layering for tools, and synchronizes text highlighting with TTS playback.
		</p>

		<div class="grid md:grid-cols-2 gap-6">
			<div class="card bg-base-200 border border-base-300">
				<div class="card-body">
					<h4 class="font-bold text-secondary mb-2">HTML Attributes</h4>
					<CodeEditor value={sectionPlayerExample} language="html" readonly={true} />
				</div>
			</div>
			<div class="card bg-base-200 border border-base-300">
				<div class="card-body">
					<h4 class="font-bold text-secondary mb-2">JS Properties</h4>
					<CodeEditor value={sectionPlayerJsExample} language="javascript" readonly={true} />
				</div>
			</div>
		</div>
	</section>

	<!-- Assessment Player -->
	<section class="mb-20">
		<h2 class="text-3xl font-bold text-secondary mb-6">Assessment Player: Multi-Section Orchestration</h2>
		<p class="text-lg text-base-content/70 mb-8 max-w-4xl">
			Above the section layer, the assessment player (<code>&lt;pie-assessment-player-default&gt;</code>) coordinates navigation between sections, manages assessment-level session continuity, tracks progress, and handles submission workflow. It routes between pages; it doesn't render them &mdash; the section player remains the rendering workhorse.
		</p>

		<div class="my-8">
			<img
				src="{base}/images/docs/players/pie-assessment-player-layers.jpg"
				alt="Assessment Player layer architecture"
				width="845"
				height="461"
				loading="lazy"
				class="rounded-lg shadow-lg w-full max-w-4xl mx-auto"
			/>
		</div>

		<div class="grid md:grid-cols-2 gap-6 mb-8">
			<div class="card bg-base-100 shadow border border-base-300">
				<div class="card-body">
					<h4 class="font-bold text-lg mb-2">QTI-Inspired Content Model</h4>
					<p class="text-sm text-base-content/70">
						An assessment definition contains sections (or nested test parts with sections). The assessment player flattens this structure into a linear delivery plan and navigates by index. Each section is passed to a section player when it becomes active.
					</p>
				</div>
			</div>
			<div class="card bg-base-100 shadow border border-base-300">
				<div class="card-body">
					<h4 class="font-bold text-lg mb-2">Layered Session State</h4>
					<p class="text-sm text-base-content/70">
						Session state is layered recursively: item sessions live inside section sessions, which live inside the assessment session aggregate. This structure enables granular persistence and replay at each level.
					</p>
				</div>
			</div>
		</div>

		<div class="card bg-base-200 border border-base-300 mb-8">
			<div class="card-body">
				<h4 class="font-bold text-secondary mb-2">Assessment Player Usage</h4>
				<CodeEditor value={assessmentPlayerExample} language="html" readonly={true} />
			</div>
		</div>

		<div class="alert alert-info">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
			<span>The assessment player emits an <code>assessment-controller-ready</code> event with an <code>AssessmentControllerHandle</code> that provides <code>navigateNext()</code>, <code>navigatePrevious()</code>, <code>submit()</code>, <code>getSession()</code>, and <code>subscribe()</code>. Cancelable <code>assessment-navigation-requested</code> events let the host implement custom gating policies.</span>
		</div>
	</section>

	<!-- Web Component Standard & Controller API -->
	<section class="mb-20">
		<h2 class="text-3xl font-bold text-secondary mb-6">Web Component Standard & Controller API</h2>
		<p class="text-lg text-base-content/70 mb-8 max-w-4xl">
			All PIE players are implemented as HTML5 custom elements, integrating into any web page as standard HTML tags. Under the hood, players communicate through standard DOM APIs &mdash; properties, events, and methods.
		</p>

		<p class="text-lg text-base-content/70 mb-8 max-w-4xl">
			For the <strong>element and item players</strong>, this DOM-level interface is the primary API. However, for most production integrations using the <strong>section player or assessment player</strong>, raw DOM events should be considered an implementation detail. Instead, the <strong>section controller</strong> provides a well-defined, typed events and methods interface as the primary integration surface.
		</p>

		<div class="grid md:grid-cols-2 gap-6 mb-8">
			<div class="card bg-base-100 shadow border border-base-300">
				<div class="card-body">
					<h4 class="font-bold text-primary mb-2">Element & Item Player: DOM API</h4>
					<p class="text-sm text-base-content/70 mb-3">
						Standard DOM events and properties for fine-grained control of individual questions.
					</p>
					<ul class="text-sm text-base-content/70 space-y-1">
						<li><strong>Properties</strong> &mdash; configuration and state via JS properties or JSON attributes</li>
						<li><strong>Events</strong> &mdash; <code>session-changed</code>, <code>load-complete</code>, <code>player-error</code></li>
					</ul>
				</div>
			</div>

			<div class="card bg-base-100 shadow-lg border-2 border-secondary/30">
				<div class="card-body">
					<div class="badge badge-secondary mb-2">Primary for Production</div>
					<h4 class="font-bold text-secondary mb-2">Section & Assessment Player: Controller API</h4>
					<p class="text-sm text-base-content/70 mb-3">
						A <code>SectionControllerHandle</code> with typed methods and a single <code>subscribe()</code> for discriminated events &mdash; a stable contract decoupled from internal DOM structure.
					</p>
					<ul class="text-sm text-base-content/70 space-y-1">
						<li><strong>Methods</strong> &mdash; <code>getSession()</code>, <code>hydrate()</code>, <code>persist()</code>, <code>applySession()</code></li>
						<li><strong>Events</strong> &mdash; <code>subscribe()</code> with types like <code>item-session-data-changed</code>, <code>section-loading-complete</code>, <code>section-error</code></li>
						<li><strong>Assessment controller</strong> &mdash; <code>navigateNext()</code>, <code>navigatePrevious()</code>, <code>submit()</code></li>
					</ul>
				</div>
			</div>
		</div>

		<div class="alert alert-info mb-8">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
			<span>This layered approach means you use DOM APIs directly only if you need fine-grained element or item player control. For section and assessment delivery, the controller API is the contract &mdash; making integrations more robust and less coupled to internal DOM structure.</span>
		</div>

		<div class="card bg-base-200 border border-base-300">
			<div class="card-body">
				<h4 class="font-bold text-secondary mb-2">Section Controller Example</h4>
				<CodeEditor value={controllerExample} language="javascript" readonly={true} />
			</div>
		</div>
	</section>

	<!-- Navigation -->
	<section class="mb-12">
		<div class="flex flex-col md:flex-row gap-4 justify-between">
			<a href="{base}/docs/element-structure/" class="btn btn-outline btn-secondary">
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
				</svg>
				Element Structure
			</a>
			<a href="{base}/docs/toolkit/" class="btn btn-primary">
				Assessment Toolkit
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
				</svg>
			</a>
		</div>
	</section>
</div>
