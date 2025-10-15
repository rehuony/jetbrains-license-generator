type ThemeUnion = 'system' | 'dark' | 'light';

interface DisclaimerState {
  isDisclaim: boolean;
  setIsDisclaim: (isDisclaim: DisclaimerState['isDisclaim']) => void;
}

interface SettingState {
  isSetting: boolean;
  setIsSetting: (isShow: SettingState['isSetting']) => void;
}

interface ThemeState {
  theme: ThemeUnion;
  setTheme: (theme: ThemeState['theme']) => void;
}

interface SearchState {
  text: string;
  setText: (text: SearchState['text']) => void;
}
