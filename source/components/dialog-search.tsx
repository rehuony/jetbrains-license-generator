import { Search, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { IconButton } from '@/components/icon-button';
import { dialogSearchId } from '@/constants/dialog';
import { useLocalStorage } from '@/hooks/use-storage';
import { debounce } from '@/utils/utils';

export function DialogSearch() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const text = useLocalStorage(state => state.text);
  const setText = useLocalStorage(state => state.setText);

  const [localText, setLocalText] = useState(text);

  const debounceSetText = useMemo(() => debounce((text: string) => {
    setText(text);
  }, 500), [setText]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setLocalText(text);
    debounceSetText(text);
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleShowModal = () => {
      dialog.focus({ preventScroll: true });
      document.body.classList.add('overflow-hidden');
    };

    const handleCloseModal = () => {
      document.body.classList.remove('overflow-hidden');
    };

    const observer = new MutationObserver(() => {
      if (dialog.open) handleShowModal();
      else handleCloseModal();
    });
    observer.observe(dialog, { attributes: true, attributeFilter: ['open'] });

    dialog.addEventListener('close', handleCloseModal);
    return () => {
      dialog.removeEventListener('close', handleCloseModal);
      observer.disconnect();
    };
  }, []);

  return (
    <dialog ref={dialogRef} className='absolute top-1/2 left-1/2 max-h-[85dvh] w-[min(90%,_40rem)] animate-dialog-in overflow-y-auto rounded-2xl bg-surface p-8 text-foreground shadow-2xl ring-1 ring-border select-none [scrollbar-width:none] backdrop:bg-surface/40 backdrop:backdrop-blur-md focus:outline-none' id={dialogSearchId}>
      <form className='flex flex-col gap-6 font-mono' method='dialog'>
        <header className='relative flex items-center justify-center'>
          <h2 className='text-2xl font-bold tracking-wide text-foreground'>
            Search Production
          </h2>
          <IconButton className='absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 text-muted transition-colors hover:text-accent' type='submit'>
            <X className='pointer-events-none size-4' />
          </IconButton>
        </header>
        <main className='relative flex h-12 w-full items-center justify-center p-2'>
          <Search className='pointer-events-none absolute left-3 size-5 text-muted' />
          <input autoComplete='off' className='size-full rounded-full bg-surface px-10 py-2 text-foreground/80 ring-1 ring-border transition-all duration-150 selection:bg-accent/20 placeholder:text-muted/60 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none' name='search' onChange={handleChange} placeholder='search product...' value={localText} />
        </main>
        <footer>
          <p className='text-center text-sm font-light text-muted'>
            Enter the product name you want to query in the input box above
          </p>
        </footer>
      </form>
    </dialog>

  );
}
