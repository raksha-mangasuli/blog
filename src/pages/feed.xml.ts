import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE_TITLE, getPosts, rssExcerptOf, url } from '../lib/posts';

export async function GET(context: APIContext) {
	const posts = await getPosts();
	return rss({
		title: SITE_TITLE,
		description: 'Blog to pen down my thoughts about Tech, hobbies and more',
		// channel <link> is derived from `site`, so pass the blog home (site + base)
		site: new URL(url('/'), context.site!),
		items: await Promise.all(
			posts.map(async (post) => ({
				title: post.data.title,
				link: url(`/${post.id}/`),
				pubDate: post.data.date,
				description: await rssExcerptOf(post),
			})),
		),
	});
}
