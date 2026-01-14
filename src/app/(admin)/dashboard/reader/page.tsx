import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const dynamic = 'force-dynamic';

export default async function ReaderPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/auth/sign-in');
  }

  const [latestPosts, subscriber] = await Promise.all([
    prisma.post.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { publishedAt: 'desc' },
      take: 4,
      include: { category: true }
    }),
    session.user?.email
      ? prisma.subscriber.findUnique({ where: { email: session.user.email } })
      : null
  ]);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-2xl font-semibold">Reader dashboard</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Personalize your editorial digest and stay ahead of the latest coverage.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {latestPosts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-600 dark:text-slate-400">
              <p>{post.excerpt}</p>
              <p className="mt-2 text-xs text-slate-500">Category: {post.category.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Newsletter status</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-slate-600 dark:text-slate-400">
          {subscriber && !subscriber.unsubscribed
            ? 'You are subscribed to the newsroom briefing.'
            : 'Subscribe on the homepage to receive the weekly briefing.'}
        </CardContent>
      </Card>
    </div>
  );
}
