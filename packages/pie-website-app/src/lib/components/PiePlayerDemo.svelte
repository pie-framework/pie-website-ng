<script lang="ts">
	import { onMount } from 'svelte';
	import CodeEditor from './CodeEditor.svelte';
	import PiePlayerStyles from './PiePlayerStyles.svelte';

	interface Props {
		elementName?: string;
		model: any;
		session?: any;
		showTabs?: boolean;
		height?: string;
	}

	let {
		elementName = 'multiple-choice',
		model,
		session = $bindable({ id: '1', value: [] }),
		showTabs = true,
		height = '500px'
	}: Props = $props();

	// State
	let playerLoaded = $state(false);
	let errorMessage = $state('');
	let activeTab: 'demo' | 'source' | 'edit' = $state('demo');
	let mode: 'gather' | 'view' | 'evaluate' = $state('gather');
	let role: 'student' | 'instructor' = $state('student');
	let jsonError = $state('');
	let piePlayerElement: any = $state(null);
	let pieAuthorElement: any = $state(null);

	// Derived value that updates when model changes
	let jsonValue = $derived(JSON.stringify(model, null, 2));

	// Build the config structure that pie-player expects
	const config = $derived({
		elements: {
			[`${elementName}-element`]: `@pie-element/${elementName}@latest`
		},
		models: [model],
		markup: `<${elementName}-element id="${model.id || '1'}"></${elementName}-element>`
	});

	const env = $derived({
		mode,
		role
	});

	onMount(() => {
		// Load PIE Player components
		const playerUrl = 'https://cdn.jsdelivr.net/npm/@pie-framework/pie-player-components@latest/dist/pie-player-components/pie-player-components.esm.js';

		const loadScript = (src: string) => new Promise<void>((resolve, reject) => {
			const scriptElement = document.createElement('script');
			scriptElement.src = src;
			scriptElement.type = 'module';
			scriptElement.async = true;
			scriptElement.onload = () => resolve();
			scriptElement.onerror = () => reject(new Error(`Could not load script ${src}`));
			document.head.appendChild(scriptElement);
		});

		loadScript(playerUrl)
			.then(() => {
				return Promise.all([
					customElements.whenDefined('pie-player'),
					customElements.whenDefined('pie-author')
				]);
			})
			.then(() => {
				console.log('PIE Player and Author loaded and ready');
				playerLoaded = true;
			})
			.catch((error) => {
				console.error('Error loading PIE Player components:', error);
				errorMessage = `Failed to load PIE components: ${error.message}`;
			});
	});

	function handleJsonChange(newJson: string) {
		try {
			const parsed = JSON.parse(newJson);
			model = parsed;
			jsonError = '';
			// config will automatically update via $derived reactivity
		} catch (e: any) {
			jsonError = e.message;
		}
	}

	function handleModelUpdated(event: CustomEvent) {
		console.debug('pie-author model updated:', event.detail);
		if (!event.detail) return;

		// Update the model with changes from the author
		const updatedConfig = event.detail;
		if (updatedConfig && updatedConfig.models && updatedConfig.models[0]) {
			model = updatedConfig.models[0];
		}
	}
</script>

