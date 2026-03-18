<script lang="ts">
	import { base } from '$app/paths';
	import CodeEditor from '$lib/components/CodeEditor.svelte';

	const propertiesExample = `// Configure the section player via properties
const player = document.querySelector('pie-section-player-splitpane');
player.section = sectionDefinition;   // section content (items, passages)
player.env = { mode: 'gather', role: 'student' };

// Pass a ToolkitCoordinator for full lifecycle control
player.coordinator = coordinator;`;

	const controllerExample = `// The section controller is the primary integration surface.
// It uses a single subscribe() with discriminated event types.
player.addEventListener('section-controller-ready', (e) => {
  const { controller } = e.detail;

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
const ctrl = await player.waitForSectionController(5000);

// Or via the coordinator:
const ctrl2 = coordinator.getSectionController({
  sectionId: 'section-a', attemptId: 'attempt-xyz'
});`;

	const methodsExample = `// Session lifecycle methods
const snapshot = controller.getSession();   // returns current state
await controller.hydrate();                 // load persisted state
await controller.persist();                 // save current state
await controller.applySession(savedState);  // restore from snapshot

// Assessment-level navigation (returns boolean, not Promise)
const moved = assessmentController.navigateNext();
assessmentController.navigatePrevious();
await assessmentController.submit();`;

	const coordinatorExample = `// ToolkitCoordinator — the single entry point for toolkit services.
// Construct one per assessment context and pass it to the player.
const coordinator = new ToolkitCoordinator({
  assessmentId: 'assessment-001',
  tools: {
    placement: {
      section: ['calculator', 'ruler'],
      item: ['textToSpeech', 'answerEliminator'],
      passage: ['textToSpeech', 'annotationToolbar']
    },
    providers: {
      tts: { backend: 'polly', apiEndpoint: '/api/tts' }
    }
  },
  hooks: {
    onError: (error, context) => console.error(context, error),
    // Session persistence — loadSession / saveSession / clearSession
    async createSectionSessionPersistence(context) {
      return {
        async loadSession() {
          return await fetchSessionFromApi(context.key.sectionId);
        },
        async saveSession(_ctx, session) {
          await saveSessionToApi(context.key.sectionId, session);
        },
        async clearSession() {
          await deleteSessionFromApi(context.key.sectionId);
        }
      };
    }
  }
});

// Pass it to the section player
player.coordinator = coordinator;

// Or subscribe to scoped events via the coordinator
coordinator.subscribeSectionEvents({
  sectionId: 'section-a',
  eventTypes: ['item-session-data-changed', 'section-loading-complete'],
  listener: (event) => console.log(event.type, event)
});`;
</script>

<svelte:head>
	<title>Integration & Architecture - PIE Framework</title>
	<meta name="description" content="How to integrate PIE into your application. Web Component APIs, separation of concerns, MVVM security model, and production integration patterns." />
</svelte:head>

