import { SITE_URL } from '$lib/seo';
import { SITE_PAGES } from '$lib/data/site';
import { ELEMENTS } from '$lib/data/elements';
import { EXPERIENCES } from '$lib/data/examples';

export const prerender = true;

export function GET() {
	// Search and old redirect URLs are deliberately absent. No synthetic lastmod
	// dates: a rebuild does not mean that every document's content has changed.
	const paths = [...new Set([
		'/', ...SITE_PAGES.map((page) => page.path),
		...ELEMENTS.map((element) => '/elements/' + element.name + '/'),
		...EXPERIENCES.map((experience) => '/explore/' + experience.slug + '/')
	])].sort();
	return new Response('<?xml version="1.0" encoding="UTF-8"?>\n'
		+ '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
		+ paths.map((path) => '\t<url><loc>' + SITE_URL + path + '</loc></url>').join('\n')
		+ '\n</urlset>\n', { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
