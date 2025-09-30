type ThemeUnion = 'system' | 'dark' | 'light';

interface ThemeState {
  theme: ThemeUnion;
  setTheme: (theme: ThemeState['theme']) => void;
}
