<script lang="ts">
	import GuideLayout from '$lib/components/GuideLayout.svelte';
	let { children } = $props();
</script>
<GuideLayout area="integrate">{@render children()}</GuideLayout>
