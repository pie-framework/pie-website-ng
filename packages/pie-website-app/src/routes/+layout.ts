// Enable prerendering for the site so adapter-static emits HTML pages
// for GitHub Pages deployment.
export const prerender = true;

// GitHub Pages serves directories with `index.html`; keeping trailing slashes
// avoids subtle path issues when hosting under a base path like `/pie-website-ng`.
export const trailingSlash = 'always';
