import { error } from '@sveltejs/kit';
import { EXPERIENCES } from '$lib/data/examples';
import type { EntryGenerator, PageServerLoad } from './$types';
export const entries: EntryGenerator = () => EXPERIENCES.map((entry) => ({ slug: entry.slug }));
export const load: PageServerLoad = ({ params }) => {
	const experience = EXPERIENCES.find((entry) => entry.slug === params.slug);
	if (!experience) error(404, 'Example not found');
	return { experience };
};
