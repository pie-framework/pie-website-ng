// The Honeybees passage from section-demo.ts in four content languages. Each
// version is a separate section: translating a stem is authoring work, and the
// interface locale never selects it. The translations are the site's own and
// have not been reviewed by native speakers.

export type ContentLanguage = 'en-US' | 'nl-NL' | 'zh' | 'ar';

interface Translation {
	label: string;
	dir: 'ltr' | 'rtl';
	title: string;
	paragraphs: [string, string];
	questions: [Question, Question];
}
interface Question {
	prompt: string;
	choices: { label: string; value: string; correct?: boolean }[];
}

const translations: Record<ContentLanguage, Translation> = {
	'en-US': {
		label: 'English', dir: 'ltr',
		title: 'How honeybees share a discovery',
		paragraphs: [
			'A honeybee that finds flowers returns to the hive and dances. The direction of the dance tells the other bees where the flowers are, and its length tells them how far to fly.',
			'Sharing a discovery helps a hive find food together. A bee can follow the dance to a new patch of flowers without searching the whole area on its own.'
		],
		questions: [
			{ prompt: 'What does the length of the dance tell the other bees?', choices: [
				{ label: 'How far to fly', value: 'distance', correct: true },
				{ label: 'Which way to fly', value: 'direction' },
				{ label: 'What color the flowers are', value: 'color' }
			] },
			{ prompt: 'Why does sharing a discovery help the hive?', choices: [
				{ label: 'Other bees can find food without searching the whole area', value: 'food', correct: true },
				{ label: 'Every bee visits a different hive', value: 'hive' },
				{ label: 'The flowers move closer to the hive', value: 'flowers' }
			] }
		]
	},
	'nl-NL': {
		label: 'Nederlands', dir: 'ltr',
		title: 'Hoe honingbijen een vondst delen',
		paragraphs: [
			'Een honingbij die bloemen vindt, keert terug naar de kast en danst. De richting van de dans vertelt de andere bijen waar de bloemen zijn, en de lengte ervan hoe ver ze moeten vliegen.',
			'Een vondst delen helpt een volk samen voedsel te vinden. Een bij kan de dans volgen naar een nieuw veld bloemen zonder zelf het hele gebied af te zoeken.'
		],
		questions: [
			{ prompt: 'Wat vertelt de lengte van de dans de andere bijen?', choices: [
				{ label: 'Hoe ver ze moeten vliegen', value: 'distance', correct: true },
				{ label: 'Welke kant ze op moeten vliegen', value: 'direction' },
				{ label: 'Welke kleur de bloemen hebben', value: 'color' }
			] },
			{ prompt: 'Waarom helpt het delen van een vondst het volk?', choices: [
				{ label: 'Andere bijen vinden voedsel zonder het hele gebied af te zoeken', value: 'food', correct: true },
				{ label: 'Elke bij bezoekt een andere kast', value: 'hive' },
				{ label: 'De bloemen komen dichter bij de kast', value: 'flowers' }
			] }
		]
	},
	zh: {
		label: '中文', dir: 'ltr',
		title: '蜜蜂如何分享发现',
		paragraphs: [
			'一只发现花朵的蜜蜂会飞回蜂巢跳舞。舞蹈的方向告诉其他蜜蜂花在哪里，舞蹈的长度告诉它们要飞多远。',
			'分享发现能帮助整个蜂群一起找到食物。一只蜜蜂可以跟随舞蹈找到一片新的花丛，而不必独自搜索整个区域。'
		],
		questions: [
			{ prompt: '舞蹈的长度告诉其他蜜蜂什么？', choices: [
				{ label: '要飞多远', value: 'distance', correct: true },
				{ label: '往哪个方向飞', value: 'direction' },
				{ label: '花是什么颜色', value: 'color' }
			] },
			{ prompt: '为什么分享发现对蜂群有帮助？', choices: [
				{ label: '其他蜜蜂不必搜索整个区域就能找到食物', value: 'food', correct: true },
				{ label: '每只蜜蜂都去不同的蜂巢', value: 'hive' },
				{ label: '花会移到离蜂巢更近的地方', value: 'flowers' }
			] }
		]
	},
	ar: {
		label: 'العربية', dir: 'rtl',
		title: 'كيف تشارك نحلة العسل اكتشافها',
		paragraphs: [
			'عندما تجد نحلة العسل أزهارًا، تعود إلى الخلية وترقص. يخبر اتجاه الرقصة النحلات الأخرى بمكان الأزهار، ويخبرها طولها بالمسافة التي عليها أن تطيرها.',
			'تساعد مشاركة الاكتشاف الخلية على إيجاد الغذاء معًا. يمكن للنحلة أن تتبع الرقصة إلى رقعة أزهار جديدة دون أن تبحث في المنطقة كلها بمفردها.'
		],
		questions: [
			{ prompt: 'بماذا يخبر طول الرقصة النحلات الأخرى؟', choices: [
				{ label: 'بالمسافة التي عليها أن تطيرها', value: 'distance', correct: true },
				{ label: 'بالاتجاه الذي عليها أن تطير فيه', value: 'direction' },
				{ label: 'بلون الأزهار', value: 'color' }
			] },
			{ prompt: 'لماذا تساعد مشاركة الاكتشاف الخلية؟', choices: [
				{ label: 'تستطيع النحلات الأخرى إيجاد الغذاء دون البحث في المنطقة كلها', value: 'food', correct: true },
				{ label: 'تزور كل نحلة خلية مختلفة', value: 'hive' },
				{ label: 'تقترب الأزهار من الخلية', value: 'flowers' }
			] }
		]
	}
};

