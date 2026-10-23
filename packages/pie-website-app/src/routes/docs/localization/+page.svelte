<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import { base } from '$app/paths';
	import CodeEditor from '$lib/components/CodeEditor.svelte';
	import Diagram from '$lib/components/Diagram.svelte';
	import ExternalLink from '$lib/components/ExternalLink.svelte';

	const PP = 'https://github.com/pie-framework/pie-players/blob/develop/';
	const I18N_DESIGN = `${PP}docs/architecture/internationalization.md`;
	const I18N_README = `${PP}packages/players-shared/src/i18n/README.md`;
	const SECTION_README = `${PP}packages/section-player/README.md`;

	const localeExample = `<pie-item-player locale="nl-NL"></pie-item-player>
<pie-section-player-splitpane locale="nl-NL"></pie-section-player-splitpane>
<pie-assessment-toolkit locale="nl-NL" content-language="en-US">…</pie-assessment-toolkit>`;

	const customExample = `import { createPieI18n } from '@pie-players/pie-players-shared/i18n';

// A locale PIE ships no catalog for is honored; missing keys fall back to English.
const i18n = createPieI18n({
  locale: 'cy-GB',
  customMessages: { 'cy-GB': { common: { close: 'Cau' } } },
});`;

	const tagRows = [
		['nl-NL', 'nl-NL', 'exact match'],
		['nl_NL', 'nl-NL', 'POSIX form normalized'],
		['nl-BE', 'nl-NL', 'primary subtag widened'],
		['nl', 'nl-NL', 'primary subtag widened'],
		['cy-GB', 'cy-GB', 'honored; your messages, then English'],
		['(unset)', 'en-US', 'the browser locale is never read']
	];
</script>

<Seo title="Localization - PIE Framework" description="Interface locale for PIE players and tools, content language for read-aloud and catalog cards, and in-item language alternates." />

