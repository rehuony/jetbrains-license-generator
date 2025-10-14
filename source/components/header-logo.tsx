import { useLocalStorage } from '@/hooks/use-storage';
import PageLogo from '/pagelogo.svg';

export function HeaderLogo() {
  const setIsSetting = useLocalStorage(state => state.setIsSetting);

  return (
    <div className="relative flex h-full items-center rounded-xl select-none">
      <button
        type="button"
        onClick={() => setIsSetting(true)}
        className="flex h-full cursor-pointer items-center gap-2 rounded-xl px-4 hover:bg-foreground/15 hover:shadow hover:shadow-foreground/15"
      >
        <img
          src={PageLogo}
          alt="Website logo"
          className="pointer-events-none size-10 min-h-10 min-w-10"
        />
        <span className="hidden text-2xl font-bold md:inline-block">
          JetBrains License Generator
        </span>
      </button>
    </div>
  );
}
