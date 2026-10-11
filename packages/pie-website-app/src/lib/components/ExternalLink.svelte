<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		href,
		class: className = 'link link-primary',
		icon = true,
		children
	}: { href: string; class?: string; icon?: boolean; children: Snippet } = $props();
</script>

<a {href} class={className} target="_blank" rel="noopener noreferrer"
	>{@render children()}{#if icon}<svg
			class="inline-block shrink-0 w-[0.9em] h-[0.9em] ml-1 align-[-0.1em]"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			aria-hidden="true"
			><path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
			/></svg
		>{/if}<span class="sr-only"> (opens in new tab)</span></a
>
