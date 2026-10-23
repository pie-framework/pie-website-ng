<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import { LEGACY_ROUTES } from '$lib/data/legacy-routes';
	import { SITE_NAME, SITE_URL, canonicalUrl, normalizePath, pageShareImage, pageStructuredData, jsonForHtml } from '$lib/seo';

	let { title, description, noindex = false }: {
		title: string;
		description: string;
		noindex?: boolean;
	} = $props();

	const path = $derived(normalizePath(base && page.url.pathname.startsWith(base)
		? page.url.pathname.slice(base.length) || '/' : page.url.pathname));
	const canonical = $derived(canonicalUrl(path));
	const image = $derived(pageShareImage(path, title));
	const structuredData = $derived(noindex || LEGACY_ROUTES[path] ? ''
		: '<script type="application/ld+json">' + jsonForHtml(pageStructuredData(path, title, description, image)) + '</scr' + 'ipt>');
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta name="robots" content={noindex ? 'noindex, follow' : 'index, follow'} />
	<link rel="canonical" href={canonical} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={SITE_URL + image.path} />
	<meta property="og:image:type" content="image/png" />
	<meta property="og:image:width" content={String(image.width)} />
	<meta property="og:image:height" content={String(image.height)} />
	<meta property="og:image:alt" content={image.alt} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={SITE_URL + image.path} />
	<meta name="twitter:image:alt" content={image.alt} />
	{@html structuredData}
</svelte:head>
