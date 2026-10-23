<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { base } from '$app/paths';
	import { ITEM_PLAYER_VERSION } from '$lib/versions';
	import { readingSection, timedMediaSection } from '$lib/data/section-demo';
	import { demoEnvironment, type DemoView } from '$lib/data/demo-view';
	import DemoViewSwitcher from './DemoViewSwitcher.svelte';
	import { loadSectionRuntime, demoToolRegistry, type DemoSectionElement } from './section-runtime';

	let { kind = 'section', autoStart = false, editorial = false }: {
		kind?: 'section' | 'tools' | 'formative' | 'persistence' | 'timed-media' | 'theme';
		autoStart?: boolean;
		editorial?: boolean;
	} = $props();
	let mount = $state<HTMLDivElement>();
	let controls = $state<HTMLDivElement>();
	let started = $state(false);
	let status = $state<'loading' | 'ready' | 'error'>('loading');
	let message = $state('');
	let layout = $state('splitpane');
	let deliveryView = $state<DemoView>('student');
	let profile = $state('standard');
	let restricted = $state(false);
	let locale = $state('en-US');
	let saved = $state(false);
	let notice = $state('');
	let sessionJson = $state('');
	let changing = $state(false);
	let player: DemoSectionElement | undefined;
	let active = false;
	let generation = 0;
	let timeout: ReturnType<typeof setTimeout> | undefined;
	let removeListeners = () => {};

	function storageKey() { return 'pie-website:section-demo:v1:' + kind; }
	function sectionData() {
		const section = kind === 'timed-media' ? timedMediaSection() : readingSection(kind === 'formative');
		if (restricted && kind === 'tools') Object.assign(section.assessmentItemRefs[0], { settings: { restrictedTools: ['calculator'] } });
		return section;
	}
	function assessment() {
		return {
			id: 'pie-website-demo',
			personalNeedsProfile: {
				supports: profile === 'granted' ? ['calculator'] : [],
				prohibitedSupports: profile === 'prohibited' ? ['calculator'] : []
			}
		};
	}
	function updateInspector() {
		const session = player?.getSectionController?.()?.getSession?.();
		if (session) sessionJson = JSON.stringify(session, null, 2);
	}
	function teardown() {
		clearTimeout(timeout);
		removeListeners();
		player?.remove();
		player = undefined;
	}

	async function render(snapshot?: unknown) {
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
			const module = await loadSectionRuntime();
			if (!active || ownGeneration !== generation) return;
			const element = document.createElement('pie-section-player-' + layout) as DemoSectionElement;
			element.setAttribute('show-toolbar', 'true');
			element.setAttribute('toolbar-position', 'top');
			element.setAttribute('locale', locale);
			element.setAttribute('base-heading-level', '3');
			element.setAttribute('narrow-layout-breakpoint', editorial ? '760' : '900');
			element.setAttribute('content-max-width-with-passage', '1200');
			element.style.display = 'block';
			element.style.height = '100%';
			element.toolRegistry = demoToolRegistry(module);
			element.runtime = {
				assessmentId: 'pie-website-demo',
				playerType: 'iife',
				env: demoEnvironment(deliveryView),
				tools: {
					placement: {
						section: ['theme', 'lineReader'],
						passage: ['textToSpeech'],
						item: kind === 'tools' ? ['textToSpeech', 'answerEliminator', 'calculator'] : ['textToSpeech', 'answerEliminator']
					},
					providers: {
						calculator: { provider: { id: 'calculator-cortex' } },
						textToSpeech: { backend: 'browser' }
					}
				}
			};
			element.assessment = assessment();
			if (snapshot) element.session = snapshot;
			element.section = sectionData();
			const ready = () => { if (player === element) { status = 'ready'; clearTimeout(timeout); updateInspector(); } };
			const changed = () => { if (player === element) updateInspector(); };
			const failed = (event: Event) => {
				const detail = (event as CustomEvent).detail;
				if (detail?.recoverable === false || detail?.severity === 'fatal') {
					status = 'error';
					message = detail.message || 'The section could not be loaded.';
				}
			};
			element.addEventListener('pie-loading-complete', ready);
			element.addEventListener('session-changed', changed);
			element.addEventListener('framework-error', failed);
			removeListeners = () => {
				element.removeEventListener('pie-loading-complete', ready);
				element.removeEventListener('session-changed', changed);
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
	async function start(moveFocus = true) {
		started = true;
		void render();
		await tick();
		if (moveFocus) controls?.querySelector('select')?.focus();
	}
	async function change() {
		changing = true;
		try {
			const controller = player?.getSectionController?.();
			await controller?.persist?.();
			const snapshot = controller?.getSession?.();
			await render(snapshot);
		} finally { changing = false; }
	}
	async function changeView(view: DemoView) {
		if (!player || changing || status !== 'ready') return;
		const current = player;
		changing = true;
		try {
			await current.getSectionController?.()?.persist?.();
			if (!active || player !== current) return;
			deliveryView = view;
			// Update only the runtime: keep responses, tool state and media mounted.
			current.runtime = { ...current.runtime, env: demoEnvironment(view) };
		} finally { changing = false; }
	}
	async function save() {
		try {
			const controller = player?.getSectionController?.();
			await controller?.persist?.();
			const session = controller?.getSession?.();
			if (!session) { notice = 'Wait for the section to finish loading.'; return; }
			localStorage.setItem(storageKey(), JSON.stringify({ version: 1, session }));
			saved = true;
			notice = 'Saved in this browser. You can leave this page and restore it here.';
		} catch { notice = 'This browser did not allow the demo to save its state.'; }
	}
	async function restore() {
		try {
			const record = JSON.parse(localStorage.getItem(storageKey()) || 'null');
			if (record?.version !== 1 || !record.session?.itemSessions) { notice = 'There is no saved section to restore.'; return; }
			await render(record.session);
			notice = 'Restored the section saved in this browser.';
		} catch { notice = 'The saved demo could not be restored.'; }
	}
	async function reset() {
		try { localStorage.removeItem(storageKey()); } catch { /* Device storage may be unavailable. */ }
		saved = false;
		notice = 'Started a new demo response.';
		await render();
	}
	onMount(() => {
		active = true;
		try { saved = Boolean(localStorage.getItem(storageKey())); } catch { /* Optional demo storage. */ }
		if (autoStart) void start(false);
		return () => { active = false; generation++; teardown(); };
	});
</script>

<div class="section-demo rounded-box border border-base-300 bg-base-100" class:editorial>
	{#if !started}
		<div class="p-6">
			<p class="mb-4 text-base-content/75">Try a passage and questions with layouts and learner tools.</p>
			<button class="btn btn-primary" onclick={() => start()}>Start the example</button>
		</div>
	{:else}
		<div class="demo-toolbar flex flex-wrap items-end gap-4 border-b border-base-300 p-4" bind:this={controls}>
			<label class="text-sm font-medium">Layout
				<select class="site-select mt-1 block" bind:value={layout} onchange={change} aria-busy={changing}>
					<option value="splitpane">Passage beside questions</option><option value="vertical">Vertical</option><option value="tabbed">Tabbed</option>
				</select>
			</label>
			<DemoViewSwitcher value={deliveryView} onchange={changeView} disabled={status !== 'ready'} />
			{#if kind === 'tools'}
				<label class="text-sm font-medium">Calculator profile
					<select class="site-select mt-1 block" bind:value={profile} onchange={change} aria-busy={changing}>
						<option value="standard">Not requested</option><option value="granted">Granted</option><option value="prohibited">Prohibited</option>
					</select>
				</label>
				<label class="flex items-center gap-2 text-sm"><input class="checkbox checkbox-sm" type="checkbox" bind:checked={restricted} onchange={change} aria-busy={changing} />Restrict calculator on question 1</label>
			{/if}
			{#if kind === 'theme'}
				<label class="text-sm font-medium">Interface language
					<select class="site-select mt-1 block" bind:value={locale} onchange={change} aria-busy={changing}><option value="en-US">English</option><option value="nl-NL">Nederlands</option></select>
				</label>
			{/if}
			{#if kind === 'persistence'}
				<button class="btn btn-sm h-10" onclick={save} disabled={status !== 'ready'}>Save in this browser</button>
				<button class="btn btn-sm h-10" onclick={restore} disabled={!saved}>Restore saved response</button>
			{/if}
			<button class="btn btn-ghost btn-sm ml-auto h-10" onclick={reset}>Start over</button>
		</div>
		{#if status === 'loading'}<p role="status" class="px-4 pt-3 text-sm text-base-content/70">Loading the section…</p>{/if}
		{#if status === 'error'}
			<div role="alert" class="m-4 rounded-box border border-warning p-4 text-sm">
				<p>{message}</p><p class="mt-2"><a class="link" href="{base}/integrate/section-player/">Read the integration guide</a> or try the <a class="link" href="https://elements.pie-framework.org/">element demos</a>.</p>
			</div>
		{/if}
		{#if notice}<p class="px-4 py-3 text-sm" role="status">{notice}</p>{/if}
		<!-- pie-theme defaults to a self scope, keeping learner colors inside this demo. -->
		<pie-theme class="section-demo-stage" style="display: block" theme="light" provider="none">
			<div class="h-full" bind:this={mount}></div>
		</pie-theme>
		<div class="demo-inspector border-t border-base-300 p-4 text-sm text-base-content/70">
			{#if kind === 'tools'}<p class="mb-3">The calculator is placed on each item toolbar. Grant it in the profile to make it available, then try restricting it on question 1.</p>{/if}
			{#if kind === 'persistence'}<p class="mb-3">Saved responses stay in this browser. Use a backend for storage across devices.</p>{/if}
			{#if kind === 'timed-media'}<p class="mb-3">This silent lesson has a text alternative. A question appears at 0:04. At 0:10, playback pauses until question 2 is answered correctly.</p>{/if}
			{#if kind === 'theme'}<p class="mb-3">Change player colors from the section toolbar. The language setting changes the controls; the passage stays in English.</p>{/if}
			<details><summary class="cursor-pointer font-medium">Inspect the section session</summary><pre class="mt-3 max-h-72 overflow-auto whitespace-pre-wrap text-xs">{sessionJson || 'Answer a question to see the section session.'}</pre>
				{#if editorial}<p class="demo-version mt-3">PIE players {ITEM_PLAYER_VERSION} · Browser read-aloud uses the voices available on your device.</p>{/if}
			</details>
			{#if !editorial}<p class="demo-version mt-3">PIE players {ITEM_PLAYER_VERSION} · Browser read-aloud uses the voices available on your device.</p>{/if}
		</div>
	{/if}
</div>

<style>
	.section-demo-stage { display: block; height: 36rem; min-width: 0; overflow: auto; padding: 1rem; background: var(--pie-background, #fff); color: var(--pie-text, #172331); color-scheme: light; }
	.editorial { background: var(--color-base-200); border-color: transparent; border-radius: 0.5rem; }
	.editorial .demo-toolbar { border: 0; padding: 1rem 1.25rem 0.75rem; gap: 1.5rem; }
	.editorial .section-demo-stage { height: 29rem; padding: 0 1.25rem 1.25rem; background: transparent; }
	/* Brand only the default learner palette. Selected accessibility schemes
	   keep the complete set of colors supplied by pie-theme. */
	.editorial .section-demo-stage:global([theme='light']:is(:not([scheme]), [scheme='default'])) > div { --pie-background-dark: #f1f1ed; --pie-surface: #f1f1ed; --pie-primary: #5d6858; --pie-primary-dark: #414d3d; --pie-primary-light: #dce3d7; }
	.editorial .demo-inspector { padding: 0.5rem 0; margin-top: 0; background: var(--site-page); border-top: 0; font-size: 0.75rem; }
	.editorial .demo-version { margin-top: 0.5rem; font-size: 0.7rem; }
	@media (max-width: 640px) { .section-demo-stage { height: 34rem; padding: 0.5rem; } }
	@media (max-width: 640px) { .editorial .demo-toolbar { padding: 1rem 0.75rem 0.75rem; gap: 0.75rem; } .editorial .section-demo-stage { height: 32rem; padding: 0 0.75rem 0.75rem; } }
</style>
