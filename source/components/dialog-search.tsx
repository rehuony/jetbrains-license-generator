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
    <dialog ref={dialogRef} className='top-1/2 left-1/2 max-h-[85dvh] w-[min(90%,_50rem)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl p-8 text-foreground shadow-2xl select-none [scrollbar-width:none] backdrop:bg-black/40 backdrop:backdrop-blur-md focus:outline-none [&::-webkit-scrollbar]:w-0' id={dialogSearchId}>
      <form className='flex flex-col gap-4 font-mono' method='dialog'>
        <header className='relative flex items-center justify-center font-mono'>
          <h2 className='text-center text-2xl font-bold'>
            Search Production
          </h2>
          <IconButton className='absolute top-0 right-0 translate-x-1/2 -translate-y-1/2' type='submit'>
            <X className='pointer-events-none size-4 min-h-4 min-w-4' />
          </IconButton>
        </header>
        <main className='relative flex h-12 w-full items-center justify-center p-2'>
          <Search className='pointer-events-none absolute left-0 size-6 min-h-6 min-w-6 translate-x-1/2' />
          <input autoComplete='off' className='size-full rounded-full bg-transparent px-2 pl-8 font-mono text-foreground/60 tabular-nums ring ring-foreground/60 selection:bg-foreground/20 placeholder:select-none focus-visible:outline-2 focus-visible:outline-foreground/60' name='search' onChange={handleChange} placeholder='search product...' value={localText} />
        </main>
        <footer>
          <p className='text-center text-sm font-light opacity-70'>
            Enter the product name you want to query in the input box above
          </p>
        </footer>
      </form>
    </dialog>
  );
}
