<script lang="ts">
	let { children } = $props();
</script>

<div class="container mx-auto px-4 py-8 max-w-4xl">
	<article class="prose prose-lg max-w-none
		prose-headings:text-secondary
		prose-h1:text-4xl prose-h1:font-bold prose-h1:mb-8
		prose-h2:text-3xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-4
		prose-h3:text-2xl prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-3
		prose-p:text-base-content prose-p:leading-relaxed
		prose-a:text-primary prose-a:no-underline hover:prose-a:underline
		prose-code:text-accent prose-code:bg-base-200 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
		prose-pre:bg-base-300 prose-pre:border prose-pre:border-base-content/10
		prose-img:rounded-lg prose-img:shadow-lg
		prose-strong:text-secondary prose-strong:font-semibold
		prose-ul:my-4 prose-li:my-2
		prose-blockquote:border-l-primary prose-blockquote:bg-base-200 prose-blockquote:py-2">
		{@render children()}
	</article>
</div>
