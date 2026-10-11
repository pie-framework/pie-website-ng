<script lang="ts">
	import { base } from '$app/paths';
	import CodeEditor from '$lib/components/CodeEditor.svelte';
	import Diagram from '$lib/components/Diagram.svelte';
	import ExternalLink from '$lib/components/ExternalLink.svelte';
	import { DOCS } from '$lib/data/links';

	const PP = 'https://github.com/pie-framework/pie-players/blob/develop/';
	const SECTION_PLAYER_README = `${PP}packages/section-player/README.md`;
	const ASSESSMENT_PLAYER_README = `${PP}packages/assessment-player/README.md`;

	const patterns = [
		{
			name: 'Item player',
			assembly: '<pie-item-player> alone',
			fits: 'One item in a page: authoring, previews, practice.',
			href: `${base}/docs/players/#item-player`,
			linkLabel: 'Item player'
		},
		{
			name: 'Item player with toolkit',
			assembly: '<pie-assessment-toolkit> around a <pie-item-scope> per item, with <pie-item-toolbar>',
			fits: 'Items rendered one at a time, with tools and accommodations.',
			href: '#item-player-with-toolkit',
			linkLabel: 'Example'
		},
		{
			name: 'Section player',
			assembly: 'A layout element with runtime and section',
			fits: 'A section screen: passages, items, section tools, section session.',
			href: `${base}/docs/players/#section-player`,
			linkLabel: 'Section player'
		},
		{
			name: 'Custom assessment player',
			assembly: 'Section players, one coordinator per assessment, the assessment-session helpers',
			fits: "Multi-section delivery with the host's routing, persistence and submission.",
			href: '#custom-assessment-player',
			linkLabel: 'Example'
		}
	];

	const pieOwns = [
		['Rendering', 'items, passages and rubrics with their layout, styling and behavior'],
		['Composition', 'items, passages and tools composed into section layouts'],
		['Interaction', 'learner responses captured through accessible interfaces'],
		['Authoring', "each element's configuration UI"],
		['Accessibility', 'the WCAG 2.2 AA target, keyboard support, screen reader compatibility'],
		['Tools and accommodations', 'calculators, text-to-speech, annotation, color schemes, tool policy'],
		['Session lifecycle', 'hydration, persistence through host strategies, and session change events']
	];

	const hostOwns = [
		['Item storage', 'the item bank or CMS that stores item configs as JSON'],
		['Authentication and authorization', 'users, permissions, sign-in'],
		['Assessment administration', 'assignments, time limits, attempt counts'],
		['Session storage', 'the sessions the players report, stored through the persistence hooks or from session-changed'],
		['Scoring', 'for graded delivery, the element controllers run on your server under hosted delivery'],
		['Reporting', 'score reports and analytics']
	];

	const itemScopeExample = `import '@pie-players/pie-assessment-toolkit/components/pie-assessment-toolkit-element';
import '@pie-players/pie-assessment-toolkit/components/item-scope-element';
import '@pie-players/pie-assessment-toolkit/components/item-toolbar-element';
import '@pie-players/pie-item-player';
import { createPackagedToolRegistry } from '@pie-players/pie-default-tool-loaders';

const item = { id: 'q1', config: itemConfig }; // itemConfig: { elements, models, markup }

// Set the toolkit's properties before the tree enters the document.
const toolkit = document.createElement('pie-assessment-toolkit');
toolkit.toolRegistry = createPackagedToolRegistry();
toolkit.tools = { placement: { item: ['textToSpeech', 'answerEliminator'] } };
toolkit.addEventListener('runtime-ready', async (event) => {
  const { coordinator } = event.detail;
  await coordinator.waitUntilReady();
});

const scope = document.createElement('pie-item-scope');
scope.setAttribute('item-id', item.id);
scope.item = item;

const content = document.createElement('div');
content.dataset.region = 'content';
const player = document.createElement('pie-item-player');
player.config = item.config;
player.env = { mode: 'gather', role: 'student' };
player.addEventListener('session-changed', (event) => saveSession(event.detail.session));
content.append(player);

scope.append(document.createElement('pie-item-toolbar'), content);
toolkit.append(scope);
document.body.append(toolkit);`;

	const customPlayerExample = `import {
  ToolkitCoordinator,
  createNewAssessmentSession,
  setCurrentSectionPosition,
  upsertSectionSession,
} from '@pie-players/pie-assessment-toolkit';
import { createPackagedToolRegistry } from '@pie-players/pie-default-tool-loaders';
import '@pie-players/pie-section-player';

// The layout and the coordinator share one registry: a passed coordinator
// registers tool providers only from its own registry.
const toolRegistry = createPackagedToolRegistry();
const coordinator = new ToolkitCoordinator({
  assessmentId: 'assessment-001',
  toolRegistry,
  tools: {
    placement: {
      section: ['ruler', 'protractor'],
      item: ['textToSpeech', 'answerEliminator'],
      passage: ['textToSpeech', 'annotationToolbar'],
    },
    // Server voices; your server synthesizes speech at /api/tts unless apiEndpoint names another.
    providers: { textToSpeech: { enabled: true, backend: 'server', serverProvider: 'polly' } },
  },
  hooks: {
    onFrameworkError: (model) => reportError(model),
    createSectionSessionPersistence: () => ({
      loadSession: (ctx) => api.loadSection(ctx.key), // { assessmentId, sectionId, attemptId }
      saveSession: (ctx, session) => api.saveSection(ctx.key, session),
      clearSession: (ctx) => api.clearSection(ctx.key),
    }),
  },
});

// <pie-section-player-splitpane attempt-id="attempt-xyz" show-toolbar="true"></pie-section-player-splitpane>
const player = document.querySelector('pie-section-player-splitpane');
player.toolRegistry = toolRegistry;
player.runtime = { assessmentId: 'assessment-001', env: { mode: 'gather', role: 'student' }, coordinator };

let attempt = createNewAssessmentSession({
  assessmentAttemptSessionIdentifier: 'attempt-xyz',
  assessmentId: 'assessment-001',
  seed: 'attempt-xyz',
  sectionIdentifiers: sections.map((section) => section.identifier),
});

let currentIndex = -1;

async function showSection(index) {
  const current = player.getSectionController();
  if (current) {
    await current.persist();
    attempt = upsertSectionSession(attempt, {
      sectionIdentifier: sections[currentIndex].identifier,
      sectionSession: current.getSession(),
    });
  }
  player.section = sections[index]; // the new section hydrates from the persistence hook
  await player.waitForSectionController(5000);
  currentIndex = index;
  attempt = setCurrentSectionPosition(attempt, {
    currentSectionIndex: index,
    currentSectionIdentifier: sections[index].identifier,
  });
  await api.saveAttempt(attempt);
}

await showSection(0);
coordinator.subscribeSectionLifecycleEvents({ listener: (event) => console.log(event.type, event) });`;

	const controllerExample = `const player = document.querySelector('pie-section-player-splitpane');
const controller = await player.waitForSectionController(5000); // null at the timeout

const unsubscribe = controller?.subscribe((event) => {
  switch (event.type) {
    case 'item-session-data-changed':
      saveSection(controller.getSession());
      break;
    case 'section-loading-complete':
      console.log('All items loaded');
      break;
    case 'section-items-complete-changed':
      updateProgress(event.completedCount, event.totalItems);
      break;
    case 'section-error':
      reportError(event.source, event.error);
      break;
  }
});

// The section hydrates from its persistence strategy when it loads.
await controller?.persist();
// Restore a saved snapshot, replacing the in-memory state:
await controller?.applySession(savedSession, { mode: 'replace' });`;

	const deliveryExample = `sectionPlayer.runtime = {
  playerType: 'iife',
  env: { mode: 'gather', role: 'student' },
  player: {
    backend: {
      auth: { getToken: async () => await fetchTokenForLearner() },
      delivery: {
        enabled: true, // also sets hosted on every embedded item player
        baseUrl: 'https://api.example.com',
        assignmentId: 'assignment-1', // the assignment the service files sessions under
        autosave: { enabled: true, debounceMs: 250 },
      },
    },
  },
};`;
</script>

