import { cn } from '@/utils/utils';
import PageLogo from '/pagelogo.svg';

export function HeaderLogo({ className }: React.ComponentProps<'div'>) {
  return (
    <div className={cn('relative flex items-center gap-2 select-none', className)}>
      <img alt='Website logo' className='pointer-events-none size-10' src={PageLogo} />
      <span className='grow truncate text-2xl font-bold text-foreground sm:hidden'>
        License Generator
      </span>
      <span className='hidden grow truncate text-2xl font-bold text-foreground sm:block'>
        JetBrains License Generator
      </span>
    </div>
  );
}
