// Prerender every page so adapter-static emits HTML for GitHub Pages.
export const prerender = true;

// GitHub Pages serves each directory's `index.html`; trailing slashes keep
// relative asset and link paths resolving against that directory.
export const trailingSlash = 'always';
