<script lang="ts">
	import { base } from '$app/paths';
	import PiePlayerDemo from '$lib/components/PiePlayerDemo.svelte';
	import CodeEditor from '$lib/components/CodeEditor.svelte';

	const elementsExample = `{
  "multiple-choice": "@pie-element/multiple-choice@latest"
}`;

	const modelsExample = `[
  {
    "id": "1",
    "element": "multiple-choice",
    "prompt": "Question text",
    "choices": [
      {
        "label": "A",
        "value": "a",
        "correct": true
      }
    ]
  }
]`;

	const markupExample = `<multiple-choice id="1"></multiple-choice>`;

	// Sample multiple choice model for the demo
	const multipleChoiceModel = {
		id: 'Q124',
		element: 'multiple-choice-element',
		prompt: 'What is the capital of France?',
		choicePrefix: 'letters',
		scoringType: 'auto',
		lockChoiceOrder: false,
		partialScoring: false,
		choices: [
			{
				value: 'A',
				label: 'London',
				correct: false
			},
			{
				value: 'B',
				label: 'Paris',
				correct: true
			},
			{
				value: 'C',
				label: 'Berlin',
				correct: false
			},
			{
				value: 'D',
				label: 'Rome',
				correct: false
			}
		],
		choiceMode: 'radio',
		promptEnabled: true,
		rationaleEnabled: true,
		teacherInstructionsEnabled: true,
		studentInstructionsEnabled: true
	};
</script>

<svelte:head>
	<title>PIE Items and Elements - PIE Framework</title>
	<meta
		name="description"
		content="Understand the difference between PIE Items and Elements. Learn how elements compose into items to create complete assessment questions."
	/>
</svelte:head>

