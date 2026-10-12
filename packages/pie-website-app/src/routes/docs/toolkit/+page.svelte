<script lang="ts">
	import { base } from '$app/paths';
	import Diagram from '$lib/components/Diagram.svelte';
	import ExternalLink from '$lib/components/ExternalLink.svelte';
	import { DOCS } from '$lib/data/links';

	const PP = 'https://github.com/pie-framework/pie-players/blob/develop/';
	const TOOL_REGISTRY = `${PP}packages/assessment-toolkit/docs/TOOL_REGISTRY.md`;
	const DEFAULT_TOOL_LOADERS_README = `${PP}packages/default-tool-loaders/README.md`;
	const THEME_README = `${PP}packages/theme/README.md`;
	const TTS_ARCH = `${PP}docs/accessibility/tts-architecture.md`;
	const WCAG_BASELINE = `${PP}docs/wcag/wcag-2.2-aa-baseline.md`;

	const tools = [
		{
			name: 'Calculator',
			ids: ['calculator'],
			placement: 'item',
			does: 'Basic, scientific and graphing modes over Desmos, GeoGebra or Cortex.',
			universal: true
		},
		{
			name: 'Text-to-speech',
			ids: ['textToSpeech'],
			placement: 'item, passage',
			does: 'Reads content aloud with synchronized highlighting.',
			universal: true
		},
		{
			name: 'Answer eliminator',
			ids: ['answerEliminator'],
			placement: 'item',
			does: 'Strikes through (the default) or masks choices the learner rules out.',
			universal: true
		},
		{
			name: 'Annotation toolbar',
			ids: ['annotationToolbar'],
			placement: 'item, passage',
			does: 'Highlights selected text in yellow, pink, blue or green, underlines it, reads it aloud, or clears marks.',
			universal: true
		},
		{
			name: 'Line reader',
			ids: ['lineReader'],
			placement: 'section, item, passage',
			does: 'A movable, resizable reading window that obscures the lines around it.',
			universal: true
		},
		{
			name: 'Ruler',
			ids: ['ruler'],
			placement: 'section, item',
			does: 'Inches or centimeters; drag and rotate.',
			universal: true
		},
		{
			name: 'Protractor',
			ids: ['protractor'],
			placement: 'section, item',
			does: 'Drag to position; rotates about its vertex.',
			universal: true
		},
		{
			name: 'Graph',
			ids: ['graph'],
			placement: 'section, item',
			does: 'A coordinate grid for graphing.',
			universal: true
		},
		{
			name: 'Periodic table',
			ids: ['periodicTable'],
			placement: 'section, item',
			does: 'Element details, category filtering and keyboard navigation.',
			universal: true
		},
		{
			name: 'Theme',
			ids: ['theme'],
			placement: 'section',
			does: 'A color-scheme picker over ten accessible schemes, applied through <pie-theme>; the choice is kept per section and attempt.',
			universal: true
		},
		{
			name: 'Dictionaries',
			ids: ['dictionary', 'pictureDictionary', 'dictionarySpanish', 'pictureDictionarySpanish'],
			placement: 'section, item, passage',
			does: 'Word and picture lookup against an endpoint the host supplies; PIE ships none.',
			universal: false
		},
		{
			name: 'Transcript',
			ids: ['transcript'],
			placement: 'not placeable; content regions activate it',
			does: "Shows the text of an audio prompt from the content's transcript catalog, to learners granted it or always when the catalog says so.",
			universal: false
		}
	];
</script>

<svelte:head>
	<title>Assessment Toolkit - PIE Framework</title>
	<meta
		name="description"
		content="The PIE assessment toolkit: the ToolkitCoordinator and its services, tool placement, the packaged tools, tool policy, theming and accessibility."
	/>
</svelte:head>

