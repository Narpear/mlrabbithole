# ML Rabbit Hole

A technical machine learning blog: “Machine learning from 0 to 100, one question at a time.” Built with Astro and MDX, and generated as a fully static site.

## Run locally

```sh
npm install
npm run dev
```

The development server shows draft posts. Make a production build with `npm run build`; drafts are excluded. Inspect that build locally with `npm run preview`.

## Write a post

Add an `.mdx` file in `src/content/posts/`. Its filename becomes `/posts/<filename>/`.

```mdx
---
title: "A question worth asking"
description: "One sentence describing this post for the home page."
date: 2026-10-12
series: "Generative models"
order: 2
tags: ["example"]
draft: true
---

## Start with a question

Inline math uses $x \sim \mathcal{N}(0, I)$ and display math uses:

$$
p(x) = \int p(x \mid z)p(z)\,dz.
$$

import Callout from '../../components/Callout.astro';

<Callout title="Key idea">Explain the important point here.</Callout>
```

Set `draft: false` when the post is ready. Import any component from `src/components/` at the top of the MDX file. Put static images in `public/images/` and reference them as `/images/filename.webp`.

## Deploy on Vercel

1. Import the GitHub repository into Vercel. The Astro framework and build defaults work without a custom adapter.
2. Set the project domain to `mlrabbithole.vercel.app` if it is available.
3. If the deployed URL differs, update `site` in `astro.config.mjs` so canonical URLs and the sitemap stay correct.

## Enable Giscus comments

1. Use a public GitHub repository and enable Discussions in its repository settings.
2. Install the [Giscus GitHub App](https://github.com/apps/giscus) and grant access to that repository.
3. Visit [giscus.app](https://giscus.app), select the repository and the `Announcements` category, and copy the repository ID and category ID it provides.
4. In `src/site.config.ts`, fill `repoId` and `categoryId`, confirm `repo` and `category`, and set `enabled` to `true`.
5. Deploy. Giscus maps discussions by page pathname; reactions are enabled and the input appears above the thread.

## Where things live

| Path | Purpose |
| --- | --- |
| `src/content/posts/` | MDX posts and their frontmatter |
| `src/content.config.ts` | Post collection schema and file loader |
| `src/lib/posts.ts` | Post, series, date, and reading-time helpers |
| `src/site.config.ts` | Site metadata and Giscus settings |
| `src/components/` | Callout, diffusion demo, and comments |
| `src/layouts/Base.astro` | Shared page shell, navigation, and theme toggle |
| `src/pages/` | Home, about, post routes, and RSS feed |
| `src/styles/global.css` | Typography, color themes, and responsive styling |
| `public/` | Static assets such as the favicon and post images |