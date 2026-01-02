import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';

import { Badge } from '@/components/ui/badge';
import { PostViewTracker } from '@/components/post/post-view-tracker';
import { ShareActions } from '@/components/post/share-actions';
import { getPostBySlug } from '@/lib/data';
import { getReadingTime, getTableOfContents } from '@/lib/markdown';

export const dynamic = 'force-dynamic';

interface PostPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [{ url: post.coverImage }] : undefined
    }
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post || post.status !== 'PUBLISHED') {
    notFound();
  }

  const toc = getTableOfContents(post.content);
  const readingTime = getReadingTime(post.content);

  return (
    <div className="container grid gap-10 py-16 lg:grid-cols-[1fr_0.3fr]">
      <PostViewTracker slug={post.slug} />
      <article className="space-y-6">
        {post.coverImage ? (
          <div className="relative h-72 w-full overflow-hidden rounded-xl">
            <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
          </div>
        ) : null}
        <div className="space-y-3">
          <Badge variant="secondary">{post.category.name}</Badge>
          <h1 className="text-3xl font-semibold leading-tight md:text-4xl">{post.title}</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">{post.excerpt}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
          <span>{post.author.name ?? 'Peca Editorial'}</span>
          <span>•</span>
          {post.publishedAt ? <span>{format(post.publishedAt, 'MMM dd, yyyy')}</span> : null}
          <span>•</span>
          <span>{readingTime}</span>
        </div>
        <div className="prose prose-slate max-w-none dark:prose-invert">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]}>
            {post.content}
          </ReactMarkdown>
        </div>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag.tagId} variant="secondary">
              <Link href={`/tag/${tag.tag.slug}`}>{tag.tag.name}</Link>
            </Badge>
          ))}
        </div>
        <ShareActions slug={post.slug} />
      </article>
      <aside className="space-y-6">
        <div className="rounded-xl border border-slate-200 p-6 dark:border-slate-800">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Table of contents</h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-400">
            {toc.map((heading) => (
              <li key={heading.id} className={heading.level === 3 ? 'pl-4' : ''}>
                <a href={`#${heading.id}`}>{heading.text}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-slate-200 p-6 dark:border-slate-800">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Related reading</h3>
          <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
            Explore more from the {post.category.name} desk in the categories section.
          </p>
          <Button variant="link" asChild>
            <Link href={`/category/${post.category.slug}`}>Browse category</Link>
          </Button>
        </div>
      </aside>
    </div>
  );
}
