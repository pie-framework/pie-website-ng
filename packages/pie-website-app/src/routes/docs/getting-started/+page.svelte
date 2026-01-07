<script lang="ts">
	let currentStep = $state(0);

	const steps = [
		{
			title: 'Install PIE Player',
			icon: '📦',
			description: 'Add the PIE Player components package to your project'
		},
		{
			title: 'Load Components',
			icon: '🔌',
			description: 'Include the PIE Player script in your HTML'
		},
		{
			title: 'Add Your First Question',
			icon: '✨',
			description: 'Create a simple multiple-choice question'
		}
	];

	const prerequisites = [
		{ label: 'Node.js 18+', icon: '✓' },
		{ label: 'npm or yarn', icon: '✓' },
		{ label: 'HTML & JavaScript basics', icon: '✓' },
		{ label: 'Modern web browser', icon: '✓' }
	];

	const envModes = [
		{
			mode: 'gather',
			icon: '✏️',
			label: 'Gather',
			description: 'Student answering questions',
			color: 'primary'
		},
		{
			mode: 'view',
			icon: '👁️',
			label: 'View',
			description: 'Read-only display',
			color: 'secondary'
		},
		{
			mode: 'evaluate',
			icon: '✅',
			label: 'Evaluate',
			description: 'Showing results with feedback',
			color: 'accent'
		}
	];

	const nextSteps = [
		{
			title: 'Explore More Question Types',
			description: 'Try text-entry, drag-and-drop, graphing, and more',
			href: '/elements'
		},
		{
			title: 'Add Scoring',
			description: 'Learn how to evaluate responses and calculate scores',
			href: '/docs/tutorials/outcome-function'
		},
		{
			title: 'Customize Styling',
			description: 'Apply your own CSS to match your brand',
			href: '/docs/tutorials'
		},
		{
			title: 'Build Complete Assessments',
			description: 'Combine multiple questions into full tests',
			href: '/docs/tutorials/backend-design'
		}
	];
</script>

