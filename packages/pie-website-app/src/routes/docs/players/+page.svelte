<script lang="ts">
	import { base } from '$app/paths';
	import CodeEditor from '$lib/components/CodeEditor.svelte';
	import Diagram from '$lib/components/Diagram.svelte';
	import ExternalLink from '$lib/components/ExternalLink.svelte';
	import { PRINT_COUNT } from '$lib/data/elements';
	import { HOST_EXAMPLE_HTML, SESSION_LISTENER_JS } from '$lib/data/host-example';
	import { DOCS } from '$lib/data/links';
	import { ITEM_PLAYER_CDN_URL, ITEM_PLAYER_PACKAGE, ITEM_PLAYER_VERSION } from '$lib/versions';

	const PP = 'https://github.com/pie-framework/pie-players/blob/develop/';
	const SECTION_PLAYER_README = `${PP}packages/section-player/README.md`;
	const ASSESSMENT_PLAYER_README = `${PP}packages/assessment-player/README.md`;
	const PRINT_PLAYER_README = `${PP}packages/print-player/README.md`;
	const THEME_README = `${PP}packages/theme/README.md`;
	const VERSIONING = `${PP}docs/install/versioning.md`;
	const SECTION_PLAYER_CDN_URL = `https://cdn.jsdelivr.net/npm/@pie-players/pie-section-player@${ITEM_PLAYER_VERSION}/dist/browser/pie-section-player.js`;
	const PRINT_PLAYER_CDN_URL = `https://cdn.jsdelivr.net/npm/@pie-players/pie-print-player@${ITEM_PLAYER_VERSION}/dist/print-player.js`;

	const installExample = `npm install --save-exact ${ITEM_PLAYER_PACKAGE}@${ITEM_PLAYER_VERSION}`;

	const scoreExample = `${SESSION_LISTENER_JS}

const results = await player.provideScore();`;

	const printExample = `<pie-print></pie-print>

<script type="module">
  import "${PRINT_PLAYER_CDN_URL}";

  const printer = document.querySelector("pie-print");
  printer.config = {
    item: { markup, elements, models }, // the same item config the item player takes
    options: { role: "student" }, // "instructor" adds correct answers and rationales
  };
<\/script>`;

	const sectionPlayerExample = `<pie-section-player-splitpane
  section-id="section-a"
  attempt-id="attempt-xyz"
  show-toolbar="true"
></pie-section-player-splitpane>

<script type="module">
  import "${SECTION_PLAYER_CDN_URL}";

  const player = document.querySelector("pie-section-player-splitpane");

  // Set runtime no later than section.
  player.runtime = {
    assessmentId: "my-assessment-001",
    playerType: "iife",
    env: { mode: "gather", role: "student" },
    tools: {
      placement: {
        section: ["theme", "ruler", "protractor"],
        item: ["textToSpeech", "answerEliminator"],
        passage: ["textToSpeech"],
      },
    },
  };

  // itemConfig: an item config as in the item player example
  player.section = {
    identifier: "section-a",
    assessmentItemRefs: [{ identifier: "q1", item: { id: "q1", config: itemConfig } }],
  };
<\/script>`;

	const assessmentPlayerExample = `import "@pie-players/pie-assessment-player/components/assessment-player-default-element";

// <pie-assessment-player-default
//   assessment-id="assessment-001"
//   attempt-id="attempt-xyz"
//   section-player-layout="splitpane"
// ></pie-assessment-player-default>
const player = document.querySelector("pie-assessment-player-default");

player.assessment = assessmentDefinition;
player.coordinator = coordinator; // optional; stays host-owned

player.addEventListener("assessment-navigation-requested", (event) => {
  if (!mayLeave(event.detail.fromSectionId)) event.preventDefault();
});

player.addEventListener("assessment-controller-ready", (event) => {
  const { controller } = event.detail;
  // subscribe, persist, submit
});

player.navigateNext(); // fires the cancelable request, then persists after the move`;
</script>

