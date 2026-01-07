# PIE Framework Website

The official website for the PIE (Portable Interactions and Elements) Framework.

## Tech Stack

- **SvelteKit** (v2) - Static site generation with Svelte 5
- **Tailwind CSS** (v4) - Utility-first CSS framework
- **DaisyUI** (v5) - Component library with custom PIE theme
- **Bun** - Fast JavaScript runtime and package manager

## Development

```bash
# Install dependencies
bun install

# Start dev server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview
```

## Project Structure

```
src/
├── routes/          # Pages and layouts
├── lib/             # Shared components and utilities
├── app.css          # Global styles (Tailwind directives)
└── app.html         # HTML template

static/              # Static assets
reference/           # Planning docs (in parent directory)
```

## Deployment

The site is built as a static site using `@sveltejs/adapter-static` and can be deployed to any static hosting service:

- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages

## Custom PIE Theme

The site uses a custom DaisyUI theme with PIE brand colors:

- **Primary (#E84A27)** - PIE orange for CTAs and branding
- **Secondary (#1E3A5F)** - Deep navy for headers and contrast
- **Accent (#0D9488)** - Teal for highlights and success states

See `tailwind.config.js` for the complete theme configuration.

## License

Apache 2.0
