<script lang="ts">
	import { base } from '$app/paths';
	import CodeEditor from '$lib/components/CodeEditor.svelte';
	import Diagram from '$lib/components/Diagram.svelte';
	import ExternalLink from '$lib/components/ExternalLink.svelte';

	const PP = 'https://github.com/pie-framework/pie-players/blob/develop/';
	const CONTRACT = `${PP}docs/prds/timed-media-section-contract.md`;
	const SECTION_README = `${PP}packages/section-player/README.md#timed-media`;
	const FORMATIVE = `${PP}docs/section-player/formative-delivery.md`;

	const sectionExample = `const section = {
  identifier: 'water-cycle',
  sectionType: 'timed-media',
  // A correctness gate needs unlimited Tries.
  formative: { enabled: true, maxTries: 'unlimited', feedback: 'correctness' },
  rubricBlocks: [
    {
      identifier: 'video-stimulus-1',
      class: 'stimulus',
      view: ['candidate'],
      passage: videoPassage, // mounts @pie-element/video-stimulus
    },
  ],
  assessmentItemRefs: [
    { identifier: 'q1', item: q1 },
    { identifier: 'q2', item: q2 },
  ],
  timedMedia: {
    stimulusRef: 'video-stimulus-1',
    cues: [
      {
        identifier: 'c1',
        range: { startSeconds: 42.5 },
        itemRefs: ['q1'],
        policy: { activation: 'gate', releaseOn: 'correct', onUnknownCorrectness: 'release' },
      },
      { identifier: 'c2', range: { startSeconds: 118 }, itemRefs: ['q2'], policy: { activation: 'reveal' } },
    ],
    playbackPolicy: { allowSeekAhead: false, pauseOnRequiredCue: true, requireMediaCompletion: false },
  },
};`;

	const portExample = `const controller = await host.waitForSectionController(5000);

// A host with its own media player registers its own port. It outranks the
// stimulus card's adapter for as long as it is attached.
controller?.attachMediaTimeSource?.(myPlayerPort);
controller?.getTimedMediaProjection?.(); // cues, gate, enforcement, revealed items
controller?.detachMediaTimeSource?.();`;

	const playbackRows = [
		['allowSeekAhead', 'false', 'The learner cannot seek past the furthest position reached, including across a reload.'],
		['pauseOnRequiredCue', 'true', 'Playback pauses when a gate activates.'],
		['requireMediaCompletion', 'false', 'The section is complete only once the media has played to the end.']
	];
</script>

<svelte:head>
	<title>Timed media - PIE Framework</title>
	<meta
		name="description"
		content="Video-cued sections in PIE: a media stimulus whose timeline reveals items and gates playback on answers, with persisted cue state and host-supplied media players."
	/>
</svelte:head>

