import { Monitor, Moon, Sun } from 'lucide-react';
import { ThemeButton } from '@/components/theme-button';
import { useLocalStorage } from '@/hooks/use-storage';
import { cn } from '@/utils/utils';

export function ThemeToggle() {
  const theme = useLocalStorage(state => state.theme);
  const setTheme = useLocalStorage(state => state.setTheme);

  return (
    <div className="relative inline-grid grid-cols-3 rounded-full bg-foreground/15">
      <ThemeButton
        onClick={() => setTheme('light')}
        className={cn('bg-transparent', (theme === 'light' ? `bg-foreground/30` : ''))}
      >
        <Sun
          size={48}
          strokeWidth={4}
          absoluteStrokeWidth
          className="size-5 text-foreground"
        />
      </ThemeButton>
      <ThemeButton
        onClick={() => setTheme('system')}
        className={cn('bg-transparent', (theme === 'system' ? `bg-foreground/30` : ''))}
      >
        <Monitor
          size={48}
          strokeWidth={4}
          absoluteStrokeWidth
          className="size-5 text-foreground"
        />
      </ThemeButton>
      <ThemeButton
        onClick={() => setTheme('dark')}
        className={cn('bg-transparent', (theme === 'dark' ? `bg-foreground/30` : ''))}
      >
        <Moon
          size={48}
          strokeWidth={4}
          absoluteStrokeWidth
          className="size-5 text-foreground"
        />
      </ThemeButton>
    </div>
  );
}
