<script lang="ts">
	// Wrapper component to style PIE player/author elements
</script>

<div class="pie-player-container">
	<slot />
</div>

<style>
	.pie-player-container {
		list-style: revert;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		padding: 0 !important;
		margin: 0 !important;
		line-height: 1.4;
	}

	/* Reduce spacing in PIE elements via CSS variables */
	:global(pie-player),
	:global(pie-author) {
		--pie-padding: 0.25rem;
		--pie-spacing: 0.25rem;
		--pie-gap: 0.25rem;
	}

	/* Specific targeting for common PIE element structures */
	.pie-player-container :global(> div),
	.pie-player-container :global(> section) {
		padding: 0 !important;
		margin: 0 !important;
	}

	/* Radio and checkbox spacing */
	.pie-player-container :global(input[type='checkbox']),
	.pie-player-container :global(input[type='radio']) {
		margin-right: 0.5rem !important;
	}

	/* Dark mode overrides for PIE player */
	:global([data-theme='dark']) .pie-player-container {
		/* Override hardcoded white backgrounds */
		background-color: transparent;
	}

	/* Override all text to use theme color - needs !important for inline styles */
	:global([data-theme='dark']) .pie-player-container :global(*) {
		color: oklch(var(--bc)) !important;
	}

	/* Preserve specific element colors that should be different */
	:global([data-theme='dark']) .pie-player-container :global(.correct),
	:global([data-theme='dark']) .pie-player-container :global(.incorrect),
	:global([data-theme='dark']) .pie-player-container :global(.error) {
		/* Let these keep their semantic colors */
		color: inherit !important;
	}

	/* Form inputs */
	:global([data-theme='dark']) .pie-player-container :global(input),
	:global([data-theme='dark']) .pie-player-container :global(textarea),
	:global([data-theme='dark']) .pie-player-container :global(select) {
		background-color: oklch(var(--b2));
		color: oklch(var(--bc));
		border-color: oklch(var(--b3));
	}

	/* Radio and checkbox inputs */
	:global([data-theme='dark']) .pie-player-container :global(input[type='radio']),
	:global([data-theme='dark']) .pie-player-container :global(input[type='checkbox']) {
		background-color: transparent;
		border-color: oklch(var(--bc) / 0.5);
	}

	:global([data-theme='dark']) .pie-player-container :global(button) {
		background-color: oklch(var(--b2));
		color: oklch(var(--bc));
		border-color: oklch(var(--b3));
	}

	/* Override table borders in dark mode */
	:global([data-theme='dark']) .pie-player-container :global(table),
	:global([data-theme='dark']) .pie-player-container :global(th),
	:global([data-theme='dark']) .pie-player-container :global(td) {
		border-color: oklch(var(--b3)) !important;
		color: oklch(var(--bc));
	}

	/* Authoring interface (pie-author) specific styles */
	:global([data-theme='dark']) .pie-player-container :global(pie-author) {
		background-color: transparent !important;
	}

	/* Settings panel and configuration UI */
	:global([data-theme='dark']) .pie-player-container :global([class*='settings']),
	:global([data-theme='dark']) .pie-player-container :global([class*='panel']),
	:global([data-theme='dark']) .pie-player-container :global([class*='config']),
	:global([data-theme='dark']) .pie-player-container :global([class*='toolbar']) {
		background-color: oklch(var(--b1)) !important;
		border-color: oklch(var(--b3)) !important;
	}

	/* Tabs and navigation in author interface */
	:global([data-theme='dark']) .pie-player-container :global([class*='tab']),
	:global([data-theme='dark']) .pie-player-container :global([class*='nav']) {
		background-color: oklch(var(--b2)) !important;
		border-color: oklch(var(--b3)) !important;
	}

	/* Form sections in authoring interface */
	:global([data-theme='dark']) .pie-player-container :global(fieldset),
	:global([data-theme='dark']) .pie-player-container :global(legend) {
		border-color: oklch(var(--b3)) !important;
		color: oklch(var(--bc)) !important;
	}
</style>
