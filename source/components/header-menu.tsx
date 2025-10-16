import { SearchInput } from '@/components/search-input';
import { ThemeToggle } from '@/components/theme-toggle';

export function HeaderMenu() {
  return (
    <div className='flex h-full items-center justify-center gap-2 p-4'>
      <SearchInput />
      <ThemeToggle />
    </div>
  );
}
