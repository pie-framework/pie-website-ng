<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import { base } from '$app/paths';
	import CodeEditor from '$lib/components/CodeEditor.svelte';
	import Diagram from '$lib/components/Diagram.svelte';
	import ExternalLink from '$lib/components/ExternalLink.svelte';
	import LocalizationDemo from '$lib/components/demos/LocalizationDemo.svelte';

	const PP = 'https://github.com/pie-framework/pie-players/blob/develop/';
	const PE = 'https://github.com/pie-framework/pie-elements-ng/blob/develop/';
	const I18N_DESIGN = `${PP}docs/architecture/internationalization.md`;
	const I18N_README = `${PP}packages/players-shared/src/i18n/README.md`;
	const GENERATED_README = `${PP}packages/pie-i18n-generated/README.md`;
	const SECTION_README = `${PP}packages/section-player/README.md`;
	const ELEMENTS_I18N_README = `${PE}packages/shared/i18n/README.md`;
	const ELEMENTS_I18N_PRD = `${PE}docs/prds/interface-i18n/PRD.md`;

	const localeExample = `<pie-item-player locale="nl-NL"></pie-item-player>
<pie-section-player-splitpane locale="nl-NL"></pie-section-player-splitpane>
<pie-assessment-toolkit locale="nl-NL" content-language="en-US">…</pie-assessment-toolkit>`;

	const generatedExample = `import {
  BUNDLED_LOCALES,
  createPieI18n,
  loadBundledCatalog,
} from '@pie-players/pie-players-shared/i18n';
import { GENERATED_LOCALES, loadGeneratedCatalog } from '@pie-players/pie-i18n-generated';

const i18n = createPieI18n({
  availableLocales: [...BUNDLED_LOCALES, ...GENERATED_LOCALES],
  // Bundled first, so a reviewed catalog wins over a generated one for the same tag.
  loadCatalog: (locale) => loadBundledCatalog(locale).catch(() => loadGeneratedCatalog(locale)),
});

// The locale attribute still names the locale; the provider only supplies catalogs.
document.querySelector('pie-section-player-splitpane').runtime = { i18n };`;

	const customExample = `import { createPieI18n } from '@pie-players/pie-players-shared/i18n';

// A locale PIE ships no catalog for is honored; missing keys fall back to English.
const i18n = createPieI18n({
  locale: 'de-DE',
  customMessages: { 'de-DE': { common: { close: 'Schließen' } } },
});`;

	const tagRows = [
		['nl-NL', 'nl-NL', 'exact match'],
		['nl_NL', 'nl-NL', 'POSIX form normalized'],
		['nl-BE', 'nl-NL', 'primary subtag widened'],
		['es-MX', 'es', 'primary subtag widened, with the generated tier'],
		['en', 'en-US', 'en-GB and en-AU stay regional, so bare en keeps US English'],
		['de-DE', 'de-DE', 'honored; your messages, then English'],
		['(unset)', 'en-US', 'the browser locale is never read']
	];

	const generatedLocales = ['ar', 'cy', 'en-AU', 'en-GB', 'es', 'fr', 'ja', 'ko', 'pt', 'ro', 'sv', 'th-TH', 'zh'];
</script>

<Seo title="Localization - PIE Framework" description="Interface locale for PIE players, tools and elements, content language for the item and read-aloud, and in-item language alternates." />

