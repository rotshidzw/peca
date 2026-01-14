'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { Menu } from 'lucide-react';
import { useState } from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/layout/theme-toggle';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Categories', href: '/category/field-notes' },
  { name: 'Tags', href: '/tag/expedition' },
  { name: 'Search', href: '/search' },
  { name: 'Contact', href: '/contact' }
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-semibold">
          Peca Journal
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100',
                pathname === item.href && 'text-slate-900 dark:text-slate-100'
              )}
            >
              {item.name}
            </Link>
          ))}
          {session ? (
            <>
              <Button variant="outline" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button variant="ghost" onClick={() => signOut({ callbackUrl: '/' })}>
                Sign out
              </Button>
            </>
          ) : (
            <Button variant="outline" asChild>
              <Link href="/auth/sign-in">Sign in</Link>
            </Button>
          )}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(!open)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
      {open ? (
        <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden dark:border-slate-800 dark:bg-slate-950">
          <div className="flex flex-col gap-3">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100',
                  pathname === item.href && 'text-slate-900 dark:text-slate-100'
                )}
                onClick={() => setOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {session ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                  onClick={() => setOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  type="button"
                  className="text-left text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                  onClick={() => signOut({ callbackUrl: '/' })}
                >
                  Sign out
                </button>
              </>
            ) : (
              <Link
                href="/auth/sign-in"
                className="text-sm font-medium text-slate-600 transition-colors hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                onClick={() => setOpen(false)}
              >
                Sign in
              </Link>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}
