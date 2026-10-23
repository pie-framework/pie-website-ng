<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import { base } from '$app/paths';
	import CodeEditor from '$lib/components/CodeEditor.svelte';
	import Diagram from '$lib/components/Diagram.svelte';
	import ExternalLink from '$lib/components/ExternalLink.svelte';
	import { DOCS } from '$lib/data/links';

	const PP = 'https://github.com/pie-framework/pie-players/blob/develop/';
	const THEME_README = `${PP}packages/theme/README.md`;
	const TOKEN_REGISTRY = `${PP}packages/theme/README.md#token-registry`;
	const WCAG_MATRIX = `${PP}docs/architecture/pie-727-theming-wcag-matrix.md`;
	const THEME_TOOL = `${PP}packages/tool-color-scheme/README.md`;

	const setupExample = `<script type="module">
  import '@pie-players/pie-theme';
<\/script>

<pie-theme theme="auto" scope="document" scheme="default">
  <pie-section-player-splitpane></pie-section-player-splitpane>
</pie-theme>`;

	const schemeExample = `import { registerPieColorSchemes } from '@pie-players/pie-theme';

const registration = registerPieColorSchemes([
  {
    id: 'district-high-contrast',
    name: 'District High Contrast',
    description: 'District accessibility palette',
    variables: {
      '--pie-background': '#000000',
      '--pie-text': '#ffffff',
      '--pie-primary': '#00ffff',
    },
  },
]);
// <pie-theme scheme="district-high-contrast"> now resolves it.
// registration.unregister() removes only this registration.`;

	const aliasExample = `/* Host stylesheet: let your own chrome follow an active accommodation. */
[data-color-scheme] {
  --color-base-100: var(--pie-background);
  --color-base-content: var(--pie-text);
  --color-primary: var(--pie-primary);
}`;

	const attributeRows = [
		['theme', 'light, dark or auto', 'light'],
		['scope', 'self or document', 'self'],
		['provider', 'a provider id, auto or none', 'auto'],
		['scheme', 'a color-scheme id', 'default (none)'],
		['variables', 'JSON of custom-property overrides', 'none']
	];

	const schemes = [
		'black-on-white',
		'white-on-black',
		'rose-on-green',
		'yellow-on-blue',
		'black-on-rose',
		'light-gray-on-dark-gray',
		'grey-on-light-grey',
		'purple-on-light-green',
		'black-on-violet',
		'yellow-on-navy'
	];

	const fontRows = [
		['normal', '1'],
		['large', '1.25'],
		['xlarge', '1.5'],
		['xxlarge', '1.75']
	];
</script>

<Seo title="Theming - PIE Framework" description="Set PIE colors, themes and font sizes with pie-theme and CSS custom properties." />

