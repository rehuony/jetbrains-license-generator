import { Header } from '@/components/header';
import { useGlobalStorage } from '@/hooks/use-storage';

export function App() {
  const theme = useGlobalStorage(state => state.theme);

  return (
    <div className="relative flex flex-col min-h-dvh">
      <Header className="" />
      <div className="flex justify-center mt-10 h-1000">
        {`current theme is ${theme}`}
      </div>
    </div>
  );
}
