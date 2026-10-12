/**
 * Screenshots of every element, captured from the elements demo
 * (https://elements.pie-framework.org/) at the versions in elements.ts. Files
 * live in static/images/elements/. `deliveryCapture()` throws for an element
 * without a capture, so a new element in elements.ts fails the build until it
 * has one.
 */

export interface ElementCapture {
	/** File name under static/images/elements/. */
	file: string;
	alt: string;
	caption: string;
	width: number;
	height: number;
}

/** One delivery-view capture per element, keyed by element name. */
const DELIVERY_CAPTURES: Record<string, ElementCapture> = {
	'multiple-choice': {
		file: 'multiple-choice-deliver.webp',
		alt: 'A multiple-select question with the prompt "Biology Question: Select all true statements about cellular processes." and four checkbox options, A to D, about photosynthesis, mitochondria, cellular respiration and chloroplasts.',
		caption: 'Choose one or more answers from a list.',
		width: 800,
		height: 271
	},
	ebsr: {
		file: 'ebsr-deliver.webp',
		alt: 'A two-part question: Part A asks "What color is the sky?" with three options, and Part B asks "What color do you get when you mix Red with your answer in Part 1?" with four options, all with checkboxes.',
		caption: 'Answer two linked questions, Part A and Part B.',
		width: 800,
		height: 518
	},
	'inline-dropdown': {
		file: 'inline-dropdown-deliver.webp',
		alt: 'The prompt "Use the dropdowns to complete the sentence" above the sentence "The ___ jumped ___ the ___", with an empty dropdown menu in each gap.',
		caption: 'Complete a sentence by choosing from dropdown menus.',
		width: 800,
		height: 96
	},
	'mc-populated-blank': {
		file: 'mc-populated-blank-deliver.webp',
		alt: 'A short passage titled "The Dog" ("The brown dog ran to the park. I gave it a stick. The dog sat down.") above the question "Pick a word that describes the dog." with a blank line and three radio-button choices: brown, ran and gave.',
		caption: 'Fill a sentence blank by picking a choice.',
		width: 800,
		height: 259
	},
	'select-text': {
		file: 'select-text-deliver.webp',
		alt: 'The question "What sentences contain the character 6 in them?" above four sentences about two people cutting out stars, each outlined as a selectable token.',
		caption: 'Select the sentences that answer the question.',
		width: 800,
		height: 96
	},
	likert: {
		file: 'likert-deliver.webp',
		alt: 'The question "How likely are you to report a problem?" with three radio buttons labelled Disagree, Unsure and Agree.',
		caption: 'Rate a statement on an agreement scale.',
		width: 800,
		height: 100
	},
	matrix: {
		file: 'matrix-deliver.webp',
		alt: 'The question "How interested are you in the following domains?" with a grid of radio buttons rating "I\'m interested in politics." and "I\'m interested in economics." as Disagree, Unsure or Agree.',
		caption: 'Rate each row on a shared scale.',
		width: 800,
		height: 163
	},
	'explicit-constructed-response': {
		file: 'explicit-constructed-response-deliver.webp',
		alt: 'The prompt "Complete the sentence" above the sentence "The ___ jumped ___ the ___" with an empty text box in each gap.',
		caption: 'Type short answers into blanks within a sentence.',
		width: 800,
		height: 96
	},
	'simple-cloze': {
		file: 'simple-cloze-deliver.webp',
		alt: 'The heading "Enter your answer:" and the question "What is 2 + 2?" above an empty text field with the placeholder "Enter your answer...".',
		caption: 'Type a short answer to a question.',
		width: 800,
		height: 135
	},
	'extended-text-entry': {
		file: 'extended-text-entry-deliver.webp',
		alt: 'The placeholder prompt "This is the question prompt" above an empty grey response editor.',
		caption: 'Write an extended response in a rich-text editor.',
		width: 800,
		height: 141
	},
	'math-inline': {
		file: 'math-inline-deliver.webp',
		alt: 'The prompt "B. Find the value of the expression that you wrote in part A to find how much money the band members made. Use the on-screen keyboard to type your answer in the box below." above an empty math answer box after a dollar sign.',
		caption: 'Enter a math answer with an on-screen keypad.',
		width: 800,
		height: 100
	},
	'math-templated': {
		file: 'math-templated-deliver.webp',
		alt: 'A word problem in which 24 students, choosing between Store A and Store B, each buy 2 binders and 5 notebooks with $420 to spend, followed by the questions "If the unit price of a notebook in Store A is $1.50, what is the unit price of a binder?" and "If the unit price of a binder in Store B is $2.80, what is the unit price of a notebook?", each with an empty answer box after a dollar sign.',
		caption: 'Type math answers into blanks in a template.',
		width: 800,
		height: 126
	},
	'fraction-model': {
		file: 'fraction-model-deliver.webp',
		alt: 'The title "Representing Improper Fractions" with the prompt "Shade the pie models to represent 7/4 (seven fourths)." and the hint "This is more than one whole!" above two unshaded circles, each divided into four numbered parts.',
		caption: 'Shade parts of a model to show a fraction.',
		width: 800,
		height: 256
	},
	match: {
		file: 'match-deliver.webp',
		alt: 'The prompt "Select correct answers." above a grid with placeholder rows "Question Text 1" to "Question Text 4" and a radio button under "Column 2" and "Column 3" in each row.',
		caption: 'Mark the correct column for each row.',
		width: 800,
		height: 291
	},
	'match-list': {
		file: 'match-list-deliver.webp',
		alt: 'The prompt "Match each year to the corresponding historical event. Drag and drop the events." with the years 1754, 1773, 1775, 1776 and 1787 each beside an empty drop zone, and five event tiles below, including Boston Tea Party and Declaration of Independence.',
		caption: 'Drag answers to match each prompt.',
		width: 800,
		height: 417
	},
	categorize: {
		file: 'categorize-deliver.webp',
		alt: 'The prompt "Classify each shape as 2D (two-dimensional) or 3D (three-dimensional) based on their formulas." above empty "2D Shapes" and "3D Shapes" drop zones and six formula tiles, such as "Circle: A = πr²" and "Cube: V = s³".',
		caption: 'Sort items into categories by dragging.',
		width: 800,
		height: 313
	},
	'placement-ordering': {
		file: 'placement-ordering-deliver.webp',
		alt: 'The prompt "Arrange the fruits alphabetically" above a vertical list of four draggable tiles in the order Melon, Blueberry, Lemon, Pear.',
		caption: 'Drag items into the correct order.',
		width: 800,
		height: 255
	},
	'drag-in-the-blank': {
		file: 'drag-in-the-blank-deliver.webp',
		alt: 'The prompt "Complete the sentence by dragging the correct words into the blanks." above the sentence "The ___ is the largest planet in our solar system, while ___ is the smallest." and the word tiles Mercury, Saturn, Jupiter and Mars.',
		caption: 'Drag words into blanks to complete a sentence.',
		width: 800,
		height: 173
	},
	'image-cloze-association': {
		file: 'image-cloze-association-deliver.webp',
		alt: 'The placeholder line "This is the question prompt" and a paragraph about a car tire disposal area near a wetland ending "Drag and drop the data labels into the graph to show how this decision will likely affect the number of tire pieces collected from a sample area of the wetland after many years.", above a line graph of tire pieces collected over time with two empty drop zones and the draggable labels "Without tire recycling" and "With tire recycling".',
		caption: 'Drag answers onto the matching spots in an image.',
		width: 800,
		height: 488
	},
	'venn-classification': {
		file: 'venn-classification-deliver.webp',
		alt: 'The prompt "Each tile is an expression. Classify its value as prime, odd, both, or neither." with the example "For example, √9 has value 3.", above an empty two-circle Venn diagram labelled Prime and Odd and six expression tiles such as √4, 3² and 3 × 5.',
		caption: 'Sort items into regions of a Venn diagram.',
		width: 800,
		height: 619
	},
	graphing: {
		file: 'graphing-deliver.webp',
		alt: 'The prompt "Plot the line for the equation y = 2x + 1. Use points to mark where the line crosses each axis." above an empty coordinate grid titled "Graphing Linear Functions" from −5 to 5, with Point, Line and Segment tools and Undo, Redo and Reset buttons.',
		caption: 'Plot points and lines on a coordinate grid.',
		width: 800,
		height: 574
	},
	'graphing-solution-set': {
		file: 'graphing-solution-set-deliver.webp',
		alt: 'A prompt giving the system of linear inequalities 4x – 3y > –6 and x + 3y > –9 to graph, above Line A, Line B and Solution Set controls with Solid and Dashed options, and an empty grid titled "System of Linear Inequalities" from −10 to 10.',
		caption: 'Graph inequalities and shade the solution region.',
		width: 800,
		height: 647
	},
	'number-line': {
		file: 'number-line-deliver.webp',
		alt: 'The prompt "Graph the solution set for the inequality: x ≤ -2" above four ray tools with open or closed endpoints, Undo and Clear All buttons, and an empty number line from −6 to 2.',
		caption: 'Graph an inequality on a number line.',
		width: 800,
		height: 174
	},
	charting: {
		file: 'charting-deliver.webp',
		alt: 'The prompt "Data Analysis: The bar chart shows test scores for five students. Student C scored 15 points less than the class average of 85. Update the chart to show the correct score for Student C. You can also add additional students if needed." above a bar chart titled "Class Test Score Distribution" with bars for Students A to E.',
		caption: 'Set bar heights to complete a chart.',
		width: 800,
		height: 556
	},
	hotspot: {
		file: 'hotspot-deliver.webp',
		alt: 'The question "Which state(s) have names beginning in "North"?" above a map of the United States with several states and areas shaded as clickable regions.',
		caption: 'Click the image regions that answer the question.',
		width: 800,
		height: 431
	},
	'drawing-response': {
		file: 'drawing-response-deliver.webp',
		alt: 'The placeholder prompt "This is the question prompt" above Fill color (White) and Outline color (Black) menus, a toolbar with select, pencil, line, rectangle, circle, text and eraser tools plus Undo and Clear All, and an empty canvas.',
		caption: 'Draw or annotate an answer on a canvas.',
		width: 800,
		height: 396
	},
	passage: {
		file: 'passage-deliver.webp',
		alt: 'A passage with two tabs, "Hope Is the Thing with Feathers" and "Ineskeen Road, July Evening", showing the first poem, from The Complete Poems of Emily Dickinson, with line numbers 5 and 10 in the margin.',
		caption: 'Read passages in tabs.',
		width: 800,
		height: 354
	},
	'video-stimulus': {
		file: 'video-stimulus-deliver.webp',
		alt: 'The title "Lab safety demonstration" and the description "Watch how the student prepares to handle a heated container safely." above a "Show transcript" button and a paused 12-second video whose first frame shows safety goggles and the words "Captions and transcript provided".',
		caption: 'Watch a captioned video with a transcript.',
		width: 800,
		height: 491
	},
	rubric: {
		file: 'rubric-deliver.webp',
		alt: 'An expanded rubric, as an instructor sees it, listing 3, 2, 1 and 0 point levels with short descriptors such as "mostly right" and two sample answers, under a "Hide Rubric" toggle.',
		caption: 'Instructor view: score against point descriptors.',
		width: 800,
		height: 393
	},
	'complex-rubric': {
		file: 'complex-rubric-deliver.webp',
		alt: 'An expanded rubric in its simple form, as an instructor sees it, listing 3, 2, 1 and 0 point levels with short descriptors and two sample answers, under a "Hide Rubric" toggle.',
		caption: 'Instructor view: score against point descriptors (simple type).',
		width: 800,
		height: 393
	},
	'multi-trait-rubric': {
		file: 'multi-trait-rubric-deliver.webp',
		alt: 'An expanded multi-trait rubric under a "Hide Rubric" toggle, with the traits Ideas and Organization scored across the levels Effective (4 points), Progressing (3 points) and Developing (2 points), and a fourth column cut off at the right edge beside a scroll arrow.',
		caption: 'Open the rubric to see each trait\'s levels.',
		width: 800,
		height: 289
	}
};

