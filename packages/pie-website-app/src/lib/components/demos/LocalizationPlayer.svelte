<script lang="ts" module>
	export interface Observed {
		passage?: string;
		item?: string;
		region?: string;
		legend?: string;
	}
</script>

<script lang="ts">
	import { onMount, untrack } from 'svelte';
	import { base } from '$app/paths';
	import { ITEM_PLAYER_VERSION } from '$lib/versions';
	import { loadSectionRuntime, demoToolRegistry, type DemoSectionElement } from './section-runtime';
	import type { SimulatorState } from './localization-trace';

	let { config, record, onobserved }: {
		config: SimulatorState;
		record: Record<string, unknown>;
		onobserved?: (observed: Observed | null) => void;
	} = $props();

	let mount = $state<HTMLDivElement>();
	let status = $state<'idle' | 'loading' | 'ready' | 'error'>('idle');
	let message = $state('');
	let player: DemoSectionElement | undefined;
	let active = false;
	let started = false;
	let generation = 0;
	let timeout: ReturnType<typeof setTimeout> | undefined;
	let removeListeners = () => {};

	// Everything but the interface locale is read once when the toolkit builds,
	// so a change re-mounts the section. The locale changes in place.
	const mountKey = $derived(JSON.stringify({ ...config, locale: undefined, record }));

	function teardown() {
		clearTimeout(timeout);
		removeListeners();
		player?.remove();
		player = undefined;
		onobserved?.(null);
	}

	// Read back what the live player rendered, for the trace to compare.
	function observe(element: HTMLElement) {
		const passage = element.querySelector('pie-passage-shell');
		// Elements register under a versioned tag, such as multiple-choice--version-14-0-7.
		const choice = [...element.querySelectorAll('*')].find((node) => node.localName.startsWith('multiple-choice'));
		onobserved?.({
			// The shell carries the interface locale; the passage content carries its own lang.
			passage: (passage?.querySelector('[lang]') ?? passage?.closest('[lang]'))?.getAttribute('lang') ?? undefined,
			item: choice?.closest('[lang]')?.getAttribute('lang') ?? undefined,
			region: choice?.getAttribute('aria-label') ?? undefined,
			legend: choice?.querySelector('legend')?.textContent?.trim() || undefined
		});
	}

	async function render() {
		started = true;
		const ownGeneration = ++generation;
		teardown();
		status = 'loading';
		message = '';
		timeout = setTimeout(() => {
			if (active && generation === ownGeneration && status === 'loading') {
				status = 'error';
				message = 'The player is taking longer than expected to load from the CDN.';
			}
		}, 45000);
		try {
			const [module, trace] = await Promise.all([loadSectionRuntime(), import('./localization-trace')]);
			if (!active || ownGeneration !== generation) return;
			const current = $state.snapshot(config) as SimulatorState;
			const { assessment } = trace.deliveryInputs(current, $state.snapshot(record) as Record<string, unknown>);
			const element = document.createElement('pie-section-player-splitpane') as DemoSectionElement;
			element.setAttribute('show-toolbar', 'true');
			element.setAttribute('toolbar-position', 'top');
			element.setAttribute('locale', current.locale);
			element.setAttribute('base-heading-level', '3');
			element.setAttribute('narrow-layout-breakpoint', '760');
			element.style.display = 'block';
			element.style.height = '100%';
			element.toolRegistry = demoToolRegistry(module);
			element.runtime = {
				assessmentId: assessment.id,
				playerType: 'iife',
				env: { mode: 'gather', role: 'student', ...(current.envLocale ? { locale: current.content } : {}) },
				...(current.runtimeContentLanguage ? { contentLanguage: current.content } : {}),
				i18n: trace.interfaceProvider(current),
				tools: {
					placement: trace.PLACEMENT,
					providers: { textToSpeech: { backend: 'browser' }, calculator: { provider: { id: 'calculator-cortex' } } }
				}
			};
			element.assessment = assessment;
			element.section = trace.sectionFor(current);
			let observer: ReturnType<typeof setTimeout> | undefined;
			const ready = () => {
				if (player !== element) return;
				status = 'ready';
				clearTimeout(timeout);
				// The elements render after the section reports ready.
				clearTimeout(observer);
				observer = setTimeout(() => { if (player === element) observe(element); }, 600);
			};
			const failed = (event: Event) => {
				const detail = (event as CustomEvent).detail;
				if (detail?.recoverable === false || detail?.severity === 'fatal') {
					status = 'error';
					message = detail.message || 'The section could not be loaded.';
				}
			};
			element.addEventListener('pie-loading-complete', ready);
			element.addEventListener('framework-error', failed);
			removeListeners = () => {
				clearTimeout(observer);
				element.removeEventListener('pie-loading-complete', ready);
				element.removeEventListener('framework-error', failed);
			};
			player = element;
			mount?.append(element);
		} catch (error) {
			if (!active || ownGeneration !== generation) return;
			clearTimeout(timeout);
			status = 'error';
			message = error instanceof Error ? error.message : 'The player could not be loaded.';
		}
	}

	$effect(() => {
		void mountKey;
		if (started) untrack(render);
	});

	$effect(() => {
		const locale = config.locale;
		if (!player) return;
		player.setAttribute('locale', locale);
		const element = player;
		const observer = setTimeout(() => { if (player === element) observe(element); }, 600);
		return () => clearTimeout(observer);
	});

	onMount(() => {
		active = true;
		return () => { active = false; generation++; teardown(); };
	});
</script>

<div class="localization-player rounded-box border border-base-300 bg-base-100">
	<div class="flex flex-wrap items-center justify-between gap-3 border-b border-base-300 px-4 py-3">
		<p class="text-sm font-semibold">Live section player</p>
		{#if status === 'loading'}<p role="status" class="text-sm text-base-content/70">Loading the section…</p>{/if}
		{#if status === 'ready'}<p class="text-xs text-base-content/70">Re-mounts when anything but the interface locale changes</p>{/if}
	</div>
	{#if status === 'idle'}
		<div class="p-6">
			<p class="mb-4 text-base-content/75">Load a section player from the CDN with the same profile, policy and languages as the trace.</p>
			<button class="btn btn-primary" onclick={render}>Start the player</button>
		</div>
	{:else}
		{#if status === 'error'}
			<div role="alert" class="m-4 rounded-box border border-warning p-4 text-sm">
				<p>{message}</p><p class="mt-2"><a class="link" href="{base}/integrate/section-player/">Read the integration guide</a>.</p>
			</div>
		{/if}
		<pie-theme class="localization-player-stage" style="display: block" theme="light" provider="none">
			<div class="h-full" bind:this={mount}></div>
		</pie-theme>
		<p class="border-t border-base-300 px-4 py-3 text-xs text-base-content/70">
			PIE players {ITEM_PLAYER_VERSION} · Read-aloud uses your browser's voices; the PIE and SchoolCity transports appear in the trace only · The translated passages are the site's own and unreviewed.
		</p>
	{/if}
</div>

<style>
	.localization-player-stage { display: block; height: 34rem; min-width: 0; overflow: auto; padding: 1rem; background: var(--pie-background, #fff); color: var(--pie-text, #172331); color-scheme: light; }
	@media (max-width: 640px) { .localization-player-stage { height: 36rem; padding: 0.5rem; } }
</style>
