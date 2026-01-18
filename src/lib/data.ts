import { prisma } from '@/lib/prisma';

const hasDatabaseUrl = Boolean(process.env.DATABASE_URL);

export async function getHomeData() {
  if (!hasDatabaseUrl) {
    return { featuredPosts: [], latestPosts: [], categories: [] };
  }

  const featuredPosts = await prisma.post.findMany({
    where: { status: 'PUBLISHED' },
    take: 3,
    orderBy: { publishedAt: 'desc' },
    include: { author: true, category: true, tags: { include: { tag: true } } }
  });

  const latestPosts = await prisma.post.findMany({
    where: { status: 'PUBLISHED' },
    take: 6,
    orderBy: { publishedAt: 'desc' },
    include: { author: true, category: true }
  });

  const categories = await prisma.category.findMany({
    take: 6,
    orderBy: { name: 'asc' },
    include: { _count: { select: { posts: true } } }
  });

  return { featuredPosts, latestPosts, categories };
}

export async function getTrendingPosts() {
  if (!hasDatabaseUrl) {
    return [];
  }

  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  const views = await prisma.postView.groupBy({
    by: ['postId'],
    where: { date: { gte: weekAgo } },
    _sum: { views: true },
    orderBy: { _sum: { views: 'desc' } },
    take: 5
  });

  const posts = await prisma.post.findMany({
    where: { id: { in: views.map((view) => view.postId) } },
    include: { author: true, category: true }
  });

  return posts;
}

export async function getPostBySlug(slug: string) {
  if (!hasDatabaseUrl) {
    return null;
  }

  return prisma.post.findUnique({
    where: { slug },
    include: {
      author: true,
      category: true,
      tags: { include: { tag: true } }
    }
  });
}

export async function getPostsByCategory(slug: string, page: number) {
  const pageSize = 6;
  if (!hasDatabaseUrl) {
    return { posts: [], total: 0, pageSize };
  }

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where: { category: { slug }, status: 'PUBLISHED' },
      include: { author: true, category: true },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { publishedAt: 'desc' }
    }),
    prisma.post.count({
      where: { category: { slug }, status: 'PUBLISHED' }
    })
  ]);

  return { posts, total, pageSize };
}

export async function getPostsByTag(slug: string, page: number) {
  const pageSize = 6;
  if (!hasDatabaseUrl) {
    return { posts: [], total: 0, pageSize };
  }

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where: { tags: { some: { tag: { slug } } }, status: 'PUBLISHED' },
      include: { author: true, category: true },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { publishedAt: 'desc' }
    }),
    prisma.post.count({
      where: { tags: { some: { tag: { slug } } }, status: 'PUBLISHED' }
    })
  ]);

  return { posts, total, pageSize };
}

export async function searchPosts(query: string) {
  if (!hasDatabaseUrl) {
    return [];
  }

  return prisma.post.findMany({
    where: {
      status: 'PUBLISHED',
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { excerpt: { contains: query, mode: 'insensitive' } },
        { content: { contains: query, mode: 'insensitive' } }
      ]
    },
    include: { author: true, category: true }
  });
}
