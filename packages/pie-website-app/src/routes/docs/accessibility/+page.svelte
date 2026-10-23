<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import { base } from '$app/paths';
	import CodeEditor from '$lib/components/CodeEditor.svelte';
	import Diagram from '$lib/components/Diagram.svelte';
	import ExternalLink from '$lib/components/ExternalLink.svelte';
	import { DOCS } from '$lib/data/links';

	const PP = 'https://github.com/pie-framework/pie-players/blob/develop/';
	const BASELINE = `${PP}docs/wcag/wcag-2.2-aa-baseline.md`;
	const DEFERRED = `${PP}docs/wcag/deferred-issues.md`;
	const PNP = `${PP}packages/assessment-toolkit/docs/PNP_CONFIGURATION.md`;
	const CATALOGS = `${PP}docs/accessibility/accessibility-catalogs-integration-guide.md`;
	const TTS_AUTHORING = `${PP}docs/accessibility/tts-authoring-guide.md`;
	const TTS_ARCH = `${PP}docs/accessibility/tts-architecture.md`;
	const SIGN = `${PP}packages/tool-sign-language/README.md`;
	const DICTATION = `${PP}docs/tools-and-accomodations/non-embedded-dictation.md`;
	const AUDIO = `${PP}docs/prds/audio-accommodations.md`;

	const pnpExample = `const assessment = {
  identifier: 'grade-5-math',
  personalNeedsProfile: {
    supports: ['spoken', 'calculator-on-screen', 'line-reader'],
    prohibitedSupports: ['dictionary-on-screen'],
  },
  sections: [/* … */],
};`;

	const catalogExample = `<p data-catalog-idref="stem-1">What is the area of the rectangle?</p>

accessibility: {
  catalogs: [
    {
      identifier: 'stem-1',
      cards: [
        { catalog: 'spoken', language: 'en-US',
          content: '<speak>What is the <emphasis>area</emphasis> of the rectangle?</speak>' },
        { catalog: 'sign-language', language: 'ase', // ASL
          payload: {
            media: {
              version: 1, id: 'stem-1-asl', kind: 'video',
              sources: [{ src: 'https://cdn.example.org/stem-1-asl.mp4', type: 'video/mp4' }],
            },
          } },
      ],
    },
  ],
}`;

	const supportRows = [
		['spoken', 'textToSpeech'],
		['calculator-on-screen', 'calculator'],
		['answer-masking', 'answerEliminator'],
		['dictionary-on-screen', 'dictionary'],
		['line-reader', 'lineReader'],
		['sign-language', 'signLanguage'],
		['transcript', 'transcript']
	];

	const ttsRows = [
		['Browser speech', 'Sentence', 'No server; voices vary by browser and OS'],
		['Amazon Polly', 'Word', '@pie-players/tts-server-polly'],
		['Google Cloud TTS', 'Word (Standard, WaveNet); sentence (Studio)', '@pie-players/tts-server-google'],
		['SchoolCity', 'Word', '@pie-players/tts-server-sc, through a custom transport'],
		['Your own', 'Word or sentence', '@pie-players/tts-server-core']
	];

	const checklist = [
		['Keyboard', 'Every interaction works from the keyboard, with arrow keys inside composite controls.'],
		['Screen readers', 'Semantic markup, ARIA roles and labels, and live regions for feedback and status.'],
		['Focus', 'A logical focus order and a visible focus indicator.'],
		['Target size', 'Controls are at least 24 by 24 CSS pixels, or spaced as WCAG 2.5.8 allows.'],
		['Reflow and zoom', 'No horizontal scroll at 320 px; wide images and tables scroll in their own region at 400% zoom.'],
		['Color schemes', 'Every element takes its colors from theme tokens, so a scheme reaches it.']
	];
</script>

<Seo title="Accessibility - PIE Framework" description="PIE accessibility, learner profiles, read-aloud and content alternatives, with WCAG test coverage and known issues." />

