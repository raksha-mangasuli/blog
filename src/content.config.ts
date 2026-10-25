import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Dates in the posts are date-only or "YYYY-MM-DD HH:MM" with no zone. Read both
// as UTC so ordering and display do not depend on the machine's timezone.
const postDate = z.preprocess((value) => {
	if (typeof value === 'string') {
		const m = value.trim().match(/^(\d{4}-\d{2}-\d{2})(?:[ T](\d{2}:\d{2})(?::(\d{2}))?)?$/);
		if (m) return new Date(`${m[1]}T${m[2] ?? '00:00'}:${m[3] ?? '00'}Z`);
	}
	return value;
}, z.coerce.date());

const posts = defineCollection({
	loader: glob({
		pattern: ['**/[^_]*.md', '!**/_*/**'],
		base: './src/content/posts',
		// 2026-10-25-blog-post-15.md -> blog-post-15, same as Jekyll's /:title/
		generateId: ({ entry }) => entry.replace(/\.md$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, ''),
	}),
	schema: z.object({
		title: z.string(),
		date: postDate,
		// An empty `categories:` in front matter parses as null; treat it as unset.
		categories: z.preprocess(
			(v) => (v === null ? undefined : v),
			z.union([z.string(), z.array(z.string())]).default('General'),
		),
		// Optional card overrides, mirroring _includes/index-card.html
		image: z.union([z.string(), z.literal(false)]).optional(),
		image_position: z.enum(['top', 'center', 'bottom']).optional(),
	}),
});

export const collections = { posts };
