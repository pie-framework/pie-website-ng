<script lang="ts">
	import { base } from '$app/paths';
	import CodeEditor from '$lib/components/CodeEditor.svelte';
	import Diagram from '$lib/components/Diagram.svelte';
	import ExternalLink from '$lib/components/ExternalLink.svelte';
	import { DOCS } from '$lib/data/links';

	const PP = 'https://github.com/pie-framework/pie-players/blob/develop/';
	const CDN_CSP = `${PP}docs/install/cdn.md#content-security-policy`;
	const FORMATIVE = `${PP}docs/section-player/formative-delivery.md`;
	const MATH_ASSETS = `${PP}docs/item-player/math-rendering.md#mathjax-assets`;

	const obligations = [
		[
			'Style origins',
			'Leave allowed-style-origins unset, or list only the origins the deployment serves CSS from.',
			'#stylesheets'
		],
		[
			'Content Security Policy',
			"Send a per-response nonce with 'strict-dynamic', allow inline styles, and add the origins your loading strategy and tools reach.",
			'#csp'
		],
		[
			'Graded delivery',
			'For proctored or high-stakes delivery: hosted players, models redacted on your server, outcomes your server computes.',
			'#graded-delivery'
		],
		[
			'trust-markup',
			'Keep trust-markup unreachable from page script wherever content is not host-trusted.',
			'#escape-hatches'
		],
		[
			'Element packages',
			'Supply an ElementPackagePolicy where authored configs are less trusted than the delivery tier.',
			'#escape-hatches'
		],
		[
			'Overlays',
			'Accept that authored absolute positioning can paint over the page, or set position: relative on .pie-item-player.',
			'#sanitizer'
		]
	];

	const basePolicy = `default-src 'self';
script-src 'nonce-{per-response}' 'strict-dynamic';
style-src 'self' 'unsafe-inline';
img-src 'self' https: data:;
media-src 'self' https:;
object-src 'none';
base-uri 'none';`;

	const deliveryExample = `sectionPlayer.runtime = {
  player: {
    hosted: true, // implied by backend.delivery; item players load no controllers
    backend: {
      auth: { getToken: async () => await fetchTokenForLearner() },
      delivery: { enabled: true, baseUrl: 'https://api.example.com', assignmentId: 'assignment-1' },
    },
    loaderOptions: {
      // Only these packages may load, whatever an authored config names.
      elementPackagePolicy: {
        allowedPackages: ['@pie-element/multiple-choice@14.0.4', '@pie-element/passage@8.0.4'],
      },
    },
  },
};`;
</script>

<svelte:head>
	<title>Security & CSP - PIE Framework</title>
	<meta
		name="description"
		content="PIE's trust boundary, the sanitizer, graded delivery with hosted players and redacted models, external stylesheets, element package policy, and the Content Security Policy each loading strategy needs."
	/>
</svelte:head>

