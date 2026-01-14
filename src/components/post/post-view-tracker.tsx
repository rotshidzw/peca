'use client';

import { useEffect } from 'react';

export function PostViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    fetch(`/api/posts/${slug}/view`, { method: 'POST' });
  }, [slug]);

  return null;
}
