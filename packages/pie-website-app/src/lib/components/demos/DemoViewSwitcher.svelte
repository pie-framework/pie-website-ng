<script lang="ts">
	import type { DemoView } from '$lib/data/demo-view';
	import { base } from '$app/paths';
	let { value, onchange, disabled = false, hint = false }: {
		value: DemoView;
		onchange: (view: DemoView) => void;
		disabled?: boolean;
		hint?: boolean;
	} = $props();
</script>

<fieldset class="view-switcher text-sm font-medium" {disabled}>
	<legend class="mb-1">View</legend>
	<div class="view-options">
		<button type="button" aria-pressed={value === 'student'} title="Student view: answer questions" onclick={() => onchange('student')}>Student</button>
		<button type="button" aria-pressed={value === 'instructor'} title="Instructor view: review answers and feedback" onclick={() => onchange('instructor')}>Instructor</button>
	</div>
	{#if hint}
		<span class="instructor-hint" aria-hidden="true"><span>Try the instructor view</span><img src="{base}/images/editorial/instructor-arrow.png" width="80" height="40" alt="" /></span>
	{/if}
</fieldset>

<style>
	.view-switcher { position: relative; }
	.instructor-hint { position: absolute; bottom: calc(100% + 0.75rem); left: 7.5rem; width: max-content; max-width: 13rem; pointer-events: none; color: var(--color-primary); font-family: var(--font-annotation); font-size: 1.4rem; font-weight: 500; white-space: normal; transform: rotate(-5deg); }
	.instructor-hint img { position: absolute; top: 1.25rem; left: -2.6rem; width: 4.5rem; height: 2.25rem; }
	.view-options {
		display: inline-flex;
		gap: 0.125rem;
		padding: 0.1875rem;
		border: 1px solid var(--site-control-border);
		border-radius: 0.375rem;
		background: var(--color-base-100);
	}
	button {
		min-height: 2rem;
		padding: 0 0.875rem;
		border: 0;
		border-radius: 0.3125rem;
		background: transparent;
		color: color-mix(in oklch, var(--color-base-content) 70%, transparent);
		font-size: 0.875rem;
		font-weight: 500;
		line-height: 1.5;
		cursor: pointer;
		transition: color 150ms ease, background-color 150ms ease;
	}
	button:hover:not(:disabled) { color: var(--color-base-content); }
	button[aria-pressed='true'] {
		background: var(--site-accent);
		color: var(--color-secondary-content);
		box-shadow: none;
	}
	button:disabled { cursor: not-allowed; opacity: 0.5; }
	@media (max-width: 900px) { .instructor-hint { display: none; } }
</style>
