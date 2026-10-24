<script lang="ts">
	import '../app.css';
	import Navigation from '$lib/components/Navigation.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import StatusBanner from '$lib/components/StatusBanner.svelte';
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import { accessibleScrollRegions } from '$lib/accessible-scroll-regions';

	let { children } = $props();

	const sitePath = $derived(
		base && page.url.pathname.startsWith(base)
			? page.url.pathname.slice(base.length) || '/'
			: page.url.pathname
	);
	const showStatusBanner = $derived(sitePath === '/qti/');
	const skipTarget = $derived(/^\/(docs|integrate|build)\//.test(sitePath) ? '#guide-content' : '#main-content');

	// Set initial theme on HTML element
	onMount(() => {
		let savedTheme = 'light';
		try { savedTheme = localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'; } catch { /* Optional preference storage. */ }
		document.documentElement.setAttribute('data-theme', savedTheme);
	});
</script>

<svelte:head>
	<!-- Favicon -->
	<link rel="icon" href={favicon} />

	<!-- Fonts -->
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link
		href="https://fonts.googleapis.com/css2?family=Caveat:wght@500&family=Inter:wght@400;500;600;700;800&display=swap"
		rel="stylesheet"
	/>

	<meta name="author" content="PIE Framework" />
</svelte:head>

<div class="flex flex-col min-h-screen">
	<!-- Skip to main content link for keyboard navigation -->
	<a
		href={skipTarget}
		class="skip-link"
	>
		Skip to main content
	</a>
	<Navigation />
	{#if showStatusBanner}
		<StatusBanner />
	{/if}
	<main id="main-content" class="flex-1" tabindex="-1" use:accessibleScrollRegions>
		{@render children()}
	</main>
	<Footer />
</div>
