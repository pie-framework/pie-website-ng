import { sveltekit } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-static';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			adapter: adapter({
				pages: 'build',
				assets: 'build',
				fallback: undefined,
				precompress: false,
				strict: false
			}),
			prerender: {
				entries: ['*'],
				handleMissingId: 'fail',
				handleHttpError: 'fail'
			}
		})
	],
	// versions.ts reads the exact player pin from this manifest in development.
	server: { fs: { allow: [fileURLToPath(new URL('./package.json', import.meta.url))] } }
});
