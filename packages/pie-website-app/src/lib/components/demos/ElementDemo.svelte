<script lang="ts">
	import { onMount, tick } from 'svelte';
	import type { ElementExample } from '$lib/data/element-example';
	import type { PieElementInfo } from '$lib/data/elements';
	import { ITEM_PLAYER_CDN_URL, ITEM_PLAYER_VERSION } from '$lib/versions';
	import { demoEnvironment, type DemoView } from '$lib/data/demo-view';
	import DemoViewSwitcher from './DemoViewSwitcher.svelte';
	let { element, example }: { element: PieElementInfo; example: ElementExample } = $props();
	let mount = $state<HTMLDivElement>();
	let controls: HTMLDivElement;
	let started = $state(false);
	let status = $state('');
	let view = $state('delivery');
	let mode = $state('gather');
	let role = $state<DemoView>('student');
	let sessionJson = $state('');
	let active = false;
	let timeout: ReturnType<typeof setTimeout> | undefined;
	type Player = HTMLElement & { config?: unknown; session?: unknown; env?: unknown; configuration?: unknown; commitPendingElementSessions?(): void };
	let player: Player | undefined;
	let cleanup = () => {};
	let config: { elements: Record<string, string>; models: Record<string, unknown>[]; markup: string };
	let authoringChanged = false;

	function setView() {
		if (!player) return;
		if (view !== 'author' && authoringChanged) {
			player.config = structuredClone(config);
			authoringChanged = false;
		}
		player.setAttribute('mode', view === 'author' ? 'author' : 'view');
		player.env = { mode, role };
	}
	function changeView(view: DemoView) {
		player?.commitPendingElementSessions?.();
		const env = demoEnvironment(view);
		mode = env.mode;
		role = env.role;
		setView();
	}
	async function start() {
		started = true;
		status = 'Loading the item player and interaction…';
		await tick();
		controls.querySelector('select')?.focus();
		timeout = setTimeout(() => { if (active) status = 'Loading is taking longer than expected. See the preview and data reference, or open the full demo below.'; }, 45000);
		try {
			if (!customElements.get('pie-item-player')) await import(/* @vite-ignore */ ITEM_PLAYER_CDN_URL);
			if (!active) return;
			player = document.createElement('pie-item-player') as Player;
			config = {
				elements: { [element.name]: element.package + '@' + element.version },
				models: [structuredClone(example.model)],
				markup: '<' + element.name + ' id="example"></' + element.name + '>'
			};
			role = element.kind === 'rubric' ? 'instructor' : 'student';
			mode = demoEnvironment(role).mode;
			player.config = config;
			player.session = { id: 'website-example', data: [structuredClone(example.session)] };
			player.configuration = { authoring: { [element.name]: example.configuration } };
			player.setAttribute('autoplay-audio-enabled', 'false');
			setView();
			const ready = () => { clearTimeout(timeout); status = 'Live example ready.'; };
			const changed = (event: Event) => {
				const session = (event as CustomEvent).detail?.session;
				if (session) sessionJson = JSON.stringify(session, null, 2);
			};
			const edited = (event: Event) => {
				const { update, reset } = (event as CustomEvent).detail ?? {};
				if (!update || typeof update !== 'object') return;
				const current = config.models[0];
				config = { ...config, models: [{ ...(reset ? {} : current), ...update, id: current.id, element: current.element }] };
				authoringChanged = true;
			};
			const failed = () => { clearTimeout(timeout); status = 'This version could not load here. The full element demo is linked below.'; };
			player.addEventListener('load-complete', ready);
			player.addEventListener('model-loaded', ready);
			player.addEventListener('session-changed', changed);
			player.addEventListener('model-updated', edited);
			player.addEventListener('player-error', failed);
			const ownPlayer = player;
			cleanup = () => {
				ownPlayer.removeEventListener('load-complete', ready);
				ownPlayer.removeEventListener('model-loaded', ready);
				ownPlayer.removeEventListener('session-changed', changed);
				ownPlayer.removeEventListener('model-updated', edited);
				ownPlayer.removeEventListener('player-error', failed);
				ownPlayer.remove();
			};
			mount?.append(player);
		} catch {
			clearTimeout(timeout);
			if (active) status = 'The live example could not load from the CDN. You can still use the preview and data reference, or open the full demo.';
		}
	}
	onMount(() => { active = true; return () => { active = false; clearTimeout(timeout); cleanup(); }; });
</script>
<div class="rounded-box border border-base-300">
	<div class="p-5" bind:this={controls}>
		{#if !started}<button class="btn btn-primary" onclick={start}>Try {element.displayName}</button>
		{:else}
			<div class="flex flex-wrap items-end gap-4">
				<label class="text-sm font-medium">Display<select class="site-select mt-1 block" bind:value={view} onchange={setView}><option value="delivery">Delivery</option>{#if element.views.authoring}<option value="author">Authoring</option>{/if}</select></label>
				<DemoViewSwitcher value={role} onchange={changeView} disabled={view === 'author'} />
				<label class="text-sm font-medium">Mode<select class="site-select mt-1 block" bind:value={mode} onchange={setView} disabled={view === 'author'}><option value="gather">Respond</option><option value="view">Review</option><option value="evaluate">Evaluate</option></select></label>
			</div>
			<p role="status" class="mt-3 text-sm text-base-content/70">{status}</p>
		{/if}
	</div>
	<div class="element-demo-stage" class:started data-theme="light" bind:this={mount}></div>
	<div class="border-t border-base-300 p-5 text-sm text-base-content/70">
		{#if element.kind === 'rubric'}<p class="mb-3">Rubrics describe manual scoring criteria. This example starts in instructor view.</p>{/if}
		<p>Live example: {element.package}@{element.version} · players {ITEM_PLAYER_VERSION}.</p>
		<a class="link link-primary mt-2 inline-block" href={'https://elements.pie-framework.org/' + element.name + '/deliver/'}>Open all examples for this element →</a>
		{#if started}<details class="mt-4"><summary class="cursor-pointer">Inspect the response session</summary><pre class="mt-3 max-h-64 overflow-auto whitespace-pre-wrap text-xs">{sessionJson || 'A changed response appears here.'}</pre></details>{/if}
	</div>
</div>
<style>
	.element-demo-stage.started { min-width: 0; min-height: 12rem; overflow: auto; padding: 1.5rem; background: #fff; color: #172331; color-scheme: light; }
	.element-demo-stage :global(pie-item-player) { display: block; }
</style>
