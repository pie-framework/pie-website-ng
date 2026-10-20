<script lang="ts">
	import '../app.css';
	import Navigation from '$lib/components/Navigation.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import StatusBanner from '$lib/components/StatusBanner.svelte';
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { page } from '$app/stores';
	import { ELEMENT_COUNT } from '$lib/data/elements';

	let { children } = $props();

	// The site is served at the root of its custom domain (static/CNAME).
	const SITE_URL = 'https://pie-framework.org';
	const OG_IMAGE = `${SITE_URL}/og-image.jpg`;
	const SHARE_DESCRIPTION = `Enterprise-proven web components for rendering ${ELEMENT_COUNT} interactive element types. MIT licensed. Modern web standards.`;
	const sitePath = $derived(
		base && $page.url.pathname.startsWith(base)
			? $page.url.pathname.slice(base.length) || '/'
			: $page.url.pathname
	);
	const canonicalUrl = $derived(SITE_URL + sitePath);
	// Redirect pages point their canonical URL at the target; /elements/ sets its own.
	const REDIRECT_TARGETS: Record<string, string> = {
		'/docs/players-toolkit/': `${SITE_URL}/docs/players/`
	};
	const isRedirect = $derived(sitePath === '/elements/');
	const canonicalHref = $derived(REDIRECT_TARGETS[sitePath] ?? canonicalUrl);
	// The QTI beta banner belongs to the QTI docs section only.
	const showStatusBanner = $derived(sitePath === '/docs/qti' || sitePath.startsWith('/docs/qti/'));

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

	<!-- Each content page sets its own description. -->
	<meta name="keywords" content="PIE Framework, assessment items, interactive questions, web components, open source, edtech, K-12, QTI, education technology, e-learning" />
	<meta name="author" content="PIE Framework" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="PIE Framework" />
	<meta property="og:title" content="PIE Framework - Open Source Assessment Items" />
	<meta property="og:description" content={SHARE_DESCRIPTION} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:image" content={OG_IMAGE} />
	<meta property="og:image:width" content="1424" />
	<meta property="og:image:height" content="752" />
	<meta property="og:image:alt" content="PIE Framework - Open Source Assessment Items" />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="PIE Framework - Open Source Assessment Items" />
	<meta name="twitter:description" content={SHARE_DESCRIPTION} />
	<meta name="twitter:image" content={OG_IMAGE} />
	<meta name="twitter:image:alt" content="PIE Framework - Open Source Assessment Items" />

	<!-- Additional SEO -->
	<meta name="robots" content="index, follow" />
	<meta name="language" content="English" />
	{#if !isRedirect}
		<link rel="canonical" href={canonicalHref} />
	{/if}
</svelte:head>

<div class="flex flex-col min-h-screen">
	<!-- Skip to main content link for keyboard navigation -->
	<a
		href="#main-content"
		class="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-content focus:rounded focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-focus"
	>
		Skip to main content
	</a>
	<Navigation />
	{#if showStatusBanner}
		<StatusBanner />
	{/if}
	<main id="main-content" class="flex-1">
		{@render children()}
	</main>
	<Footer />
</div>
