import { PageHeader } from '@/components/page-header';
import { PageMain } from '@/components/page-main';

export function App() {
  return (
    <div className="relative flex flex-col min-h-dvh">
      <PageHeader className="z-100" />
      <PageMain />
    </div>
  );
}
