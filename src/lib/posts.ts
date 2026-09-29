import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

export async function getPosts(includeDrafts = false): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => includeDrafts || !data.draft);
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getSeries(includeDrafts = false): Promise<Map<string, Post[]>> {
  const groups = new Map<string, Post[]>();

  for (const post of await getPosts(includeDrafts)) {
    const seriesPosts = groups.get(post.data.series) ?? [];
    seriesPosts.push(post);
    groups.set(post.data.series, seriesPosts);
  }

  for (const seriesPosts of groups.values()) {
    seriesPosts.sort((a, b) => a.data.order - b.data.order);
  }

  return groups;
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

export function readingTime(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

export function postUrl(post: Post): string {
  return `/posts/${post.id.replace(/\.(md|mdx)$/, '')}/`;
}