import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { DialogDisclaimer } from '@/components/dialog-disclaimer';
import { DialogSetting } from '@/components/dialog-setting';
import { PageHeader } from '@/components/page-header';
import { PageMain } from '@/components/page-main';
import { useLocalStorage } from '@/hooks/use-storage';

const queryClient = new QueryClient();

export function App() {
  const isSetting = useLocalStorage(state => state.isSetting);
  const isDisclaim = useLocalStorage(state => state.isDisclaim);
  const setIsSetting = useLocalStorage(state => state.setIsSetting);

  useEffect(() => {
    setIsSetting(false);
  }, [setIsSetting]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-dvh flex-col">
        <PageHeader />
        <PageMain />
        {isSetting && <DialogSetting />}
        {isDisclaim && <DialogDisclaimer />}
      </div>
    </QueryClientProvider>
  );
}
