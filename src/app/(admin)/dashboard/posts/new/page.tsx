import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import { authOptions } from '@/lib/auth';
import { hasRole } from '@/lib/rbac';
import { prisma } from '@/lib/prisma';
import { PostForm } from '@/components/forms/post-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const dynamic = 'force-dynamic';

export default async function NewPostPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/auth/sign-in');
  }
  if (!hasRole(session.user?.role, 'EDITOR')) {
    redirect('/');
  }

  const categories = await prisma.category.findMany({ orderBy: { name: 'asc' } });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create new post</CardTitle>
      </CardHeader>
      <CardContent>
        <PostForm categories={categories} />
      </CardContent>
    </Card>
  );
}
