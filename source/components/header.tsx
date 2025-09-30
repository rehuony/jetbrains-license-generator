import { HeaderLogo } from '@/components/header-logo';
import { HeaderMenu } from '@/components/header-menu';
import { cn } from '@/utils/shadcn';

export function Header({ className }: React.ComponentProps<'header'>) {
  return (
    <header className={cn('sticky p-2 top-0 w-full bg-secondary', className)}>
      {/* TODO: adapt to small size equipment */}
      <div className="flex items-center justify-between">
        <HeaderLogo />
        <HeaderMenu />
      </div>
    </header>
  );
}
