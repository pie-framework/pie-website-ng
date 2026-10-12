import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: false
		}),
		// Served at the root of pie-framework.org (static/CNAME), so no base path.
		paths: {
			base: ''
		},
		prerender: {
			entries: ['*'],
			handleMissingId: 'fail',
			handleHttpError: 'fail'
		}
	}
};

export default config;
