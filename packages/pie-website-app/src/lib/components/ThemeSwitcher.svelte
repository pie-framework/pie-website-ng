<script lang="ts">
	import { onMount } from 'svelte';

	let theme = $state('light');

	onMount(() => {
		try { theme = localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'; } catch { /* Optional preference storage. */ }
		document.documentElement.setAttribute('data-theme', theme);
		const sync = () => { theme = document.documentElement.getAttribute('data-theme') || 'light'; };
		window.addEventListener('pie-site-theme-changed', sync);
		return () => window.removeEventListener('pie-site-theme-changed', sync);
	});

	function toggleTheme() {
		theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
		document.documentElement.setAttribute('data-theme', theme);
		try { localStorage.setItem('theme', theme); } catch { /* The visual preference still applies. */ }
		window.dispatchEvent(new Event('pie-site-theme-changed'));
	}
</script>

<button
	class="btn btn-ghost btn-circle"
	aria-label="Dark theme"
	aria-pressed={theme === 'dark'}
	onclick={toggleTheme}
	type="button"
>
	{#if theme === 'dark'}
		<!-- Sun icon (show in dark mode to switch to light) -->
		<svg
			class="w-6 h-6"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			aria-hidden="true"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
			></path>
		</svg>
	{:else}
		<!-- Moon icon (show in light mode to switch to dark) -->
		<svg
			class="w-6 h-6"
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			aria-hidden="true"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
			></path>
		</svg>
	{/if}
</button>
