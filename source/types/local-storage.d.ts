type ThemeUnion = 'system' | 'dark' | 'light';

interface DisclaimerState {
  isAgree: boolean;
  setIsAgree: (isAgree: DisclaimerState['isAgree']) => void;
}

interface ThemeState {
  theme: ThemeUnion;
  setTheme: (theme: ThemeState['theme']) => void;
}

interface SearchState {
  text: string;
  setText: (text: SearchState['text']) => void;
}
