import { Monitor, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/shadcn/button';
import { useGlobalStorage } from '@/hooks/use-storage';
import { cn } from '@/utils/shadcn';

export function ThemeToggle() {
  const theme = useGlobalStorage(state => state.theme);
  const setTheme = useGlobalStorage(state => state.setTheme);

  return (
    <div className="relative inline-grid grid-cols-3 rounded-full overflow-hidden bg-secondary-foreground/10">
      <Button
        onClick={() => setTheme('light')}
        className={cn('rounded-full bg-transparent hover:bg-accent-foreground/15', (theme === 'light' ? 'bg-accent-foreground/15' : ''))}
      >
        <Sun
          size={48}
          strokeWidth={4}
          absoluteStrokeWidth
          className="text-foreground/80"
        />
      </Button>
      <Button
        onClick={() => setTheme('system')}
        className={cn('rounded-full bg-transparent hover:bg-accent-foreground/15', (theme === 'system' ? 'bg-accent-foreground/15' : ''))}
      >
        <Monitor
          size={48}
          strokeWidth={4}
          absoluteStrokeWidth
          className="text-foreground/80"
        />
      </Button>
      <Button
        onClick={() => setTheme('dark')}
        className={cn('rounded-full bg-transparent hover:bg-accent-foreground/15', (theme === 'dark' ? 'bg-accent-foreground/15' : ''))}
      >
        <Moon
          size={48}
          strokeWidth={4}
          absoluteStrokeWidth
          className="text-foreground/80"
        />
      </Button>
    </div>
  );
}
