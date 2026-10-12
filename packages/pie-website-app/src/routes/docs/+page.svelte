<script lang="ts">
	import { base } from '$app/paths';
	import Diagram from '$lib/components/Diagram.svelte';
	import ExternalLink from '$lib/components/ExternalLink.svelte';
	import { DOCS_NAV } from '$lib/data/docs-nav';
	import { DOCS, REPOS } from '$lib/data/links';

	const groups = DOCS_NAV.filter((group) => group.title !== 'Start here');
</script>

<svelte:head>
	<title>Documentation - PIE Framework</title>
	<meta
		name="description"
		content="PIE documentation: how items, elements, players, the assessment toolkit and your application fit together, and where each part is documented."
	/>
</svelte:head>

<div>
	<div class="mb-12">
		<h1 class="text-4xl sm:text-5xl font-bold text-secondary mb-4">Documentation</h1>
		<p class="text-xl text-base-content/70 max-w-4xl">
			PIE is a set of web components. Items are built from interaction elements, published from
			pie-elements-ng; players render them in your page, and the assessment toolkit adds tools,
			accommodations and read-aloud. Your application keeps content, sessions, scores and policy.
		</p>
	</div>

	<section class="mb-20 scroll-mt-24" id="system">
		<h2 class="text-3xl font-bold text-secondary mb-6">The system</h2>
		<Diagram
			name="system-context"
			width={1028}
			height={764}
			alt="Authors and students use a host application, which embeds the PIE players with an item config, session and policy and receives session-changed. The players load elements from the PIE bundle host as IIFE bundles, from an ESM CDN, or from the host's own build with the preloaded strategy; all are built from the @pie-element packages on npm. Optional services: a host-run TTS server for speech and word timings, and the PIE API service as player backend for content, sessions and scoring."
		/>
	</section>

	<section class="mb-20 scroll-mt-24" id="packages">
		<h2 class="text-3xl font-bold text-secondary mb-6">The packages</h2>
		<p class="text-lg text-base-content/70 mb-4 max-w-4xl">
			Every player package publishes as <code>@pie-players/&lt;name&gt;</code>, all at one shared version.
			Elements publish separately as <code>@pie-element/*</code>.
		</p>
		<Diagram
			name="package-map"
			width={1026}
			height={576}
			alt="Package map. The item, section, assessment and print players depend on the assessment toolkit, which uses tool composition, the 15 pie-tool packages, calculator providers, the TTS client and server-side TTS packages. Everything rests on pie-players-shared, pie-theme, pie-context and the provider contracts. The developer panels are pie-section-player-tools packages."
		/>
	</section>

	<section class="mb-20 scroll-mt-24" id="guides">
		<h2 class="text-3xl font-bold text-secondary mb-6">Guides</h2>
		<div class="space-y-10">
			{#each groups as group (group.title)}
				<div>
					<h3 class="text-sm font-semibold uppercase tracking-wide text-base-content/60 mb-4">
						{group.title}
					</h3>
					<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
						{#each group.pages as page (page.path)}
							<a
								href="{base}{page.path}"
								class="card bg-base-100 shadow-sm border border-base-300 hover:border-primary hover:shadow-md transition"
							>
								<div class="card-body p-5">
									<h4 class="card-title text-primary text-lg">{page.label}</h4>
									<p class="text-sm text-base-content/70">{page.summary}</p>
								</div>
							</a>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</section>

	<section class="mb-20 scroll-mt-24" id="source">
		<h2 class="text-3xl font-bold text-secondary mb-6">Source documentation</h2>
		<p class="text-base text-base-content/70 max-w-4xl">
			These pages summarize; the repositories hold the full references.
			<ExternalLink href={DOCS.gettingStarted}>Getting started</ExternalLink> ·
			<ExternalLink href={DOCS.architecture}>Architecture</ExternalLink> ·
			<ExternalLink href={REPOS.piePlayers}>pie-players</ExternalLink> ·
			<ExternalLink href={REPOS.pieElementsNg}>pie-elements-ng</ExternalLink> ·
			<ExternalLink href={REPOS.pieQti}>pie-qti</ExternalLink>
		</p>
	</section>
</div>
