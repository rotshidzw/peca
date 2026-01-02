import { NextResponse } from 'next/server';
import { z } from 'zod';

import { prisma } from '@/lib/prisma';
import { rateLimit } from '@/lib/rate-limit';

const schema = z.object({
  email: z.string().email()
});

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') ?? 'global';
  const limit = rateLimit(`newsletter:${ip}`, 5, 60_000);
  if (!limit.allowed) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const body = await request.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  const token = crypto.randomUUID();
  await prisma.subscriber.upsert({
    where: { email: parsed.data.email },
    update: { unsubscribed: false, unsubscribedAt: null },
    create: {
      email: parsed.data.email,
      token
    }
  });

  return NextResponse.json({ success: true });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');
  if (!token) {
    return NextResponse.json({ error: 'Token required' }, { status: 400 });
  }

  await prisma.subscriber.update({
    where: { token },
    data: { unsubscribed: true, unsubscribedAt: new Date() }
  });

  return NextResponse.redirect(new URL('/?unsubscribed=true', request.url));
}
