/**
 * The docs pages, grouped and in reading order. The header menu, the docs
 * sidebar, the footer and each page's previous/next links all read this list.
 */

export interface DocsPage {
	/** Path under the site base, with a trailing slash. */
	path: string;
	label: string;
	summary: string;
}

export interface DocsGroup {
	title: string;
	pages: DocsPage[];
}

export const DOCS_NAV: DocsGroup[] = [
	{
		title: 'Start here',
		pages: [
			{
				path: '/docs/',
				label: 'Overview',
				summary: 'What PIE is made of, and where each part is documented.'
			}
		]
	},
	{
		title: 'Content',
		pages: [
			{
				path: '/docs/items-elements/',
				label: 'Items & elements',
				summary: 'Items, element types and the element library.'
			},
			{
				path: '/docs/element-structure/',
				label: 'Element structure',
				summary: 'Delivery and authoring views, the controller and its events.'
			},
			{
				path: '/docs/qti/',
				label: 'QTI & standards',
				summary: 'Bidirectional QTI 2.x and 3.0 transforms and the standards PIE follows.'
			}
		]
	},
	{
		title: 'Delivery',
		pages: [
			{
				path: '/docs/players/',
				label: 'Players',
				summary: 'Item, section, print and reference assessment players.'
			},
			{
				path: '/docs/toolkit/',
				label: 'Assessment toolkit',
				summary: 'Tools, tool placement and policy, and the toolkit coordinator.'
			},
			{
				path: '/docs/timed-media/',
				label: 'Timed media',
				summary: 'Video stimuli whose playback reveals and gates items.'
			},
			{
				path: '/docs/integration/',
				label: 'Integration',
				summary: 'Integration patterns, ownership and the controller API.'
			}
		]
	},
	{
		title: 'Learner experience',
		pages: [
			{
				path: '/docs/accessibility/',
				label: 'Accessibility',
				summary: 'WCAG 2.2 AA, accommodations from a PNP, read-aloud and sign language.'
			},
			{
				path: '/docs/theming/',
				label: 'Theming',
				summary: '<pie-theme>, color schemes and the --pie-* tokens.'
			},
			{
				path: '/docs/localization/',
				label: 'Localization',
				summary: 'Interface locale, content language and in-item language alternates.'
			}
		]
	},
	{
		title: 'Operations',
		pages: [
			{
				path: '/docs/security/',
				label: 'Security & CSP',
				summary: 'Hosted delivery, stripped models and Content Security Policy.'
			},
			{
				path: '/docs/instrumentation/',
				label: 'Instrumentation & debugging',
				summary: 'Instrumentation providers and the debugger panels.'
			}
		]
	}
];

export const DOCS_PAGES: DocsPage[] = DOCS_NAV.flatMap((group) => group.pages);

/** The page for a site path (base already stripped), or undefined. */
export function docsPageFor(sitePath: string): DocsPage | undefined {
	const normalized = sitePath.endsWith('/') ? sitePath : `${sitePath}/`;
	return DOCS_PAGES.find((page) => page.path === normalized);
}

/** The pages before and after a page in reading order. */
export function docsNeighbours(sitePath: string): { prev?: DocsPage; next?: DocsPage } {
	const page = docsPageFor(sitePath);
	if (!page) return {};
	const index = DOCS_PAGES.indexOf(page);
	return { prev: DOCS_PAGES[index - 1], next: DOCS_PAGES[index + 1] };
}
