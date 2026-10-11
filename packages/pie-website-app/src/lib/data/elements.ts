/**
 * The PIE element catalog: the single source for every element count, list and
 * grid on the site. Mirrors the published @pie-element/* packages from
 * pie-elements-ng (versions are npm `latest` on 2026-10-10). Update this table
 * when an element is added, removed or released; the pages derive from it.
 */

export type ElementGroup =
	| 'Choice and text'
	| 'Math'
	| 'Matching and ordering'
	| 'Graphs and images'
	| 'Content and scoring';

export type ElementFramework = 'React' | 'Svelte';

export interface ElementViews {
	/** Delivery view: the `<tag>` custom element students and instructors see. */
	delivery: boolean;
	/** Authoring view: the `<tag>-config` custom element. */
	authoring: boolean;
	/** Print view, rendered by `<pie-print>`. */
	print: boolean;
	/** Controller module: `model()`, `outcome()` and friends. */
	controller: boolean;
}

export interface PieElementInfo {
	/** Element name, also the tag hosts use in item markup. */
	name: string;
	displayName: string;
	/** npm package name. */
	package: string;
	group: ElementGroup;
	framework: ElementFramework;
	/** Exact published version. */
	version: string;
	views: ElementViews;
	/** Question types take a response; content and rubric elements do not. */
	kind: 'question' | 'content' | 'rubric';
}

export const ELEMENT_GROUPS: readonly ElementGroup[] = [
	'Choice and text',
	'Math',
	'Matching and ordering',
	'Graphs and images',
	'Content and scoring'
];

type Row = [
	name: string,
	displayName: string,
	group: ElementGroup,
	framework: ElementFramework,
	version: string,
	views: string,
	kind?: PieElementInfo['kind']
];

// views: D = delivery, A = authoring, P = print, C = controller
const ROWS: Row[] = [
	['multiple-choice', 'Multiple Choice', 'Choice and text', 'React', '14.0.3', 'DAPC'],
	['ebsr', 'EBSR', 'Choice and text', 'React', '15.0.3', 'DAPC'],
	['inline-dropdown', 'Inline Dropdown', 'Choice and text', 'React', '11.0.3', 'DAC'],
	['mc-populated-blank', 'MC Populated Blank', 'Choice and text', 'Svelte', '0.3.3', 'DAPC'],
	['select-text', 'Select Text', 'Choice and text', 'React', '14.0.3', 'DAPC'],
	['likert', 'Likert', 'Choice and text', 'React', '5.0.3', 'DAC'],
	['matrix', 'Matrix', 'Choice and text', 'React', '5.0.3', 'DAC'],
	[
		'explicit-constructed-response',
		'Explicit Constructed Response',
		'Choice and text',
		'React',
		'12.0.3',
		'DAPC'
	],
	['simple-cloze', 'Simple Cloze', 'Choice and text', 'Svelte', '0.1.7', 'DAPC'],
	['extended-text-entry', 'Extended Text Entry', 'Choice and text', 'React', '16.0.3', 'DAPC'],

	['math-inline', 'Math Inline', 'Math', 'React', '13.0.3', 'DAPC'],
	['math-templated', 'Math Templated', 'Math', 'React', '8.0.3', 'DAPC'],
	['fraction-model', 'Fraction Model', 'Math', 'React', '7.0.3', 'DAC'],

	['match', 'Match', 'Matching and ordering', 'React', '13.0.3', 'DAC'],
	['match-list', 'Match List', 'Matching and ordering', 'React', '8.0.3', 'DC'],
	['categorize', 'Categorize', 'Matching and ordering', 'React', '14.0.3', 'DAC'],
	['placement-ordering', 'Placement Ordering', 'Matching and ordering', 'React', '15.0.3', 'DAC'],
	['drag-in-the-blank', 'Drag In The Blank', 'Matching and ordering', 'React', '11.0.3', 'DAC'],
	[
		'image-cloze-association',
		'Image Cloze Association',
		'Matching and ordering',
		'React',
		'11.0.3',
		'DAC'
	],
	['venn-classification', 'Venn Classification', 'Matching and ordering', 'Svelte', '0.1.4', 'DAC'],

	['graphing', 'Graphing', 'Graphs and images', 'React', '11.0.3', 'DAC'],
	['graphing-solution-set', 'Graphing Solution Set', 'Graphs and images', 'React', '7.0.3', 'DAC'],
	['number-line', 'Number Line', 'Graphs and images', 'React', '14.0.3', 'DAC'],
	['charting', 'Charting', 'Graphs and images', 'React', '13.0.3', 'DAC'],
	['hotspot', 'Hotspot', 'Graphs and images', 'React', '12.0.3', 'DAC'],
	['drawing-response', 'Drawing Response', 'Graphs and images', 'React', '13.0.3', 'DAC'],

	['passage', 'Passage', 'Content and scoring', 'React', '8.0.3', 'DAPC', 'content'],
	['video-stimulus', 'Video Stimulus', 'Content and scoring', 'Svelte', '0.1.2', 'DAC', 'content'],
	['rubric', 'Rubric', 'Content and scoring', 'React', '9.0.3', 'DAPC', 'rubric'],
	['complex-rubric', 'Complex Rubric', 'Content and scoring', 'React', '8.0.3', 'DAPC', 'rubric'],
	[
		'multi-trait-rubric',
		'Multi Trait Rubric',
		'Content and scoring',
		'React',
		'9.0.3',
		'DAC',
		'rubric'
	]
];

