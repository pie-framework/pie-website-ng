import { error } from '@sveltejs/kit';
import { ELEMENTS } from '$lib/data/elements';
import { deliveryCapture } from '$lib/data/element-captures';
import type { ElementExample, ElementReference } from '$lib/data/element-example';
import examples from '$lib/server/element-demos.json';
import references from '$lib/server/element-references.json';
import type { EntryGenerator, PageServerLoad } from './$types';
export const entries: EntryGenerator = () => ELEMENTS.map((element) => ({ slug: element.name }));
export const load: PageServerLoad = ({ params }) => {
	const element = ELEMENTS.find((entry) => entry.name === params.slug);
	if (!element) error(404, 'Element not found');
	return {
		element,
		capture: deliveryCapture(element.name),
		example: (examples as Record<string, ElementExample>)[element.name],
		reference: (references as Record<string, ElementReference>)[element.name]
	};
};
