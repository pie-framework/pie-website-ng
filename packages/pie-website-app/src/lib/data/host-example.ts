/**
 * The canonical host example, matching pie-players' docs/getting-started.md:
 * one multiple-choice item rendered by <pie-item-player>, with its response
 * saved from `session-changed`. Every page and the live demo use this item.
 */
import { ITEM_PLAYER_CDN_URL, elementSpec } from '$lib/versions';

export const EXAMPLE_MODEL = {
	id: 'q1',
	element: 'multiple-choice',
	prompt: 'Which city is the capital of France?',
	choiceMode: 'radio',
	choices: [
		{ label: 'Paris', value: 'paris', correct: true },
		{ label: 'London', value: 'london' },
		{ label: 'Madrid', value: 'madrid' }
	]
};

export const EXAMPLE_MARKUP = '<multiple-choice id="q1"></multiple-choice>';

export function exampleConfig() {
	return {
		elements: { 'multiple-choice': elementSpec('multiple-choice') },
		models: [structuredClone(EXAMPLE_MODEL)],
		markup: EXAMPLE_MARKUP
	};
}

export const EXAMPLE_ENV = { mode: 'gather', role: 'student' } as const;

export const EXAMPLE_SESSION = { id: 'session-1', data: [] as unknown[] };

export const SCRIPT_TAG = `<script type="module" src="${ITEM_PLAYER_CDN_URL}"></script>`;

export const HOST_EXAMPLE_HTML = `${SCRIPT_TAG}

<pie-item-player id="player"></pie-item-player>

<script type="module">
  const player = document.getElementById("player");

  player.config = {
    elements: { "multiple-choice": "${elementSpec('multiple-choice')}" },
    models: [
      {
        id: "q1",
        element: "multiple-choice",
        prompt: "Which city is the capital of France?",
        choiceMode: "radio",
        choices: [
          { label: "Paris", value: "paris", correct: true },
          { label: "London", value: "london" },
          { label: "Madrid", value: "madrid" },
        ],
      },
    ],
    markup: '<multiple-choice id="q1"></multiple-choice>',
  };
  player.env = { mode: "gather", role: "student" };
  player.session = { id: "session-1", data: [] };
</script>`;

export const SESSION_LISTENER_JS = `player.addEventListener("session-changed", (event) => {
  const { session } = event.detail;
  if (session) saveSession(session);
});`;

export const ELEMENTS_MAP_JSON = `{
  "multiple-choice": "${elementSpec('multiple-choice')}"
}`;

export const MODELS_JSON = JSON.stringify([EXAMPLE_MODEL], null, 2);
