# PIE Website NG - Project Instructions

## Project Context

**PIE Website NG** is the modern documentation and interactive playground website for the PIE (Portable Interactions and Elements) framework. It serves as the central hub for PIE framework documentation, live demos, and developer integration guides.

**Critical Requirements**:

- **Bun runtime**: Node.js is supported but Bun is primary
- **Static site generation**: All routes pre-rendered via SvelteKit adapter-static
- **Svelte 5 with runes**: Modern reactive patterns required
- **PIE framework integration**: Dynamic loading of PIE players from CDN
- **Responsive design**: Mobile-first with DaisyUI components

## Technology Stack

- **Runtime**: Bun (Node.js 20+ also supported)
- **Framework**: SvelteKit 2.49+ with Svelte 5.46+
- **Build**: Vite 7.3+ (static site generation)
- **Styling**: TailwindCSS 4.1+ with DaisyUI 5.5+
- **Markdown**: mdsvex 0.12+ for documentation pages
- **Rich Text**: TipTap 3.15+ with code highlighting (lowlight)
- **Code Editor**: Monaco Editor 0.55+ for playground
- **Type Checking**: TypeScript 5.9+ strict mode + svelte-check

## Monorepo Structure

```text
pie-website-ng/
├── packages/
│   └── @pie-website/app/          # Main SvelteKit application
│       ├── src/
│       │   ├── routes/           # SvelteKit file-based routing
│       │   │   ├── +page.svelte  # Homepage
│       │   │   ├── docs/         # Documentation pages
│       │   │   ├── blog/         # Blog (mdsvex)
│       │   │   └── playground/   # Interactive playground
│       │   └── lib/
│       │       ├── components/   # Shared components
│       │       ├── stores/       # Svelte stores (localStorage)
│       │       └── playground-samples.ts  # PIE samples
│       └── static/               # Static assets
└── reference/                    # Planning docs & specs
```

## Code Quality Standards

**After completing each feature or fix**:

1. Run Biome with auto-fix: `bun run lint:fix` or `npx @biomejs/biome check --write .`
2. Run TypeScript type checking: `bunx tsc --noEmit`
3. Run Svelte type checking: `bunx svelte-check --workspace packages/components`
4. Fix all errors and warnings before marking the task as complete

These checks ensure:

- Code follows project style standards
- No type errors are introduced
- Svelte components are valid and type-safe
- Changes don't break existing functionality

**Before any merge request**:

1. TypeScript compilation passes: `bun run check`
2. Svelte components validated: `svelte-check`
3. Build succeeds: `bun run build`
4. No build warnings or errors
5. Responsive design verified (mobile + desktop)

## PIE Framework Integration

### Dynamic Player Loading

- PIE players loaded from CDN: `https://cdn.jsdelivr.net/npm/@pie-framework/`
- Script injection via `customElements.whenDefined()`
- Web components registered dynamically
- Communication via custom element APIs

### Playground Architecture

- **URL-based state**: `/playground/[sample]` for shareable links
- **localStorage persistence**: Saves user edits automatically
- **Dual-pane editor**: Player view + JSON source editor
- **Sample categories**: Multiple Choice, Math, Drag & Drop, etc.
- **Real-time validation**: JSON syntax checking

## Build System

- **Vite**: Primary build tool with SvelteKit integration
- **Static adapter**: Pre-renders all routes (`adapter-static`)
- **mdsvex**: Markdown preprocessing for documentation
- **Output**: `build/` directory for static hosting

**Build commands**:

```bash
bun run dev          # Development server
bun run build        # Production build (static site)
bun run preview      # Preview built site
bun run check        # Type checking
```

## Special Patterns

### Svelte 5 Runes

Use modern Svelte 5 patterns:

- `$state()` for reactive variables
- `$derived()` for computed values
- `$effect()` for side effects
- No `$:` reactive statements needed

### State Management

- **Playground store** (`lib/stores/playground.ts`):
  - Manages PIE item configuration
  - Saved items list with localStorage
  - Player mode (`gather`, `view`, `evaluate`)
  - User role (`student`, `instructor`)
- Auto-persistence via store subscriptions

### Theme System

- **DaisyUI themes**: 30+ built-in themes
- **Custom "pie" theme** with brand colors:
  - Primary: #E84A27 (PIE orange)
  - Secondary: #1E3A5F (Deep navy)
  - Accent: #0D9488 (Teal)
- Theme selector with localStorage persistence

### Documentation

- **mdsvex**: Write documentation in Markdown
- Combine Markdown with Svelte components
- Automatic syntax highlighting for code blocks

### Responsive Design

- Mobile-first DaisyUI components
- Responsive navigation with mobile menu
- Tailwind breakpoints (lg, xl, etc.)

## SEO & Performance

- **Pre-rendered routes**: All pages generated at build time
- **Dynamic sitemap**: Generated via `/sitemap.xml/+server.ts`
- **Semantic HTML**: Proper heading hierarchy
- **Structured data**: JSON-LD for SEO

## Deployment

**Static site output** can be deployed to:

- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages
- Any static hosting service

No server required at runtime - pure static HTML/CSS/JS.

## Current Work Focus

The website serves as the primary documentation hub for PIE framework. Focus on maintaining clear documentation, working playground examples, and responsive design across all devices.
