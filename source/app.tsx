import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PageHeader } from '@/components/page-header';
import { PageMain } from '@/components/page-main';

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col min-h-dvh">
        <PageHeader />
        <PageMain />
      </div>
    </QueryClientProvider>
  );
}
