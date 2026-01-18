import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

const NEWS_API_URL = 'https://newsapi.org/v2/everything';

export async function GET() {
  const apiKey = process.env.NEWS_API_KEY;
  if (apiKey) {
    const url = new URL(NEWS_API_URL);
    url.searchParams.set('q', 'travel OR tourism OR culture');
    url.searchParams.set('language', 'en');
    url.searchParams.set('pageSize', '12');
    url.searchParams.set('sortBy', 'publishedAt');

    const response = await fetch(url.toString(), {
      headers: {
        'X-Api-Key': apiKey
      },
      cache: 'no-store'
    });

    if (response.ok) {
      const data = (await response.json()) as {
        articles: Array<{
          title: string;
          description: string | null;
          url: string;
          urlToImage: string | null;
          publishedAt: string;
          source: { name: string };
        }>;
      };

      const articles = data.articles.map((article) => ({
        title: article.title,
        excerpt: article.description ?? 'Read the full story for the latest update.',
        url: article.url,
        image: article.urlToImage,
        publishedAt: article.publishedAt,
        source: article.source.name
      }));

      return NextResponse.json({ items: articles });
    }
  }

  if (!process.env.DATABASE_URL) {
    return NextResponse.json({ items: [] });
  }

  const fallbackPosts = await prisma.post.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { publishedAt: 'desc' },
    take: 6,
    include: { author: true, category: true }
  });

  return NextResponse.json({
    items: fallbackPosts.map((post) => ({
      title: post.title,
      excerpt: post.excerpt,
      url: `/post/${post.slug}`,
      image: post.coverImage,
      publishedAt: post.publishedAt?.toISOString() ?? post.createdAt.toISOString(),
      source: post.category.name
    }))
  });
}