<div>
	<div class="mb-12">
		<h1 class="text-4xl sm:text-5xl font-bold text-secondary mb-4">Accessibility</h1>
		<p class="text-xl text-base-content/70 max-w-4xl">
			PIE targets WCAG 2.2 AA. Learner profiles control supports such as read-aloud, content alternatives,
			color schemes and assessment tools.
		</p>
	</div>

	<section class="mb-20 scroll-mt-24" id="standards">
		<h2 class="text-3xl font-bold text-secondary mb-6">Standards and status</h2>
		<p class="text-lg text-base-content/70 mb-6 max-w-4xl">
			The players and elements are reviewed against a WCAG 2.2 AA
			<ExternalLink href={BASELINE}>baseline</ExternalLink>. Automated axe checks run against every
			element and the item, section and assessment players. A full manual pass with VoiceOver, NVDA and
			JAWS has not happened yet; open findings are tracked in the
			<ExternalLink href={DEFERRED}>deferred-issues register</ExternalLink>.
		</p>
		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
			{#each checklist as [title, detail] (title)}
				<div class="p-4 bg-base-100 rounded-lg border border-base-300">
					<h3 class="font-semibold text-primary mb-1">{title}</h3>
					<p class="text-sm text-base-content/80">{detail}</p>
				</div>
			{/each}
		</div>
	</section>

	<section class="mb-20 scroll-mt-24" id="pnp">
		<h2 class="text-3xl font-bold text-secondary mb-6">Personal needs profile</h2>
		<p class="text-lg text-base-content/70 mb-4 max-w-4xl">
			A learner's accommodations arrive as an AfA PNP 3.0 profile on the assessment. The toolkit maps
			each support to the tool that delivers it; an id it does not know raises a
			<code>tool-policy.unknownSupportId</code> diagnostic.
		</p>
		<div class="grid lg:grid-cols-2 gap-6 mb-4">
			<CodeEditor value={pnpExample} language="javascript" readonly={true} height="190px" />
			<div class="overflow-x-auto">
				<table class="table table-zebra table-sm">
					<thead><tr><th>PNP support</th><th>Tool</th></tr></thead>
					<tbody>
						{#each supportRows as [support, tool] (support)}
							<tr><td><code>{support}</code></td><td><code>{tool}</code></td></tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>
		<p class="text-base text-base-content/70 max-w-4xl">
			How a support combines with tool placement, district policy and test-administration overrides is
			the toolkit's <a href="{base}/docs/toolkit/#policy" class="link link-primary">tool policy</a>.
			<ExternalLink href={PNP}>PNP configuration</ExternalLink>
		</p>
	</section>

	<section class="mb-20 scroll-mt-24" id="read-aloud">
		<h2 class="text-3xl font-bold text-secondary mb-6">Read-aloud</h2>
		<p class="text-lg text-base-content/70 mb-4 max-w-4xl">
			The text-to-speech tool reads the item's content region, highlighting as it speaks. Math is spoken
			through speech-rule-engine, with ClearSpeak for English and MathSpeak otherwise. Mark anything that
			must stay silent with <code>data-tts-suppress</code>; the QTI importers map
			<code>data-qti-suppress-tts</code> onto it.
		</p>
		<div class="overflow-x-auto mb-6">
			<table class="table table-zebra">
				<thead><tr><th>Provider</th><th>Highlighting</th><th>Package</th></tr></thead>
				<tbody>
					{#each ttsRows as [provider, highlight, pkg] (provider)}
						<tr>
							<td class="font-semibold">{provider}</td>
							<td>{highlight}</td>
							<td><code class="text-xs">{pkg}</code></td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
		<Diagram
			name="tts-architecture"
			width={1028}
			height={850}
			alt="TTS architecture: the inline TTS tool and annotation toolbar call the toolkit coordinator's TTSService, which takes spoken catalog cards from the catalog resolver and drives the active provider. BrowserTTSProvider uses the Web Speech API; ServerTTSProvider posts text to a host-run TTS server whose Polly, Google or SC adapter extends BaseTTSProvider and returns audio with speech marks. Word boundaries go to the HighlightCoordinator, which uses the CSS Custom Highlight API."
		/>
		<p class="text-base text-base-content/70 max-w-4xl">
			Server providers run on a route your backend hosts, <code>/api/tts</code> by default, so credentials
			never reach the browser. If the server client cannot initialize, a <code>provider-init</code>
			framework error is raised and read-aloud falls back to browser speech. Highlighting uses the CSS
			Custom Highlight API. <ExternalLink href={TTS_AUTHORING}>TTS authoring guide</ExternalLink> ·
			<ExternalLink href={TTS_ARCH}>TTS architecture</ExternalLink>
		</p>
	</section>

	<section class="mb-20 scroll-mt-24" id="catalogs">
		<h2 class="text-3xl font-bold text-secondary mb-6">Accessibility catalogs</h2>
		<p class="text-lg text-base-content/70 mb-4 max-w-4xl">
			A catalog holds authored alternates for one piece of content, in the QTI 3.0 model. Content points
			at a catalog with <code>data-catalog-idref</code>; each card in it is one alternate of one type and
			language.
		</p>
		<div class="mb-6">
			<CodeEditor value={catalogExample} language="javascript" readonly={true} height="400px" />
		</div>
		<div class="grid md:grid-cols-2 gap-6 mb-6">
			<div class="card bg-base-100 shadow-lg border border-base-300">
				<div class="card-body">
					<h3 class="card-title text-primary">Card types</h3>
					<p class="text-sm">
						<code>spoken</code>, <code>sign-language</code>, <code>transcript</code>, <code>braille</code>,
						<code>tactile</code>, <code>simplified-language</code>, <code>audio-description</code> and
						<code>extended-description</code>, plus your own under an <code>ext:</code> prefix. A
						<code>spoken</code> card carries SSML or a recording; a <code>sign-language</code> card
						carries its video as a <code>payload</code>.
					</p>
				</div>
			</div>
			<div class="card bg-base-100 shadow-lg border border-base-300">
				<div class="card-body">
					<h3 class="card-title text-primary">Lookup</h3>
					<p class="text-sm">
						The resolver looks in the element that owns the reference, then the item, then the
						assessment's <code>accessibility.catalogs</code>. Within a catalog it tries the content
						language, a widened tag, the default language, then any card of the type. Authored catalogs
						win over ones extracted from embedded SSML.
					</p>
				</div>
			</div>
		</div>
		<p class="text-base text-base-content/70 max-w-4xl">
			Extracting embedded <code>&lt;speak&gt;</code> markup into catalogs is a step the host runs when it
			stores content, not at delivery. <ExternalLink href={CATALOGS}>Catalogs integration guide</ExternalLink>
		</p>
	</section>

	<section class="mb-20 scroll-mt-24" id="alternates">
		<h2 class="text-3xl font-bold text-secondary mb-6">Signed video, transcripts and dictation</h2>
		<div class="grid md:grid-cols-3 gap-6">
			<div class="card bg-base-100 shadow-lg border border-base-300">
				<div class="card-body">
					<h3 class="card-title text-primary">Sign language</h3>
					<p class="text-sm">
						<code>@pie-players/pie-tool-sign-language</code> plays an item's or passage's
						<code>sign-language</code> card, docked beside the content. It needs the
						<code>signLanguage</code> grant and is registered by the host. The card matches the requested
						sign language exactly, then an unlabeled card; one sign language never substitutes for
						another. <ExternalLink href={SIGN}>README</ExternalLink>
					</p>
				</div>
			</div>
			<div class="card bg-base-100 shadow-lg border border-base-300">
				<div class="card-body">
					<h3 class="card-title text-primary">Transcripts</h3>
					<p class="text-sm">
						A <code>transcript</code> card renders in a region before the content. With
						<code>visibility: "always"</code> it shows to every learner; otherwise it needs the
						<code>transcript</code> grant. Learner control over audio autoplay is planned.
						<ExternalLink href={AUDIO}>Audio accommodations</ExternalLink>
					</p>
				</div>
			</div>
			<div class="card bg-base-100 shadow-lg border border-base-300">
				<div class="card-body">
					<h3 class="card-title text-primary">Dictation</h3>
					<p class="text-sm">
						Operating-system and assistive-technology dictation works in text-entry elements and is
						verified against extended text entry. Built-in speech-to-text is planned and not scheduled.
						<ExternalLink href={DICTATION}>Non-embedded dictation</ExternalLink>
					</p>
				</div>
			</div>
		</div>
		<p class="text-base text-base-content/70 mt-6 max-w-4xl">
			The dictionary and picture dictionary tools call a lookup function or endpoint the host supplies;
			PIE ships no dictionary service. Color schemes and font scaling are covered under
			<a href="{base}/docs/theming/" class="link link-primary">Theming</a>, and the language of the
			interface and of read-aloud under
			<a href="{base}/docs/localization/" class="link link-primary">Localization</a>.
		</p>
	</section>

	<section class="mb-20 scroll-mt-24" id="reference">
		<h2 class="text-3xl font-bold text-secondary mb-6">Reference</h2>
		<p class="text-base text-base-content/70 max-w-4xl">
			<ExternalLink href={DOCS.accessibility}>Accessibility docs index</ExternalLink> ·
			<ExternalLink href={BASELINE}>WCAG 2.2 AA baseline</ExternalLink> ·
			<ExternalLink href={CATALOGS}>Catalogs guide</ExternalLink> ·
			<ExternalLink href={PNP}>PNP configuration</ExternalLink>
		</p>
	</section>
</div>