export function deliveryCapture(name: string): ElementCapture {
	const capture = DELIVERY_CAPTURES[name];
	if (!capture) throw new Error(`No capture for PIE element: ${name}`);
	return capture;
}

export interface SampleCapture extends ElementCapture {
	title: string;
}

/** Larger authoring, delivery and evaluation views of two elements. */
export const SAMPLE_CAPTURES: readonly SampleCapture[] = [
	{
		title: 'Categorize: authoring view',
		file: 'categorize-author.webp',
		alt: 'The categorize authoring view with Design and Settings tabs, an empty Teacher Instructions field, the prompt "Classify each shape as 2D (two-dimensional) or 3D (three-dimensional) based on their formulas.", and the "2D Shapes" and "3D Shapes" category cards holding their correct formulas, each with a remove button.',
		caption: 'WYSIWYG authoring interface for configuring a drag-and-drop categorization question',
		width: 1400,
		height: 918
	},
	{
		title: 'Categorize: student view',
		file: 'categorize-deliver-sample.webp',
		alt: 'The categorize question "Classify each shape as 2D (two-dimensional) or 3D (three-dimensional) based on their formulas." with the Triangle and Circle formulas placed under "2D Shapes", the Cube formula under "3D Shapes", and the Sphere, Cylinder and Rectangle formulas still in the "Shape Formulas" tray.',
		caption: 'Interactive student experience: drag items into labeled categories',
		width: 1400,
		height: 479
	},
	{
		title: 'Hotspot: authoring view',
		file: 'hotspot-author.webp',
		alt: 'The hotspot authoring view with the prompt "Which state(s) have names beginning in "North"?", hot spot and response outline color menus, rectangle, polygon and circle tools with Replace Image and Clear All buttons, and the US map with North Dakota and North Carolina outlined as correct regions.',
		caption: 'Define clickable regions on images during authoring',
		width: 1400,
		height: 1245
	},
	{
		title: 'Hotspot: evaluation view',
		file: 'hotspot-evaluate.webp',
		alt: 'The hotspot question "Which state(s) have names beginning in "North"?" in the scorer view, with North Dakota and North Carolina outlined and marked with green checks, Kansas outlined in red with a red cross, and a "Show correct answer" toggle above the map.',
		caption: 'Show correct and incorrect responses with visual feedback',
		width: 1400,
		height: 787
	}
];
