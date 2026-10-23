## JavaScript Runtime Contract

### Model, Session, and Environment

Every element consumes a model, a session, and an environment object.

- The model is authored item data. It must include a stable `id` and an `element` tag such as `multiple-choice`: the key under which the item config's `elements` map names the element package. Players match models to elements by that tag.
- The session is learner response data. Its shape is element-specific. The player owns the session object it sets, and the element writes each change into that object, as the Delivery Contract below sets out.
- The environment describes mode and role. Supported modes are `gather`, `view`, and `evaluate`; supported roles are `student` and `instructor`. The authoring view is a separate custom element, described under the Authoring Contract.

Element-specific model and session fields are part of that element's public contract once published, and the package's [JSON Schemas](#json-schemas) describe them. Breaking shape changes require normal semver treatment.

### Controller Module

Controller-bearing elements expose their controller at `@pie-element/<name>/controller`.

The required controller entry point is:

- `model(model, session, env, updateSession?)`: returns the view model used by delivery, author, or print rendering. `updateSession(id, element, properties)` persists `properties`, such as a drawn choice order, into the stored session; `PieUpdateSession` in `@pie-element/shared-types` types it.

Controller modules may also expose these helpers when the element supports the capability:

- `outcome(model, session, env)`: returns scoring output.
- `createDefaultModel(partial?)`: returns a default authoring model.
- `validate(model, config?)`: returns authoring validation errors.
- `createCorrectResponseSession(model, env?)`: returns a correct-answer session.

When a helper is exported, its name and behavior are public API. Do not rename or remove it without a breaking release.

### Custom Element Runtime

Published element view modules export custom element classes. They must not
register their authored top-level PIE tag at package import time. Runtime
registration of authored item tags belongs to the player or host.

If a package renders private child custom elements inside its own implementation,
the package's browser artifact must define those private child tags itself before
the first render depends on them. Private child tags are not authored content
dependencies and players must not discover them from package dependencies, DOM
snippets, or element-specific knowledge.

Private child tag names are global custom element names, so packages must scope
them by the owning package version (for example with a `--version-<encoded>`
suffix), use the same scoped name for registration and rendering, and keep
registration idempotent with `customElements.get(...)` guards. This preserves
side-by-side loading of multiple package versions and mirrors the IIFE behavior
where private child implementations are resolved from the owning package's
dependency tree at build time.

Players set data via properties, not attributes:

- `element.model = model`
- `element.session = session`

Elements declare no `env` property. The environment reaches an element through its controller: `model(model, session, env)` returns the view model the player sets as `element.model`.

Delivery elements announce session changes as the Delivery Contract below sets out, and author elements announce model changes as the Authoring Contract sets out.

### Delivery Contract

The element writes each learner change into the session object the player set, keeping its reference, and then dispatches `session-changed` (`SessionChangedEvent` from `@pie-element/shared-player-events`). Players read the response off their own object: `pie-player` holds its entry in the host's `session.data`, and `pie-item-player` forwards the array it holds, so an element that only replaces its own reference loses the response.

- `detail` is `{ complete, component }`: whether the session is a complete response, and the tag the element is registered under. It carries no session.
- The event bubbles and is composed.
- Setting `model` dispatches `model-set` (`ModelSetEvent`), `detail` `{ complete, component, hasModel }`, a microtask later, so `complete` counts a session the player sets in the same task.
- The item player stops the element's `session-changed` and re-emits one from its own host, adding `detail.session` with the session container it holds.

Svelte elements get this from `defineDeliveryElement` in `@pie-lib/delivery-events-svelte`; React elements mutate the session they were given.

### Authoring Contract

A player registers an element's author view under `<tag>-config` and sets two properties on it, `model` and then `configuration`. The element declares both; an undeclared property lands on the instance, where the element never reads it.

Each edit dispatches one `ModelUpdatedEvent` from `@pie-element/shared-configure-events`, on the author element itself:

- `update` is the whole model, `id` and `element` included. The item player matches the stored model by `id` and drops an update without one; legacy `pie-author` matches by `id` and `element`.
- `reset: true` tells the item player to replace the stored model and `reset: false` to merge `update` over it, so an edit that removes a top-level field sends `reset: true`. Legacy `pie-author` ignores `reset` and always merges, so it keeps a removed field.
- The event bubbles. The item player listens on its root in the capture phase, legacy `pie-author` on its host in the bubble phase.
- It is a `ModelUpdatedEvent` instance: `pie-author` reads `event.update`, the item player `event.detail`, which carries `update` and `reset`.
- `model`, where the element exposes it for reading, holds the edit before the event fires and keeps it when the element is detached and re-attached; `@pie-element/element-player` reads it in its handler. A Svelte custom element remounts from the value last assigned to its property, so a Svelte author assigns each edit through `$host().model`.

`configuration` is the host's customization of the authoring view, merged over the element's defaults. Its entries follow `@pie-lib/config-ui`: an entry's `label` names its field in the design view and its setting in the settings panel, `settings: true` offers that setting, and `settingsPanelDisabled: true` hides the panel. Svelte author elements build the panel from `@pie-lib/config-ui-svelte`.

Layout, styling and the settings an element defines are the element's choice.

`@pie-element/shared-test-utils` checks the property and event rules with `assertAuthorElementProperties(tag)` and `assertAuthorModelUpdate({ tag, model, configuration, edit })`. Each Svelte author element's tests run them.
