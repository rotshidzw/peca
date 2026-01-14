import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { hasRole } from '@/lib/rbac';
import { Badge } from '@/components/ui/badge';

export const dynamic = 'force-dynamic';

export default async function UsersPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/auth/sign-in');
  }
  if (!hasRole(session.user?.role, 'ADMIN')) {
    redirect('/dashboard');
  }

  const users = await prisma.user.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-2xl font-semibold">User access</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Manage roles and oversee access across the newsroom.
        </p>
      </div>
      <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-slate-900 dark:text-slate-400">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t border-slate-200 dark:border-slate-800">
                <td className="px-4 py-3 text-slate-900 dark:text-slate-100">
                  {user.name ?? 'Unnamed'}
                </td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{user.email}</td>
                <td className="px-4 py-3">
                  <Badge variant="secondary">{user.role}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
