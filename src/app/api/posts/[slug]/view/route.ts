import { NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

export async function POST(_: Request, { params }: { params: { slug: string } }) {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug }
  });

  if (!post) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  await prisma.postView.upsert({
    where: { postId_date: { postId: post.id, date: today } },
    update: { views: { increment: 1 } },
    create: { postId: post.id, date: today, views: 1 }
  });

  return NextResponse.json({ success: true });
}
