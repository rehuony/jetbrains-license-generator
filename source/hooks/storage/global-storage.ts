import { create } from 'zustand';
import { storageMiddleware } from '@/hooks/use-storage';

type GlobalState = ThemeState;

export const globalStorage = create<GlobalState>()(
  storageMiddleware(
    set => ({
      theme: 'auto',
      setTheme: (theme) => {
        set((state) => {
          state.theme = theme;
        });
      },
    }),
    'globalStorage',
  ),
);
