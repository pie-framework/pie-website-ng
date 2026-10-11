<script lang="ts">
	import { onMount } from 'svelte';
	import ExternalLink from './ExternalLink.svelte';
	import { ITEM_PLAYER_CDN_URL } from '$lib/versions';
	import { EXAMPLE_ENV, EXAMPLE_SESSION, exampleConfig } from '$lib/data/host-example';
	import { SITES } from '$lib/data/links';

	/**
	 * The canonical multiple-choice item in a live <pie-item-player>, loaded from
	 * jsDelivr at the pinned version. The delivery tab changes only `env`; the
	 * authoring tab runs the same item with mode="author" and feeds each
	 * `model-updated` into a delivery preview.
	 */

	type Mode = 'gather' | 'view' | 'evaluate';
	type Role = 'student' | 'instructor';
	type PlayerElement = HTMLElement & { config?: unknown; env?: unknown; session?: unknown };
	type ItemConfig = ReturnType<typeof exampleConfig>;
	type ItemModel = ItemConfig['models'][number] & Record<string, unknown>;

	const LOAD_TIMEOUT_MS = 20000;
	const PREVIEW_DELAY_MS = 300;

	const MODES: { value: Mode; label: string }[] = [
		{ value: 'gather', label: 'Gather' },
		{ value: 'view', label: 'View' },
		{ value: 'evaluate', label: 'Evaluate' }
	];
	const ROLES: { value: Role; label: string }[] = [
		{ value: 'student', label: 'Student' },
		{ value: 'instructor', label: 'Instructor' }
	];
	const TABS = [
		{ id: 'delivery', label: 'Delivery' },
		{ id: 'authoring', label: 'Authoring' }
	] as const;
	type Tab = (typeof TABS)[number]['id'];

	// The demo adds a rationale to each choice so the instructor role has
	// something to show in view and evaluate modes.
	const RATIONALES: Record<string, string> = {
		paris: 'Paris is the capital of France.',
		london: 'London is the capital of the United Kingdom.',
		madrid: 'Madrid is the capital of Spain.'
	};

	function demoConfig(): ItemConfig {
		const config = exampleConfig();
		config.models = config.models.map((model) => ({
			...model,
			choices: model.choices.map((choice) => ({ ...choice, rationale: RATIONALES[choice.value] }))
		}));
		return config;
	}

	let status = $state<'loading' | 'ready' | 'error'>('loading');
	let activeTab = $state<Tab>('delivery');
	let authoringOpened = $state(false);
	let mode = $state<Mode>(EXAMPLE_ENV.mode);
	let role = $state<Role>(EXAMPLE_ENV.role);
	let sessionJson = $state<string | null>(null);

	let deliveryPlayer = $state<PlayerElement | null>(null);
	let authorPlayer = $state<PlayerElement | null>(null);
	let previewPlayer = $state<PlayerElement | null>(null);

	// Plain objects, set imperatively: the player clones what it is given.
	let previewConfig: ItemConfig = demoConfig();
	let previewTimer: ReturnType<typeof setTimeout> | undefined;

	function loadPlayer(): Promise<unknown> {
		const defined = customElements.whenDefined('pie-item-player');
		const waits: Promise<unknown>[] = [
			defined,
			new Promise((_, reject) =>
				setTimeout(() => reject(new Error('Timed out loading the item player')), LOAD_TIMEOUT_MS)
			)
		];
		if (
			!customElements.get('pie-item-player') &&
			!document.querySelector(`script[src="${ITEM_PLAYER_CDN_URL}"]`)
		) {
			const script = document.createElement('script');
			script.type = 'module';
			script.src = ITEM_PLAYER_CDN_URL;
			waits.push(
				new Promise((_, reject) =>
					script.addEventListener('error', () =>
						reject(new Error('Could not load the item player'))
					)
				)
			);
			document.head.append(script);
		}
		return Promise.race(waits);
	}

	onMount(() => {
		let active = true;
		loadPlayer().then(
			() => {
				if (active) status = 'ready';
			},
			() => {
				if (active) status = 'error';
			}
		);
		return () => {
			active = false;
			clearTimeout(previewTimer);
		};
	});

	// Delivery: config and session once; mode and role change env only.
	$effect(() => {
		const player = deliveryPlayer;
		if (!player) return;
		player.config = demoConfig();
		player.session = structuredClone(EXAMPLE_SESSION);
		const onSessionChanged = (event: Event) => {
			const { session } = (event as CustomEvent).detail ?? {};
			if (session) sessionJson = JSON.stringify(session, null, 2);
		};
		player.addEventListener('session-changed', onSessionChanged);
		return () => player.removeEventListener('session-changed', onSessionChanged);
	});

	$effect(() => {
		const env = { mode, role };
		if (deliveryPlayer) deliveryPlayer.env = env;
	});

	// Authoring: every model-updated merges into the preview's model.
	$effect(() => {
		const author = authorPlayer;
		if (!author) return;
		author.config = demoConfig();
		const onModelUpdated = (event: Event) => {
			const { update, reset } = (event as CustomEvent).detail ?? {};
			if (!update || typeof update !== 'object') return;
			const current = previewConfig.models[0] as ItemModel;
			const merged = reset ? { ...update } : { ...current, ...update };
			previewConfig = {
				...previewConfig,
				models: [{ ...merged, id: current.id, element: current.element }]
			};
			clearTimeout(previewTimer);
			previewTimer = setTimeout(() => {
				if (previewPlayer) previewPlayer.config = previewConfig;
			}, PREVIEW_DELAY_MS);
		};
		author.addEventListener('model-updated', onModelUpdated);
		return () => author.removeEventListener('model-updated', onModelUpdated);
	});

	$effect(() => {
		const preview = previewPlayer;
		if (!preview) return;
		preview.env = { ...EXAMPLE_ENV };
		preview.session = structuredClone(EXAMPLE_SESSION);
		preview.config = previewConfig;
	});

	function selectTab(tab: Tab) {
		activeTab = tab;
		if (tab === 'authoring') authoringOpened = true;
	}

	function onTabKeydown(event: KeyboardEvent) {
		if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
		event.preventDefault();
		const index = TABS.findIndex((tab) => tab.id === activeTab);
		const next = TABS[(index + (event.key === 'ArrowRight' ? 1 : TABS.length - 1)) % TABS.length];
		selectTab(next.id);
		document.getElementById(`pie-demo-tab-${next.id}`)?.focus();
	}
