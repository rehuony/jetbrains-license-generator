import { HeaderLogo } from '@/components/header-logo';
import { HeaderMenu } from '@/components/header-menu';
import { HeaderProgress } from '@/components/header-progress';
import { cn } from '@/utils/shadcn';

export function PageHeader({ className }: React.ComponentProps<'header'>) {
  return (
    <header className={cn('sticky top-0 w-full bg-secondary z-50', className)}>
      {/* TODO: adapt to small size equipment */}
      <div className="flex items-center justify-between p-3">
        <HeaderLogo />
        <HeaderMenu />
      </div>
      <HeaderProgress />
    </header>
  );
}
