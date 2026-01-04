import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { format } from 'date-fns';

import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { hasRole } from '@/lib/rbac';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-dynamic';

export default async function SubscribersPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/auth/sign-in');
  }
  if (!hasRole(session.user?.role, 'EDITOR')) {
    redirect('/');
  }

  const subscribers = await prisma.subscriber.findMany({
    orderBy: { subscribedAt: 'desc' }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div>
          <h1 className="text-2xl font-semibold">Subscribers</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            View newsletter growth and export lists for campaigns.
          </p>
        </div>
        <Button asChild variant="outline">
          <a href="/api/subscribers/export">Export CSV</a>
        </Button>
      </div>
      <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-slate-900 dark:text-slate-400">
            <tr>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Subscribed</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((subscriber) => (
              <tr key={subscriber.id} className="border-t border-slate-200 dark:border-slate-800">
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{subscriber.email}</td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                  {format(subscriber.subscribedAt, 'MMM dd, yyyy')}
                </td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                  {subscriber.unsubscribed ? 'Unsubscribed' : 'Active'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
