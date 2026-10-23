<script lang="ts">
 import GuidePage from '$lib/components/GuidePage.svelte';
 import type { PageData } from './$types';
 let { data }: { data: PageData } = $props();
</script>
<GuidePage guide={data.guide} />
