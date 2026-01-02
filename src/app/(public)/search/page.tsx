'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface SearchResult {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  category: { name: string; slug: string };
}

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    const handler = setTimeout(async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }
      const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
      const data = await response.json();
      setResults(data.results);
    }, 400);

    return () => clearTimeout(handler);
  }, [query]);

  const highlighted = useMemo(() => query.trim().toLowerCase(), [query]);

  const highlightText = (text: string) => {
    if (!highlighted) return text;
    const parts = text.split(new RegExp(`(${highlighted})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === highlighted ? (
        <mark key={index} className="rounded bg-amber-200 px-1 text-slate-900">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="container space-y-6 py-16">
      <div>
        <h1 className="text-3xl font-semibold">Search the newsroom</h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Explore stories across titles, excerpts, and full editorial content.
        </p>
      </div>
      <Input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search by topic, destination, or trend"
      />
      <div className="space-y-4">
        {results.map((result) => (
          <Link
            key={result.id}
            href={`/post/${result.slug}`}
            className="block rounded-xl border border-slate-200 p-5 transition hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-700"
          >
            <Badge variant="secondary">{result.category.name}</Badge>
            <h2 className="mt-3 text-lg font-semibold">{highlightText(result.title)}</h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              {highlightText(result.excerpt)}
            </p>
          </Link>
        ))}
        {query && results.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">No results found.</p>
        ) : null}
      </div>
    </div>
  );
}
