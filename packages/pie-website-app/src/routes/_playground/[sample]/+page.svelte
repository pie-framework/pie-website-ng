<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { playground } from '$lib/stores/playground';
	import TiptapJsonEditor from '$lib/components/TiptapJsonEditor.svelte';
	import { samples, categories, getSampleById } from '$lib/playground-samples';

	// Get sample ID from URL
	const sampleId = $derived($page.params.sample);
	const currentSample = $derived(getSampleById(sampleId || ''));

	// State
	let playerLoaded = $state(false);
	let errorMessage = $state('');
	let jsonError = $state('');
	let showSaveDialog = $state(false);
	let saveItemName = $state('');
	let activeTab: 'player' | 'source' = $state('player'); // Player active by default
	let jsonValue = $state('');

	// Initialize from sample when it changes
	$effect(() => {
		if (currentSample) {
			playground.loadSample(currentSample.item.config);
			jsonValue = JSON.stringify(currentSample.item.config, null, 2);
		}
	});

	// Update jsonValue when playground changes
	$effect(() => {
		jsonValue = JSON.stringify($playground.currentItem, null, 2);
	});

	// Re-render when mode or role changes
	$effect(() => {
		if (playerLoaded && ($playground.mode || $playground.role)) {
			renderItem();
		}
	});

	onMount(async () => {
		// Redirect to first sample if no sample specified
		if (!sampleId || !currentSample) {
			goto(`/playground/${samples[0].id}`);
			return;
		}

		try {
			// Load PIE Player from CDN
			const script = document.createElement('script');
			script.type = 'module';
			script.src =
				'https://cdn.jsdelivr.net/npm/@pie-framework/pie-player-components@latest/dist/pie-player-components/pie-player-components.esm.js';

			script.onload = () => {
				playerLoaded = true;
				// Wait for custom elements to be registered
				customElements.whenDefined('pie-player').then(() => {
					renderItem();
				});
			};

			script.onerror = () => {
				errorMessage = 'Failed to load PIE Player from CDN.';
			};

			document.head.appendChild(script);
		} catch (error) {
			errorMessage = `Error: ${error}`;
		}
	});

	function handleJsonChange(newJson: string) {
		jsonValue = newJson;
		try {
			const parsed = JSON.parse(newJson);
			playground.setCurrentItem(parsed);
			jsonError = '';
			if (activeTab === 'player') {
				renderItem();
			}
		} catch (e: any) {
			jsonError = e.message;
		}
	}

	function renderItem() {
		if (!playerLoaded) return;

		const container = document.getElementById('player-container');
		if (!container) return;

		// Clear previous render
		container.innerHTML = '';

		try {
			// Create player element
			const player = document.createElement('pie-player') as any;

			// Use the full item config directly (already has elements, models, and markup)
			const itemConfig = $playground.currentItem;

			console.log('Setting player config:', itemConfig);

			// Set bundle host for package resolution
			player.bundleHost = 'prod';

			// Set environment first
			player.env = {
				mode: $playground.mode,
				role: $playground.role
			};

			// Set config last (triggers rendering)
			player.config = itemConfig;

			// Listen for events
			player.addEventListener('load-complete', () => {
				console.log('Player loaded successfully');
				errorMessage = '';
			});

			player.addEventListener('player-error', (event: CustomEvent) => {
				console.error('Player error:', event.detail);
				errorMessage = `Player error: ${event.detail?.message || 'Unknown error'}`;
			});

			player.addEventListener('session-changed', (event: CustomEvent) => {
				console.log('Session changed:', event.detail);
			});

			container.appendChild(player);
			jsonError = '';
		} catch (error: any) {
			errorMessage = `Render error: ${error.message}`;
		}
	}

	function formatJson() {
		try {
			const parsed = JSON.parse(jsonValue);
			jsonValue = JSON.stringify(parsed, null, 2);
		} catch (e) {
			// Already showing error
		}
	}

	function saveItem() {
		if (saveItemName.trim()) {
			playground.saveItem(saveItemName);
			saveItemName = '';
			showSaveDialog = false;
		}
	}

	function loadSavedItem(id: string) {
		playground.loadItem(id);
		renderItem();
	}

	function deleteSavedItem(id: string) {
		playground.deleteItem(id);
	}

	// Switch to player tab when rendering
	function switchToPlayer() {
		activeTab = 'player';
		if (playerLoaded) {
			// Small delay to ensure DOM is ready
			setTimeout(() => renderItem(), 100);
		}
	}
</script>

<svelte:head>
	<title>PIE Playground - {currentSample?.name || 'Interactive'}</title>
	<meta
		name="description"
		content="Edit PIE JSON and see live preview. State saved automatically in your browser."
	/>
</svelte:head>

