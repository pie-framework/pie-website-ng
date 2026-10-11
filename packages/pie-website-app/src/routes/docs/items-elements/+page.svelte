<script lang="ts">
	import { base } from '$app/paths';
	import CodeEditor from '$lib/components/CodeEditor.svelte';
	import Diagram from '$lib/components/Diagram.svelte';
	import ExternalLink from '$lib/components/ExternalLink.svelte';
	import PiePlayerDemo from '$lib/components/PiePlayerDemo.svelte';
	import {
		ELEMENT_COUNT,
		ELEMENT_COUNT_SENTENCE,
		ELEMENTS_WITHOUT_AUTHORING,
		PRINT_COUNT,
		PRINT_ELEMENTS,
		elementsByGroup,
		groupAnchor
	} from '$lib/data/elements';
	import { SAMPLE_CAPTURES, deliveryCapture } from '$lib/data/element-captures';
	import {
		ELEMENTS_MAP_JSON,
		EXAMPLE_MARKUP,
		HOST_EXAMPLE_HTML,
		MODELS_JSON,
		SESSION_LISTENER_JS
	} from '$lib/data/host-example';
	import { DOCS, SITES } from '$lib/data/links';
	import { ITEM_PLAYER_VERSION, elementSpec } from '$lib/versions';

	const groups = elementsByGroup();
	const withoutAuthoring = ELEMENTS_WITHOUT_AUTHORING.map((e) => e.displayName).join(', ');
	const printNames = PRINT_ELEMENTS.map((e) => e.displayName).join(', ');
	const elementsImage = (file: string) => `${base}/images/elements/${file}`;
</script>

<svelte:head>
	<title>PIE Items and Elements - PIE Framework</title>
	<meta
		name="description"
		content="How PIE elements compose into items: the item config, each element's views and controller, the {ELEMENT_COUNT} element types, and a live item player demo."
	/>
</svelte:head>

