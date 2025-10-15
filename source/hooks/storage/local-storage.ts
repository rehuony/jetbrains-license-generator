import { create } from 'zustand';
import { storageMiddleware } from '@/hooks/use-storage';

type LocalState = DisclaimerState & QuestionState & SettingState & ThemeState & SearchState;

export const localStorage = create<LocalState>()(
  storageMiddleware(
    set => ({
      text: '',
      theme: 'system',
      isSetting: false,
      isQuestion: false,
      isDisclaim: true,
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
      setIsSetting: (isSetting) => {
        set((state) => {
          state.isSetting = isSetting;
        });
      },
      setIsQuestion: (isQuestion) => {
        set((state) => {
          state.isQuestion = isQuestion;
        });
      },
      setIsDisclaim: (isDisclaim) => {
        set((state) => {
          state.isDisclaim = isDisclaim;
        });
      },
    }),
    'localStorage',
  ),
);