<svelte:head>
	<title>Players - PIE Framework</title>
	<meta
		name="description"
		content="PIE players: the item player, section player layouts with the assessment toolkit, the print player, and a reference assessment player. Loading strategies, section composition and assessment orchestration."
	/>
</svelte:head>

<div>
	<!-- Header -->
	<div class="mb-12">
		<h1 class="text-4xl sm:text-5xl font-bold text-secondary mb-4">Players and building blocks</h1>
		<p class="text-xl text-base-content/70 max-w-4xl">
			PIE ships an item player, a section player with its assessment toolkit, and a print player.
			<code>&lt;pie-assessment-player-default&gt;</code> is a reference assembly of the section player
			and toolkit; production assessment shells are built by the host from the same packages. A page
			that needs tools without section layout wraps item players in
			<code>&lt;pie-assessment-toolkit&gt;</code> and <code>&lt;pie-item-scope&gt;</code>.
		</p>
	</div>

	<!-- Building blocks -->
	<section class="mb-20" id="building-blocks">
		<h2 class="text-3xl font-bold text-secondary mb-6">Building blocks</h2>
		<p class="text-lg text-base-content/70 mb-8 max-w-4xl">
			Every player is a custom element that bundles its own runtime, so the host page needs no
			framework. Hosts compose them into the delivery they need; the
			<a href="{base}/docs/integration/#patterns" class="link link-primary">integration patterns</a> name
			the four common assemblies.
		</p>

		<Diagram
			name="building-blocks"
			width={1028}
			height={778}
			alt="PIE Players building blocks: the host embeds the item, section, print or reference assessment player; the assessment toolkit configures them and places tools, and every player renders PIE elements."
		/>

		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
			<div class="card bg-base-100 shadow-lg border border-base-300">
				<div class="card-body">
					<h3 class="card-title text-primary">Item player</h3>
					<p class="text-sm"><code>&lt;pie-item-player&gt;</code> renders one item: it loads the item's elements, runs their controllers in the browser or renders server-processed models, and reports session changes.</p>
				</div>
			</div>
			<div class="card bg-base-100 shadow-lg border border-base-300">
				<div class="card-body">
					<h3 class="card-title text-primary">Section player</h3>
					<p class="text-sm">
						Four layout elements render a section's passages and items. Each hosts the assessment
						toolkit: tools placed through <code>runtime.tools.placement</code> appear in the section
						toolbar and in item and passage headers.
					</p>
				</div>
			</div>
			<div class="card bg-base-100 shadow-lg border border-base-300">
				<div class="card-body">
					<h3 class="card-title text-primary">Assessment toolkit</h3>
					<p class="text-sm">
						<code>&lt;pie-assessment-toolkit&gt;</code>, <code>&lt;pie-item-scope&gt;</code>,
						<code>&lt;pie-item-toolbar&gt;</code> and <code>&lt;pie-section-toolbar&gt;</code> coordinate
						tools, read-aloud, highlighting, accessibility catalogs and tool policy.
						<a href="{base}/docs/toolkit/" class="link link-primary">Assessment toolkit</a>
					</p>
				</div>
			</div>
			<div class="card bg-base-100 shadow-lg border border-base-300">
				<div class="card-body">
					<h3 class="card-title text-primary">Tools</h3>
					<p class="text-sm">
						One <code>@pie-players/pie-tool-*</code> package per tool, each a
						<code>&lt;pie-tool-*&gt;</code> custom element. <code>@pie-players/pie-default-tool-loaders</code>
						registers the packaged set.
					</p>
				</div>
			</div>
			<div class="card bg-base-100 shadow-lg border border-base-300">
				<div class="card-body">
					<h3 class="card-title text-primary">Print player</h3>
					<p class="text-sm"><code>&lt;pie-print&gt;</code> renders an item for printing, for a student or an instructor.</p>
				</div>
			</div>
			<div class="card bg-base-100 shadow-lg border border-base-300">
				<div class="card-body">
					<h3 class="card-title text-primary">Theme</h3>
					<p class="text-sm">
						<code>&lt;pie-theme&gt;</code> merges a light, dark or auto base theme, a provider adapter, a color
						scheme and explicit <code>variables</code> into the tokens players and elements read.
						<ExternalLink href={THEME_README}>Theme README</ExternalLink>
					</p>
				</div>
			</div>
			<div class="card bg-base-100 shadow-lg border border-base-300 md:col-span-2 lg:col-span-3">
				<div class="card-body">
					<h3 class="card-title text-primary">Reference assessment player</h3>
					<p class="text-sm">
						<code>&lt;pie-assessment-player-default&gt;</code> assembles section players, navigation
						and one assessment session. Production hosts replace it with their own shell.
					</p>
				</div>
			</div>
		</div>

		<p class="text-base text-base-content/70 mt-8 max-w-4xl">
			All <code>@pie-players/*</code> packages release together under one version number; the samples
			on this site pin {ITEM_PLAYER_VERSION}. Every release is a patch release, breaking changes
			included, so pin it exactly and read the changelog before upgrading. 1.0 ships first as
			<code>1.0.0-beta.N</code> prereleases under the <code>beta</code> npm tag.
			<ExternalLink href={VERSIONING}>Versioning</ExternalLink>
		</p>
		<p class="text-sm text-base-content/60 mt-4 max-w-4xl">
			<code>&lt;pie-element-player&gt;</code> in pie-elements-ng renders one element in isolation for
			element development and demos.
		</p>
	</section>

	<!-- Item player -->
	<section class="mb-20" id="item-player">
		<h2 class="text-3xl font-bold text-secondary mb-6">Item player</h2>
		<p class="text-lg text-base-content/70 mb-6 max-w-4xl">
			<code>&lt;pie-item-player&gt;</code> renders one item from its config: the markup, the element
			map and one model per element. Install it from npm, or load its browser entry from jsDelivr as
			a module script:
		</p>
		<div class="mb-4">
			<CodeEditor value={installExample} language="bash" readonly={true} height="50px" />
		</div>
		<p class="text-sm text-base-content/70 mb-6 break-all">
			<code>{ITEM_PLAYER_CDN_URL}</code>
		</p>
		<div class="mb-6">
			<CodeEditor value={HOST_EXAMPLE_HTML} language="html" readonly={true} height="420px" />
		</div>
		<p class="text-lg text-base-content/70 mb-4 max-w-4xl">
			<code>session-changed</code> carries the whole item session; store it, and assign it back to
			<code>player.session</code> to resume. <code>provideScore()</code> runs each element's scoring
			controller in the browser and returns one slot per model, <code>undefined</code> where an element has no outcome. A hosted player scores nothing in the browser.
		</p>
		<div class="mb-8">
			<CodeEditor value={scoreExample} language="javascript" readonly={true} height="140px" />
		</div>

		<h3 class="text-2xl font-bold text-primary mb-4">Loading strategies</h3>
		<p class="text-lg text-base-content/70 mb-4 max-w-4xl">
			Three strategies decide where element code comes from; rendering is the same once an element is
			registered. The <code>strategy</code> attribute selects one.
		</p>

		<Diagram
			name="item-player-strategies"
			width={1028}
			height={793}
			alt="Item player strategies: iife loads bundles from the bundle host, esm imports browser builds from an ESM CDN, and preloaded asserts elements the host registered; each defines versioned custom elements."
		/>

		<div class="overflow-x-auto mb-6">
			<table class="table table-zebra">
				<thead>
					<tr>
						<th></th>
						<th><code>iife</code> (default)</th>
						<th><code>esm</code></th>
						<th><code>preloaded</code></th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th>Element code from</th>
						<td>The PIE bundle host, or <code>loaderOptions.bundleHost</code></td>
						<td>ESM CDN: jsDelivr by default, or esm.sh</td>
						<td>Element packages the host bundles from npm</td>
					</tr>
					<tr>
						<th>Loaded by</th>
						<td>Script injection</td>
						<td>Native <code>import()</code>; the player adds an import map for shared React</td>
						<td>The host bundle; the player asserts registration</td>
					</tr>
					<tr>
						<th>Host setup</th>
						<td>None</td>
						<td>None; needs a browser with import-map support</td>
						<td><code>registerPreloadedElements(...)</code> before mount; <code>math.assetRoot</code></td>
					</tr>
					<tr>
						<th>Best for</th>
						<td>Production on PIE bundle infrastructure</td>
						<td>ESM-compatible element packages</td>
						<td>Section preloading, static builds, offline</td>
					</tr>
				</tbody>
			</table>
		</div>

		<div class="grid md:grid-cols-3 gap-6 mb-6">
			<div class="card bg-base-100 shadow-lg border border-base-300">
				<div class="card-body">
					<h4 class="card-title text-primary text-lg">iife</h4>
					<p class="text-sm">
						Loads element bundles by script injection from the PIE bundle host;
						<code>loaderOptions.bundleHost</code> names another host.
					</p>
				</div>
			</div>
			<div class="card bg-base-100 shadow-lg border border-base-300">
				<div class="card-body">
					<h4 class="card-title text-primary text-lg">esm</h4>
					<p class="text-sm">
						Loads element modules with native <code>import()</code> from jsDelivr by default, or
						esm.sh, configured through <code>loaderOptions.esmCdnUrl</code> and
						<code>esmCdnProvider</code>; the browser's module cache shares them across items.
					</p>
				</div>
			</div>
			<div class="card bg-base-100 shadow-lg border border-base-300">
				<div class="card-body">
					<h4 class="card-title text-primary text-lg">preloaded</h4>
					<p class="text-sm">
						The host bundles element packages from npm and registers them with
						<code>registerPreloadedElements</code> from
						<code>@pie-players/pie-item-player/preloaded</code> before the player mounts. The player
						loads no element code; MathJax assets still load from <code>math.assetRoot</code>. A tag
						missing at mount raises a non-recoverable <code>player-error</code>.
						<code>@pie-players/pie-preloaded-player</code> publishes ready-made element sets for this
						strategy.
					</p>
				</div>
			</div>
		</div>

		<div class="alert alert-info mb-8">
			<span>
				Hosted delivery works with any strategy: a hosted player renders server-processed models and
				runs no element controller in the browser.
				<a href="{base}/docs/security/#graded-delivery" class="link">Graded delivery</a>
			</span>
		</div>

		<p class="text-lg text-base-content/70 mb-4 max-w-4xl">
			<code>mode="author"</code> on the same player renders each element's configuration UI and emits
			<code>model-updated</code> as the author edits. The player sanitizes item markup with DOMPurify;
			<code>trust-markup</code> turns that off for markup the host trusts. Its events include
			<code>load-complete</code>, <code>session-changed</code>, <code>player-error</code> and
			<code>model-updated</code>, plus <code>backend-*</code> events when it talks to a delivery
			backend.
		</p>
		<p class="text-base text-base-content/70 max-w-4xl">
			<ExternalLink href={DOCS.itemPlayerOverview}>Item player overview</ExternalLink> ·
			<ExternalLink href={DOCS.loadingStrategies}>Loading strategies</ExternalLink> ·
			<ExternalLink href={DOCS.itemPlayerReadme}>Item player README</ExternalLink> ·
			<ExternalLink href={DOCS.migration}>Migration from pie-player-components</ExternalLink>
		</p>
	</section>

	<!-- Print player -->
	<section class="mb-20" id="print-player">
		<h2 class="text-3xl font-bold text-secondary mb-6">Print player</h2>
		<p class="text-lg text-base-content/70 mb-6 max-w-4xl">
			<code>&lt;pie-print&gt;</code> from <code>@pie-players/pie-print-player</code> renders an item for
			printing, with print views for {PRINT_COUNT} elements; an element without a print build renders a
			placeholder. It loads each element's print module from jsDelivr by default. The
			<code>student</code> role shows no answers or rationales; <code>instructor</code> adds correct
			answers and rationales. The player compares <code>config</code> by identity, so each change takes
			a new object.
		</p>
		<div class="mb-6">
			<CodeEditor value={printExample} language="html" readonly={true} height="260px" />
		</div>
		<p class="text-base text-base-content/70 max-w-4xl">
			<ExternalLink href={PRINT_PLAYER_README}>Print player README</ExternalLink>
		</p>
	</section>

	<!-- Section player -->
	<section class="mb-20" id="section-player">
		<h2 class="text-3xl font-bold text-secondary mb-6">Section player</h2>
		<p class="text-lg text-base-content/70 mb-4 max-w-4xl">
			A typical assessment screen pairs a reading passage with the questions about it. A section
			toolbar offers tools for the whole page: graph, periodic table, line reader, ruler, protractor,
			dictionaries and color schemes. Each item header carries read-aloud, calculator and answer
			elimination, the passage header carries read-aloud, and selecting text in either opens the
			highlighter. All of this needs coordination, shared state, and a coherent lifecycle.
		</p>
		<p class="text-lg text-base-content/70 mb-8 max-w-4xl">
			Placement is opt-in. A layout shows no tools until <code>runtime.tools.placement</code> lists
			them; <code class="[overflow-wrap:anywhere]">SECTION_PLAYER_PREFERRED_TOOL_PLACEMENT</code> from
			<code>@pie-players/pie-default-tool-loaders</code> is the arrangement above.
		</p>

		<Diagram
			name="section-composition"
			width={1028}
			height={795}
			alt="A split-pane section player: a passage card with read-aloud on the left, two item cards on the right, the first with read-aloud, calculator and answer eliminator in its header and the second with read-aloud, and the section toolbar with theme, graph, periodic table, line reader, ruler and protractor on the right edge."
		/>

		<h3 class="text-2xl font-bold text-primary mb-4">Layout structure</h3>
		<p class="text-lg text-base-content/70 mb-4 max-w-4xl">
			The host places one layout element and sets <code>runtime</code> and <code>section</code> on it.
			Each layout renders its own <code>&lt;pie-assessment-toolkit&gt;</code>, which builds a
			ToolkitCoordinator or adopts the one in <code>runtime.coordinator</code>; the host reaches it
			through <code>toolkit-ready</code> (<code>detail.coordinator</code>). Inside, the passages and
			items panes render a card per passage and item, each with its header toolbar and item player,
			beside the section toolbar.
		</p>

		<Diagram
			name="section-layers"
			width={1028}
			height={860}
			alt="The host places one layout element, passes runtime, section and attempt id, and receives toolkit-ready, session-changed and pie-loading-complete. Every layout renders the assessment toolkit, the passages and items panes with their cards, toolbars and item players, and the section toolbar."
		/>

		<div class="grid md:grid-cols-2 gap-6 mb-6">
			<div class="card bg-base-100 shadow-lg border border-base-300">
				<div class="card-body">
					<h4 class="card-title text-primary text-lg [overflow-wrap:anywhere]">&lt;pie-section-player-splitpane&gt;</h4>
					<p class="text-sm">
						Passages and items side by side, with a resizable divider. At or below the narrow breakpoint it
						collapses to tabs or a vertical stack (<code>split-pane-collapse-strategy</code>).
					</p>
				</div>
			</div>
			<div class="card bg-base-100 shadow-lg border border-base-300">
				<div class="card-body">
					<h4 class="card-title text-primary text-lg [overflow-wrap:anywhere]">&lt;pie-section-player-vertical&gt;</h4>
					<p class="text-sm">The passages above the items, in one column.</p>
				</div>
			</div>
			<div class="card bg-base-100 shadow-lg border border-base-300">
				<div class="card-body">
					<h4 class="card-title text-primary text-lg [overflow-wrap:anywhere]">&lt;pie-section-player-tabbed&gt;</h4>
					<p class="text-sm">Passage and items on tabs whenever the section has a passage.</p>
				</div>
			</div>
			<div class="card bg-base-100 shadow-lg border border-base-300">
				<div class="card-body">
					<h4 class="card-title text-primary text-lg [overflow-wrap:anywhere]">&lt;pie-section-player-kernel-host&gt;</h4>
					<p class="text-sm">
						With <code>&lt;pie-section-player-items-pane&gt;</code> and
						<code>&lt;pie-section-player-passages-pane&gt;</code>, the host composes its own layout
						from the stock panes.
					</p>
				</div>
			</div>
		</div>

		<p class="text-lg text-base-content/70 mb-8 max-w-4xl">
			The section toolbar renders when <code>show-toolbar</code> is set. <code>toolbar-position</code>
			takes <code>top</code>, <code>right</code> (the default), <code>bottom</code>, <code>left</code> or
			<code>none</code>; at viewport widths of 1100 px and narrower the toolbar moves to the top
			(<code>narrow-layout-breakpoint</code>).
		</p>

		<h3 class="text-2xl font-bold text-primary mb-4" id="integration-modes">Integration modes</h3>
		<p class="text-lg text-base-content/70 mb-4 max-w-4xl">
			Either let the layout build a ToolkitCoordinator from <code>runtime.tools</code>, or pass your
			own as <code>runtime.coordinator</code>; a coordinator you pass stays yours to configure and
			dispose.
		</p>

		<Diagram
			name="section-integration-modes"
			width={1008}
			height={572}
			alt="Two integration modes. Custom-element first: the host sets runtime with an assessment id and tools, the layout's toolkit builds the coordinator, and toolkit-ready returns it. JS API: the host constructs a ToolkitCoordinator with hooks and passes it as runtime.coordinator, and toolkit-ready returns the same instance."
		/>

		<div class="grid md:grid-cols-2 gap-6 mb-8">
			<div class="card bg-base-100 shadow-lg border border-base-300">
				<div class="card-body">
					<h4 class="card-title text-primary text-lg">Player-built coordinator</h4>
					<p class="text-sm">
						Set <code>section</code> and <code>runtime</code> as JS properties; the layout builds a
						ToolkitCoordinator from <code>runtime.tools</code> when <code>runtime.coordinator</code>
						is absent. <code>section-id</code>, <code>attempt-id</code>, <code>show-toolbar</code> and
						<code>toolbar-position</code> are attributes.
					</p>
					<p class="text-sm">
						That coordinator is built without hooks. Changes to <code>runtime</code> after
						initialization do not reach it; update it through <code>updateToolConfig</code> and
						<code>updateToolsPlacement</code>.
					</p>
				</div>
			</div>
			<div class="card bg-base-100 shadow-lg border border-base-300">
				<div class="card-body">
					<h4 class="card-title text-primary text-lg">Host-built coordinator</h4>
					<p class="text-sm">
						The host constructs a <code>ToolkitCoordinator</code> with hooks for session persistence,
						tool state and errors, and passes it as <code>runtime.coordinator</code>. The layout builds
						none, and <code>toolkit-ready</code> returns the same instance. Coordinator hooks are
						available only this way, because they must be in place before the first section controller
						exists.
					</p>
					<p class="text-sm">
						<a href="{base}/docs/integration/#custom-assessment-player" class="link link-primary">Host-built coordinator example</a>
					</p>
				</div>
			</div>
		</div>

		<h3 class="text-2xl font-bold text-primary mb-4">Example</h3>
		<p class="text-lg text-base-content/70 mb-4 max-w-4xl">
			<code>runtime</code> and <code>section</code> are JS properties only. <code>section-id</code>
			falls back to <code>section.identifier</code>; without <code>attempt-id</code> the default
			persistence neither reads nor writes. With a bundler, install
			<code>@pie-players/pie-section-player</code>; <code>import "@pie-players/pie-section-player"</code>
			registers the same layouts.
		</p>
		<div class="mb-6">
			<CodeEditor value={sectionPlayerExample} language="html" readonly={true} height="560px" />
		</div>
		<p class="text-lg text-base-content/70 mb-4 max-w-4xl">
			<code>sectionFromItem(itemConfig, &#123; session &#125;)</code> from
			<code>@pie-players/pie-section-player/item-section</code> wraps one item config as a section, so
			a single item gets the toolbars too. For preloaded elements, set
			<code>runtime.playerType: "preloaded"</code> and register the elements with
			<code>registerPreloadedElements</code> before the section mounts.
		</p>
		<p class="text-lg text-base-content/70 mb-4 max-w-4xl">
			What the toolkit does inside the layout, and which tools exist at which level, is on the
			<a href="{base}/docs/toolkit/" class="link link-primary">Assessment toolkit</a> page. The section
			controller API and DOM events are on
			<a href="{base}/docs/integration/#controller-api" class="link link-primary">Integration</a>.
		</p>
		<p class="text-base text-base-content/70 max-w-4xl">
			<ExternalLink href={DOCS.sectionPlayerGuide}>Section player integration guide</ExternalLink> ·
			<ExternalLink href={SECTION_PLAYER_README}>Section player README</ExternalLink>
		</p>
	</section>

	<!-- Reference assessment player -->
	<section class="mb-20" id="assessment-player">
		<h2 class="text-3xl font-bold text-secondary mb-6">Reference assessment player</h2>
		<p class="text-lg text-base-content/70 mb-8 max-w-4xl">
			<code>&lt;pie-assessment-player-default&gt;</code> is a reference assembly: it renders navigation
			and mounts a section player for the active section, keeping one assessment session across
			sections. Production multi-section players are host-built from the same packages, as the
			<a href="{base}/docs/integration/#custom-assessment-player" class="link link-primary">custom assessment player</a>
			pattern describes. The package is for bundlers and changes without a compatibility period.
		</p>

		<Diagram
			name="assessment-layers"
			width={1028}
			height={656}
			alt="Assessment player reference assembly: host inputs and events, the navigation bar and assessment controller, one mounted section player, toolkit session functions and an optional ToolkitCoordinator."
		/>

		<div class="grid md:grid-cols-2 gap-6 mb-8">
			<div class="card bg-base-100 shadow-lg border border-base-300">
				<div class="card-body">
					<h3 class="card-title text-primary">Content model</h3>
					<p class="text-sm">
						An assessment holds sections, optionally grouped into test parts, and each section holds its
						items. The assessment controller flattens this structure into a linear delivery plan and
						navigates by position or section id.
					</p>
				</div>
			</div>
			<div class="card bg-base-100 shadow-lg border border-base-300">
				<div class="card-body">
					<h3 class="card-title text-primary">Assessment session</h3>
					<p class="text-sm">
						One <code>AssessmentSession</code> holds every section's session and the current position.
						The controller persists it to localStorage by default;
						<code>hooks.createAssessmentSessionPersistence</code> supplies the host's own strategy.
					</p>
				</div>
			</div>
		</div>

		<div class="mb-6">
			<CodeEditor value={assessmentPlayerExample} language="javascript" readonly={true} height="460px" />
		</div>

		<div class="alert alert-info mb-6">
			<span>
				<code>assessment-controller-ready</code> carries the <code>AssessmentControllerHandle</code>:
				<code>navigateTo</code>, <code>navigateNext</code>, <code>navigatePrevious</code>,
				<code>persist</code>, <code>submit</code>, <code>getSession</code>, <code>subscribe</code> and
				<code>updateSectionSession</code>. Navigation through the player's own controls and its
				<code>navigateTo</code>/<code>navigateNext</code>/<code>navigatePrevious</code> methods first
				dispatches a cancelable <code>assessment-navigation-requested</code>, and persists after the
				move. <code>submit()</code> saves first and rejects, unsubmitted, if that save fails.
			</span>
		</div>
		<p class="text-lg text-base-content/70 mb-4 max-w-4xl">
			<code>section-player-layout</code> takes <code>splitpane</code> or <code>vertical</code>.
		</p>
		<p class="text-base text-base-content/70 max-w-4xl">
			<ExternalLink href={ASSESSMENT_PLAYER_README}>Assessment player README</ExternalLink>
		</p>
	</section>
</div>
