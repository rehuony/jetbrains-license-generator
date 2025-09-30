import { create } from 'zustand';
import { storageMiddleware } from '@/hooks/use-storage';

type GlobalState = ThemeState & SearchState;

export const globalStorage = create<GlobalState>()(
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
    'globalStorage',
  ),
);
