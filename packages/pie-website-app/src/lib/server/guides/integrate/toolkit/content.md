# Assessment toolkit

The assessment toolkit manages learner tools, accommodation policies, read-aloud and highlighting. Section players include it. You can also use it with individual item players in a custom layout.

## Integration options

| Assembly | What you get |
| --- | --- |
| Item player alone | The interaction, authoring/evaluation views and response events. |
| Toolkit around an item | A coordinator, an item scope and a toolbar in your layout. |
| Section player | Coordinated passages and items, layouts, toolbars and section session state. |
| Host assessment shell | Several sections with your navigation, timing, persistence and submission policy. |

Your application supplies accounts, an item bank and response storage.

## A toolkit around one item

The item scope identifies the content its toolbar acts on. The item player manages the response session.

~~~html
<pie-assessment-toolkit>
  <pie-item-scope item-id="question-1">
    <pie-item-toolbar></pie-item-toolbar>
    <div data-region="content">
      <pie-item-player></pie-item-player>
    </div>
  </pie-item-scope>
</pie-assessment-toolkit>
~~~

Import the toolkit registration entries and the item player. Create a tool registry, set the toolkit's tools and assessment properties, set the scope's item, then mount the tree. The [standalone-item example](/docs/reference/toolkit/#without-a-section-player) shows the imports and setup order.

## Tool placement and policy

Place tools at the item, passage or section level. Policy then determines which are available to the learner. A profile grant keeps a placed tool available even when the content would otherwise filter it out. It cannot add a tool that has no placement.

Host gates apply before the policy ladder. On the ladder the first matching rule wins: district block, administration withdrawal, item restriction, profile prohibition, administration grant, item requirement, district requirement, then profile support.

Item restrictions and requirements apply within that item's scope. See the [policy guide](/docs/tool-policy/) for scopes, diagnostics and tool parameters.

## Shared services

- The coordinator owns initialization, service lifetime and cleanup.
- Tool coordination manages visibility, layering and scoped tool state.
- Read-aloud resolves authored alternatives, controls a provider and coordinates highlights.
- Annotation and speech highlighting share infrastructure.
- Accessibility catalogs resolve content alternatives by owner and language.
- Tool state is separate from responses and is never scored.

Supply your own coordinator to configure services or persistence hooks before a section starts. Your application must configure and dispose of that coordinator.

## Next steps

- [Browse the tools](/docs/tools/).
- [Choose providers and compose the registry](/docs/providers/).
- [Configure learner profiles](/docs/tool-policy/).
- [Use authored accessibility alternatives](/docs/accessibility-catalogs/).
- [Read the coordinator and service reference](/docs/reference/toolkit/).
