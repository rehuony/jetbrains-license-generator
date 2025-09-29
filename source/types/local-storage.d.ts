type ThemeUnion = 'auto' | 'dark' | 'light';

interface ThemeState {
  theme: ThemeUnion;
  setTheme: (theme: ThemeState['theme']) => void;
}
