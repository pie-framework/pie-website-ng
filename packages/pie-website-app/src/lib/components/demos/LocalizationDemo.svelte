<script lang="ts">
	import { onMount } from 'svelte';
	import { CONTENT_LANGUAGES } from '$lib/data/localization-demo';
	import { DEFAULT_STATE, afaRecord, type Grant, type SimulatorState } from './localization-state';
	import type { LocalizationTrace } from './localization-trace';
	import LocalizationPlayer, { type Observed } from './LocalizationPlayer.svelte';

	// One state drives the trace and the live player. The trace runs the
	// framework's own adapter, policy engine, i18n provider and catalog
	// resolver in the page; the player loads the same inputs from the CDN.

	const GRANTS: { value: Grant; label: string }[] = [
		{ value: 'off', label: 'Not in profile' },
		{ value: 'granted', label: 'Granted' },
		{ value: 'init', label: 'Granted, on at start' },
		{ value: 'prohibited', label: 'Prohibited' }
	];
	const TOOL_NAMES: Record<string, string> = {
		theme: 'Theme', lineReader: 'Line reader', calculator: 'Calculator',
		textToSpeech: 'Read-aloud', answerEliminator: 'Answer eliminator'
	};
	const POLICY_TOOLS = ['calculator', 'lineReader', 'textToSpeech'];
	const ITEM_TOOLS = ['textToSpeech', 'answerEliminator'];
	const LOCALE_SUGGESTIONS = ['en-US', 'nl-NL', 'nl_NL', 'nl-BE', 'es-MX', 'fr-CA', 'zh', 'zh-Hant-TW', 'ar', 'ar-EG', 'he', 'ja', 'de-DE', 'en'];
	const SIGN_LANGUAGES = [
		{ value: 'ase', label: 'American (ase)' },
		{ value: 'bfi', label: 'British (bfi)' },
		{ value: 'dse', label: 'Dutch (dse)' }
	];
	const PRESETS: { label: string; apply: Partial<SimulatorState> }[] = [
		{ label: 'Dutch interface, English content', apply: {} },
		{ label: 'Arabic, right to left', apply: { locale: 'ar-EG', content: 'ar' } },
		{ label: 'Screen reader user', apply: { readingType: 'screen-reader', spoken: 'init' } },
		{ label: 'Proctor turns read-aloud off', apply: { overrides: { calculator: '', lineReader: '', textToSpeech: 'off' } } },
		{ label: 'Calculator blocked by district', apply: { calculator: 'init', districtBlocked: ['calculator'] } },
		{ label: 'Unlisted locale with own messages', apply: { locale: 'de-DE', customMessages: true } },
		{ label: 'Sign language with no matching card', apply: { signLanguage: 'granted', signLang: 'dse' } }
	];

	let sim = $state<SimulatorState>(structuredClone(DEFAULT_STATE));
	let edited = $state(false);
	let jsonText = $state('');
	let jsonError = $state('');
	let handRecord = $state<Record<string, unknown>>({});
	let trace = $state<LocalizationTrace>();
	let traceError = $state('');
	let observed = $state<Observed | null>(null);
	let view = $state<'trace' | 'player'>('trace');
	let voices = $state<SpeechSynthesisVoice[]>([]);
	let traceModule: Promise<typeof import('./localization-trace')> | undefined;
	let generation = 0;

	const builtRecord = $derived(afaRecord(sim));
	const record = $derived(edited ? handRecord : builtRecord);
	const shownJson = $derived(edited ? jsonText : JSON.stringify(builtRecord, null, 2));

	function preset(apply: Partial<SimulatorState>) {
		edited = false;
		jsonError = '';
		sim = { ...structuredClone(DEFAULT_STATE), ...structuredClone(apply) };
	}

	function editJson(event: Event) {
		const text = (event.currentTarget as HTMLTextAreaElement).value;
		jsonText = text;
		edited = true;
		try {
			const parsed = JSON.parse(text);
			if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('The record must be a JSON object.');
			handRecord = parsed;
			jsonError = '';
		} catch (error) {
			jsonError = error instanceof Error ? error.message : 'Not valid JSON.';
		}
	}

	function toggle(list: string[], id: string) {
		return list.includes(id) ? list.filter((entry) => entry !== id) : [...list, id];
	}

	$effect(() => {
		const state = $state.snapshot(sim) as SimulatorState;
		const input = $state.snapshot(record) as Record<string, unknown>;
		const own = ++generation;
		traceModule ??= import('./localization-trace');
		traceModule
			.then((module) => module.traceLocalization(state, input))
			.then((result) => { if (own === generation) { trace = result; traceError = ''; } })
			.catch((error) => { if (own === generation) traceError = error instanceof Error ? error.message : String(error); });
	});

	onMount(() => {
		if (!('speechSynthesis' in window)) return;
		const load = () => { voices = speechSynthesis.getVoices(); };
		load();
		speechSynthesis.addEventListener('voiceschanged', load);
		return () => speechSynthesis.removeEventListener('voiceschanged', load);
	});

	function deviceVoice(tag: string | undefined) {
		if (!tag || !voices.length) return undefined;
		const lower = tag.toLowerCase().replace('_', '-');
		const primary = lower.split('-')[0];
		return voices.find((voice) => voice.lang.toLowerCase().replace('_', '-') === lower)
			?? voices.find((voice) => voice.lang.toLowerCase().split(/[-_]/)[0] === primary);
	}

	const attrs = (value: { lang: string; dir: string } | null | undefined) => value ? `lang="${value.lang}" dir="${value.dir}"` : 'none';
	const ruleLabel = (rule?: string) => rule ? rule.replace(/-/g, ' ') : '';
