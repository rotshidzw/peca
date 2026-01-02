'use client';

import { useEffect } from 'react';

import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container flex min-h-[70vh] flex-col items-center justify-center gap-4 py-16 text-center">
      <h1 className="text-3xl font-semibold">Something went wrong</h1>
      <p className="max-w-xl text-sm text-slate-500 dark:text-slate-400">
        We’re logging the error and will investigate quickly. Please try again.
      </p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
