import Link from 'next/link';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/auth';
import { hasRole } from '@/lib/rbac';
import { cn } from '@/lib/utils';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role ?? 'READER';

  const items = [
    { href: '/dashboard', label: 'Overview', show: true },
    { href: '/dashboard/reader', label: 'Reader', show: true },
    { href: '/dashboard/editor', label: 'Editor', show: hasRole(role, 'EDITOR') },
    { href: '/dashboard/admin', label: 'Admin', show: hasRole(role, 'ADMIN') },
    { href: '/dashboard/posts', label: 'Posts', show: hasRole(role, 'EDITOR') },
    { href: '/dashboard/categories', label: 'Categories', show: hasRole(role, 'EDITOR') },
    { href: '/dashboard/tags', label: 'Tags', show: hasRole(role, 'EDITOR') },
    { href: '/dashboard/subscribers', label: 'Subscribers', show: hasRole(role, 'EDITOR') },
    { href: '/dashboard/contacts', label: 'Contacts', show: hasRole(role, 'EDITOR') },
    { href: '/dashboard/comments', label: 'Comments', show: hasRole(role, 'EDITOR') },
    { href: '/dashboard/users', label: 'Users', show: hasRole(role, 'ADMIN') }
  ];

  return (
    <div className="container grid gap-8 py-12 lg:grid-cols-[240px_1fr]">
      <aside className="space-y-3 rounded-xl border border-slate-200 bg-white p-4 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Admin navigation</p>
        <nav className="flex flex-col gap-1">
          {items
            .filter((item) => item.show)
            .map((item) => (
              <Link
                key={item.href}
                href={{ pathname: item.href }}
                className={cn(
                  'rounded-md px-3 py-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100'
                )}
              >
                {item.label}
              </Link>
            ))}
        </nav>
        <div className="rounded-md bg-slate-50 p-3 text-xs text-slate-500 dark:bg-slate-800 dark:text-slate-400">
          Role: <span className="font-semibold uppercase">{role}</span>. Use the sidebar to manage
          your workflows.
        </div>
      </aside>
      <div className="space-y-6">{children}</div>
    </div>
  );
}
