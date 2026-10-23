import { describe, expect, test } from 'bun:test';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { runInNewContext } from 'node:vm';
import { SITE_PAGES } from '../packages/pie-website-app/src/lib/data/site';
import { LEGACY_ROUTES } from '../packages/pie-website-app/src/lib/data/legacy-routes';
import { ELEMENTS } from '../packages/pie-website-app/src/lib/data/elements';
import { EXPERIENCES } from '../packages/pie-website-app/src/lib/data/examples';
import examples from '../packages/pie-website-app/src/lib/server/element-demos.json';
import { SITE_URL, jsonForHtml } from '../packages/pie-website-app/src/lib/seo';

// Exercise the actual deployable HTML, including destinations only reached by
// client-side legacy redirects. Run `bun run build` before these checks.
const build = resolve(import.meta.dir, '../packages/pie-website-app/build');
const htmlAt = (path: string) => readFileSync(resolve(build, '.' + path, 'index.html'), 'utf8');
const headAt = (path: string) => htmlAt(path).split('</head>')[0];
const decode = (value: string) => value.replace(/&(?:amp|quot|#39|lt|gt);/g, (entity) => ({
	'&amp;': '&', '&quot;': '"', '&#39;': "'", '&lt;': '<', '&gt;': '>'
}[entity]!));
const attributes = (tag: string) => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map((match) => [match[1], decode(match[2])]));
function meta(head: string, key: string) {
	return [...head.matchAll(/<meta\s[^>]*>/g)].map((match) => attributes(match[0]))
		.filter((tag) => (tag.name ?? tag.property) === key).map((tag) => tag.content);
}
const pages = ['/', '/search/', ...SITE_PAGES.map((page) => page.path),
	...ELEMENTS.map((element) => '/elements/' + element.name + '/'),
	...EXPERIENCES.map((experience) => '/explore/' + experience.slug + '/')];

describe('Published routes', () => {
	for (const path of pages) {
		test(path + ' has standalone content and its own canonical URL', () => {
			const html = htmlAt(path);
			const head = headAt(path);
			const title = decode(head.match(/<title>(.*?)<\/title>/s)![1]);
			const description = meta(head, 'description');
			expect([...html.matchAll(/<h1(?:\s|>)/g)]).toHaveLength(1);
			expect(html).toContain('rel="canonical" href="https://pie-framework.org' + path + '"');
			expect(html).not.toContain('<title>404');
			expect(description).toHaveLength(1);
			expect(description[0].length).toBeGreaterThan(0);
			expect(meta(head, 'og:title')).toEqual([title]);
			expect(meta(head, 'twitter:title')).toEqual([title]);
			expect(meta(head, 'og:description')).toEqual(description);
			expect(meta(head, 'twitter:description')).toEqual(description);
			expect(meta(head, 'og:url')).toEqual([SITE_URL + path]);
			expect(meta(head, 'robots')).toEqual([path === '/search/' ? 'noindex, follow' : 'index, follow']);
		});
	}
});

describe('Legacy deep links', () => {
	for (const [path, route] of Object.entries(LEGACY_ROUTES)) {
		test(path + ' provides a static fallback and valid redirect targets', () => {
			const links = [...htmlAt(path).matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)]
				.map((match) => new URL(match[1], 'https://pie-framework.org' + path).pathname);
			expect(links).toContain(route.to);
			const head = headAt(path);
			expect(head).toContain('rel="canonical" href="' + SITE_URL + route.to + '"');
			const refresh = [...head.matchAll(/<meta\s[^>]*>/g)].map((match) => attributes(match[0]))
				.find((tag) => tag['http-equiv'] === 'refresh')!.content;
			expect(refresh).toMatch(/^0; url=/);
			expect(new URL(refresh.slice('0; url='.length), SITE_URL + path).href).toBe(SITE_URL + route.to);
			for (const destination of [route.to, ...Object.values(route.anchors)]) {
				const url = new URL(destination, 'https://pie-framework.org');
				const html = htmlAt(url.pathname);
				if (url.hash) expect(html.includes('id="' + decodeURIComponent(url.hash.slice(1)) + '"'), destination).toBe(true);
			}
		});
	}
});

test('Crawler files list exactly the indexable canonical HTML pages', async () => {
	const sitemap = readFileSync(resolve(build, 'sitemap.xml'), 'utf8');
	const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => decode(match[1]));
	const expected: string[] = [];
	for await (const file of new Bun.Glob('**/index.html').scan({ cwd: build })) {
		const path = '/' + file.slice(0, -'index.html'.length);
		const head = headAt(path);
		if (head.includes('rel="canonical" href="' + SITE_URL + path + '"') && !meta(head, 'robots').some((value) => value.includes('noindex'))) {
			expected.push(SITE_URL + path);
		}
	}
	expect(urls.sort()).toEqual(expected.sort());
	expect(new Set(urls).size).toBe(urls.length);
	expect(sitemap).toContain('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
	const robots = readFileSync(resolve(build, 'robots.txt'), 'utf8');
	expect(robots).toContain('User-agent: *\nAllow: /');
	expect(robots).toContain('Sitemap: ' + SITE_URL + '/sitemap.xml');
	expect(robots).not.toMatch(/Disallow:\s*\/search/);
});

