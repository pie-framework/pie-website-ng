<script lang="ts">
 import { base } from '$app/paths';
 import { INTEGRATE_PAGES, BUILD_PAGES } from '$lib/data/site';
 import { SITES } from '$lib/data/links';
 import { PARTNERS } from '$lib/data/partners';
 const groups = [
  { title: 'Integrate PIE', pages: INTEGRATE_PAGES.slice(0, 5) },
  { title: 'Build interactions', pages: [{ path: '/elements/', label: 'Element library' }, ...BUILD_PAGES] },
  { title: 'Resources', pages: [
   { path: '/explore/', label: 'Working examples' }, { path: '/docs/', label: 'Guides and reference' },
   { path: '/status/', label: 'Project status' }, { path: '/status/#website-accessibility', label: 'Accessibility' }, { path: '/qti/', label: 'QTI and PIE' }, { path: '/about/', label: 'About and community' }, { path: '/about/#partners', label: 'Sponsors and partners' }
  ]}
 ];
</script>
<footer class="site-footer mt-12 border-t border-base-300">
 <div class="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
  <div><a href="{base}/" class="mb-4 inline-flex items-center gap-2 text-lg font-semibold text-primary"><img src="{base}/pie-logo.svg" alt="" width="32" height="32" />PIE Framework</a><p class="max-w-xs text-sm leading-relaxed text-base-content/70">Portable Interactions and Elements.<br />Open-source assessment software.</p></div>
  {#each groups as group (group.title)}
   <nav aria-label={group.title}><h2 class="mb-4 text-base font-semibold">{group.title}</h2><ul class="space-y-3 text-sm">
    {#each group.pages as entry (entry.path)}<li><a href="{base}{entry.path}" class="link link-hover">{entry.label}</a></li>{/each}
   </ul></nav>
  {/each}
  <div class="flex flex-wrap gap-5 border-t border-base-300 pt-6 text-xs text-base-content/70 sm:col-span-2 lg:col-span-4">
   <span class="mr-auto">PIE is MIT licensed. Optional providers have their own terms.</span>
   <a href={SITES.githubOrg} class="link link-hover">GitHub</a><a href={SITES.slack} class="link link-hover">Community</a>
   {#each PARTNERS as partner (partner.href)}<a href={partner.href} class="link link-hover">{partner.name}</a>{/each}
  </div>
 </div>
</footer>

<style>
 .site-footer { background: var(--color-base-200); }
 .site-footer a:hover { color: var(--color-primary); }
 .site-footer h2 { font-size: 0.875rem; }
</style>
