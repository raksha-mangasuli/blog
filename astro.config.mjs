// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import { BASE, markdownOptions } from './src/plugins/markdown-options.ts';

// https://astro.build/config
export default defineConfig({
	site: 'https://raksha-mangasuli.github.io',
	base: BASE,
	trailingSlash: 'always',
	markdown: {
		processor: unified(/** @type {any} */ (markdownOptions)),
	},
});
