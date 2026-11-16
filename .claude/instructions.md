# PIE Website - Project Instructions

The documentation site for the PIE (Portable Interactions and Elements) framework, served at
`https://pie-framework.org/` from GitHub Pages. Every route is prerendered; live examples load pinned
PIE players and elements from the public CDN in the browser. The [repository README](../README.md)
owns commands, content ownership, documentation and example refreshes, accessibility verification,
SEO and hosting; this file covers the conventions code changes must follow.

## Technology Stack

- **Runtime**: Bun for installs and scripts; Vite runs on Node.js 22.17+
- **Framework**: SvelteKit 3.2+ with Svelte 5.57+
- **Build**: Vite 8.3+ (static site generation)
- **Styling**: TailwindCSS 4.3+ with DaisyUI 5.8+
- **Code examples**: TipTap 3.34+ with code highlighting (lowlight)
- **Type Checking**: TypeScript 6 strict mode + svelte-check

TypeScript stays on 6: SvelteKit and svelte-check declare `^6`, and `svelte-check --tsgo` (TypeScript 7)
passes components whose markup fails to parse.

## Repository Layout

```text
pie-website-ng/
├── packages/pie-website-app/      # The SvelteKit app (@pie-website/app)
│   ├── src/routes/                # Pages: integrate, build, explore, elements, docs, qti, status, search
│   ├── src/lib/components/        # Shared components and live demos (components/demos/)
│   ├── src/lib/data/              # Site registries: navigation, elements, examples, legacy routes
│   ├── src/lib/server/guides/     # Checked-in Markdown guides, compiled during prerendering
│   ├── src/lib/versions.ts        # CDN and example versions, derived from the player pin
│   ├── src/app.css                # Tailwind, DaisyUI and the light and dark themes
│   ├── static/                    # Images, diagrams, demo media, CNAME
│   └── vite.config.ts             # Vite and SvelteKit configuration (adapter, prerender)
├── scripts/                       # Docs and example sync, social images, accessibility audit
└── tests/site.test.ts             # verify:site checks against the static build
```

## Code Conventions

- **Imports**: app modules are imported through the `#lib/*` subpath import in the app's
  `package.json`, with the file extension: `#lib/components/Seo.svelte`, `#lib/data/site.ts`.
  SvelteKit 3 has no `$lib` alias.
- **Configuration**: SvelteKit options go in `sveltekit({...})` in `vite.config.ts`; SvelteKit 3 refuses
  to start when a `svelte.config.js` exists.
- **Links and assets**: plain root-relative paths with a trailing slash for pages (`/docs/theming/`),
  since the site is served from the domain root. `trailingSlash: 'always'` makes each page a directory
  `index.html` for GitHub Pages. The prerender fails on a broken internal link or a missing fragment id.
- **Svelte 5 runes**: `$state`, `$derived`, `$effect` and `$props`; no stores or `$:` statements.
- **Code examples**: source code shown on a page lives in a `src/lib/data/*-examples.ts` module, because
  Vite's dependency scan reads `import` lines in a Svelte script as imports even inside strings.
- **Player versions**: the exact `@pie-players/pie-theme` dependency pins the lockstep player suite, and
  `versions.ts` derives every CDN URL from it. Never hard-code a player version elsewhere.
- **Moved or renamed pages**: keep the old URL in `src/lib/data/legacy-routes.ts`, including important
  fragments; GitHub Pages has no HTTP redirects.
- **Synced guides**: a guide with a `source` in `site.ts` is overwritten by `sync:docs`. Change it in the
  source repository (`pie-players` or `pie-elements-ng`) and refresh.
- **Theme**: `data-theme="light"` or `"dark"` on `<html>`, remembered in `localStorage` under `theme`.
  Site tokens and both themes live in `src/app.css`.

## Verification

There is no CI on pull requests. `deploy.yml` runs check, build and `verify:site` on push to `master`
and then deploys, so run them before opening a PR:

```bash
bun run check
bun run build
bun run verify:site
```

For changes users see or operate, also run `bun run audit:a11y` against the build, as the README
describes.
