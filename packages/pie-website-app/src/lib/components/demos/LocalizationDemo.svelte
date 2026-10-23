<script lang="ts">
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { ITEM_PLAYER_VERSION } from '$lib/versions';
	import { CONTENT_LANGUAGES, localizedSection, type ContentLanguage } from '$lib/data/localization-demo';
	import { loadSectionRuntime, demoToolRegistry, type DemoSectionElement } from './section-runtime';

	// The two channels are independent: the interface select drives the
	// `locale` attribute, the content select swaps in a translated section.
	const INTERFACE_LOCALES = [
		{ value: 'en-US', label: 'English (en-US)', tier: 'bundled' },
		{ value: 'nl-NL', label: 'Nederlands (nl-NL)', tier: 'bundled' },
		{ value: 'zh', label: '中文 (zh)', tier: 'generated' },
		{ value: 'ar', label: 'العربية (ar)', tier: 'generated' }
	];

	let mount = $state<HTMLDivElement>();
	let status = $state<'idle' | 'loading' | 'ready' | 'error'>('idle');
	let message = $state('');
	let locale = $state('en-US');
	let language = $state<ContentLanguage>('en-US');
	let player: DemoSectionElement | undefined;
	let i18nPromise: Promise<unknown> | undefined;
	let active = false;
	let generation = 0;
	let timeout: ReturnType<typeof setTimeout> | undefined;
	let removeListeners = () => {};

	const tier = $derived(INTERFACE_LOCALES.find((entry) => entry.value === locale)?.tier);

	// The composition the generated tier's README shows: bundled catalogs win,
	// the generated tier answers the rest.
	function interfaceI18n() {
		i18nPromise ??= Promise.all([
			import('@pie-players/pie-players-shared/i18n'),
			import('@pie-players/pie-i18n-generated')
		]).then(([shared, generated]) => shared.createPieI18n({
			availableLocales: [...shared.BUNDLED_LOCALES, ...generated.GENERATED_LOCALES],
			loadCatalog: (tag: string) => shared.loadBundledCatalog(tag).catch(() => generated.loadGeneratedCatalog(tag))
		})).catch((error) => { i18nPromise = undefined; throw error; });
		return i18nPromise;
	}

	function teardown() {
		clearTimeout(timeout);
		removeListeners();
		player?.remove();
		player = undefined;
	}

	async function render() {
		const ownGeneration = ++generation;
		teardown();
		status = 'loading';
		message = '';
		timeout = setTimeout(() => {
			if (active && generation === ownGeneration && status === 'loading') {
				status = 'error';
				message = 'The player is taking longer than expected to load from the CDN.';
			}
		}, 45000);
		try {
			const [module, i18n] = await Promise.all([loadSectionRuntime(), interfaceI18n()]);
			if (!active || ownGeneration !== generation) return;
			const element = document.createElement('pie-section-player-splitpane') as DemoSectionElement;
			element.setAttribute('show-toolbar', 'true');
			element.setAttribute('toolbar-position', 'top');
			element.setAttribute('locale', locale);
			element.setAttribute('base-heading-level', '3');
			element.setAttribute('narrow-layout-breakpoint', '760');
			element.style.display = 'block';
			element.style.height = '100%';
			element.toolRegistry = demoToolRegistry(module);
			element.runtime = {
				assessmentId: 'pie-website-localization-demo',
				playerType: 'iife',
				env: { mode: 'gather', role: 'student', locale: language },
				contentLanguage: language,
				i18n,
				tools: {
					placement: {
						section: ['theme', 'lineReader'],
						passage: ['textToSpeech'],
						item: ['textToSpeech', 'answerEliminator']
					},
					providers: { textToSpeech: { backend: 'browser' } }
				}
			};
			element.assessment = { id: 'pie-website-localization-demo' };
			element.section = localizedSection(language);
			const ready = () => { if (player === element) { status = 'ready'; clearTimeout(timeout); } };
			const failed = (event: Event) => {
				const detail = (event as CustomEvent).detail;
				if (detail?.recoverable === false || detail?.severity === 'fatal') {
					status = 'error';
					message = detail.message || 'The section could not be loaded.';
				}
			};
			element.addEventListener('pie-loading-complete', ready);
			element.addEventListener('framework-error', failed);
			removeListeners = () => {
				element.removeEventListener('pie-loading-complete', ready);
				element.removeEventListener('framework-error', failed);
			};
			player = element;
			mount?.append(element);
		} catch (error) {
			if (!active || ownGeneration !== generation) return;
			clearTimeout(timeout);
			status = 'error';
			message = error instanceof Error ? error.message : 'The player could not be loaded.';
		}
	}

	// The interface locale changes in place: the player re-renders its chrome
	// from the provider and keeps the responses.
	function changeLocale() {
		player?.setAttribute('locale', locale);
	}

	onMount(() => {
		active = true;
		return () => { active = false; generation++; teardown(); };
	});
</script>

<div class="localization-demo rounded-box border border-base-300 bg-base-100">
	{#if status === 'idle'}
		<div class="p-6">
			<p class="mb-4 text-base-content/75">Switch the player interface and the content language independently, including Chinese and right-to-left Arabic.</p>
			<button class="btn btn-primary" onclick={render}>Start the example</button>
		</div>
	{:else}
		<div class="flex flex-wrap items-end gap-4 border-b border-base-300 p-4">
			<label class="text-sm font-medium">Interface locale
				<select class="site-select mt-1 block" bind:value={locale} onchange={changeLocale}>
					{#each INTERFACE_LOCALES as entry (entry.value)}<option value={entry.value}>{entry.label}</option>{/each}
				</select>
			</label>
			<label class="text-sm font-medium">Content language
				<select class="site-select mt-1 block" bind:value={language} onchange={render}>
					{#each CONTENT_LANGUAGES as entry (entry.value)}<option value={entry.value}>{entry.label}</option>{/each}
				</select>
			</label>
		</div>
		{#if status === 'loading'}<p role="status" class="px-4 pt-3 text-sm text-base-content/70">Loading the section…</p>{/if}
		{#if status === 'error'}
			<div role="alert" class="m-4 rounded-box border border-warning p-4 text-sm">
				<p>{message}</p><p class="mt-2"><a class="link" href="{base}/integrate/section-player/">Read the integration guide</a>.</p>
			</div>
		{/if}
		<pie-theme class="localization-demo-stage" style="display: block" theme="light" provider="none">
			<div class="h-full" bind:this={mount}></div>
		</pie-theme>
		<div class="border-t border-base-300 p-4 text-sm text-base-content/70">
			<p>
				{#if tier === 'generated'}
					The {locale} interface comes from the generated tier, which is machine-translated and unreviewed{locale === 'ar' ? '; right-to-left layout has not been audited yet' : ''}.
				{:else}
					The {locale} interface comes from a reviewed catalog bundled with the players.
				{/if}
				The content language sets <code>lang</code> and <code>dir</code> on the passage and items, and the voice read-aloud uses. Multiple choice names its question region in the interface locale; its other labels are still English in this release.
			</p>
			<p class="mt-3 text-xs">PIE players {ITEM_PLAYER_VERSION} · The translated passages are the site's own and unreviewed · Browser read-aloud uses the voices available on your device.</p>
		</div>
	{/if}
</div>

<style>
	.localization-demo-stage { display: block; height: 32rem; min-width: 0; overflow: auto; padding: 1rem; background: var(--pie-background, #fff); color: var(--pie-text, #172331); color-scheme: light; }
	@media (max-width: 640px) { .localization-demo-stage { height: 34rem; padding: 0.5rem; } }
</style>
