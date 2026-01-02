import { prisma } from '@/lib/prisma';

export async function GET() {
  const subscribers = await prisma.subscriber.findMany({
    where: { unsubscribed: false },
    select: { email: true, subscribedAt: true }
  });

  const rows = ['email,subscribedAt', ...subscribers.map((s) => `${s.email},${s.subscribedAt.toISOString()}`)];

  return new Response(rows.join('\n'), {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="subscribers.csv"'
    }
  });
}
