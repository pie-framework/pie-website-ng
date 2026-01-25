<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { samples } from '$lib/playground-samples';

	onMount(() => {
		// Redirect to first sample
		goto(`/playground/${samples[0].id}`);
	});
</script>

<svelte:head>
	<title>PIE Playground - Interactive Assessment Editor</title>
</svelte:head>

<div class="flex items-center justify-center min-h-screen">
	<div class="text-center">
		<div class="loading loading-spinner loading-lg mb-4"></div>
		<p class="text-base-content/60">Loading playground...</p>
	</div>
</div>
