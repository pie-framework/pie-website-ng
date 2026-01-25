<script lang="ts">
	const elementCategories = [
		{
			title: 'Simple Response',
			icon: '✏️',
			color: 'primary',
			description: 'Straightforward input-based questions',
			elements: [
				{
					name: 'Multiple Choice',
					package: '@pie-element/multiple-choice',
					description: 'Single or multiple answer selection with radio buttons or checkboxes',
					features: ['Single/multiple selection', 'Partial credit', 'Choice shuffling', 'Rich text choices']
				},
				{
					name: 'Inline Choice',
					package: '@pie-element/inline-choice',
					description: 'Dropdown selections embedded within text',
					features: ['Embedded dropdowns', 'Context-rich questions', 'Multiple dropdowns per item']
				},
				{
					name: 'Text Entry',
					package: '@pie-element/text-entry',
					description: 'Short text responses with various validation options',
					features: ['Case sensitivity options', 'Multiple correct answers', 'Pattern matching']
				},
				{
					name: 'Extended Text Entry',
					package: '@pie-element/extended-text-entry',
					description: 'Long-form constructed responses with rich text editing',
					features: ['Rich text editor', 'Word count', 'Character limits', 'Rubric support']
				},
				{
					name: 'Math Inline',
					package: '@pie-element/math-inline',
					description: 'Mathematical expression input with LaTeX rendering',
					features: ['LaTeX support', 'Math keyboard', 'Expression validation', 'Multiple formats']
				}
			]
		},
		{
			title: 'Matching & Categorization',
			icon: '🔗',
			color: 'secondary',
			description: 'Connect, sort, and organize items',
			elements: [
				{
					name: 'Match',
					package: '@pie-element/match',
					description: 'Connect items from two lists by drawing lines',
					features: ['One-to-one matching', 'Visual connections', 'Drag or click interface']
				},
				{
					name: 'Match List',
					package: '@pie-element/match-list',
					description: 'Match items using dropdown selections',
					features: ['Dropdown matching', 'Multiple columns', 'Partial credit scoring']
				},
				{
					name: 'Categorize',
					package: '@pie-element/categorize',
					description: 'Sort items into categories by dragging',
					features: ['Multiple categories', 'Drag and drop', 'Category limits', 'Alternate answers']
				},
				{
					name: 'Placement Ordering',
					package: '@pie-element/placement-ordering',
					description: 'Arrange items in correct sequence on a line',
					features: ['Linear ordering', 'Snap positions', 'Visual feedback']
				},
				{
					name: 'Drag in the Blank',
					package: '@pie-element/drag-in-the-blank',
					description: 'Drag words or phrases into blank spaces within text',
					features: ['Inline dragging', 'Multiple blanks', 'Choice banks', 'Reusable choices']
				}
			]
		},
		{
			title: 'Visual & Graphical',
			icon: '🎨',
			color: 'accent',
			description: 'Image-based and graphical interactions',
			elements: [
				{
					name: 'Hotspot',
					package: '@pie-element/hotspot',
					description: 'Click or select regions on an image',
					features: ['Polygon regions', 'Rectangle regions', 'Multiple selections', 'Image annotations']
				},
				{
					name: 'Image Cloze',
					package: '@pie-element/image-cloze',
					description: 'Drag items onto specific locations on an image',
					features: ['Drop zones', 'Image backgrounds', 'Multiple responses', 'Snap to position']
				},
				{
					name: 'Drawing Response',
					package: '@pie-element/drawing-response',
					description: 'Draw or annotate directly on an image',
					features: ['Freehand drawing', 'Shapes', 'Colors', 'Erase tool']
				},
				{
					name: 'Graphing',
					package: '@pie-element/graphing',
					description: 'Plot points, lines, and shapes on coordinate planes',
					features: ['Point plotting', 'Line graphing', 'Parabolas', 'Custom grid settings']
				},
				{
					name: 'Number Line',
					package: '@pie-element/number-line',
					description: 'Plot points, lines, or ranges on a number line',
					features: ['Point plotting', 'Line segments', 'Rays', 'Custom scale']
				}
			]
		},
		{
			title: 'Math & Science',
			icon: '🔬',
			color: 'info',
			description: 'Specialized STEM question types',
			elements: [
				{
					name: 'Math Templated',
					package: '@pie-element/math-templated',
					description: 'Generate randomized math problems from templates',
					features: ['Variable substitution', 'Dynamic generation', 'Expression evaluation']
				},
				{
					name: 'Explicit Constructed Response',
					package: '@pie-element/explicit-constructed-response',
					description: 'Structured multi-part responses with scoring',
					features: ['Multiple response areas', 'Partial credit', 'Validation rules']
				}
			]
		},
		{
			title: 'Support Elements',
			icon: '📝',
			color: 'neutral',
			description: 'Non-scored content and scaffolding',
			elements: [
				{
					name: 'Passage',
					package: '@pie-element/passage',
					description: 'Display reading passages with rich formatting',
					features: ['Rich text display', 'Images', 'Scrollable content', 'No scoring']
				},
				{
					name: 'Rubric',
					package: '@pie-element/rubric',
					description: 'Scoring guidelines for open-ended responses',
					features: ['Criteria display', 'Point values', 'Performance levels', 'Instructor view']
				}
			]
		}
	];

	const filterOptions = ['All', 'Simple Response', 'Matching & Categorization', 'Visual & Graphical', 'Math & Science', 'Support Elements'];
	let selectedFilter = $state('All');

	const filteredCategories = $derived(
		selectedFilter === 'All'
			? elementCategories
			: elementCategories.filter(cat => cat.title === selectedFilter)
	);