<div class="container mx-auto px-4 py-12 max-w-7xl">
	<!-- Header -->
	<div class="mb-12">
		<h1 class="text-4xl sm:text-5xl font-bold text-secondary mb-4">Assessment toolkit</h1>
		<p class="text-xl text-base-content/70 max-w-4xl">
			The assessment toolkit coordinates tools, read-aloud, highlighting, accessibility catalogs and
			tool policy for one assessment context. Hosts use it through the section player, or directly
			with <code>&lt;pie-assessment-toolkit&gt;</code> around item players.
		</p>
	</div>

	<!-- ToolkitCoordinator -->
	<section class="mb-20" id="coordinator">
		<h2 class="text-3xl font-bold text-secondary mb-6">ToolkitCoordinator</h2>
		<p class="text-lg text-base-content/70 mb-4 max-w-4xl">
			<code>ToolkitCoordinator</code> owns the toolkit services for one assessment context. The section
			player and <code>&lt;pie-assessment-toolkit&gt;</code> build one from their <code>tools</code>
			configuration; a host that needs the services directly constructs its own and passes it as
			<code>runtime.coordinator</code>. A host that renders several sections passes the same coordinator
			to each; otherwise each layout builds its own and disposes it on unmount.
		</p>

		<Diagram
			name="toolkit-coordinator"
			width={1028}
			height={728}
			alt="The host constructs a ToolkitCoordinator from a tool registry and hands it to the section player layouts or pie-assessment-toolkit. The coordinator owns six services and holds the tool policy engine privately."
		/>

		<p class="text-lg text-base-content/70 mb-6 max-w-4xl">
			ToolkitCoordinator owns six services and a policy engine. The services are public properties;
			the policy engine is private, queried through <code>decideToolPolicy</code> and
			<code>decideFeaturePolicy</code> and observed through <code>onPolicyChange</code>.
		</p>

		<div class="grid md:grid-cols-2 gap-6 mb-8">
			<div class="card bg-base-100 shadow-lg border border-base-300">
				<div class="card-body">
					<h3 class="card-title text-primary text-lg">toolCoordinator</h3>
					<p class="text-sm">
						Stacks open tools in reserved z-index layers: content 0–999, tools 1000–1999, modal tools
						2000–2999, control handles 3000–3999 and highlights 4000–4999.
					</p>
				</div>
			</div>
			<div class="card bg-base-100 shadow-lg border border-base-300">
				<div class="card-body">
					<h3 class="card-title text-primary text-lg">highlightCoordinator</h3>
					<p class="text-sm">
						Paints read-aloud and annotation highlights through the CSS Custom Highlight API without
						changing the DOM; browsers without that API get no highlights.
					</p>
				</div>
			</div>
			<div class="card bg-base-100 shadow-lg border border-base-300">
				<div class="card-body">
					<h3 class="card-title text-primary text-lg">ttsService</h3>
					<p class="text-sm">
						Speaks content through browser speech or a server provider and drives the read-aloud
						highlight. Server synthesis runs on the host's server with
						<code>@pie-players/tts-server-core</code> and <code>tts-server-polly</code>,
						<code>tts-server-google</code> or <code>tts-server-sc</code>; <code>@pie-players/tts-client-server</code> is the browser
						side. <ExternalLink href={TTS_ARCH}>TTS architecture</ExternalLink>
					</p>
				</div>
			</div>
			<div class="card bg-base-100 shadow-lg border border-base-300">
				<div class="card-body">
					<h3 class="card-title text-primary text-lg">catalogResolver</h3>
					<p class="text-sm">
						Resolves accessibility catalogs by id, item-level before assessment-level; an authored
						catalog beats one a preprocessing step extracted into <code>extractedCatalogs</code>. Catalog
						types: spoken, sign-language, transcript, braille, tactile, simplified-language,
						audio-description, extended-description.
					</p>
				</div>
			</div>
			<div class="card bg-base-100 shadow-lg border border-base-300">
				<div class="card-body">
					<h3 class="card-title text-primary text-lg">elementToolStateStore</h3>
					<p class="text-sm">
						Holds per-element tool state such as answer eliminations, annotations and the chosen color
						scheme, keyed <code class="[overflow-wrap:anywhere]">assessmentId:sectionId:attemptId:itemId:elementId</code>.
						It stays out of the scoring session; hosts persist it through the
						<code>loadToolState</code>/<code>saveToolState</code> hooks.
					</p>
				</div>
			</div>
			<div class="card bg-base-100 shadow-lg border border-base-300">
				<div class="card-body">
					<h3 class="card-title text-primary text-lg">toolProviderRegistry</h3>
					<p class="text-sm">
						Registers and initializes tool providers (read-aloud, calculator) from the tool registry;
						a failed initialization raises a <code>provider-init</code> framework error.
					</p>
				</div>
			</div>
		</div>

		<h3 class="text-2xl font-bold text-primary mb-4">Inside the section player</h3>
		<ul class="list-disc pl-6 space-y-2 text-base-content/80 max-w-4xl">
			<li>
				Resolves accessibility catalogs for the items on the page, registering them on load and
				clearing them on navigation.
			</li>
			<li>Renders read-aloud controls in item and passage headers where placement puts them.</li>
			<li>Stacks open tools in reserved z-index layers.</li>
			<li>Highlights the text being read.</li>
		</ul>
	</section>

	<!-- Tool placement -->
	<section class="mb-20" id="placement">
		<h2 class="text-3xl font-bold text-secondary mb-6">Tool placement</h2>
		<p class="text-lg text-base-content/70 mb-4 max-w-4xl">
			Hosts place tools at three levels through <code>tools.placement</code>: <code>section</code> (the
			section toolbar), <code>item</code> (each item header) and <code>passage</code> (each passage
			header). Placement is empty by default: a tool appears only where placement puts it and policy
			allows it. The section toolbar renders when <code>show-toolbar</code> is set.
		</p>

		<Diagram
			name="section-tool-placement"
			width={1008}
			height={678}
			alt="Lists in tools.placement for each level feed the section, passage and item toolbars of a layout with show-toolbar set. Item and passage toolbars keep only the tools their content can use, and a tool placed at a level it does not support is a configuration error."
			caption="Placement puts a tool at a level; policy decides whether the learner gets it. Placement is empty by default."
		/>

		<p class="text-lg text-base-content/70 mb-6 max-w-4xl">
			<code class="[overflow-wrap:anywhere]">SECTION_PLAYER_PREFERRED_TOOL_PLACEMENT</code> from
			<code>@pie-players/pie-default-tool-loaders</code> is the opt-in arrangement:
		</p>

		<div class="grid md:grid-cols-3 gap-6 mb-6">
			<div class="card bg-base-100 shadow-lg border border-base-300">
				<div class="card-body">
					<h3 class="card-title text-primary text-lg">section</h3>
					<p class="text-sm">Theme, graph, periodic table, line reader, ruler, protractor and the four dictionaries.</p>
				</div>
			</div>
			<div class="card bg-base-100 shadow-lg border border-base-300">
				<div class="card-body">
					<h3 class="card-title text-primary text-lg">item</h3>
					<p class="text-sm">Calculator, text-to-speech, answer eliminator and annotation toolbar.</p>
				</div>
			</div>
			<div class="card bg-base-100 shadow-lg border border-base-300">
				<div class="card-body">
					<h3 class="card-title text-primary text-lg">passage</h3>
					<p class="text-sm">Text-to-speech and annotation toolbar.</p>
				</div>
			</div>
		</div>

		<p class="text-lg text-base-content/70 mb-4 max-w-4xl">
			Each tool declares the levels it supports. A tool placed at a level it does not support fails
			validation (<code>tools.unsupportedLevel</code>), which throws under the default
			<code>tool-config-strictness</code> of <code>error</code>; the calculator and answer eliminator are
			item-only. The annotation toolbar has no button: placing it enables the selection highlighter at
			that level. Item and passage toolbars drop a tool their content cannot use; the answer eliminator,
			for one, leaves items without a choice interaction.
		</p>
	</section>

	<!-- Tools -->
	<section class="mb-20" id="tools">
		<h2 class="text-3xl font-bold text-secondary mb-6">Tools</h2>
		<p class="text-lg text-base-content/70 mb-6 max-w-4xl">
			<code>createPackagedToolRegistry()</code> from <code>@pie-players/pie-default-tool-loaders</code>
			registers the 15 packaged tools; the section player uses it when the host passes no registry.
		</p>

		<div class="overflow-x-auto mb-8">
			<table class="table table-zebra">
				<thead>
					<tr>
						<th>Tool</th>
						<th>Id</th>
						<th>Placement</th>
						<th>What it does</th>
						<th>Universal profile</th>
					</tr>
				</thead>
				<tbody>
					{#each tools as tool (tool.name)}
						<tr>
							<th class="font-semibold">{tool.name}</th>
							<td>
								<div class="flex flex-col items-start gap-1">
									{#each tool.ids as id (id)}<code>{id}</code>{/each}
								</div>
							</td>
							<td>{tool.placement}</td>
							<td class="min-w-64">{tool.does}</td>
							<td>{tool.universal ? 'Yes' : 'No'}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<div class="grid md:grid-cols-2 gap-6 mb-6">
			<div class="card bg-base-100 shadow-lg border border-base-300">
				<div class="card-body">
					<h3 class="card-title text-primary text-lg">Calculator</h3>
					<p class="text-sm">
						One calculator tool, <code>pie-tool-calculator</code>, with basic, scientific and graphing
						modes over three providers: Desmos (the default; needs an API key and, for production, a
						Desmos Commercial Tier license), GeoGebra (commercial use needs a GeoGebra license) and
						Cortex (MIT, bundled, works offline with no key). The calculator is an item-level tool.
					</p>
				</div>
			</div>
			<div class="card bg-base-100 shadow-lg border border-base-300">
				<div class="card-body">
					<h3 class="card-title text-primary text-lg">Text-to-speech</h3>
					<p class="text-sm">
						Reads item and passage content aloud with synchronized highlighting: sentence-level with
						browser speech, word-level from speech marks with Amazon Polly or Google Cloud Standard and
						WaveNet voices. Server speech needs a host synthesis endpoint, <code>/api/tts</code> by
						default; if the server client fails to load, the toolkit reports a
						<code>provider-init</code> framework error and falls back to browser speech.
					</p>
				</div>
			</div>
		</div>

		<p class="text-lg text-base-content/70 mb-4 max-w-4xl">
			Sign language is its own package, <code>@pie-players/pie-tool-sign-language</code>, which docks a
			signed translation of an item beside its content.
		</p>
		<p class="text-base text-base-content/70 max-w-4xl">
			<ExternalLink href={TOOL_REGISTRY}>Tool registry</ExternalLink> ·
			<ExternalLink href={DEFAULT_TOOL_LOADERS_README}>Default tool loaders README</ExternalLink> ·
			<ExternalLink href={DOCS.toolkitReadme}>Assessment toolkit README</ExternalLink>
		</p>
	</section>

	<!-- Tool policy -->
	<section class="mb-20" id="policy">
		<h2 class="text-3xl font-bold text-secondary mb-6">Tool policy</h2>
		<p class="text-lg text-base-content/70 mb-4 max-w-4xl">
			Tools and accommodations share one registry, one placement model and one lifecycle. The host
			supplies profile, district and test-administration inputs; the toolkit resolves them through its
			precedence order. Which tools a learner gets is program policy. With no profile, placement alone
			decides. <code>createUniversalPersonalNeedsProfile()</code> grants the ten universal packaged
			tools; dictionaries, transcripts and sign language are accommodations a profile or district
			setting grants.
		</p>
		<p class="text-lg text-base-content/70 mb-4 max-w-4xl">
			Tool availability resolves through eight precedence levels, highest first: district block,
			test-administration withdrawal, item restriction, profile prohibition, test-administration grant,
			item requirement, district requirement, profile support. Item restrictions and requirements apply
			to item-level decisions. Supports and prohibitions follow AfA PNP 3.0; the ordering is PIE's.
		</p>

		<Diagram
			name="tool-policy-precedence"
			width={656}
			height={768}
			alt="Eight rungs from district block to PNP support; the first rung that applies decides whether a placed tool is withdrawn or granted, and the result is a ToolPolicyDecision."
		/>

		<p class="text-lg text-base-content/70 max-w-4xl">
			Host gates apply first: a tool whose provider is disabled, that <code>tools.policy.blocked</code>
			lists, or that a <code>tools.policy.allowed</code> list omits is withdrawn before the ladder runs.
			A source added with <code>registerPolicySource</code> can only narrow the result, and
			<code>toolContextResolvers</code> can hide a tool or add parameters without re-enabling one. A grant
			never places a tool.
		</p>
	</section>

	<!-- Item player with the toolkit -->
	<section class="mb-20" id="item-scope">
		<h2 class="text-3xl font-bold text-secondary mb-6">Item players with the toolkit</h2>
		<p class="text-lg text-base-content/70 max-w-4xl">
			<code>&lt;pie-assessment-toolkit&gt;</code> needs no section: around item players, each in a
			<code>&lt;pie-item-scope&gt;</code> with a <code>&lt;pie-item-toolbar&gt;</code>, it provides the
			same tools, policy and services.
			<a href="{base}/docs/integration/#item-player-with-toolkit" class="link link-primary">Item player with toolkit</a>
			shows the pattern.
		</p>
	</section>

	<!-- Theming -->
	<section class="mb-20" id="theming">
		<h2 class="text-3xl font-bold text-secondary mb-6">Theming</h2>
		<p class="text-lg text-base-content/70 mb-4 max-w-4xl">
			<code>&lt;pie-theme&gt;</code> merges four layers, each overwriting the tokens the one before it
			set: the base theme (<code>light</code>, <code>dark</code> or <code>auto</code>), the provider
			adapter output (a DaisyUI adapter is built in), the resolved color scheme and explicit
			<code>variables</code>. The theme tool sets the scheme at runtime.
		</p>
		<p class="text-base text-base-content/70 max-w-4xl">
			<ExternalLink href={DOCS.theming}>How theming works</ExternalLink> ·
			<ExternalLink href={THEME_README}>Theme README</ExternalLink>
		</p>
	</section>

	<!-- Accessibility -->
	<section class="mb-20" id="accessibility">
		<h2 class="text-3xl font-bold text-secondary mb-6">Accessibility</h2>
		<p class="text-lg text-base-content/70 mb-4 max-w-4xl">
			PIE targets WCAG 2.2 AA; the
			<ExternalLink href={WCAG_BASELINE}>WCAG 2.2 AA baseline</ExternalLink> sets interactive targets at
			24 by 24 CSS pixels or larger (2.5.8). Content carries its own alternatives: alternative text in
			the markup, captions and transcripts in the video stimulus element, and transcripts through the
			transcript tool and accessibility catalogs.
		</p>
		<p class="text-base text-base-content/70 max-w-4xl">
			<ExternalLink href={DOCS.accessibility}>Accessibility documentation</ExternalLink>
		</p>
	</section>

	<!-- Navigation -->
	<section class="mb-12">
		<div class="flex flex-col md:flex-row gap-4 justify-between">
			<a href="{base}/docs/players/" class="btn btn-outline btn-secondary">
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
				</svg>
				Players
			</a>
			<a href="{base}/docs/integration/" class="btn btn-primary">
				Integration
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
				</svg>
			</a>
		</div>
	</section>
</div>
