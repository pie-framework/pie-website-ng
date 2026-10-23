<script lang="ts">
	import { base } from '$app/paths';

	/** Existing Excalidraw sources and the matching raster illustrations share a white paper surface. */
	let {
		name,
		alt,
		width,
		height,
		format = 'excalidraw.svg',
		caption = undefined,
		class: className = ''
	}: {
		name: string;
		alt: string;
		width: number;
		height: number;
		format?: 'excalidraw.svg' | 'png';
		caption?: string;
		class?: string;
	} = $props();
</script>

<figure class="site-diagram my-8 mx-auto w-full {className}" style="max-width: {width}px">
	<div class="diagram-paper">
		<a href="{base}/images/diagrams/{name}.{format}" target="_blank" rel="noopener noreferrer" aria-label="View full diagram in a new tab: {alt}" class="block cursor-zoom-in">
		<img
			src="{base}/images/diagrams/{name}.{format}"
			class="diagram block w-full h-auto"
			{alt}
			loading="lazy"
			{width}
			{height}
		/>
		<span class="diagram-zoom">View full diagram</span>
		</a>
	</div>
	{#if caption}
		<figcaption class="text-center text-sm text-site-muted mt-2">{caption}</figcaption>
	{/if}
</figure>

<style>
	.diagram-zoom { display: none; }
	@media (max-width: 640px) {
		.diagram-zoom { display: grid; min-height: 2.75rem; place-items: center; padding: 0.5rem 0.75rem; border-top: 1px solid #dcded8; color: #cf3f20; font-size: 0.75rem; font-weight: 500; }
	}
</style>
