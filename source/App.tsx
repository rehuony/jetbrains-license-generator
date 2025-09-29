import { useGlobalStorage } from './hooks/use-storage';
import reactLogo from '/react.svg';
import viteLogo from '/vite.svg';

function App() {
  const theme = useGlobalStorage(state => state.theme);
  const setTheme = useGlobalStorage(state => state.setTheme);

  const handleClick = () => setTheme(theme === 'auto' ? 'dark' : theme === 'dark' ? 'light' : 'auto');

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center text-center gap-6">
      <div className="flex gap-8">
        <a
          href="https://vite.dev"
          target="_blank"
          rel="noreferrer noopener"
        >
          <img
            src={viteLogo}
            alt="Vite logo"
            className="w-28 h-28 transition-[filter] duration-300 hover:drop-shadow-[0_0_2em_#646cffaa]"
          />
        </a>
        <a
          href="https://react.dev"
          target="_blank"
          rel="noreferrer noopener"
        >
          <img
            src={reactLogo}
            alt="React logo"
            className="w-28 h-28 transition-[filter] duration-300 hover:drop-shadow-[0_0_2em_#61dafbaa] motion-safe:animate-[spin_20s_linear_infinite]"
          />
        </a>
      </div>
      <h1 className="text-5xl font-bold">Vite + React</h1>
      <div className="p-8">
        <button
          type="button"
          onClick={handleClick}
          className="px-4 py-2 cursor-pointer rounded border-1 border-transparent bg-gray-100 hover:border-1 hover:border-purple-400 transition duration-200"
        >
          {`Theme is ${theme}`}
        </button>
        <p className="mt-4 font-light text-md">
          Edit
          <span className="text-sm px-1 text-gray-600">src/App.tsx</span>
          and save to test HMR
        </p>
      </div>
      <p className="text-gray-400">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
