# Embed authoring

Embed the elements' visual editors in an authoring application. PIE handles editing and validation. Your application supplies the item bank, permissions, media storage and publishing workflow.

## Use the same item player

The player's author mode loads each element's authoring view instead of its delivery view. This is separate from the delivery environment's gather, view and evaluate modes.

~~~html
<pie-item-player id="author" mode="author"></pie-item-player>
<pie-item-player id="preview"></pie-item-player>
~~~

Set the author's item config. On model-updated, merge the update into the matching model, or replace it when reset is true. Pass a new config object to the delivery preview. Save the authored model, not the controller's view model.

~~~js
author.addEventListener('model-updated', ({ detail }) => {
  config = {
    ...config,
    models: config.models.map((model) =>
      model.id === detail.update.id
        ? detail.reset ? detail.update : { ...model, ...detail.update }
        : model
    ),
  };
  preview.config = structuredClone(config);
});
~~~

## Configure the editor

The configuration property controls editor labels, settings, rich-text toolbars and element-specific limits. Put editor settings under configuration.authoring to keep them separate from delivery settings.

The most specific key wins: full versioned tag, full package spec, package name, then base element name. [Authoring configuration](/docs/reference/item-player/#authoring-configuration) describes the exact merge.

## Validate before saving

After authoring elements load, validateModels() runs their controller validation and returns hasErrors and validatedModels. The editors receive their field-error maps so the author can correct the content.

~~~js
const result = await author.validateModels();
if (!result.hasErrors) await saveItem(config);
~~~

JSON Schemas check data structure. Controller validation checks rules such as whether a correct answer is defined. Use both before saving content.

## Connect media and content storage

Production authoring supplies all four media hooks: insert image, delete image, insert sound and delete sound. Set authoring-backend="required" to surface missing handlers instead of relying on demo handlers.

Use the optional authoring backend API or your own workflow to load, save and release content. Your CMS enforces permissions and publishing rules.

## Coverage and next steps

The element library lists editor and print support for each type. Match List has no authoring view.

- [Find an element and its supported views](/elements/).
- [Authoring media hooks](/docs/reference/item-player/#authoring-media-hooks).
- [Backend authoring contract](/docs/backend/#authoring-contract).
- [Element model and configuration schemas](/docs/content-and-schemas/).
