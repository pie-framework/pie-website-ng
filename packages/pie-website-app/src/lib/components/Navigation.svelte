<script lang="ts">
	import { base } from '$app/paths';
	import ExternalLink from './ExternalLink.svelte';
	import ThemeSwitcher from './ThemeSwitcher.svelte';
	import { DEVELOPER_GUIDES, SITES } from '$lib/data/links';
	import { DOCS_NAV } from '$lib/data/docs-nav';

	let mobileMenuOpen = $state(false);
	let docsDropdownOpen = $state(false);
	const elementsDemoUrl = SITES.elementsDemo;

	let currentPath = $state('');

	if (typeof window !== 'undefined') {
		currentPath = window.location.pathname;
	}

	function closeDropdown() {
		docsDropdownOpen = false;
	}
</script>

<nav class="navbar bg-base-100 shadow-lg sticky top-0 z-50">
	<div class="container mx-auto">
		<div class="flex-1">
			<a href="{base}/" class="flex items-center gap-3 px-2 py-1">
				<img src="{base}/pie-logo.svg" alt="PIE Framework Logo" class="h-10 w-10" />
				<div class="flex flex-col">
					<span class="text-xl font-bold text-primary">PIE Framework</span>
					<span class="text-xs text-base-content/70">Open Source Assessment Items</span>
				</div>
			</a>
		</div>

		<!-- Desktop Navigation -->
		<div class="flex-none hidden lg:flex items-center gap-4">
			<ul class="menu menu-horizontal px-1 gap-1">
				<li><a href="{base}/about/" class="font-medium" aria-current={currentPath.includes('/about') ? 'page' : undefined}>About</a></li>
				<li>
					<details bind:open={docsDropdownOpen}>
						<summary class="font-medium" aria-current={currentPath.includes('/docs/') ? 'page' : undefined}>Docs</summary>
						<div class="bg-base-100 rounded-box shadow-lg z-50 w-[36rem] p-4 grid grid-cols-2 gap-x-4 gap-y-2">
							{#each DOCS_NAV as group (group.title)}
								<ul class="menu menu-sm w-full p-0">
									<li class="menu-title">{group.title}</li>
									{#each group.pages as docsPage (docsPage.path)}
										<li><a href="{base}{docsPage.path}" onclick={closeDropdown}>{docsPage.label}</a></li>
									{/each}
								</ul>
							{/each}
							<ul class="menu menu-sm w-full p-0">
								<li class="menu-title">Developer guides</li>
								{#each DEVELOPER_GUIDES as guide (guide.href)}
									<li><ExternalLink href={guide.href} class="">{guide.label}</ExternalLink></li>
								{/each}
							</ul>
						</div>
					</details>
				</li>
				<li><a href={elementsDemoUrl} class="font-medium">Elements Demo</a></li>
			</ul>
			<ThemeSwitcher />
			<a
				href={SITES.githubOrg}
				target="_blank"
				rel="noopener noreferrer"
				class="btn btn-ghost btn-sm btn-circle"
				aria-label="GitHub (opens in new tab)"
			>
				<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
					<path
						d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
					/>
				</svg>
			</a>
			<a
				href={SITES.slack}
				target="_blank"
				rel="noopener noreferrer"
				class="btn btn-ghost btn-sm btn-circle"
				aria-label="Slack (opens in new tab)"
			>
				<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
					<path
						d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"
					/>
				</svg>
			</a>
		</div>

		<!-- Mobile Menu Button -->
		<div class="flex-none lg:hidden">
			<button
				class="btn btn-ghost btn-circle"
				onclick={() => (mobileMenuOpen = !mobileMenuOpen)}
				aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
			aria-expanded={mobileMenuOpen}
			aria-controls="mobile-menu"
			>
				<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d={mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
					/>
				</svg>
			</button>
		</div>
	</div>
</nav>

<!-- Mobile Menu Dropdown -->
{#if mobileMenuOpen}
	<div id="mobile-menu" class="lg:hidden bg-base-100 shadow-lg">
		<ul class="menu menu-vertical px-4 py-2">
			<li><a href="{base}/about/">About</a></li>
			{#each DOCS_NAV as group (group.title)}
				<li>
					<span class="menu-title text-xs uppercase tracking-wider opacity-60 mt-2">{group.title}</span>
				</li>
				{#each group.pages as docsPage (docsPage.path)}
					<li><a href="{base}{docsPage.path}" onclick={() => (mobileMenuOpen = false)}>{docsPage.label}</a></li>
				{/each}
			{/each}
			<li>
				<span class="menu-title text-xs uppercase tracking-wider opacity-60 mt-2">Developer guides</span>
			</li>
			{#each DEVELOPER_GUIDES as guide (guide.href)}
				<li><ExternalLink href={guide.href} class="">{guide.label}</ExternalLink></li>
			{/each}
			<li class="mt-2"><a href={elementsDemoUrl}>Elements Demo</a></li>
			<li class="mt-2">
				<div class="flex gap-2 items-center">
					<ThemeSwitcher />
					<a
						href={SITES.githubOrg}
						target="_blank"
						rel="noopener noreferrer"
						class="btn btn-ghost btn-sm flex-1"
					>
						<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
							/>
						</svg>
						GitHub
					</a>
					<a
						href={SITES.slack}
						target="_blank"
						rel="noopener noreferrer"
						class="btn btn-ghost btn-sm flex-1"
					>
						<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
							<path
								d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"
							/>
						</svg>
						Slack
					</a>
				</div>
			</li>
		</ul>
	</div>
{/if}