test('Page metadata is unique and every social preview ships as a 1200×630 PNG', () => {
	const titles = new Set<string>();
	const descriptions = new Set<string>();
	const images = new Set<string>();
	for (const path of [...pages, ...Object.keys(LEGACY_ROUTES)]) {
		const head = headAt(path);
		const image = meta(head, 'og:image');
		expect(image).toHaveLength(1);
		expect(meta(head, 'twitter:image')).toEqual(image);
		expect(meta(head, 'og:image:type')).toEqual(['image/png']);
		const url = new URL(image[0]);
		expect(url.origin).toBe(SITE_URL);
		const png = readFileSync(resolve(build, '.' + url.pathname));
		expect(png.subarray(1, 4).toString()).toBe('PNG');
		expect(png.readUInt32BE(16)).toBe(1200);
		expect(png.readUInt32BE(20)).toBe(630);
		if (LEGACY_ROUTES[path]) continue;
		titles.add(head.match(/<title>(.*?)<\/title>/s)![1]);
		descriptions.add(meta(head, 'description')[0]);
		images.add(image[0]);
	}
	expect(titles.size).toBe(pages.length);
	expect(descriptions.size).toBe(pages.length);
	expect(images.size).toBe(pages.length);
});

test('Structured data matches page metadata and its real navigation hierarchy', () => {
	for (const path of pages) {
		const head = headAt(path);
		const blocks = [...head.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)];
		expect(blocks).toHaveLength(path === '/search/' ? 0 : 1);
		if (path === '/search/') continue;
		const data = JSON.parse(blocks[0][1]);
		expect(data['@context']).toBe('https://schema.org');
		const page = data['@graph'].find((node: any) => ['WebPage', 'AboutPage'].includes(node['@type']));
		expect(page.url).toBe(SITE_URL + path);
		expect(page.description).toBe(meta(head, 'description')[0]);
		expect(page.name).toBe(decode(head.match(/<title>(.*?)<\/title>/s)![1]));
		if (path === '/') {
			expect(data['@graph'].some((node: any) => node['@type'] === 'WebSite')).toBe(true);
			expect(data['@graph'].some((node: any) => node['@type'] === 'Organization')).toBe(true);
			continue;
		}
		const crumbs = data['@graph'].find((node: any) => node['@type'] === 'BreadcrumbList').itemListElement;
		expect(crumbs.length).toBeGreaterThanOrEqual(2);
		for (const [index, crumb] of crumbs.entries()) {
			expect(crumb.position).toBe(index + 1);
			expect(crumb.name.length).toBeGreaterThan(0);
			expect(existsSync(resolve(build, '.' + new URL(crumb.item).pathname, 'index.html'))).toBe(true);
		}
		expect(crumbs.at(-1).item).toBe(SITE_URL + path);
	}
});

test('The deployed redirect scripts preserve queries and resolve old fragments before hydration', () => {
	for (const [path, route] of Object.entries(LEGACY_ROUTES)) {
		const script = headAt(path).match(/<script data-pie-redirect>(.*?)<\/script>/s)![1];
		const destinations = [['', route.to], ...Object.entries(route.anchors),
			['constructor', route.to + '#constructor'], ['unknown', route.to + '#unknown'], ['%ZZ', route.to + '#%ZZ']];
		for (const [fragment, destination] of destinations) {
			let actual = '';
			runInNewContext(script, { URL, window: { location: {
				href: 'https://preview.example' + path + '?utm_source=old' + (fragment ? '#' + fragment : ''),
				replace: (target: string) => { actual = target; }
			} } });
			const expected = new URL(destination, 'https://preview.example');
			expected.search = '?utm_source=old';
			expect(actual).toBe(expected.href);
		}
	}
});

test('Authored structured data cannot close its HTML script element', () => {
	const value = { title: '</script><script>alert("test")</script>\u2028\u2029' };
	const serialized = jsonForHtml(value);
	expect(serialized).not.toContain('<');
	expect(JSON.parse(serialized)).toEqual(value);
});

test('Every local image and media reference exists in the static artifact', async () => {
	const glob = new Bun.Glob('**/*.html');
	const failures: string[] = [];
	for await (const file of glob.scan({ cwd: build })) {
		const html = readFileSync(resolve(build, file), 'utf8');
		for (const [, source] of html.matchAll(/<(?:img|video|audio|source)\b[^>]*\bsrc="([^"]+)"/g)) {
			const url = new URL(source, 'https://pie-framework.org/' + file);
			if (url.origin !== 'https://pie-framework.org') continue;
			if (!existsSync(resolve(build, '.' + decodeURIComponent(url.pathname)))) failures.push(file + ': ' + source);
		}
	}
	expect(failures).toEqual([]);
});

test('Public demo media avoids legacy private endpoints and ships its local files', () => {
	const data = JSON.stringify(examples);
	expect(/https?:\/\/(?:localhost|127\.0\.0\.1|app\.fluence\.net)(?=[:/])/.test(data)).toBe(false);
	for (const [, path] of data.matchAll(/"(\/demo-assets\/[^"\\]+)"/g)) {
		expect(existsSync(resolve(build, '.' + path)), path).toBe(true);
	}
});
