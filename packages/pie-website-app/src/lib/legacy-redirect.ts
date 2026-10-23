import type { LEGACY_ROUTES } from './data/legacy-routes';
import { jsonForHtml } from './seo';

type LegacyRoute = (typeof LEGACY_ROUTES)[string];

/** Self-contained so initial HTML and client navigation use the same resolver. */
export function legacyDestination(href: string, route: LegacyRoute, base: string) {
	const current = new URL(href);
	let fragment = current.hash.slice(1);
	try { fragment = decodeURIComponent(fragment); } catch { /* Keep malformed escapes literal. */ }
	const mapped = Object.hasOwn(route.anchors, fragment) ? route.anchors[fragment] : undefined;
	const target = new URL(base + (mapped ?? route.to), current);
	if (!target.search) target.search = current.search;
	if (!mapped && !target.hash) target.hash = current.hash;
	return target.href;
}

export function legacyRedirectScript(route: LegacyRoute, base: string) {
	// This parser-executed script runs before the meta refresh and before the
	// application bundle. Serialize the resolver to keep fragment handling shared.
	return '<script data-pie-redirect>window.location.replace(('
		+ legacyDestination.toString() + ')(window.location.href,' + jsonForHtml(route) + ',' + jsonForHtml(base)
		+ '));</scr' + 'ipt>';
}
