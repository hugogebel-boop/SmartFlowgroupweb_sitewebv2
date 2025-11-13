import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-60 sm:text-base',
  {
    variants: {
      variant: {
        default:
          'bg-sf-accent text-white shadow-soft hover:bg-sf-accent/90 focus-visible:outline-sf-accent/60',
        outline:
          'border border-sf-text/15 bg-white/70 text-sf-text backdrop-blur hover:border-sf-accent/40 hover:text-sf-accent focus-visible:outline-sf-accent/40',
        ghost:
          'bg-transparent text-sf-text hover:bg-sf-text/5 focus-visible:outline-sf-accent/40',
        link: 'text-sf-accent underline-offset-4 hover:underline focus-visible:outline-sf-accent/40',
      },
      size: {
        sm: 'h-9 rounded-lg px-4 text-sm',
        md: 'h-11 rounded-xl px-5 text-sm sm:text-base',
        lg: 'h-12 rounded-xl px-6 text-base',
        icon: 'h-10 w-10 rounded-xl p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { buttonVariants };
