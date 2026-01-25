<script lang="ts">
	import '../app.css';
	import Navigation from '$lib/components/Navigation.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';

	let { children } = $props();

	// Set initial theme on HTML element
	onMount(() => {
		const savedTheme = localStorage.getItem('theme') || 'light';
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
		href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
		rel="stylesheet"
	/>

	<!-- Default Meta Tags (can be overridden by page-specific meta) -->
	<meta name="description" content="PIE Framework - Open-source web components for creating interactive assessment items. Battle-tested at enterprise scale with 20+ question types. ISC licensed." />
	<meta name="keywords" content="PIE Framework, assessment items, interactive questions, web components, open source, education technology, e-learning, testing, Renaissance" />
	<meta name="author" content="Renaissance" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="PIE Framework" />
	<meta property="og:title" content="PIE Framework - Open Source Assessment Items" />
	<meta property="og:description" content="Enterprise-proven web components for rendering 20+ interactive question types. Zero licensing costs. Modern web standards." />
	<meta property="og:image" content="https://pie.org/pie-logo.svg" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="PIE Framework - Open Source Assessment Items" />
	<meta name="twitter:description" content="Enterprise-proven web components for rendering 20+ interactive question types. Zero licensing costs. Modern web standards." />
	<meta name="twitter:image" content="https://pie.org/pie-logo.svg" />

	<!-- Additional SEO -->
	<meta name="robots" content="index, follow" />
	<meta name="language" content="English" />
	<link rel="canonical" href="https://pie.org/" />
</svelte:head>

<div class="flex flex-col min-h-screen">
	<Navigation />
	<main class="flex-1">
		{@render children()}
	</main>
	<Footer />
</div>
