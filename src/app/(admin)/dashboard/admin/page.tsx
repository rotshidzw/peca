import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { hasRole } from '@/lib/rbac';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/auth/sign-in');
  }
  if (!hasRole(session.user?.role, 'ADMIN')) {
    redirect('/dashboard');
  }

  const [users, posts, categories, tags] = await Promise.all([
    prisma.user.count(),
    prisma.post.count(),
    prisma.category.count(),
    prisma.tag.count()
  ]);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-2xl font-semibold">Admin control center</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Governance, data stewardship, and operational controls.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">{users}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Posts</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">{posts}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">{categories}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Tags</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">{tags}</CardContent>
        </Card>
      </div>
    </div>
  );
}
