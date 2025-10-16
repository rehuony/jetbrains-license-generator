import { create } from 'zustand';
import { storageMiddleware } from '@/hooks/use-storage';

type LocalState = DisclaimerState & ThemeState & SearchState;

export const localStorage = create<LocalState>()(
  storageMiddleware(
    set => ({
      text: '',
      theme: 'system',
      isAgree: false,
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
    }),
    'localStorage',
  ),
);
