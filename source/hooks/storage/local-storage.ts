import { create } from 'zustand';
import { storageMiddleware } from '@/hooks/use-storage';

type LocalState = DisclaimerState & SettingState & ThemeState & SearchState;

export const localStorage = create<LocalState>()(
  storageMiddleware(
    set => ({
      text: '',
      theme: 'system',
      isAgree: false,
      isSetting: false,
      setText: (text) => {
        set((state) => {
          state.text = text;
        });
      },
      setTheme: (theme) => {
        set((state) => {
          state.theme = theme;
        });
      },
      setIsAgree: (isAgree) => {
        set((state) => {
          state.isAgree = isAgree;
        });
      },
      setIsSetting: (isSetting) => {
        set((state) => {
          state.isSetting = isSetting;
        });
      },
    }),
    'localStorage',
  ),
);
