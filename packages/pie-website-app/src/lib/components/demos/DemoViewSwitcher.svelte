<script lang="ts">
	import type { DemoView } from '$lib/data/demo-view';
	let { value, onchange, disabled = false }: {
		value: DemoView;
		onchange: (view: DemoView) => void;
		disabled?: boolean;
	} = $props();
</script>

<fieldset class="view-switcher text-sm font-medium" {disabled}>
	<legend class="mb-1">View</legend>
	<div class="view-options">
		<button type="button" aria-pressed={value === 'student'} title="Student view: answer questions" onclick={() => onchange('student')}>Student</button>
		<button type="button" aria-pressed={value === 'instructor'} title="Instructor view: review answers and feedback" onclick={() => onchange('instructor')}>Instructor</button>
	</div>
</fieldset>

<style>
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
</style>
