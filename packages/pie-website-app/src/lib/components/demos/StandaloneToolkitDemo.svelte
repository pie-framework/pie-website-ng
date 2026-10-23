<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { exampleConfig, EXAMPLE_SESSION } from '$lib/data/host-example';
	import { loadSectionRuntime, demoToolRegistry } from './section-runtime';
	import { demoEnvironment, type DemoView } from '$lib/data/demo-view';
	import DemoViewSwitcher from './DemoViewSwitcher.svelte';
	let started = $state(false);
	let status = $state('ready');
	let mount = $state<HTMLDivElement>();
	let statusElement = $state<HTMLParagraphElement>();
	let deliveryView = $state<DemoView>('student');
	let ready = $state(false);
	type Host = HTMLElement & Record<string, unknown>;
	let player: (Host & { commitPendingElementSessions?(): void }) | undefined;
	let active = false;
	let timeout: ReturnType<typeof setTimeout> | undefined;
	let cleanup = () => {};
	function changeView(view: DemoView) {
		if (!player) return;
		player.commitPendingElementSessions?.();
		player.env = demoEnvironment(view);
		deliveryView = view;
	}
	async function start() {
		started = true;
		status = 'Loading the toolkit and item player…';
		await tick();
		statusElement?.focus();
		timeout = setTimeout(() => { if (active) status = 'Loading is taking longer than expected. See the integration guide below.'; }, 45000);
		try {
			const module = await loadSectionRuntime();
			if (!active) return;
			for (const tag of ['pie-assessment-toolkit', 'pie-item-scope', 'pie-item-toolbar', 'pie-item-player']) {
				if (!customElements.get(tag)) throw new Error('The browser build did not register ' + tag);
			}
			const toolkit = document.createElement('pie-assessment-toolkit') as Host;
			toolkit.toolRegistry = demoToolRegistry(module);
			toolkit.tools = { placement: { item: ['textToSpeech', 'answerEliminator'] }, providers: { textToSpeech: { backend: 'browser' } } };
			const scope = document.createElement('pie-item-scope') as Host;
			scope.setAttribute('item-id', 'standalone-example');
			scope.item = { id: 'standalone-example', config: exampleConfig() };
			const toolbar = document.createElement('pie-item-toolbar');
			const region = document.createElement('div');
			region.dataset.region = 'content';
			player = document.createElement('pie-item-player') as Host;
			player.config = exampleConfig();
			player.env = demoEnvironment(deliveryView);
			player.session = structuredClone(EXAMPLE_SESSION);
			const loaded = () => { clearTimeout(timeout); ready = true; status = 'Ready. Try the tools above the question.'; };
			player.addEventListener('load-complete', loaded);
			region.append(player);
			scope.append(toolbar, region);
			toolkit.append(scope);
			mount?.append(toolkit);
			const ownPlayer = player;
			cleanup = () => { ownPlayer.removeEventListener('load-complete', loaded); toolkit.remove(); };
		} catch (error) {
			clearTimeout(timeout);
			if (active) status = 'The live example could not load. ' + (error instanceof Error ? error.message : '');
		}
	}
	onMount(() => { active = true; return () => { active = false; clearTimeout(timeout); cleanup(); }; });
</script>
<div class="rounded-box border border-base-300 p-5">
	{#if !started}<p class="mb-4 text-base-content/75">Try read-aloud and answer elimination with a single item.</p><button class="btn btn-primary" onclick={start}>Try the standalone toolkit</button>{/if}
	{#if started}<p class="mb-4 text-sm text-base-content/70" role="status" tabindex="-1" bind:this={statusElement}>{status}</p>{/if}
	{#if started}<div class="mb-4"><DemoViewSwitcher value={deliveryView} onchange={changeView} disabled={!ready} /></div>{/if}
	<div class="standalone-stage" class:started data-theme="light" bind:this={mount}></div>
</div>
<style>
	.standalone-stage.started { min-height: 15rem; padding: 1rem; background: #fff; color: #172331; color-scheme: light; }
</style>
