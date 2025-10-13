import { create } from 'zustand';
import { storageMiddleware } from '@/hooks/use-storage';

type LocalState = ThemeState & SearchState;

export const localStorage = create<LocalState>()(
  storageMiddleware(
    set => ({
      text: '',
      theme: 'system',
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
    }),
    'localStorage',
  ),
);
