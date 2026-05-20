<script lang="ts">
	import { base } from '$app/paths';
	import CodeEditor from '$lib/components/CodeEditor.svelte';

	const elementPropertiesExample = `// Using a PIE element
const element = document.querySelector(
  'pie-multiple-choice'
);

// Set properties
element.model = {
  prompt: "What is 2+2?",
  choices: [...]
};

element.configuration = {
  shuffle: true
};

// Listen to events
element.addEventListener(
  'session-changed',
  (e) => {
    console.log(e.detail);
  }
);`;

	const controllerExample = `// Example controller function signatures

export function model(question, session, env) {
  // question: The authored question configuration
  // session: Student's current response data
  // env: { mode: 'gather'|'view'|'evaluate', role: 'student'|'instructor' }

  const model = { ...question };

  // Filter based on role and mode
  if (env.role === 'student' && env.mode === 'gather') {
    // Remove correct answers for students in gather mode
    delete model.correctResponse;
  }

  return model;
}

export function outcome(question, session, env) {
  // question: The authored question
  // session: Student's submitted response
  // env: Environment context

  const correct = question.correctResponse.value;
  const studentAnswer = session.value;
  const isCorrect = studentAnswer === correct;

  return {
    score: isCorrect ? 1.0 : 0.0,
    completed: true,
    feedback: isCorrect ? 'Correct!' : 'Incorrect. Try again.'
  };
}`;

	const detailedControllerExample = `// pie-element-example/src/controller.ts

export interface ModelConfig {
  prompt: string;
  choices: Array<{ label: string; value: string }>;
  correctResponse: { value: string };
}

export interface Session {
  value?: string;
}

export interface Environment {
  mode: 'gather' | 'view' | 'evaluate';
  role: 'student' | 'instructor';
}

/**
 * Transform question config into view model based on environment
 */
export function model(
  config: ModelConfig,
  session: Session,
  env: Environment
): any {
  const viewModel = {
    prompt: config.prompt,
    choices: config.choices,
    value: session.value
  };

  // Security: Hide correct answers from students in gather mode
  if (env.role === 'student' && env.mode === 'gather') {
    // Don't include correctResponse in view model
    return viewModel;
  }

  // Instructors and evaluate mode get full data
  return {
    ...viewModel,
    correctResponse: config.correctResponse
  };
}

/**
 * Calculate outcome (score and feedback)
 */
export function outcome(
  config: ModelConfig,
  session: Session,
  env: Environment
): any {
  const correct = config.correctResponse.value;
  const studentAnswer = session.value;
  const isCorrect = studentAnswer === correct;

  return {
    score: isCorrect ? 1.0 : 0.0,
    completed: !!studentAnswer,
    correctness: isCorrect ? 'correct' : 'incorrect'
  };
}`;
</script>

<svelte:head>
	<title>Element Structure - PIE Framework</title>
	<meta
		name="description"
		content="Deep dive into PIE element architecture: delivery UI, authoring UI, controllers, and the MVVM security model."
	/>
</svelte:head>

