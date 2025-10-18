import { Monitor, Moon, Sun } from 'lucide-react';
import { IconButton } from '@/components/icon-button';
import { useLocalStorage } from '@/hooks/use-storage';
import { cn } from '@/utils/utils';

export function MenuTheme({ className }: React.ComponentProps<'div'>) {
  const theme = useLocalStorage(state => state.theme);
  const setTheme = useLocalStorage(state => state.setTheme);

  return (
    <div className={cn('relative grid grid-cols-3 bg-foreground/15', className)}>
      {/* light theme */}
      <IconButton className={cn('bg-transparent p-2.5', (theme === 'light' ? `bg-foreground/30` : ''))} onClick={() => setTheme('light')}>
        <Sun className='size-4 text-foreground' />
      </IconButton>
      {/* system theme */}
      <IconButton className={cn('bg-transparent p-0.5', (theme === 'system' ? `bg-foreground/30` : ''))} onClick={() => setTheme('system')}>
        <Monitor className='size-4 text-foreground' />
      </IconButton>
      {/* dark theme */}
      <IconButton className={cn('bg-transparent p-0.5', (theme === 'dark' ? `bg-foreground/30` : ''))} onClick={() => setTheme('dark')}>
        <Moon className='size-4 text-foreground' />
      </IconButton>
    </div>
  );
}
