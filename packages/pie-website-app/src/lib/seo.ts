import { SITE_PAGES } from './data/site';
import { LEGACY_ROUTES } from './data/legacy-routes';

export const SITE_URL = 'https://pie-framework.org';
export const SITE_NAME = 'PIE Framework';
export const SITE_DESCRIPTION = 'Open-source assessment players, learner tools and item editors. Use the PIE interaction library or build your own question types.';
export interface ShareImage {
	path: string;
	width: number;
	height: number;
	alt: string;
}

export function normalizePath(path: string) {
	return path.replace(/\/+$/, '') + '/';
}

export function canonicalUrl(path: string) {
	const normalized = normalizePath(path);
	return SITE_URL + (LEGACY_ROUTES[normalized]?.to ?? normalized);
}

export function shareImagePath(path: string) {
	const canonical = new URL(canonicalUrl(path)).pathname;
	return '/social/' + (canonical === '/' ? 'index' : canonical.slice(1, -1)) + '.png';
}

export function pageShareImage(path: string, title: string): ShareImage {
	return { path: shareImagePath(path), width: 1200, height: 630, alt: title + ' — ' + SITE_NAME };
}

/** Safe in JSON-LD and inline redirect scripts, including future authored text. */
export function jsonForHtml(value: unknown) {
	return JSON.stringify(value).replace(/</g, '\\u003c').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
}

export function pageStructuredData(path: string, title: string, description: string, image: ShareImage) {
	const url = canonicalUrl(path);
	const name = title.split(' - ')[0];
	const crumbs = [{ name: SITE_NAME, item: SITE_URL + '/' }];
	const parts = normalizePath(path).split('/').filter(Boolean);
	for (let index = 0; index < parts.length; index++) {
		const parent = '/' + parts.slice(0, index + 1).join('/') + '/';
		const entry = SITE_PAGES.find((page) => page.path === parent);
		if (index === parts.length - 1 || entry) {
			crumbs.push({ name: index === parts.length - 1 ? name : entry!.label, item: SITE_URL + parent });
		}
	}
	const isHome = path === '/';
	const graph: Record<string, unknown>[] = [
		{
			'@type': path === '/about/' ? 'AboutPage' : 'WebPage',
			'@id': url + '#webpage',
			url,
			name: title,
			description,
			inLanguage: 'en',
			isPartOf: { '@id': SITE_URL + '/#website' },
			primaryImageOfPage: { '@type': 'ImageObject', url: SITE_URL + image.path, width: image.width, height: image.height },
			...(!isHome ? { breadcrumb: { '@id': url + '#breadcrumbs' } } : {})
		}
	];
	if (isHome) {
		graph.push(
			{
				'@type': 'WebSite', '@id': SITE_URL + '/#website', url: SITE_URL + '/',
				name: SITE_NAME, alternateName: 'Portable Interactions and Elements',
				description: SITE_DESCRIPTION, inLanguage: 'en', publisher: { '@id': SITE_URL + '/#organization' }
			},
			{
				'@type': 'Organization', '@id': SITE_URL + '/#organization', name: SITE_NAME,
				url: SITE_URL + '/', sameAs: ['https://github.com/pie-framework']
			}
		);
	} else {
		graph.push({
			'@type': 'BreadcrumbList', '@id': url + '#breadcrumbs',
			itemListElement: crumbs.map((crumb, index) => ({ '@type': 'ListItem', position: index + 1, ...crumb }))
		});
	}
	return { '@context': 'https://schema.org', '@graph': graph };
}