// 14.0.7 is the first release that follows the interface locale and leaves the
// content's `lang` in place; the element catalog still lists 14.0.4.
const MULTIPLE_CHOICE = '@pie-element/multiple-choice@14.0.7';
// The `next` build of the release that labels every control in the interface locale.
const MULTIPLE_CHOICE_NEXT = '@pie-element/multiple-choice@14.0.8-next.20261023175726';

export const CONTENT_LANGUAGES = (Object.keys(translations) as ContentLanguage[])
	.map((value) => ({ value, label: translations[value].label }));

export function contentDirection(language: ContentLanguage) {
	return translations[language].dir;
}

export interface SectionOptions {
	/** Declare `lang` and `dir` in the markup, the way authored content does. */
	markupLang?: boolean;
	/** Set each multiple choice model's `language`. */
	modelLanguage?: boolean;
	/** `settings.restrictedTools` on the first question. */
	restrictedTools?: string[];
	/** Load multiple choice's `next` build instead of the published release. */
	nextElement?: boolean;
	/** An equation in the first question's prompt, which the calculator's relevance check looks for. */
	math?: boolean;
}

export function localizedSection(language: ContentLanguage, options: SectionOptions = {}) {
	const { markupLang = true, modelLanguage = false, restrictedTools = [], nextElement = false, math = false } = options;
	const t = translations[language];
	const wrap = (html: string) => markupLang ? `<div lang="${language}" dir="${t.dir}">${html}</div>` : `<div>${html}</div>`;
	return {
		identifier: 'website-localization-' + language,
		title: t.title,
		rubricBlocks: [{
			identifier: 'honeybees-passage-' + language,
			class: 'stimulus',
			view: ['candidate'],
			passage: {
				id: 'honeybees-' + language,
				name: t.title,
				config: {
					elements: {}, models: [],
					markup: wrap(`<h4 style="margin-bottom:0.75rem">${t.title}</h4><p>${t.paragraphs[0]}</p><p style="margin-top:1rem">${t.paragraphs[1]}</p>`)
				}
			}
		}],
		assessmentItemRefs: t.questions.map((question, index) => {
			const id = `bees-${language}-q${index + 1}`;
			return {
				identifier: id,
				...(index === 0 && restrictedTools.length ? { settings: { restrictedTools: [...restrictedTools] } } : {}),
				item: {
					id,
					name: 'Question ' + (index + 1),
					config: {
						elements: { 'multiple-choice': nextElement ? MULTIPLE_CHOICE_NEXT : MULTIPLE_CHOICE },
						markup: wrap(`<multiple-choice id="${id}-choice"></multiple-choice>`),
						models: [{
							id: id + '-choice',
							element: 'multiple-choice',
							prompt: index === 0 && math ? `${question.prompt}<p>12 × 50 = 600</p>` : question.prompt,
							promptEnabled: true,
							...(modelLanguage ? { language } : {}),
							choiceMode: 'radio',
							choicePrefix: 'letters',
							choices: question.choices
						}]
					}
				}
			};
		})
	};
}
