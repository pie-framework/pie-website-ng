<script lang="ts">
	import { base } from '$app/paths';
	let { name, class: className = '' }: {
		name: 'arrow-right' | 'book-open' | 'file-text' | 'magnifying-glass';
		class?: string;
	} = $props();
</script>

<!-- Phosphor regular icons; original SVGs and license live in static/images/icons. -->
<span aria-hidden="true" class="site-icon {className}" style="mask-image: url('{base}/images/icons/{name}.svg')"></span>

<style>
	.site-icon { display: inline-block; flex: 0 0 auto; width: 1.25em; height: 1.25em; background: currentColor; mask-size: contain; mask-repeat: no-repeat; mask-position: center; vertical-align: middle; }
</style>
