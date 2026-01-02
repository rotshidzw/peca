'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Enter a valid email'),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Message should be detailed')
});

type FormValues = z.infer<typeof schema>;

export function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<FormValues>({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (values: FormValues) => {
    await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input placeholder="Full name" {...register('name')} />
        {errors.name ? <p className="mt-1 text-xs text-rose-500">{errors.name.message}</p> : null}
      </div>
      <div>
        <Input placeholder="you@example.com" type="email" {...register('email')} />
        {errors.email ? <p className="mt-1 text-xs text-rose-500">{errors.email.message}</p> : null}
      </div>
      <div>
        <Input placeholder="Subject" {...register('subject')} />
        {errors.subject ? <p className="mt-1 text-xs text-rose-500">{errors.subject.message}</p> : null}
      </div>
      <div>
        <Textarea placeholder="Tell us about your project or question" {...register('message')} />
        {errors.message ? (
          <p className="mt-1 text-xs text-rose-500">{errors.message.message}</p>
        ) : null}
      </div>
      <Button type="submit" disabled={isSubmitting}>
        Send message
      </Button>
    </form>
  );
}
