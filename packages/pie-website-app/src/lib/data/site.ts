import { PARTNERS } from './partners';

/**
 * Reader-facing destinations. Titles, summaries, navigation and search share
 * this registry; repository names appear only in source/reference metadata.
 */
export type Area = 'integrate' | 'build' | 'docs';
export type DemoKind = 'section' | 'item' | 'authoring' | 'tools' | 'standalone' | 'formative' | 'persistence' | 'timed-media' | 'theme';
export interface SourceDocument {
	repo: 'pie-players' | 'pie-elements-ng';
	file: string;
	section?: string;
}
export interface SitePage {
	path: string;
	label: string;
	summary: string;
	area?: Area;
	group?: string;
	source?: SourceDocument;
	demo?: DemoKind;
	keywords?: string[];
}

const playerSource = (file: string, section?: string): SourceDocument => ({ repo: 'pie-players', file, section });
const elementSource = (file: string, section?: string): SourceDocument => ({ repo: 'pie-elements-ng', file, section });

export const INTEGRATE_PAGES: SitePage[] = [
	{ path: '/integrate/item-player/', label: 'Embed an item', summary: 'Display a question and collect the response.', area: 'integrate', source: playerSource('docs/getting-started.md'), demo: 'item', keywords: ['question', 'quick start', 'gather', 'evaluate'] },
	{ path: '/integrate/section-player/', label: 'Deliver a section', summary: 'Display passages and questions with layouts and learner tools.', area: 'integrate', source: playerSource('docs/getting-started-section.md'), demo: 'section' },
	{ path: '/integrate/toolkit/', label: 'Assessment toolkit', summary: 'Add learner tools and apply accommodation policies.', area: 'integrate', demo: 'standalone', keywords: ['accommodations', 'coordinator', 'standalone item'] },
	{ path: '/integrate/assessment-shell/', label: 'Assessment integration', summary: 'Connect sections to navigation, timing, storage and submission.', area: 'integrate', source: playerSource('docs/assessment-player/integration-guide.md') },
	{ path: '/integrate/authoring/', label: 'Embed authoring', summary: 'Add visual item editors and preview to a CMS.', area: 'integrate', demo: 'authoring', keywords: ['editor', 'item bank', 'WYSIWYG'] },
	{ path: '/integrate/formative/', label: 'Practice and feedback', summary: 'Let learners check answers, see feedback and retry.', area: 'integrate', source: playerSource('docs/section-player/formative-delivery.md'), demo: 'formative' },
	{ path: '/integrate/timed-media/', label: 'Video with questions', summary: 'Show questions during a video and pause for answers.', area: 'integrate', source: playerSource('packages/section-player/README.md', 'Timed media'), demo: 'timed-media' },
	{ path: '/integrate/print/', label: 'Print and answer keys', summary: 'Create worksheets and answer keys for elements with print views.', area: 'integrate', source: playerSource('packages/print-player/README.md') },
	{ path: '/integrate/item-summaries/', label: 'Item-bank summaries', summary: 'Show lightweight item previews in lists and search results.', area: 'integrate', source: playerSource('packages/item-list/README.md'), keywords: ['CMS', 'search', 'preview', 'list'] },
	{ path: '/integrate/extending/', label: 'Extend tools and providers', summary: 'Add a tool, toolbar action or service provider.', area: 'integrate', source: playerSource('packages/assessment-toolkit/docs/TOOL_REGISTRY.md', 'Creating Custom Tools') }
];

export const BUILD_PAGES: SitePage[] = [
	{ path: '/build/how-elements-work/', label: 'How elements work', summary: 'Models, responses, controllers and views.', area: 'build', source: elementSource('docs/PIE_ELEMENT_CONTRACT.md', 'JavaScript Runtime Contract') },
	{ path: '/build/first-element/', label: 'Your first interaction', summary: 'Define the data, scoring, delivery and editor for a new question type.', area: 'build', keywords: ['new element', 'custom question', 'React', 'Svelte'] },
	{ path: '/build/test-and-distribute/', label: 'Test and distribute', summary: 'Test an element and package it for the players.', area: 'build' }
];

