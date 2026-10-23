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
	<div class="mb-12">
		<h1 class="text-4xl sm:text-5xl font-bold text-secondary mb-4">Localization</h1>
		<p class="text-xl text-base-content/70 max-w-4xl">
			Set the interface language, content language and authored translations separately.
			Changing the player's language does not translate question content.
		</p>
		<p class="text-base text-base-content/70 max-w-4xl mt-4">
			This page describes the players' 1.0 prerelease, published under the <code>beta</code> npm tag; see
			<a href="{base}/docs/versioning/" class="link link-primary">Versioning</a>.
		</p>
	</div>

	<section class="mb-20 scroll-mt-24" id="demo">
		<h2 class="text-3xl font-bold text-secondary mb-4">Try it</h2>
		<p class="text-lg text-base-content/70 mb-6 max-w-4xl">
			Build a student's AfA profile, set the administration, the interface locale and the content, and follow
			each decision the framework makes: which tools each toolbar shows and which rule decided it, which
			catalog the interface loads, which <code>lang</code> lands where, what multiple choice labels itself in,
			what read-aloud sends, and which sign-language card resolves. The stages marked <em>Runs</em> execute the
			players' own code in this page; the live player loads the same inputs from the CDN.
		</p>
		<LocalizationDemo />
	</section>

	<section class="mb-20 scroll-mt-24" id="channels">
		<h2 class="text-3xl font-bold text-secondary mb-6">Three channels</h2>

		<Diagram
			name="localization-channels"
			width={1000}
			height={568}
			alt="Three inputs, each resolved on its own. The locale attribute on the players sets the interface locale, matched by exact tag, then its language, then en-US, from bundled, generated and host catalogs; it drives toolbars, tool panels, status, aria-labels and text direction. Lang in the content, from markup lang, env.locale on the item or model.language on an element, sets the content language: the nearest lang wins and the interface locale never sets it; it drives lang and dir on the content and the read-aloud voice and request language. The AfA profile's grants, start-up activation, prohibitions and sign language feed the tool policy, where blocks and restrictions outrank overrides, requirements and the profile; it decides which tools each toolbar shows and the signed video in the profile's sign language. Elements render their own labels: multiple choice follows the interface locale the players publish, then model.language; the other elements use model.language with English and Spanish."
		/>

		<div class="overflow-x-auto">
			<table class="table table-zebra">
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
						<td class="font-semibold">In-item alternates</td>
						<td>Accessibility catalog cards authored in the item</td>
						<td>Signed video and audio transcripts; translated keywords and items are not built</td>
						<td><code>sign-language</code></td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>

	<section class="mb-20 scroll-mt-24" id="interface-locale">
		<h2 class="text-3xl font-bold text-secondary mb-6">Interface locale</h2>
		<p class="text-lg text-base-content/70 mb-4 max-w-4xl">
			Set <code>locale</code> on the item player, each section player layout, the toolkit or the assessment
			player, which passes it to the section it shows. Unset,
			everything renders English. The players bundle two reviewed catalogs: <code>en-US</code>, the source,
			and <code>nl-NL</code>. Every catalog other than English loads as a separate chunk, so English pages carry
			no other catalog. Changing the attribute re-renders the interface in place, with no reload.
		</p>
		<div class="mb-6">
			<CodeEditor value={localeExample} language="html" readonly={true} height="90px" />
		</div>

		<h3 class="text-2xl font-bold text-primary mb-4" id="generated-locales">Generated locales</h3>
		<p class="text-lg text-base-content/70 mb-4 max-w-4xl">
			<code>@pie-players/pie-i18n-generated</code> adds {generatedLocales.length} machine-generated catalogs:
			{#each generatedLocales as tag, i (tag)}<code>{tag}</code>{i < generatedLocales.length - 2
					? ', '
					: i === generatedLocales.length - 2
						? ' and '
						: ''}{/each}. None has had a native review yet. CI checks their keys, placeholders, plural forms
			and freshness against English, never the quality of the translation.
		</p>
		<p class="text-lg text-base-content/70 mb-4 max-w-4xl">
			Installing the package loads nothing. A host opts in by composing its loaders after the bundled ones
			and handing the provider to the player: the <code>i18n</code> property on the item player and the
			toolkit, or <code>runtime.i18n</code> on a section player layout, which forwards it to the item players
			it mounts. Arabic is the first right-to-left locale; its layout has not been audited.
		</p>
		<div class="mb-8">
			<CodeEditor value={generatedExample} language="javascript" readonly={true} height="300px" />
		</div>

		<h3 class="text-2xl font-bold text-primary mb-4" id="tag-resolution">Tag resolution</h3>
		<p class="text-lg text-base-content/70 mb-4 max-w-4xl">
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

		<h3 class="text-2xl font-bold text-primary mb-4" id="custom-messages">Your own messages</h3>
		<p class="text-lg text-base-content/70 mb-4 max-w-4xl">
			<code>customMessages</code> adds a locale or overrides shipped keys one at a time, generated catalogs
			included, so renaming a label needs no fork. Plurals use <code>Intl.PluralRules</code> with the CLDR
			categories.
		</p>
		<div class="mb-4">
			<CodeEditor value={customExample} language="javascript" readonly={true} height="150px" />
		</div>
		<p class="text-base text-base-content/70 max-w-4xl">
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

	<section class="mb-20 scroll-mt-24" id="content-language">
		<h2 class="text-3xl font-bold text-secondary mb-6">Content language</h2>
		<p class="text-lg text-base-content/70 mb-4 max-w-4xl">
			Content language is the language the item is written in. The interface locale never sets it, so a
			Dutch interface can read English content in an English voice. Nothing invents one either: content that
			declares no language stays undeclared.
		</p>
		<p class="text-lg text-base-content/70 mb-4 max-w-4xl">
			A host declares it on the item's <code>env</code> as <code>locale</code>. The item player reflects it
			onto the item's content root as <code>lang</code> and <code>dir</code>, so a screen reader takes the
			content's pronunciation and right-to-left content lays out right to left, whatever the interface
			locale.
		</p>
		<p class="text-lg text-base-content/70 mb-4 max-w-4xl">
			Read-aloud resolves a language for every read. A <code>lang</code> attribute in the markup wins;
			content without one takes the toolkit's <code>content-language</code>, which a section player host sets
			through <code>runtime.contentLanguage</code>. A read that finds neither uses the TTS tool's configured
			language, then <code>en-US</code>.
		</p>
		<div class="overflow-x-auto mb-4">
			<table class="table table-zebra">
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
		<p class="text-base text-base-content/70 max-w-4xl">
			Browser speech is the one place the browser's language still shows through, and only when nothing
			names a language. Elements receive <code>env.locale</code> but none reads it yet, so an element's own
			text still follows its interface locale or <code>model.language</code>. Speech-to-text language is
			not built.
		</p>
	</section>

	<section class="mb-20 scroll-mt-24" id="alternates">
		<h2 class="text-3xl font-bold text-secondary mb-6">In-item alternates</h2>
		<p class="text-lg text-base-content/70 mb-4 max-w-4xl">
			An item carries alternates as accessibility catalog cards, each tagged with its
			<code>language</code>. A spoken lookup, such as read-aloud's, tries the language it asks for, widening
			<code>es-MX</code> to <code>es</code>, then the toolkit's default language (<code>en-US</code> unless the
			host sets <code>accessibility.language</code>), then any card of that type.
		</p>
		<p class="text-lg text-base-content/70 mb-4 max-w-4xl">
			The sign-language tool is stricter. It shows the card in the profile's sign language
			(<code>ase</code>, American Sign Language, when the profile names none), else a card that names no
			sign language, else nothing: PIE never infers a sign language from a spoken one and never shows a card
			in another sign language. Signed video and audio transcripts are the alternates that ship; a profile
			that asks for keyword or item translation is reported as <code>tool-policy.unknownSupportId</code> and
			changes nothing in delivery.
		</p>
		<p class="text-base text-base-content/70 max-w-4xl">
			<a href="{base}/docs/accessibility/#catalogs" class="link link-primary">Accessibility catalogs</a> cover
			authoring and resolution.
		</p>
	</section>

	<section class="mb-20 scroll-mt-24" id="elements">
		<h2 class="text-3xl font-bold text-secondary mb-6">Element labels</h2>
		<p class="text-lg text-base-content/70 mb-4 max-w-4xl">
			Elements render their own interface text, such as button labels and feedback. Elements moved onto
			<code>@pie-element/shared-i18n</code> follow the players' interface locale: the item player and the
			toolkit publish it to the elements inside them, and such an element renders in it, else in the item's
			authored <code>model.language</code>, else <code>en-US</code>. Multiple choice is the first, together
			with the libraries it renders through. It ships English, a reviewed Spanish, and machine-generated
			<code>nl-NL</code> and the same {generatedLocales.length} locales as the players; its IIFE build ships
			English only. A host renames or adds element strings with <code>registerMessages</code>.
		</p>
		<p class="text-lg text-base-content/70 mb-4 max-w-4xl">
			The other pie-elements-ng elements still render in <code>model.language</code> and ship English and
			Spanish (<code>en_US</code> and <code>es_ES</code>), independent of the players' <code>locale</code>.
			Neither path reads the browser locale.
		</p>
		<p class="text-base text-base-content/70 max-w-4xl">
			<ExternalLink href={I18N_DESIGN}>Internationalization design</ExternalLink> ·
			<ExternalLink href={I18N_README}>Interface i18n</ExternalLink> ·
			<ExternalLink href={GENERATED_README}>Generated locales</ExternalLink> ·
			<ExternalLink href={SECTION_README}>Section player README</ExternalLink> ·
			<ExternalLink href={ELEMENTS_I18N_README}>Element i18n</ExternalLink> ·
			<ExternalLink href={ELEMENTS_I18N_PRD}>Element i18n PRD</ExternalLink>
		</p>
	</section>
</div>
