# Tools catalog

The toolkit provides reading aids, calculators, measurement, annotation and reference tools. Place tools in a toolbar, then configure learner and program policies. Tools assist learners; interaction elements collect their answers.

## Reading and visual supports

| Capability | What it does | Requirements |
| --- | --- | --- |
| Read-aloud | Speaks visible text, authored spoken alternatives or recordings with coordinated highlights. | Browser voices, or a host synthesis endpoint and provider. |
| Line reader | A movable reading guide. | Section-level placement. |
| Magnifier | Magnifies a region of assessment content. | Eligible tool placement and learner policy. |
| Color scheme | Offers built-in visual palettes through the theme system. | Section/assessment placement and theme participation. |
| Transcript | Displays an authored audio transcript in a content surface. | An eligible authored catalog card; it is not a toolbar button. |
| Sign language | Displays an authored signed-video alternate beside content. | Explicit tool registration, policy grant and authored video. |

## Working with responses

| Capability | What it does |
| --- | --- |
| Answer eliminator | Helps eliminate choices without changing the scored response. |
| Annotation | Highlights and underlines selected text; shares highlight infrastructure with read-aloud. |
| Calculator | Basic, scientific or graphing calculator through a provider contract. |
| Ruler and protractor | Draggable measurement tools. |

## References

Other tools include a coordinate graph, periodic table, English and Spanish dictionaries and picture dictionaries. Your application configures dictionary services and languages. Only offer tools whose services and content are available in your deployment.

## Choose a calculator provider

Desmos is the default and requires credentials from your application. GeoGebra is also included. You can register the bundled open-source Cortex calculator, which needs no runtime CDN or API key.

See the [provider guide](/docs/providers/) for setup and settings. Providers have their own licenses and deployment terms.

## State and policy

Tool preferences, annotations and eliminations are stored separately from scored responses. Your application decides whether to save them.

A profile support does not place a tool. The toolbar's level and content relevance also matter. See [placement and profiles](/docs/tool-policy/) and the [registry reference](/docs/reference/tool-registry/) for supported scopes, activation models and content dependencies.

## Extend the set

Register a custom tool with a loader, accessible interface, scope and cleanup. You can also add toolbar actions without creating an interaction element.

See [extend tools and providers](/integrate/extending/).
