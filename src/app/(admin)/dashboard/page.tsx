import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { hasRole } from '@/lib/rbac';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/auth/sign-in');
  }
  if (!hasRole(session.user?.role, 'EDITOR')) {
    redirect('/');
  }

  const [posts, subscribers, comments, contacts] = await Promise.all([
    prisma.post.count(),
    prisma.subscriber.count(),
    prisma.comment.count(),
    prisma.contactMessage.count()
  ]);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-3xl font-semibold">Dashboard overview</h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Track editorial velocity, subscriber growth, and community activity in one place.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Posts</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">{posts}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Subscribers</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">{subscribers}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Comments</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">{comments}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Contacts</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">{contacts}</CardContent>
        </Card>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button asChild variant="outline">
          <a href="/api/subscribers/export">Export subscribers CSV</a>
        </Button>
        <Button asChild variant="outline">
          <a href="/profile">View profile</a>
        </Button>
        <Button asChild>
          <a href="/dashboard/posts">Review posts</a>
        </Button>
      </div>
    </div>
  );
}
