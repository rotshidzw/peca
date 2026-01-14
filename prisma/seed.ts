import { PrismaClient, Role, PostStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';
import slugify from 'slugify';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('password123', 10);

  const [admin, editor, reader] = await Promise.all([
    prisma.user.upsert({
      where: { email: 'admin@peca.dev' },
      update: { passwordHash, role: Role.ADMIN, name: 'Avery Admin' },
      create: {
        email: 'admin@peca.dev',
        name: 'Avery Admin',
        role: Role.ADMIN,
        passwordHash
      }
    }),
    prisma.user.upsert({
      where: { email: 'editor@peca.dev' },
      update: { passwordHash, role: Role.EDITOR, name: 'Ellis Editor' },
      create: {
        email: 'editor@peca.dev',
        name: 'Ellis Editor',
        role: Role.EDITOR,
        passwordHash
      }
    }),
    prisma.user.upsert({
      where: { email: 'reader@peca.dev' },
      update: { passwordHash, role: Role.READER, name: 'Riley Reader' },
      create: {
        email: 'reader@peca.dev',
        name: 'Riley Reader',
        role: Role.READER,
        passwordHash
      }
    })
  ]);

  const categories = await prisma.category.createMany({
    data: [
      { name: 'Field Notes', slug: 'field-notes' },
      { name: 'Cultural Dispatch', slug: 'cultural-dispatch' },
      { name: 'City Lab', slug: 'city-lab' },
      { name: 'Travel Intelligence', slug: 'travel-intelligence' },
      { name: 'Sustainability', slug: 'sustainability' }
    ],
    skipDuplicates: true
  });

  const tags = await prisma.tag.createMany({
    data: [
      { name: 'Expedition', slug: 'expedition' },
      { name: 'Remote Work', slug: 'remote-work' },
      { name: 'Boutique Hotels', slug: 'boutique-hotels' },
      { name: 'Food Trails', slug: 'food-trails' },
      { name: 'Climate', slug: 'climate' }
    ],
    skipDuplicates: true
  });

  const categoryList = await prisma.category.findMany();
  const tagList = await prisma.tag.findMany();

  const postSeed = Array.from({ length: 10 }).map((_, index) => {
    const title = `Dispatch ${index + 1}: Editorial insights from emerging travel hubs`;
    return {
      title,
      slug: slugify(title, { lower: true, strict: true }),
      excerpt:
        'A newsroom-ready briefing on destination shifts, cultural openings, and editorial angles for the week.',
      content:
        '## The signal\n\nEditors are seeing a rise in creator-led itineraries across secondary cities. \n\n## What it means\n\nBrands are prioritizing long-stay partnerships and local storytelling. \n\n### Action items\n\n- Map new city desks for 2024 coverage.\n- Identify cross-border reporting teams.\n- Build community guides with resident voices.',
      status: PostStatus.PUBLISHED,
      publishedAt: new Date(Date.now() - index * 86_400_000),
      coverImage:
        'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80',
      authorId: index % 2 === 0 ? admin.id : editor.id,
      categoryId: categoryList[index % categoryList.length].id
    };
  });

  for (const post of postSeed) {
    const created = await prisma.post.upsert({
      where: { slug: post.slug },
      update: post,
      create: post
    });

    const tagSlice = tagList.slice(0, 2);
    await prisma.postTag.createMany({
      data: tagSlice.map((tag) => ({ postId: created.id, tagId: tag.id })),
      skipDuplicates: true
    });
  }

  await prisma.subscriber.upsert({
    where: { email: 'subscriber@peca.dev' },
    update: { unsubscribed: false },
    create: { email: 'subscriber@peca.dev', token: crypto.randomUUID() }
  });

  await prisma.contactMessage.create({
    data: {
      name: 'Jordan Traveller',
      email: 'jordan@example.com',
      subject: 'Story pitch: Alpine coworking retreats',
      message: 'We are launching a new coworking retreat in the Alps and would love editorial coverage.'
    }
  });

  console.log({ categories, tags, admin: admin.email, editor: editor.email, reader: reader.email });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
