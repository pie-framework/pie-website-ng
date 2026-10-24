<script lang="ts">
	import { EXPERIENCES } from '$lib/data/examples';
	import DemoExperience from './demos/DemoExperience.svelte';
	const scenarios = EXPERIENCES.filter((entry) => ['reading-section', 'learner-tools', 'author-and-preview'].includes(entry.slug));
	let selected = $state('reading-section');
	const scenario = $derived(scenarios.find((entry) => entry.slug === selected)!);
</script>

<section id="experience" class="homepage-experience" aria-label="Try PIE">
	<div class="mb-4 flex flex-wrap items-end justify-between gap-4">
		<div><h2 class="section-title mb-2">Try PIE</h2><p class="text-base-content/70">Answer questions, try the tools, or edit an item.</p></div>
		<label class="text-sm font-medium">Example
			<select class="site-select mt-1 block" bind:value={selected}>
				{#each scenarios as entry (entry.slug)}<option value={entry.slug}>{entry.title}</option>{/each}
			</select>
		</label>
	</div>
	<DemoExperience kind={scenario.kind} autoStart={true} editorial={true} />
</section>

<style>
 .homepage-experience { margin-bottom: 0.75rem; }
 .section-title { margin-bottom: 0.5rem; }
</style>