<svelte:head>
	<title>Integration - PIE Framework</title>
	<meta
		name="description"
		content="Integrating PIE: the four integration patterns, what PIE and the host each own, the section controller API, and the security model for graded delivery."
	/>
</svelte:head>

<div class="container mx-auto px-4 py-12 max-w-7xl">
	<!-- Header -->
	<div class="mb-12">
		<h1 class="text-4xl sm:text-5xl font-bold text-secondary mb-4">Integration</h1>
		<p class="text-xl text-base-content/70 max-w-4xl">
			PIE renders and runs assessment content in the browser. The host application owns the content,
			the learner record and the policy around them, and assembles its player from PIE's building
			blocks in one of four patterns.
		</p>
	</div>

	<!-- Integration patterns -->
	<section class="mb-20 scroll-mt-24" id="patterns">
		<h2 class="text-3xl font-bold text-secondary mb-6">Integration patterns</h2>

		<div class="grid md:grid-cols-2 gap-6 mb-6">
			{#each patterns as pattern (pattern.name)}
				<div class="card bg-base-100 shadow-lg border border-base-300">
					<div class="card-body">
						<h3 class="card-title text-primary">{pattern.name}</h3>
						<p class="text-sm"><code class="[overflow-wrap:anywhere]">{pattern.assembly}</code></p>
						<p class="text-sm text-base-content/70">{pattern.fits}</p>
						<p class="text-sm">
							<a href={pattern.href} class="link link-primary">{pattern.linkLabel}</a>
						</p>
					</div>
				</div>
			{/each}
		</div>

		<p class="text-lg text-base-content/70 mb-12 max-w-4xl">
			Authoring (<code>mode="author"</code>) and print (<code>&lt;pie-print&gt;</code>) use the item
			player and the print player on their own; <a href="{base}/docs/players/" class="link link-primary">Players</a>
			covers both.
		</p>

		<!-- Item player with toolkit -->
		<h3 class="text-2xl font-bold text-primary mb-4 scroll-mt-24" id="item-player-with-toolkit">
			Item player with toolkit
		</h3>
		<p class="text-lg text-base-content/70 mb-4 max-w-4xl">
			<code>&lt;pie-assessment-toolkit&gt;</code> needs no section. Each
			<code>&lt;pie-item-scope&gt;</code> registers its item and the item's settings with the
			coordinator the toolkit builds from its properties; the toolbar inside the scope renders the
			placed tools, and the tools act on the scope's <code>[data-region="content"]</code>. The item
			player's events pass through the scope unchanged, and the session stays the item player's.
		</p>

		<Diagram
			name="toolkit-item-scope"
			width={1028}
			height={628}
			alt="Item player with the toolkit: the host sets tools, toolRegistry, toolContextResolvers and assessment on a pie-assessment-toolkit and receives runtime-ready with the coordinator. A pie-item-scope per item registers the item and its settings with the coordinator; its item toolbar takes tool policy and services from the coordinator, and the tools act on the content region that holds the item player."
		/>

		<div class="mb-4">
			<CodeEditor value={itemScopeExample} language="javascript" readonly={true} height="620px" />
		</div>
		<p class="text-lg text-base-content/70 mb-12 max-w-4xl">
			The first scope that registers starts the coordinator from the toolkit's inputs at that moment.
			<code>runtime-ready</code> carries the coordinator once it exists, and
			<code>coordinator.waitUntilReady()</code> resolves once saved tool state has loaded and
			text-to-speech has started, unless it starts lazily. <code>toolkit-ready</code> and <code>section-ready</code> belong to a bound section
			and do not fire here.
		</p>

		<!-- Custom assessment player -->
		<h3 class="text-2xl font-bold text-primary mb-4 scroll-mt-24" id="custom-assessment-player">
			Custom assessment player
		</h3>
		<p class="text-lg text-base-content/70 mb-4 max-w-4xl">
			A custom assessment player mounts a section player per section with one coordinator for the
			whole assessment, keeps the attempt in an <code>AssessmentSession</code>, and persists through
			the coordinator's hooks against the host's backend. Construct a coordinator when the host needs
			the services directly; otherwise the section player builds one from <code>runtime.tools</code>.
			Coordinator hooks exist only on a host-built coordinator, because they must be in place before
			the first section controller exists.
		</p>
		<p class="text-lg text-base-content/70 mb-4 max-w-4xl">
			A coordinator the host passes stays the host's: a layout disposes only a coordinator it built.
			The coordinator's <code>subscribeItemEvents</code> and <code>subscribeSectionLifecycleEvents</code>
			follow the active section across navigation. <code>createNewAssessmentSession</code>,
			<code>upsertSectionSession</code> and <code>setCurrentSectionPosition</code> keep the section
			sessions and the current position in the attempt, which the host stores.
		</p>
		<div class="mb-4">
			<CodeEditor value={customPlayerExample} language="javascript" readonly={true} height="900px" />
		</div>
		<p class="text-lg text-base-content/70 mb-4 max-w-4xl">
			The reference assessment player assembles this pattern from the same public exports, with
			navigation, a cancelable <code>assessment-navigation-requested</code> event and submission; read
			it as a pattern for a host's own player.
		</p>
		<p class="text-base text-base-content/70 max-w-4xl">
			<ExternalLink href={ASSESSMENT_PLAYER_README}>Assessment player README</ExternalLink> ·
			<a href="{base}/docs/players/#assessment-player" class="link link-primary">Reference assessment player</a>
		</p>
	</section>

	<!-- Separation -->
	<section class="mb-20 scroll-mt-24" id="separation">
		<h2 class="text-3xl font-bold text-secondary mb-6">What PIE and the host own</h2>
		<p class="text-lg text-base-content/70 mb-4 max-w-4xl">
			The players and the toolkit run the assessment in the browser; the host owns durable data and
			policy. The host stores what the players report, through <code>session-changed</code>,
			<code>getSession()</code> and the persistence hooks, and decides navigation between sections.
		</p>

		<Diagram
			name="content-host-separation"
			width={1028}
			height={542}
			alt="PIE in the browser, with the players, the assessment toolkit and the elements, next to what the host application and its servers own: item bank, sign-in, administration, session storage, scoring and reporting. Item config, env and the saved session flow into PIE; session-changed and saveSession() flow out to the host."
		/>

		<div class="grid md:grid-cols-2 gap-8">
			<div>
				<h3 class="text-2xl font-bold text-primary mb-4">PIE</h3>
				<ul class="space-y-3">
					{#each pieOwns as [title, detail] (title)}
						<li class="flex items-start gap-3">
							<svg class="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
							<div><strong>{title}</strong>: {detail}</div>
						</li>
					{/each}
				</ul>
			</div>
			<div>
				<h3 class="text-2xl font-bold text-secondary mb-4">The host</h3>
				<ul class="space-y-3">
					{#each hostOwns as [title, detail] (title)}
						<li class="flex items-start gap-3">
							<svg class="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
							<div><strong>{title}</strong>: {detail}</div>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</section>

	<!-- Controller API -->
	<section class="mb-20 scroll-mt-24" id="controller-api">
		<h2 class="text-3xl font-bold text-secondary mb-6">Controller API</h2>
		<p class="text-lg text-base-content/70 mb-4 max-w-4xl">
			Players are custom elements and work in any framework. Object inputs — <code>config</code>,
			<code>runtime</code>, <code>section</code>, <code>session</code>, <code>toolRegistry</code> — are
			set as JS properties; attributes carry strings.
		</p>
		<p class="text-lg text-base-content/70 mb-6 max-w-4xl">
			The layouts' DOM events — <code>pie-stage-change</code>, <code>pie-loading-complete</code>,
			<code>toolkit-ready</code>, <code>framework-error</code>, <code>session-changed</code>,
			<code>composition-changed</code> — are the lifecycle contract. In-section change arrives through
			the SectionController's typed <code>subscribe()</code> stream, or through the coordinator's
			<code>subscribeItemEvents</code> and <code>subscribeSectionLifecycleEvents</code>, which follow the
			active section across navigation.
		</p>

		<div class="mb-4">
			<CodeEditor value={controllerExample} language="javascript" readonly={true} height="520px" />
		</div>
		<p class="text-lg text-base-content/70 mb-6 max-w-4xl">
			<code>waitForSectionController(timeoutMs)</code> resolves with the controller, or
			<code>null</code> at the timeout; <code>getSectionController()</code> returns <code>null</code>
			while the controller is pending. <code>hydrate()</code> reloads from the persistence strategy on
			demand, and <code>getSession()</code> is the snapshot to store. Persistence strategies implement
			<code>loadSession(ctx)</code>, <code>saveSession(ctx, session)</code> and optionally
			<code>clearSession(ctx)</code>, keyed by assessment, section and attempt.
		</p>

		<div class="alert alert-info mb-6">
			<span>
				DOM events carry the lifecycle, errors and each item session as it changes. The controller
				carries the section's state — current item, visited items, completion — through its
				<code>subscribe()</code> stream and <code>getSession()</code>.
			</span>
		</div>

		<p class="text-base text-base-content/70 max-w-4xl">
			<ExternalLink href={DOCS.sectionPlayerGuide}>Section player integration guide</ExternalLink> ·
			<ExternalLink href={SECTION_PLAYER_README}>Section player README</ExternalLink>
		</p>
	</section>

	<!-- Security -->
	<section class="mb-20 scroll-mt-24" id="security">
		<h2 class="text-3xl font-bold text-secondary mb-6">Security model</h2>
		<p class="text-lg text-base-content/70 mb-4 max-w-4xl">
			By default the whole item config reaches the browser, answer keys included, and the element
			controllers run there. That fits practice and formative delivery. Graded delivery needs three
			things together: hosted mode, models stripped of answer keys on your server, and outcomes your
			server computes.
		</p>

		<Diagram
			name="element-controller-flow"
			width={1028}
			height={724}
			alt="Where the controller runs. By default the authored model, answer key included, reaches the browser and the item player runs the element controller there. In hosted delivery, set with hosted or a delivery backend, a controller on your server sends only view models to the browser."
		/>

		<div class="grid md:grid-cols-2 gap-6 mb-6">
			<div class="card bg-base-100 shadow-lg border border-base-300">
				<div class="card-body">
					<h3 class="card-title text-primary">Hosted delivery</h3>
					<p class="text-sm">
						Set <code>hosted</code> on <code>&lt;pie-item-player&gt;</code>, or enable
						<code>runtime.player.backend.delivery</code> on the section player, which sets
						<code>hosted</code> on every embedded item player. Item players then load no element
						controllers and render the server-processed models they are given; your server runs
						<code>model()</code> and <code>outcome()</code> and keeps the answer key.
					</p>
				</div>
			</div>
			<div class="card bg-base-100 shadow-lg border border-base-300">
				<div class="card-body">
					<h3 class="card-title text-primary">Stripped models</h3>
					<p class="text-sm">
						The host strips answer-key and rationale fields from the models on its server; the players
						pass models through as they receive them, and nothing in PIE redacts them.
						<code>env.role</code> and <code>env.mode</code> shape what an element shows and are no
						security boundary.
					</p>
				</div>
			</div>
		</div>

		<h3 class="text-2xl font-bold text-primary mb-4">Delivery backend</h3>
		<p class="text-lg text-base-content/70 mb-4 max-w-4xl">
			A delivery backend answers four operations: <code>load</code>, <code>saveSession</code>,
			<code>model</code> and <code>score</code>. The built-in client speaks the PIE API service's player
			routes; a host with another backend supplies its own <code>client</code>. The section player
			configures it once in its runtime
			and derives each embedded item player's backend from it; a hosted player cannot score in the
			browser, so formative delivery needs an unhosted one.
		</p>
		<div class="mb-8">
			<CodeEditor value={deliveryExample} language="javascript" readonly={true} height="340px" />
		</div>

		<h3 class="text-2xl font-bold text-primary mb-4">Element controllers</h3>
		<p class="text-lg text-base-content/70 mb-4 max-w-4xl">
			<code>model(question, session, env, updateSession)</code> turns the authored model into the view
			model an element renders. <code>outcome(model, session, env)</code> resolves to
			<code>{'{ score, empty }'}</code> with a score from 0 to 1; feedback and correctness reach the
			learner through <code>model()</code> in evaluate mode.
		</p>
		<p class="text-lg text-base-content/70 mb-6 max-w-4xl">
			<code>env</code> carries <code>mode</code> (<code>gather</code> collects responses,
			<code>view</code> shows them read-only, <code>evaluate</code> shows correctness and feedback) and
			<code>role</code> (<code>student</code> or <code>instructor</code>); controllers also read
			<code>lockChoiceOrder</code> and <code>partialScoring</code>.
		</p>
		<p class="text-base text-base-content/70 max-w-4xl">
			<a href="{base}/docs/element-structure/#controller-placement" class="link link-primary">Where the controller runs</a> ·
			<ExternalLink href={DOCS.security}>Security</ExternalLink> ·
			<ExternalLink href={DOCS.elementContract}>Element contract</ExternalLink>
		</p>
	</section>

	<!-- Navigation -->
	<section class="mb-12">
		<div class="flex flex-col md:flex-row gap-4 justify-between">
			<a href="{base}/docs/toolkit/" class="btn btn-outline btn-secondary">
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
				</svg>
				Assessment Toolkit
			</a>
			<a href="{base}/docs/qti/" class="btn btn-primary">
				QTI & Standards
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
				</svg>
			</a>
		</div>
	</section>
</div>
