import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.md']
		})
	],

	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: undefined,
			precompress: false,
			strict: true
		}),
		prerender: {
			handleHttpError: ({ path, referrer, message }) => {
				// Ignore 404s for pages we haven't built yet
				if (path.startsWith('/elements') ||
					path.startsWith('/docs') ||
					path.startsWith('/community') ||
					path.startsWith('/playground') ||
					path.startsWith('/about') ||
					path.startsWith('/blog') ||
					path.startsWith('/compare') ||
					path.startsWith('/ecosystem')) {
					return;
				}
				throw new Error(message);
			}
		}
	}
};

export default config;
