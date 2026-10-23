<script lang="ts">
 import { base } from '$app/paths';
 import { page } from '$app/state';
 import { afterNavigate } from '$app/navigation';
 import { PRIMARY_NAV } from '$lib/data/site';
 import { SITES } from '$lib/data/links';
 import ThemeSwitcher from './ThemeSwitcher.svelte';
 import SiteIcon from './SiteIcon.svelte';
 import { onMount } from 'svelte';
 let mobileOpen = $state(false);
 let menuButton: HTMLButtonElement;
 let nav: HTMLElement;
 const currentPath = $derived(base && page.url.pathname.startsWith(base) ? page.url.pathname.slice(base.length) : page.url.pathname);
 afterNavigate(() => { mobileOpen = false; });
 onMount(() => {
  const observer = new ResizeObserver(() => {
   document.documentElement.style.setProperty('--site-header-height', nav.getBoundingClientRect().height + 'px');
  });
  observer.observe(nav);
  return () => observer.disconnect();
 });
</script>

<svelte:window onkeydown={(event) => { if (event.key === 'Escape' && mobileOpen) { mobileOpen = false; menuButton?.focus(); } }} />
<header class="site-header sticky top-0 z-50" onfocusout={(event) => {
 if (mobileOpen && event.relatedTarget instanceof Node && !event.currentTarget.contains(event.relatedTarget)) mobileOpen = false;
}}>
 <nav class="main-nav" aria-label="Main navigation" bind:this={nav}>
  <a href="{base}/" class="site-brand">
   <img src="{base}/pie-logo.svg" alt="" width="40" height="40" />
   <span><span class="brand-name">PIE Framework</span><span class="brand-caption">Open-source assessment software</span></span>
  </a>
  <div class="desktop-nav nav-links">
   {#each PRIMARY_NAV as entry (entry.path)}
    <a href="{base}{entry.path}" aria-current={currentPath.startsWith(entry.path) ? 'page' : undefined}>{entry.label}</a>
   {/each}
  </div>
  <form action="{base}/search/" method="get" role="search" aria-label="Header search" class="desktop-nav header-search">
   <label class="sr-only" for="header-search">Search the site</label>
   <SiteIcon name="magnifying-glass" /><input id="header-search" name="q" type="search" placeholder="Search PIE" />
  </form>
  <div class="desktop-nav nav-actions">
   <ThemeSwitcher />
   <a class="btn btn-ghost btn-sm" href={SITES.githubOrg} target="_blank" rel="noopener noreferrer">GitHub<span class="sr-only"> (opens in new tab)</span></a>
   <a class="btn btn-primary btn-sm" href="{base}/get-started/">Get started</a>
  </div>
  <button bind:this={menuButton} class="mobile-menu-button btn btn-ghost btn-sm" aria-expanded={mobileOpen} aria-controls="mobile-navigation" onclick={() => mobileOpen = !mobileOpen}>{mobileOpen ? 'Close menu' : 'Menu'}</button>
 </nav>
 <div id="mobile-navigation" hidden={!mobileOpen} class="mobile-navigation border-t border-base-300 px-5 py-4">
  <nav aria-label="Mobile navigation" class="flex flex-col gap-2">
   {#each PRIMARY_NAV as entry (entry.path)}
    <a class="py-2 font-medium" href="{base}{entry.path}" aria-current={currentPath.startsWith(entry.path) ? 'page' : undefined}>{entry.label}</a>
   {/each}
   <a class="py-2" href="{base}/elements/">Element library</a>
   <a class="py-2" href="{base}/get-started/">Get started</a>
  </nav>
  <form action="{base}/search/" method="get" role="search" aria-label="Mobile search" class="mt-4">
   <label for="mobile-search" class="label">Search the site</label>
   <div class="flex gap-2"><input id="mobile-search" class="input site-input min-w-0 w-full" type="search" name="q" placeholder="Search guides, elements and examples" /><button class="btn btn-primary" type="submit">Search</button></div>
  </form>
  <div class="mt-4 flex items-center gap-3"><ThemeSwitcher /><a href={SITES.githubOrg} class="link">GitHub</a><a href="{base}/about/" class="link">About and community</a></div>
 </div>
</header>

<style>
 .site-header { background: var(--site-page); border-bottom: 1px solid color-mix(in srgb, var(--color-base-300) 50%, transparent); }
 .main-nav { display: flex; flex-wrap: wrap; align-items: center; gap: 1.25rem; max-width: 82rem; min-height: 4.5rem; margin: auto; padding: 0.75rem 2.5rem; }
 .site-brand { display: flex; align-items: center; min-width: 0; gap: 0.75rem; margin-right: auto; }
 .site-brand > img, .mobile-menu-button { flex-shrink: 0; }
 .site-brand > span { min-width: 0; }
 .brand-name { display: block; color: var(--color-primary); font-size: 1.2rem; font-weight: 600; letter-spacing: -0.025em; line-height: 1.4; }
 .brand-caption { display: block; color: var(--site-muted); font-size: 0.69rem; line-height: 1.6; }
 .desktop-nav { display: none; }
 .nav-links { align-items: center; gap: 1.3rem; white-space: nowrap; }
 .nav-links a { font-size: 0.8rem; font-weight: 500; padding-block: 0.5rem; }
 .nav-links a:hover, .nav-links [aria-current='page'] { color: var(--color-primary); }
 .header-search { align-items: center; gap: 0.4rem; padding: 0.5rem 0.65rem; background: var(--color-base-100); border: 1px solid var(--site-control-border); border-radius: 0.3rem; color: var(--site-muted); }
 .header-search input { width: 5.25rem; background: transparent; font-size: 0.75rem; color: var(--color-base-content); }
 .nav-actions { align-items: center; gap: 0.25rem; white-space: nowrap; }
 .nav-actions :global(.btn-circle) { width: 2rem; height: 2rem; min-height: 2rem; }
 .nav-actions :global(.btn-circle svg) { width: 1.15rem; height: 1.15rem; }
 .nav-actions :global(.btn-sm) { font-size: 0.75rem; }
 .mobile-navigation { max-height: calc(100dvh - var(--site-header-height, 4.5rem)); overflow-y: auto; overscroll-behavior: contain; }
 @media (min-width: 1000px) {
  .desktop-nav { display: flex; }
  .mobile-menu-button, .mobile-navigation { display: none; }
  .main-nav { gap: 0.875rem; padding-inline: 2rem; }
 }
 @media (min-width: 1200px) { .main-nav { gap: 1.5rem; } .nav-links { gap: 1.5rem; } .header-search input { width: 6rem; } }
 @media (max-width: 999px) { .main-nav { flex-wrap: nowrap; } }
 @media (max-width: 640px) { .main-nav { min-height: 4.5rem; padding-inline: 1.25rem; } .brand-caption { font-size: 0.6rem; } .brand-name { font-size: 1.1rem; } .site-brand { gap: 0.5rem; } }
</style>
