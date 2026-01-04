import Link from 'next/link';

import { cn } from '@/lib/utils';

const items = [
  { href: '/dashboard', label: 'Overview' },
  { href: '/dashboard/posts', label: 'Posts' },
  { href: '/dashboard/categories', label: 'Categories' },
  { href: '/dashboard/tags', label: 'Tags' },
  { href: '/dashboard/subscribers', label: 'Subscribers' },
  { href: '/dashboard/contacts', label: 'Contacts' },
  { href: '/dashboard/comments', label: 'Comments' }
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container grid gap-8 py-12 lg:grid-cols-[240px_1fr]">
      <aside className="space-y-3 rounded-xl border border-slate-200 bg-white p-4 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Admin navigation</p>
        <nav className="flex flex-col gap-1">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'rounded-md px-3 py-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="rounded-md bg-slate-50 p-3 text-xs text-slate-500 dark:bg-slate-800 dark:text-slate-400">
          Use the sidebar to manage editorial workflows, audience growth, and community signals.
        </div>
      </aside>
      <div className="space-y-6">{children}</div>
    </div>
  );
}
