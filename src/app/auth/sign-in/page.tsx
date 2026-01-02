import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { authOptions } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default async function SignInPage() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect('/dashboard');
  }

  return (
    <div className="container flex min-h-[70vh] items-center justify-center py-16">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Welcome back</CardTitle>
          <CardDescription>Use demo credentials from the README to access the dashboard.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Button asChild>
            <Link href="/api/auth/signin">Continue to sign in</Link>
          </Button>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Authentication is powered by NextAuth with role-based access control.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
