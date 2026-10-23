# Test and distribute

Test the element through a player as well as in its component demo. Check data, events, views and the published package against the element contract.

## Verify the complete interaction

- Render a valid model and test meaningful invalid authoring states.
- Enter, change, clear and restore a response.
- Exercise gather, view and evaluate for learner and instructor roles.
- Verify partial credit, empty responses and correct-answer sessions where supported.
- Test author edits, replacement/merge events, validation and preview.
- Exercise print only when the package declares a print view.
- Check keyboard task completion, focus, names, feedback, nonvisual meaning, math/media alternatives and responsive layouts.

Use item-player integration tests and focused controller tests. The [accessibility guide](/docs/accessibility/) describes coverage and remaining manual testing.

## Publish explicit data contracts

Each package declares model, session and configuration types. Generated JSON Schemas describe the published data, and the docs generator reads those schemas and defaults.

Schemas check data structure; the controller's validate() checks authoring rules. Validate default models, sample content and generated sessions against their schemas.

See [items and schemas](/docs/content-and-schemas/).

## Preserve player-controlled registration

View modules export custom-element classes. They do not register their authored top-level tag at import time. The player registers versioned tags so two element versions can coexist.

Do not rewrite contract IDs or remove a version suffix. Private child tags also need a version-safe registration strategy. Published entries point to built artifacts rather than requiring consumers to compile your source.

## Declare supported views and runtime strategies

The common package surface includes delivery, controller, author/configure when present, optional print and generated schemas. Browser ESM uses static browser builds; IIFE builders use package exports and required compatibility shims. Preloaded delivery uses the same exported classes.

List supported views and loading strategies. Test the packed package with each, including shared browser dependencies.

The [normative packaging contract](/docs/reference/element-contract/#npm-packaging-contract) specifies exact files and exports.

## Repository checks

In pie-elements-ng, the aggregate contract verifier checks publish surface, browser ESM policy, shims, runtime support, schemas and sourcemaps:

~~~sh
bun run verify:element-contracts
bun run lint:all
bun run build
bun run test
~~~

Run the relevant browser and accessibility suites, and follow the repository's release instructions.

## Versioning

Elements version independently. Model and session fields, helpers and exports are public APIs. Pin each item to the exact element versions used to test its content.

The player suite has a separate lockstep policy. [Versions and upgrades](/docs/versioning/) explains how consumers manage the two.
