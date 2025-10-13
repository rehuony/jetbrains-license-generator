import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Input } from '@/components/shadcn/input';
import { useLocalStorage } from '@/hooks/use-storage';
import { debounce } from '@/utils/utils';

export function SearchInput() {
  const text = useLocalStorage(state => state.text);
  const setText = useLocalStorage(state => state.setText);

  const [localText, setLocalText] = useState(text);

  const debounceSetText = useMemo(() => debounce((text: string) => {
    setText(text);
  }, 500), [setText]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setLocalText(text);
    debounceSetText(text);
  };

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
        value={localText}
        placeholder="search product..."
        onChange={handleChange}
        className="pl-8 font-mono font-light tabular-nums"
      />
    </div>
  );
}