<div>
	<header class="mb-10">
		<p class="eyebrow">Guide and reference</p>
		<h1 class="page-title">Theming</h1>
		<p class="page-intro">
			Players, tools and elements use <code>--pie-*</code> CSS custom properties.
			<code>&lt;pie-theme&gt;</code> sets these properties on a container, and its items inherit them,
			including inside shadow DOM.
		</p>
	</header>

	<section class="mb-12" id="pie-theme">
		<h2 class="section-title">The theme element</h2>
		<div class="mb-6">
			<CodeEditor value={setupExample} language="html" readonly={true} height="170px" />
		</div>
		<div class="overflow-x-auto mb-6">
			<table class="table">
				<thead><tr><th>Attribute</th><th>Values</th><th>Default</th></tr></thead>
				<tbody>
					{#each attributeRows as [attr, values, def] (attr)}
						<tr><td><code>{attr}</code></td><td>{values}</td><td>{def}</td></tr>
					{/each}
				</tbody>
			</table>
		</div>
		<p class="guide-prose">
			A mounted <code>&lt;pie-theme&gt;</code> writes its tokens inline, and an inline declaration beats any
			stylesheet rule, so a host stylesheet that sets <code>--pie-*</code> cannot override it. Change tokens
			through <code>variables</code> or a registered scheme. Without the element, the stylesheet-only
			path (<code>tokens.css</code>, <code>color-schemes.css</code>, <code>font-sizes.css</code>) follows the
			normal cascade.
		</p>
	</section>

	<section class="mb-12" id="resolution">
		<h2 class="section-title">Resolution order</h2>
		<p class="guide-prose mb-4">
			Four layers, each overwriting the tokens the one before set: the base theme, the provider adapter's
			output, the resolved color scheme, and explicit <code>variables</code>.
		</p>
		<Diagram
			name="theming-resolution-order"
			width={1028}
			height={696}
			alt="pie-theme resolves four layers in order: the base theme light, dark or auto; provider adapter output such as DaisyUI; the resolved color scheme, ten built in plus registered ones; and explicit variables. The merged tokens are written onto the theme target."
		/>
		<div class="grid md:grid-cols-2 gap-6">
			<div class="rounded-box border border-base-300 bg-base-100">
				<div class="flex flex-col gap-2 p-5">
					<h3 class="font-semibold text-secondary">Provider adapters</h3>
					<p class="text-sm">
						<code>provider</code> decides whether PIE content takes the host's look or PIE's own.
						<code>none</code> keeps the canonical palette, identical in every host. The built-in DaisyUI
						adapter maps DaisyUI's slots onto PIE tokens and raises text pairs to 4.5:1 contrast as it maps.
						<code>registerPieThemeProvider</code> adds an adapter for another design system.
					</p>
				</div>
			</div>
			<div class="rounded-box border border-base-300 bg-base-100">
				<div class="flex flex-col gap-2 p-5">
					<h3 class="font-semibold text-secondary">Token registry</h3>
					<p class="text-sm">
						<code>@pie-players/pie-theme/token-registry.json</code> lists every public token with its owner,
						category and whether color schemes must set it. Registered names and values are part of the
						public surface. <ExternalLink href={TOKEN_REGISTRY}>Token registry</ExternalLink>
					</p>
				</div>
			</div>
		</div>
	</section>

	<section class="mb-12" id="color-schemes">
		<h2 class="section-title">Color schemes</h2>
		<p class="guide-prose mb-4">
			A theme is presentation; a color scheme is an accommodation under WCAG 1.4.1, 1.4.3 and 1.4.11.
			A scheme replaces every color it covers, folds fixed hues such as chart categories into its two
			colors, and recolors authored inline colors in item content so dark ink never lands on a dark page.
			Ten ship built in:
		</p>
		<div class="flex flex-wrap gap-2 mb-6">
			{#each schemes as scheme (scheme)}
				<span class="badge badge-outline badge-lg font-mono text-xs">{scheme}</span>
			{/each}
		</div>
		<p class="guide-prose mb-4">
			A program with its own palettes registers them as partial overlays. Each entry is validated against
			the token registry, and an invalid one is rejected without dropping its siblings. Contrast problems
			come back as warnings on the returned receipt, because the palette is yours: read them.
		</p>
		<div class="mb-6">
			<CodeEditor value={schemeExample} language="javascript" readonly={true} height="280px" />
		</div>
		<p class="guide-prose">
			Learners choose a scheme with the <ExternalLink href={THEME_TOOL}>theme tool</ExternalLink>, a
			section-level toolkit tool that sets <code>scheme</code> on the nearest <code>&lt;pie-theme&gt;</code>
			and keeps the choice per attempt through the toolkit's tool-state hooks.
		</p>
	</section>

	<section class="mb-12" id="host-chrome">
		<h2 class="section-title">Host chrome</h2>
		<p class="guide-prose mb-4">
			<code>&lt;pie-theme&gt;</code> writes <code>--pie-*</code> tokens only, so switching a theme recolors PIE
			content and leaves your page's own UI alone. To carry an active accommodation into your chrome,
			alias your tokens to PIE's under <code>[data-color-scheme]</code>, which is set only while a scheme
			is active.
		</p>
		<Diagram
			name="theming-token-namespaces"
			width={1028}
			height={518}
			alt="pie-theme writes --pie-* tokens and data-color-scheme onto the theme target, and PIE content inherits them. Host chrome reads the host's own --color-* palette; while a scheme is set, an alias block in the host stylesheet points those tokens at --pie-*."
		/>
		<div class="mb-4">
			<CodeEditor value={aliasExample} language="javascript" readonly={true} height="130px" />
		</div>
		<p class="guide-prose">
			<code>theme="dark"</code> does not darken native controls such as <code>select</code> and scrollbars;
			that stays your page's own <code>color-scheme</code> declaration. A resolved color scheme sets it for
			you.
		</p>
	</section>

	<section class="mb-12" id="font-size">
		<h2 class="section-title">Font size</h2>
		<p class="guide-prose mb-4">
			Set <code>data-font-size</code> on any ancestor of a player, or <code>--pie-font-scale</code> through
			<code>variables</code>. The presets match Learnosity's steps, which accommodation profiles are
			already written against.
		</p>
		<div class="overflow-x-auto">
			<table class="table max-w-md">
				<thead><tr><th>Preset</th><th>Scale</th></tr></thead>
				<tbody>
					{#each fontRows as [preset, scale] (preset)}
						<tr><td><code>{preset}</code></td><td>{scale}</td></tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>

	<section class="mb-12" id="reference">
		<h2 class="section-title">Reference</h2>
		<p class="guide-prose">
			<ExternalLink href={DOCS.theming}>How theming works</ExternalLink> ·
			<ExternalLink href={THEME_README}>Theme README</ExternalLink> ·
			<ExternalLink href={WCAG_MATRIX}>Theming WCAG matrix</ExternalLink> ·
			<a href="{base}/docs/accessibility/" class="link link-primary">Accessibility</a>
		</p>
	</section>
</div>
