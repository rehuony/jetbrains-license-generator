import { MenuSearch } from '@/components/menu-search';
import { MenuTheme } from '@/components/menu-theme';
import { cn } from '@/utils/utils';

export function HeaderMenu({ className }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('flex items-center justify-center gap-2', className)}>
      <MenuSearch className='h-full w-full flex-1 rounded-xl border border-border bg-surface/60 text-foreground placeholder-muted' />
      <MenuTheme className='flex-shrink-0 rounded-full border border-border bg-surface/60 hover:bg-accent/40 hover:text-accent-foreground' />
    </div>
  );
}
