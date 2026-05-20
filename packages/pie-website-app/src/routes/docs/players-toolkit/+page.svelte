<script lang="ts">
	import { base } from '$app/paths';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	onMount(() => {
		goto(`${base}/docs/players/`, { replaceState: true });
	});
</script>

<svelte:head>
	<title>Redirecting to Players - PIE Framework</title>
	<meta http-equiv="refresh" content="0;url={base}/docs/players/" />
</svelte:head>

<div class="container mx-auto px-4 py-24 text-center">
	<p class="text-lg text-base-content/70">
		This page has moved. Redirecting to <a href="{base}/docs/players/" class="link link-primary">Players</a>...
	</p>
</div>
