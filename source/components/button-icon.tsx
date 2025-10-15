import { cn } from '@/utils/utils';

export function ButtonIcon({ children, className, ...props }: React.ComponentProps<'button'>) {
  return (
    <button
      type="button"
      className={cn(`inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full bg-foreground/20 p-2 text-sm font-light whitespace-nowrap text-foreground transition-all outline-none hover:bg-foreground/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4`, className)}
      {...props}
    >
      {children}
    </button>
  );
}
