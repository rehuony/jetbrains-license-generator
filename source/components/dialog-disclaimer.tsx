import { useEffect, useRef } from 'react';
import { dialogDisclaimerId } from '@/constants/dialog';
import { useLocalStorage } from '@/hooks/use-storage';
import { closeDialog } from '@/utils/dialog';

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
    <dialog
      ref={dialogRef}
      className='fixed top-1/2 left-1/2 max-h-[85dvh] w-[min(90%,_80rem)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl p-8 text-foreground shadow-2xl select-none [scrollbar-width:none] backdrop:bg-black/40 backdrop:backdrop-blur-md focus:outline-none [&::-webkit-scrollbar]:w-0'
      id={dialogDisclaimerId}
    >
      <header className='mb-4 flex flex-col gap-4 text-center font-mono'>
        <h2 className='text-3xl font-bold tracking-wide'>
          DISCLAIMER
        </h2>
        <p className='text-sm font-light opacity-70'>
          <span className='pr-2 font-bold'>
            Author:
          </span>
          <a href='mailto:rehuony@gmail.com'>
            rehuony@gmail.com
          </a>
        </p>
      </header>
      <form className='font-mono leading-relaxed'>
        <ol className='flex list-decimal flex-col gap-2 pl-6 leading-8 break-all whitespace-normal'>
          <li>
            <span className='pr-2 font-semibold'>Purpose:</span>
            <span className='font-normal opacity-85'>
              This project is designed solely for learning and educational
              purposes. It is intended for academic settings or personal
              practice, and not for commercial or production environments.
            </span>
          </li>
          <li>
            <span className='pr-2 font-semibold'>Accuracy:</span>
            <span className='font-normal opacity-85'>
              All information and functionalities are provided “as is” without
              warranties of any kind. The authors make no representations or
              guarantees regarding accuracy, reliability, or completeness.
            </span>
          </li>
          <li>
            <span className='pr-2 font-semibold'>Responsibility:</span>
            <span className='font-normal opacity-85'>
              The authors are not responsible for any damages, losses, or issues
              arising from the use or inability to use this project. Users assume
              full responsibility for all consequences of usage.
            </span>
          </li>
          <li>
            <span className='pr-2 font-semibold'>Third-Party Content:</span>
            <span className='font-normal opacity-85'>
              This project may include third-party libraries or resources. Their
              inclusion does not imply endorsement or responsibility for their
              contents or services.
            </span>
          </li>
          <li>
            <span className='pr-2 font-semibold'>Modification:</span>
            <span className='font-normal opacity-85'>
              You may modify this project for personal or educational purposes.
              Public or commercial redistribution is prohibited unless explicitly
              permitted by the authors.
            </span>
          </li>
          <li>
            <span className='pr-2 font-semibold'>Feedback:</span>
            <span className='font-normal opacity-85'>
              Feedback and contributions are welcome, but do not obligate the
              authors to incorporate them into future versions.
            </span>
          </li>
        </ol>
      </form>
      <footer className='mt-8 flex w-full items-center justify-center'>
        <button
          className='w-[max(25%,_8rem)] rounded-lg bg-foreground/15 px-6 py-3 font-mono text-sm font-medium shadow-md shadow-foreground/20 transition-all hover:scale-[1.02] hover:bg-foreground/25 active:scale-[0.98]'
          type='button'
          onClick={() => {
            setIsAgree(true);
            closeDialog(dialogDisclaimerId);
          }}
        >
          Agree To The Terms Above
        </button>
      </footer>
    </dialog>
  );
}
