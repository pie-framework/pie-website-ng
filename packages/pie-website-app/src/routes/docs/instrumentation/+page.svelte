<script lang="ts">
	import CodeEditor from '$lib/components/CodeEditor.svelte';
	import Diagram from '$lib/components/Diagram.svelte';
	import ExternalLink from '$lib/components/ExternalLink.svelte';

	const PP = 'https://github.com/pie-framework/pie-players/blob/develop/';
	const DESIGN = `${PP}docs/architecture/instrumentation-providers.md`;
	const SHARED_README = `${PP}packages/players-shared/README.md`;
	const SECTION_README = `${PP}packages/section-player/README.md#instrumentation`;

	const providerExample = `import {
  CompositeInstrumentationProvider,
  DebugPanelInstrumentationProvider,
  NewRelicInstrumentationProvider,
} from '@pie-players/pie-players-shared';

// Production telemetry plus a copy for the instrumentation debugger panel.
const instrumentationProvider = new CompositeInstrumentationProvider([
  new NewRelicInstrumentationProvider(),
  new DebugPanelInstrumentationProvider(),
]);
await instrumentationProvider.initialize();

sectionPlayer.runtime = {
  player: {
    loaderConfig: { trackPageActions: true, instrumentationProvider },
  },
};`;

	const panelsExample = `<pie-section-player-tools-event-debugger section-id="s1" attempt-id="a1">
</pie-section-player-tools-event-debugger>
<pie-section-player-tools-instrumentation-debugger max-records="250">
</pie-section-player-tools-instrumentation-debugger>

<script type="module">
  import '@pie-players/pie-section-player-tools-event-debugger';
  import '@pie-players/pie-section-player-tools-instrumentation-debugger';

  document.querySelector('pie-section-player-tools-event-debugger').toolkitCoordinator = coordinator;
<\/script>`;

	const resolutionRows = [
		['unset', 'The shared New Relic default when trackPageActions is true; otherwise none'],
		['null', 'None, whatever trackPageActions says'],
		['An object meeting the contract', 'That object'],
		['Anything else', 'None, with a warning in debug mode; no fallback to the default']
	];

	const panels = [
		{
			name: 'Event debugger',
			pkg: '@pie-players/pie-section-player-tools-event-debugger',
			does: 'Live feed of item and section events: session changes, selection, content loads, completion, navigation and errors. Collapses repeats; pause and clear.'
		},
		{
			name: 'Instrumentation debugger',
			pkg: '@pie-players/pie-section-player-tools-instrumentation-debugger',
			does: 'Every event, error, metric, user context and global attribute a DebugPanelInstrumentationProvider sees, as a provider would receive it.'
		},
		{
			name: 'PNP debugger',
			pkg: '@pie-players/pie-section-player-tools-pnp-debugger',
			does: 'The tool policy decision for each tool, with diagnostics. Editable mode changes placement, provider settings, PNP supports and enforcement live.'
		},
		{
			name: 'Session debugger',
			pkg: '@pie-players/pie-section-player-tools-session-debugger',
			does: 'The section session state the controller holds and persists.'
		},
		{
			name: 'TTS settings',
			pkg: '@pie-players/pie-section-player-tools-tts-settings',
			does: 'Pick and preview a read-aloud provider and voice (browser, Polly, Google or your own tabs) and apply it to the running toolkit.'
		},
		{
			name: 'Shared panel chrome',
			pkg: '@pie-players/pie-section-player-tools-shared',
			does: 'The floating panel the others use: drag, resize, minimize, and a layout remembered per persistence-scope.'
		}
	];
</script>

<svelte:head>
	<title>Instrumentation and debugging - PIE Framework</title>
	<meta
		name="description"
		content="Send PIE player and toolkit telemetry to your observability backend through instrumentation providers, and inspect events, policy and sessions with the debugger panels."
	/>
</svelte:head>

