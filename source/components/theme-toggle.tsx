import { Monitor, Moon, Sun } from 'lucide-react';
import { ButtonIcon } from '@/components/button-icon';
import { useLocalStorage } from '@/hooks/use-storage';
import { cn } from '@/utils/utils';

export function ThemeToggle() {
  const theme = useLocalStorage(state => state.theme);
  const setTheme = useLocalStorage(state => state.setTheme);

  return (
    <div className='relative inline-grid grid-cols-3 rounded-full bg-foreground/15'>
      {/* light theme */}
      <ButtonIcon className={cn('bg-transparent p-2.5', (theme === 'light' ? `bg-foreground/30` : ''))} onClick={() => setTheme('light')}>
        <Sun className='size-4 text-foreground' />
      </ButtonIcon>
      {/* system theme */}
      <ButtonIcon className={cn('bg-transparent p-0.5', (theme === 'system' ? `bg-foreground/30` : ''))} onClick={() => setTheme('system')}>
        <Monitor className='size-4 text-foreground' />
      </ButtonIcon>
      {/* dark theme */}
      <ButtonIcon className={cn('bg-transparent p-0.5', (theme === 'dark' ? `bg-foreground/30` : ''))} onClick={() => setTheme('dark')}>
        <Moon className='size-4 text-foreground' />
      </ButtonIcon>
    </div>
  );
}
