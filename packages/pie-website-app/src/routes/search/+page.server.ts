import { SITE_PAGES } from '$lib/data/site';
import { ELEMENTS } from '$lib/data/elements';
import { EXPERIENCES } from '$lib/data/examples';
import { deliveryCapture } from '$lib/data/element-captures';
import { guideSearchText } from '$lib/server/guides';

export const load = () => ({
	entries: [
		...SITE_PAGES.map((page) => ({
			path: page.path, title: page.label, summary: page.summary,
			category: page.area === 'integrate' ? 'Integrate PIE' : page.area === 'build' ? 'Build interactions' : 'Guides and resources',
			text: [page.label, page.summary, ...(page.keywords ?? []), guideSearchText(page)].join(' ')
		})),
		...ELEMENTS.map((element) => ({
			path: '/elements/' + element.name + '/', title: element.displayName,
			summary: deliveryCapture(element.name).caption, category: 'Element library',
			text: [element.displayName, element.name, element.group, deliveryCapture(element.name).caption, element.views.authoring ? 'authoring editor' : '', element.views.print ? 'print worksheet' : ''].join(' ')
		})),
		...EXPERIENCES.map((experience) => ({
			path: '/explore/' + experience.slug + '/', title: experience.title,
			summary: experience.summary, category: 'Working example',
			text: [experience.title, experience.summary, ...experience.learn].join(' ')
		}))
	]
});
