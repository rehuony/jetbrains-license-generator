import { useEffect } from 'react';
import { useLocalStorage } from '@/hooks/use-storage';

interface Props {
  children: React.ReactNode;
}

const allThemes: UnionToTuple<ThemeUnion> = ['system', 'dark', 'light'];

export function ThemeProvider({ children }: Props) {
  const theme = useLocalStorage(state => state.theme);

  useEffect(() => {
    const root = document.documentElement;

    const updateTheme = () => {
      let nextTheme: ThemeUnion = theme;

      if (nextTheme === 'system') {
        nextTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      // remove all old classnames
      root.classList.remove(...allThemes);
      // reset new classname
      root.classList.add(nextTheme);
    };

    const themeListener = () => {
      theme === 'system' && updateTheme();
    };

    // monitoring changes in the theme state
    updateTheme();

    // monitoring changes in the system theme
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    mediaQuery.addEventListener('change', themeListener);
    return () => mediaQuery.removeEventListener('change', themeListener);
  }, [theme]);

  return <>{children}</>;
}
