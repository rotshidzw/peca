import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { format } from 'date-fns';

import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { hasRole } from '@/lib/rbac';

export const dynamic = 'force-dynamic';

export default async function CommentsPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/auth/sign-in');
  }
  if (!hasRole(session.user?.role, 'EDITOR')) {
    redirect('/');
  }

  const comments = await prisma.comment.findMany({
    orderBy: { createdAt: 'desc' },
    include: { author: true, post: true }
  });

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-2xl font-semibold">Comments moderation</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Approve or archive comments before they go live.
        </p>
      </div>
      <div className="space-y-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="rounded-xl border border-slate-200 bg-white p-6 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-slate-900 dark:text-slate-100">
                  {comment.post.title}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {comment.author.name ?? 'Reader'} • {comment.author.email}
                </p>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {format(comment.createdAt, 'MMM dd, yyyy')}
              </span>
            </div>
            <p className="mt-3 text-slate-600 dark:text-slate-400">{comment.body}</p>
            <span className="mt-3 inline-block text-xs text-slate-500 dark:text-slate-400">
              Status: {comment.approved ? 'Approved' : 'Pending'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