<div>
	<div class="mb-12">
		<h1 class="text-4xl sm:text-5xl font-bold text-secondary mb-4">Instrumentation and debugging</h1>
		<p class="text-xl text-base-content/70 max-w-4xl">
			The players and toolkit report what they observe, such as load failures, retries, tool errors and
			lifecycle events, to an instrumentation provider you choose. PIE owns no backend: your page owns
			the agent, credentials, sampling and cost. Product analytics is outside this surface.
		</p>
	</div>

	<section class="mb-20 scroll-mt-24" id="providers">
		<h2 class="text-3xl font-bold text-secondary mb-6">Providers</h2>

		<Diagram
			name="instrumentation-flow"
			width={1028}
			height={498}
			alt="Three event streams, toolkit telemetry, bridged public events and loader resource events, flow from the players and toolkit into the one provider each player resolves from loaderConfig. A composite provider fans out to New Relic, console, a debug-panel provider feeding the instrumentation debugger, or a host-built adapter for any other backend."
		/>

		<div class="grid md:grid-cols-2 gap-6 mb-8">
			<div class="card bg-base-100 shadow-lg border border-base-300">
				<div class="card-body">
					<h3 class="card-title text-primary">The contract</h3>
					<p class="text-sm">
						An <code>InstrumentationProvider</code> implements <code>trackError</code>,
						<code>trackEvent</code>, <code>trackMetric</code>, <code>setUserContext</code> and
						<code>setGlobalAttributes</code>, plus <code>initialize</code>, <code>isReady</code> and
						<code>destroy</code>. Extend <code>BaseInstrumentationProvider</code> to write an adapter for
						any backend.
					</p>
				</div>
			</div>
			<div class="card bg-base-100 shadow-lg border border-base-300">
				<div class="card-body">
					<h3 class="card-title text-primary">Shipped adapters</h3>
					<p class="text-sm">
						New Relic, console, debug panel and composite, which fans out to several. Adapters read the
						vendor handle already on the page and import no vendor SDK; a provider sends only while
						<code>isReady()</code> is true, so events start flowing when the agent arrives. Datadog and
						OpenTelemetry adapters are yours to write.
					</p>
				</div>
			</div>
		</div>

		<CodeEditor value={providerExample} language="javascript" readonly={true} height="380px" />
	</section>

	<section class="mb-20 scroll-mt-24" id="resolution">
		<h2 class="text-3xl font-bold text-secondary mb-6">Provider resolution</h2>
		<p class="text-lg text-base-content/70 mb-4 max-w-4xl">
			Each player reads <code>instrumentationProvider</code> and <code>trackPageActions</code> from its
			<code>loaderConfig</code>: section players from <code>runtime.player.loaderConfig</code>, the item
			player from its own <code>loader-config</code>, the toolkit from the item-player configuration it
			is given. <code>trackPageActions</code> defaults to <code>false</code>, so nothing is sent unless
			you opt in.
		</p>
		<div class="overflow-x-auto">
			<table class="table table-zebra">
				<thead><tr><th><code>instrumentationProvider</code></th><th>Resolves to</th></tr></thead>
				<tbody>
					{#each resolutionRows as [value, result] (value)}
						<tr><td><code>{value}</code></td><td>{result}</td></tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>

	<section class="mb-20 scroll-mt-24" id="events">
		<h2 class="text-3xl font-bold text-secondary mb-6">What is reported</h2>
		<div class="overflow-x-auto mb-4">
			<table class="table table-zebra">
				<thead><tr><th>Stream</th><th>Events</th><th>Notes</th></tr></thead>
				<tbody>
					<tr>
						<td class="font-semibold">Toolkit telemetry</td>
						<td>
							<code>pie-toolkit-*</code>, tool initialization, backend calls, library loads, operations and
							playback
						</td>
						<td>
							Tagged <code>instrumentationLayer: "toolkit"</code> with assessment, section and attempt ids.
							Error events also go to <code>trackError</code>.
						</td>
					</tr>
					<tr>
						<td class="font-semibold">Public events</td>
						<td>
							<code>pie-toolkit-*</code>, <code>pie-section-*</code>, <code>pie-item-*</code>,
							<code>pie-assessment-*</code>
						</td>
						<td>
							Mirrors of the players' DOM events. Learner responses are not forwarded; item runtime errors
							go to <code>trackError</code>.
						</td>
					</tr>
					<tr>
						<td class="font-semibold">Loader and resources</td>
						<td>
							<code>pie-resource-load</code>, <code>-retry</code>, <code>-load-error</code>, bundle retries,
							shared-dependency and MathJax version conflicts
						</td>
						<td>Only with <code>trackPageActions: true</code>.</td>
					</tr>
				</tbody>
			</table>
		</div>
		<p class="text-base text-base-content/70 max-w-4xl">
			Metrics are sent as events with a <code>metric:</code> prefix. Attribute names are not yet
			centrally namespaced, and nothing is buffered before a provider is ready.
		</p>
	</section>

	<section class="mb-20 scroll-mt-24" id="debugger-panels">
		<h2 class="text-3xl font-bold text-secondary mb-6">Debugger panels</h2>
		<p class="text-lg text-base-content/70 mb-6 max-w-4xl">
			Six published packages give a section player integration floating inspection panels. They are
			development aids for your own test pages; keep them out of learner delivery. Every panel except the
			instrumentation debugger reads the <code>ToolkitCoordinator</code> you set as its
			<code>toolkitCoordinator</code> property, and every panel dispatches <code>close</code>.
		</p>
		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
			{#each panels as panel (panel.pkg)}
				<div class="card bg-base-100 shadow-lg border border-base-300">
					<div class="card-body">
						<h3 class="card-title text-primary">{panel.name}</h3>
						<p class="text-sm">{panel.does}</p>
						<code class="text-xs break-all text-base-content/60">{panel.pkg}</code>
					</div>
				</div>
			{/each}
		</div>
		<CodeEditor value={panelsExample} language="html" readonly={true} height="250px" />
		<p class="text-base text-base-content/70 mt-4 max-w-4xl">
			The instrumentation debugger shows only what reaches a <code>DebugPanelInstrumentationProvider</code>,
			so run one beside your production provider in a composite, as above. Set
			<code>persistence-scope</code> to keep each panel's position and size across reloads.
		</p>
	</section>

	<section class="mb-20 scroll-mt-24" id="reference">
		<h2 class="text-3xl font-bold text-secondary mb-6">Reference</h2>
		<p class="text-base text-base-content/70 max-w-4xl">
			<ExternalLink href={DESIGN}>Instrumentation providers design</ExternalLink> ·
			<ExternalLink href={SECTION_README}>Section player instrumentation</ExternalLink> ·
			<ExternalLink href={SHARED_README}>players-shared README</ExternalLink>
		</p>
	</section>
</div>