<div>
	<div class="mb-12">
		<h1 class="text-4xl sm:text-5xl font-bold text-secondary mb-4">Localization</h1>
		<p class="text-xl text-base-content/70 max-w-4xl">
			Set the interface language, content language and authored translations separately.
			Changing the player's language does not translate question content.
		</p>
	</div>

	<section class="mb-20 scroll-mt-24" id="channels">
		<h2 class="text-3xl font-bold text-secondary mb-6">Three channels</h2>

		<Diagram
			name="localization-channels"
			width={1028}
			height={568}
			alt="Three language channels. The host's locale attribute sets the interface locale for players, toolbars, tool panels and aria-labels. The content language, from a lang attribute in the content or the toolkit's content-language, sets the read-aloud voice and picks catalog cards. In-item alternates are accessibility catalog cards in the item: keyword and item translations and sign language. Elements localize their own labels from model.language."
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
						<td>Player status and errors, toolbar labels, tool panels, <code>aria-label</code>s, debug panels</td>
						<td><code>language-of-interface</code></td>
					</tr>
					<tr>
						<td class="font-semibold">Content language</td>
						<td>
							<code>lang</code> in the content, else the toolkit's <code>content-language</code> or the section
							player's <code>runtime.contentLanguage</code>
						</td>
						<td>The read-aloud voice and which catalog cards apply</td>
						<td>Declared by the content</td>
					</tr>
					<tr>
						<td class="font-semibold">In-item alternates</td>
						<td>Accessibility catalog cards authored in the item</td>
						<td>Translated keywords and items, signed video</td>
						<td>
							<code>keyword-translation</code>, <code>item-translation</code>, <code>sign-language</code>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>

	<section class="mb-20 scroll-mt-24" id="interface-locale">
		<h2 class="text-3xl font-bold text-secondary mb-6">Interface locale</h2>
		<p class="text-lg text-base-content/70 mb-4 max-w-4xl">
			Set <code>locale</code> on the item player, each section player layout or the toolkit. Unset,
			everything renders English. PIE ships <code>en-US</code>, the source catalog, and a complete
			<code>nl-NL</code>; other locales load as separate chunks, so English pages carry no other catalog.
			Changing the attribute re-renders the interface in place, with no reload.
		</p>
		<div class="mb-6">
			<CodeEditor value={localeExample} language="html" readonly={true} height="90px" />
		</div>

		<h3 class="text-2xl font-bold text-primary mb-4" id="tag-resolution">Tag resolution</h3>
		<p class="text-lg text-base-content/70 mb-4 max-w-4xl">
			Tags resolve by RFC 4647 lookup, then by widening to the primary subtag.
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
			<code>customMessages</code> adds a locale or overrides shipped keys one at a time, so renaming a
			label needs no fork. Plurals use <code>Intl.PluralRules</code> with the CLDR categories.
		</p>
		<div class="mb-4">
			<CodeEditor value={customExample} language="javascript" readonly={true} height="150px" />
		</div>
		<p class="text-base text-base-content/70 max-w-4xl">
			The players set <code>lang</code> and <code>dir</code> on their own interface subtree and leave the
			document's alone. Tools registered by a host name their labels with <code>nameKey</code> and
			<code>descriptionKey</code>, so they localize with the rest. A coverage check in CI keeps every
			shipped catalog complete.
		</p>
		<div class="alert mt-4 max-w-4xl">
			<span>
				Three tools still render some English outside the catalog: the dictionary and picture
				dictionary panels, and the answer eliminator's per-choice labels. Their toolbar buttons are
				localized.
			</span>
		</div>
	</section>

	<section class="mb-20 scroll-mt-24" id="content-language">
		<h2 class="text-3xl font-bold text-secondary mb-6">Content language</h2>
		<p class="text-lg text-base-content/70 mb-4 max-w-4xl">
			Content language decides what read-aloud speaks in and which catalog cards apply. A
			<code>lang</code> attribute in the markup wins; content without one takes the toolkit's
			<code>content-language</code> or the section player's <code>runtime.contentLanguage</code>, which
			default to <code>en-US</code>. The interface locale never sets it, so a Dutch interface can read
			English content in an English voice.
		</p>
		<div class="overflow-x-auto mb-4">
			<table class="table table-zebra">
				<thead><tr><th>TTS provider</th><th>How the language reaches it</th></tr></thead>
				<tbody>
					<tr>
						<td>Browser speech</td>
						<td>The configured voice, else a voice for the content language, else the browser's language</td>
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
			Content language does not yet reach the elements themselves: they receive no locale through
			<code>env</code>, and the players set no <code>lang</code> on the content subtree. Speech-to-text
			language is also not built.
		</p>
	</section>

	<section class="mb-20 scroll-mt-24" id="alternates">
		<h2 class="text-3xl font-bold text-secondary mb-6">In-item alternates</h2>
		<p class="text-lg text-base-content/70 mb-4 max-w-4xl">
			An item carries alternates as accessibility catalog cards, each tagged with its
			<code>language</code>. The resolver tries the content language, widening <code>es-MX</code> to
			<code>es</code>, then the default language, then any card of that type. A sign-language card is chosen by its card <code>language</code>;
			PIE never infers a sign language from a spoken one and never substitutes one sign language for
			another.
		</p>
		<p class="text-base text-base-content/70 max-w-4xl">
			<a href="{base}/docs/accessibility/#catalogs" class="link link-primary">Accessibility catalogs</a> cover
			authoring and resolution.
		</p>
	</section>

	<section class="mb-20 scroll-mt-24" id="elements">
		<h2 class="text-3xl font-bold text-secondary mb-6">Element labels</h2>
		<p class="text-lg text-base-content/70 mb-4 max-w-4xl">
			Elements render their own interface text, such as button labels and feedback, in the language
			named by the authored <code>model.language</code>. The pie-elements-ng elements ship English and
			Spanish (<code>en_US</code> and <code>es_ES</code>). That channel is per item and separate from
			the players' <code>locale</code>.
		</p>
		<p class="text-base text-base-content/70 max-w-4xl">
			<ExternalLink href={I18N_DESIGN}>Internationalization design</ExternalLink> ·
			<ExternalLink href={I18N_README}>Interface i18n</ExternalLink> ·
			<ExternalLink href={SECTION_README}>Section player README</ExternalLink>
		</p>
	</section>
</div>
