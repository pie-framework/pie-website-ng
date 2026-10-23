## Timed media

Set `sectionType: "timed-media"` and a `timedMedia` block, and the section's cue
timeline decides when its items are delivered:

```ts
const section: AssessmentSection = {
  identifier: "water-cycle",
  sectionType: "timed-media",
  // A correctness gate needs unlimited Tries; see below.
  formative: { enabled: true, maxTries: "unlimited", feedback: "correctness" },
  rubricBlocks: [
    {
      identifier: "video-stimulus-1",
      class: "stimulus",
      view: ["candidate"],
      // An ordinary passage. Its config mounts the media element — a PIE element,
      // or authored `<video>` markup, whose `<track>` carries the captions — and
      // its accessibility catalogs carry the transcript and signed alternates.
      passage: videoPassage,
    },
  ],
  assessmentItemRefs: [{ identifier: "q1", item }, { identifier: "q2", item }],
  timedMedia: {
    stimulusRef: "video-stimulus-1",
    cues: [
      { identifier: "c1", range: { startSeconds: 4 }, itemRefs: ["q1"], policy: { activation: "reveal" } },
      {
        identifier: "c2",
        range: { startSeconds: 10 },
        itemRefs: ["q2"],
        policy: { activation: "gate", releaseOn: "correct", onUnknownCorrectness: "release" },
      },
    ],
    playbackPolicy: { allowSeekAhead: false, pauseOnRequiredCue: true, requireMediaCompletion: false },
  },
};
```

Every item a gate names must satisfy its `releaseOn`. To split must-answer items
from optional ones, author two cues at the same timestamp: a gate over the first
set and a reveal over the second. Both activate in the same pass, the reveal
completes at once, and only the gate holds playback.

Without `sectionType`, delivery is unchanged: no projection, no session slice,
no cue behavior. An item no `reveal` or `gate` cue names is delivered normally,
including one a `metadata` cue names, since metadata records state and reveals
nothing. A cued item is mounted and hidden until its cue fires, so its session
and shell registration survive a seek backwards.

The section reaches media only through a **Media Time Source**. The stimulus
card finds the media element its passage mounted and registers a native adapter;
a host with its own player registers its own port, which outranks the card's
adapter for as long as it is attached:

```ts
const controller = await host.waitForSectionController(5000);
// No `renderableId`: a host asserts its own port. A renderable's adapter names
// itself, and is ignored unless it is the resolved stimulus.
controller?.attachMediaTimeSource?.(myThirdPartyPort);
controller?.detachMediaTimeSource?.();
controller?.getTimedMediaProjection?.(); // cues, gate, enforcement, revealed items
// One half of the read-aloud handoff. `false` means the port cannot pause, and
// the overlap stands; the accommodation is not withheld.
controller?.pauseMediaForCompetingAudio?.();
```

Read-aloud and media audio never run at once, and the action the learner just
took wins: starting read-aloud pauses media, starting media pauses read-aloud.
The section supplies both halves, the method above and
`timed-media-audio-started`, and the toolkit arbitrates between them, because
only the toolkit holds both the text-to-speech service and the section. Neither
direction resumes what it silenced.

Where the port reports `canPause: false` or `canRestrictSeeking: false`, the
matching policy degrades to **advisory**: cues still fire, state is still
recorded, the projection says `enforcement: "advisory"`, and a recoverable
`timed-media` framework warning names the policy that can no longer be
enforced.

Three authoring mistakes fail loudly: a `stimulusRef` that resolves to no
renderable in the section; a gate on correctness over an item without unlimited
Tries, where a learner who spent a finite budget could never release playback
again; and a `stimulusRef` that resolves to a renderable which mounts no media,
reported once the section's content has loaded and no time source has attached.
Each reports a `timed-media` framework error, after which the section delivers
as an ordinary section with every item visible.

Cue state persists inside `SectionControllerSessionState.timedMedia` and
hydrates with the rest of the snapshot, including the furthest position reached,
which `allowSeekAhead: false` clamps against across a reload. The
[timed-media section contract](../../docs/prds/timed-media-section-contract.md)
holds the contract and its decision record.
