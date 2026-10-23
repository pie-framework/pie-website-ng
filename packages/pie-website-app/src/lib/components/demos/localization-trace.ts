// The resolution trace behind the localization simulator. Every stage that the
// framework exports runs the real code: the AfA adapter, the tool policy engine,
// the interface i18n provider and the content-language attributes. The stages
// with no side-effect-free export (read-aloud's language order, multiple
// choice's label order, the sign-language pick) follow the documented rules
// and say so in their `basis`.

import {
	BUNDLED_LOCALES,
	canonicalLanguageTag,
	contentLanguageAttributes,
	createPieI18n,
	languageTagLookupSequence,
	loadBundledCatalog,
	localeDirection
} from '@pie-players/pie-players-shared/i18n';
import { GENERATED_LOCALES, loadGeneratedCatalog } from '@pie-players/pie-i18n-generated';
import { ToolPolicyEngine } from '@pie-players/pie-assessment-toolkit/policy/engine';
import { createPackagedToolRegistry, createPersonalNeedsProfileFromAfa } from '@pie-players/pie-default-tool-loaders';
import { localizedSection } from '$lib/data/localization-demo';
import { CUSTOM_MESSAGES, MC_LOCALES, PLACEMENT, itemIds, type SimulatorState } from './localization-state';

export * from './localization-state';

/** The toolkit's own support conflict; the engine does not export it. */
const SUPPORT_CONFLICTS = [{ support: 'screenReader', withholds: ['textToSpeech', 'autoplayAudio'] }];

/** Sample signing cards; the live passage carries none. */
const SIGN_CARDS = [{ signLang: 'ase' }, { signLang: 'bfi' }];

const SAMPLE_KEYS = ['player.sectionToolsA11y', 'tools.calculator.name', 'tools.lineReader.name', 'common.next', 'common.close'];

/** What a host hands the player: the tools config and the assessment entity. */
export function deliveryInputs(state: SimulatorState, record: Record<string, unknown>) {
	const profile = createPersonalNeedsProfileFromAfa(record);
	const overrides = Object.fromEntries(
		Object.entries(state.overrides).filter(([, value]) => value).map(([id, value]) => [id, value === 'on'])
	);
	const settings: Record<string, unknown> = {};
	if (state.districtBlocked.length) settings.districtPolicy = { blockedTools: [...state.districtBlocked] };
	if (Object.keys(overrides).length) settings.testAdministration = { toolOverrides: overrides };
	return {
		profile,
		assessment: { id: 'pie-website-localization-demo', personalNeedsProfile: profile, settings },
		itemSettings: state.itemRestricted.length ? { restrictedTools: [...state.itemRestricted] } : undefined
	};
}

/** The section both the trace and the live player deliver. */
export function sectionFor(state: SimulatorState) {
	return localizedSection(state.content, {
		markupLang: state.markupLang,
		modelLanguage: state.modelLanguage,
		restrictedTools: state.itemRestricted.length ? [...state.itemRestricted] : undefined,
		nextElement: state.mcRelease === 'next',
		math: state.mathInQuestion
	});
}

interface CatalogLoad { tag: string; tier: 'bundled' | 'generated'; ok: boolean }

/** The interface provider a host composes from the two tiers and its own messages. */
export function interfaceProvider(state: Pick<SimulatorState, 'generatedTier' | 'customMessages'>, loads?: CatalogLoad[]) {
	const record = (tag: string, tier: CatalogLoad['tier'], ok: boolean) => loads?.push({ tag, tier, ok });
	return createPieI18n({
		availableLocales: state.generatedTier ? [...BUNDLED_LOCALES, ...GENERATED_LOCALES] : [...BUNDLED_LOCALES],
		...(state.customMessages ? { customMessages: CUSTOM_MESSAGES } : {}),
		loadCatalog: (tag: string) => loadBundledCatalog(tag).then(
			(catalog) => { record(tag, 'bundled', true); return catalog; },
			(error) => {
				record(tag, 'bundled', false);
				if (!state.generatedTier) throw error;
				return loadGeneratedCatalog(tag).then(
					(catalog) => { record(tag, 'generated', true); return catalog; },
					(generatedError) => { record(tag, 'generated', false); throw generatedError; }
				);
			}
		)
	});
}

/**
 * The catalog an element reads for a tag: RFC 4647 lookup, then any catalog in the same
 * language, then the en-US fallback. A tag nothing ships keeps its name but reads en-US.
 */
