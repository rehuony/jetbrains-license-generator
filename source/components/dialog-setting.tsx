import { useEffect, useRef, useState } from 'react';
import { dialogSettingId } from '@/constants/dialog';
import { useLicenseStorage } from '@/hooks/use-storage';
import { showNoticeCard } from '@/library/toaster';

export function DialogSetting() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const email = useLicenseStorage(state => state.email);
  const username = useLicenseStorage(state => state.username);
  const expiryDate = useLicenseStorage(state => state.expiryDate);
  const setEmail = useLicenseStorage(state => state.setEmail);
  const setUsername = useLicenseStorage(state => state.setUsername);
  const setExpiryDate = useLicenseStorage(state => state.setExpiryDate);

  // Used to save new data
  const [localEmail, setLocalEmail] = useState(email);
  const [localUsername, setLocalUsername] = useState(username);
  const [localExpiryDate, setLocalExpiryDate] = useState(expiryDate);

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
    <dialog ref={dialogRef} className='absolute top-1/2 left-1/2 max-h-[85dvh] w-[min(90%,_40rem)] animate-dialog-in overflow-y-auto rounded-2xl bg-surface p-8 text-foreground shadow-2xl ring-1 ring-border select-none [scrollbar-width:none] backdrop:bg-surface/40 backdrop:backdrop-blur-md focus:outline-none' id={dialogSettingId}>
      <form className='flex flex-col gap-6 font-mono' method='dialog'>
        <header className='flex flex-col items-center gap-2'>
          <h2 className='text-3xl font-bold tracking-wide text-foreground'>
            Personalize
          </h2>
          <p className='text-center text-sm leading-6 font-light text-muted'>
            Personalize information for the product license, which could be useful for someone.
          </p>
        </header>
        <main className='flex w-full flex-col gap-4'>
          {[
            { id: 'email', label: 'Email:', value: localEmail, setter: setLocalEmail },
            { id: 'username', label: 'Username:', value: localUsername, setter: setLocalUsername },
            { id: 'expiry', label: 'Expiry Date:', value: localExpiryDate, setter: setLocalExpiryDate, type: 'date' },
          ].map(field => (
            <div key={field.id} className='grid w-full grid-cols-[max-content_1fr] items-center gap-2'>
              <label className='min-w-[7.5rem] text-right whitespace-nowrap text-foreground/70' htmlFor={field.id}>
                {field.label}
              </label>
              <input autoComplete='off' className='w-full rounded-md border border-border bg-surface px-3 py-2 text-foreground transition-colors duration-150 placeholder:text-muted focus:ring-2 focus:ring-accent focus:outline-none' defaultValue={field.value} id={field.id} name={field.id} onChange={e => field.setter(e.target.value)} type={field.type || 'text'} />
            </div>
          ))}
        </main>
        <footer className='flex items-center justify-between gap-4'>
          <button className='w-[min(50%,_14rem)] min-w-fit cursor-pointer rounded-xl bg-foreground/20 px-4 py-3 shadow shadow-foreground/30 transition-colors duration-150 hover:bg-foreground/30' type='submit'>
            Cancel
          </button>
          <button className='w-[min(50%,_14rem)] min-w-fit cursor-pointer rounded-xl bg-accent px-4 py-3 text-accent-foreground shadow shadow-accent/60 transition-colors duration-150 hover:bg-accent/70'
            type='submit'
            onClick={() => {
              setEmail(localEmail);
              setUsername(localUsername);
              setExpiryDate(localExpiryDate);
              showNoticeCard('🎉', 'Success', 'Successfully applied the new settings');
            }}
          >
            Save
          </button>
        </footer>
      </form>
    </dialog>

  );
}
