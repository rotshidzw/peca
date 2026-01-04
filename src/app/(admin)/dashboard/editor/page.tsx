import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { hasRole } from '@/lib/rbac';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const dynamic = 'force-dynamic';

export default async function EditorPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/auth/sign-in');
  }
  if (!hasRole(session.user?.role, 'EDITOR')) {
    redirect('/dashboard');
  }

  const [drafts, scheduled, pendingComments] = await Promise.all([
    prisma.post.count({ where: { status: 'DRAFT' } }),
    prisma.post.count({ where: { status: 'SCHEDULED' } }),
    prisma.comment.count({ where: { approved: false } })
  ]);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-2xl font-semibold">Editor workspace</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Stay on top of drafts, scheduled stories, and moderation queues.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Drafts</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">{drafts}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Scheduled</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">{scheduled}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pending comments</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">{pendingComments}</CardContent>
        </Card>
      </div>
    </div>
  );
}