<div class="min-h-screen bg-base-100">
	<div class="container mx-auto px-4 py-8">
		<h1 class="text-4xl font-bold mb-2">PIE Playground</h1>
		<p class="text-base-content/70 mb-6">
			Edit PIE JSON and see live preview. State saved automatically in your browser.
		</p>

		<!-- Toolbar -->
		<div class="flex flex-wrap items-center gap-4 mb-6 p-4 bg-base-200 rounded-lg">
			<!-- Environment Mode -->
			<select class="select select-sm select-bordered" bind:value={$playground.mode}>
				<option value="gather">Mode: Gather</option>
				<option value="view">Mode: View</option>
				<option value="evaluate">Mode: Evaluate</option>
			</select>

			<!-- Role -->
			<select class="select select-sm select-bordered" bind:value={$playground.role}>
				<option value="student">Role: Student</option>
				<option value="instructor">Role: Instructor</option>
			</select>

			<div class="flex gap-2 ml-auto">
				{#if activeTab === 'source'}
					<button class="btn btn-sm btn-outline" onclick={formatJson}>Format JSON</button>
				{/if}
				<button class="btn btn-sm btn-primary" onclick={() => (showSaveDialog = true)}>
					Save Item
				</button>
			</div>
		</div>

		<!-- Error Display -->
		{#if errorMessage}
			<div class="alert alert-error mb-6">
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

		<!-- Main Content -->
		<div class="flex gap-6">
			<!-- Sidebar -->
			<div class="w-64 flex-shrink-0">
				<!-- Sample Templates -->
				<div class="mb-6">
					<h3 class="font-semibold mb-3">Sample Templates</h3>
					<div class="space-y-2">
						{#each categories as category}
							{#if category.samples.length > 0}
								<div class="mb-4">
									<div class="text-sm font-medium text-base-content/60 mb-1">{category.name}</div>
									{#each category.samples as sample}
										<a
											href="/playground/{sample.id}"
											class="block px-3 py-2 rounded text-sm hover:bg-base-200 transition-colors"
											class:bg-primary={sampleId === sample.id}
											class:text-primary-content={sampleId === sample.id}
										>
											{sample.name}
										</a>
									{/each}
								</div>
							{/if}
						{/each}
					</div>
				</div>

				<!-- Saved Items -->
				<div>
					<h3 class="font-semibold mb-3">Saved Items</h3>
					{#if $playground.savedItems.length === 0}
						<p class="text-sm text-base-content/60">No saved items yet</p>
					{:else}
						<div class="space-y-1">
							{#each $playground.savedItems as saved}
								<div class="flex items-center gap-2">
									<button
										class="flex-1 text-left px-3 py-2 rounded text-sm hover:bg-base-200 truncate"
										onclick={() => loadSavedItem(saved.id)}
									>
										{saved.name}
									</button>
									<button
										class="btn btn-xs btn-ghost btn-square"
										onclick={() => deleteSavedItem(saved.id)}
										aria-label="Delete {saved.name}"
									>
										<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M6 18L18 6M6 6l12 12"
											/>
										</svg>
									</button>
								</div>
							{/each}
						</div>
					{/if}
				</div>
			</div>

			<!-- Main Area with Tabs -->
			<div class="flex-1">
				<!-- Tab Navigation -->
				<div role="tablist" class="tabs tabs-boxed mb-4">
					<button
						role="tab"
						class="tab"
						class:tab-active={activeTab === 'player'}
						onclick={switchToPlayer}
					>
						Player
					</button>
					<button
						role="tab"
						class="tab"
						class:tab-active={activeTab === 'source'}
						onclick={() => (activeTab = 'source')}
					>
						Source
					</button>
				</div>

				<!-- Tab Content -->
				<div class="playground-content">
					{#if activeTab === 'player'}
						<!-- Player Tab -->
						<div class="border border-base-300 rounded-lg p-8 bg-base-100 min-h-[600px]">
							{#if !playerLoaded}
								<div class="flex items-center justify-center h-[600px]">
									<div class="text-center">
										<div class="loading loading-spinner loading-lg mb-4"></div>
										<p class="text-base-content/60">Loading PIE Player...</p>
									</div>
								</div>
							{:else}
								<div id="player-container"></div>
							{/if}
						</div>
					{:else}
						<!-- Source Tab -->
						<div>
							{#if jsonError}
								<div class="alert alert-warning mb-3 text-sm">
									<span>JSON Error: {jsonError}</span>
								</div>
							{/if}
							<TiptapJsonEditor value={jsonValue} onChange={handleJsonChange} height="600px" />
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>

<!-- Save Dialog -->
{#if showSaveDialog}
	<div class="modal modal-open">
		<div class="modal-box">
			<h3 class="font-bold text-lg mb-4">Save Item</h3>
			<input
				type="text"
				placeholder="Enter item name"
				class="input input-bordered w-full"
				bind:value={saveItemName}
				onkeydown={(e) => e.key === 'Enter' && saveItem()}
			/>
			<div class="modal-action">
				<button class="btn" onclick={() => (showSaveDialog = false)}>Cancel</button>
				<button class="btn btn-primary" onclick={saveItem}>Save</button>
			</div>
		</div>
		<button
			class="modal-backdrop"
			onclick={() => (showSaveDialog = false)}
			aria-label="Close dialog"
		></button>
	</div>
{/if}