const GUIDE_DEFINITIONS: SitePage[] = [
	{ path: '/docs/loading/', label: 'Install and load PIE', summary: 'Load elements from a bundle host, as browser ESM, or from your own build.', group: 'Delivery and integration', source: playerSource('docs/item-player/loading-strategies.md') },
	{ path: '/docs/content-and-schemas/', label: 'Items, elements and schemas', summary: 'Validate models, editor settings and response data with JSON Schemas.', group: 'Delivery and integration', source: elementSource('docs/ELEMENT_SCHEMAS.md') },
	{ path: '/docs/sessions/', label: 'Save and resume', summary: 'Save responses and restore an attempt.', group: 'Delivery and integration', demo: 'persistence', keywords: ['autosave', 'restore', 'storage', 'answers'] },
	{ path: '/docs/scoring/', label: 'Scoring and rubrics', summary: 'Score responses in the browser or on a server, with partial credit and rubrics.', group: 'Delivery and integration', source: playerSource('docs/item-player/scoring-and-rubrics.md') },
	{ path: '/docs/backend/', label: 'Backend integration', summary: 'Connect content, response storage and scoring to a server.', group: 'Delivery and integration', source: playerSource('docs/item-player/backend-support.md') },
	{ path: '/docs/custom-layouts/', label: 'Custom section layouts', summary: 'Build a layout using the standard item and passage panes.', group: 'Delivery and integration', source: playerSource('docs/section-player/custom-layouts.md') },
	{ path: '/docs/lti/', label: 'Launch from an LTI host', summary: 'Connect an LMS launch to the players and grade passback.', group: 'Delivery and integration', source: playerSource('docs/integrations/lti.md') },
	{ path: '/docs/tools/', label: 'Tools catalog', summary: 'Reading aids, calculators, annotation and reference tools.', group: 'Tools and learner supports', keywords: ['ruler', 'protractor', 'dictionary', 'magnifier', 'calculator'] },
	{ path: '/docs/tool-policy/', label: 'Tool placement and profiles', summary: 'Control which tools are available to each learner.', group: 'Tools and learner supports', source: playerSource('packages/assessment-toolkit/docs/PNP_CONFIGURATION.md'), keywords: ['PNP', 'accommodations', 'AfA'] },
	{ path: '/docs/providers/', label: 'Tool and calculator providers', summary: 'Load tools and configure Desmos, GeoGebra or Cortex.', group: 'Tools and learner supports', source: playerSource('packages/default-tool-loaders/README.md') },
	{ path: '/docs/read-aloud/', label: 'Read-aloud', summary: 'Configure speech, recordings and synchronized text highlights.', group: 'Tools and learner supports', source: playerSource('docs/accessibility/tts-deep-dive.md'), keywords: ['TTS', 'speech', 'SSML', 'audio'] },
	{ path: '/docs/accessibility-catalogs/', label: 'Accessible content alternatives', summary: 'Add spoken alternatives, transcripts and signed video to content.', group: 'Tools and learner supports', source: playerSource('docs/accessibility/accessibility-catalogs-integration-guide.md') },
	{ path: '/docs/accessibility/', label: 'Accessibility and evidence', summary: 'Learner supports, WCAG testing and known issues.', group: 'Experience and operations' },
	{ path: '/docs/theming/', label: 'Themes and branding', summary: 'Set colors, fonts and learner color schemes.', group: 'Experience and operations' },
	{ path: '/docs/localization/', label: 'Localization', summary: 'Set interface and content languages.', group: 'Experience and operations' },
	{ path: '/docs/math/', label: 'Math rendering', summary: 'Configure MathJax and accessible math for each loading option.', group: 'Experience and operations', source: playerSource('docs/item-player/math-rendering.md') },
	{ path: '/docs/security/', label: 'Secure delivery and CSP', summary: 'Protect answer keys, score on a server and configure CSP.', group: 'Experience and operations' },
	{ path: '/docs/instrumentation/', label: 'Instrumentation and debugging', summary: 'Inspect events and errors, and connect a telemetry provider.', group: 'Experience and operations' },
	{ path: '/docs/troubleshooting/', label: 'Troubleshooting', summary: 'Diagnose loading, tool, response, speech and styling problems.', group: 'Experience and operations' },
	{ path: '/docs/migration/', label: 'Migrate legacy players', summary: 'Move from pie-player-components to the unified item player.', group: 'Reference and upgrades', source: playerSource('docs/item-player/migration-from-pie-player-components.md') },
	{ path: '/docs/versioning/', label: 'Versions and upgrades', summary: 'Pin compatible player and element versions, and plan upgrades.', group: 'Reference and upgrades', source: playerSource('docs/install/versioning.md') },
	{ path: '/docs/reference/', label: 'Packages and entry points', summary: 'Package imports for browsers, bundlers and servers.', group: 'Reference and upgrades', source: playerSource('docs/install/packages.md') },
	{ path: '/docs/reference/item-player/', label: 'Item player API', summary: 'Attributes, properties, methods, events, authoring and backend contracts.', group: 'Reference and upgrades', source: playerSource('packages/item-player/README.md') },
	{ path: '/docs/reference/section-player/', label: 'Section player API', summary: 'Layout inputs, controller methods, session lifecycle and readiness events.', group: 'Reference and upgrades', source: playerSource('packages/section-player/README.md') },
	{ path: '/docs/reference/toolkit/', label: 'Toolkit API', summary: 'Coordinator, services, item scopes and tool state.', group: 'Reference and upgrades', source: playerSource('packages/assessment-toolkit/README.md') },
	{ path: '/docs/reference/tool-registry/', label: 'Tool registry API', summary: 'Register tools, content surfaces, activation models and host actions.', group: 'Reference and upgrades', source: playerSource('packages/assessment-toolkit/docs/TOOL_REGISTRY.md') },
	{ path: '/docs/reference/element-contract/', label: 'Element package contract', summary: 'Requirements for element data, views, events and packaging.', group: 'Reference and upgrades', source: elementSource('docs/PIE_ELEMENT_CONTRACT.md') }
];
export const GUIDE_PAGES: SitePage[] = GUIDE_DEFINITIONS.map((page) => ({ ...page, area: 'docs' as const }));

