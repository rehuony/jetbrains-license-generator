export function MainError() {
  return (
    <main className='flex h-[calc(100dvh-4.5rem)] w-full flex-col items-center justify-center gap-4 text-center'>
      <div className='relative flex items-center justify-center'>
        <div className='flex size-14 animate-pulse items-center justify-center rounded-full border-4'>
          <span className='text-3xl font-bold'>!</span>
        </div>
      </div>
      <div className='flex flex-col items-center gap-2'>
        <p className='text-lg font-semibold'>
          Failed to load data
        </p>
        <p className='text-sm text-foreground/60'>
          Please check your connection or try again later.
        </p>
      </div>
    </main>
  );
}
