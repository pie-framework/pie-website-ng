<script lang="ts">
	import { base } from '$app/paths';
	import CodeEditor from '$lib/components/CodeEditor.svelte';
	import Diagram from '$lib/components/Diagram.svelte';
	import ExternalLink from '$lib/components/ExternalLink.svelte';
	import { ELEMENTS_WITHOUT_AUTHORING, PRINT_COUNT, PRINT_ELEMENTS } from '$lib/data/elements';
	import { DOCS } from '$lib/data/links';

	const withoutAuthoring = ELEMENTS_WITHOUT_AUTHORING.map((e) => e.displayName).join(', ');
	const printNames = PRINT_ELEMENTS.map((e) => e.displayName).join(', ');

	// Simplified from the multiple-choice controller in pie-elements-ng.
	const controllerExample = `// @pie-element/<name>/controller
export async function model(question, session, env) {
  const { mode, role } = env;
  return {
    prompt: question.prompt,
    choiceMode: question.choiceMode,
    disabled: mode !== 'gather',
    choices: question.choices.map((c) => ({
      label: c.label,
      value: c.value,
      ...(mode === 'evaluate' ? { correct: !!c.correct } : {}),
      rationale:
        role === 'instructor' && (mode === 'view' || mode === 'evaluate') ? c.rationale : null,
    })),
  };
}

export async function outcome(question, session, env) {
  const selected = session?.value ?? [];
  if (!selected.length) return { score: 0, empty: true };
  const correct = question.choices.filter((c) => c.correct).map((c) => c.value);
  const allRight =
    selected.length === correct.length && selected.every((v) => correct.includes(v));
  return { score: allRight ? 1 : 0, empty: false };
}`;

	const checkPath = 'M5 13l4 4L19 7';
</script>

<svelte:head>
	<title>Element Structure - PIE Framework</title>
	<meta
		name="description"
		content="The parts of a PIE element package: delivery, authoring and print views, the controller, the events between them and the item player, and where the controller runs."
	/>
</svelte:head>

