'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

type FormValues = z.infer<typeof schema>;

export function SignInForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? '/dashboard';
  const [error, setError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (values: FormValues) => {
    setError(null);
    const result = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl
    });

    if (result?.error) {
      setError('Invalid credentials. Use the demo logins from the README.');
      return;
    }

    if (result?.url) {
      window.location.href = result.url;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input placeholder="you@example.com" type="email" {...register('email')} />
        {errors.email ? <p className="mt-1 text-xs text-rose-500">{errors.email.message}</p> : null}
      </div>
      <div>
        <Input placeholder="Password" type="password" {...register('password')} />
        {errors.password ? (
          <p className="mt-1 text-xs text-rose-500">{errors.password.message}</p>
        ) : null}
      </div>
      {error ? <p className="text-xs text-rose-500">{error}</p> : null}
      <Button type="submit" disabled={isSubmitting} className="w-full">
        Continue to sign in
      </Button>
    </form>
  );
}
