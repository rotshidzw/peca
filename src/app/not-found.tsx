import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="container flex min-h-[70vh] flex-col items-center justify-center gap-4 py-16 text-center">
      <h1 className="text-4xl font-semibold">Page not found</h1>
      <p className="max-w-xl text-sm text-slate-500 dark:text-slate-400">
        The page you’re looking for doesn’t exist yet. Try browsing the latest stories or return
        home.
      </p>
      <Button asChild>
        <Link href="/">Back to home</Link>
      </Button>
    </div>
  );
}
