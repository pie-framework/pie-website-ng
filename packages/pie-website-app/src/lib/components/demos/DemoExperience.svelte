<script lang="ts">
	import type { DemoKind } from '$lib/data/site';
	import ItemDemo from './ItemDemo.svelte';
	import SectionDemo from './SectionDemo.svelte';
	import StandaloneToolkitDemo from './StandaloneToolkitDemo.svelte';
	let { kind, autoStart = false, editorial = false }: { kind: DemoKind; autoStart?: boolean; editorial?: boolean } = $props();
</script>
{#key kind}
	{#if kind === 'item' || kind === 'authoring'}
		<ItemDemo authoring={kind === 'authoring'} {autoStart} />
	{:else if kind === 'standalone'}
		<StandaloneToolkitDemo />
	{:else}
		<SectionDemo {kind} {autoStart} {editorial} />
	{/if}
{/key}
