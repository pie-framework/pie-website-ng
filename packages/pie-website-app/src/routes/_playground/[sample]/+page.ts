import { getSampleIds } from '$lib/playground-samples';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	return {
		sample: params.sample
	};
};

// Generate static paths for all samples
export function entries() {
	return getSampleIds().map((id) => ({ sample: id }));
}

// Enable prerendering for this page
export const prerender = true;
