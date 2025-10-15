import { Monitor, Moon, Sun } from 'lucide-react';
import { ButtonIcon } from '@/components/button-icon';
import { useLocalStorage } from '@/hooks/use-storage';
import { cn } from '@/utils/utils';

export function ThemeToggle() {
  const theme = useLocalStorage(state => state.theme);
  const setTheme = useLocalStorage(state => state.setTheme);

  return (
    <div className="relative inline-grid grid-cols-3 rounded-full bg-foreground/15">
      <ButtonIcon
        onClick={() => setTheme('light')}
        className={cn('bg-transparent', (theme === 'light' ? `bg-foreground/30` : ''))}
      >
        <Sun
          size={48}
          strokeWidth={4}
          absoluteStrokeWidth
          className="size-5 text-foreground"
        />
      </ButtonIcon>
      <ButtonIcon
        onClick={() => setTheme('system')}
        className={cn('bg-transparent', (theme === 'system' ? `bg-foreground/30` : ''))}
      >
        <Monitor
          size={48}
          strokeWidth={4}
          absoluteStrokeWidth
          className="size-5 text-foreground"
        />
      </ButtonIcon>
      <ButtonIcon
        onClick={() => setTheme('dark')}
        className={cn('bg-transparent', (theme === 'dark' ? `bg-foreground/30` : ''))}
      >
        <Moon
          size={48}
          strokeWidth={4}
          absoluteStrokeWidth
          className="size-5 text-foreground"
        />
      </ButtonIcon>
    </div>
  );
}
