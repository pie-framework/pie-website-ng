<script lang="ts">
	import GuideLayout from '$lib/components/GuideLayout.svelte';
	let { children } = $props();
</script>
<GuideLayout area="build">{@render children()}</GuideLayout>