<div class="container mx-auto px-4 py-12 max-w-7xl">
	<!-- Header -->
	<div class="mb-12">
		<h1 class="text-5xl font-bold text-secondary mb-4">Structure of PIE Elements</h1>
		<p class="text-xl text-base-content/70 max-w-3xl">
			Understanding how PIE elements are architected: delivery UI, authoring UI, controllers, and
			security patterns.
		</p>
	</div>

	<!-- Element Components Overview -->
	<section class="mb-12">
		<h2 class="text-3xl font-bold text-secondary mb-6">Element Components Overview</h2>

		<div class="prose max-w-none mb-8">
			<p class="text-lg">
				Every PIE element is composed of three main components that work together to provide a
				complete question type experience:
			</p>
		</div>

		<div class="my-8">
			<img
				src="{base}/images/docs/element-structure/element-structure.jpg"
				alt="Element Structure Diagram"
				class="rounded-lg shadow-lg w-full max-w-3xl mx-auto"
			/>
		</div>

		<div class="grid md:grid-cols-3 gap-6">
			<div class="card bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border border-purple-200 dark:border-purple-700">
				<div class="card-body">
					<div class="flex items-center gap-3 mb-3">
						<svg class="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
						</svg>
						<h3 class="card-title text-lg">Delivery UI</h3>
					</div>
					<p class="text-sm mb-3">
						The interactive interface students and teachers see during assessment delivery.
					</p>
					<ul class="text-xs space-y-1">
						<li>• Student view (answer questions)</li>
						<li>• Teacher view (monitor progress)</li>
						<li>• Mode-aware (gather/view/evaluate)</li>
						<li>• Web Component (framework-agnostic)</li>
					</ul>
				</div>
			</div>

			<div class="card bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 border border-pink-200 dark:border-pink-700">
				<div class="card-body">
					<div class="flex items-center gap-3 mb-3">
						<svg class="w-8 h-8 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
						</svg>
						<h3 class="card-title text-lg">Author UI</h3>
					</div>
					<p class="text-sm mb-3">
						Configuration interface where educators create and edit question content.
					</p>
					<ul class="text-xs space-y-1">
						<li>• WYSIWYG editing experience</li>
						<li>• Form controls and visual editors</li>
						<li>• Live preview integration</li>
						<li>• Rich text support</li>
						<li>• Validation and error handling</li>
					</ul>
				</div>
			</div>

			<div class="card bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-900/20 dark:to-cyan-800/20 border border-cyan-200 dark:border-cyan-700">
				<div class="card-body">
					<div class="flex items-center gap-3 mb-3">
						<svg class="w-8 h-8 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
						</svg>
						<h3 class="card-title text-lg">Controller</h3>
					</div>
					<p class="text-sm mb-3">
						JavaScript/TypeScript logic that transforms data and calculates scores securely.
					</p>
					<ul class="text-xs space-y-1">
						<li>• <code>model()</code> function</li>
						<li>• <code>outcome()</code> function</li>
						<li>• Client or server execution</li>
						<li>• Security filtering by role</li>
						<li>• Framework-agnostic (pure JS/TS)</li>
					</ul>
				</div>
			</div>
		</div>
	</section>

	<!-- Controller Architecture -->
	<section class="mb-12">
		<h2 class="text-3xl font-bold text-secondary mb-6">Controller Architecture</h2>

		<div class="prose max-w-none mb-6">
			<p class="text-lg">
				Controllers are the "brain" of PIE elements. They transform question data based on context
				and calculate scores while maintaining security.
			</p>
		</div>

		<div class="grid md:grid-cols-2 gap-8 mb-8">
			<div>
				<h3 class="text-2xl font-semibold mb-4">Why Controllers are Separate</h3>
				<p class="mb-4">
					Controllers are implemented as standalone JavaScript/TypeScript functions, separate from
					the UI components. This separation enables:
				</p>
				<ul class="space-y-2">
					<li class="flex items-start gap-2">
						<svg class="w-5 h-5 text-success mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						<span><strong>Flexible deployment:</strong> Run on client for testing or server for security</span>
					</li>
					<li class="flex items-start gap-2">
						<svg class="w-5 h-5 text-success mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						<span><strong>Security control:</strong> Keep correct answers server-side for high-stakes tests</span>
					</li>
					<li class="flex items-start gap-2">
						<svg class="w-5 h-5 text-success mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						<span><strong>Framework independence:</strong> Pure JavaScript works anywhere</span>
					</li>
					<li class="flex items-start gap-2">
						<svg class="w-5 h-5 text-success mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
						</svg>
						<span><strong>Testability:</strong> Easy to unit test without UI dependencies</span>
					</li>
				</ul>
			</div>

			<div>
				<h3 class="text-2xl font-semibold mb-4">Controller Functions</h3>

				<div class="card bg-base-200 mb-4">
					<div class="card-body p-4">
						<h4 class="font-bold text-primary mb-2">model(question, session, env)</h4>
						<p class="text-sm mb-2">
							Transforms the question configuration into a view model for the UI based on the current
							environment (mode and role).
						</p>
						<ul class="text-xs space-y-1">
							<li>• Filters sensitive data (correct answers for students)</li>
							<li>• Includes/excludes feedback based on mode</li>
							<li>• Adapts UI hints based on role</li>
							<li>• Returns only what the user should see</li>
						</ul>
					</div>
				</div>

				<div class="card bg-base-200">
					<div class="card-body p-4">
						<h4 class="font-bold text-primary mb-2">outcome(question, session, env)</h4>
						<p class="text-sm mb-2">
							Calculates the score (0.0-1.0) and provides feedback based on the student's response.
						</p>
						<ul class="text-xs space-y-1">
							<li>• Compares response to correct answer</li>
							<li>• Calculates partial credit if applicable</li>
							<li>• Returns score and completion status</li>
							<li>• Provides correctness feedback</li>
						</ul>
					</div>
				</div>
			</div>
		</div>

		<CodeEditor value={controllerExample} language="javascript" readonly={true} height="600px" />
	</section>

	<!-- MVVM Security Model -->
	<section class="mb-12">
		<h2 class="text-3xl font-bold text-secondary mb-6">MVVM Security Model</h2>

		<div class="prose max-w-none mb-6">
			<p class="text-lg">
				PIE implements a Model-View-ViewModel (MVVM) pattern with controllers acting as security
				gateways.
			</p>
		</div>

		<div class="my-8 flex justify-center">
			<img
				src="{base}/images/docs/architecture/mvvm-security-flow.png"
				alt="MVVM Security Flow"
				class="rounded-lg shadow-lg max-w-2xl w-full"
			/>
		</div>

		<div class="grid md:grid-cols-2 gap-6 mb-8">
			<div class="card bg-success/10 border border-success/30">
				<div class="card-body">
					<h3 class="card-title text-success">Client-Side Execution</h3>
					<p class="text-sm mb-3">
						Controllers run in the browser for development and low-stakes scenarios.
					</p>
					<div class="text-sm space-y-2">
						<p><strong>Use cases:</strong></p>
						<ul class="list-disc list-inside text-xs space-y-1">
							<li>Practice quizzes</li>
							<li>Formative assessments</li>
							<li>Development and testing</li>
							<li>Immediate feedback scenarios</li>
						</ul>
					</div>
				</div>
			</div>

			<div class="card bg-primary/10 border border-primary/30">
				<div class="card-body">
					<h3 class="card-title text-primary">Server-Side Execution</h3>
					<p class="text-sm mb-3">
						Controllers run on your backend for high-stakes assessments requiring answer security.
					</p>
					<div class="text-sm space-y-2">
						<p><strong>Use cases:</strong></p>
						<ul class="list-disc list-inside text-xs space-y-1">
							<li>State accountability tests</li>
							<li>Certification exams</li>
							<li>Summative assessments</li>
							<li>Any high-security scenario</li>
						</ul>
					</div>
				</div>
			</div>
		</div>

		<div class="alert alert-warning">
			<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
			</svg>
			<div>
				<p class="font-semibold">Security Consideration</p>
				<p class="text-sm">
					For high-stakes assessments, always run controllers server-side.
				</p>
			</div>
		</div>
	</section>

	<!-- Delivery UI -->
	<section class="mb-12">
		<h2 class="text-3xl font-bold text-secondary mb-6">Delivery UI</h2>

		<div class="prose max-w-none mb-6">
			<p class="text-lg">
				The delivery UI is implemented as an HTML5 Web Component (Custom Element), making it
				framework-agnostic and universally compatible.
			</p>
		</div>

		<div class="grid md:grid-cols-2 gap-6 mb-6">
			<div>
				<h3 class="text-xl font-semibold mb-3">Web Components Standard</h3>
				<p class="mb-3">
					PIE elements are packaged as Custom Elements following the Web Components specification:
				</p>
				<ul class="space-y-2 text-sm">
					<li class="flex items-start gap-2">
						<span class="text-primary font-bold">•</span>
						<span>Native browser standard (no polyfills needed)</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="text-primary font-bold">•</span>
						<span>Works with React, Vue, Angular, Svelte, vanilla JS</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="text-primary font-bold">•</span>
						<span>Encapsulated styles (optional shadow DOM)</span>
					</li>
					<li class="flex items-start gap-2">
						<span class="text-primary font-bold">•</span>
						<span>Standard DOM APIs for integration</span>
					</li>
				</ul>
			</div>

			<div>
				<h3 class="text-xl font-semibold mb-3">Element Properties</h3>
				<CodeEditor value={elementPropertiesExample} language="javascript" readonly={true} height="350px" />
			</div>
		</div>

		<div class="card bg-base-200">
			<div class="card-body">
				<h4 class="font-bold mb-3">Communication Pattern</h4>
				<div class="grid md:grid-cols-3 gap-4 text-sm">
					<div>
						<p class="font-semibold text-primary mb-2">Properties (Input)</p>
						<ul class="list-disc list-inside text-xs space-y-1">
							<li><code>model</code> - View model from controller</li>
							<li><code>configuration</code> - UI settings</li>
							<li><code>disabled</code> - Read-only mode</li>
						</ul>
					</div>
					<div>
						<p class="font-semibold text-primary mb-2">Events (Output)</p>
						<ul class="list-disc list-inside text-xs space-y-1">
							<li><code>session-changed</code> - Response updated</li>
							<li><code>model-updated</code> - Model changed</li>
							<li><code>focus</code> - Element focused</li>
						</ul>
					</div>
					<div>
						<p class="font-semibold text-primary mb-2">Methods</p>
						<ul class="list-disc list-inside text-xs space-y-1">
							<li><code>insertImage()</code> - Add images</li>
							<li><code>focus()</code> - Set focus</li>
							<li><code>validate()</code> - Check validity</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Authoring UI -->
	<section class="mb-12">
		<h2 class="text-3xl font-bold text-secondary mb-6">Authoring UI</h2>

		<div class="prose max-w-none mb-6">
			<p class="text-lg">
				The authoring interface provides a WYSIWYG experience for educators to create and configure
				questions without writing code.
			</p>
		</div>

		<div class="grid md:grid-cols-3 gap-6 mb-6">
			<div class="card bg-base-100 border border-base-300">
				<div class="card-body">
					<h4 class="font-bold text-primary">Configuration Forms</h4>
					<p class="text-sm">
						Standard form controls (inputs, selects, checkboxes) for setting element properties.
					</p>
				</div>
			</div>
			<div class="card bg-base-100 border border-base-300">
				<div class="card-body">
					<h4 class="font-bold text-primary">Rich Text Editors</h4>
					<p class="text-sm">
						WYSIWYG editors for prompts, feedback, and any formatted text content.
					</p>
				</div>
			</div>
			<div class="card bg-base-100 border border-base-300">
				<div class="card-body">
					<h4 class="font-bold text-primary">Live Preview</h4>
					<p class="text-sm">
						Real-time preview showing exactly how students will see the question.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Code Examples -->
	<section class="mb-12">
		<h2 class="text-3xl font-bold text-secondary mb-6">High-Level Code Example</h2>

		<div class="prose max-w-none mb-6">
			<p class="text-lg">
				Here are simplified examples showing the structure of PIE element components. These are
				conceptual examples, not full implementations.
			</p>
		</div>

		<div class="tabs tabs-boxed mb-4">
			<button class="tab tab-active">Controller</button>
		</div>

		<CodeEditor value={detailedControllerExample} language="typescript" readonly={true} height="700px" />

	</section>

	<!-- Next Steps -->
	<section>
		<h2 class="text-3xl font-bold text-secondary mb-6">Next Steps</h2>

		<div class="grid md:grid-cols-2 gap-6">
			<a
				href="{base}/docs/items-elements/"
				class="card bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition-shadow"
			>
				<div class="card-body">
					<h3 class="card-title text-primary">
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
						</svg>
						Items and Elements
					</h3>
					<p class="text-sm">
						Go back to learn about items vs elements and try a live interactive example.
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
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
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
