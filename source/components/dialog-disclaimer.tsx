import { useEffect, useRef } from 'react';
import { dialogDisclaimerId } from '@/constants/dialog';
import { useLocalStorage } from '@/hooks/use-storage';

export function DialogDisclaimer() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isAgree = useLocalStorage(state => state.isAgree);
  const setIsAgree = useLocalStorage(state => state.setIsAgree);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (!isAgree && !dialog.open) {
      dialog.showModal();
      dialog.focus({ preventScroll: true });
      document.body.classList.add('overflow-hidden');
    }
  }, [isAgree]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && dialog.open) {
        event.stopPropagation();
        event.preventDefault();
      }
    };

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

    dialog.addEventListener('keydown', handleKeyDown);
    dialog.addEventListener('close', handleCloseModal);
    return () => {
      dialog.removeEventListener('keydown', handleKeyDown);
      dialog.removeEventListener('close', handleCloseModal);
      observer.disconnect();
    };
  }, []);

  return (
    <dialog ref={dialogRef} className='absolute top-1/2 left-1/2 max-h-[85dvh] w-[min(90%,_50rem)] animate-dialog-in overflow-y-auto rounded-2xl bg-surface p-8 text-foreground shadow-2xl ring-1 ring-border select-none [scrollbar-width:none] backdrop:bg-surface/40 backdrop:backdrop-blur-md focus:outline-none' id={dialogDisclaimerId}>
      <form className='flex flex-col gap-6 font-mono' method='dialog'>
        <header className='flex flex-col items-center gap-2 text-center'>
          <h2 className='text-3xl font-bold tracking-wide text-foreground'>
            DISCLAIMER
          </h2>
          <p className='text-sm font-light text-muted'>
            <span className='pr-2 font-semibold'>Author:</span>
            <a className='text-accent hover:underline' href='mailto:rehuony@gmail.com'>
              rehuony@gmail.com
            </a>
          </p>
        </header>
        <ol className='flex list-decimal flex-col gap-3 pl-6 leading-8 text-foreground/80'>
          <li>
            <span className='pr-2 font-semibold'>Purpose:</span>
            This project is for learning and educational purposes only; not for commercial use.
          </li>
          <li>
            <span className='pr-2 font-semibold'>Accuracy:</span>
            All information is provided as is without warranties; no guarantees on completeness
            or reliability.
          </li>
          <li>
            <span className='pr-2 font-semibold'>Responsibility:</span>
            Authors are not liable for any damages or issues from use; users
            assume full responsibility.
          </li>
          <li>
            <span className='pr-2 font-semibold'>Third-Party Content:</span>
            Third-party libraries/resources may be included. Their inclusion does not imply
            endorsement or responsibility.
          </li>
          <li>
            <span className='pr-2 font-semibold'>Modification:</span>
            You may modify for personal/educational purposes. Public or commercial redistribution
            requires explicit permission.
          </li>
          <li>
            <span className='pr-2 font-semibold'>Feedback:</span>
            Contributions are welcome but do not obligate authors to implement them.
          </li>
        </ol>
        <footer className='flex w-full justify-center'>
          <button className='w-[min(50%,_24rem)] min-w-fit cursor-pointer rounded-lg bg-accent/80 px-6 py-3 text-sm font-medium text-accent-foreground shadow-md shadow-accent/60 transition-all duration-150 hover:scale-[1.02] hover:bg-accent active:scale-[0.98]' onClick={() => setIsAgree(true)} type='submit'>
            Agree To The Terms Above
          </button>
        </footer>
      </form>
    </dialog>

  );
}
