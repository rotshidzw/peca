'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';

export function ShareActions({ slug }: { slug: string }) {
  const url = `https://peca-journal.example.com/post/${slug}`;

  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="outline" onClick={() => navigator.clipboard.writeText(url)}>
        Copy link
      </Button>
      <Button variant="ghost" asChild>
        <Link href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`}>
          Share on X
        </Link>
      </Button>
    </div>
  );
}
