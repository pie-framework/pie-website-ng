import { base } from '$app/paths';
import { elementSpec } from '$lib/versions';

// Adapted from pie-players/docs/getting-started-section.md and the formative
// and timed-media section demos. Exact element versions come from the catalog.
function choice(id: string, prompt: string, choices: { label: string; value: string; correct?: boolean }[]) {
	return {
		identifier: id,
		item: {
			id,
			name: 'Question ' + id.slice(-1),
			config: {
				elements: { 'multiple-choice': elementSpec('multiple-choice') },
				markup: '<multiple-choice id="' + id + '-choice"></multiple-choice>',
				models: [{
					id: id + '-choice',
					element: 'multiple-choice',
					prompt,
					promptEnabled: true,
					choiceMode: 'radio',
					choicePrefix: 'letters',
					choices
				}]
			}
		}
	};
}

export function readingSection(formative = false) {
	return {
		identifier: formative ? 'website-practice' : 'website-reading',
		title: 'Honeybees',
		...(formative ? { formative: { enabled: true, maxTries: 3, feedback: 'correctness', revealOn: 'on-try' } } : {}),
		rubricBlocks: [{
			identifier: 'honeybees-passage',
			class: 'stimulus',
			view: ['candidate'],
			passage: {
				id: 'honeybees',
				name: 'How honeybees share a discovery',
				config: {
					elements: {}, models: [],
					markup: '<h4 style="margin-bottom:0.75rem">How honeybees share a discovery</h4><p>A honeybee that finds flowers returns to the hive and dances. The direction of the dance tells the other bees where the flowers are, and its length tells them how far to fly.</p><p style="margin-top:1rem">Sharing a discovery helps a hive find food together. A bee can follow the dance to a new patch of flowers without searching the whole area on its own.</p>'
				}
			}
		}],
		assessmentItemRefs: [
			choice('bees-q1', 'What does the length of the dance tell the other bees?', [
				{ label: 'How far to fly', value: 'distance', correct: true },
				{ label: 'Which way to fly', value: 'direction' },
				{ label: 'What color the flowers are', value: 'color' }
			]),
			choice('bees-q2', 'Why does sharing a discovery help the hive?', [
				{ label: 'Other bees can find food without searching the whole area', value: 'food', correct: true },
				{ label: 'Every bee visits a different hive', value: 'hive' },
				{ label: 'The flowers move closer to the hive', value: 'flowers' }
			])
		]
	};
}

export function timedMediaSection() {
	return {
		identifier: 'website-timed-media',
		title: 'The water cycle',
		sectionType: 'timed-media',
		formative: { enabled: true, maxTries: 'unlimited', feedback: 'correctness' },
		rubricBlocks: [{
			identifier: 'water-cycle-video',
			class: 'stimulus', view: ['candidate'],
			passage: {
				id: 'water-cycle', name: 'The water cycle',
				config: {
					elements: {}, models: [],
					markup: '<video controls playsinline preload="metadata" style="width:100%;aspect-ratio:427/240"><source src="' + base + '/demo-assets/water-cycle-lesson.webm" type="video/webm"></video><p><strong>Text alternative:</strong> This silent slide lesson shows evaporation: the sun heats water and it rises as water vapour. Higher in the colder air it condenses into clouds. The cycle continues with precipitation.</p>'
				}
			}
		}],
		assessmentItemRefs: [
			choice('water-q1', 'What does the sun’s heat do to water in oceans and lakes?', [
				{ label: 'It evaporates into water vapour', value: 'evaporates', correct: true },
				{ label: 'It freezes into ice', value: 'freezes' }
			]),
			choice('water-q2', 'What happens when water vapour rises into colder air?', [
				{ label: 'It condenses and forms clouds', value: 'condenses', correct: true },
				{ label: 'It evaporates a second time', value: 'evaporates' }
			])
		],
		timedMedia: {
			stimulusRef: 'water-cycle-video',
			cues: [
				{ identifier: 'evaporation', range: { startSeconds: 4 }, itemRefs: ['water-q1'], policy: { activation: 'reveal' } },
				{ identifier: 'condensation', range: { startSeconds: 10 }, itemRefs: ['water-q2'], policy: { activation: 'gate', releaseOn: 'correct', onUnknownCorrectness: 'release' } }
			],
			playbackPolicy: { allowSeekAhead: false, pauseOnRequiredCue: true, requireMediaCompletion: false }
		}
	};
}
