import { cn } from '@/utils/utils';

export function IconButton({ children, className, ...props }: React.ComponentProps<'button'>) {
  return (
    <button type='button'
      className={cn(
        `inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full bg-border/40 p-2 text-sm font-light whitespace-nowrap text-foreground transition-all outline-none hover:bg-border/60 focus-visible:outline-2 focus-visible:outline-accent/60 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4`,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