<div class="container mx-auto px-4 py-12 max-w-7xl">
	<!-- Hero -->
	<div class="text-center mb-12">
		<h1 class="text-5xl font-bold text-secondary mb-4">Getting Started with PIE</h1>
		<p class="text-xl text-base-content/70 max-w-3xl mx-auto">
			Get up and running with interactive assessment items in just a few minutes
		</p>
	</div>

	<!-- What You'll Build -->
	<div class="alert bg-primary/10 border-primary/30 mb-12">
		<svg
			class="w-6 h-6 text-primary"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M13 10V3L4 14h7v7l9-11h-7z"
			></path>
		</svg>
		<div>
			<h3 class="font-bold">What You'll Build</h3>
			<div class="text-sm">
				A working PIE Player rendering multiple question types in your web application
			</div>
		</div>
	</div>

	<!-- Prerequisites -->
	<div class="card bg-base-100 shadow-lg border border-base-300 mb-12">
		<div class="card-body">
			<h2 class="card-title text-2xl text-secondary mb-4">Prerequisites</h2>
			<div class="grid sm:grid-cols-2 gap-4">
				{#each prerequisites as prereq}
					<div class="flex items-center gap-3 p-3 rounded-lg bg-base-200">
						<div class="text-accent text-2xl">{prereq.icon}</div>
						<div class="font-medium">{prereq.label}</div>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- Step Progress -->
	<div class="mb-8">
		<ul class="steps steps-vertical lg:steps-horizontal w-full">
			{#each steps as step, i}
				<li class="step {i <= currentStep ? 'step-primary' : ''}" data-content={i < currentStep ? '✓' : i + 1}>
					{step.title}
				</li>
			{/each}
		</ul>
	</div>

	<!-- Step 1: Install -->
	<div class="card bg-base-100 shadow-xl border border-base-300 mb-8">
		<div class="card-body">
			<div class="flex items-center gap-4 mb-4">
				<div class="text-5xl">{steps[0].icon}</div>
				<div>
					<h2 class="card-title text-3xl text-secondary">Step 1: {steps[0].title}</h2>
					<p class="text-base-content/70">{steps[0].description}</p>
				</div>
			</div>

			<div class="tabs tabs-boxed bg-base-200 mb-4">
				<a class="tab tab-active">npm</a>
				<a class="tab">yarn</a>
			</div>

			<div class="mockup-code">
				<pre data-prefix="$"><code>npm install @pie-framework/pie-player-components</code></pre>
			</div>

			<div class="text-sm text-base-content/60 mt-4">
				Or using yarn:
			</div>
			<div class="mockup-code">
				<pre data-prefix="$"><code>yarn add @pie-framework/pie-player-components</code></pre>
			</div>

			<div class="card-actions justify-end mt-4">
				<button class="btn btn-primary" onclick={() => currentStep = Math.max(1, currentStep)}>
					Next Step
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
					</svg>
				</button>
			</div>
		</div>
	</div>

	<!-- Step 2: Load Components -->
	<div class="card bg-base-100 shadow-xl border border-base-300 mb-8">
		<div class="card-body">
			<div class="flex items-center gap-4 mb-4">
				<div class="text-5xl">{steps[1].icon}</div>
				<div>
					<h2 class="card-title text-3xl text-secondary">Step 2: {steps[1].title}</h2>
					<p class="text-base-content/70">{steps[1].description}</p>
				</div>
			</div>

			<div class="mockup-code">
				<pre><code class="language-html">&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
  &lt;meta charset="UTF-8"&gt;
  &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
  &lt;title&gt;My PIE Assessment&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;!-- Your content here --&gt;

  &lt;script type="module"
    src="https://unpkg.com/@pie-framework/pie-player-components@latest/dist/pie-player-components/pie-player-components.esm.js"&gt;
  &lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
			</div>

			<div class="card-actions justify-between mt-4">
				<button class="btn btn-ghost" onclick={() => currentStep = 0}>Previous</button>
				<button class="btn btn-primary" onclick={() => currentStep = Math.max(2, currentStep)}>
					Next Step
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
					</svg>
				</button>
			</div>
		</div>
	</div>

	<!-- Step 3: Add Question -->
	<div class="card bg-base-100 shadow-xl border border-base-300 mb-12">
		<div class="card-body">
			<div class="flex items-center gap-4 mb-4">
				<div class="text-5xl">{steps[2].icon}</div>
				<div>
					<h2 class="card-title text-3xl text-secondary">Step 3: {steps[2].title}</h2>
					<p class="text-base-content/70">{steps[2].description}</p>
				</div>
			</div>

			<div class="mockup-code">
				<pre><code class="language-html">&lt;pie-player id="player1"&gt;&lt;/pie-player&gt;

&lt;script type="module"&gt;
  const player = document.getElementById('player1');

  player.model = &#123;
    id: '1',
    element: 'multiple-choice',
    prompt: 'What is the capital of France?',
    choices: [
      &#123; label: 'London', value: 'london' &#125;,
      &#123; label: 'Berlin', value: 'berlin' &#125;,
      &#123; label: 'Paris', value: 'paris' &#125;,
      &#123; label: 'Madrid', value: 'madrid' &#125;
    ],
    correctResponse: &#123; value: 'paris' &#125;
  &#125;;

  player.session = &#123; value: null &#125;;

  player.env = &#123;
    mode: 'gather',
    role: 'student'
  &#125;;
&lt;/script&gt;</code></pre>
			</div>

			<div class="card-actions justify-between mt-4">
				<button class="btn btn-ghost" onclick={() => currentStep = 1}>Previous</button>
				<button class="btn btn-success">
					Complete!
					<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
					</svg>
				</button>
			</div>
		</div>
	</div>

	<!-- Understanding the Code -->
	<div class="mb-12">
		<h2 class="text-3xl font-bold text-secondary mb-6">Understanding the Code</h2>
		<div class="grid md:grid-cols-3 gap-6">
			<!-- Model -->
			<div class="card bg-base-100 shadow-lg border border-primary/30">
				<div class="card-body">
					<h3 class="card-title text-xl">The Model</h3>
					<p class="text-sm text-base-content/70 mb-4">
						Defines what your question looks like
					</p>
					<ul class="space-y-2 text-sm">
						<li class="flex items-start gap-2">
							<span class="text-primary">•</span>
							<div><span class="font-mono text-accent">id</span> - Unique identifier</div>
						</li>
						<li class="flex items-start gap-2">
							<span class="text-primary">•</span>
							<div><span class="font-mono text-accent">element</span> - Question type</div>
						</li>
						<li class="flex items-start gap-2">
							<span class="text-primary">•</span>
							<div><span class="font-mono text-accent">prompt</span> - Question text</div>
						</li>
						<li class="flex items-start gap-2">
							<span class="text-primary">•</span>
							<div><span class="font-mono text-accent">choices</span> - Answer options</div>
						</li>
						<li class="flex items-start gap-2">
							<span class="text-primary">•</span>
							<div><span class="font-mono text-accent">correctResponse</span> - Right answer (hidden)</div>
						</li>
					</ul>
				</div>
			</div>

			<!-- Session -->
			<div class="card bg-base-100 shadow-lg border border-secondary/30">
				<div class="card-body">
					<h3 class="card-title text-xl">The Session</h3>
					<p class="text-sm text-base-content/70 mb-4">
						Stores the student's current response
					</p>
					<ul class="space-y-2 text-sm">
						<li class="flex items-start gap-2">
							<span class="text-secondary">•</span>
							<div>Starts as <span class="font-mono text-accent">null</span> or empty</div>
						</li>
						<li class="flex items-start gap-2">
							<span class="text-secondary">•</span>
							<div>Updates as student interacts</div>
						</li>
						<li class="flex items-start gap-2">
							<span class="text-secondary">•</span>
							<div>Can be persisted and restored</div>
						</li>
					</ul>
				</div>
			</div>

			<!-- Environment -->
			<div class="card bg-base-100 shadow-lg border border-accent/30">
				<div class="card-body">
					<h3 class="card-title text-xl">The Environment</h3>
					<p class="text-sm text-base-content/70 mb-4">
						Controls behavior and permissions
					</p>
					<ul class="space-y-2 text-sm">
						<li class="flex items-start gap-2">
							<span class="text-accent">•</span>
							<div><span class="font-mono text-accent">mode</span> - gather, view, or evaluate</div>
						</li>
						<li class="flex items-start gap-2">
							<span class="text-accent">•</span>
							<div><span class="font-mono text-accent">role</span> - student or instructor</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>

	<!-- Environment Modes -->
	<div class="mb-12">
		<h3 class="text-2xl font-bold text-secondary mb-6">Environment Modes</h3>
		<div class="grid md:grid-cols-3 gap-6">
			{#each envModes as mode}
				<div class="card bg-base-100 shadow-lg border border-{mode.color}/30 hover:shadow-xl transition-shadow">
					<div class="card-body items-center text-center">
						<div class="text-5xl mb-4">{mode.icon}</div>
						<h4 class="card-title text-{mode.color}">{mode.label}</h4>
						<p class="text-sm text-base-content/70">{mode.description}</p>
						<div class="badge badge-{mode.color} badge-outline mt-2">{mode.mode}</div>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Try It Out -->
	<div class="card bg-accent text-accent-content shadow-xl mb-12">
		<div class="card-body">
			<h2 class="card-title text-3xl mb-4">Try It Out!</h2>
			<p class="mb-4">Save your HTML file and open it in a browser. You should see:</p>
			<div class="bg-base-100 p-6 rounded-lg">
				<img
					src="/images/pie-multiple-choice-sample.png"
					alt="Example multiple-choice question"
					class="rounded-lg shadow-lg max-w-full"
				/>
			</div>
			<div class="mt-4 space-y-2">
				<div class="flex items-center gap-2">
					<span class="badge badge-primary">1</span>
					<span>The question prompt</span>
				</div>
				<div class="flex items-center gap-2">
					<span class="badge badge-primary">2</span>
					<span>Four radio button choices</span>
				</div>
				<div class="flex items-center gap-2">
					<span class="badge badge-primary">3</span>
					<span>Interactive selection behavior</span>
				</div>
			</div>
		</div>
	</div>

	<!-- What's Next -->
	<div class="mb-12">
		<h2 class="text-3xl font-bold text-secondary mb-6">What's Next?</h2>
		<div class="grid md:grid-cols-2 gap-6">
			{#each nextSteps as step}
				<a
					href={step.href}
					class="card bg-base-100 shadow-lg border border-base-300 hover:shadow-xl hover:border-primary transition-all"
				>
					<div class="card-body">
						<h3 class="card-title text-primary">{step.title}</h3>
						<p class="text-sm text-base-content/70">{step.description}</p>
						<div class="card-actions justify-end">
							<svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
							</svg>
						</div>
					</div>
				</a>
			{/each}
		</div>
	</div>

	<!-- Troubleshooting -->
	<div class="card bg-base-100 shadow-lg border border-base-300 mb-12">
		<div class="card-body">
			<h2 class="card-title text-2xl text-secondary mb-4">Common Issues</h2>
			<div class="join join-vertical w-full">
				<div class="collapse collapse-arrow join-item border border-base-300">
					<input type="radio" name="accordion" />
					<div class="collapse-title font-medium">Components Not Loading?</div>
					<div class="collapse-content">
						<p class="text-sm text-base-content/70">
							Make sure your script tag has <code class="text-accent">type="module"</code> and the URL is
							correct. Check your browser console for errors.
						</p>
					</div>
				</div>
				<div class="collapse collapse-arrow join-item border border-base-300">
					<input type="radio" name="accordion" />
					<div class="collapse-title font-medium">Question Not Appearing?</div>
					<div class="collapse-content">
						<p class="text-sm text-base-content/70">
							Verify that all three properties are set: <code class="text-accent">model</code>,
							<code class="text-accent">session</code>, and <code class="text-accent">env</code>. Missing
							any one will prevent rendering.
						</p>
					</div>
				</div>
				<div class="collapse collapse-arrow join-item border border-base-300">
					<input type="radio" name="accordion" />
					<div class="collapse-title font-medium">Styling Looks Wrong?</div>
					<div class="collapse-content">
						<p class="text-sm text-base-content/70">
							PIE uses modern CSS. Make sure your HTML document has proper viewport meta tags.
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- CTA -->
	<div class="text-center">
		<a href="/docs/core-concepts" class="btn btn-primary btn-lg">
			Continue to Core Concepts
			<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
			</svg>
		</a>
	</div>
</div>
