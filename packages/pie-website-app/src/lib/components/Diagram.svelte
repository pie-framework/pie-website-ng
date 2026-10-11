<script lang="ts">
	import { base } from '$app/paths';

	/**
	 * An Excalidraw diagram from static/images/diagrams/. The `diagram` class lets
	 * app.css invert it in dark mode; width and height come from the SVG's viewBox
	 * so the layout does not shift, and the figure never scales past that width.
	 */
	let {
		name,
		alt,
		width,
		height,
		caption = undefined,
		class: className = ''
	}: {
		name: string;
		alt: string;
		width: number;
		height: number;
		caption?: string;
		class?: string;
	} = $props();
</script>

<figure class="my-8 mx-auto w-full {className}" style="max-width: {width}px">
	<div class="rounded-xl overflow-hidden border border-base-300 shadow-sm">
		<img
			src="{base}/images/diagrams/{name}.excalidraw.svg"
			class="diagram block w-full h-auto"
			{alt}
			loading="lazy"
			{width}
			{height}
		/>
	</div>
	{#if caption}
		<figcaption class="text-center text-sm text-base-content/60 mt-2">{caption}</figcaption>
	{/if}
</figure>