export const PRIMARY_NAV = [
	{ path: '/integrate/', label: 'Integrate PIE', summary: 'Add players, tools and editors to an application.' },
	{ path: '/build/', label: 'Build interactions', summary: 'Create or extend a question type.' },
	{ path: '/explore/', label: 'Explore', summary: 'Try the players, tools and editors.' },
	{ path: '/docs/', label: 'Docs', summary: 'Guides, API reference and troubleshooting.' }
];

export const HUB_PAGES: SitePage[] = [
	...PRIMARY_NAV,
	{ path: '/get-started/', label: 'Get started', summary: 'Choose an integration or element development guide.' },
	{ path: '/elements/', label: 'Element library', summary: 'Questions, content and rubrics, with examples and supported views.' },
	{ path: '/qti/', label: 'QTI and PIE', summary: 'Independent QTI players and optional conversion between QTI and PIE.' },
	{ path: '/status/', label: 'Project status', summary: 'Release policy, test coverage and known limitations.' },
	{ path: '/about/', label: 'About and community', summary: 'Why PIE, its sponsors and partners, and how to contribute.', keywords: PARTNERS.map((partner) => partner.name) }
];

export const SITE_PAGES = [...HUB_PAGES, ...INTEGRATE_PAGES, ...BUILD_PAGES, ...GUIDE_PAGES];
export function sitePageFor(path: string) {
	const normalized = path.replace(/\/+$/, '') + '/';
	return SITE_PAGES.find((entry) => entry.path === normalized);
}

export function sourceUrl(source: SourceDocument) {
	return 'https://github.com/pie-framework/' + source.repo + '/blob/develop/' + source.file;
}
