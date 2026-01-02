import Image from 'next/image';
import Link from 'next/link';

import { NewsletterForm } from '@/components/forms/newsletter-form';
import { PostCard } from '@/components/post/post-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { getHomeData, getTrendingPosts } from '@/lib/data';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [homeData, trendingPosts] = await Promise.all([getHomeData(), getTrendingPosts()]);

  return (
    <div>
      <section className="border-b border-slate-200 py-16 dark:border-slate-800">
        <div className="container grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-6">
            <Badge variant="secondary">Global dispatch</Badge>
            <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
              Smart travel intelligence for modern publishers, explorers, and industry leaders.
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Peca Journal curates newsroom-grade reporting, cultural essays, and destination guides
              to keep your next story ahead of the curve.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <Link href="/search">Explore stories</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact">Pitch a story</Link>
              </Button>
            </div>
          </div>
          <Card className="overflow-hidden">
            <div className="relative h-64 w-full">
              <Image
                src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"
                alt="Mountain landscape"
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="space-y-3 pt-6">
              <Badge variant="secondary">Featured report</Badge>
              <h3 className="text-xl font-semibold">
                The new remote-worker corridor: 7 cities investing in creative talent
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                A behind-the-scenes look at how cities are courting journalists, designers, and
                creators with tailored residency programs.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="container space-y-6 py-16">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Featured stories</h2>
          <Button variant="ghost" asChild>
            <Link href="/search">View all</Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {homeData.featuredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      <section className="container grid gap-10 pb-16 lg:grid-cols-[1fr_0.4fr]">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Latest coverage</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {homeData.latestPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
        <aside className="space-y-6">
          <div className="rounded-xl border border-slate-200 p-6 dark:border-slate-800">
            <h3 className="text-lg font-semibold">Trending this week</h3>
            <div className="mt-4 space-y-4">
              {trendingPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/post/${post.slug}`}
                  className="block border-b border-slate-200 pb-4 text-sm font-medium text-slate-700 last:border-0 last:pb-0 dark:border-slate-800 dark:text-slate-200"
                >
                  {post.title}
                </Link>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-slate-200 p-6 dark:border-slate-800">
            <h3 className="text-lg font-semibold">Categories</h3>
            <div className="mt-4 space-y-3">
              {homeData.categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/category/${category.slug}`}
                  className="flex items-center justify-between text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                >
                  <span>{category.name}</span>
                  <span className="text-xs">{category._count.posts}</span>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section className="border-t border-slate-200 py-16 dark:border-slate-800">
        <div className="container grid gap-10 lg:grid-cols-[1fr_0.6fr]">
          <div>
            <h2 className="text-2xl font-semibold">Join 4,800+ editors and travelers</h2>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
              Receive the weekly briefing with emerging story angles, destination updates, and
              editorial data.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
}
