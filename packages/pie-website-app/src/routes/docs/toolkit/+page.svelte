<script lang="ts">
	import { base } from '$app/paths';
</script>

<svelte:head>
	<title>Assessment Toolkit - PIE Framework</title>
	<meta name="description" content="PIE Assessment Toolkit: ToolkitCoordinator, calculator, text-to-speech, annotation, accommodations, and accessibility services for assessment delivery." />
</svelte:head>

<div class="container mx-auto px-4 py-12 max-w-7xl">
	<div class="text-center mb-16">
		<h1 class="text-5xl font-bold text-secondary mb-4">Assessment Toolkit</h1>
		<p class="text-xl text-base-content/70 max-w-3xl mx-auto">
			Composable services for tools, accommodations, and accessibility &mdash; coordinated through a centralized ToolkitCoordinator.
		</p>
	</div>

	<!-- ToolkitCoordinator -->
	<section class="mb-20">
		<h2 class="text-3xl font-bold text-secondary mb-6">ToolkitCoordinator</h2>
		<p class="text-lg text-base-content/70 mb-8 max-w-4xl">
			The toolkit is designed as a toolkit, not a framework &mdash; products use only what they need. Rendering items without tools? Use just the player. Need calculator and ruler? Add those tools. Full accommodation support with TTS, high contrast, and PNP profiles? Integrate the complete toolkit.
		</p>

		<div class="my-8">
			<img
				src="{base}/images/docs/toolkit/pie-toolkit-coordinator.jpg"
				alt="ToolkitCoordinator orchestration of toolkit services and section player integration"
				width="845"
				height="461"
				loading="lazy"
				class="rounded-lg shadow-lg w-full max-w-4xl mx-auto"
			/>
		</div>

		<div class="alert alert-info mb-8">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
			<span>The <strong>ToolkitCoordinator</strong> is the single entry point for initializing and managing all toolkit services. Products construct one coordinator per assessment context, configure tools and providers, and pass it to the section player. The coordinator owns all services as public properties.</span>
		</div>

		<p class="text-base-content/70 mb-4">
			When connected to the section player, the toolkit automatically handles:
		</p>
		<ul class="space-y-2 mb-8">
			<li class="flex items-start gap-3">
				<svg class="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
				<span>SSML extraction from passages and items for text-to-speech</span>
			</li>
			<li class="flex items-start gap-3">
				<svg class="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
				<span>Accessibility catalog lifecycle (add on load, clear on navigation)</span>
			</li>
			<li class="flex items-start gap-3">
				<svg class="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
				<span>TTS tools rendered inline in passage and item headers</span>
			</li>
			<li class="flex items-start gap-3">
				<svg class="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
				<span>Z-index layering coordination for overlapping tools</span>
			</li>
			<li class="flex items-start gap-3">
				<svg class="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
				<span>Text highlighting synchronized with TTS playback</span>
			</li>
		</ul>
	</section>

	<!-- Tool Placement -->
	<section class="mb-20">
		<h2 class="text-3xl font-bold text-secondary mb-6">Tool Placement</h2>
		<p class="text-lg text-base-content/70 mb-8 max-w-4xl">
			Tools are placed at three levels &mdash; section, item, and passage &mdash; each with its own toolbar scope. The ToolkitCoordinator drives which tools appear where based on a placement configuration.
		</p>

		<div class="my-8">
			<img
				src="{base}/images/docs/toolkit/pie-tool-placement-levels.jpg"
				alt="Tool placement levels: section toolbar, per-item toolbars, and per-passage toolbars"
				width="845"
				height="461"
				loading="lazy"
				class="rounded-lg shadow-lg w-full max-w-4xl mx-auto"
			/>
		</div>

		<div class="grid md:grid-cols-3 gap-6">
			<div class="card bg-primary/5 border border-primary/20">
				<div class="card-body">
					<h4 class="font-bold text-primary mb-2">Section Level</h4>
					<p class="text-sm text-base-content/70 mb-3">
						Available across all items in the section. Typically reference tools that persist while the student works through the page.
					</p>
					<div class="flex flex-wrap gap-2">
						<span class="badge badge-outline badge-sm">Calculator</span>
						<span class="badge badge-outline badge-sm">Graph</span>
						<span class="badge badge-outline badge-sm">Ruler</span>
						<span class="badge badge-outline badge-sm">Protractor</span>
						<span class="badge badge-outline badge-sm">Periodic Table</span>
					</div>
				</div>
			</div>

			<div class="card bg-secondary/5 border border-secondary/20">
				<div class="card-body">
					<h4 class="font-bold text-secondary mb-2">Item Level</h4>
					<p class="text-sm text-base-content/70 mb-3">
						A playback button or control in each item header. Tools that operate on a specific question's content.
					</p>
					<div class="flex flex-wrap gap-2">
						<span class="badge badge-outline badge-sm">Text-to-Speech</span>
						<span class="badge badge-outline badge-sm">Answer Eliminator</span>
						<span class="badge badge-outline badge-sm">Calculator</span>
					</div>
				</div>
			</div>

			<div class="card bg-base-200 border border-base-300">
				<div class="card-body">
					<h4 class="font-bold mb-2">Passage Level</h4>
					<p class="text-sm text-base-content/70 mb-3">
						Tools that let students interact with reading content &mdash; highlighting, annotation, and playback.
					</p>
					<div class="flex flex-wrap gap-2">
						<span class="badge badge-outline badge-sm">Text-to-Speech</span>
						<span class="badge badge-outline badge-sm">Annotation</span>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Tool Categories -->
	<section class="mb-20">
		<h2 class="text-3xl font-bold text-secondary mb-6">Tool Categories</h2>

		<div class="grid md:grid-cols-3 gap-8">
			<div>
				<h3 class="text-xl font-bold text-primary mb-4">Reference Tools</h3>
				<p class="text-sm text-base-content/70 mb-4">Utilities for calculations and measurements</p>
				<ul class="space-y-3">
					<li class="flex items-start gap-2">
						<span class="text-primary font-bold flex-shrink-0">&bull;</span>
						<div>
							<strong>Calculator</strong> &mdash; Scientific and graphing modes (Desmos integration)
						</div>
					</li>
					<li class="flex items-start gap-2">
						<span class="text-primary font-bold flex-shrink-0">&bull;</span>
						<div>
							<strong>Ruler</strong> &mdash; Metric and imperial with drag, rotation, and snap-to-grid
						</div>
					</li>
					<li class="flex items-start gap-2">
						<span class="text-primary font-bold flex-shrink-0">&bull;</span>
						<div>
							<strong>Protractor</strong> &mdash; Angle measurement with center origin alignment
						</div>
					</li>
					<li class="flex items-start gap-2">
						<span class="text-primary font-bold flex-shrink-0">&bull;</span>
						<div>
							<strong>Graph</strong> &mdash; Interactive coordinate plane
						</div>
					</li>
					<li class="flex items-start gap-2">
						<span class="text-primary font-bold flex-shrink-0">&bull;</span>
						<div>
							<strong>Periodic Table</strong> &mdash; Chemistry reference
						</div>
					</li>
				</ul>
			</div>

			<div>
				<h3 class="text-xl font-bold text-primary mb-4">Accessibility Tools</h3>
				<p class="text-sm text-base-content/70 mb-4">Supporting students with diverse needs</p>
				<ul class="space-y-3">
					<li class="flex items-start gap-2">
						<span class="text-primary font-bold flex-shrink-0">&bull;</span>
						<div>
							<strong>Line Reader</strong> &mdash; Masks content to highlight individual lines
						</div>
					</li>
					<li class="flex items-start gap-2">
						<span class="text-primary font-bold flex-shrink-0">&bull;</span>
						<div>
							<strong>Color Schemes</strong> &mdash; High-contrast and accessibility overlays
						</div>
					</li>
					<li class="flex items-start gap-2">
						<span class="text-primary font-bold flex-shrink-0">&bull;</span>
						<div>
							<strong>Theme</strong> &mdash; Student-facing light/dark mode toggle
						</div>
					</li>
					<li class="flex items-start gap-2">
						<span class="text-primary font-bold flex-shrink-0">&bull;</span>
						<div>
							<strong>Text-to-Speech</strong> &mdash; Word-level highlighting synchronized to audio (Web Speech API, AWS Polly, Google TTS)
						</div>
					</li>
				</ul>
			</div>

			<div>
				<h3 class="text-xl font-bold text-primary mb-4">Student Support</h3>
				<p class="text-sm text-base-content/70 mb-4">Enhancing comprehension and interaction</p>
				<ul class="space-y-3">
					<li class="flex items-start gap-2">
						<span class="text-primary font-bold flex-shrink-0">&bull;</span>
						<div>
							<strong>Annotation Toolbar</strong> &mdash; Highlight text in multiple colors, create underlines and notes
						</div>
					</li>
					<li class="flex items-start gap-2">
						<span class="text-primary font-bold flex-shrink-0">&bull;</span>
						<div>
							<strong>Answer Eliminator</strong> &mdash; Cross out multiple-choice options to narrow choices
						</div>
					</li>
				</ul>
				<div class="mt-6 p-4 bg-base-200 rounded-lg">
					<p class="text-sm text-base-content/70">
						Each tool is a Web Component, usable independently or composed into toolbars. The toolkit treats tools and accommodations uniformly &mdash; same placement model, same lifecycle. The policy distinction (which student sees which tools) is the host application's responsibility.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Service Architecture -->
	<section class="mb-20">
		<h2 class="text-3xl font-bold text-secondary mb-6">Service Architecture</h2>
		<p class="text-lg text-base-content/70 mb-8 max-w-4xl">
			The ToolkitCoordinator manages five core services that work together, plus additional resolvers and theming infrastructure.
		</p>

		<div class="grid md:grid-cols-2 gap-6 mb-8">
			<div class="card bg-base-100 shadow border border-base-300">
				<div class="card-body">
					<h4 class="font-bold text-primary text-lg mb-2">ToolCoordinator</h4>
					<p class="text-sm text-base-content/70">
						Manages z-index layering and visibility for tools. When multiple tools are open, it ensures proper stacking order with reserved z-index ranges across five layers: content, non-modal tools, modal tools, control handles, and highlight infrastructure.
					</p>
				</div>
			</div>

			<div class="card bg-base-100 shadow border border-base-300">
				<div class="card-body">
					<h4 class="font-bold text-primary text-lg mb-2">HighlightCoordinator</h4>
					<p class="text-sm text-base-content/70">
						Manages simultaneous highlighting using the CSS Custom Highlight API. Students can have persistent annotations in one color while TTS highlights the current word in another. Zero DOM mutation &mdash; preserves framework virtual DOM and is screen reader friendly.
					</p>
				</div>
			</div>

			<div class="card bg-base-100 shadow border border-base-300">
				<div class="card-body">
					<h4 class="font-bold text-primary text-lg mb-2">TTSService</h4>
					<p class="text-sm text-base-content/70">
						Text-to-speech with synchronized word-level highlighting. Abstracts TTS providers (browser Web Speech API, AWS Polly, Google TTS) behind a pluggable provider interface, handles playback state, and coordinates with HighlightCoordinator for real-time word tracking.
					</p>
				</div>
			</div>

			<div class="card bg-base-100 shadow border border-base-300">
				<div class="card-body">
					<h4 class="font-bold text-primary text-lg mb-2">AccessibilityCatalogResolver</h4>
					<p class="text-sm text-base-content/70">
						Resolves QTI 3.0-inspired accessibility catalogs with priority ordering: extracted SSML from content, item-level catalogs, and assessment-level catalogs. Supports pre-recorded audio, sign language videos, and braille alternatives.
					</p>
				</div>
			</div>

			<div class="card bg-base-100 shadow border border-base-300">
				<div class="card-body">
					<h4 class="font-bold text-primary text-lg mb-2">ElementToolStateStore</h4>
					<p class="text-sm text-base-content/70">
						Manages per-element ephemeral tool state (annotation colors, calculator position) using globally unique composite keys. Tool state is client-only and not sent to the server for scoring.
					</p>
				</div>
			</div>

			<div class="card bg-base-100 shadow border border-base-300">
				<div class="card-body">
					<h4 class="font-bold text-primary text-lg mb-2">PNPToolResolver</h4>
					<p class="text-sm text-base-content/70">
						Resolves tool availability using QTI 3.0 Personal Needs Profile (PNP) precedence rules: district blocks, test administration overrides, item restrictions, item requirements, district requirements, and PNP supports.
					</p>
				</div>
			</div>
		</div>

		<div class="card bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20">
			<div class="card-body">
				<h4 class="font-bold text-lg mb-2">&lt;pie-theme&gt; Element</h4>
				<p class="text-base-content/70">
					Provides theming through a provider adapter model. It reads CSS variables from an existing design system (a DaisyUI adapter is built in) and maps them to PIE's <code>--pie-*</code> custom properties. Color schemes are accessibility overlays applied on top of the base theme, and students can select their preferred scheme at runtime via the color scheme toolbar tool.
				</p>
			</div>
		</div>
	</section>

	<!-- WCAG 2.2 Compliance -->
	<section class="mb-20">
		<h2 class="text-3xl font-bold text-secondary mb-6">WCAG 2.2 Compliance</h2>
		<p class="text-lg text-base-content/70 mb-8 max-w-4xl">
			The toolkit's accessibility features target WCAG 2.2 Level AA compliance:
		</p>

		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
			<div class="flex items-start gap-3 p-4 bg-base-100 rounded-lg border border-base-300">
				<svg class="w-5 h-5 text-success mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
				<span class="text-sm">All tools keyboard navigable with visible focus indicators</span>
			</div>
			<div class="flex items-start gap-3 p-4 bg-base-100 rounded-lg border border-base-300">
				<svg class="w-5 h-5 text-success mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
				<span class="text-sm">Screen readers receive announcements via ARIA live regions</span>
			</div>
			<div class="flex items-start gap-3 p-4 bg-base-100 rounded-lg border border-base-300">
				<svg class="w-5 h-5 text-success mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
				<span class="text-sm">Color contrast meets 4.5:1 minimum ratios</span>
			</div>
			<div class="flex items-start gap-3 p-4 bg-base-100 rounded-lg border border-base-300">
				<svg class="w-5 h-5 text-success mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
				<span class="text-sm">Interactive elements meet 44x44 pixel touch targets</span>
			</div>
			<div class="flex items-start gap-3 p-4 bg-base-100 rounded-lg border border-base-300">
				<svg class="w-5 h-5 text-success mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
				<span class="text-sm">Time limits include warnings and extension mechanisms</span>
			</div>
			<div class="flex items-start gap-3 p-4 bg-base-100 rounded-lg border border-base-300">
				<svg class="w-5 h-5 text-success mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
				<span class="text-sm">Alternative text and captions for content accessibility</span>
			</div>
		</div>
	</section>

	<!-- Navigation -->
	<section class="mb-12">
		<div class="flex flex-col md:flex-row gap-4 justify-between">
			<a href="{base}/docs/players/" class="btn btn-outline btn-secondary">
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
				</svg>
				Players
			</a>
			<a href="{base}/docs/integration/" class="btn btn-primary">
				Integration & Architecture
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
				</svg>
			</a>
		</div>
	</section>
</div>