<div class="container mx-auto px-4 py-12 max-w-7xl">
	<!-- Header -->
	<div class="mb-12">
		<h1 class="text-4xl sm:text-5xl font-bold text-secondary mb-4">PIE Items and Elements</h1>
		<p class="text-xl text-base-content/70 max-w-3xl">
			An element implements one interaction or content type. An item composes elements into one
			assessment question.
		</p>
	</div>

	<!-- Introduction -->
	<section class="mb-12">
		<h2 class="text-3xl font-bold text-secondary mb-6">Elements and items</h2>

		<div class="grid md:grid-cols-2 gap-8 mb-8">
			<div class="card bg-base-100 shadow-xl border border-base-300">
				<div class="card-body">
					<div class="flex items-center gap-3 mb-4">
						<svg
							class="w-10 h-10 text-primary"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
							/>
						</svg>
						<h3 class="card-title text-2xl text-primary">PIE Element</h3>
					</div>
					<p class="text-base-content/80 mb-4">
						A <strong>PIE element</strong> is a reusable interaction, published as an
						<code>@pie-element/&lt;name&gt;</code> npm package: its views are custom elements, and a
						controller shapes and scores its data.
					</p>
					<ul class="list-disc list-inside space-y-2 text-sm">
						<li>Multiple Choice</li>
						<li>Explicit Constructed Response</li>
						<li>Graphing</li>
						<li>Categorize</li>
						<li>
							<a href="#element-library" class="link link-primary"
								>{ELEMENT_COUNT} element types in all</a
							>
						</li>
					</ul>
					<div class="badge badge-primary mt-4">Reusable Component</div>
				</div>
			</div>

			<div class="card bg-base-100 shadow-xl border border-base-300">
				<div class="card-body">
					<div class="flex items-center gap-3 mb-4">
						<svg
							class="w-10 h-10 text-secondary"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
							/>
						</svg>
						<h3 class="card-title text-2xl text-secondary">PIE Item</h3>
					</div>
					<p class="text-base-content/80 mb-4">
						A <strong>PIE item</strong> is one assessment question: markup that places one or more
						elements, a model for each, and the packages that supply them.
					</p>
					<ul class="list-disc list-inside space-y-2 text-sm">
						<li>Reading passage</li>
						<li>One or more questions</li>
						<li>Scoring rubric</li>
						<li>Feedback</li>
					</ul>
					<div class="badge badge-secondary mt-4">Assessment Unit</div>
				</div>
			</div>
		</div>

		<Diagram
			name="content-item-and-elements"
			width={1028}
			height={594}
			alt="One item whose markup places four elements, a passage, a multiple-choice question, an extended text entry and a rubric, each with its own id. The @pie-element packages beside it supply their code, and two of them also serve a second item."
		/>

		<p class="text-lg max-w-4xl">
			Passages and rubrics are elements too, so one item can pair a reading passage with several
			questions and a scoring rubric. A package holds the code for one element type and serves every
			item that uses it.
		</p>
	</section>

	<!-- Element Architecture -->
	<section class="mb-12">
		<h2 class="text-3xl font-bold text-secondary mb-6">Element views and controller</h2>

		<p class="text-lg max-w-4xl mb-8">
			Each element ships a delivery view and a controller. All but {withoutAuthoring} ship an
			authoring view, and {PRINT_COUNT} ship a print view rendered by <code>&lt;pie-print&gt;</code>.
		</p>

		<div class="grid md:grid-cols-2 gap-6 mb-8">
			<div class="card bg-primary/5 border border-primary/20">
				<div class="card-body">
					<h3 class="card-title text-primary">Delivery view <code class="text-sm">&lt;tag&gt;</code></h3>
					<p class="text-sm">
						The interactive view learners and instructors see. The <code>env</code> mode sets what it
						does:
					</p>
					<ul class="text-sm space-y-1 mt-2">
						<li><strong>Gather:</strong> the learner responds</li>
						<li><strong>View:</strong> read-only</li>
						<li><strong>Evaluate:</strong> read-only, with correctness and feedback</li>
					</ul>
					<p class="text-sm mt-2">
						The role, student or instructor, shapes each mode: for instructors, multiple choice adds
						rationale and teacher instructions in view and evaluate.
					</p>
				</div>
			</div>

			<div class="card bg-secondary/5 border border-secondary/20">
				<div class="card-body">
					<h3 class="card-title text-secondary">
						Authoring view <code class="text-sm">&lt;tag&gt;-config</code>
					</h3>
					<p class="text-sm">
						Edits the model and emits <code>model-updated</code> on every change, so the host can show
						a live delivery preview beside the editor.
					</p>
					<ul class="text-sm space-y-1 mt-2">
						<li>Add and edit choices and mark correct answers</li>
						<li>Choose a layout: vertical, grid or horizontal</li>
						<li>Set feedback, scoring and partial credit</li>
						<li>Rich text editors and visual panels</li>
					</ul>
				</div>
			</div>

			<div class="card bg-accent/5 border border-accent/20">
				<div class="card-body">
					<h3 class="card-title text-accent">Controller</h3>
					<p class="text-sm">
						Plain functions in <code>@pie-element/&lt;name&gt;/controller</code>, called with the model,
						the session and the <code>env</code>.
					</p>
					<ul class="text-sm space-y-1 mt-2">
						<li><code>model()</code> &mdash; shapes the view model by mode and role</li>
						<li><code>outcome()</code> &mdash; calculates the score: <code>{'{ score, empty }'}</code></li>
						<li>Runs in the browser, or on your server in hosted mode</li>
					</ul>
				</div>
			</div>

			<div class="card bg-base-200 border border-base-300">
				<div class="card-body">
					<h3 class="card-title">Print view</h3>
					<p class="text-sm">
						A static rendering for paper, drawn by <code>&lt;pie-print&gt;</code>. {PRINT_COUNT} elements
						ship one: {printNames}.
					</p>
				</div>
			</div>
		</div>

		<Diagram
			name="element-views"
			width={1028}
			height={626}
			alt="One multiple-choice question in a grid of three modes by two roles: gather enables the choices, view is read-only, and evaluate adds correctness. Instructors see the same as students in gather, and rationale and teacher instructions in view and evaluate."
			caption="Elements adapt their interface based on environment mode and user role"
		/>
	</section>

	<!-- Live Interactive Example -->
	<section class="mb-12">
		<h2 class="text-3xl font-bold text-secondary mb-6">Live demo</h2>

		<p class="text-lg max-w-4xl mb-6">
			The multiple-choice item from Getting started, in <code>&lt;pie-item-player&gt;</code>
			{ITEM_PLAYER_VERSION} loaded from jsDelivr. Mode and role change only <code>env</code>, so the
			response survives a switch to evaluate.
		</p>

		<PiePlayerDemo />

		<p class="text-sm text-base-content/70 mt-4">
			Hosts moving from <code>pie-player-components</code> can follow the
			<ExternalLink href={DOCS.migration}>migration guide</ExternalLink>.
		</p>
	</section>

	<!-- Item Configuration Structure -->
	<section class="mb-12">
		<h2 class="text-3xl font-bold text-secondary mb-6">Item configuration</h2>

		<p class="text-lg max-w-4xl mb-2">An item config has three parts that reference each other.</p>

		<Diagram
			name="content-item-config"
			width={1028}
			height={293}
			alt="The three parts of an item config: elements maps the multiple-choice tag to {elementSpec(
				'multiple-choice'
			)}, markup places that tag with id q1, and models holds one model with the same id and the same element name."
		/>

		<div class="grid lg:grid-cols-3 gap-6 mb-6">
			<div class="card bg-base-100 border-2 border-primary/30 min-w-0">
				<div class="card-body">
					<h3 class="card-title text-primary text-lg">1. elements</h3>
					<p class="text-sm text-base-content/80">
						Maps each tag in <code>markup</code> to an npm package at an exact version. The player loads
						the packages and registers each tag under a versioned name, such as
						<code>multiple-choice--version-14-0-3</code>, so several versions can share a page.
					</p>
					<div class="mt-2">
						<CodeEditor value={ELEMENTS_MAP_JSON} language="json" readonly={true} height="100px" />
					</div>
				</div>
			</div>

			<div class="card bg-base-100 border-2 border-secondary/30 min-w-0">
				<div class="card-body">
					<h3 class="card-title text-secondary text-lg">2. models</h3>
					<p class="text-sm text-base-content/80">
						Each model is interpreted by the element it maps to, and each element documents its model
						fields. Every model carries an <code>id</code>, matching the element's <code>id</code> in
						the markup, and an <code>element</code>, matching a key in <code>elements</code>. All other
						fields &mdash; <code>choices</code> here &mdash; belong to the element.
					</p>
					<div class="mt-2">
						<CodeEditor value={MODELS_JSON} language="json" readonly={true} height="250px" />
					</div>
				</div>
			</div>

			<div class="card bg-base-100 border-2 border-accent/30 min-w-0">
				<div class="card-body">
					<h3 class="card-title text-accent text-lg">3. markup</h3>
					<p class="text-sm text-base-content/80">
						HTML that places each element by tag and <code>id</code>, alongside passages and other
						content. Keep layout in the element implementations rather than the markup, so items stay
						consistent. The player sanitizes markup with DOMPurify by default; hosts serving trusted
						content can opt out with <code>trust-markup</code>.
					</p>
					<div class="mt-2">
						<CodeEditor value={EXAMPLE_MARKUP} language="html" readonly={true} height="60px" />
					</div>
				</div>
			</div>
		</div>

		<p class="text-base-content/80 max-w-4xl">
			Optional: <code>resources</code> adds stylesheets and the container classes
			<code>containerClass</code> and <code>passageContainerClass</code>. An item with a stimulus
			takes the form <code>{'{ pie, passage }'}</code>, two configs of this shape, and the player
			renders the passage beside the item.
		</p>
	</section>

	<!-- Delivering an item -->
	<section class="mb-12">
		<h2 class="text-3xl font-bold text-secondary mb-6">Delivering an item</h2>

		<p class="text-lg max-w-4xl mb-4">
			A host page loads the item player from the CDN and sets <code>config</code>, <code>env</code>
			and <code>session</code> as properties. This is the example from
			<ExternalLink href={DOCS.gettingStarted}>Getting started</ExternalLink>:
		</p>
		<div class="mb-6 min-w-0">
			<CodeEditor value={HOST_EXAMPLE_HTML} language="html" readonly={true} height="200px" />
		</div>

		<p class="text-lg max-w-4xl mb-4">
			The player emits <code>session-changed</code> as the learner responds. Save
			<code>event.detail.session</code> when it is non-null:
		</p>
		<div class="mb-8 min-w-0">
			<CodeEditor value={SESSION_LISTENER_JS} language="javascript" readonly={true} height="80px" />
		</div>

		<h3 class="text-xl font-semibold mb-3">From authoring to score</h3>
		<ol class="list-decimal list-outside ml-6 space-y-2 max-w-4xl text-base-content/80">
			<li>
				The authoring view edits the model and emits <code>model-updated</code>; the host stores the
				item config.
			</li>
			<li>The host sets the item config, an <code>env</code> and the learner's saved session.</li>
			<li>
				Each controller's <code>model()</code> builds the view model for that mode and role, and the
				delivery view renders it.
			</li>
			<li>Responses arrive in <code>session-changed</code>, and the host saves each session.</li>
			<li>
				<code>provideScore()</code> runs each controller's <code>outcome()</code> in the browser. For
				high-stakes delivery the host scores on its server instead; see
				<a href="{base}/docs/element-structure/#controller-placement" class="link link-primary"
					>where the controller runs</a
				>.
			</li>
			<li>In evaluate mode, the view model adds correctness and feedback.</li>
		</ol>
	</section>

	<!-- Element library -->
	<section class="mb-12" id="element-library">
		<h2 class="text-3xl font-bold text-secondary mb-6">Element library</h2>

		<p class="text-lg max-w-4xl mb-4">
			{ELEMENT_COUNT_SENTENCE} Each card shows the element's delivery view, captured from the
			<ExternalLink href={SITES.elementsDemo}>elements demo</ExternalLink>.
		</p>

		<nav aria-label="Element groups" class="flex flex-wrap gap-2 mb-8">
			{#each groups as { group, elements } (group)}
				<a href="#{groupAnchor(group)}" class="btn btn-sm btn-outline">
					{group}
					<span class="badge badge-sm">{elements.length}</span>
				</a>
			{/each}
		</nav>

		{#each groups as { group, elements } (group)}
			<div class="mb-10 scroll-mt-24" id={groupAnchor(group)}>
				<h3 class="text-2xl font-semibold mb-4">{group}</h3>
				<ul class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
					{#each elements as element (element.name)}
						{@const capture = deliveryCapture(element.name)}
						<li class="card bg-base-100 border border-base-300 shadow-sm overflow-hidden">
							<div class="capture-frame h-48 p-3 border-b border-base-300">
								<img
									src={elementsImage(capture.file)}
									alt={capture.alt}
									width={capture.width}
									height={capture.height}
									loading="lazy"
									class="w-full h-full object-contain"
								/>
							</div>
							<div class="p-4">
								<h4 class="font-semibold">{element.displayName}</h4>
								<code class="text-xs text-base-content/70">{element.package}</code>
								<p class="text-sm text-base-content/70 mt-1">{capture.caption}</p>
							</div>
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</section>

	<!-- Example Screenshots -->
	<section class="mb-12">
		<h2 class="text-3xl font-bold text-secondary mb-6">Authoring and evaluation views</h2>

		<div class="grid md:grid-cols-2 gap-8 items-start">
			{#each SAMPLE_CAPTURES as sample (sample.file)}
				<figure class="card bg-base-100 border border-base-300 shadow-sm overflow-hidden">
					<div class="capture-frame p-3 border-b border-base-300">
						<img
							src={elementsImage(sample.file)}
							alt={sample.alt}
							width={sample.width}
							height={sample.height}
							loading="lazy"
							class="w-full h-auto"
						/>
					</div>
					<figcaption class="p-4">
						<h3 class="font-semibold">{sample.title}</h3>
						<p class="text-sm text-base-content/70 mt-1">{sample.caption}</p>
					</figcaption>
				</figure>
			{/each}
		</div>
	</section>

	<!-- Building Custom Elements -->
	<section class="mb-12">
		<h2 class="text-3xl font-bold text-secondary mb-6">Building custom elements</h2>
		<p class="text-lg max-w-4xl mb-6">
			Organizations with assessment needs the library does not cover can build their own elements on
			the same contract.
		</p>
		<div class="grid md:grid-cols-2 gap-6">
			<div class="card bg-base-100 border border-base-300">
				<div class="card-body">
					<h3 class="font-bold text-primary mb-2">
						<ExternalLink href={DOCS.elementContract}>Element contract</ExternalLink>
					</h3>
					<p class="text-sm text-base-content/70">
						The delivery, authoring, print and controller contract every element implements.
					</p>
				</div>
			</div>
			<div class="card bg-base-100 border border-base-300">
				<div class="card-body">
					<h3 class="font-bold text-primary mb-2">Shared component libraries</h3>
					<p class="text-sm text-base-content/70">
						The <code>@pie-lib/*</code> packages in pie-elements-ng provide prompts, feedback displays,
						math rendering and other common parts.
					</p>
				</div>
			</div>
			<div class="card bg-base-100 border border-base-300">
				<div class="card-body">
					<h3 class="font-bold text-primary mb-2">Controller interface</h3>
					<p class="text-sm text-base-content/70">
						Framework-independent functions: <code>model()</code> and <code>outcome()</code>, plus
						<code>createDefaultModel()</code>, <code>validate()</code> and
						<code>createCorrectResponseSession()</code> for authoring and review.
					</p>
				</div>
			</div>
			<div class="card bg-base-100 border border-base-300">
				<div class="card-body">
					<h3 class="font-bold text-primary mb-2">{ELEMENT_COUNT} reference implementations</h3>
					<p class="text-sm text-base-content/70">
						A custom element that follows the element contract loads in the PIE players like a
						built-in one; its accessibility and print view are its own to implement.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Accessibility -->
	<section class="mb-12">
		<h2 class="text-3xl font-bold text-secondary mb-6">Accessibility</h2>
		<p class="text-lg max-w-4xl mb-2">
			Built to WCAG 2.2 AA. Automated axe checks run against every element and player; manual
			assistive-technology validation is in progress.
		</p>
		<p class="text-lg max-w-4xl mb-6">
			Accessibility is part of each element's delivery view. See the
			<ExternalLink href={DOCS.accessibility}>accessibility documentation</ExternalLink>.
		</p>
		<ul class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
			{#each [['Keyboard navigation', 'tab navigation, arrow keys, enter/space activation'], ['Screen reader support', 'semantic HTML with ARIA labels, roles and live regions'], ['Focus management', 'logical focus order and visible focus indicators'], ['High contrast', 'elements render correctly with high-contrast themes'], ['Magnification', 'interfaces scale when users increase font sizes']] as [title, detail] (title)}
				<li class="flex items-start gap-3 p-4 bg-base-100 rounded-lg border border-base-300">
					<svg
						class="w-5 h-5 text-success mt-0.5 flex-shrink-0"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						aria-hidden="true"
						><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg
					>
					<span class="text-sm"><strong>{title}</strong> &mdash; {detail}</span>
				</li>
			{/each}
		</ul>
	</section>

	<!-- Elements demo link -->
	<section class="mb-12">
		<div class="card bg-primary text-primary-content shadow-xl">
			<div class="card-body">
				<h2 class="card-title text-2xl mb-4">Try more examples</h2>
				<p class="mb-4">
					The PIE elements demo runs every element with sample items, in delivery and authoring.
				</p>
				<div class="card-actions">
					<ExternalLink href={SITES.elementsDemo} class="btn btn-secondary">
						Open the elements demo
					</ExternalLink>
				</div>
			</div>
		</div>
	</section>

	<!-- Next Steps -->
	<section>
		<h2 class="text-3xl font-bold text-secondary mb-6">Next steps</h2>

		<div class="grid md:grid-cols-2 gap-6">
			<a
				href="{base}/docs/element-structure/"
				class="card bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition-shadow"
			>
				<div class="card-body">
					<h3 class="card-title text-primary">
						Element Structure
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M13 7l5 5m0 0l-5 5m5-5H6"
							/>
						</svg>
					</h3>
					<p class="text-sm">
						The element contract: delivery and authoring views, the controller, events, and where the
						controller runs.
					</p>
				</div>
			</a>

			<a
				href="{base}/docs/players/"
				class="card bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition-shadow"
			>
				<div class="card-body">
					<h3 class="card-title text-primary">
						Players
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M13 7l5 5m0 0l-5 5m5-5H6"
							/>
						</svg>
					</h3>
					<p class="text-sm">
						The item player renders one item. Section players lay out a page of items and passages,
						with tools and accommodations from the assessment toolkit. The print player renders
						printable versions. Hosts assemble these into their own assessment experience; a
						reference assessment player shows one way to do it.
					</p>
				</div>
			</a>
		</div>
	</section>
</div>

<style>
	/* Captures are screenshots of the light theme: keep their frame light in both site themes. */
	.capture-frame {
		background: #ffffff;
	}
</style>