<div class="container mx-auto px-4 py-12 max-w-7xl">
	<!-- Header -->
	<div class="mb-12">
		<h1 class="text-5xl font-bold text-secondary mb-4">PIE Items and Elements</h1>
		<p class="text-xl text-base-content/70 max-w-3xl">
			Understanding the foundational concepts of PIE: reusable elements that compose into complete
			assessment items.
		</p>
	</div>

	<!-- Introduction -->
	<section class="prose max-w-none mb-12">
		<h2 class="text-3xl font-bold text-secondary mb-6">Introduction</h2>

		<div class="grid md:grid-cols-2 gap-8 mb-8 not-prose">
			<div class="card bg-base-100 shadow-xl border border-base-300">
				<div class="card-body">
					<div class="flex items-center gap-3 mb-4">
						<svg
							class="w-10 h-10 text-primary"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
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
						A <strong>PIE Element</strong> is a reusable, interactive component that implements a specific
						question type. Think of it as a building block.
					</p>
					<ul class="list-disc list-inside space-y-2 text-sm">
						<li>Multiple Choice</li>
						<li>Text Entry</li>
						<li>Graphing</li>
						<li>Drag and Drop</li>
						<li>20+ question types</li>
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
						A <strong>PIE Item</strong> is a complete assessment question that may contain one or more
						elements plus optional supporting content.
					</p>
					<ul class="list-disc list-inside space-y-2 text-sm">
						<li>Reading passage</li>
						<li>One or more questions</li>
						<li>Scoring rubric</li>
						<li>Feedback and hints</li>
					</ul>
					<div class="badge badge-secondary mt-4">Assessment Unit</div>
				</div>
			</div>
		</div>

		<div class="my-8">
			<img
				src="{base}/images/docs/items-elements/items-vs-elements.jpg"
				alt="Items vs Elements Diagram"
				class="rounded-lg shadow-lg w-full max-w-2xl mx-auto"
			/>
		</div>

		<p class="text-lg">
			Items are what students see as complete questions. Elements are the interactive components
			that capture responses. An item might combine a reading passage with multiple elements (e.g.,
			a multiple choice and a constructed response) to assess comprehension from different angles.
		</p>
	</section>

	<!-- Element Architecture -->
	<section class="mb-12">
		<h2 class="text-3xl font-bold text-secondary mb-6">Element Architecture</h2>

		<div class="prose max-w-none mb-8">
			<p class="text-lg">
				Every PIE element provides multiple interfaces to support different use cases:
			</p>
		</div>

		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
			<div class="card bg-primary/5 border border-primary/20">
				<div class="card-body">
					<h3 class="card-title text-primary">Delivery Interface</h3>
					<p class="text-sm">
						The interactive UI students and teachers see. Adapts based on mode and role:
					</p>
					<ul class="text-sm space-y-1 mt-2">
						<li><strong>Gather mode:</strong> Students interact and select answers</li>
						<li><strong>View mode:</strong> Read-only display without interaction</li>
						<li><strong>Evaluate mode:</strong> Shows correctness and feedback</li>
					</ul>
				</div>
			</div>

			<div class="card bg-secondary/5 border border-secondary/20">
				<div class="card-body">
					<h3 class="card-title text-secondary">Authoring Interface</h3>
					<p class="text-sm">
						Configuration UI where educators create questions using forms and visual editors.
						WYSIWYG experience with live preview.
					</p>
					<ul class="text-sm space-y-1 mt-2">
						<li>Add/edit choices and mark correct answers</li>
						<li>Configure layouts (vertical/horizontal)</li>
						<li>Set feedback and difficulty</li>
						<li>Rich text editors and visual panels</li>
					</ul>
				</div>
			</div>

			<div class="card bg-accent/5 border border-accent/20">
				<div class="card-body">
					<h3 class="card-title text-accent">Controller</h3>
					<p class="text-sm">
						JavaScript/TypeScript functions that transform data and calculate scores based on
						context.
					</p>
					<ul class="text-sm space-y-1 mt-2">
						<li><code>model()</code> &mdash; Build view model for rendering</li>
						<li><code>outcome()</code> &mdash; Calculate score and feedback</li>
						<li>Runs client or server-side</li>
						<li>Security filtering by role</li>
					</ul>
				</div>
			</div>

			<div class="card bg-base-200 border border-base-300">
				<div class="card-body">
					<div class="flex items-center gap-2 mb-1">
						<h3 class="card-title text-base-content/70">Print View</h3>
						<span class="badge badge-sm badge-outline">In Progress</span>
					</div>
					<p class="text-sm text-base-content/60">
						A UI optimized for printing assessment items on paper.
					</p>
				</div>
			</div>

			<div class="card bg-base-200 border border-base-300">
				<div class="card-body">
					<div class="flex items-center gap-2 mb-1">
						<h3 class="card-title text-base-content/70">List View</h3>
						<span class="badge badge-sm badge-outline">In Progress</span>
					</div>
					<p class="text-sm text-base-content/60">
						Compact preview UIs usable in lists and tables for item bank browsing.
					</p>
				</div>
			</div>
		</div>

		<div class="my-8 flex flex-col items-center">
			<img
				src="{base}/images/docs/items-elements/pie-multiple-interfaces.png"
				alt="PIE Multiple Interfaces"
				class="rounded-lg shadow-lg max-w-3xl w-full"
			/>
			<p class="text-center text-sm text-base-content/60 mt-2">
				Elements adapt their interface based on environment mode and user role
			</p>
		</div>
	</section>

	<!-- Live Interactive Example -->
	<section class="mb-12">
		<h2 class="text-3xl font-bold text-secondary mb-6">Live Interactive Example</h2>

		<div class="prose max-w-none mb-6">
			<p class="text-lg">
				Try interacting with a live PIE multiple choice element below. Switch between different
				modes and roles to see how the element adapts:
			</p>
		</div>

		<div class="bg-base-200 p-6 rounded-lg">
			<PiePlayerDemo elementName="multiple-choice" model={multipleChoiceModel} height="400px" />
		</div>
	</section>

	<!-- Item Configuration Structure -->
	<section class="mb-12">
		<h2 class="text-3xl font-bold text-secondary mb-6">Item Configuration Structure</h2>

		<div class="prose max-w-none mb-6">
			<p class="text-lg">
				PIE items are configured using JSON with three essential sections that work together:
			</p>
		</div>

		<!-- Visual Diagram -->
		<div class="flex justify-center mb-8">
			<img
				src="{base}/images/docs/item-config-structure.jpg"
				alt="PIE Item Configuration Structure - showing elements, models, and markup sections"
				class="rounded-lg shadow-lg max-w-3xl w-full"
			/>
		</div>

		<!-- Explanation Cards -->
		<div class="grid md:grid-cols-3 gap-6 mb-6">
			<div class="card bg-base-100 border-2 border-primary/30">
				<div class="card-body">
					<h4 class="card-title text-primary text-lg">1. elements</h4>
					<p class="text-sm text-base-content/80">
						Maps element tags from <code class="bg-base-200 px-2 py-1 rounded text-xs">markup</code> to PIE element
						NPM packages. Tells the player which PIE elements (and which versions) to load from CDN or your server.
					</p>
					<div class="mt-2">
						<CodeEditor value={elementsExample} language="json" readonly={true} height="100px" />
					</div>
				</div>
			</div>

			<div class="card bg-base-100 border-2 border-secondary/30">
				<div class="card-body">
					<h4 class="card-title text-secondary text-lg">2. models</h4>
					<p class="text-sm text-base-content/80">
						Array of element configurations. Each model defines one element's content, behavior,
						and correct answers. Linked by <code class="bg-base-200 px-2 py-1 rounded text-xs">id</code>.
						Each model entry is interpreted by the PIE element implementation it is mapped to. The PIE element
						should advertise its interface (the PIE React elements do this through JSON schemas) but ultimately
						it is entirely up the PIE element how that is interpreted. In this case, 'choices' is specific for
						the multiple-choice PIE element. Only a few things are in all models: the 'id', the 'element'
						and the 'prompt'.
					</p>
					<div class="mt-2">
						<CodeEditor value={modelsExample} language="json" readonly={true} height="250px" />
					</div>
				</div>
			</div>

			<div class="card bg-base-100 border-2 border-accent/30">
				<div class="card-body">
					<h4 class="card-title text-accent text-lg">3. markup</h4>
					<p class="text-sm text-base-content/80">
						HTML defining element placement and layout. Can include passages, multiple elements,
						and custom structure. Element tags must match <code class="bg-base-200 px-2 py-1 rounded text-xs">elements</code> keys.
						While it can be used for sophisticated layout, it is typically not recommended for this and instead
						you should try to build in layout concerns in the PIE element implementation and aim for consistency.
					</p>
					<div class="mt-2">
						<CodeEditor value={markupExample} language="html" readonly={true} height="120px" />
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Comprehensive Question Type Library -->
	<section class="mb-12">
		<h2 class="text-3xl font-bold text-secondary mb-6">Comprehensive Question Type Library</h2>

		<div class="prose max-w-none mb-6">
			<p class="text-lg">
				PIE includes over 20 production-ready question types covering simple to highly complex
				interactions:
			</p>
		</div>

		<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
			<div class="card bg-base-100 border border-base-300">
				<div class="card-body p-4">
					<h4 class="font-semibold text-sm mb-2">Simple Response</h4>
					<ul class="text-xs space-y-1">
						<li>• Multiple Choice</li>
						<li>• Text Entry</li>
						<li>• Extended Text</li>
						<li>• Inline Choice</li>
						<li>• Math Inline</li>
					</ul>
				</div>
			</div>

			<div class="card bg-base-100 border border-base-300">
				<div class="card-body p-4">
					<h4 class="font-semibold text-sm mb-2">Matching & Categorization</h4>
					<ul class="text-xs space-y-1">
						<li>• Match</li>
						<li>• Match List</li>
						<li>• Categorize</li>
						<li>• Placement Ordering</li>
						<li>• Drag in the Blank</li>
					</ul>
				</div>
			</div>

			<div class="card bg-base-100 border border-base-300">
				<div class="card-body p-4">
					<h4 class="font-semibold text-sm mb-2">Visual & Graphical</h4>
					<ul class="text-xs space-y-1">
						<li>• Hotspot</li>
						<li>• Image Cloze Association</li>
						<li>• Drawing Response</li>
						<li>• Graphing</li>
						<li>• Number Line</li>
					</ul>
				</div>
			</div>

			<div class="card bg-base-100 border border-base-300">
				<div class="card-body p-4">
					<h4 class="font-semibold text-sm mb-2">Support Elements</h4>
					<ul class="text-xs space-y-1">
						<li>• Passage</li>
						<li>• Rubric</li>
						<li>• Image</li>
						<li>• Math Templated</li>
					</ul>
				</div>
			</div>
		</div>

		<div class="my-8 flex justify-center">
			<img
				src="{base}/images/landing/pie-question-type-example.png"
				alt="PIE Question Types Example"
				class="rounded-lg shadow-lg max-w-3xl w-full"
			/>
		</div>
	</section>

	<!-- Example Screenshots -->
	<section class="mb-12">
		<h2 class="text-3xl font-bold text-secondary mb-6">Element Examples</h2>

		<div class="grid md:grid-cols-2 gap-8">
			<div>
				<h3 class="text-xl font-semibold mb-3">Categorize - Authoring View</h3>
				<img
					src="{base}/images/landing/pie-sample-categorize-author.png"
					alt="Categorize Authoring"
					class="rounded-lg shadow-lg border border-base-300"
				/>
				<p class="text-sm text-base-content/60 mt-2">
					WYSIWYG authoring interface for configuring a drag-and-drop categorization question
				</p>
			</div>

			<div>
				<h3 class="text-xl font-semibold mb-3">Categorize - Student View</h3>
				<img
					src="{base}/images/landing/pie-sample-categorize.png"
					alt="Categorize Student View"
					class="rounded-lg shadow-lg border border-base-300"
				/>
				<p class="text-sm text-base-content/60 mt-2">
					Interactive student experience: drag items into labeled categories
				</p>
			</div>

			<div>
				<h3 class="text-xl font-semibold mb-3">Hotspot - Authoring View</h3>
				<img
					src="{base}/images/landing/pie-sample-hotspot-author.png"
					alt="Hotspot Authoring"
					class="rounded-lg shadow-lg border border-base-300"
				/>
				<p class="text-sm text-base-content/60 mt-2">
					Define clickable regions on images during authoring
				</p>
			</div>

			<div>
				<h3 class="text-xl font-semibold mb-3">Hotspot - Evaluation View</h3>
				<img
					src="{base}/images/landing/pie-sample-hotspot-eval.png"
					alt="Hotspot Evaluation"
					class="rounded-lg shadow-lg border border-base-300"
				/>
				<p class="text-sm text-base-content/60 mt-2">
					Show correct and incorrect responses with visual feedback
				</p>
			</div>
		</div>
	</section>

	<!-- Building Custom Elements -->
	<section class="mb-12">
		<h2 class="text-3xl font-bold text-secondary mb-6">Building Custom Elements</h2>
		<div class="prose max-w-none mb-6">
			<p class="text-lg">
				Organizations with specialized assessment needs can build custom elements following PIE's established patterns.
			</p>
		</div>
		<div class="grid md:grid-cols-2 gap-6">
			<div class="card bg-base-100 border border-base-300">
				<div class="card-body">
					<h4 class="font-bold text-primary mb-2">Element Boilerplate</h4>
					<p class="text-sm text-base-content/70">Templates and scaffolding for new question types, following PIE conventions for delivery, authoring, and controllers.</p>
				</div>
			</div>
			<div class="card bg-base-100 border border-base-300">
				<div class="card-body">
					<h4 class="font-bold text-primary mb-2">Shared Component Libraries</h4>
					<p class="text-sm text-base-content/70">Reusable UI components for prompts, feedback displays, math rendering, and other common patterns.</p>
				</div>
			</div>
			<div class="card bg-base-100 border border-base-300">
				<div class="card-body">
					<h4 class="font-bold text-primary mb-2">Controller Interface</h4>
					<p class="text-sm text-base-content/70">Framework-agnostic JavaScript/TypeScript interface for scoring and validation logic with <code>model()</code> and <code>outcome()</code> functions.</p>
				</div>
			</div>
			<div class="card bg-base-100 border border-base-300">
				<div class="card-body">
					<h4 class="font-bold text-primary mb-2">30+ Reference Implementations</h4>
					<p class="text-sm text-base-content/70">Comprehensive examples demonstrating patterns. Custom elements integrate seamlessly, gaining accessibility support, print rendering, and player compatibility.</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Accessibility -->
	<section class="mb-12">
		<h2 class="text-3xl font-bold text-secondary mb-6">Accessibility Throughout</h2>
		<div class="prose max-w-none mb-6">
			<p class="text-lg">
				Every PIE element includes accessibility features as part of its core implementation &mdash; not optional configurations added as an afterthought.
			</p>
		</div>
		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
			<div class="flex items-start gap-3 p-4 bg-base-100 rounded-lg border border-base-300">
				<svg class="w-5 h-5 text-success mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
				<span class="text-sm"><strong>Keyboard navigation</strong> &mdash; tab navigation, arrow keys, enter/space activation</span>
			</div>
			<div class="flex items-start gap-3 p-4 bg-base-100 rounded-lg border border-base-300">
				<svg class="w-5 h-5 text-success mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
				<span class="text-sm"><strong>Screen reader support</strong> &mdash; semantic HTML with proper ARIA labels, roles, and live regions</span>
			</div>
			<div class="flex items-start gap-3 p-4 bg-base-100 rounded-lg border border-base-300">
				<svg class="w-5 h-5 text-success mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
				<span class="text-sm"><strong>Focus management</strong> &mdash; logical focus order and visible focus indicators</span>
			</div>
			<div class="flex items-start gap-3 p-4 bg-base-100 rounded-lg border border-base-300">
				<svg class="w-5 h-5 text-success mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
				<span class="text-sm"><strong>High contrast</strong> &mdash; elements render correctly with high-contrast themes</span>
			</div>
			<div class="flex items-start gap-3 p-4 bg-base-100 rounded-lg border border-base-300">
				<svg class="w-5 h-5 text-success mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
				<span class="text-sm"><strong>Magnification</strong> &mdash; interfaces scale properly when users increase font sizes</span>
			</div>
		</div>
	</section>

	<!-- Playground Link -->
	<section class="mb-12">
		<div class="card bg-primary text-primary-content shadow-xl">
			<div class="card-body">
				<h2 class="card-title text-2xl mb-4">Try More Examples</h2>
				<p class="mb-4">
					Want to explore more question types? Check out the PIE Playground with 20+ pre-configured
					examples you can try and modify.
				</p>
				<div class="card-actions">
					<a
						href="https://pieoneer.pie-api.com/etl/playground/pie"
						target="_blank"
						rel="noopener noreferrer"
						class="btn btn-secondary"
					>
						Open PIE Playground
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
							/>
						</svg>
					</a>
				</div>
			</div>
		</div>
	</section>

	<!-- Next Steps -->
	<section>
		<h2 class="text-3xl font-bold text-secondary mb-6">Next Steps</h2>

		<div class="grid md:grid-cols-2 gap-6">
			<a
				href="{base}/docs/element-structure/"
				class="card bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition-shadow"
			>
				<div class="card-body">
					<h3 class="card-title text-primary">
						Element Structure
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M13 7l5 5m0 0l-5 5m5-5H6"
							/>
						</svg>
					</h3>
					<p class="text-sm">
						Deep dive into element architecture: delivery UI, author UI, controllers, and how the
						pieces work together.
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
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M13 7l5 5m0 0l-5 5m5-5H6"
							/>
						</svg>
					</h3>
					<p class="text-sm">
						Four-level player hierarchy: item players render questions, section players compose pages, assessment players orchestrate navigation.
					</p>
				</div>
			</a>
		</div>
	</section>
</div>