<div>
	<header class="mb-10">
		<p class="eyebrow">Guide and reference</p>
		<h1 class="page-title">Localization</h1>
		<p class="page-intro">
			Set the interface language, content language and authored translations separately.
			Changing the player's language does not translate question content.
		</p>
		<p class="guide-prose mt-4">
			This page describes the players' 1.0 prerelease, published under the <code>beta</code> npm tag; see
			<a href="{base}/docs/versioning/" class="link link-primary">Versioning</a>.
		</p>
	</header>

	<section class="mb-12" id="demo">
		<h2 class="section-title">Try it</h2>
		<p class="guide-prose mb-6">
			Build a student's AfA profile, set the administration, the interface locale and the content, and follow
			each decision the framework makes: which tools each toolbar shows and which rule decided it, which
			catalog the interface loads, which <code>lang</code> lands where, what multiple choice labels itself in,
			what read-aloud sends, and which sign-language card resolves. The stages marked <em>Runs</em> execute the
			players' own code in this page; the live player loads the same inputs from the CDN.
		</p>
		<LocalizationDemo />
	</section>

	<section class="mb-12" id="channels">
		<h2 class="section-title">Three channels</h2>

		<Diagram
			name="localization-overview"
			width={979}
			height={684}
			alt="A section player with a Dutch interface and English content, with seven numbered callouts. 1, interface locale: the section toolbar and headers use the players' catalog for nl-NL, set by the locale attribute. 2, content language: the passage text is en-US from lang in the markup; the locale never sets it. 3, AfA profile: read-aloud is granted by the AfA profile and speaks en-US, the content language. 4, AfA profile: the policy allows the calculator, and it shows here because the item carries math. 5, interface locale: multiple choice labels its answer choices from its own catalog, in the players' locale on next builds and in model.language on 14.0.7. 6, content language: the choice text is en-US, the nearest lang in the item markup. 7, AfA profile: signed video shows the card in the profile's sign language, ase if none, else an unlabelled card, else none."
		/>

		<div class="overflow-x-auto">
			<table class="table">
				<thead>
					<tr><th>Channel</th><th>Set by</th><th>Governs</th><th>AfA PNP 3.0</th></tr>
				</thead>
				<tbody>
					<tr>
						<td class="font-semibold">Interface locale</td>
						<td>The <code>locale</code> attribute</td>
						<td>
							Player status and errors, toolbar labels, tool panels, <code>aria-label</code>s, debug panels, and
							the labels of elements that follow it
						</td>
						<td><code>language-of-interface</code></td>
					</tr>
					<tr>
						<td class="font-semibold">Content language</td>
						<td>
							<code>lang</code> in the content or the item's <code>env.locale</code>; for read-aloud, also the
							toolkit's <code>content-language</code> or the section player's <code>runtime.contentLanguage</code>
						</td>
						<td><code>lang</code> and <code>dir</code> on the item content, the read-aloud voice</td>
						<td>Declared by the content</td>
					</tr>
					<tr>
						<td class="font-semibold">AfA profile</td>
						<td>
							The student's AfA record, through the tool policy; alternates are accessibility catalog cards
							authored in the item
						</td>
						<td>
							Which tools each toolbar shows and starts, and which alternate plays: signed video and audio
							transcripts. Translated keywords and items are not built
						</td>
						<td><code>spoken</code>, <code>calculator-on-screen</code>, <code>line-reader</code>, <code>sign-language</code></td>
					</tr>
				</tbody>
			</table>
		</div>

		<h3 class="mt-10 mb-3 text-xl font-semibold text-secondary" id="fallbacks">Fallback order</h3>
		<p class="guide-prose mb-4">
			Each surface resolves its language on its own, from the first source that has a value.
		</p>
		<Diagram
			name="localization-fallbacks"
			width={980}
			height={742}
			alt="Six fallback chains, read left to right; the first source with a value wins. Player text: exact tag by RFC 4647 lookup, then the primary subtag (es-MX to es), then en-US. Element labels: the players' locale on next builds, then the authored model.language, then en-US. Content language: model.language on the element, then lang in the markup, then env.locale on the item, else undeclared; nothing is invented. Read-aloud voice: lang in the markup, then contentLanguage from the runtime or toolkit, then the TTS tool's configured language, then en-US. Spoken alternate card: the read's language, then widened (es-MX to es), then the toolkit default from accessibility.language, then any card of that type. Signed video: the profile's sign language, ase if none, then a card that names no sign language, then nothing. An element looks a tag up in its own catalogs by exact tag, then the same language, else en-US. Multiple choice 14.0.7 takes its labels from model.language and only its region name from the locale. The sign-language tool never falls back to a spoken card or to a card in another sign language."
		/>
	</section>

	<section class="mb-12" id="interface-locale">
		<h2 class="section-title">Interface locale</h2>
		<p class="guide-prose mb-4">
			Set <code>locale</code> on the item player, each section player layout, the toolkit or the assessment
			player, which passes it to the section it shows. Unset,
			everything renders English. The players bundle two reviewed catalogs: <code>en-US</code>, the source,
			and <code>nl-NL</code>. Every catalog other than English loads as a separate chunk, so English pages carry
			no other catalog. Changing the attribute re-renders the interface in place, with no reload.
		</p>
		<div class="mb-6">
			<CodeEditor value={localeExample} language="html" readonly={true} height="90px" />
		</div>

		<h3 class="mb-3 text-xl font-semibold text-secondary" id="generated-locales">Generated locales</h3>
		<p class="guide-prose mb-4">
			<code>@pie-players/pie-i18n-generated</code> adds {generatedLocales.length} machine-generated catalogs:
			{#each generatedLocales as tag, i (tag)}<code>{tag}</code>{i < generatedLocales.length - 2
					? ', '
					: i === generatedLocales.length - 2
						? ' and '
						: ''}{/each}. None has had a native review yet. CI checks their keys, placeholders, plural forms
			and freshness against English, never the quality of the translation.
		</p>
		<p class="guide-prose mb-4">
			Installing the package loads nothing. A host opts in by composing its loaders after the bundled ones
			and handing the provider to the player: the <code>i18n</code> property on the item player and the
			toolkit, or <code>runtime.i18n</code> on a section player layout, which forwards it to the item players
			it mounts. Arabic is the first right-to-left locale; its layout has not been audited.
		</p>
		<div class="mb-8">
			<CodeEditor value={generatedExample} language="javascript" readonly={true} height="300px" />
		</div>

		<h3 class="mb-3 text-xl font-semibold text-secondary" id="tag-resolution">Tag resolution</h3>
		<p class="guide-prose mb-4">
			Tags resolve by RFC 4647 lookup, then by widening to the primary subtag. The generated catalogs
			register under bare tags such as <code>es</code> and <code>fr</code>, so regional requests widen onto
			them.
		</p>
		<div class="overflow-x-auto mb-8">
			<table class="table">
				<thead><tr><th>Requested</th><th>Catalog</th><th>Why</th></tr></thead>
				<tbody>
					{#each tagRows as [requested, catalog, why] (requested)}
						<tr>
							<td><code>{requested}</code></td>
							<td><code>{catalog}</code></td>
							<td>{why}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<h3 class="mb-3 text-xl font-semibold text-secondary" id="custom-messages">Your own messages</h3>
		<p class="guide-prose mb-4">
			<code>customMessages</code> adds a locale or overrides shipped keys one at a time, generated catalogs
			included, so renaming a label needs no fork. Plurals use <code>Intl.PluralRules</code> with the CLDR
			categories.
		</p>
		<div class="mb-4">
			<CodeEditor value={customExample} language="javascript" readonly={true} height="150px" />
		</div>
		<p class="guide-prose">
			The players set <code>lang</code> and <code>dir</code> on their own interface subtree and leave the
			document's alone. Tools registered by a host name their labels with <code>nameKey</code> and
			<code>descriptionKey</code>, so they localize with the rest. A coverage check in CI keeps every
			bundled catalog complete.
		</p>
		<div class="alert mt-4 max-w-4xl">
			<span>
				The answer eliminator's per-choice buttons are still labelled in English. Its toolbar button is
				localized.
			</span>
		</div>
	</section>

	<section class="mb-12" id="content-language">
		<h2 class="section-title">Content language</h2>
		<p class="guide-prose mb-4">
			Content language is the language the item is written in. The interface locale never sets it, so a
			Dutch interface can read English content in an English voice. Nothing invents one either: content that
			declares no language stays undeclared.
		</p>
		<p class="guide-prose mb-4">
			A host declares it on the item's <code>env</code> as <code>locale</code>. The item player reflects it
			onto the item's content root as <code>lang</code> and <code>dir</code>, so a screen reader takes the
			content's pronunciation and right-to-left content lays out right to left, whatever the interface
			locale.
		</p>
		<p class="guide-prose mb-4">
			Read-aloud resolves a language for every read. A <code>lang</code> attribute in the markup wins;
			content without one takes the toolkit's <code>content-language</code>, which a section player host sets
			through <code>runtime.contentLanguage</code>. A read that finds neither uses the TTS tool's configured
			language, then <code>en-US</code>.
		</p>
		<div class="overflow-x-auto mb-4">
			<table class="table">
				<thead><tr><th>TTS provider</th><th>How the language reaches it</th></tr></thead>
				<tbody>
					<tr>
						<td>Browser speech</td>
						<td>The configured voice, else a voice for the content language, else the browser's default</td>
					</tr>
					<tr>
						<td>PIE TTS service (Polly, Google)</td>
						<td>Sent as <code>language</code></td>
					</tr>
					<tr>
						<td>SchoolCity TTS server</td>
						<td>Sent as <code>lang_id</code></td>
					</tr>
				</tbody>
			</table>
		</div>
		<p class="guide-prose">
			Browser speech is the one place the browser's language still shows through, and only when nothing
			names a language. Elements receive <code>env.locale</code> but none reads it yet, so an element's own
			text still follows its interface locale or <code>model.language</code>. Speech-to-text language is
			not built.
		</p>
	</section>

	<section class="mb-12" id="alternates">
		<h2 class="section-title">In-item alternates</h2>
		<p class="guide-prose mb-4">
			An item carries alternates as accessibility catalog cards, each tagged with its
			<code>language</code>. A spoken lookup, such as read-aloud's, tries the language it asks for, widening
			<code>es-MX</code> to <code>es</code>, then the toolkit's default language (<code>en-US</code> unless the
			host sets <code>accessibility.language</code>), then any card of that type.
		</p>
		<p class="guide-prose mb-4">
			The sign-language tool is stricter. It shows the card in the profile's sign language
			(<code>ase</code>, American Sign Language, when the profile names none), else a card that names no
			sign language, else nothing: PIE never infers a sign language from a spoken one and never shows a card
			in another sign language. Signed video and audio transcripts are the alternates that ship; a profile
			that asks for keyword or item translation is reported as <code>tool-policy.unknownSupportId</code> and
			changes nothing in delivery.
		</p>
		<p class="guide-prose">
			<a href="{base}/docs/accessibility/#catalogs" class="link link-primary">Accessibility catalogs</a> cover
			authoring and resolution.
		</p>
	</section>

	<section class="mb-12" id="elements">
		<h2 class="section-title">Element labels</h2>
		<p class="guide-prose mb-4">
			Elements render their own interface text, such as button labels and feedback. Elements moved onto
			<code>@pie-element/shared-i18n</code> follow the players' interface locale: the item player and the
			toolkit publish it to the elements inside them, and such an element renders in it, else in the item's
			authored <code>model.language</code>, else <code>en-US</code>. Multiple choice is the first, together
			with the libraries it renders through. It ships English, a reviewed Spanish, and machine-generated
			<code>nl-NL</code> and the same {generatedLocales.length} locales as the players; its IIFE build ships
			English only. A host renames or adds element strings with <code>registerMessages</code>.
		</p>
		<p class="guide-prose mb-4">
			The other pie-elements-ng elements still render in <code>model.language</code> and ship English and
			Spanish (<code>en_US</code> and <code>es_ES</code>), independent of the players' <code>locale</code>.
			Neither path reads the browser locale.
		</p>
		<p class="guide-prose">
			<ExternalLink href={I18N_DESIGN}>Internationalization design</ExternalLink> ·
			<ExternalLink href={I18N_README}>Interface i18n</ExternalLink> ·
			<ExternalLink href={GENERATED_README}>Generated locales</ExternalLink> ·
			<ExternalLink href={SECTION_README}>Section player README</ExternalLink> ·
			<ExternalLink href={ELEMENTS_I18N_README}>Element i18n</ExternalLink> ·
			<ExternalLink href={ELEMENTS_I18N_PRD}>Element i18n PRD</ExternalLink>
		</p>
	</section>
</div>
