import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import slugify from 'slugify';

import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { hasRole } from '@/lib/rbac';

const schema = z.object({
  title: z.string().min(5),
  excerpt: z.string().min(20),
  content: z.string().min(50),
  categoryId: z.string().min(1),
  status: z.enum(['DRAFT', 'PUBLISHED', 'SCHEDULED'])
});

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !hasRole(session.user?.role, 'EDITOR')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }

  const slugBase = slugify(parsed.data.title, { lower: true, strict: true });
  const existing = await prisma.post.findFirst({ where: { slug: { startsWith: slugBase } } });
  const slug = existing ? `${slugBase}-${Date.now()}` : slugBase;

  if (!session.user?.id) {
    return NextResponse.json({ error: 'Missing user id' }, { status: 400 });
  }

  const post = await prisma.post.create({
    data: {
      title: parsed.data.title,
      slug,
      excerpt: parsed.data.excerpt,
      content: parsed.data.content,
      status: parsed.data.status,
      publishedAt: parsed.data.status === 'PUBLISHED' ? new Date() : null,
      authorId: session.user.id,
      categoryId: parsed.data.categoryId
    }
  });

  return NextResponse.json({ id: post.id, slug: post.slug });
}
