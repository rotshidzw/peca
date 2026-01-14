import { NextResponse } from 'next/server';

import { searchPosts } from '@/lib/data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') ?? '';

  if (!query.trim()) {
    return NextResponse.json({ results: [] });
  }

  const results = await searchPosts(query);
  return NextResponse.json({
    results: results.map((post) => ({
      id: post.id,
      title: post.title,
      excerpt: post.excerpt,
      slug: post.slug,
      category: post.category
    }))
  });
}
