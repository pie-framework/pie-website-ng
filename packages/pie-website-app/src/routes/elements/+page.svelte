<script lang="ts">
	import { onMount } from 'svelte';
	import { SITES } from '$lib/data/links';

	const elementsDemoUrl = SITES.elementsDemo;

	onMount(() => {
		window.location.replace(elementsDemoUrl);
	});
</script>

<svelte:head>
	<title>PIE Elements Demo</title>
	<meta
		http-equiv="refresh"
		content={`0; url=${elementsDemoUrl}`}
	/>
	<link rel="canonical" href={elementsDemoUrl} />
</svelte:head>

<section class="min-h-[60vh] flex items-center justify-center px-6 py-24">
	<div class="max-w-xl text-center space-y-6">
		<h1 class="text-4xl font-bold text-base-content">PIE Elements Demo has moved</h1>
		<p class="text-lg text-base-content/70">
			Redirecting you to the new interactive elements demo site.
		</p>
		<a class="btn btn-primary" href={elementsDemoUrl}>Open PIE Elements Demo</a>
	</div>
</section>
