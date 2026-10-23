/**
 * Refresh the selected public guides from sibling checkouts. Site builds use
 * the committed snapshots and do not require the other repositories.
 */
import { mkdir, readFile, writeFile, copyFile, access } from 'node:fs/promises';
import { dirname, resolve, relative, basename, posix } from 'node:path';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { SITE_PAGES } from '../packages/pie-website-app/src/lib/data/site';

const root = resolve(import.meta.dir, '..');
const app = resolve(root, 'packages/pie-website-app');
const assets: Record<string, string> = {};
const provenance: Record<string, { repository: string; file: string; commit: string; sha256: string }> = {};

function selectSection(markdown: string, title: string): string {
	const lines = markdown.split('\n');
	const start = lines.findIndex((line) => /^#{1,6} /.test(line) && line.replace(/^#+\s*/, '').toLowerCase() === title.toLowerCase());
	if (start < 0) throw new Error('Source section not found: ' + title);
	const level = lines[start].match(/^#+/)![0].length;
	let end = start + 1;
	while (end < lines.length && !new RegExp('^#{1,' + level + '} ').test(lines[end])) end++;
	return lines.slice(start, end).join('\n');
}

for (const page of SITE_PAGES) {
	if (!page.source) continue;
	const { repo, file, section } = page.source;
	const checkout = resolve(root, '..', repo);
	const raw = await readFile(resolve(checkout, file), 'utf8');
	const markdown = section ? selectSection(raw, section) : raw;
	const destination = resolve(app, 'src/lib/server/guides', page.path.slice(1), 'content.md');
	await mkdir(dirname(destination), { recursive: true });
	await writeFile(destination, markdown.trim() + '\n');
	const commit = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: checkout, encoding: 'utf8' }).trim();
	provenance[page.path] = { repository: repo, file, commit, sha256: createHash('sha256').update(raw).digest('hex') };

	for (const match of markdown.matchAll(/!\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
		const url = match[1];
		if (/^(?:[a-z]+:|#|\/)/i.test(url)) continue;
		const sourcePath = posix.normalize(posix.join(posix.dirname(file), url.split('#')[0]));
		const input = resolve(checkout, sourcePath);
		if (!relative(checkout, input).startsWith('..')) {
			await access(input);
			const existing = resolve(app, 'static/images/diagrams', basename(input));
			let output: string;
			try {
				await access(existing);
				// Use the site's existing diagram when it is exactly the same asset.
				const [left, right] = await Promise.all([readFile(existing), readFile(input)]);
				if (!left.equals(right)) throw new Error('Different source asset');
				output = '/images/diagrams/' + basename(input);
			} catch {
				output = '/images/guides/' + repo + '/' + sourcePath;
				const target = resolve(app, 'static', output.slice(1));
				await mkdir(dirname(target), { recursive: true });
				await copyFile(input, target);
			}
			assets[repo + '/' + sourcePath] = output;
		}
	}
}

await writeFile(resolve(app, 'src/lib/server/guide-assets.json'), JSON.stringify(assets, null, 2) + '\n');
await writeFile(resolve(app, 'src/lib/server/guide-sources.json'), JSON.stringify(provenance, null, 2) + '\n');
console.log('Updated ' + Object.keys(provenance).length + ' guides and ' + Object.keys(assets).length + ' local image references.');
