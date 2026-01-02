'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const schema = z.object({
  email: z.string().email('Enter a valid email')
});

type FormValues = z.infer<typeof schema>;

export function NewsletterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<FormValues>({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (values: FormValues) => {
    await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="w-full">
        <Input placeholder="you@example.com" type="email" {...register('email')} />
        {errors.email ? (
          <p className="mt-1 text-xs text-rose-500">{errors.email.message}</p>
        ) : null}
      </div>
      <Button type="submit" disabled={isSubmitting}>
        Subscribe
      </Button>
    </form>
  );
}
