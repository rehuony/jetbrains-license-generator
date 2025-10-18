export function MainPending() {
  return (
    <main className='flex min-h-[calc(100dvh-4.5rem)] w-full flex-col items-center justify-center gap-6 bg-background text-center text-foreground'>
      <div className='relative'>
        <div className='h-12 w-12 animate-spin rounded-full border-4 border-foreground/20 border-t-foreground/70 dark:border-foreground/30 dark:border-t-foreground/90' />
        <div className='absolute inset-0 h-12 w-12 animate-pulse rounded-full bg-foreground/10 blur-md dark:bg-foreground/20' />
      </div>
      <p className='animate-pulse text-base tracking-wide text-foreground/70 dark:text-foreground/60'>
        Loading data, please wait...
      </p>
    </main>
  );
}
