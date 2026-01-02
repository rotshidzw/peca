import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface PostCardProps {
  post: {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    coverImage: string | null;
    publishedAt: Date | null;
    author: { name: string | null };
    category: { name: string; slug: string };
  };
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="overflow-hidden">
      <Link href={`/post/${post.slug}`} className="block">
        {post.coverImage ? (
          <div className="relative h-40 w-full">
            <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
          </div>
        ) : null}
        <CardContent className="space-y-3 pt-6">
          <Badge variant="secondary">{post.category.name}</Badge>
          <h3 className="text-lg font-semibold leading-tight">{post.title}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">{post.excerpt}</p>
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>{post.author.name ?? 'Peca Editorial'}</span>
            {post.publishedAt ? <span>{format(post.publishedAt, 'MMM dd, yyyy')}</span> : null}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