<div>
	<div class="mb-12">
		<h1 class="text-4xl sm:text-5xl font-bold text-secondary mb-4">Timed media</h1>
		<p class="text-xl text-base-content/70 max-w-4xl">
			A timed-media section pairs a video or audio stimulus with a cue timeline. As the media plays,
			cues reveal items, pause playback until the learner answers, or record that a moment was reached.
			It is a section type, so it renders in the section player layouts you already use.
		</p>
	</div>

	<section class="mb-20 scroll-mt-24" id="overview">
		<h2 class="text-3xl font-bold text-secondary mb-6">How it fits together</h2>

		<Diagram
			name="timed-media-flow"
			width={1028}
			height={548}
			alt="The stimulus passage mounts the video-stimulus element, whose media element feeds a Media Time Source. A host may attach its own port instead. The section controller reads time from the source, evaluates the cue timeline and reveals or gates items in the section player layout, pausing the media at a gate. Cue state is saved in the section session."
		/>

		<div class="grid md:grid-cols-3 gap-6">
			<div class="card bg-base-100 shadow-lg border border-base-300">
				<div class="card-body">
					<h3 class="card-title text-primary">The stimulus</h3>
					<p class="text-base-content/70">
						An ordinary passage with class <code>stimulus</code>. Its content mounts the media, usually
						<code>@pie-element/video-stimulus</code>; its accessibility catalogs carry the transcript and
						signed alternates.
					</p>
				</div>
			</div>
			<div class="card bg-base-100 shadow-lg border border-base-300">
				<div class="card-body">
					<h3 class="card-title text-primary">The timeline</h3>
					<p class="text-base-content/70">
						<code>timedMedia.cues</code> names time ranges and the items each one acts on. Items no cue
						reveals or gates are delivered as usual.
					</p>
				</div>
			</div>
			<div class="card bg-base-100 shadow-lg border border-base-300">
				<div class="card-body">
					<h3 class="card-title text-primary">The layouts</h3>
					<p class="text-base-content/70">
						Splitpane, vertical, tabbed and kernel-host layouts all render it. Without
						<code>sectionType: "timed-media"</code> a section behaves exactly as before.
					</p>
				</div>
			</div>
		</div>
	</section>

	<section class="mb-20 scroll-mt-24" id="authoring">
		<h2 class="text-3xl font-bold text-secondary mb-6">A cued section</h2>
		<p class="text-lg text-base-content/70 mb-4 max-w-4xl">
			At 42.5 seconds the video pauses on <code>q1</code> and resumes only once it is answered
			correctly; at 118 seconds <code>q2</code> appears without stopping playback.
		</p>
		<div class="mb-6">
			<CodeEditor value={sectionExample} language="javascript" readonly={true} height="640px" />
		</div>

		<h3 class="text-2xl font-bold text-primary mb-4" id="cues">Cue activation</h3>
		<div class="overflow-x-auto mb-6">
			<table class="table table-zebra">
				<thead><tr><th>Activation</th><th>When the cue fires</th></tr></thead>
				<tbody>
					<tr>
						<td><code>reveal</code></td>
						<td>Its items appear and stay visible. Reveals never retract, even after a seek backwards.</td>
					</tr>
					<tr>
						<td><code>gate</code></td>
						<td>
							Its items appear and playback pauses until every one satisfies <code>releaseOn</code>, such as
							<code>"correct"</code>. A gate never resumes playback on its own, and seeking past it still
							trips it. <code>onUnknownCorrectness</code> decides what an item that cannot report correctness
							does.
						</td>
					</tr>
					<tr>
						<td><code>metadata</code></td>
						<td>Records that the moment was reached and reveals nothing.</td>
					</tr>
				</tbody>
			</table>
		</div>
		<p class="text-base text-base-content/70 mb-8 max-w-4xl">
			To split must-answer items from optional ones at the same moment, author two cues at one
			timestamp: a gate over the first set and a reveal over the second. A gate on correctness reads
			the result of <ExternalLink href={FORMATIVE}>formative delivery</ExternalLink>, so the section
			needs <code>maxTries: "unlimited"</code>; with a finite budget a learner could exhaust their tries
			and never release playback.
		</p>

		<h3 class="text-2xl font-bold text-primary mb-4" id="playback">Playback policy</h3>
		<div class="overflow-x-auto mb-6">
			<table class="table table-zebra">
				<thead><tr><th>Field</th><th>Default</th><th>Effect</th></tr></thead>
				<tbody>
					{#each playbackRows as [field, def, effect] (field)}
						<tr>
							<td><code>{field}</code></td>
							<td><code>{def}</code></td>
							<td>{effect}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
		<p class="text-base text-base-content/70 max-w-4xl">
			<code>scoringPolicy.strategy</code> (<code>sum-child-outcomes</code>,
			<code>average-child-outcomes</code> or <code>host-defined</code>) is validated and carried with the
			section. PIE derives no aggregate score from it; the host does.
		</p>
	</section>

	<section class="mb-20 scroll-mt-24" id="media-time-source">
		<h2 class="text-3xl font-bold text-secondary mb-6">Media Time Source</h2>
		<p class="text-lg text-base-content/70 mb-4 max-w-4xl">
			The section reaches media only through a Media Time Source: current time, duration, play, pause,
			seek and events, plus two capabilities, <code>canPause</code> and <code>canRestrictSeeking</code>.
			The stimulus card attaches one for the media element its passage mounted. A host with its own
			player, a third-party video service for instance, implements the same interface from
			<code>@pie-players/pie-players-shared/timed-media</code> and attaches it.
		</p>
		<div class="mb-6">
			<CodeEditor value={portExample} language="javascript" readonly={true} height="170px" />
		</div>
		<div class="alert mb-4">
			<span>
				When a port reports <code>canPause: false</code> or <code>canRestrictSeeking: false</code>, the
				matching policy becomes advisory: cues still fire and state is still recorded, the projection
				reports <code>enforcement: "advisory"</code>, and a recoverable <code>timed-media</code> framework
				warning names the policy that cannot be enforced.
			</span>
		</div>
	</section>

	<section class="mb-20 scroll-mt-24" id="session">
		<h2 class="text-3xl font-bold text-secondary mb-6">Session and errors</h2>
		<p class="text-lg text-base-content/70 mb-4 max-w-4xl">
			Cue state persists in the section session as a versioned <code>timedMedia</code> slice: the media
			position, the furthest position reached, whether the media completed, visited and completed cues,
			and the active cue. It hydrates with the rest of the snapshot, so a reload resumes at the same
			gate. A slice with an unknown version is rejected whole. A cued item is mounted and hidden until
			its cue fires, so its session survives seeking.
		</p>
		<p class="text-base text-base-content/70 max-w-4xl">
			Three authoring mistakes fail loudly with a <code>timed-media</code> framework error, after which
			the section delivers as an ordinary section with every item visible: a <code>stimulusRef</code>
			that resolves to nothing, a stimulus that mounts no media, and a correctness gate over an item
			without unlimited tries.
		</p>
	</section>

	<section class="mb-20 scroll-mt-24" id="accessibility">
		<h2 class="text-3xl font-bold text-secondary mb-6">Accessibility</h2>
		<ul class="list-disc pl-6 space-y-2 text-base-content/80 max-w-4xl">
			<li>Cue activations are announced, and focus moves to a gated item when playback pauses on it.</li>
			<li>Captions and the transcript stay available throughout; signed video rides on the stimulus's catalogs.</li>
			<li>
				Read-aloud and media audio never play at once, and the learner's latest action wins: starting
				read-aloud pauses the media, starting the media stops read-aloud. Neither resumes what it silenced.
			</li>
		</ul>
		<p class="text-base text-base-content/70 mt-4 max-w-4xl">
			<a href="{base}/docs/accessibility/" class="link link-primary">Accessibility</a> covers read-aloud
			and catalogs.
		</p>
	</section>

	<section class="mb-20 scroll-mt-24" id="status">
		<h2 class="text-3xl font-bold text-secondary mb-6">Status</h2>
		<p class="text-lg text-base-content/70 mb-4 max-w-4xl">
			The section contract and runtime are implemented. <code>@pie-element/video-stimulus</code> is at
			0.1.x. Still open: an authoring experience for composing cued sections, a QTI serialization (QTI
			has no native cue primitive, so PIE carries it as its own profile), media control styling, a
			fallback when the stimulus fails to play, and scorer and review views.
		</p>
		<p class="text-base text-base-content/70 max-w-4xl">
			<ExternalLink href={CONTRACT}>Timed-media section contract</ExternalLink> ·
			<ExternalLink href={SECTION_README}>Section player README</ExternalLink>
		</p>
	</section>
</div>