</script>

<div class="container mx-auto px-4 py-12 max-w-7xl">
	<!-- Hero -->
	<div class="text-center mb-12">
		<h1 class="text-5xl font-bold text-secondary mb-4">PIE Elements Catalog</h1>
		<p class="text-xl text-base-content/70 max-w-3xl mx-auto">
			Explore 20+ production-ready question types. Each element includes delivery UI, authoring UI, and controllers.
		</p>
		<p>
			<a href="https://pieoneer.pie-api.com/etl/playground/pie" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-lg">
				Open Playground
				<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
				</svg>
			</a>
		</p>
	</div>

	<!-- Filter Tabs -->
	<div class="flex flex-wrap gap-2 justify-center mb-12">
		{#each filterOptions as filter}
			<button
				class="btn btn-sm {selectedFilter === filter ? 'btn-primary' : 'btn-ghost'}"
				onclick={() => selectedFilter = filter}
			>
				{filter}
			</button>
		{/each}
	</div>

	<!-- Categories -->
	<div class="space-y-16">
		{#each filteredCategories as category}
			<section>
				<div class="flex items-center gap-3 mb-6">
					<span class="text-4xl">{category.icon}</span>
					<div>
						<h2 class="text-3xl font-bold text-{category.color}">{category.title}</h2>
						<p class="text-base-content/70">{category.description}</p>
					</div>
				</div>

				<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
					{#each category.elements as element}
						<div class="card bg-base-100 shadow-xl border border-base-300 hover:shadow-2xl transition-all hover:scale-[1.02]">
							<div class="card-body">
								<h3 class="card-title text-{category.color} text-xl">{element.name}</h3>
								<p class="text-sm text-base-content/70 mb-4">{element.description}</p>

								<div class="space-y-2 mb-4">
									<p class="text-xs font-semibold text-base-content/60 uppercase">Key Features</p>
									<ul class="text-sm space-y-1">
										{#each element.features as feature}
											<li class="flex items-start gap-2">
												<svg class="w-4 h-4 text-{category.color} mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
												</svg>
												<span>{feature}</span>
											</li>
										{/each}
									</ul>
								</div>

								<div class="card-actions justify-between items-center mt-auto pt-4 border-t border-base-300">
									<code class="text-xs bg-base-200 px-2 py-1 rounded">{element.package}</code>
									<a
										href="https://github.com/pie-framework/pie-elements/tree/develop/packages/{element.package.split('/')[1]}"
										target="_blank"
										rel="noopener noreferrer"
										class="btn btn-sm btn-outline btn-{category.color}"
									>
										View on GitHub
										<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
										</svg>
									</a>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</section>
		{/each}
	</div>
</div>
