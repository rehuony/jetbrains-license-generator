import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { DialogDisclaimer } from '@/components/dialog-disclaimer';
import { DialogQuestion } from '@/components/dialog-question';
import { DialogSetting } from '@/components/dialog-setting';
import { PageFooter } from '@/components/page-footer';
import { PageHeader } from '@/components/page-header';
import { PageMain } from '@/components/page-main';
import { useLocalStorage } from '@/hooks/use-storage';

const queryClient = new QueryClient();

export function App() {
  const isSetting = useLocalStorage(state => state.isSetting);
  const isQuestion = useLocalStorage(state => state.isQuestion);
  const isDisclaim = useLocalStorage(state => state.isDisclaim);
  const setIsSetting = useLocalStorage(state => state.setIsSetting);
  const setIsQuestion = useLocalStorage(state => state.setIsQuestion);

  useEffect(() => {
    setIsSetting(false);
    setIsQuestion(false);
  }, [setIsSetting, setIsQuestion]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative flex min-h-dvh flex-col">
        <PageHeader />
        <PageMain />
        <PageFooter />
        {isSetting && <DialogSetting />}
        {isQuestion && <DialogQuestion />}
        {isDisclaim && <DialogDisclaimer />}
      </div>
    </QueryClientProvider>
  );
}
