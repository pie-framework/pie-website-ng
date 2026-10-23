import { Marked, Renderer } from 'marked';
import { posix } from 'node:path';
import { base } from '$app/paths';
import { SITE_PAGES, sourceUrl, type SitePage } from '$lib/data/site';
import assets from './guide-assets.json';
import sources from './guide-sources.json';

// Only checked-in site content is rendered. No network Markdown or visitor
// input enters this compiler; it runs during static generation.
const files = import.meta.glob('./guides/**/content.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
const pageSources = import.meta.glob('../../routes/**/+page.svelte', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
const assetMap: Record<string, string> = assets;
const provenance: Record<string, { repository: string; file: string; commit: string; sha256: string }> = sources;
const escape = (value: string) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
export const slugify = (value: string) => value
	.replace(/<[^>]*>/g, '')
	.replace(/&(?:amp|lt|gt|quot|#39);/g, '')
	.toLowerCase().replace(/[^\p{L}\p{N}\s_-]/gu, '').replace(/\s/g, '-');

export function guideMarkdown(page: SitePage) {
	return files['./guides' + page.path + 'content.md'];
}

function resolveUrl(page: SitePage, href: string, image = false): string {
	if (/^(?:https?:|mailto:|tel:|data:)/i.test(href)) return href;
	if (href.startsWith('#')) {
		// An excerpt may refer to a heading elsewhere in the complete source.
		const reference = page.source?.section && SITE_PAGES.find((candidate) =>
			candidate.source?.repo === page.source?.repo && candidate.source?.file === page.source?.file && !candidate.source?.section);
		return reference ? base + reference.path + href : href;
	}
	if (href.startsWith('/')) return base + href;
	if (!page.source) return href;
	const [file, fragment] = href.split('#');
	const target = posix.normalize(posix.join(posix.dirname(page.source.file), file));
	const key = page.source.repo + '/' + target;
	if (image && assetMap[key]) return base + assetMap[key];
	const candidates = SITE_PAGES.filter((candidate) => candidate.source?.repo === page.source?.repo && candidate.source?.file === target);
	const destination = candidates.find((candidate) => !candidate.source?.section) ?? candidates[0];
	if (destination && !image) return base + destination.path + (fragment ? '#' + fragment : '');
	return sourceUrl({ ...page.source, file: target }) + (fragment ? '#' + fragment : '');
}

export function renderGuide(page: SitePage) {
	const markdown = guideMarkdown(page);
	if (!markdown) throw new Error('Missing guide content: ' + page.path);
	const renderer = new Renderer();
	const headings: { id: string; label: string }[] = [];
	const used = new Map<string, number>();
	renderer.heading = function ({ tokens, depth }) {
		const html = this.parser.parseInline(tokens);
		const label = html.replace(/<[^>]*>/g, '');
		const stem = slugify(label);
		const count = used.get(stem) ?? 0;
		used.set(stem, count + 1);
		const id = stem + (count ? '-' + count : '');
		if (depth === 1) return '<span id="' + escape(id) + '" class="guide-anchor" aria-hidden="true"></span>';
		if (depth === 2) headings.push({ id, label });
		return '<h' + depth + ' id="' + escape(id) + '">' + html + '</h' + depth + '>\n';
	};
	renderer.link = function ({ href, title, tokens }) {
		const url = resolveUrl(page, href);
		if (!/^(?:https?:|mailto:|tel:|\/|#|\.)/i.test(url)) return this.parser.parseInline(tokens);
		return '<a href="' + escape(url) + '"' + (title ? ' title="' + escape(title) + '"' : '') + '>' + this.parser.parseInline(tokens) + '</a>';
	};
	renderer.image = function ({ href, text, title }) {
		const url = resolveUrl(page, href, true);
		return '<figure><img src="' + escape(url) + '" alt="' + escape(text) + '" loading="lazy" class="' + (url.includes('.svg') ? 'diagram ' : '') + 'guide-image">' + (title ? '<figcaption>' + escape(title) + '</figcaption>' : '') + '</figure>';
	};
	const defaultTable = renderer.table;
	const defaultCell = renderer.tablecell;
	renderer.tablecell = function (token) {
		if (token.header && !token.text.trim()) return '<th scope="col">Comparison</th>\n';
		return defaultCell.call(this, token);
	};
	// Task lists in source docs are static checklists, not disabled form controls.
	renderer.checkbox = ({ checked }) => '<span aria-hidden="true">' + (checked ? '☑' : '☐') + '</span> <span class="sr-only">' + (checked ? 'Completed: ' : 'Not completed: ') + '</span>';
	renderer.table = function (token) {
		return '<div class="guide-table">' + defaultTable.call(this, token) + '</div>';
	};
	const compiler = new Marked({ renderer, gfm: true, async: false });
	return { page, html: compiler.parse(markdown) as string, headings, provenance: provenance[page.path] ?? null };
}

export function guideEntries(area: string) {
	return SITE_PAGES.filter((page) => page.area === area && guideMarkdown(page))
		.map((page) => ({ slug: page.path.split('/').filter(Boolean).slice(1).join('/') }));
}

export function guideSearchText(page: SitePage) {
	const content = guideMarkdown(page) ?? pageSources['../../routes' + page.path + '+page.svelte'] ?? '';
	return content.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/g, ' ')
		.replace(/<[^>]*>/g, ' ').replace(/[#!*_[\]|>~]/g, ' ').replace(/\s+/g, ' ').trim();
}
