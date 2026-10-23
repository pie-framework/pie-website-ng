<script lang="ts">
	import { onMount, tick } from 'svelte';
	import PiePlayerDemo from '$lib/components/PiePlayerDemo.svelte';
	let { authoring = false, autoStart = false }: { authoring?: boolean; autoStart?: boolean } = $props();
	let started = $state(false);
	let content: HTMLDivElement;
	async function start() {
		started = true;
		await tick();
		content.querySelector<HTMLElement>('[role="tab"][tabindex="0"]')?.focus();
	}
	onMount(() => { started = autoStart; });
</script>
<div bind:this={content}>
{#if started}
	<PiePlayerDemo initialTab={authoring ? 'authoring' : 'delivery'} />
{:else}
	<div class="rounded-box border border-base-300 p-5">
		<p class="mb-4 text-base-content/75">{authoring ? 'Edit a question and preview the changes.' : 'Answer a question, switch modes and inspect the response data.'}</p>
		<button class="btn btn-primary" onclick={start}>{authoring ? 'Open the authoring example' : 'Start the item example'}</button>
	</div>
{/if}
</div>
