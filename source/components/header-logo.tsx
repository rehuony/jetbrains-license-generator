import PageLogo from '/pagelogo.svg';

export function HeaderLogo() {
  return (
    <div className="relative flex h-full items-center gap-2 rounded-xl px-4 select-none">
      <img
        src={PageLogo}
        alt="Website logo"
        className="pointer-events-none size-10 min-h-10 min-w-10"
      />
      <span className="hidden text-2xl font-bold md:inline-block">
        JetBrains License Generator
      </span>
    </div>
  );
}
