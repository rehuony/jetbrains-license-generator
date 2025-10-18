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
    <div className={cn(
      `relative hidden items-center rounded-full border border-border bg-surface transition-all duration-300 focus-within:ring-2 focus-within:ring-accent md:flex`,
      className,
    )}
    >
      <Search className='pointer-events-none absolute left-2 size-4 text-muted' />
      <input autoComplete='off' className='size-full rounded-full bg-transparent pr-2 pl-8 font-mono font-light text-foreground placeholder-muted selection:bg-accent/20 focus-visible:outline-none' name='search' onChange={handleChange} placeholder='search product...' value={localText} />
    </div>
  );
}
