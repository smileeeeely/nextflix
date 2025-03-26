import * as React from 'react';

import { cn } from '@/lib/utils';

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'border-input placeholder:text-muted-foreground flex min-h-[100px] w-full rounded-md border bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-[16px]',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
