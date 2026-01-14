import Link from 'next/link';
import { format } from 'date-fns';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface NewsCardProps {
  item: {
    title: string;
    excerpt: string;
    url: string;
    image: string | null;
    publishedAt: string;
    source: string;
  };
}

export function NewsCard({ item }: NewsCardProps) {
  return (
    <Card className="overflow-hidden">
      <Link href={item.url} className="block" target={item.url.startsWith('http') ? '_blank' : undefined}>
        {item.image ? (
          <div className="h-40 w-full">
            <img src={item.image} alt={item.title} className="h-full w-full object-cover" loading="lazy" />
          </div>
        ) : null}
        <CardContent className="space-y-3 pt-6">
          <Badge variant="secondary">{item.source}</Badge>
          <h3 className="text-lg font-semibold leading-tight">{item.title}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">{item.excerpt}</p>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            {format(new Date(item.publishedAt), 'MMM dd, yyyy')}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