function catalogFor(tag: string | undefined, locales: string[]) {
	if (!tag) return 'en-US';
	for (const step of languageTagLookupSequence(tagOf(tag))) {
		const hit = locales.find((locale) => locale.toLowerCase() === step);
		if (hit) return hit;
	}
	const language = tagOf(tag).toLowerCase().split('-')[0];
	return locales.find((locale) => locale.toLowerCase().split('-')[0] === language) ?? 'en-US';
}

function tagOf(value: string) {
	try { return canonicalLanguageTag(value) ?? value; } catch { return value; }
}

export interface LangAttrs { lang: string; dir: string }

export async function traceLocalization(state: SimulatorState, record: Record<string, unknown>) {
	// 1. Profile: the AfA adapter.
	const { profile, assessment, itemSettings } = deliveryInputs(state, record);
	const dropped = Object.keys(record).filter((key) => key === 'language-of-interface');

	// 2. Tool policy: the engine on the same inputs the live player gets.
	const registry = createPackagedToolRegistry();
	const engine = new ToolPolicyEngine({
		toolRegistry: registry as never,
		supportConflicts: SUPPORT_CONFLICTS,
		inputs: {
			tools: { policy: { allowed: [], blocked: [] }, placement: PLACEMENT, providers: {} },
			assessment
		} as never
	});
	const [firstItem, secondItem] = itemIds(state.content);
	if (itemSettings) engine.registerItemSettings(firstItem, itemSettings);
	const scopes = [
		{ label: 'Section toolbar', level: 'section', scopeId: `website-localization-${state.content}` },
		{ label: 'Passage toolbar', level: 'passage', scopeId: `honeybees-passage-${state.content}` },
		{ label: 'Question 1 toolbar', level: 'item', scopeId: firstItem, itemId: firstItem },
		{ label: 'Question 2 toolbar', level: 'item', scopeId: secondItem, itemId: secondItem }
	] as const;
	// Pass 2 and 3, the toolbar's rule: a tool policy allows still needs content
	// it can act on, such as math for the calculator.
	const section = sectionFor(state);
	const contextsFor = (scope: (typeof scopes)[number]) =>
		scope.level === 'passage'
			? [{ level: 'passage', passage: section.rubricBlocks[0].passage }]
			: scope.level === 'item'
				? [{ level: 'item', item: section.assessmentItemRefs.find((ref) => ref.identifier === scope.itemId)?.item }]
				: [];
	const levels = scopes.map((scope) => {
		const decision = engine.decide({ level: scope.level, scope: { ...scope } } as never);
		const placed = PLACEMENT[scope.level];
		const allowed = new Map(decision.visibleTools.map((tool) => [tool.toolId, tool]));
		const shown = new Set(registry.filterDecidedToolIds(decision.visibleTools, scope.level, contextsFor(scope) as never));
		const log = decision.provenance.decisionLog.filter((entry) => placed.includes(entry.featureId));
		return {
			label: scope.label,
			level: scope.level,
			tools: placed.map((toolId) => {
				const trail = log.filter((entry) => entry.featureId === toolId && entry.action !== 'skip');
				const winner = [...trail].sort((a, b) => a.precedence - b.precedence)[0];
				return { toolId, allowed: allowed.has(toolId), visible: shown.has(toolId), entry: allowed.get(toolId), winner, trail };
			}),
			diagnostics: decision.diagnostics.map((d) => ({ code: d.code, toolId: d.toolId, message: d.message }))
		};
	});
	const inputDiagnostics = engine.getInputs().diagnostics.map((d) => ({ code: d.code, toolId: d.toolId, message: d.message }));
	const signFeature = engine.decideFeature('signLanguage');
	const tts = {
		passage: levels[1].tools.find((t) => t.toolId === 'textToSpeech')?.visible ?? false,
		item: levels[2].tools.find((t) => t.toolId === 'textToSpeech')?.visible ?? false
	};

	// 3. Interface locale: the provider the live player is given.
	const loads: CatalogLoad[] = [];
	const i18n = interfaceProvider(state, loads);
	const requested = state.locale.trim();
	if (requested) await i18n.setLocale(requested);
	const resolvedLocale = i18n.getLocale();
	const chrome = { lang: resolvedLocale, dir: i18n.getDirection() };
	const iface = {
		requested: requested || '(unset)',
		canonical: requested ? tagOf(requested) : 'en-US',
		lookup: requested ? languageTagLookupSequence(tagOf(requested)) : [],
		resolved: resolvedLocale,
		direction: chrome.dir,
		loads,
		custom: state.customMessages && Object.prototype.hasOwnProperty.call(CUSTOM_MESSAGES, resolvedLocale),
		samples: SAMPLE_KEYS.map((key) => ({ key, text: i18n.t(key as never) }))
	};

	// 4. Content language: env.locale, the markup's own lang, the element host.
	const contentRoot = state.envLocale ? contentLanguageAttributes({ mode: 'gather', role: 'student', locale: state.content }) : null;
	const markup: LangAttrs | null = state.markupLang ? { lang: state.content, dir: localeDirection(state.content) } : null;
	const modelTag = state.modelLanguage ? tagOf(state.content) : undefined;
	const elementHost: LangAttrs | null = modelTag ? { lang: modelTag, dir: localeDirection(modelTag) } : null;
	const nearestItem = elementHost ?? markup ?? contentRoot;
	const nearestPassage = markup ?? contentRoot;
	const content = { contentRoot, markup, elementHost, nearestItem, nearestPassage, chrome };

	// 5. Element labels: multiple choice's order, documented. The build decides
	// which of its catalogs exist at runtime.
	const mcCatalogs = state.build === 'iife' ? ['en-US'] : MC_LOCALES;
	const mcInterface = catalogFor(resolvedLocale, mcCatalogs);
	const mcModel = catalogFor(modelTag, mcCatalogs);
	const element = {
		published: { locale: resolvedLocale, direction: chrome.dir },
		catalogs: mcCatalogs,
		region: mcInterface,
		labels: state.mcRelease === 'next' ? mcInterface : mcModel,
		labelsFrom: state.mcRelease === 'next' ? 'interface locale' : modelTag ? 'model.language' : 'en-US, since the model names no language',
		catalogLoad: state.build === 'bundle'
			? 'every catalog is inlined in the bundle the bundle service builds'
			: state.build === 'iife'
				? "the element's own IIFE build carries en-US only"
				: mcInterface === 'en-US' ? 'nothing loads: en-US is static' : `the ${mcInterface} catalog loads as its own chunk`
	};

	// 6. Read-aloud: TTSService's language order and the transport table, documented.
	const runtimeLanguage = state.runtimeContentLanguage ? state.content : undefined;
	const pinned = state.transport === 'custom' && state.pinnedLangId ? state.pinnedLangId : undefined;
	const readFor = (nearest: LangAttrs | null) => {
		const steps = [
			{ source: 'nearest lang attribute', value: nearest?.lang },
			{ source: 'runtime.contentLanguage', value: runtimeLanguage },
			{ source: 'providerOptions.lang_id', value: pinned }
		];
		const winner = steps.find((step) => step.value);
		const contentLanguage = winner?.value;
		const readLocale = contentLanguage ?? (state.toolLanguage || undefined) ?? 'en-US';
		const sent = state.transport === 'browser'
			? `no request; the browser picks a voice for ${contentLanguage ?? 'navigator.language'}`
			: state.transport === 'pie'
				? `language: ${contentLanguage ?? (state.toolLanguage || 'none, so the server reads with its default voice')}`
				: `lang_id: ${pinned ?? contentLanguage ?? (state.toolLanguage || 'en-US')}`;
		return { steps, winner: winner?.source ?? 'none', contentLanguage, readLocale, sent };
	};
	const screenReader = profile.supports.includes('screenReader');
	const readAloud = {
		available: tts,
		screenReader,
		rate: (profile.toolParameters?.textToSpeech as { rate?: number } | undefined)?.rate,
		passage: readFor(nearestPassage),
		item: readFor(nearestItem)
	};

	// 7. Alternates: the sign-language tool's pick, documented. Its package
	// registers a custom element on import, which the CDN player also defines.
	// A card in the requested sign language wins, an unlabelled card is the
	// fallback, and a card in another sign language is never shown.
	const signLang = (signFeature.parameters as { signLang?: string } | undefined)?.signLang;
	const requestedSign = signLang?.trim() || 'ase';
	const exactCard = SIGN_CARDS.find((card) => card.signLang?.toLowerCase() === requestedSign.toLowerCase());
	const alternates = {
		granted: signFeature.granted,
		rule: signFeature.rule,
		reason: signFeature.reason,
		requested: signFeature.granted ? requestedSign : undefined,
		defaulted: signFeature.granted && !signLang,
		available: SIGN_CARDS.map((card) => card.signLang),
		resolved: signFeature.granted ? exactCard?.signLang : undefined,
		keyword: profile.supports.includes('keywordTranslation')
	};

	return { record, profile, dropped, levels, inputDiagnostics, iface, content, element, readAloud, alternates };
}

export type LocalizationTrace = Awaited<ReturnType<typeof traceLocalization>>;
