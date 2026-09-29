import rss from '@astrojs/rss';
import { getPosts, postUrl } from '../lib/posts';
import { SITE } from '../site.config';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async (context) => {
  const posts = await getPosts();
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site!.toString(),
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: postUrl(post),
    })),
    customData: `<language>en-us</language><author>${SITE.author}</author>`,
  });
};