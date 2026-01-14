'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const schema = z.object({
  title: z.string().min(5),
  excerpt: z.string().min(20),
  content: z.string().min(50),
  categoryId: z.string().min(1),
  status: z.enum(['DRAFT', 'PUBLISHED', 'SCHEDULED'])
});

type FormValues = z.infer<typeof schema>;

interface PostFormProps {
  categories: { id: string; name: string }[];
}

export function PostForm({ categories }: PostFormProps) {
  const [message, setMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { status: 'DRAFT' }
  });

  const onSubmit = async (values: FormValues) => {
    setMessage(null);
    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    });

    if (!response.ok) {
      setMessage('Unable to create post. Check your inputs and try again.');
      return;
    }

    setMessage('Post created. Refresh the posts list to see it.');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input placeholder="Post title" {...register('title')} />
        {errors.title ? <p className="mt-1 text-xs text-rose-500">{errors.title.message}</p> : null}
      </div>
      <div>
        <Textarea placeholder="Short excerpt" {...register('excerpt')} />
        {errors.excerpt ? (
          <p className="mt-1 text-xs text-rose-500">{errors.excerpt.message}</p>
        ) : null}
      </div>
      <div>
        <Textarea placeholder="Markdown content" className="min-h-[200px]" {...register('content')} />
        {errors.content ? (
          <p className="mt-1 text-xs text-rose-500">{errors.content.message}</p>
        ) : null}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <select
            className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
            {...register('categoryId')}
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.categoryId ? (
            <p className="mt-1 text-xs text-rose-500">{errors.categoryId.message}</p>
          ) : null}
        </div>
        <div>
          <select
            className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
            {...register('status')}
          >
            <option value="DRAFT">Draft</option>
            <option value="PUBLISHED">Published</option>
            <option value="SCHEDULED">Scheduled</option>
          </select>
          {errors.status ? <p className="mt-1 text-xs text-rose-500">{errors.status.message}</p> : null}
        </div>
      </div>
      {message ? <p className="text-xs text-slate-500 dark:text-slate-400">{message}</p> : null}
      <Button type="submit" disabled={isSubmitting}>
        Create post
      </Button>
    </form>
  );
}
