export function MainPending() {
  return (
    <main className='flex min-h-[calc(100dvh-4.5rem)] w-full flex-col items-center justify-center gap-6 text-center'>
      <div className='relative'>
        <div className='size-12 animate-spin rounded-full border-4 border-foreground/20 border-t-foreground'></div>
        <div className='absolute inset-0 size-12 animate-pulse rounded-full bg-foreground/10 blur-md'></div>
      </div>
      <p className='animate-pulse text-base tracking-wide text-foreground/70'>
        Loading data, please wait...
      </p>
    </main>
  );
}