<div class="container mx-auto px-4 py-12 max-w-7xl">
	<div class="text-center mb-16">
		<h1 class="text-5xl font-bold text-secondary mb-4">Integration & Architecture</h1>
		<p class="text-xl text-base-content/70 max-w-3xl mx-auto">
			PIE separates frontend concerns (rendering, interaction, accessibility) from backend concerns (persistence, authentication, business logic). Here's how the pieces connect.
		</p>
	</div>

	<!-- Integration Surface -->
	<section class="mb-20">
		<h2 class="text-3xl font-bold text-secondary mb-6">Integration Surface</h2>
		<p class="text-lg text-base-content/70 mb-8 max-w-4xl">
			PIE's fundamental integration point is the Web Component standard. Players are distributed as custom HTML elements. Choose the level that matches your needs:
		</p>

		<div class="grid md:grid-cols-3 gap-6 mb-8">
			<div class="card bg-base-100 shadow-lg border-2 border-secondary/30">
				<div class="card-body">
					<div class="badge badge-secondary mb-2">Primary</div>
					<h4 class="font-bold text-lg mb-2">Section Player</h4>
					<p class="text-sm text-base-content/70">
						The primary integration surface for most production deployments. Composes item rendering with tools, accommodations, and session management in a single element.
					</p>
				</div>
			</div>

			<div class="card bg-base-100 shadow border border-base-300">
				<div class="card-body">
					<h4 class="font-bold text-lg mb-2">Assessment Player</h4>
					<p class="text-sm text-base-content/70">
						Sits on top as the orchestrator for multi-section assessments. Manages navigation between sections, session continuity, and progress tracking.
					</p>
				</div>
			</div>

			<div class="card bg-base-100 shadow border border-base-300">
				<div class="card-body">
					<h4 class="font-bold text-lg mb-2">Item Player</h4>
					<p class="text-sm text-base-content/70">
						For simpler use cases: embedding a single question in a CMS, authoring workflows, or lightweight assessment views.
					</p>
				</div>
			</div>
		</div>

		<div class="alert alert-warning mb-8">
			<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
			<div>
				<strong>The integration rule:</strong> Player and toolkit handle runtime mechanics; the host handles durable data and policy. Violating this boundary &mdash; for instance, persisting internal runtime state or letting the player control navigation without host involvement &mdash; leads to brittle integrations.
			</div>
		</div>
	</section>

	<!-- Separation of Concerns -->
	<section class="mb-20">
		<h2 class="text-3xl font-bold text-secondary mb-6">Separation of Concerns</h2>

		<div class="my-8">
			<img
				src="{base}/images/docs/integration/pie-separation-sketch-1-1773775049791.jpg"
				alt="PIE vs Your Backend: separation of concerns"
				width="845"
				height="461"
				loading="lazy"
				class="rounded-lg shadow-lg w-full max-w-4xl mx-auto"
			/>
		</div>

		<div class="grid md:grid-cols-2 gap-8">
			<div>
				<h3 class="text-2xl font-bold text-primary mb-4">PIE Responsibilities</h3>
				<ul class="space-y-3">
					<li class="flex items-start gap-3">
						<svg class="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
						<div>
							<strong>Rendering</strong> &mdash; Display items with correct layout, styling, and behavior
						</div>
					</li>
					<li class="flex items-start gap-3">
						<svg class="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
						<div>
							<strong>Composition</strong> &mdash; Compose items, passages, and tools into page-level views
						</div>
					</li>
					<li class="flex items-start gap-3">
						<svg class="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
						<div>
							<strong>Interaction</strong> &mdash; Capture student responses through accessible interfaces
						</div>
					</li>
					<li class="flex items-start gap-3">
						<svg class="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
						<div>
							<strong>Authoring</strong> &mdash; Configuration UIs for educators to create and modify content
						</div>
					</li>
					<li class="flex items-start gap-3">
						<svg class="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
						<div>
							<strong>Accessibility</strong> &mdash; WCAG compliance, keyboard support, screen reader compatibility
						</div>
					</li>
					<li class="flex items-start gap-3">
						<svg class="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
						<div>
							<strong>Tools & Accommodations</strong> &mdash; Coordinate calculators, TTS, annotation, color schemes
						</div>
					</li>
					<li class="flex items-start gap-3">
						<svg class="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
						<div>
							<strong>Session Lifecycle</strong> &mdash; Hydration, persistence triggers, and replay within runtime scope
						</div>
					</li>
				</ul>
			</div>

			<div>
				<h3 class="text-2xl font-bold text-secondary mb-4">Your Backend Responsibilities</h3>
				<ul class="space-y-3">
					<li class="flex items-start gap-3">
						<svg class="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
						<div>
							<strong>Item Storage</strong> &mdash; Your item bank or CMS storing item configurations as JSON documents
						</div>
					</li>
					<li class="flex items-start gap-3">
						<svg class="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
						<div>
							<strong>Authentication & Authorization</strong> &mdash; Users, permissions, sessions
						</div>
					</li>
					<li class="flex items-start gap-3">
						<svg class="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
						<div>
							<strong>Assessment Administration</strong> &mdash; Test assignments, time limits, attempt counts
						</div>
					</li>
					<li class="flex items-start gap-3">
						<svg class="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
						<div>
							<strong>Session Persistence</strong> &mdash; Store student responses via PIE's persistence hooks
						</div>
					</li>
					<li class="flex items-start gap-3">
						<svg class="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
						<div>
							<strong>Scoring</strong> &mdash; Execute controller logic server-side for high-stakes assessments
						</div>
					</li>
					<li class="flex items-start gap-3">
						<svg class="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
						<div>
							<strong>Reporting</strong> &mdash; Score reports, analytics, learning insights
						</div>
					</li>
				</ul>
			</div>
		</div>
	</section>

	<!-- Controller API -->
	<section class="mb-20">
		<h2 class="text-3xl font-bold text-secondary mb-6">The Controller API</h2>
		<p class="text-lg text-base-content/70 mb-8 max-w-4xl">
			Your application communicates with PIE through the <strong>section controller</strong> (or assessment controller), which provides a well-defined, typed API on top of the underlying Web Component plumbing. Because Web Components are browser-native, they work consistently across React, Vue, Angular, Svelte, and vanilla JavaScript.
		</p>

		<p class="text-lg text-base-content/70 mb-6 max-w-4xl">
			While DOM events flow under the hood (this is how Web Components work), the controller interface is the intended integration surface for section and assessment player clients. Your code calls <code>controller.subscribe(event =&gt; ...)</code> rather than listening for DOM events on specific elements &mdash; decoupling your integration from internal DOM structure.
		</p>

		<div class="grid md:grid-cols-2 gap-6 mb-8">
			<div class="card bg-base-200 border border-base-300">
				<div class="card-body">
					<h4 class="font-bold text-secondary mb-2">Properties</h4>
					<p class="text-xs text-base-content/60 mb-2">Pass configuration via element attributes or JS object properties</p>
					<CodeEditor value={propertiesExample} language="javascript" readonly={true} />
				</div>
			</div>

			<div class="card bg-base-200 border border-base-300">
				<div class="card-body">
					<h4 class="font-bold text-secondary mb-2">Controller Methods</h4>
					<p class="text-xs text-base-content/60 mb-2">Typed methods for session lifecycle and navigation</p>
					<CodeEditor value={methodsExample} language="javascript" readonly={true} />
				</div>
			</div>
		</div>

		<div class="card bg-base-200 border border-base-300 mb-8">
			<div class="card-body">
				<h4 class="font-bold text-secondary mb-2">Controller subscribe() & Obtaining the Controller</h4>
				<p class="text-xs text-base-content/60 mb-2">Single <code>subscribe()</code> method with discriminated event types &mdash; a stable contract decoupled from internal DOM structure</p>
				<CodeEditor value={controllerExample} language="javascript" readonly={true} />
			</div>
		</div>

		<div class="card bg-base-200 border border-base-300 mb-8">
			<div class="card-body">
				<h4 class="font-bold text-secondary mb-2">ToolkitCoordinator & Session Persistence</h4>
				<p class="text-xs text-base-content/60 mb-2">Construct one coordinator per assessment context &mdash; manages tools, TTS, highlights, and session persistence via hooks</p>
				<CodeEditor value={coordinatorExample} language="javascript" readonly={true} />
			</div>
		</div>

		<div class="alert alert-info">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
			<span>Use DOM APIs directly only for fine-grained element or item player control. For section and assessment delivery, the controller API is the contract &mdash; making integrations more robust and less coupled to internal DOM structure.</span>
		</div>
	</section>

	<!-- MVVM Security Model -->
	<section class="mb-20">
		<h2 class="text-3xl font-bold text-secondary mb-6">MVVM Security Model</h2>
		<p class="text-lg text-base-content/70 mb-8 max-w-4xl">
			PIE implements a Model-View-ViewModel pattern with controllers acting as security gateways. This pattern is crucial for high-stakes assessments where answer key security matters.
		</p>

		<div class="my-8">
			<img
				src="{base}/images/docs/architecture/mvvm-security-flow.png"
				alt="PIE MVVM security flow"
				width="845"
				height="461"
				loading="lazy"
				class="rounded-lg shadow-lg w-full max-w-4xl mx-auto"
			/>
		</div>

		<div class="grid md:grid-cols-2 gap-6 mb-8">
			<div class="card bg-base-100 shadow border border-base-300">
				<div class="card-body">
					<div class="badge badge-success mb-2">Low Stakes</div>
					<h4 class="font-bold text-lg mb-2">Client-Side Execution</h4>
					<p class="text-sm text-base-content/70">
						Controllers run in the browser. Enables rapid development, immediate feedback, and works well for practice quizzes or formative assessments where answer security isn't critical.
					</p>
				</div>
			</div>
			<div class="card bg-base-100 shadow border border-base-300">
				<div class="card-body">
					<div class="badge badge-error mb-2">High Stakes</div>
					<h4 class="font-bold text-lg mb-2">Server-Side Execution</h4>
					<p class="text-sm text-base-content/70">
						Controllers run on your backend. Your server receives the student's session data, executes the controller, calculates the score, and returns only the outcome. Correct answers never reach the browser.
					</p>
				</div>
			</div>
		</div>

		<div class="card bg-base-200 border border-base-300">
			<div class="card-body">
				<h4 class="font-bold mb-2">Controller Functions</h4>
				<div class="grid md:grid-cols-2 gap-4">
					<div>
						<p class="text-sm font-mono text-primary mb-1">model(question, session, env)</p>
						<p class="text-sm text-base-content/70">Returns view model for rendering. Filters sensitive data based on role and mode.</p>
					</div>
					<div>
						<p class="text-sm font-mono text-primary mb-1">outcome(question, session, env)</p>
						<p class="text-sm text-base-content/70">Returns score and feedback. Controls what feedback is visible to which roles.</p>
					</div>
				</div>
				<div class="mt-4 text-sm text-base-content/60">
					The <code>env</code> parameter specifies <strong>role</strong> (student/instructor) and <strong>mode</strong> (gather/view/evaluate), enabling context-sensitive security transformations.
				</div>
			</div>
		</div>
	</section>

	<!-- Navigation -->
	<section class="mb-12">
		<div class="flex flex-col md:flex-row gap-4 justify-between">
			<a href="{base}/docs/toolkit/" class="btn btn-outline btn-secondary">
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
				</svg>
				Assessment Toolkit
			</a>
			<a href="{base}/docs/qti/" class="btn btn-primary">
				QTI & Standards
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
				</svg>
			</a>
		</div>
	</section>
</div>
