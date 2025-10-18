import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useLocalStorage } from '@/hooks/use-storage';
import { cn, debounce } from '@/utils/utils';

export function MenuSearch({ className }: React.ComponentProps<'div'>) {
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
    <div className={cn('relative hidden items-center md:flex', className)}>
      <Search className='pointer-events-none absolute size-4 min-h-4 min-w-4 translate-x-1/2' />
      <input autoComplete='off' className='size-full rounded-full bg-transparent px-2 pl-8 font-mono font-light text-foreground/60 tabular-nums ring ring-foreground/60 selection:bg-foreground/20 placeholder:select-none focus-visible:outline-2 focus-visible:outline-foreground/60' name='search' onChange={handleChange} placeholder='search product...' value={localText} />
    </div>
  );
}
