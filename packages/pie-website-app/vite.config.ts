import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	// versions.ts reads the exact player pin from this manifest in development.
	server: { fs: { allow: [fileURLToPath(new URL('./package.json', import.meta.url))] } }
});
