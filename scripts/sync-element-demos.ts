/** Curated first examples from the public element demo fixtures. */
import { access, mkdir, readFile, writeFile, copyFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';
import { ELEMENTS } from '../packages/pie-website-app/src/lib/data/elements';
import type { ElementExample, ElementReference, SchemaField } from '../packages/pie-website-app/src/lib/data/element-example';

const root = resolve(import.meta.dir, '..');
const checkout = resolve(root, '../pie-elements-ng');
const app = resolve(root, 'packages/pie-website-app');
const fixtures: Record<string, ElementExample> = {};
const references: Record<string, ElementReference> = {};
const commit = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: checkout, encoding: 'utf8' }).trim();

async function rewrite(value: unknown): Promise<unknown> {
	if (typeof value === 'string' && value.startsWith('/') && !value.startsWith('//')) {
		const source = resolve(checkout, 'apps/element-demo/static', value.slice(1));
		try {
			await access(source);
			const target = resolve(app, 'static/demo-assets/elements', value.slice(1));
			await mkdir(dirname(target), { recursive: true });
			await copyFile(source, target);
			return '/demo-assets/elements' + value;
		} catch {
			return 'https://elements.pie-framework.org' + value;
		}
	}
	if (Array.isArray(value)) return Promise.all(value.map(rewrite));
	if (value && typeof value === 'object') {
		const entries = await Promise.all(Object.entries(value).map(async ([key, entry]) => [key, await rewrite(entry)]));
		return Object.fromEntries(entries);
	}
	return value;
}

type Schema = Record<string, unknown>;
function fields(schema: Schema): SchemaField[] {
	const required = Array.isArray(schema.required) ? schema.required : [];
	const properties = (schema.properties ?? {}) as Record<string, Schema>;
	return Object.entries(properties).map(([name, field]) => ({
		name,
		type: typeof field.$ref === 'string' ? field.$ref.split('/').pop()!
			: Array.isArray(field.type) ? field.type.join(' | ')
				: Array.isArray(field.anyOf) ? 'union' : String(field.type ?? 'object'),
		required: required.includes(name),
		description: typeof field.description === 'string' ? field.description : '',
		defaultValue: field.default === undefined ? '—' : JSON.stringify(field.default),
		values: field.enum ? JSON.stringify(field.enum) : ''
	}));
}

for (const element of ELEMENTS) {
	const group = element.framework === 'React' ? 'elements-react' : 'elements-svelte';
	let file = 'packages/' + group + '/' + element.name + '/docs/demo/config.mjs';
	let data;
	try {
		await access(resolve(checkout, file));
		data = (await import(pathToFileURL(resolve(checkout, file)).href)).default;
	} catch (error) {
		if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
		file = 'apps/element-demo/src/lib/samples/' + element.name + '.json';
		data = JSON.parse(await readFile(resolve(checkout, file), 'utf8'));
	}
	if (!data.demos) {
		file = 'apps/element-demo/src/lib/samples/' + element.name + '.json';
		data = JSON.parse(await readFile(resolve(checkout, file), 'utf8'));
	}
	const demo = element.name === 'mc-populated-blank'
		? data.demos?.find((sample: { model?: { prompt?: string; hasAudio?: boolean } }) => sample.model?.prompt?.includes('The Dog') && !sample.model.hasAudio)
		: data.demos?.[0];
	if (!demo?.model) throw new Error('No first demo model: ' + file);
	const fixture = await rewrite({
		title: element.name === 'mc-populated-blank' ? 'A word in a reading passage' : demo.title ?? element.displayName,
		description: element.name === 'mc-populated-blank' ? 'Choose a word to complete the passage question.' : demo.description ?? 'A public ' + element.displayName + ' example.',
		model: { ...demo.model, id: 'example', element: element.name },
		session: { ...demo.session, id: 'example', element: element.name },
		configuration: demo.configuration ?? {},
		source: file,
		commit
	}) as ElementExample;
	if (element.name === 'graphing-solution-set') {
		// The source fixture puts plain text in <math>, which is invalid MathML.
		fixture.model.prompt = 'Graph the solution set for the inequality: <math><mi>y</mi><mo>&gt;</mo><mn>2</mn><mi>x</mi><mo>−</mo><mn>3</mn></math>';
	}
	if (element.name === 'image-cloze-association') {
		// The upstream fixture points at a legacy authenticated image service and
		// localhost. Retain its two-drop-zone contract with self-contained media.
		fixture.title = 'Compare two lines';
		fixture.description = 'Drag a slope label onto each line.';
		const steeper = '<span>Steeper line</span>';
		const shallower = '<span>Less steep line</span>';
		fixture.model = {
			id: 'example', element: element.name,
			prompt: 'Drag each label onto the matching line.',
			stimulus: '<p>Both lines start at (0, 0). Line A reaches (6, 8); line B reaches (8, 3). Compare their slopes.</p>',
			image: { src: '/demo-assets/image-cloze-lines.svg', width: 465, height: 313, scale: false },
			responseAreaFill: 'rgba(240,255,224,0.9)',
			response_container: { wordwrap: true, width: '130px', height: '55px' },
			response_containers: [
				{ x: 64.3, y: 1.6, width: '35.70%', height: '23.64%', wordwrap: true, aria_label: 'Line A label' },
				{ x: 64.09, y: 39.62, width: '35.92%', height: '23.32%', wordwrap: true, aria_label: 'Line B label' }
			],
			possible_responses: [shallower, steeper],
			validation: { scoring_type: 'exactMatch', valid_response: { score: 1, value: [{ images: [steeper] }, { images: [shallower] }] } },
			partialScoring: false, shuffle: true, rubricEnabled: false,
			imageDropTargetPadding: '2px', responseContainerPadding: '8px'
		};
	}
	fixtures[element.name] = fixture;
	const packageRoot = resolve(checkout, 'packages', group, element.name);
	const manifest = JSON.parse(await readFile(resolve(packageRoot, 'package.json'), 'utf8'));
	const contracts: ElementReference['contracts'] = [];
	for (const kind of ['model', 'configuration', 'session']) {
		if (kind === 'configuration' && !element.views.authoring) continue;
		const source = resolve(packageRoot, 'dist/schemas/' + kind + '.schema.json');
		const schema = JSON.parse(await readFile(source, 'utf8')) as Schema;
		const url = '/schemas/' + element.name + '/' + kind + '.schema.json';
		const destination = resolve(app, 'static', url.slice(1));
		await mkdir(dirname(destination), { recursive: true });
		await copyFile(source, destination);
		contracts.push({
			kind,
			url,
			fields: fields(schema),
			definitions: Object.entries((schema.definitions ?? {}) as Record<string, Schema>)
				.map(([name, value]) => ({ name, fields: fields(value) })).filter((entry) => entry.fields.length)
		});
	}
	references[element.name] = { version: manifest.version, contracts };
}

await writeFile(resolve(app, 'src/lib/server/element-demos.json'), JSON.stringify(fixtures, null, 2) + '\n');
await writeFile(resolve(app, 'src/lib/server/element-references.json'), JSON.stringify(references, null, 2) + '\n');
// Reuse the players repository's generated, silent timed-media lesson.
const clip = resolve(root, '../pie-players/apps/section-demos/static/demo-assets/timed-media/water-cycle-lesson.webm');
const target = resolve(app, 'static/demo-assets/water-cycle-lesson.webm');
await mkdir(dirname(target), { recursive: true });
await copyFile(clip, target);
console.log('Updated ' + Object.keys(fixtures).length + ' element examples and the timed-media lesson.');
