# PIE Website

This is the PIE (Portable Interactions and Elements) Framework documentation website project. PIE is an open-source framework for creating, sharing, and delivering interactive assessment items in learning environments.

## Development

Run from the repository root with Bun:

```sh
bun install
bun run dev
bun run check
bun run build
bun run verify:site
```

The production output is `packages/pie-website-app/build/`. It is a static site;
builds do not need sibling checkouts or a running PIE service. Live examples load
the explicitly pinned players and element packages from the public CDN/bundle
host. They need network access when started.

## Content and navigation

The site has two audience entrances: **Integrate PIE** and **Build interactions**.
**Explore** contains working examples; **Docs** holds the shared guides and API
reference. QTI has a small related-project destination.

- `packages/pie-website-app/src/lib/data/site.ts` owns page titles, summaries,
  groups and source-document mappings used by navigation and search.
- `src/lib/server/guides/` inside the app holds checked-in Markdown. Pages with a
  `source` in the registry are refreshed from that source; other guides are
  maintained here. Markdown is compiled on the server during prerendering.
- `src/lib/data/elements.ts` owns the element catalog and exact live-example
  versions. The app's exact `@pie-players/pie-theme` dependency pins the lockstep
  player suite; `src/lib/versions.ts` derives the CDN and example versions from it.
- `src/lib/data/examples.ts` owns the curated experience gallery.
- `src/lib/data/legacy-routes.ts` preserves the previous documentation entry
  points and important fragments. Keep these routes when moving content.

The existing theme lives in `src/app.css`. Diagrams remain in
`static/images/diagrams/`; `DiagramPlaceholder.svelte` marks new illustrations
for the separate diagram/style pass.

## Refresh repository documentation and examples

With `pie-players` and `pie-elements-ng` checked out beside this repository:

```sh
bun run sync:docs
bun run sync:examples
bun run check
bun run build
bun run verify:site
```

`sync:docs` copies selected source documents and referenced local images. It
records the source commit and file hash in `src/lib/server/guide-sources.json`.
Review the resulting content changes before committing; a source document may
describe newer APIs than the live example's pin.

`sync:examples` selects public element demo fixtures, copies their local media,
and generates field references from each element's `dist/schemas/`. Build those
schema artifacts in `pie-elements-ng` before refreshing. The reference states
its own package version separately from the live example. The image-cloze fixture
keeps the source's two-zone interaction with local media in place of legacy private
image URLs. The graphing-solution-set prompt uses valid MathML in place of the
source fixture's plain text inside a `math` tag. The silent water-cycle
clip is reused from the generated fixture at
`pie-players/apps/section-demos/static/demo-assets/timed-media/water-cycle-lesson.webm`;
the example provides a text alternative.

Commit the generated Markdown, JSON, schemas and copied assets. Ordinary CI and
deployment use those snapshots, without accessing sibling repositories. The
static build checks internal links and fragments; `verify:site` also checks
canonical pages, legacy redirect destinations and local media.

## Accessibility verification

Build the site, then run `bun run audit:a11y` and open the loopback URL it prints.
This serves an instrumented copy of the real static build with a **Run WCAG
audit** button. It uses axe-core's WCAG 2.0/2.1 A and AA, WCAG 2.2 AA and
best-practice rules, including open shadow roots. The report keeps violations
separate from checks requiring manual review. No audit UI or axe script is
included in the production artifact.

The **Text spacing** button applies the WCAG 1.4.12 spacing values for reflow
checks; **200% text** doubles computed font sizes in the testing copy. Also check
both themes, 320px layouts, keyboard focus and scrolling,
mobile navigation, and live delivery, review, authoring and tool-dialog states.
Automated checks do not establish conformance or replace screen-reader testing.
Current evidence and outstanding findings are recorded in `design-qa.md`; the
site's public accessibility status is on `/status/#website-accessibility`.

## SEO and hosting

Page templates supply their title and description to `Seo.svelte`, which renders
search metadata, Open Graph/Twitter tags, canonical URLs and JSON-LD. The site
origin and shared metadata helpers live in `src/lib/seo.ts` inside the app.
Home includes WebSite and Organization data; content pages include page and
breadcrumb data. Internal search carries `noindex, follow` and is omitted from
the sitemap. It remains crawlable so search engines can read that directive.

The prerendered `/sitemap.xml` is built from the navigation, element and example
registries. `/robots.txt` advertises it. The build then runs
`scripts/build-social-images.ts` to create a 1200×630 PNG for each page from its
rendered title and description. These files are written to `build/social/`;
they are available in the production build and preview, rather than the Vite
development server. Sharp is a build dependency. The checked-in Newsreader and
Inter fonts under `scripts/assets/social-fonts/` include their OFL licenses and
are used only by the image generator.

The existing deployment workflow targets **GitHub Pages**, which serves the
static output and does not run custom HTTP redirect rules. Legacy URLs therefore
include an immediate HTML meta refresh, a canonical link and a visible fallback
link. A small inline script runs before hydration to route known fragments to
their replacement pages and preserve query strings; client navigation uses the
same resolver. These are HTML redirects, not HTTP 301 responses. Google documents
[instant meta refresh as a permanent redirect fallback](https://developers.google.com/search/docs/crawling-indexing/301-redirects).
If hosting moves to a server or edge service with HTTP redirects, use
`src/lib/data/legacy-routes.ts` as the mapping authority, and retain the fragment
handling because fragments are not sent to servers.

After deployment, verify the production sitemap and metadata, submit
`https://pie-framework.org/sitemap.xml` in the existing Search Console property,
and inspect representative home, guide and element URLs. Search Console access
and real-user Core Web Vitals require the live site; local build checks do not
establish indexing or field performance. No Search Console verification token or
analytics identifier is embedded in this repository.
