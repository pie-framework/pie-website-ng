/**
 * PIE Playground sample configurations matching PieOneer's examples
 * Based on: /Users/eelco.hillenius/dev/prj/kds/pie-api-aws/containers/pieoneer/src/lib/shared/playground/pie-examples.ts
 */

export interface PlaygroundSample {
	id: string;
	name: string;
	category: string;
	description: string;
	item: {
		id: string;
		name: string;
		config: {
			elements: Record<string, string>;
			models: any[];
			markup: string;
		};
	};
}

export interface SampleCategory {
	id: string;
	name: string;
	description: string;
	samples: PlaygroundSample[];
}

// Sample categories matching PieOneer's groups
export const categories: SampleCategory[] = [
	{
		id: 'multiple-choice',
		name: 'Multiple Choice',
		description: 'Questions with single or multiple correct answers',
		samples: [
			{
				id: 'mc_basic',
				name: 'Basic Single Answer',
				category: 'Multiple Choice',
				description: 'Simple multiple choice with a single correct answer',
				item: {
					id: 'mc_basic',
					name: 'Basic Single Answer',
					config: {
						elements: { 'pp-pie-element-multiple-choice': '@pie-element/multiple-choice@latest' },
						models: [
							{
								id: '1',
								element: 'pp-pie-element-multiple-choice',
								prompt: '<div><strong>What is the capital of France?</strong></div>',
								choiceMode: 'radio',
								choices: [
									{ label: 'London', value: 'london' },
									{ label: 'Berlin', value: 'berlin' },
									{ label: 'Paris', value: 'paris' },
									{ label: 'Madrid', value: 'madrid' }
								],
								correctResponse: { value: 'paris' }
							}
						],
						markup: "<pp-pie-element-multiple-choice id='1'></pp-pie-element-multiple-choice>"
					}
				}
			},
			{
				id: 'mc_multi',
				name: 'Multiple Answers',
				category: 'Multiple Choice',
				description: 'Multiple choice that allows selecting multiple answers',
				item: {
					id: 'mc_multi',
					name: 'Multiple Answers',
					config: {
						elements: { 'pp-pie-element-multiple-choice': '@pie-element/multiple-choice@latest' },
						models: [
							{
								id: '1',
								element: 'pp-pie-element-multiple-choice',
								prompt: '<div><strong>Which are prime numbers?</strong></div>',
								choiceMode: 'checkbox',
								choices: [
									{ label: '2', value: '2' },
									{ label: '4', value: '4' },
									{ label: '7', value: '7' },
									{ label: '9', value: '9' },
									{ label: '11', value: '11' }
								],
								correctResponse: { value: ['2', '7', '11'] }
							}
						],
						markup: "<pp-pie-element-multiple-choice id='1'></pp-pie-element-multiple-choice>"
					}
				}
			},
			{
				id: 'tf_basic',
				name: 'True/False Question',
				category: 'Multiple Choice',
				description: 'Multiple choice formatted as a true/false question',
				item: {
					id: 'tf_basic',
					name: 'True/False Question',
					config: {
						elements: { 'pp-pie-element-multiple-choice': '@pie-element/multiple-choice@latest' },
						models: [
							{
								id: '1',
								element: 'pp-pie-element-multiple-choice',
								prompt: '<div><strong>The Earth is flat.</strong></div>',
								choiceMode: 'radio',
								choices: [
									{ label: 'True', value: 'true' },
									{ label: 'False', value: 'false' }
								],
								correctResponse: { value: 'false' }
							}
						],
						markup: "<pp-pie-element-multiple-choice id='1'></pp-pie-element-multiple-choice>"
					}
				}
			}
		]
	},
	{
		id: 'extended-text',
		name: 'Extended Text',
		description: 'Extended text response questions',
		samples: [
			{
				id: 'et_basic',
				name: 'Extended Text Entry',
				category: 'Extended Text',
				description: 'Simple extended text question',
				item: {
					id: 'et_basic',
					name: 'Extended Text Entry',
					config: {
						elements: {
							'pp-pie-element-extended-text-entry': '@pie-element/extended-text-entry@latest'
						},
						models: [
							{
								id: '1',
								element: 'pp-pie-element-extended-text-entry',
								prompt: '<div><strong>Explain the process of photosynthesis.</strong></div>',
								expectedLines: 5,
								maxCharacters: 500
							}
						],
						markup: "<pp-pie-element-extended-text-entry id='1'></pp-pie-element-extended-text-entry>"
					}
				}
			}
		]
	},
	{
		id: 'explicit-constructed-response',
		name: 'Explicit Constructed Response',
		description: 'Students type exact answers that must match predefined responses',
		samples: [
			{
				id: 'ecr_basic',
				name: 'Fill-in-the-Blank',
				category: 'Explicit Constructed Response',
				description: 'Type exact words to complete the sentence',
				item: {
					id: 'ecr_basic',
					name: 'Fill-in-the-Blank',
					config: {
						elements: {
							'pp-pie-element-explicit-constructed-response':
								'@pie-element/explicit-constructed-response@latest'
						},
						models: [
							{
								id: '1',
								element: 'pp-pie-element-explicit-constructed-response',
								markup: '<div>The capital of France is {{0}}.</div>',
								responses: [
									{
										id: '0',
										validation: 'literal',
										alternateResponses: [{ value: 'Paris' }, { value: 'paris' }]
									}
								]
							}
						],
						markup:
							"<pp-pie-element-explicit-constructed-response id='1'></pp-pie-element-explicit-constructed-response>"
					}
				}
			}
		]
	},
	{
		id: 'drag-and-drop-items',
		name: 'Drag and Drop',
		description: 'Drag and drop items',
		samples: [
			{
				id: 'cat_basic',
				name: 'Categorize',
				category: 'Drag and Drop',
				description: 'Sort items into correct categories',
				item: {
					id: 'cat_basic',
					name: 'Categorize',
					config: {
						elements: { 'pp-pie-element-categorize': '@pie-element/categorize@latest' },
						models: [
							{
								id: '1',
								element: 'pp-pie-element-categorize',
								prompt: '<div><strong>Drag animals to their habitats.</strong></div>',
								promptEnabled: true,
								categories: [
									{ id: '0', label: '<div>Ocean</div>' },
									{ id: '1', label: '<div>Desert</div>' },
									{ id: '2', label: '<div>Forest</div>' }
								],
								choices: [
									{ id: '0', content: '<div>Dolphin</div>', categoryCount: 0 },
									{ id: '1', content: '<div>Camel</div>', categoryCount: 0 },
									{ id: '2', content: '<div>Bear</div>', categoryCount: 0 }
								],
								correctResponse: [
									{ category: '0', choices: ['0'] },
									{ category: '1', choices: ['1'] },
									{ category: '2', choices: ['2'] }
								],
								categoriesPerRow: 3,
								choicesPosition: 'below',
								lockChoiceOrder: true
							}
						],
						markup: "<pp-pie-element-categorize id='1'></pp-pie-element-categorize>"
					}
				}
			},
			{
				id: 'dnd_basic',
				name: 'Drag In The Blank',
				category: 'Drag and Drop',
				description: 'Simple drag and drop words into sentence blanks',
				item: {
					id: 'dnd_basic',
					name: 'Drag In The Blank',
					config: {
						elements: { 'pp-pie-element-drag-in-the-blank': '@pie-element/drag-in-the-blank@latest' },
						models: [
							{
								id: '1',
								element: 'pp-pie-element-drag-in-the-blank',
								markup: 'The {{0}} is the center of our {{1}}.',
								choices: [
									{ id: '0', label: 'Sun', value: 'sun' },
									{ id: '1', label: 'Moon', value: 'moon' },
									{ id: '2', label: 'Solar System', value: 'solar_system' },
									{ id: '3', label: 'Galaxy', value: 'galaxy' }
								],
								correctResponse: { '0': 'sun', '1': 'solar_system' }
							}
						],
						markup: "<pp-pie-element-drag-in-the-blank id='1'></pp-pie-element-drag-in-the-blank>"
					}
				}
			},
			{
				id: 'placement_order',
				name: 'Placement Ordering',
				category: 'Drag and Drop',
				description: 'Order items in correct sequence',
				item: {
					id: 'placement_order',
					name: 'Placement Ordering',
					config: {
						elements: {
							'pp-pie-element-placement-ordering': '@pie-element/placement-ordering@latest'
						},
						models: [
							{
								id: '1',
								element: 'pp-pie-element-placement-ordering',
								prompt: '<div><strong>Arrange these events in chronological order.</strong></div>',
								choices: [
									{ id: '0', label: 'American Revolution', moveOnDrag: false },
									{ id: '1', label: 'Civil War', moveOnDrag: false },
									{ id: '2', label: 'World War I', moveOnDrag: false },
									{ id: '3', label: 'World War II', moveOnDrag: false }
								],
								correctResponse: ['0', '1', '2', '3']
							}
						],
						markup: "<pp-pie-element-placement-ordering id='1'></pp-pie-element-placement-ordering>"
					}
				}
			}
		]
	},
	{
		id: 'math-items',
		name: 'Math Questions',
		description: 'Math-related question types',
		samples: [
			{
				id: 'math_template',
				name: 'Math Template',
				category: 'Math Questions',
				description: 'Fill in the blanks with math expressions',
				item: {
					id: 'math_template',
					name: 'Math Template',
					config: {
						elements: { 'pp-pie-element-math-templated': '@pie-element/math-templated@latest' },
						models: [
							{
								id: '1',
								element: 'pp-pie-element-math-templated',
								template: '<div>If 2x + 5 = 13, then x = {{0}}</div>',
								responses: [{ id: '0', validation: 'symbolic', answer: '4' }]
							}
						],
						markup: "<pp-pie-element-math-templated id='1'></pp-pie-element-math-templated>"
					}
				}
			},
			{
				id: 'eq_response',
				name: 'Equation Response',
				category: 'Math Questions',
				description: 'Answer with mathematical expressions',
				item: {
					id: 'eq_response',
					name: 'Equation Response',
					config: {
						elements: { 'pp-pie-element-math-inline': '@pie-element/math-inline@latest' },
						models: [
							{
								id: '1',
								element: 'pp-pie-element-math-inline',
								prompt: '<div>Solve for x: 3x - 7 = 14</div>',
								equationEditor: 'geometry',
								responseType: 'Advanced Multi',
								validation: 'symbolic',
								responses: [{ answer: 'x=7', id: '1' }]
							}
						],
						markup: "<pp-pie-element-math-inline id='1'></pp-pie-element-math-inline>"
					}
				}
			}
		]
	},
	{
		id: 'graphing-tools',
		name: 'Graphical Data Presentation',
		description: 'Tools for graphing and charting',
		samples: [
			{
				id: 'graphing',
				name: 'Graphing',
				category: 'Graphical Data Presentation',
				description: 'Plot points, lines, or objects on a coordinate grid',
				item: {
					id: 'graphing',
					name: 'Graphing',
					config: {
						elements: { 'pp-pie-element-graphing': '@pie-element/graphing@latest' },
						models: [
							{
								id: '1',
								element: 'pp-pie-element-graphing',
								prompt: '<div><strong>Plot the line y = 2x + 1</strong></div>',
								graph: {
									width: 500,
									height: 500,
									domain: { min: -10, max: 10, step: 1 },
									range: { min: -10, max: 10, step: 1 }
								},
								tools: [{ type: 'line' }]
							}
						],
						markup: "<pp-pie-element-graphing id='1'></pp-pie-element-graphing>"
					}
				}
			},
			{
				id: 'number_line',
				name: 'Number Line',
				category: 'Graphical Data Presentation',
				description: 'Plot points, segments, or rays',
				item: {
					id: 'number_line',
					name: 'Number Line',
					config: {
						elements: { 'pp-pie-element-number-line': '@pie-element/number-line@latest' },
						models: [
							{
								id: '1',
								element: 'pp-pie-element-number-line',
								prompt: '<div><strong>Plot all integers between -3 and 3</strong></div>',
								domain: -10,
								range: 10,
								tickFrequency: 1,
								snapPerTick: 1,
								initialType: 'PF',
								exhibitOnly: false,
								availableTypes: {
									PF: true,
									PE: true,
									LFF: false,
									LEF: false,
									LFE: false,
									LEE: false,
									RFN: false,
									RFP: false,
									REN: false,
									REP: false
								}
							}
						],
						markup: "<pp-pie-element-number-line id='1'></pp-pie-element-number-line>"
					}
				}
			}
		]
	},
	{
		id: 'text-selection',
		name: 'Selection',
		description: 'Select correct elements',
		samples: [
			{
				id: 'select_text',
				name: 'Select Text',
				category: 'Selection',
				description: 'Select specific parts of text',
				item: {
					id: 'select_text',
					name: 'Select Text',
					config: {
						elements: { 'pp-pie-element-select-text': '@pie-element/select-text@latest' },
						models: [
							{
								id: '1',
								element: 'pp-pie-element-select-text',
								prompt: '<div><strong>Select all the verbs in the following sentence.</strong></div>',
								text: 'The quick brown fox jumps over the lazy dog.',
								maxSelections: 2,
								mode: 'word'
							}
						],
						markup: "<pp-pie-element-select-text id='1'></pp-pie-element-select-text>"
					}
				}
			},
			{
				id: 'hotspot',
				name: 'Hotspot',
				category: 'Selection',
				description: 'Select areas on an image',
				item: {
					id: 'hotspot',
					name: 'Hotspot',
					config: {
						elements: { 'pp-pie-element-hotspot': '@pie-element/hotspot@latest' },
						models: [
							{
								id: '1',
								element: 'pp-pie-element-hotspot',
								prompt: '<div><strong>Click on the capitals.</strong></div>',
								imageUrl: 'https://via.placeholder.com/600x400.png?text=Map',
								shapes: {
									rectangles: [
										{ id: 'r1', x: 100, y: 100, width: 50, height: 50 },
										{ id: 'r2', x: 300, y: 200, width: 50, height: 50 }
									],
									polygons: []
								},
								hotspotColor: 'rgba(137, 183, 244, 0.65)',
								hotspotList: ['r1', 'r2'],
								multipleCorrect: true,
								partialScoring: false
							}
						],
						markup: "<pp-pie-element-hotspot id='1'></pp-pie-element-hotspot>"
					}
				}
			}
		]
	},
	{
		id: 'matching',
		name: 'Matching',
		description: 'Match related items',
		samples: [
			{
				id: 'match_basic',
				name: 'Match',
				category: 'Matching',
				description: 'Match items across columns',
				item: {
					id: 'match_basic',
					name: 'Match',
					config: {
						elements: { 'pp-pie-element-match': '@pie-element/match@latest' },
						models: [
							{
								id: '1',
								element: 'pp-pie-element-match',
								prompt: '<div><strong>Match each country to its capital.</strong></div>',
								layout: 2,
								lockChoiceOrder: true,
								partialScoring: false,
								rows: [
									{ id: '1', title: 'France', values: true },
									{ id: '2', title: 'Germany', values: true },
									{ id: '3', title: 'Italy', values: true }
								],
								answers: [
									{ id: 'a', label: 'Berlin' },
									{ id: 'b', label: 'Paris' },
									{ id: 'c', label: 'Rome' }
								],
								correctResponse: { '1': 'b', '2': 'a', '3': 'c' }
							}
						],
						markup: "<pp-pie-element-match id='1'></pp-pie-element-match>"
					}
				}
			}
		]
	},
	{
		id: 'inline-dropdown',
		name: 'Inline Dropdown',
		description: 'Select answers from dropdowns within text',
		samples: [
			{
				id: 'inline_dropdown',
				name: 'Inline Dropdown',
				category: 'Inline Dropdown',
				description: 'Select answers from dropdowns within text',
				item: {
					id: 'inline_dropdown',
					name: 'Inline Dropdown',
					config: {
						elements: { 'pp-pie-element-inline-dropdown': '@pie-element/inline-dropdown@latest' },
						models: [
							{
								id: '1',
								element: 'pp-pie-element-inline-dropdown',
								markup:
									'<div>The {{0}} is the largest planet in our {{1}}, and it has {{2}} known moons.</div>',
								choices: {
									'0': ['Jupiter', 'Saturn', 'Mars'],
									'1': ['Galaxy', 'Solar System', 'Universe'],
									'2': ['79', '82', '95']
								},
								correctResponse: { '0': 0, '1': 1, '2': 2 }
							}
						],
						markup: "<pp-pie-element-inline-dropdown id='1'></pp-pie-element-inline-dropdown>"
					}
				}
			}
		]
	}
];

// Flatten all samples for easy lookup
export const samples: PlaygroundSample[] = categories.flatMap((cat) => cat.samples);

/**
 * Get sample by ID
 */
export function getSampleById(id: string): PlaygroundSample | undefined {
	return samples.find((s) => s.id === id);
}

/**
 * Get all sample IDs
 */
export function getSampleIds(): string[] {
	return samples.map((s) => s.id);
}

/**
 * Get category by ID
 */
export function getCategoryById(id: string): SampleCategory | undefined {
	return categories.find((c) => c.id === id);
}