<div>
	<!-- Header -->
	<div class="mb-12">
		<h1 class="text-4xl sm:text-5xl font-bold text-secondary mb-4">Structure of PIE Elements</h1>
		<p class="text-xl text-base-content/70 max-w-3xl">
			The parts of an element package, the contract each part implements, and where the controller
			runs.
		</p>
	</div>

	<!-- Element package -->
	<section class="mb-12">
		<h2 class="text-3xl font-bold text-secondary mb-6">Element package</h2>

		<p class="text-lg max-w-4xl">
			An element is an npm package, <code>@pie-element/&lt;name&gt;</code>, whose parts sit at their
			own export paths. Every element ships a delivery view and a controller; all but
			{withoutAuthoring} ship an authoring view, and {PRINT_COUNT} ship a print view.
		</p>

		<Diagram
			name="element-package"
			width={1028}
			height={692}
			alt="The four parts of an @pie-element package at their export paths: the delivery view, the author view, the controller and an optional print view. The item player sets model and session on the delivery view and model and configuration on the author view, calls the controller, and receives session-changed, model.updated, view models and scores; the print player sets model and options on the print view."
		/>

		<div class="grid md:grid-cols-2 gap-6">
			<div class="card bg-primary/5 border border-primary/20">
				<div class="card-body">
					<h3 class="card-title text-lg text-primary">
						Delivery view <code class="text-sm">&lt;tag&gt;</code>
					</h3>
					<p class="text-sm mb-2">The interactive view students and instructors see during delivery.</p>
					<ul class="text-sm list-disc list-inside space-y-1">
						<li>Modes: gather, view and evaluate</li>
						<li>
							Roles: student and instructor; for instructors, multiple choice adds rationale and teacher
							instructions in view and evaluate
						</li>
						<li>A custom element, usable from any framework</li>
					</ul>
				</div>
			</div>

			<div class="card bg-secondary/5 border border-secondary/20">
				<div class="card-body">
					<h3 class="card-title text-lg text-secondary">
						Authoring view <code class="text-sm">&lt;tag&gt;-config</code>
					</h3>
					<p class="text-sm mb-2">The form where authors create and edit the item.</p>
					<ul class="text-sm list-disc list-inside space-y-1">
						<li>WYSIWYG editing, with form controls and visual editors</li>
						<li>Rich text for prompts, feedback and other formatted content</li>
						<li>Validation and error handling</li>
						<li>
							Emits <code>model.updated</code> on every edit, so the host can show a live delivery preview
						</li>
					</ul>
				</div>
			</div>

			<div class="card bg-accent/5 border border-accent/20">
				<div class="card-body">
					<h3 class="card-title text-lg text-accent">
						Controller <code class="text-sm">/controller</code>
					</h3>
					<p class="text-sm mb-2">Plain functions that shape and score the element's data.</p>
					<ul class="text-sm list-disc list-inside space-y-1">
						<li><code>model()</code> builds the view model</li>
						<li><code>outcome()</code> scores a session, in elements that score</li>
						<li>Runs in the browser by default, or on your server in hosted mode</li>
						<li>Framework-independent JavaScript</li>
					</ul>
				</div>
			</div>

			<div class="card bg-base-200 border border-base-300">
				<div class="card-body">
					<h3 class="card-title text-lg">Print view <code class="text-sm">/print</code></h3>
					<p class="text-sm">
						A static rendering for paper, drawn by <code>&lt;pie-print&gt;</code>. {PRINT_COUNT} elements
						ship one: {printNames}.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Controller -->
	<section class="mb-12" id="controller">
		<h2 class="text-3xl font-bold text-secondary mb-6">Controller</h2>

		<p class="text-lg max-w-4xl mb-6">
			The controller holds an element's logic apart from its views: plain async functions at
			<code>@pie-element/&lt;name&gt;/controller</code> that turn the stored model into a view model
			and score responses.
		</p>

		<div class="grid lg:grid-cols-2 gap-8 mb-8">
			<div>
				<h3 class="text-2xl font-semibold mb-4">Separate from the views</h3>
				<ul class="space-y-3">
					<li class="flex items-start gap-2">
						<svg
							class="w-5 h-5 text-success mt-0.5 flex-shrink-0"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							aria-hidden="true"
							><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={checkPath} /></svg
						>
						<span
							><strong>Flexible placement:</strong> runs in the browser by default; runs on your server in
							hosted mode for high-stakes delivery.</span
						>
					</li>
					<li class="flex items-start gap-2">
						<svg
							class="w-5 h-5 text-success mt-0.5 flex-shrink-0"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							aria-hidden="true"
							><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={checkPath} /></svg
						>
						<span
							><strong>Answer keys on the server:</strong> in hosted mode, when the host also strips the
							keys from the models it sends.</span
						>
					</li>
					<li class="flex items-start gap-2">
						<svg
							class="w-5 h-5 text-success mt-0.5 flex-shrink-0"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							aria-hidden="true"
							><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={checkPath} /></svg
						>
						<span><strong>Framework independence:</strong> plain JavaScript, with no UI dependency.</span>
					</li>
					<li class="flex items-start gap-2">
						<svg
							class="w-5 h-5 text-success mt-0.5 flex-shrink-0"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							aria-hidden="true"
							><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={checkPath} /></svg
						>
						<span><strong>Testability:</strong> unit tests run without rendering a view.</span>
					</li>
				</ul>
			</div>

			<div class="space-y-4">
				<h3 class="text-2xl font-semibold mb-4">Controller functions</h3>
				<div class="card bg-base-200">
					<div class="card-body p-4">
						<h4 class="font-bold text-primary"><code>model(model, session, env, updateSession?)</code></h4>
						<p class="text-sm">
							Builds the view model for the current mode and role. For multiple choice: correctness and
							feedback only in evaluate mode; rationale and teacher instructions only for instructors in
							view and evaluate; the authored choice order unless <code>lockChoiceOrder</code> is false,
							which shuffles the choices and persists the order through <code>updateSession</code>;
							input disabled outside gather.
						</p>
					</div>
				</div>
				<div class="card bg-base-200">
					<div class="card-body p-4">
						<h4 class="font-bold text-primary"><code>outcome(model, session, env)</code></h4>
						<p class="text-sm">
							Scores a session and returns an object whose <code>score</code> lies between 0 and 1.
							Partial credit applies where the element supports it and partial scoring is enabled.
							Optional: content elements such as passage define none, and manually scored elements
							return 0 with a note.
						</p>
					</div>
				</div>
				<div class="card bg-base-200">
					<div class="card-body p-4">
						<h4 class="font-bold text-primary">Optional helpers</h4>
						<p class="text-sm">
							<code>createDefaultModel()</code> fills defaults for a new item, <code>validate()</code>
							reports authoring errors, and <code>createCorrectResponseSession()</code> builds an
							answer-key session for instructor review.
						</p>
					</div>
				</div>
			</div>
		</div>

		<p class="text-sm text-base-content/70 mb-2">Simplified from the multiple-choice controller:</p>
		<div class="min-w-0">
			<CodeEditor value={controllerExample} language="javascript" readonly={true} height="560px" />
		</div>
	</section>

	<!-- Where the controller runs -->
	<section class="mb-12 scroll-mt-24" id="controller-placement">
		<h2 class="text-3xl font-bold text-secondary mb-6">Where the controller runs</h2>

		<p class="text-lg max-w-4xl">
			Where the controller runs decides what the browser sees. <code>role</code> and
			<code>mode</code> shape presentation; they are public attributes and cannot restrict access.
		</p>

		<Diagram
			name="element-controller-flow"
			width={1028}
			height={724}
			alt="Where the controller runs: default and hosted delivery"
		/>

		<div class="grid md:grid-cols-2 gap-6 mb-6">
			<div class="card bg-success/10 border border-success/30">
				<div class="card-body">
					<h3 class="card-title text-success">Default: in the browser</h3>
					<p class="text-sm">
						By default the item player loads bundles that include controllers, and the raw model, answer
						key included, is in the page. The player's <code>provideScore()</code> runs each
						<code>outcome()</code> there. This suits practice and formative use.
					</p>
					<ul class="list-disc list-inside text-sm space-y-1 mt-2">
						<li>Practice quizzes</li>
						<li>Formative assessments</li>
						<li>Development and testing</li>
						<li>Immediate feedback</li>
					</ul>
				</div>
			</div>

			<div class="card bg-primary/10 border border-primary/30">
				<div class="card-body">
					<h3 class="card-title text-primary">Hosted: on your server</h3>
					<p class="text-sm">For high-stakes delivery:</p>
					<ol class="list-decimal list-inside text-sm space-y-1">
						<li>
							run the player in hosted mode (<code>hosted</code>, or <code>backend.delivery</code>), which
							loads bundles without controllers;
						</li>
						<li>strip answer keys from the models you send;</li>
						<li>call <code>outcome()</code> on your server.</li>
					</ol>
					<p class="text-sm mt-2">
						Suits state accountability tests, certification exams and other summative assessments.
					</p>
				</div>
			</div>
		</div>

		<p class="text-base-content/80">
			The <ExternalLink href={DOCS.security}>security guide</ExternalLink> covers delivery integrity in
			full.
		</p>
	</section>

	<!-- Delivery view -->
	<section class="mb-12">
		<h2 class="text-3xl font-bold text-secondary mb-6">Delivery view</h2>

		<div class="grid lg:grid-cols-2 gap-8 mb-6">
			<div>
				<h3 class="text-xl font-semibold mb-3">Custom elements</h3>
				<p class="mb-3">
					Element views are custom elements, packaged to the Web Components standard:
				</p>
				<ul class="list-disc list-inside space-y-1 text-sm">
					<li>Native browser standard, with no polyfills</li>
					<li>Works with React, Vue, Angular, Svelte and plain JavaScript</li>
					<li>
						Light DOM rendering, styled through theme CSS custom properties from
						<code>&lt;pie-theme&gt;</code>
					</li>
					<li>Standard DOM APIs for integration</li>
				</ul>
			</div>
			<div>
				<h3 class="text-xl font-semibold mb-3">Data flow</h3>
				<p class="text-sm mb-3">
					The player sets <code>model</code> (the view model) and <code>session</code> (this element's
					entry). The element writes responses into that session object and dispatches
					<code>session-changed</code> with <code>{'{ complete, component }'}</code>, bubbling and
					composed.
				</p>
				<p class="text-sm">
					Hosts address <code>&lt;pie-item-player&gt;</code>, which registers each element under a
					versioned tag; the host example is on
					<a href="{base}/docs/items-elements/" class="link link-primary">Items and Elements</a>.
				</p>
			</div>
		</div>

		<div class="card bg-base-200">
			<div class="card-body">
				<h3 class="font-bold mb-3">Communication pattern</h3>
				<div class="overflow-x-auto">
					<table class="table table-sm">
						<thead>
							<tr>
								<th scope="col"><span class="sr-only">Direction</span></th>
								<th scope="col">Delivery element <code>&lt;tag&gt;</code></th>
								<th scope="col">Authoring element <code>&lt;tag&gt;-config</code></th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<th scope="row">Player sets</th>
								<td><code>model</code> (view model), <code>session</code> (this element's entry)</td>
								<td><code>model</code>, then <code>configuration</code></td>
							</tr>
							<tr>
								<th scope="row">Element emits</th>
								<td>
									<code>session-changed</code> {'{ complete, component }'}; <code>model-set</code>
									{'{ complete, component, hasModel }'}
								</td>
								<td>
									<code>model.updated</code> {'{ update, reset }'}; <code>insert.image</code>,
									<code>delete.image</code>, <code>insert.sound</code>, <code>delete.sound</code>
								</td>
							</tr>
							<tr>
								<th scope="row">Player re-emits to host</th>
								<td><code>session-changed</code> with <code>detail.session</code></td>
								<td><code>model-updated</code></td>
							</tr>
						</tbody>
					</table>
				</div>
				<p class="text-sm mt-3">
					The host answers the media events through the item player's <code>onInsertImage</code>,
					<code>onDeleteImage</code>, <code>onInsertSound</code> and <code>onDeleteSound</code> hooks.
					Validation is the controller's <code>validate()</code>, which the player runs through
					<code>validateModels()</code> in author mode.
				</p>
			</div>
		</div>
	</section>

	<!-- Authoring view -->
	<section class="mb-12">
		<h2 class="text-3xl font-bold text-secondary mb-6">Authoring view</h2>

		<p class="text-lg max-w-4xl mb-6">
			The authoring view gives educators a WYSIWYG editor for creating and configuring questions
			without writing code. The host's <code>configuration</code> customizes it, merged over the
			element's defaults.
		</p>

		<div class="grid md:grid-cols-3 gap-6">
			<div class="card bg-base-100 border border-base-300">
				<div class="card-body">
					<h3 class="font-bold text-primary">Configuration forms</h3>
					<p class="text-sm">
						Standard form controls (inputs, selects, checkboxes) for setting element properties.
					</p>
				</div>
			</div>
			<div class="card bg-base-100 border border-base-300">
				<div class="card-body">
					<h3 class="font-bold text-primary">Rich text editors</h3>
					<p class="text-sm">WYSIWYG editors for prompts, feedback and other formatted content.</p>
				</div>
			</div>
			<div class="card bg-base-100 border border-base-300">
				<div class="card-body">
					<h3 class="font-bold text-primary">Live preview in the host</h3>
					<p class="text-sm">
						Each edit emits <code>model.updated</code>, which the item player re-emits as
						<code>model-updated</code>, so the host can show a live delivery preview beside the
						editor.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Element contract -->
	<section class="mb-12">
		<div class="card bg-primary/5 border border-primary/20">
			<div class="card-body">
				<h2 class="card-title text-2xl text-primary">Element contract</h2>
				<p>
					The <ExternalLink href={DOCS.elementContract}>element contract</ExternalLink> in
					pie-elements-ng is the normative reference for the controller, delivery, authoring and print
					interfaces, and for the npm package surface players rely on.
				</p>
			</div>
		</div>
	</section>
</div>