<div>
	<div class="mb-12">
		<h1 class="text-4xl sm:text-5xl font-bold text-secondary mb-4">Security & CSP</h1>
		<p class="text-xl text-base-content/70 max-w-4xl">
			The players sanitize authored content and leave the page, the transport and the learner record to
			the host. Six things fall to the host because a player cannot enforce them from inside a page it
			does not own.
		</p>
	</div>

	<section class="mb-20 scroll-mt-24" id="checklist">
		<h2 class="text-3xl font-bold text-secondary mb-6">Host checklist</h2>
		<ol class="grid md:grid-cols-2 gap-4">
			{#each obligations as [title, detail, href], index (title)}
				<li class="flex gap-4 p-5 bg-base-100 rounded-box border border-base-300">
					<span
						class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-content font-bold"
						aria-hidden="true">{index + 1}</span
					>
					<div>
						<a {href} class="font-semibold text-secondary hover:text-primary">{title}</a>
						<p class="text-sm text-base-content/70 mt-1">{detail}</p>
					</div>
				</li>
			{/each}
		</ol>
	</section>

	<section class="mb-20 scroll-mt-24" id="trust-boundary">
		<h2 class="text-3xl font-bold text-secondary mb-6">Trust boundary</h2>
		<div class="grid md:grid-cols-3 gap-6">
			<div class="card bg-base-100 shadow-lg border border-base-300">
				<div class="card-body">
					<h3 class="card-title text-success">Host page: trusted</h3>
					<p class="text-sm">
						It supplies <code>config</code>, <code>env</code> and every attribute, and reaches into the
						player's light DOM at will. Nothing in PIE defends against the embedding page.
					</p>
				</div>
			</div>
			<div class="card bg-base-100 shadow-lg border border-base-300">
				<div class="card-body">
					<h3 class="card-title text-error">Authored content: untrusted</h3>
					<p class="text-sm">
						Item and passage markup, their <code>style</code> attributes, stylesheet URLs and inline SVG
						tool icons pass through sanitizers and validators. Models reach elements verbatim, and each
						element sanitizes the rich-content fields it renders.
					</p>
				</div>
			</div>
			<div class="card bg-base-100 shadow-lg border border-base-300">
				<div class="card-body">
					<h3 class="card-title text-warning">Element packages: trusted by default</h3>
					<p class="text-sm">
						<code>config.elements</code> names executable code, so by default authored data selects the
						code that renders it. An <a href="#escape-hatches" class="link link-primary">ElementPackagePolicy</a>
						restricts it.
					</p>
				</div>
			</div>
		</div>
	</section>

	<section class="mb-20 scroll-mt-24" id="sanitizer">
		<h2 class="text-3xl font-bold text-secondary mb-6">Sanitizer</h2>
		<p class="text-lg text-base-content/70 mb-4 max-w-4xl">
			<code>&lt;pie-item-player&gt;</code> renders in light DOM so theme tokens, color schemes and
			font scaling reach authored markup. Authored CSS is therefore not contained, and the sanitizer
			carries the containment. The section, assessment and print players render through the same
			lists.
		</p>
		<div class="grid md:grid-cols-2 gap-6 mb-6">
			<div class="p-5 rounded-box border border-base-300 bg-base-100">
				<h3 class="font-semibold text-error mb-2">Removed</h3>
				<ul class="text-sm space-y-1 list-disc pl-5">
					<li>
						<code>script</code>, <code>iframe</code>, <code>object</code>, <code>embed</code>,
						<code>base</code>, <code>form</code>, <code>meta</code>, <code>link</code>,
						<code>style</code> and SVG <code>foreignObject</code>
					</li>
					<li>Event handler attributes, <code>formaction</code> and <code>xlink:href</code></li>
					<li>URLs with protocols other than http(s)</li>
					<li>
						<code>url()</code>, <code>image-set()</code> and <code>src()</code> in style attributes, and
						<code>position: fixed</code>
					</li>
				</ul>
			</div>
			<div class="p-5 rounded-box border border-base-300 bg-base-100">
				<h3 class="font-semibold text-success mb-2">Kept</h3>
				<ul class="text-sm space-y-1 list-disc pl-5">
					<li>PIE custom elements and the attributes the element contract uses</li>
					<li>MathML</li>
					<li>Element ids, unprefixed, since model lookup depends on them</li>
					<li>
						<code>position: absolute</code>, which MathJax's assistive MathML needs to stay visible to
						screen readers
					</li>
				</ul>
			</div>
		</div>
		<p class="text-base text-base-content/70 max-w-4xl">
			An authored full-viewport absolute overlay can still cover the page. It can neither run script nor
			send data, since scripts, forms, style elements and <code>url()</code> are gone. Setting
			<code>position: relative</code> on <code>.pie-item-player</code> anchors such an overlay to the item,
			which protects host chrome above it.
		</p>
	</section>

	<section class="mb-20 scroll-mt-24" id="graded-delivery">
		<h2 class="text-3xl font-bold text-secondary mb-6">Graded delivery</h2>
		<p class="text-lg text-base-content/70 mb-4 max-w-4xl">
			By default the whole item config reaches the browser, answer keys included, and the element
			controllers run there. That fits practice and formative delivery. <code>env.role</code>,
			<code>env.mode</code> and <code>add-correct-response</code> are public attributes, so any page
			script can ask a loaded controller for the correct response. Graded delivery needs three things
			together.
		</p>

		<Diagram
			name="element-controller-flow"
			width={1028}
			height={724}
			alt="Where the controller runs. By default the authored model, answer key included, reaches the browser and the item player runs the element controller there. In hosted delivery, set with hosted or a delivery backend, a controller on your server sends only view models to the browser."
		/>

		<div class="grid md:grid-cols-3 gap-6 mb-8">
			<div class="card bg-base-100 shadow-lg border border-base-300">
				<div class="card-body">
					<h3 class="card-title text-primary">1. Hosted players</h3>
					<p class="text-sm">
						Set <code>hosted</code> on <code>&lt;pie-item-player&gt;</code>, or enable
						<code>runtime.player.backend.delivery</code> on the section player, which sets it on every
						embedded item player. Hosted players load element bundles without controllers.
					</p>
				</div>
			</div>
			<div class="card bg-base-100 shadow-lg border border-base-300">
				<div class="card-body">
					<h3 class="card-title text-primary">2. Redacted models</h3>
					<p class="text-sm">
						The players pass models through as they receive them and redact nothing. With
						<code>backend.delivery</code>, the PIE API service runs each controller's <code>model()</code>
						and the browser receives models filtered for the learner; any other server strips answer keys
						and rationales itself.
					</p>
				</div>
			</div>
			<div class="card bg-base-100 shadow-lg border border-base-300">
				<div class="card-body">
					<h3 class="card-title text-primary">3. Server outcomes</h3>
					<p class="text-sm">
						Your server runs <code>model()</code> and <code>outcome()</code>. A delivery backend answers
						<code>load</code>, <code>saveSession</code>, <code>model</code> and <code>score</code>; the
						built-in client speaks the PIE API service's routes.
					</p>
				</div>
			</div>
		</div>

		<div class="mb-6">
			<CodeEditor value={deliveryExample} language="javascript" readonly={true} height="340px" />
		</div>
		<p class="text-base text-base-content/70 max-w-4xl">
			The section player's <strong>Check answer</strong> control scores Tries in the browser, so it needs
			an unhosted player. Server-scored practice renders its own control and records each Try through
			<code>SectionController.recordFormativeTry</code>
			(<ExternalLink href={FORMATIVE}>Formative delivery</ExternalLink>). A <code>solution</code> feedback
			policy reveals the answer to a learner who has spent a Try, by design.
		</p>
	</section>

	<section class="mb-20 scroll-mt-24" id="stylesheets">
		<h2 class="text-3xl font-bold text-secondary mb-6">External stylesheets</h2>
		<p class="text-lg text-base-content/70 mb-4 max-w-4xl">
			Items can name stylesheets in <code>config.resources.stylesheets</code>, and hosts add their own
			through <code>external-style-urls</code>. With <code>allowed-style-origins</code> unset, only
			same-origin http(s) URLs load; set, only the listed origins do, the page's own included only when
			listed.
		</p>
		<div class="overflow-x-auto">
			<table class="table">
				<thead>
					<tr><th>Origin</th><th>How it loads</th><th>Reach</th></tr>
				</thead>
				<tbody>
					<tr>
						<td>Same origin</td>
						<td>Fetched and rewritten under <code>.pie-item-player.&lt;scope&gt;</code></td>
						<td>The item only</td>
					</tr>
					<tr>
						<td>Listed cross-origin</td>
						<td>A bare <code>&lt;link rel="stylesheet"&gt;</code>, since it cannot be read to scope</td>
						<td>The whole document</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>

	<section class="mb-20 scroll-mt-24" id="csp">
		<h2 class="text-3xl font-bold text-secondary mb-6">Content Security Policy</h2>
		<p class="text-lg text-base-content/70 mb-4 max-w-4xl">
			The players inject element bundles as <code>&lt;script&gt;</code> tags and the ESM strategy injects
			an import map; neither carries a nonce. <code>'strict-dynamic'</code> admits script that trusted
			script creates, so the nonce on your own player bundle covers every strategy.
		</p>

		<Diagram
			name="csp-origins"
			width={1028}
			height={608}
			alt="Network origins under the base policy. The page's nonced module script admits the player through strict-dynamic. The iife strategy loads bundles from the bundle host and MathJax 3 fonts from unpkg and speech maps from jsDelivr; esm loads element modules, metadata and MathJax assets from the ESM CDN; preloaded loads from the host's own build. Tools add Desmos, GeoGebra, Font Awesome and Roboto; the deployment adds its TTS and scoring endpoints to connect-src."
		/>

		<h3 class="text-2xl font-bold text-primary mb-4" id="base-policy">Base policy</h3>
		<div class="mb-4">
			<CodeEditor value={basePolicy} language="bash" readonly={true} height="190px" />
		</div>
		<ul class="text-base text-base-content/70 max-w-4xl list-disc pl-5 space-y-1 mb-8">
			<li>
				<code>'unsafe-inline'</code> in <code>style-src</code> is required: without it the browser blocks
				authored <code>style</code> attributes and the scoped stylesheets the player appends, and both
				fail silently.
			</li>
			<li><code>img-src</code> and <code>media-src</code> cover authored media and TTS audio.</li>
			<li>
				<code>connect-src</code> also lists the deployment's own endpoints, such as a TTS server or a
				scoring API.
			</li>
			<li><code>'unsafe-eval'</code> is not needed: no first-party code evaluates strings.</li>
			<li>
				Trusted Types are not supported. The players write sanitized markup through
				<code>innerHTML</code>, so <code>require-trusted-types-for 'script'</code> breaks them.
			</li>
		</ul>

		<h3 class="text-2xl font-bold text-primary mb-4" id="strategy-origins">Origins per loading strategy</h3>
		<div class="overflow-x-auto mb-8">
			<table class="table table-zebra">
				<thead>
					<tr><th>Strategy</th><th>Element code from</th><th>Add to the base policy</th></tr>
				</thead>
				<tbody>
					<tr>
						<td><code>iife</code></td>
						<td>
							The bundle host, <code>https://proxy.pie-api.com/bundles/</code> unless
							<code>loaderOptions.bundleHost</code> names another
						</td>
						<td>
							<code>connect-src https://cdn.jsdelivr.net</code> (MathJax 3 speech maps)<br />
							<code>font-src data: https://unpkg.com</code> (MathJax 3 fonts)
						</td>
					</tr>
					<tr>
						<td><code>esm</code></td>
						<td>
							<code>https://cdn.jsdelivr.net</code>, or <code>loaderOptions.esmCdnUrl</code>; with the esm.sh
							provider, <code>https://raw.esm.sh</code>
						</td>
						<td>
							<code>connect-src</code> and <code>font-src data:</code> list the CDN origin, which also
							serves package metadata and MathJax assets
						</td>
					</tr>
					<tr>
						<td><code>preloaded</code></td>
						<td>The host's own bundle</td>
						<td>Nothing for current builds, which serve MathJax from their own output</td>
					</tr>
				</tbody>
			</table>
		</div>

		<h3 class="text-2xl font-bold text-primary mb-4" id="tool-origins">Tools and workers</h3>
		<div class="overflow-x-auto mb-8">
			<table class="table table-zebra">
				<thead>
					<tr><th>Source</th><th>Needs</th></tr>
				</thead>
				<tbody>
					<tr>
						<td>Desmos and GeoGebra calculators</td>
						<td>
							Their vendor scripts, which <code>'strict-dynamic'</code> admits:
							<code>www.desmos.com/api/v1.12/calculator.js</code> and
							<code>www.geogebra.org/apps/deployggb.js</code>
						</td>
					</tr>
					<tr>
						<td>Cortex calculator</td>
						<td>
							<code>data:</code> fonts; <code>'self'</code> in <code>worker-src</code> when the policy sets
							it, and <code>blob:</code> when loaded from a CDN
						</td>
					</tr>
					<tr>
						<td>Toolbar icons and fonts</td>
						<td>
							Font Awesome Free from <code>cdn.jsdelivr.net</code> and Roboto from
							<code>ui.renaissance.com</code> in <code>style-src</code> and <code>font-src</code>, unless the
							page supplies both stylesheets
						</td>
					</tr>
					<tr>
						<td>Math speech</td>
						<td>
							<code>blob:</code> in <code>worker-src</code> when the policy sets it; MathJax starts its speech
							worker only when a learner enables semantic enrichment
						</td>
					</tr>
				</tbody>
			</table>
		</div>

		<h3 class="text-2xl font-bold text-primary mb-4" id="without-strict-dynamic">Without 'strict-dynamic'</h3>
		<p class="text-lg text-base-content/70 mb-4 max-w-4xl">
			Listing hosts instead admits IIFE bundles but refuses the injected import map, and ESM falls back to
			es-module-shims. Measured in Chromium:
		</p>
		<div class="overflow-x-auto mb-6">
			<table class="table">
				<thead>
					<tr>
						<th><code>script-src</code></th>
						<th>IIFE bundle</th>
						<th>Import map</th>
						<th>Unlisted CDN <code>import()</code></th>
					</tr>
				</thead>
				<tbody>
					{#each [["'nonce-…' 'strict-dynamic'", true, true, true], ["'nonce-…'", false, false, true], ["'nonce-…' bundle host", true, false, true], ["'unsafe-inline' bundle host", true, true, false]] as [policy, iife, map, cdn] (policy)}
						<tr>
							<td><code>{policy}</code></td>
							{#each [iife, map, cdn] as ok, i (i)}
								<td class={ok ? 'text-success' : 'text-error'}>{ok ? 'loads' : 'refused'}</td>
							{/each}
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
		<p class="text-base text-base-content/70 max-w-4xl">
			<ExternalLink href="{DOCS.security}#content-security-policy">CSP reference</ExternalLink> ·
			<ExternalLink href={CDN_CSP}>Loading from a CDN</ExternalLink> ·
			<ExternalLink href={MATH_ASSETS}>MathJax assets</ExternalLink>
		</p>
	</section>

	<section class="mb-20 scroll-mt-24" id="escape-hatches">
		<h2 class="text-3xl font-bold text-secondary mb-6">Escape hatches and package policy</h2>
		<p class="text-lg text-base-content/70 mb-6 max-w-4xl">
			Each of these moves a guarantee from PIE to the host that sets it.
		</p>
		<div class="grid md:grid-cols-3 gap-6 mb-6">
			<div class="card bg-base-100 shadow-lg border border-base-300">
				<div class="card-body">
					<h3 class="card-title text-primary"><code>trust-markup</code></h3>
					<p class="text-sm">
						Skips sanitization entirely. It is an observed attribute, so any page script can set it on a
						live player; it belongs only where authored markup is host-trusted code.
					</p>
				</div>
			</div>
			<div class="card bg-base-100 shadow-lg border border-base-300">
				<div class="card-body">
					<h3 class="card-title text-primary"><code>sanitizeMarkup</code></h3>
					<p class="text-sm">
						A property, with no attribute, that replaces the default sanitizer. The replacement owns the
						forbid-lists, the custom-element contract and id preservation.
					</p>
				</div>
			</div>
			<div class="card bg-base-100 shadow-lg border border-base-300">
				<div class="card-body">
					<h3 class="card-title text-primary"><code>ElementPackagePolicy</code></h3>
					<p class="text-sm">
						Off by default. Passed as <code>loaderOptions.elementPackagePolicy</code>, it restricts
						loading to exact package names or <code>name@version</code> specs, with exact versions enforced.
					</p>
				</div>
			</div>
		</div>
		<p class="text-base text-base-content/70 max-w-4xl">
			<a href="{base}/docs/integration/" class="link link-primary">Integration</a> ·
			<ExternalLink href={DOCS.security}>Security reference</ExternalLink>
		</p>
	</section>
</div>
