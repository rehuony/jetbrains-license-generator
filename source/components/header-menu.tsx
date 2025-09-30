import { SearchInput } from '@/components/search-input';
import { ThemeToggle } from '@/components/theme-toggle';

export function HeaderMenu() {
  return (
    <div className="relative flex items-center gap-4">
      <SearchInput />
      <ThemeToggle />
    </div>
  );
}
