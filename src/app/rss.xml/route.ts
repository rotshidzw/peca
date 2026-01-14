import { Feed } from 'feed';

import { prisma } from '@/lib/prisma';

export async function GET() {
  const siteUrl = 'https://peca-journal.example.com';
  const posts = await prisma.post.findMany({
    where: { status: 'PUBLISHED' },
    orderBy: { publishedAt: 'desc' },
    take: 20
  });

  const feed = new Feed({
    title: 'Peca Journal',
    description: 'Smart travel intelligence for modern publishers.',
    id: siteUrl,
    link: siteUrl,
    language: 'en',
    favicon: `${siteUrl}/favicon.ico`
  });

  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: `${siteUrl}/post/${post.slug}`,
      link: `${siteUrl}/post/${post.slug}`,
      description: post.excerpt,
      date: post.publishedAt ?? post.createdAt
    });
  });

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/rss+xml'
    }
  });
}
