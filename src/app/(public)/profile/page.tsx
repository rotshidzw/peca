import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import { authOptions } from '@/lib/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/sign-in');
  }

  return (
    <div className="container py-16">
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>Your profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
          <p>Name: {session.user?.name ?? 'Editorial user'}</p>
          <p>Email: {session.user?.email}</p>
          <p>Role: {session.user?.role}</p>
        </CardContent>
      </Card>
    </div>
  );
}
