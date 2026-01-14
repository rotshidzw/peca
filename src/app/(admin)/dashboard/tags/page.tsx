import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { hasRole } from '@/lib/rbac';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const dynamic = 'force-dynamic';

export default async function TagsPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/auth/sign-in');
  }
  if (!hasRole(session.user?.role, 'EDITOR')) {
    redirect('/');
  }

  const tags = await prisma.tag.findMany({
    include: { _count: { select: { posts: true } } },
    orderBy: { name: 'asc' }
  });

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-2xl font-semibold">Tags</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Maintain topical tags that surface trends and storytelling themes.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {tags.map((tag) => (
          <Card key={tag.id}>
            <CardHeader>
              <CardTitle>{tag.name}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-600 dark:text-slate-400">
              <p>Slug: {tag.slug}</p>
              <p>Posts: {tag._count.posts}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