export const ELEMENTS: readonly PieElementInfo[] = ROWS.map(
	([name, displayName, group, framework, version, views, kind = 'question']) => ({
		name,
		displayName,
		package: `@pie-element/${name}`,
		group,
		framework,
		version,
		views: {
			delivery: views.includes('D'),
			authoring: views.includes('A'),
			print: views.includes('P'),
			controller: views.includes('C')
		},
		kind
	})
);

export const ELEMENT_COUNT = ELEMENTS.length;
export const QUESTION_TYPE_COUNT = ELEMENTS.filter((e) => e.kind === 'question').length;
export const AUTHORING_COUNT = ELEMENTS.filter((e) => e.views.authoring).length;
export const PRINT_ELEMENTS = ELEMENTS.filter((e) => e.views.print);
export const PRINT_COUNT = PRINT_ELEMENTS.length;
/** Elements that ship no authoring view (match-list). */
export const ELEMENTS_WITHOUT_AUTHORING = ELEMENTS.filter((e) => !e.views.authoring);

export function elementsByGroup(): { group: ElementGroup; elements: PieElementInfo[] }[] {
	return ELEMENT_GROUPS.map((group) => ({
		group,
		elements: ELEMENTS.filter((e) => e.group === group)
	}));
}

/** Anchor id of a group's section on /docs/items-elements/. */
export function groupAnchor(group: ElementGroup): string {
	return `group-${group.toLowerCase().replace(/[^a-z]+/g, '-')}`;
}

export function findElement(name: string): PieElementInfo {
	const found = ELEMENTS.find((e) => e.name === name);
	if (!found) throw new Error(`Unknown PIE element: ${name}`);
	return found;
}

export const RUBRIC_COUNT = ELEMENTS.filter((e) => e.kind === 'rubric').length;

const SMALL_NUMBERS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

/**
 * "31 element types: 26 question types plus passages, video stimulus and three
 * rubric elements." Derived so it cannot drift from the table.
 */
export const ELEMENT_COUNT_SENTENCE = `${ELEMENT_COUNT} element types: ${QUESTION_TYPE_COUNT} question types plus passages, video stimulus and ${
	SMALL_NUMBERS[RUBRIC_COUNT] ?? RUBRIC_COUNT
} rubric elements.`;
