import { Header } from '@/components/page-header';
import { useGlobalStorage } from '@/hooks/use-storage';

export function App() {
  const text = useGlobalStorage(state => state.text);
  const theme = useGlobalStorage(state => state.theme);

  return (
    <div className="relative flex flex-col min-h-dvh">
      <Header />
      <div className="flex justify-center mt-10 h-1000">
        {`current theme is ${theme}, current text is |${text}|`}
      </div>
    </div>
  );
}
