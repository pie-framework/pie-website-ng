<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { LEGACY_ROUTES } from '$lib/data/legacy-routes';
	import { legacyDestination, legacyRedirectScript } from '$lib/legacy-redirect';
	import Seo from './Seo.svelte';
	let { from, oldIds = [] }: { from: string; oldIds?: string[] } = $props();
	const route = $derived(LEGACY_ROUTES[from]);
	const ids = $derived([...new Set([...oldIds, ...Object.keys(route.anchors)])]);
	const redirectScript = $derived(legacyRedirectScript(route, base));
	onMount(() => {
		window.location.replace(legacyDestination(window.location.href, route, base));
	});
</script>
<Seo title="Page moved - PIE Framework" description="This page has moved. Continue to the updated PIE documentation." />
<svelte:head>
	{@html redirectScript}
	<meta http-equiv="refresh" content="0; url={base}{route.to}" />
</svelte:head>
<div class="site-container">
	{#each ids as id}<span {id} class="guide-anchor" aria-hidden="true"></span>{/each}
	<h1 class="page-title">Page moved</h1>
	<p>Continue to <a class="link link-primary" href="{base}{route.to}">the updated page</a>.</p>
</div>
