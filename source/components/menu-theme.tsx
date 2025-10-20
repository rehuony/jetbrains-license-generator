import { Monitor, Moon, Sun } from 'lucide-react';
import { IconButton } from '@/components/icon-button';
import { useLocalStorage } from '@/hooks/use-storage';
import { cn } from '@/utils/utils';

export function MenuTheme({ className }: React.ComponentProps<'div'>) {
  const theme = useLocalStorage(state => state.theme);
  const setTheme = useLocalStorage(state => state.setTheme);

  return (
    <div className={cn(
      `relative grid grid-cols-3 overflow-hidden rounded-full border border-border bg-surface`,
      className,
    )}
    >
      <IconButton onClick={() => setTheme('light')}
        title='light'
        className={cn(
          'p-2',
          theme === 'light'
            ? 'bg-accent text-accent-foreground hover:bg-accent'
            : `bg-transparent text-foreground hover:bg-accent/50`,
        )}
      >
        <Sun className='size-4' />
      </IconButton>
      <IconButton onClick={() => setTheme('system')}
        title='system'
        className={cn(
          'p-2',
          theme === 'system'
            ? 'bg-accent text-accent-foreground hover:bg-accent'
            : `bg-transparent text-foreground hover:bg-accent/50`,
        )}
      >
        <Monitor className='size-4' />
      </IconButton>
      <IconButton onClick={() => setTheme('dark')}
        title='dark'
        className={cn(
          'p-2',
          theme === 'dark'
            ? 'bg-accent text-accent-foreground hover:bg-accent'
            : `bg-transparent text-foreground hover:bg-accent/50`,
        )}
      >
        <Moon className='size-4' />
      </IconButton>
    </div>
  );
}
