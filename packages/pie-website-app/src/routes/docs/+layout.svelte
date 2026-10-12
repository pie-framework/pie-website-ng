<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import { afterNavigate } from '$app/navigation';
	import { DOCS_NAV, docsNeighbours, docsPageFor } from '$lib/data/docs-nav';

	let { children } = $props();

	const sitePath = $derived(
		base && page.url.pathname.startsWith(base) ? page.url.pathname.slice(base.length) || '/' : page.url.pathname
	);
	const current = $derived(docsPageFor(sitePath));
	const neighbours = $derived(docsNeighbours(sitePath));

	// "On this page" is read from the rendered sections, so a page needs no
	// second list of its headings.
	let toc = $state<{ id: string; label: string }[]>([]);
	let activeId = $state('');
	let content: HTMLElement | undefined = $state();

	function collectToc() {
		if (!content) return;
		toc = [...content.querySelectorAll<HTMLElement>('section[id]')]
			.map((section) => ({ id: section.id, label: section.querySelector('h2')?.textContent?.trim() ?? '' }))
			.filter((entry) => entry.label);
	}

	afterNavigate(() => {
		collectToc();
		activeId = toc[0]?.id ?? '';
	});

	$effect(() => {
		if (!content || toc.length === 0) return;
		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
				if (visible[0]) activeId = visible[0].target.id;
			},
			{ rootMargin: '-96px 0px -65% 0px' }
		);
		for (const entry of toc) {
			const el = document.getElementById(entry.id);
			if (el) observer.observe(el);
		}
		return () => observer.disconnect();
	});
</script>

{#snippet docsMenu()}
	{#each DOCS_NAV as group (group.title)}
		<li class="menu-title text-xs uppercase tracking-wider text-base-content/60 mt-3 first:mt-0">{group.title}</li>
		{#each group.pages as docsPage (docsPage.path)}
			<li>
				<a
					href="{base}{docsPage.path}"
					class={docsPage.path === current?.path ? 'menu-active font-semibold' : ''}
					aria-current={docsPage.path === current?.path ? 'page' : undefined}>{docsPage.label}</a
				>
			</li>
		{/each}
	{/each}
{/snippet}

<div class="mx-auto max-w-[96rem] px-4 lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-10 2xl:grid-cols-[15rem_minmax(0,1fr)_13rem]">
	<aside class="hidden lg:block" aria-label="Documentation">
		<nav class="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto py-10">
			<ul class="menu menu-sm w-full p-0">
				{@render docsMenu()}
			</ul>
		</nav>
	</aside>

	<div class="min-w-0 py-8 lg:py-10" bind:this={content}>
		<details class="lg:hidden mb-6 rounded-box border border-base-300 bg-base-200/50">
			<summary class="cursor-pointer px-4 py-3 font-medium">
				Docs{#if current}: <span class="text-primary">{current.label}</span>{/if}
			</summary>
			<nav aria-label="Documentation" class="px-2 pb-3">
				<ul class="menu menu-sm w-full p-0">
					{@render docsMenu()}
				</ul>
			</nav>
		</details>

		{@render children()}

		{#if neighbours.prev || neighbours.next}
			<nav class="mt-16 mb-4 grid gap-4 sm:grid-cols-2" aria-label="Previous and next page">
				{#if neighbours.prev}
					<a
						href="{base}{neighbours.prev.path}"
						class="group rounded-box border border-base-300 p-5 hover:border-primary transition-colors"
					>
						<span class="text-sm text-base-content/60">← Previous</span>
						<span class="block text-lg font-semibold text-secondary group-hover:text-primary">{neighbours.prev.label}</span>
					</a>
				{:else}
					<span></span>
				{/if}
				{#if neighbours.next}
					<a
						href="{base}{neighbours.next.path}"
						class="group rounded-box border border-base-300 p-5 text-right hover:border-primary transition-colors"
					>
						<span class="text-sm text-base-content/60">Next →</span>
						<span class="block text-lg font-semibold text-secondary group-hover:text-primary">{neighbours.next.label}</span>
					</a>
				{/if}
			</nav>
		{/if}
	</div>

	{#if toc.length > 1}
		<aside class="hidden 2xl:block" aria-label="On this page">
			<nav class="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto py-10 text-sm">
				<p class="mb-3 text-xs font-semibold uppercase tracking-wider text-base-content/60">On this page</p>
				<ul class="space-y-2 border-l border-base-300">
					{#each toc as entry (entry.id)}
						<li>
							<a
								href="#{entry.id}"
								class="-ml-px block border-l-2 pl-3 {entry.id === activeId
									? 'border-primary text-primary font-medium'
									: 'border-transparent text-base-content/70 hover:text-base-content'}">{entry.label}</a
							>
						</li>
					{/each}
				</ul>
			</nav>
		</aside>
	{/if}
</div>
