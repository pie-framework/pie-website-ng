/** Preserve the site's old entry points and the important deep-link tasks. */
export const LEGACY_ROUTES: Record<string, { to: string; anchors: Record<string, string> }> = {
	'/docs/players/': { to: '/integrate/', anchors: {
		'item-player': '/integrate/item-player/',
		'section-player': '/integrate/section-player/',
		'print-player': '/integrate/print/',
		'assessment-player': '/integrate/assessment-shell/',
		'integration-modes': '/integrate/section-player/',
		'building-blocks': '/integrate/#choose'
	} },
	'/docs/players-toolkit/': { to: '/integrate/', anchors: {} },
	'/docs/integration/': { to: '/integrate/', anchors: {
		patterns: '/integrate/#choose',
		'item-player-with-toolkit': '/integrate/toolkit/#a-toolkit-around-one-item',
		'custom-assessment-player': '/integrate/assessment-shell/',
		'controller-api': '/docs/reference/section-player/#section-controller',
		'delivery-and-scoring': '/docs/scoring/'
	} },
	'/docs/toolkit/': { to: '/integrate/toolkit/', anchors: {
		policy: '/docs/tool-policy/', tools: '/docs/tools/',
		coordinator: '/docs/reference/toolkit/#toolkitcoordinator-api',
		'item-scope': '/integrate/toolkit/#a-toolkit-around-one-item'
	} },
	'/docs/items-elements/': { to: '/elements/', anchors: {
		'element-library': '/elements/',
		'live-demo': '/integrate/item-player/#try-it',
		'try-it': '/integrate/item-player/#try-it',
		'item-config': '/integrate/item-player/#render-an-item',
		'group-choice-and-text': '/elements/#group-choice-and-text',
		'group-math': '/elements/#group-math',
		'group-matching-and-ordering': '/elements/#group-matching-and-ordering',
		'group-graphs-and-images': '/elements/#group-graphs-and-images',
		'group-content-and-scoring': '/elements/#group-content-and-scoring'
	} },
	'/docs/element-structure/': { to: '/build/how-elements-work/', anchors: {
		'controller-placement': '/docs/security/#graded-delivery',
		controller: '/build/how-elements-work/#controller-module',
		'authoring-view': '/integrate/authoring/',
		'delivery-view': '/build/how-elements-work/#delivery-contract'
	} },
	'/docs/timed-media/': { to: '/integrate/timed-media/', anchors: {} },
	'/docs/qti/': { to: '/qti/', anchors: {} }
};
