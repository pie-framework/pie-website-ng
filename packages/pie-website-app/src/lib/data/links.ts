/**
 * External links used across the site. pie-players documentation is linked on
 * GitHub (`develop`); pie-qti's default branch is `master`.
 */

const PIE_PLAYERS = 'https://github.com/pie-framework/pie-players/blob/develop/';
const PIE_ELEMENTS_NG = 'https://github.com/pie-framework/pie-elements-ng/blob/develop/';

export const DOCS = {
	gettingStarted: `${PIE_PLAYERS}docs/getting-started.md`,
	architecture: `${PIE_PLAYERS}docs/architecture/architecture.md`,
	itemPlayerOverview: `${PIE_PLAYERS}docs/item-player/overview.md`,
	itemPlayerReadme: `${PIE_PLAYERS}packages/item-player/README.md`,
	loadingStrategies: `${PIE_PLAYERS}docs/item-player/loading-strategies.md`,
	migration: `${PIE_PLAYERS}docs/item-player/migration-from-pie-player-components.md`,
	sectionPlayerGuide: `${PIE_PLAYERS}docs/section-player/integration-guide.md`,
	toolkitReadme: `${PIE_PLAYERS}packages/assessment-toolkit/README.md`,
	security: `${PIE_PLAYERS}docs/security/readme.md`,
	accessibility: `${PIE_PLAYERS}docs/accessibility/README.md`,
	theming: `${PIE_PLAYERS}docs/theming/how-theming-works.md`,
	lti: `${PIE_PLAYERS}docs/integrations/lti.md`,
	elementContract: `${PIE_ELEMENTS_NG}docs/PIE_ELEMENT_CONTRACT.md`,
	qtiStatus: 'https://github.com/pie-framework/pie-qti/blob/master/STATUS.md'
} as const;

export const SITES = {
	elementsDemo: 'https://elements.pie-framework.org/',
	qti: 'https://qti.pie-framework.org/',
	qtiExamples: 'https://qti.pie-framework.org/examples/',
	githubOrg: 'https://github.com/pie-framework',
	slack: 'https://pieframework.slack.com'
} as const;

/** An element's page in the live sample library, which lists its demos and opens each view. */
export function elementSamplesUrl(name: string): string {
	return SITES.elementsDemo + name;
}

export const REPOS = {
	piePlayers: 'https://github.com/pie-framework/pie-players',
	pieElementsNg: 'https://github.com/pie-framework/pie-elements-ng',
	pieQti: 'https://github.com/pie-framework/pie-qti'
} as const;

/** The pie-players and element guides linked from the navigation and footer. */
export const DEVELOPER_GUIDES = [
	{ label: 'Getting started', href: DOCS.gettingStarted },
	{ label: 'Architecture', href: DOCS.architecture },
	{ label: 'Security', href: DOCS.security },
	{ label: 'Element contract', href: DOCS.elementContract },
	{ label: 'Migration guide', href: DOCS.migration }
] as const;
