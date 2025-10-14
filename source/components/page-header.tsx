import { HeaderLogo } from '@/components/header-logo';
import { HeaderMenu } from '@/components/header-menu';
import { HeaderProgress } from '@/components/header-progress';

export function PageHeader() {
  return (
    <header className="sticky top-0 z-100 h-18 w-full pb-1 backdrop-blur-xl">
      {/* TODO: adapt to small size equipment */}
      <div className="flex size-full items-center justify-between">
        <HeaderLogo />
        <HeaderMenu />
      </div>
      <HeaderProgress className="absolute bottom-0" />
    </header>
  );
}
