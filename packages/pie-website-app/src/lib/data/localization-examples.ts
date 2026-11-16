// Code shown on /docs/localization/. Kept out of the page because Vite's dependency
// scan reads import lines in a Svelte script as imports, even inside strings.

export const localeExample = `<pie-item-player locale="nl-NL"></pie-item-player>
<pie-section-player-splitpane locale="nl-NL"></pie-section-player-splitpane>
<pie-assessment-toolkit locale="nl-NL" content-language="en-US">…</pie-assessment-toolkit>`;

export const generatedExample = `import {
  BUNDLED_LOCALES,
  createPieI18n,
  loadBundledCatalog,
} from '@pie-players/pie-players-shared/i18n';
import { GENERATED_LOCALES, loadGeneratedCatalog } from '@pie-players/pie-i18n-generated';

const i18n = createPieI18n({
  availableLocales: [...BUNDLED_LOCALES, ...GENERATED_LOCALES],
  // Bundled first, so a reviewed catalog wins over a generated one for the same tag.
  loadCatalog: (locale) => loadBundledCatalog(locale).catch(() => loadGeneratedCatalog(locale)),
});

// The locale attribute still names the locale; the provider only supplies catalogs.
document.querySelector('pie-section-player-splitpane').runtime = { i18n };`;

export const customExample = `import { createPieI18n } from '@pie-players/pie-players-shared/i18n';

// A locale PIE ships no catalog for is honored; missing keys fall back to English.
const i18n = createPieI18n({
  locale: 'de-DE',
  customMessages: { 'de-DE': { common: { close: 'Schließen' } } },
});`;
