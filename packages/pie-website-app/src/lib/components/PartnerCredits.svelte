<script lang="ts">
	import { base } from '$app/paths';
	import { PARTNERS } from '$lib/data/partners';
</script>

<ul class="partner-credits">
	{#each PARTNERS as partner (partner.href)}
		<li>
			<a class="partner-identity" class:transparent-mark={partner.transparentOnDark} href={partner.href} target="_blank" rel="noopener noreferrer">
				<img src="{base}/{partner.logo}" alt={partner.name} width={partner.width} height={partner.height} loading="lazy" />
				<span class="sr-only"> (opens in new tab)</span>
			</a>
		</li>
	{/each}
</ul>

<style>
	.partner-credits { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem 1.25rem; margin: 0; padding: 0; list-style: none; }
	.partner-identity { display: flex; align-items: center; justify-content: center; min-height: 6rem; padding: 0.5rem; border-radius: 0.375rem; }
	.partner-identity img { max-width: 100%; height: auto; object-fit: contain; }
	.partner-identity:hover img { opacity: 0.8; }
	:global([data-theme='dark']) .partner-identity:not(.transparent-mark) { background: #fff; }
	@media (min-width: 768px) { .partner-credits { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
</style>
