import { HeaderLogo } from '@/components/header-logo';
import { HeaderMenu } from '@/components/header-menu';
import { HeaderProgress } from '@/components/header-progress';

export function PageHeader() {
  return (
    <header className='sticky top-0 z-100 h-18 w-full pb-1 backdrop-blur-xl'>
      <div className='flex size-full items-center justify-between'>
        <HeaderLogo className='h-full rounded-xl px-2 py-4' />
        <HeaderMenu className='h-full px-2 py-4' />
      </div>
      <HeaderProgress className='h-0.5 w-full' />
    </header>
  );
}
