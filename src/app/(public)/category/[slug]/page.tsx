import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { PostCard } from '@/components/post/post-card';
import { getPostsByCategory } from '@/lib/data';
import { getPagination } from '@/lib/pagination';

export const dynamic = 'force-dynamic';

interface CategoryPageProps {
  params: { slug: string };
  searchParams?: { page?: string };
}

export function generateMetadata({ params }: CategoryPageProps): Metadata {
  const title = `Category: ${params.slug.replace(/-/g, ' ')}`;
  return {
    title,
    description: `Latest posts from ${params.slug.replace(/-/g, ' ')}`
  };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const page = Number(searchParams?.page ?? '1');
  const data = await getPostsByCategory(params.slug, page);

  if (data.posts.length === 0) {
    notFound();
  }

  const pagination = getPagination(page, data.pageSize, data.total);

  return (
    <div className="container space-y-6 py-16">
      <h1 className="text-3xl font-semibold">Category: {params.slug.replace(/-/g, ' ')}</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {data.posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
        <span>
          Page {pagination.page} of {pagination.totalPages}
        </span>
      </div>
    </div>
  );
}
