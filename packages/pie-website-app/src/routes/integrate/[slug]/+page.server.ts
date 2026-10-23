import { error } from '@sveltejs/kit';
import { sitePageFor } from '$lib/data/site';
import { guideEntries, renderGuide } from '$lib/server/guides';
import type { PageServerLoad, EntryGenerator } from './$types';

export const entries: EntryGenerator = () => guideEntries('integrate');
export const load: PageServerLoad = ({ params }) => {
 const page = sitePageFor('/integrate/' + params.slug + '/');
 if (!page) error(404, 'Guide not found');
 return { guide: renderGuide(page) };
};
