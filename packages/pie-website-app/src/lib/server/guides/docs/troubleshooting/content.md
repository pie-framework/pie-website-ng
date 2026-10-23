# Troubleshooting

Check which part failed: the player, an element package, a tool or an external service. Each loads separately.

## Content does not load

- Check player-error or framework-error and whether the error is recoverable.
- Confirm every element package/version exists and supports the selected delivery or authoring view.
- Under preloaded delivery, register the elements before mounting the player.
- Check CSP, resource origins and the bundle host or browser-build URL.
- Keep the player suite on one exact version.

Use [loading strategies](/docs/loading/) and the [instrumentation guide](/docs/instrumentation/) to inspect the stage and failed resource.

## A tool is missing

Check placement first, then host gates, learner/program policy, item scope, relevance and required authored content. A granted tool cannot appear on a toolbar where it was never placed.

Confirm its loader and provider are available. Desmos without an API key cannot initialize. A sign-language support with no signed-video catalog has no content to display.

Use the PNP debugger or the [policy reference](/docs/tool-policy/) to find the deciding rule.

## A response did not persist

Save the player session, not the element's raw event. Ignore metadata-only events whose session is null. Commit pending responses before removing a standalone player.

Ensure the save is scoped to the correct learner and attempt, and restore session before section on a new section runtime. Device storage is not server persistence.

See [save and resume](/docs/sessions/).

## Read-aloud uses unexpected text or language

Check the content language as well as the interface locale, then the catalog reference, card language and lookup order. Browser speech and server SSML support differ. Browser languages depend on the device's installed voices.

See [read-aloud](/docs/read-aloud/) and [accessible content alternatives](/docs/accessibility-catalogs/).

## Math or styling differs

Check the loading strategy's math assets and the host's CSP. Keep one compatible MathJax runtime on the page. For styling, distinguish registered PIE tokens, the active color scheme and host CSS.

See [math rendering](/docs/math/) and [themes](/docs/theming/).

## A score or feedback differs

Browser scoring returns per-element outcomes. Host item aggregation, EBSR's scoring rule, partial-credit settings and rubric/manual scoring have different contracts. Hosted players load no browser controllers; current formative checking needs those controllers.

See [scoring and rubrics](/docs/scoring/) and [practice and feedback](/integrate/formative/).
