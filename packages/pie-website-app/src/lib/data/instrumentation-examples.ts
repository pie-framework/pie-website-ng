// Code shown on /docs/instrumentation/. Kept out of the page because Vite's dependency
// scan reads import lines in a Svelte script as imports, even inside strings.

export const providerExample = `import {
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

export const panelsExample = `<pie-section-player-tools-event-debugger section-id="s1" attempt-id="a1">
</pie-section-player-tools-event-debugger>
<pie-section-player-tools-instrumentation-debugger max-records="250">
</pie-section-player-tools-instrumentation-debugger>

<script type="module">
  import '@pie-players/pie-section-player-tools-event-debugger';
  import '@pie-players/pie-section-player-tools-instrumentation-debugger';

  document.querySelector('pie-section-player-tools-event-debugger').toolkitCoordinator = coordinator;
</script>`;
