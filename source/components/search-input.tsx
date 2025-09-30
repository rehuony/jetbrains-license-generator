import { Search } from 'lucide-react';
import { Input } from '@/components/shadcn/input';
import { useGlobalStorage } from '@/hooks/use-storage';

export function SearchInput() {
  const text = useGlobalStorage(state => state.text);
  const setText = useGlobalStorage(state => state.setText);

  return (
    <div className="relative inline-flex items-center rounded-md50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 outline-none">
      <Search
        size={48}
        strokeWidth={4}
        absoluteStrokeWidth
        className="absolute text-foreground/80 translate-x-1/2"
      />
      <Input
        name="search-input"
        value={text}
        placeholder="search product..."
        onChange={event => setText(event.target.value)}
        className="pl-8 font-mono font-light tabular-nums"
      />
    </div>
  );
}