</script>

<div class="rounded-xl border border-base-300 bg-base-100 shadow-sm">
	<div role="tablist" aria-label="Live demo" class="tabs tabs-border px-2 pt-2">
		{#each TABS as tab (tab.id)}
			<button
				type="button"
				role="tab"
				id="pie-demo-tab-{tab.id}"
				class="tab font-medium"
				class:tab-active={activeTab === tab.id}
				aria-selected={activeTab === tab.id}
				aria-controls="pie-demo-panel-{tab.id}"
				tabindex={activeTab === tab.id ? 0 : -1}
				onclick={() => selectTab(tab.id)}
				onkeydown={onTabKeydown}
			>
				{tab.label}
			</button>
		{/each}
	</div>

	<div class="p-4 sm:p-6 border-t border-base-300">
		{#if status === 'loading'}
			<div class="flex items-center gap-3 py-12 justify-center" role="status">
				<span class="loading loading-spinner loading-md" aria-hidden="true"></span>
				<span class="text-base-content/70">Loading the item player</span>
			</div>
		{:else if status === 'error'}
			<div role="alert" class="alert alert-warning">
				<span>
					The item player could not be loaded from the CDN. The same elements run on the
					<ExternalLink href={SITES.elementsDemo}>elements demo</ExternalLink>.
				</span>
			</div>
		{:else}
			<div
				id="pie-demo-panel-delivery"
				role="tabpanel"
				aria-labelledby="pie-demo-tab-delivery"
				hidden={activeTab !== 'delivery'}
			>
				<div class="flex flex-wrap gap-x-8 gap-y-3 mb-4">
					<fieldset class="flex flex-wrap items-center gap-x-4 gap-y-2">
						<legend class="text-sm font-semibold mb-1">Mode</legend>
						{#each MODES as option (option.value)}
							<label class="flex items-center gap-2 cursor-pointer text-sm">
								<input
									type="radio"
									name="pie-demo-mode"
									class="radio radio-sm radio-primary"
									value={option.value}
									bind:group={mode}
								/>
								{option.label}
							</label>
						{/each}
					</fieldset>
					<fieldset class="flex flex-wrap items-center gap-x-4 gap-y-2">
						<legend class="text-sm font-semibold mb-1">Role</legend>
						{#each ROLES as option (option.value)}
							<label class="flex items-center gap-2 cursor-pointer text-sm">
								<input
									type="radio"
									name="pie-demo-role"
									class="radio radio-sm radio-primary"
									value={option.value}
									bind:group={role}
								/>
								{option.label}
							</label>
						{/each}
					</fieldset>
				</div>

				<div class="grid lg:grid-cols-5 gap-4">
					<div class="lg:col-span-3 pie-demo-stage" data-theme="light">
						<pie-item-player bind:this={deliveryPlayer} strategy="iife"></pie-item-player>
					</div>
					<div class="lg:col-span-2 min-w-0">
						<h3 class="text-sm font-semibold mb-2">Latest session</h3>
						{#if sessionJson}
							<pre
								class="bg-base-200 rounded-lg text-xs overflow-x-auto"
								aria-live="polite"><code>{sessionJson}</code></pre>
						{:else}
							<p class="text-sm text-base-content/70" aria-live="polite">
								Choose an answer in gather mode; the session the player reports in
								<code>session-changed</code> appears here.
							</p>
						{/if}
					</div>
				</div>
			</div>

			<div
				id="pie-demo-panel-authoring"
				role="tabpanel"
				aria-labelledby="pie-demo-tab-authoring"
				hidden={activeTab !== 'authoring'}
			>
				<p class="text-sm text-base-content/70 mb-4">
					The same item with <code>mode="author"</code>. Each edit emits
					<code>model-updated</code>, and the preview renders the updated model.
				</p>
				{#if authoringOpened}
					<div class="grid lg:grid-cols-2 gap-4">
						<div class="min-w-0">
							<h3 class="text-sm font-semibold mb-2">Authoring view</h3>
							<div class="pie-demo-stage" data-theme="light">
								<pie-item-player bind:this={authorPlayer} mode="author" strategy="iife"
								></pie-item-player>
							</div>
						</div>
						<div class="min-w-0">
							<h3 class="text-sm font-semibold mb-2">Delivery preview</h3>
							<div class="pie-demo-stage" data-theme="light">
								<pie-item-player bind:this={previewPlayer} strategy="iife"></pie-item-player>
							</div>
						</div>
					</div>
				{/if}
			</div>
		{/if}
	</div>
</div>

<style>
	/* Elements render in light DOM with their own light palette, so the stage
	   stays light in both site themes. */
	.pie-demo-stage {
		min-width: 0;
		padding: 1rem;
		border: 1px solid var(--color-base-300);
		border-radius: 0.5rem;
		background: var(--color-base-100);
		color: var(--color-base-content);
		color-scheme: light;
	}

	.pie-demo-stage :global(pie-item-player) {
		display: block;
		width: 100%;
	}
</style>