<div class="pie-player-demo">
	<!-- Error Display -->
	{#if errorMessage}
		<div class="alert alert-error mb-4 text-sm">
			<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
			<span>{errorMessage}</span>
		</div>
	{/if}

	<!-- Tabs and Controls Container -->
	<div class="border border-base-300 rounded-lg bg-base-100">
		<!-- Tabs Header with Controls -->
		{#if showTabs}
			<div class="flex items-center justify-between border-b border-base-300 bg-base-200/50">
				<div role="tablist" class="tabs">
					<button
						role="tab"
						class="tab tab-lifted tab-lg border-b-0"
						class:tab-active={activeTab === 'demo'}
						onclick={() => (activeTab = 'demo')}
					>
						PIE Preview
					</button>
					<button
						role="tab"
						class="tab tab-lifted tab-lg border-b-0"
						class:tab-active={activeTab === 'source'}
						onclick={() => (activeTab = 'source')}
					>
						PIE Source
					</button>
					<button
						role="tab"
						class="tab tab-lifted tab-lg border-b-0"
						class:tab-active={activeTab === 'edit'}
						onclick={() => (activeTab = 'edit')}
					>
						Edit
					</button>
				</div>

				<!-- Mode and Role Controls on the right -->
				<div class="flex items-center gap-2 px-4">
					<div class="flex items-center gap-2">
						{#each [
							{ value: 'gather', label: 'Gather' },
							{ value: 'view', label: 'View' },
							{ value: 'evaluate', label: 'Evaluate' }
						] as modeOption}
							<label class="flex items-center gap-1 cursor-pointer">
								<input
									type="radio"
									name="mode"
									value={modeOption.value}
									bind:group={mode}
									disabled={!playerLoaded}
									class="radio radio-sm"
								/>
								<span class="text-sm">{modeOption.label}</span>
							</label>
						{/each}
					</div>

					<div class="divider divider-horizontal mx-2"></div>

					<div class="flex items-center gap-2">
						{#each [
							{ value: 'student', label: 'Student' },
							{ value: 'instructor', label: 'Instructor' }
						] as roleOption}
							<label class="flex items-center gap-1 cursor-pointer">
								<input
									type="radio"
									name="role"
									value={roleOption.value}
									bind:group={role}
									disabled={!playerLoaded}
									class="radio radio-sm"
								/>
								<span class="text-sm">{roleOption.label}</span>
							</label>
						{/each}
					</div>
				</div>
			</div>
		{/if}

		<!-- Content Area -->
		<div class="pie-player-demo-content">
			{#if activeTab === 'demo' || !showTabs}
				<!-- Player Tab -->
				<div class="p-6" style="min-height: {height}">
					{#if !playerLoaded}
						<div class="flex items-center justify-center" style="height: {height}">
							<div class="text-center">
								<div class="loading loading-spinner loading-lg mb-4"></div>
								<p class="text-base-content/60">Loading PIE Player...</p>
							</div>
						</div>
					{:else}
						<PiePlayerStyles>
							<pie-player
								bind:this={piePlayerElement}
								config={config}
								env={env}
								hosted={false}
								bundleHost="prod"
								add-correct-response={mode === 'evaluate' && role === 'instructor'}
							></pie-player>
						</PiePlayerStyles>
					{/if}
				</div>
			{:else if activeTab === 'source'}
				<!-- Source Tab -->
				<div class="p-6">
					<p class="text-sm text-base-content/70 mb-3">
						Element configuration for <code class="bg-base-200 px-2 py-1 rounded"
							>{elementName}</code
						>
					</p>

				{#if jsonError}
					<div class="alert alert-warning mb-3 text-sm">
						<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
							/>
						</svg>
						<span>JSON Error: {jsonError}</span>
					</div>
				{/if}

				<CodeEditor value={jsonValue} language="json" onChange={handleJsonChange} {height} />

					<div class="mt-4 text-sm text-base-content/60">
						<p class="mb-2 font-semibold">Understanding the Model:</p>
						<ul class="space-y-1 list-disc list-inside">
							<li><code>element</code> - The element type identifier</li>
							<li><code>prompt</code> - The question text shown to students</li>
							<li><code>choices</code> - Available answer options (for choice-based questions)</li>
							<li><code>correct</code> - Indicates the correct answer(s)</li>
						</ul>
					</div>
				</div>
			{:else if activeTab === 'edit'}
				<!-- Edit Tab -->
				<div class="p-6" style="min-height: {height}">
					{#if !playerLoaded}
						<div class="flex items-center justify-center" style="height: {height}">
							<div class="text-center">
								<div class="loading loading-spinner loading-lg mb-4"></div>
								<p class="text-base-content/60">Loading PIE Author...</p>
							</div>
						</div>
					{:else}
						<PiePlayerStyles>
							<pie-author
								bind:this={pieAuthorElement}
								config={config}
								env={{ mode: 'view', role: 'instructor' }}
								hosted={false}
								bundleHost="prod"
								onmodelUpdated={handleModelUpdated}
							></pie-author>
						</PiePlayerStyles>
					{/if}
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.pie-player-demo {
		max-width: 100%;
	}

	.pie-player-demo-content {
		width: 100%;
	}

	/* Ensure pie-player takes full width */
	:global(pie-player) {
		display: block;
		width: 100%;
	}
</style>
