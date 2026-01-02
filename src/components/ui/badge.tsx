import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border border-slate-200 px-2.5 py-0.5 text-xs font-semibold text-slate-900 transition-colors dark:border-slate-800 dark:text-slate-100',
  {
    variants: {
      variant: {
        default: 'bg-white dark:bg-slate-950',
        secondary: 'bg-slate-100 dark:bg-slate-800'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
