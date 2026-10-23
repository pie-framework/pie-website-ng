// The simulator's state and the AfA record it builds. Kept apart from the
// trace so the page renders without loading the toolkit.

import type { ContentLanguage } from '$lib/data/localization-demo';

export type Grant = 'off' | 'granted' | 'init' | 'prohibited';
export type Basis = 'framework' | 'documented';

export interface SimulatorState {
	spoken: Grant;
	readingType: 'computer-read-aloud' | 'screen-reader';
	speechRate: number;
	calculator: Grant;
	calculatorType: 'basic' | 'scientific' | 'graphing';
	lineReader: Grant;
	signLanguage: Grant;
	signLang: string;
	keywordTranslation: boolean;
	languageOfInterface: string;
	districtBlocked: string[];
	overrides: Record<string, 'on' | 'off' | ''>;
	itemRestricted: string[];
	locale: string;
	generatedTier: boolean;
	customMessages: boolean;
	content: ContentLanguage;
	envLocale: boolean;
	runtimeContentLanguage: boolean;
	markupLang: boolean;
	modelLanguage: boolean;
	mathInQuestion: boolean;
	mcRelease: 'published' | 'next';
	build: 'bundle' | 'iife' | 'esm';
	transport: 'browser' | 'pie' | 'custom';
	pinnedLangId: string;
	toolLanguage: string;
}

export const DEFAULT_STATE: SimulatorState = {
	spoken: 'granted', readingType: 'computer-read-aloud', speechRate: 180,
	calculator: 'off', calculatorType: 'scientific',
	lineReader: 'off',
	signLanguage: 'off', signLang: 'bfi',
	keywordTranslation: false, languageOfInterface: '',
	districtBlocked: [], overrides: { calculator: '', lineReader: '', textToSpeech: '' }, itemRestricted: [],
	locale: 'nl-NL', generatedTier: true, customMessages: false,
	content: 'en-US', envLocale: true, runtimeContentLanguage: true, markupLang: true, modelLanguage: false, mathInQuestion: false,
	mcRelease: 'published', build: 'bundle',
	transport: 'browser', pinnedLangId: '', toolLanguage: ''
};

/** Placement the simulator and the live player share. */
export const PLACEMENT = {
	section: ['theme', 'lineReader'],
	passage: ['textToSpeech'],
	item: ['textToSpeech', 'calculator', 'answerEliminator']
};

/** Messages the "host-supplied messages" option registers: a locale no tier ships. */
export const CUSTOM_MESSAGES = {
	'de-DE': {
		common: { close: 'Schließen', next: 'Weiter', previous: 'Zurück' },
		player: { sectionToolsA11y: 'Abschnittswerkzeuge' },
		tools: { calculator: { name: 'Taschenrechner' }, lineReader: { name: 'Leselineal' } }
	}
};

/** Multiple choice's shipped catalogs, `en-US` first (its `src/i18n/index.ts`). */
export const MC_LOCALES = ['en-US', 'es', 'th-TH', 'en-GB', 'en-AU', 'fr', 'ar', 'pt', 'ko', 'ja', 'zh', 'cy', 'sv', 'nl-NL', 'ro'];

function addFeature(record: Record<string, unknown>, feature: string, grant: Grant, settings: Record<string, unknown> = {}) {
	if (grant === 'off') return;
	const set = grant === 'init' ? 'activate-at-initialization-set' : grant === 'prohibited' ? 'prohibit-set' : null;
	if (grant !== 'prohibited') record[feature] = settings;
	if (set) record[set] = [...((record[set] as string[]) ?? []), feature];
}

/** The AfA PNP 3.0 record the builder describes. */
export function afaRecord(state: SimulatorState): Record<string, unknown> {
	const record: Record<string, unknown> = {};
	addFeature(record, 'spoken', state.spoken, state.readingType === 'computer-read-aloud'
		? { 'reading-type': state.readingType, 'speech-rate': state.speechRate }
		: { 'reading-type': state.readingType });
	addFeature(record, 'calculator-on-screen', state.calculator, { 'calculator-type': state.calculatorType });
	addFeature(record, 'line-reader', state.lineReader);
	addFeature(record, 'sign-language', state.signLanguage, { language: state.signLang });
	if (state.keywordTranslation) record['keyword-translation'] = { language: 'es' };
	if (state.languageOfInterface) record['language-of-interface'] = { language: state.languageOfInterface };
	return record;
}

export function itemIds(content: ContentLanguage) {
	return [`bees-${content}-q1`, `bees-${content}-q2`];
}