</script>

{#snippet grant(label: string, value: Grant, set: (next: Grant) => void, disabled = false)}
	<label class="sim-field">{label}
		<select class="site-select sim-select" {disabled} value={value} onchange={(event) => set(event.currentTarget.value as Grant)}>
			{#each GRANTS as option (option.value)}<option value={option.value}>{option.label}</option>{/each}
		</select>
	</label>
{/snippet}

{#snippet basis(kind: 'framework' | 'documented', source: string)}
	<span class="sim-basis" data-kind={kind} title={kind === 'framework' ? 'Runs the framework code in this page' : 'Follows the documented order; the framework exports no function for it'}>
		{kind === 'framework' ? 'Runs' : 'Documented'} <code>{source}</code>
	</span>
{/snippet}

<div class="localization-sim">
	<div class="sim-presets" role="group" aria-label="Scenarios">
		<span class="text-sm font-semibold">Start from</span>
		{#each PRESETS as entry (entry.label)}
			<button type="button" class="btn btn-sm btn-outline" onclick={() => preset(entry.apply)}>{entry.label}</button>
		{/each}
	</div>

	<div class="sim-controls">
		<fieldset class="sim-group">
			<legend>Student profile <span class="sim-hint">AfA PNP 3.0</span></legend>
			{@render grant('Spoken (read-aloud)', sim.spoken, (next) => (sim.spoken = next), edited)}
			<div class="sim-row">
				<label class="sim-field">Reading type
					<select class="site-select sim-select" disabled={edited || sim.spoken === 'off' || sim.spoken === 'prohibited'} bind:value={sim.readingType}>
						<option value="computer-read-aloud">Computer read-aloud</option>
						<option value="screen-reader">Screen reader</option>
					</select>
				</label>
				<label class="sim-field sim-narrow">Words per minute
					<input class="input input-sm site-input w-24" type="number" min="60" max="400" step="10" disabled={edited || sim.readingType !== 'computer-read-aloud'} bind:value={sim.speechRate} />
				</label>
			</div>
			<div class="sim-row">
				{@render grant('Calculator', sim.calculator, (next) => (sim.calculator = next), edited)}
				<label class="sim-field">Type
					<select class="site-select sim-select" disabled={edited || sim.calculator === 'off' || sim.calculator === 'prohibited'} bind:value={sim.calculatorType}>
						<option value="basic">Basic</option><option value="scientific">Scientific</option><option value="graphing">Graphing</option>
					</select>
				</label>
			</div>
			{@render grant('Line reader', sim.lineReader, (next) => (sim.lineReader = next), edited)}
			<div class="sim-row">
				{@render grant('Sign language', sim.signLanguage, (next) => (sim.signLanguage = next), edited)}
				<label class="sim-field">Language
					<select class="site-select sim-select" disabled={edited || sim.signLanguage === 'off' || sim.signLanguage === 'prohibited'} bind:value={sim.signLang}>
						{#each SIGN_LANGUAGES as option (option.value)}<option value={option.value}>{option.label}</option>{/each}
					</select>
				</label>
			</div>
			<div class="sim-row">
				<label class="sim-check"><input type="checkbox" class="checkbox checkbox-sm" disabled={edited} bind:checked={sim.keywordTranslation} /> Keyword translation (es)</label>
				<label class="sim-field">Language of interface
					<select class="site-select sim-select" disabled={edited} bind:value={sim.languageOfInterface}>
						<option value="">Not in profile</option><option value="es">es</option><option value="nl">nl</option><option value="ar">ar</option>
					</select>
				</label>
			</div>
			<details class="sim-json" open={edited}>
				<summary>AfA record (JSON){edited ? ', edited by hand' : ''}</summary>
				<textarea class="textarea site-input w-full font-mono text-xs" rows="9" spellcheck="false" aria-describedby="sim-json-help" value={shownJson} oninput={editJson}></textarea>
				<p id="sim-json-help" class="sim-hint">
					{#if jsonError}<span class="text-error">{jsonError} The last valid record still applies.</span>
					{:else if edited}The builder above is paused while the record is edited by hand.
					{:else}Edit to try any AfA feature; the builder pauses.{/if}
				</p>
				{#if edited}<button type="button" class="btn btn-xs btn-outline mt-2" onclick={() => { edited = false; jsonError = ''; }}>Back to the builder</button>{/if}
			</details>
		</fieldset>

		<fieldset class="sim-group">
			<legend>Administration <span class="sim-hint">assessment settings</span></legend>
			<p class="sim-label">District blocks</p>
			<div class="sim-row">
				{#each POLICY_TOOLS as id (id)}
					<label class="sim-check"><input type="checkbox" class="checkbox checkbox-sm" checked={sim.districtBlocked.includes(id)} onchange={() => (sim.districtBlocked = toggle(sim.districtBlocked, id))} /> {TOOL_NAMES[id]}</label>
				{/each}
			</div>
			<p class="sim-label">Test administrator overrides</p>
			<div class="sim-row">
				{#each POLICY_TOOLS as id (id)}
					<label class="sim-field sim-narrow">{TOOL_NAMES[id]}
						<select class="site-select sim-select sim-small" bind:value={sim.overrides[id]}>
							<option value="">None</option><option value="on">On</option><option value="off">Off</option>
						</select>
					</label>
				{/each}
			</div>
			<p class="sim-label">Question 1 restricts <span class="sim-hint">item settings</span></p>
			<div class="sim-row">
				{#each ITEM_TOOLS as id (id)}
					<label class="sim-check"><input type="checkbox" class="checkbox checkbox-sm" checked={sim.itemRestricted.includes(id)} onchange={() => (sim.itemRestricted = toggle(sim.itemRestricted, id))} /> {TOOL_NAMES[id]}</label>
				{/each}
			</div>
		</fieldset>

		<fieldset class="sim-group">
			<legend>Interface <span class="sim-hint">the host's locale</span></legend>
			<label class="sim-field">The <code>locale</code> attribute
				<input class="input input-sm site-input w-full" list="sim-locales" placeholder="unset" bind:value={sim.locale} />
				<datalist id="sim-locales">{#each LOCALE_SUGGESTIONS as tag (tag)}<option value={tag}></option>{/each}</datalist>
			</label>
			<label class="sim-check"><input type="checkbox" class="checkbox checkbox-sm" bind:checked={sim.generatedTier} /> Generated tier in the provider</label>
			<label class="sim-check"><input type="checkbox" class="checkbox checkbox-sm" bind:checked={sim.customMessages} /> Host messages for <code>de-DE</code></label>
		</fieldset>

		<fieldset class="sim-group">
			<legend>Content <span class="sim-hint">what the item is written in</span></legend>
			<label class="sim-field">Section language
				<select class="site-select sim-select" bind:value={sim.content}>
					{#each CONTENT_LANGUAGES as entry (entry.value)}<option value={entry.value}>{entry.label} ({entry.value})</option>{/each}
				</select>
			</label>
			<label class="sim-check"><input type="checkbox" class="checkbox checkbox-sm" bind:checked={sim.markupLang} /> <code>lang</code> and <code>dir</code> in the markup</label>
			<label class="sim-check"><input type="checkbox" class="checkbox checkbox-sm" bind:checked={sim.envLocale} /> <code>env.locale</code></label>
			<label class="sim-check"><input type="checkbox" class="checkbox checkbox-sm" bind:checked={sim.runtimeContentLanguage} /> <code>runtime.contentLanguage</code></label>
			<label class="sim-check"><input type="checkbox" class="checkbox checkbox-sm" bind:checked={sim.modelLanguage} /> <code>model.language</code> on multiple choice</label>
			<label class="sim-check"><input type="checkbox" class="checkbox checkbox-sm" bind:checked={sim.mathInQuestion} /> An equation in question 1</label>
		</fieldset>

		<fieldset class="sim-group">
			<legend>Element and read-aloud</legend>
			<div class="sim-row">
				<label class="sim-field">Multiple choice
					<select class="site-select sim-select" bind:value={sim.mcRelease}>
						<option value="published">14.0.7, published</option>
						<option value="next">14.0.8, next</option>
					</select>
				</label>
				<label class="sim-field">Built by
					<select class="site-select sim-select" bind:value={sim.build}>
						<option value="bundle">Bundle service</option>
						<option value="iife">Element IIFE build</option>
						<option value="esm">ESM with Vite</option>
					</select>
				</label>
			</div>
			<div class="sim-row">
				<label class="sim-field">TTS transport
					<select class="site-select sim-select" bind:value={sim.transport}>
						<option value="browser">Browser speech</option>
						<option value="pie">PIE TTS service</option>
						<option value="custom">SchoolCity server</option>
					</select>
				</label>
				<label class="sim-field sim-narrow">Tool <code>language</code>
					<input class="input input-sm site-input w-28" placeholder="unset" bind:value={sim.toolLanguage} />
				</label>
				{#if sim.transport === 'custom'}
					<label class="sim-field sim-narrow">Pinned <code>lang_id</code>
						<input class="input input-sm site-input w-28" placeholder="unset" bind:value={sim.pinnedLangId} />
					</label>
				{/if}
			</div>
		</fieldset>
	</div>

	<div class="sim-tabs" role="tablist" aria-label="Result">
		<button type="button" role="tab" id="sim-tab-trace" aria-controls="sim-panel-trace" aria-selected={view === 'trace'} onclick={() => (view = 'trace')}>How it resolves</button>
		<button type="button" role="tab" id="sim-tab-player" aria-controls="sim-panel-player" aria-selected={view === 'player'} onclick={() => (view = 'player')}>Live player</button>
	</div>

	<div id="sim-panel-trace" role="tabpanel" aria-labelledby="sim-tab-trace" hidden={view !== 'trace'}>
		{#if traceError}
			<div role="alert" class="rounded-box border border-warning p-4 text-sm">The trace failed: {traceError}</div>
		{:else if !trace}
			<p role="status" class="p-4 text-sm text-base-content/70">Loading the framework…</p>
		{:else}
			{@const t = trace}
			<ol class="sim-flow" aria-live="polite" aria-busy="false">
				<li class="sim-stage">
					<header><h4>1. Profile</h4>{@render basis('framework', 'createPersonalNeedsProfileFromAfa')}</header>
					<p class="sim-outcome">
						{t.profile.supports.length ? t.profile.supports.join(', ') : 'No supports'}{#if t.profile.prohibitedSupports?.length}; prohibits {t.profile.prohibitedSupports.join(', ')}{/if}{#if t.profile.activateAtInit?.length}; on at start: {t.profile.activateAtInit.join(', ')}{/if}
					</p>
					<div class="sim-columns">
						<div><p class="sim-label">AfA record in</p><pre>{JSON.stringify(t.record, null, 2)}</pre></div>
						<div><p class="sim-label">Personal needs profile out</p><pre>{JSON.stringify(t.profile, null, 2)}</pre></div>
					</div>
					{#if t.dropped.length}
						<p class="sim-note"><code>language-of-interface</code> sets nothing: the adapter leaves it out, since the interface language is the host's <code>locale</code> attribute.</p>
					{/if}
					{#each t.inputDiagnostics as d (d.code + d.toolId)}
						<p class="sim-diag"><code>{d.code}</code> {d.message}</p>
					{/each}
				</li>

				<li class="sim-stage">
					<header><h4>2. Tool policy</h4>{@render basis('framework', 'ToolPolicyEngine.decide, filterDecidedToolIds')}</header>
					<p class="sim-outcome">
						{#each t.levels as level, i (level.label)}{level.label.replace(' toolbar', '')}: {level.tools.filter((tool) => tool.visible).map((tool) => TOOL_NAMES[tool.toolId]).join(', ') || 'nothing'}{i < t.levels.length - 1 ? ' · ' : ''}{/each}
					</p>
					{#each t.levels as level (level.label)}
						<div class="overflow-x-auto">
							<table class="table table-sm sim-table">
								<caption>{level.label}</caption>
								<thead><tr><th>Tool</th><th>Shown</th><th>Decided by</th><th>Why</th></tr></thead>
								<tbody>
									{#each level.tools as tool (tool.toolId)}
										<tr data-shown={tool.visible}>
											<td>{TOOL_NAMES[tool.toolId] ?? tool.toolId}</td>
											<td>{tool.visible ? 'Yes' : tool.allowed ? 'No, not relevant here' : 'No'}{#if tool.entry?.activateAtInit}, on at start{/if}{#if tool.entry?.required}, required{/if}</td>
											<td>{#if tool.winner}{ruleLabel(tool.winner.rule)} <span class="sim-hint">precedence {tool.winner.precedence}</span>{:else}placement{/if}</td>
											<td>
												{tool.winner?.reason ?? 'Placed on this toolbar, and no rule withdrew it.'}
												{#if tool.allowed && !tool.visible}<br /><span class="sim-hint">Policy allows it, but the toolbar shows it only where the content needs it{tool.toolId === 'calculator' ? ': this question carries no math' : ''}.</span>{/if}
												{#if tool.entry?.parameters && Object.keys(tool.entry.parameters).length}<br /><span class="sim-hint">parameters <code>{JSON.stringify(tool.entry.parameters)}</code></span>{/if}
												{#if tool.trail.length > 1}
													<details class="sim-trail"><summary>All {tool.trail.length} decisions</summary>
														<ul>{#each tool.trail as entry (entry.step)}<li><code>{entry.precedence}</code> {ruleLabel(entry.rule)}, {entry.action}: {entry.reason}</li>{/each}</ul>
													</details>
												{/if}
											</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
						{#each level.diagnostics as d (d.code + d.toolId)}
							<p class="sim-diag"><code>{d.code}</code> {d.message}</p>
						{/each}
					{/each}
				</li>

				<li class="sim-stage">
					<header><h4>3. Interface locale</h4>{@render basis('framework', 'createPieI18n')}</header>
					<p class="sim-outcome">The interface renders in <code>{t.iface.resolved}</code>, {t.iface.direction === 'rtl' ? 'right to left' : 'left to right'}{#if t.iface.custom}, from the host's messages{/if}.</p>
					<ol class="sim-chain">
						<li><span class="sim-label">Requested</span><code>{t.iface.requested}</code></li>
						<li><span class="sim-label">Canonical</span><code>{t.iface.canonical}</code></li>
						<li><span class="sim-label">Lookup</span>{#each t.iface.lookup as tag, i (tag)}<code>{tag}</code>{i < t.iface.lookup.length - 1 ? ' → ' : ''}{:else}<code>en-US</code>{/each}</li>
						<li><span class="sim-label">Catalog</span>
							{#each t.iface.loads as load, i (i)}<span class="sim-load" data-ok={load.ok}>{load.tier} <code>{load.tag}</code> {load.ok ? 'loaded' : 'missing'}</span>{:else}{t.iface.resolved === 'en-US' ? 'en-US is in the players, nothing loads' : t.iface.custom ? 'none: the host supplies the messages' : 'none'}{/each}
						</li>
						<li><span class="sim-label">Resolved</span><code>{t.iface.resolved}</code> <span class="sim-hint">dir={t.iface.direction}</span></li>
					</ol>
					{#if sim.languageOfInterface && sim.languageOfInterface !== t.iface.resolved.split('-')[0]}
						<p class="sim-note">The profile asks for <code>{sim.languageOfInterface}</code>; the player follows the host's <code>locale</code> and shows <code>{t.iface.resolved}</code>.</p>
					{/if}
					<table class="table table-sm sim-table">
						<thead><tr><th>Key</th><th>Text</th></tr></thead>
						<tbody>{#each t.iface.samples as sample (sample.key)}<tr><td><code>{sample.key}</code></td><td dir={t.iface.direction} lang={t.iface.resolved}>{sample.text}</td></tr>{/each}</tbody>
					</table>
					{#if t.iface.custom}<p class="sim-note">Keys the host leaves out fall back to English.</p>{/if}
				</li>

				<li class="sim-stage">
					<header><h4>4. Content language</h4>{@render basis('framework', 'contentLanguageAttributes')}</header>
					<p class="sim-outcome">
						{#if t.content.nearestItem}The questions are marked <code>{t.content.nearestItem.lang}</code>{:else}The questions declare no language{/if}{#if t.content.nearestPassage}, the passage <code>{t.content.nearestPassage.lang}</code>{:else}, the passage none{/if}; the interface stays <code>{t.content.chrome.lang}</code>.
					</p>
					<table class="table table-sm sim-table">
						<thead><tr><th>Where</th><th>From</th><th>Attributes</th></tr></thead>
						<tbody>
							<tr><td>Player interface</td><td><code>locale</code></td><td><code>{attrs(t.content.chrome)}</code></td></tr>
							<tr><td>Item content root</td><td><code>env.locale</code></td><td><code>{attrs(t.content.contentRoot)}</code></td></tr>
							<tr><td>Passage and question markup</td><td>authored <code>lang</code></td><td><code>{attrs(t.content.markup)}</code></td></tr>
							<tr><td>Multiple choice host</td><td><code>model.language</code></td><td><code>{attrs(t.content.elementHost)}</code></td></tr>
						</tbody>
					</table>
					{#if !t.content.nearestItem}
						<p class="sim-note">Undeclared content inherits the page's language, so a screen reader reads it with the page's pronunciation.</p>
					{/if}
					{#if observed}
						<p class="sim-observed">Live player: passage <code>{observed.passage ?? 'no lang'}</code>, question <code>{observed.item ?? 'no lang'}</code>.</p>
					{/if}
				</li>

				<li class="sim-stage">
					<header><h4>5. Element labels</h4>{@render basis('documented', 'multiple choice')}</header>
					<p class="sim-outcome">Its region is named in <code>{t.element.region}</code>; its choices and toggles are labelled in <code>{t.element.labels}</code>.</p>
					<ol class="sim-chain">
						<li><span class="sim-label">Published to elements</span><code>{t.element.published.locale}</code> <span class="sim-hint">dir={t.element.published.direction}</span></li>
						<li><span class="sim-label">Catalogs at runtime</span>{t.element.catalogs.length === 1 ? 'en-US only' : `${t.element.catalogs.length} catalogs`}</li>
						<li><span class="sim-label">Region name</span><code>{t.element.region}</code>, {t.element.region.split('-')[0].toLowerCase() === t.element.published.locale.split('-')[0].toLowerCase() ? 'from the interface locale' : `since multiple choice has no ${t.element.published.locale} catalog in this build`}</li>
						<li><span class="sim-label">Choices and toggles</span><code>{t.element.labels}</code>, from {t.element.labelsFrom}</li>
						<li><span class="sim-label">Loading</span>{t.element.catalogLoad}</li>
					</ol>
					{#if sim.mcRelease === 'published' && t.element.labels !== t.element.region}
						<p class="sim-note">14.0.7 still takes its other labels from <code>model.language</code>; the next release labels everything in the interface locale.</p>
					{/if}
					{#if observed?.region}
						<p class="sim-observed">Live player: region "{observed.region}"{#if observed.legend}, choices "{observed.legend}"{/if}.</p>
					{/if}
				</li>

				<li class="sim-stage">
					<header><h4>6. Read-aloud</h4>{@render basis('documented', 'TTSService.speak')}</header>
					<p class="sim-outcome">
						{#if !t.readAloud.available.passage && !t.readAloud.available.item}
							Read-aloud is withdrawn on every toolbar{t.readAloud.screenReader ? ': the screen reader is in effect' : ''}.
						{:else}
							The passage reads in <code>{t.readAloud.passage.readLocale}</code> and the questions in <code>{t.readAloud.item.readLocale}</code>{#if t.readAloud.rate && t.readAloud.rate !== 1}, at {t.readAloud.rate.toFixed(2)}× speed{/if}.
						{/if}
					</p>
					{#each [{ label: 'Passage', read: t.readAloud.passage, shown: t.readAloud.available.passage }, { label: 'Question 1', read: t.readAloud.item, shown: t.readAloud.available.item }] as { label, read, shown } (label)}
						<div class="sim-read" data-shown={shown}>
							<p class="sim-label">{label}{shown ? '' : ', read-aloud not shown'}</p>
							<ol class="sim-chain">
								{#each read.steps as step (step.source)}
									<li data-winner={read.winner === step.source}><span class="sim-label">{step.source}</span>{#if step.value}<code>{step.value}</code>{:else}<span class="sim-hint">not set</span>{/if}</li>
								{/each}
								<li><span class="sim-label">Read locale</span><code>{read.readLocale}</code></li>
								<li><span class="sim-label">Sent</span>{read.sent}</li>
							</ol>
						</div>
					{/each}
					{#if sim.transport === 'browser' && voices.length}
						{@const voice = deviceVoice(t.readAloud.item.contentLanguage)}
						<p class="sim-observed">This device: {voice ? `${voice.name} (${voice.lang})` : `no voice for ${t.readAloud.item.contentLanguage ?? 'the content'}, so the browser's default`}.</p>
					{/if}
				</li>

				<li class="sim-stage">
					<header><h4>7. In-item alternates</h4>{@render basis('documented', 'resolveSignLanguageAlternate')}</header>
					<p class="sim-outcome">
						{#if !t.alternates.granted}No sign-language video: the profile does not grant it.
						{:else if t.alternates.resolved}Signed video in <code>{t.alternates.resolved}</code>.
						{:else}No signed video: the passage has no <code>{t.alternates.requested}</code> card, and a card in another sign language is never shown.{/if}
					</p>
					<ol class="sim-chain">
						<li><span class="sim-label">Policy</span>{t.alternates.granted ? 'granted' : 'not granted'}{t.alternates.rule && t.alternates.rule !== 'none' ? `, ${ruleLabel(t.alternates.rule)}` : ''}</li>
						<li><span class="sim-label">Requested</span><code>{t.alternates.requested ?? 'none'}</code>{#if t.alternates.defaulted} <span class="sim-hint">the profile names none, so ASL</span>{/if}</li>
						<li><span class="sim-label">Cards on the passage</span>{#each t.alternates.available as tag, i (tag)}<code>{tag}</code>{i < t.alternates.available.length - 1 ? ', ' : ''}{/each}</li>
						<li><span class="sim-label">Pick</span>the requested sign language → a card naming none → nothing</li>
					</ol>
					{#if t.alternates.keyword}
						<p class="sim-note">The profile carries <code>keywordTranslation</code>, but no tool is registered for it, so nothing changes in delivery: keyword and item translation are not shipped.</p>
					{/if}
					<p class="sim-hint mt-2">The sample cards live in this page; the live passage carries no video.</p>
				</li>
			</ol>
		{/if}
	</div>

	<div id="sim-panel-player" role="tabpanel" aria-labelledby="sim-tab-player" hidden={view !== 'player'}>
		<LocalizationPlayer config={sim} {record} onobserved={(value) => (observed = value)} />
		{#if sim.transport !== 'browser' || sim.build !== 'bundle'}
			<p class="sim-hint mt-2">The live player always loads through the bundle service and reads with browser speech; the other build and transport options change the trace only.</p>
		{/if}
	</div>
</div>

<style>
	.localization-sim { display: grid; gap: 1.25rem; }
	.sim-presets { display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem; }
	.sim-controls { display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(17rem, 1fr)); }
	.sim-group { display: grid; align-content: start; gap: 0.75rem; min-width: 0; padding: 1rem; border: 1px solid var(--color-base-300); border-radius: 0.5rem; background: var(--color-base-100); }
	.sim-group legend { padding: 0 0.375rem; font-weight: 600; }
	.sim-row { display: flex; flex-wrap: wrap; gap: 0.75rem; align-items: end; }
	.sim-field { display: grid; gap: 0.25rem; font-size: 0.8125rem; font-weight: 500; }
	.sim-select { min-width: 9rem; height: 2.25rem; }
	.sim-small { min-width: 6rem; }
	.sim-check { display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; }
	.sim-label { font-size: 0.75rem; font-weight: 600; letter-spacing: 0.02em; color: var(--site-muted); }
	.sim-hint { font-size: 0.75rem; font-weight: 400; color: var(--site-muted); }
	.sim-json summary { cursor: pointer; font-size: 0.8125rem; font-weight: 500; }
	.sim-json textarea { margin-top: 0.5rem; }
	.sim-tabs { display: inline-flex; gap: 0.125rem; justify-self: start; padding: 0.1875rem; border: 1px solid var(--site-control-border); border-radius: 0.375rem; }
	.sim-tabs button { min-height: 2.25rem; padding: 0 1rem; border-radius: 0.3125rem; font-size: 0.875rem; font-weight: 500; color: var(--site-muted); }
	.sim-tabs button[aria-selected='true'] { background: var(--color-base-200); color: var(--color-base-content); box-shadow: inset 0 -2px var(--color-primary); }
	.sim-flow { display: grid; gap: 0; counter-reset: stage; }
	.sim-stage { position: relative; padding: 0 0 1.5rem 1.75rem; border-left: 2px solid var(--color-base-300); margin-left: 0.5rem; }
	.sim-stage:last-child { border-left-color: transparent; }
	.sim-stage::before { content: ''; position: absolute; left: -0.5625rem; top: 0.25rem; width: 1rem; height: 1rem; border-radius: 999px; background: var(--color-primary); box-shadow: 0 0 0 3px var(--color-base-100); }
	.sim-stage header { display: flex; flex-wrap: wrap; align-items: baseline; gap: 0.5rem 0.75rem; }
	.sim-stage h4 { font-size: 1.125rem; font-weight: 700; }
	.sim-basis { font-size: 0.75rem; padding: 0.0625rem 0.5rem; border-radius: 999px; border: 1px solid var(--color-base-300); color: var(--site-muted); }
	.sim-basis[data-kind='framework'] { border-color: color-mix(in oklch, var(--color-primary) 45%, transparent); }
	.sim-outcome { margin: 0.375rem 0 0.75rem; font-weight: 600; }
	.sim-columns { display: grid; gap: 0.75rem; grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr)); }
	.sim-stage pre { max-height: 14rem; overflow: auto; padding: 0.625rem; border-radius: 0.375rem; background: var(--color-base-200); font-size: 0.75rem; line-height: 1.5; }
	.sim-table { margin-bottom: 0.75rem; font-size: 0.8125rem; }
	.sim-table caption { text-align: start; font-size: 0.8125rem; font-weight: 600; padding-bottom: 0.25rem; }
	.sim-table tr[data-shown='false'] td:first-child { text-decoration: line-through; color: var(--site-muted); }
	.sim-trail ul { margin-top: 0.25rem; padding-left: 1rem; list-style: disc; font-size: 0.75rem; }
	.sim-trail summary { cursor: pointer; font-size: 0.75rem; color: var(--site-muted); }
	.sim-chain { display: grid; gap: 0.25rem; margin-bottom: 0.75rem; font-size: 0.875rem; }
	.sim-chain > li { display: grid; grid-template-columns: 10.5rem minmax(0, 1fr); gap: 0.75rem; align-items: baseline; }
	.sim-chain > li[data-winner='true'] { font-weight: 600; }
	.sim-chain > li[data-winner='true'] .sim-label::after { content: ' · wins'; color: var(--color-primary); }
	.sim-load { margin-inline-end: 0.75rem; }
	.sim-load[data-ok='false'] { color: var(--site-muted); text-decoration: line-through; }
	.sim-read { margin-bottom: 0.5rem; }
	.sim-read[data-shown='false'] { opacity: 0.65; }
	.sim-note, .sim-diag, .sim-observed { margin-top: 0.5rem; padding: 0.5rem 0.75rem; border-radius: 0.375rem; font-size: 0.8125rem; background: var(--color-base-200); }
	.sim-diag { border-left: 3px solid var(--color-warning); }
	.sim-observed { border-left: 3px solid var(--color-primary); }
	@media (max-width: 640px) {
		.sim-chain > li { grid-template-columns: minmax(0, 1fr); gap: 0; }
		.sim-stage { padding-left: 1.25rem; }
	}
</style>
