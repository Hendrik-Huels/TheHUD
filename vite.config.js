import { defineConfig } from 'vite';
import { version } from './package.json';
import { svelte } from '@sveltejs/vite-plugin-svelte';
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [svelte()],
	define: {
		__APP_VERSION__: JSON.stringify(version)
	},
	build: {
		lib: {
			entry: 'src/main.ts', // Entry point for the script
			name: 'TheHUD', // Name of the global variable for UMD/IIFE builds
			formats: ['iife'] // 'iife' is best for scripts injected into browsers
		},
		rollupOptions: {
			output: {
				// Ensure that your script is minified and ready for production
				entryFileNames: 'app.js'
			}
		}
	}
});
