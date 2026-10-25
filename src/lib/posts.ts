import { getCollection, type CollectionEntry } from 'astro:content';
import { getImage } from 'astro:assets';
import { createMarkdownProcessor } from '@astrojs/markdown-remark';
import { markdownOptions } from '../plugins/markdown-options.ts';

export type Post = CollectionEntry<'posts'>;

export const SITE_TITLE = 'Timestamped Thoughts';
export const PAGE_SIZE = 5;
const RESERVED = ['general', 'tech', 'hobbies', 'archive'];

const base = import.meta.env.BASE_URL.replace(/\/$/, '');
/** Site-absolute URL including the base path, e.g. url('/tech/') gives /blog/tech/ */
export const url = (path: string) => `${base}${path}`;

/** Newest first; same-timestamp ties broken by id so the order is stable. */
export async function getPosts(): Promise<Post[]> {
	const posts = await getCollection('posts');
	const sorted = posts.sort(
		(a, b) => b.data.date.valueOf() - a.data.date.valueOf() || (a.id < b.id ? 1 : -1),
	);
	for (const post of sorted) {
		if (RESERVED.includes(post.id) || /^page\d+$/.test(post.id)) {
			throw new Error(`Post slug "${post.id}" collides with a built-in route`);
		}
	}
	return sorted;
}

/** The Jekyll `defaults` block merges "General" into every post's categories. */
export function categoriesOf(post: Post): string[] {
	const own = Array.isArray(post.data.categories) ? post.data.categories : [post.data.categories];
	return [...new Set([...own, 'General'])];
}

export const inCategory = (posts: Post[], category: string) =>
	posts.filter((p) => categoriesOf(p).includes(category));

/** Kicker label: first non-General category, else General. */
export const kickerOf = (post: Post) =>
	categoriesOf(post).find((c) => c !== 'General') ?? 'General';

const MONTHS = [
	'January', 'February', 'March', 'April', 'May', 'June',
	'July', 'August', 'September', 'October', 'November', 'December',
];
/** Jekyll date_format "%B %d, %Y" */
export const formatDate = (d: Date) =>
	`${MONTHS[d.getUTCMonth()]} ${String(d.getUTCDate()).padStart(2, '0')}, ${d.getUTCFullYear()}`;
/** "%Y-%m-%d" */
export const formatIsoDay = (d: Date) => d.toISOString().slice(0, 10);

let renderer: ReturnType<typeof createMarkdownProcessor> | undefined;
const htmlCache = new Map<string, string>();

/** Post body rendered through the same plugins as the post page. */
export async function renderedHtml(post: Post): Promise<string> {
	let html = htmlCache.get(post.id);
	if (html === undefined) {
		renderer ??= createMarkdownProcessor(markdownOptions as any);
		html = (await (await renderer).render(post.body ?? '')).code;
		htmlCache.set(post.id, html);
	}
	return html;
}

const ENTITIES: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };
const decode = (s: string) =>
	s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e: string) => {
		if (e[0] === '#') {
			const code = e[1].toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
			return String.fromCodePoint(code);
		}
		return ENTITIES[e.toLowerCase()] ?? m;
	});

/** strip_html | normalize_whitespace | truncatewords: 50 */
export function excerptOf(html: string, words = 50): string {
	const text = decode(
		html.replace(/<!--[\s\S]*?-->/g, '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim(),
	);
	const list = text.split(' ');
	return list.length > words ? `${list.slice(0, words).join(' ')}...` : text;
}

/** First <img src> in the rendered body, as in index-card.html. */
export function firstImageOf(html: string): string | undefined {
	return html.match(/<img\s[^>]*?src="([^"]*)"/)?.[1];
}

// Vault-local images (Obsidian's `images/` folder). renderedHtml() uses a standalone
// markdown processor that leaves these paths unresolved, so the card optimizes them here
// the same way the post page does.
const vaultImages = import.meta.glob<{ default: ImageMetadata }>(
	'/src/content/posts/**/*.{png,jpg,jpeg,gif,webp,avif,svg}',
);

async function resolveVaultImage(src: string): Promise<string | undefined> {
	const path = decodeURIComponent(src).replace(/^\.\//, '');
	const load = vaultImages[`/src/content/posts/${path}`];
	if (!load) return undefined;
	return (await getImage({ src: (await load()).default, width: 800 })).src;
}

/** Card thumbnail: `image:` override, else first body image, else none. */
export async function cardImageOf(post: Post): Promise<string | undefined> {
	if (post.data.image === false) return undefined;
	if (post.data.image) return url(post.data.image);
	const src = firstImageOf(await renderedHtml(post));
	if (src && !/^(\/|[a-z][a-z0-9+.-]*:)/i.test(src)) return (await resolveVaultImage(src)) ?? src;
	return src;
}

/** content | number_of_words | divided_by: 200 | plus: 1 */
export const readingMinutes = (html: string) =>
	Math.floor(html.split(/\s+/).filter(Boolean).length / 200) + 1;

/** Plain-text feed excerpt: text before <!--more-->, else the first paragraph. */
export async function rssExcerptOf(post: Post): Promise<string> {
	const body = post.body ?? '';
	const marker = body.indexOf('<!--more-->');
	const source = marker >= 0 ? body.slice(0, marker) : body.trim().split(/\n\s*\n/)[0];
	renderer ??= createMarkdownProcessor(markdownOptions as any);
	const html = (await (await renderer).render(source)).code;
	return excerptOf(html, Infinity);
}
