<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import { afterNavigate } from '$app/navigation';
	import { tick, type Snippet } from 'svelte';
	import { BUILD_PAGES, GUIDE_PAGES, INTEGRATE_PAGES, sitePageFor, type Area } from '$lib/data/site';
	let { area = 'docs', children }: { area?: Area; children: Snippet } = $props();
	const groups = $derived(area === 'integrate'
		? [{ title: 'Integrate PIE', pages: INTEGRATE_PAGES }]
		: area === 'build'
			? [{ title: 'Build interactions', pages: BUILD_PAGES }]
			: [...new Set(GUIDE_PAGES.map((entry) => entry.group!))].map((title) => ({ title, pages: GUIDE_PAGES.filter((entry) => entry.group === title) })));
	const path = $derived(base && page.url.pathname.startsWith(base) ? page.url.pathname.slice(base.length) : page.url.pathname);
	const current = $derived(sitePageFor(path));
	let content: HTMLElement | undefined = $state();
	let headings = $state<{ id: string; label: string }[]>([]);
	afterNavigate(async () => {
		await tick();
		headings = content ? [...content.querySelectorAll<HTMLElement>('h2[id], section[id] > h2')].map((heading) => ({
			id: heading.id || heading.parentElement?.id || '',
			label: heading.textContent?.trim() ?? ''
		})).filter((entry) => entry.id && entry.label) : [];
	});
</script>

{#snippet menu()}
	<ul class="menu menu-sm w-full p-0">
		<li><a href="{base}/{area}/" aria-current={path === '/' + area + '/' ? 'page' : undefined}>{area === 'integrate' ? 'Choose your integration' : area === 'build' ? 'Start building' : 'Documentation overview'}</a></li>
		{#each groups as group (group.title)}
			<li class="menu-title mt-5 text-site-muted">{group.title}</li>
			{#each group.pages as entry (entry.path)}
				<li><a href="{base}{entry.path}" class:menu-active={current?.path === entry.path} aria-current={current?.path === entry.path ? 'page' : undefined}>{entry.label}</a></li>
			{/each}
		{/each}
		{#if area !== 'docs'}
			<li class="menu-title mt-5 text-site-muted">Go deeper</li>
			<li><a href="{base}/elements/">Element library</a></li>
			<li><a href="{base}/docs/">Guides and reference</a></li>
			<li><a href="{base}/explore/">Working examples</a></li>
		{/if}
	</ul>
{/snippet}

<div class="guide-layout mx-auto max-w-[90rem] px-5 lg:grid lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-12 2xl:grid-cols-[13rem_minmax(0,1fr)_11rem]">
	<aside class="hidden lg:block">
		<nav class="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto py-8" aria-label={area + ' navigation'}>{@render menu()}</nav>
	</aside>
	<div id="guide-content" tabindex="-1" class="min-w-0 py-8 lg:py-10" bind:this={content}>
		<details class="mb-6 rounded-box border border-base-300 lg:hidden">
			<summary class="px-4 py-3 cursor-pointer">{area === 'docs' ? 'Guides and reference' : area === 'build' ? 'Build interactions' : 'Integrate PIE'}{#if current}: {current.label}{/if}</summary>
			<nav class="px-2 pb-3" aria-label={area + ' navigation'}>{@render menu()}</nav>
		</details>
		{@render children()}
	</div>
	{#if headings.length > 1}
		<aside class="hidden 2xl:block">
			<nav class="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto py-10 text-sm" aria-label="On this page">
				<p class="mb-3 font-semibold">On this page</p>
				<ul class="space-y-3 border-l border-base-300 pl-3">
					{#each headings as heading (heading.id)}
						<li><a class="text-base-content/70 hover:text-primary" href="#{heading.id}">{heading.label}</a></li>
					{/each}
				</ul>
			</nav>
		</aside>
	{/if}
</div>
