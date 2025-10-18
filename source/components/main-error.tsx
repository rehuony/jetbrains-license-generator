export function MainError() {
  return (
    <main className='flex h-[calc(100dvh-4.5rem)] w-full flex-col items-center justify-center gap-4 bg-background text-center text-foreground'>
      <div className='relative flex items-center justify-center'>
        <div className='flex h-14 w-14 animate-pulse items-center justify-center rounded-full border-4 border-foreground/30 dark:border-foreground/60'>
          <span className='text-3xl font-bold text-foreground/80 dark:text-foreground/90'>
            !
          </span>
        </div>
      </div>
      <div className='flex flex-col items-center gap-2'>
        <p className='text-lg font-semibold text-foreground/90 dark:text-foreground/100'>
          Failed to load data
        </p>
        <p className='text-sm text-foreground/60 dark:text-foreground/70'>
          Please check your connection or try again later.
        </p>
      </div>
    </main>
  );
}
