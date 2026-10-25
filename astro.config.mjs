// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import { BASE, markdownOptions } from './src/plugins/markdown-options.ts';

// https://astro.build/config
export default defineConfig({
	site: 'https://raksha-mangasuli.github.io',
	base: BASE,
	trailingSlash: 'always',
	integrations: [sitemap({ filter: (page) => !page.endsWith('/404/') })],
	markdown: {
		processor: unified(/** @type {any} */ (markdownOptions)),
	},
});
