import { error } from '@sveltejs/kit';
import { sitePageFor } from '#lib/data/site.ts';
import { guideEntries, renderGuide } from '#lib/server/guides.ts';
import type { PageServerLoad, EntryGenerator } from './$types';

export const entries: EntryGenerator = () => guideEntries('build');
export const load: PageServerLoad = ({ params }) => {
 const page = sitePageFor('/build/' + params.slug + '/');
 if (!page) error(404, 'Guide not found');
 return { guide: renderGuide(page) };
};
