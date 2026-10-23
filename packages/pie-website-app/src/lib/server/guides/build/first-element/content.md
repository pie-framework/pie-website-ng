# Your first interaction

Start with a simple question, such as a short text answer. Use any UI framework that can expose the PIE custom-element contract. The element library includes React and Svelte examples.

First check whether you can [configure an existing element](/elements/), combine elements in an item, or [change the layout](/docs/custom-layouts/).

## Example packages

[Simple Cloze](https://github.com/pie-framework/pie-elements-ng/tree/develop/packages/elements-svelte/simple-cloze) is a small example with delivery, authoring, controller and print modules. For schema examples, see [Multiple Choice](https://github.com/pie-framework/pie-elements-ng/tree/develop/packages/elements-react/multiple-choice) and [Venn Classification](https://github.com/pie-framework/pie-elements-ng/tree/develop/packages/elements-svelte/venn-classification).

Read these packages alongside the [element contract](/docs/reference/element-contract/). The application can use a different framework from the element.

## Declare authored and response data

Keep authored model, editor configuration and learner session separate. IDs tie the authored element, model and response row together; the player supplies those contract keys.

~~~ts
interface ShortAnswerModel {
  id: string;
  element: string;
  prompt: string;
  correctAnswer: string;
}
interface ShortAnswerSession {
  id: string;
  element: string;
  value?: string;
}
~~~

Declare interfaces using the shared types. Export model and session schemas, plus a configuration schema if the element has an editor. Keep defaults in one place and check generated models and sessions against the schemas.

## Keep the controller independent of the UI

The controller derives the delivery model from authored data, session and environment. It can hide answer-bearing fields in a learner view and add feedback in evaluation. Scoring belongs in outcome().

~~~ts
export function outcome(model: ShortAnswerModel, session: ShortAnswerSession) {
  const value = (session.value ?? '').trim().toLowerCase();
  const expected = model.correctAnswer.trim().toLowerCase();
  return {
    score: value.length > 0 && value === expected ? 1 : 0,
    max: 1,
    empty: value.length === 0
  };
}
~~~

The package also needs model(), defaults and validation. Its controller must run without a browser for server scoring. For secure delivery, keep answer keys on the server; removing them from a view model does not remove them from browser memory.

## Implement delivery

Export a custom-element class and accept model and session as properties. The player passes a controller-derived view model; the element does not take a separate environment property.

Write response changes into the session object the player supplied, keeping that reference. Then announce session-changed with complete and component; the raw element event carries no session. Use the shared delivery-event helpers appropriate to the implementation.

Support gather, view and evaluate modes. Setting a model must also announce model-set on the required schedule. The [delivery contract](/docs/reference/element-contract/#delivery-contract) specifies timing and event propagation.

## Implement authoring

An author view accepts model and configuration. Its configuration determines which settings an author can change and which editing controls are offered.

Use the shared model-update event. Include the model ID and element tag, and choose replacement when an edit removes a top-level field. Implement controller validation so the author receives meaningful field errors. The host composes live preview and content persistence.

Read [Simple Cloze's author view](https://github.com/pie-framework/pie-elements-ng/blob/develop/packages/elements-svelte/simple-cloze/src/author/Author.svelte) and the [authoring contract](/docs/reference/element-contract/#authoring-contract).

## Make accessibility part of the interaction

Provide keyboard controls, accessible names, text alternatives for visual states and status feedback. Test that learners can complete the question with assistive technology, as well as running automated scans.

Reuse the project's rich-text editors, settings UI, event helpers, media APIs and theme tokens where useful. Print views and automatic scoring are optional; declare whether the element supports them.

## Load it in an item

Publish classes without registering the authored top-level tag at import time. The player owns registration and version coordination. Map a tag to an exact package version in the item's elements map, provide a model with the same ID as the markup, and test through the actual item player.

Continue with [test and distribute](/build/test-and-distribute/), [schema generation](/docs/content-and-schemas/) and the [element package contract](/docs/reference/element-contract/).
