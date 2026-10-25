import remarkBreaks from 'remark-breaks';
import rehypeBaseAssets from './rehype-base-assets.ts';

export const BASE = '/blog';

// Shared by astro.config.mjs (page rendering) and src/lib/posts.ts (card
// excerpts and thumbnails), so both see identical rendered HTML.
export const markdownOptions = {
	remarkPlugins: [remarkBreaks],
	rehypePlugins: [[rehypeBaseAssets, { base: BASE }]],
};
