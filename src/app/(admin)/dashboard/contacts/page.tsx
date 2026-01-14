import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { format } from 'date-fns';

import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { hasRole } from '@/lib/rbac';

export const dynamic = 'force-dynamic';

export default async function ContactsPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/auth/sign-in');
  }
  if (!hasRole(session.user?.role, 'EDITOR')) {
    redirect('/');
  }

  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-2xl font-semibold">Contact submissions</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Review inbound pitches and route them to the right desk.
        </p>
      </div>
      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className="rounded-xl border border-slate-200 bg-white p-6 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-slate-900 dark:text-slate-100">{message.subject}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {message.name} • {message.email}
                </p>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {format(message.createdAt, 'MMM dd, yyyy')}
              </span>
            </div>
            <p className="mt-3 text-slate-600 dark:text-slate-400">{message.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
