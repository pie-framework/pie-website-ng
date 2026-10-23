import { readFile, mkdir, copyFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { SITE_NAME, SITE_URL, pageShareImage } from '../packages/pie-website-app/src/lib/seo';
import { SITE_PAGES } from '../packages/pie-website-app/src/lib/data/site';

// Read the rendered head rather than maintaining a second list of page copy.
// These are build artifacts only; Sharp and the fonts never enter browser JS.
const app = resolve(import.meta.dir, '../packages/pie-website-app');
const build = resolve(app, 'build');
const fonts = resolve(import.meta.dir, 'assets/social-fonts');
// Native font discovery reads the environment at process startup. Start one
// configured child so macOS and CI render with the same checked-in fonts.
const fontConfig = resolve(fonts, 'fonts.conf');
if (process.env.FONTCONFIG_FILE !== fontConfig || process.env.PANGOCAIRO_BACKEND !== 'fc') {
	const child = Bun.spawnSync([process.execPath, import.meta.path], {
		env: { ...process.env, FONTCONFIG_FILE: fontConfig, PANGOCAIRO_BACKEND: 'fc' },
		stdout: 'inherit', stderr: 'inherit'
	});
	process.exit(child.exitCode);
}
const { default: sharp } = await import('sharp');
const xml = (text: string) => text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const unescape = (text: string) => text.replace(/&(#x[\da-f]+|#\d+|amp|quot|apos|lt|gt);/gi, (entity, name: string) => {
	if (name.startsWith('#x')) return String.fromCodePoint(parseInt(name.slice(2), 16));
	if (name.startsWith('#')) return String.fromCodePoint(Number(name.slice(1)));
	return ({ amp: '&', quot: '"', apos: "'", lt: '<', gt: '>' } as Record<string, string>)[name] ?? entity;
});

async function textImage(value: string, family: string, size: number, color: string, maxHeight: number) {
	for (let points = size; points >= 12; points -= 2) {
		const rendered = await sharp({ text: {
			text: '<span foreground="' + color + '">' + xml(value) + '</span>',
			font: (family === 'Newsreader' ? 'Newsreader 16pt' : family) + ' ' + points,
			fontfile: resolve(fonts, family + '.ttf'),
			width: 1056, rgba: true, spacing: 6, wrap: 'word-char'
		} }).png().toBuffer({ resolveWithObject: true });
		if (rendered.info.height <= maxHeight) return rendered.data;
	}
	throw new Error('Sharing card text does not fit: ' + value);
}

const logo = await sharp(resolve(app, 'src/lib/assets/favicon.svg')).resize(52, 52).png().toBuffer();
const brand = await textImage(SITE_NAME, 'Inter', 28, '#bd3f23', 48);
const background = Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">'
	+ '<rect width="1200" height="630" fill="#fcfbf8"/>'
	+ '<path d="M72 554H1128" stroke="#ddded7"/>'
	+ '<path d="M72 554H152" stroke="#ee4923" stroke-width="3"/>'
	+ '</svg>');
const entries: { path: string; title: string; description: string }[] = [];
for await (const file of new Bun.Glob('**/index.html').scan({ cwd: build })) {
	const path = '/' + file.slice(0, -'index.html'.length);
	const html = await readFile(resolve(build, file), 'utf8');
	const head = html.split('</head>')[0];
	const canonical = head.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
	if (canonical !== SITE_URL + path) continue; // Old URLs share their destination's card.
	const title = head.match(/<title>(.*?)<\/title>/s)?.[1];
	const description = head.match(/<meta name="description" content="([^"]*)"/)?.[1];
	if (!title || !description) throw new Error('Missing sharing copy: ' + path);
	entries.push({ path, title: unescape(title), description: unescape(description) });
}

let bytes = 0;
async function renderCard(entry: (typeof entries)[number]) {
	const name = entry.path === '/' ? entry.title.slice((SITE_NAME + ' - ').length) : entry.title.split(' - ')[0];
	const parent = '/' + entry.path.split('/').filter(Boolean)[0] + '/';
	const category = SITE_PAGES.find((page) => page.path === parent)?.label ?? 'Open-source assessment software';
	const [eyebrow, title, description, address] = await Promise.all([
		textImage(category.toUpperCase(), 'Inter', 18, '#626761', 32),
		textImage(name, 'Newsreader', 76, '#252a27', 190),
		textImage(entry.description, 'Inter', 26, '#626761', 118),
		textImage(SITE_URL.replace('https://', '') + entry.path, 'Inter', 18, '#626761', 32)
	]);
	const image = pageShareImage(entry.path, entry.title);
	const destination = resolve(build, '.' + image.path);
	await mkdir(dirname(destination), { recursive: true });
	const result = await sharp(background).composite([
		{ input: logo, left: 72, top: 56 }, { input: brand, left: 140, top: 68 },
		{ input: eyebrow, left: 72, top: 158 }, { input: title, left: 72, top: 208 },
		{ input: description, left: 72, top: 426 }, { input: address, left: 72, top: 582 }
	]).png({ palette: true, compressionLevel: 9 }).toFile(destination);
	// Vite preview serves Kit's client staging directory; GitHub Pages serves
	// build/. Keep the generated assets available in both static outputs.
	const previewAsset = resolve(app, '.svelte-kit/output/client', '.' + image.path);
	await mkdir(dirname(previewAsset), { recursive: true });
	await copyFile(destination, previewAsset);
	bytes += result.size;
}

// Keep memory and native rendering work bounded on developer machines and CI.
for (let index = 0; index < entries.length; index += 4) {
	await Promise.all(entries.slice(index, index + 4).map(renderCard));
}
console.log('Generated ' + entries.length + ' sharing images (' + Math.round(bytes / 1024) + ' KiB total).');
