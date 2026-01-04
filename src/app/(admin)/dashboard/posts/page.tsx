import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { format } from 'date-fns';

import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { hasRole } from '@/lib/rbac';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-dynamic';

export default async function PostsPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/auth/sign-in');
  }
  if (!hasRole(session.user?.role, 'EDITOR')) {
    redirect('/');
  }

  const posts = await prisma.post.findMany({
    orderBy: { updatedAt: 'desc' },
    include: { author: true, category: true }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div>
          <h1 className="text-2xl font-semibold">Posts</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Manage drafts, scheduled stories, and published features.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/posts/new">New post</Link>
        </Button>
      </div>
      <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-slate-900 dark:text-slate-400">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Updated</th>
              <th className="px-4 py-3">Author</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id} className="border-t border-slate-200 dark:border-slate-800">
                <td className="px-4 py-3">
                  <Link href={`/post/${post.slug}`} className="font-medium text-slate-900 dark:text-slate-100">
                    {post.title}
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <Badge variant="secondary">{post.status}</Badge>
                </td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{post.category.name}</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                  {format(post.updatedAt, 'MMM dd, yyyy')}
                </td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                  {post.author.name ?? 'Editorial'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
