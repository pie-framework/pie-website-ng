// Code shown on /docs/theming/. Kept out of the page because Vite's dependency
// scan reads import lines in a Svelte script as imports, even inside strings.

export const setupExample = `<script type="module">
  import '@pie-players/pie-theme';
</script>

<pie-theme theme="auto" scope="document" scheme="default">
  <pie-section-player-splitpane></pie-section-player-splitpane>
</pie-theme>`;

export const schemeExample = `import { registerPieColorSchemes } from '@pie-players/pie-theme';

const registration = registerPieColorSchemes([
  {
    id: 'district-high-contrast',
    name: 'District High Contrast',
    description: 'District accessibility palette',
    variables: {
      '--pie-background': '#000000',
      '--pie-text': '#ffffff',
      '--pie-primary': '#00ffff',
    },
  },
]);
// <pie-theme scheme="district-high-contrast"> now resolves it.
// registration.unregister() removes only this registration.`;

export const aliasExample = `/* Host stylesheet: let your own chrome follow an active accommodation. */
[data-color-scheme] {
  --color-base-100: var(--pie-background);
  --color-base-content: var(--pie-text);
  --color-primary: var(--pie-primary);
}`;
