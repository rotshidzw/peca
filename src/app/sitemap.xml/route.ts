import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  const siteUrl = 'https://peca-journal.example.com';
  const posts = await prisma.post.findMany({
    where: { status: 'PUBLISHED' },
    select: { slug: true, updatedAt: true }
  });

  const urls = posts
    .map(
      (post) =>
        `<url><loc>${siteUrl}/post/${post.slug}</loc><lastmod>${post.updatedAt.toISOString()}</lastmod></url>`
    )
    .join('');

  const body = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml' }
  });
}
