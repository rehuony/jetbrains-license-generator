import { MenuSearch } from '@/components/menu-search';
import { MenuTheme } from '@/components/menu-theme';
import { cn } from '@/utils/utils';

export function HeaderMenu({ className }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('flex items-center justify-center gap-2', className)}>
      <MenuSearch className='h-full w-full flex-1 rounded-xl' />
      <MenuTheme className='flex-shrink-0 rounded-full' />
    </div>
  );
}
