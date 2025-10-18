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
    <dialog ref={dialogRef} className='top-1/2 left-1/2 max-h-[85dvh] w-[min(90%,_40rem)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl p-8 text-foreground shadow-2xl select-none [scrollbar-width:none] backdrop:bg-black/40 backdrop:backdrop-blur-md focus:outline-none [&::-webkit-scrollbar]:w-0' id={dialogSettingId}>
      <form className='flex flex-col gap-4 font-mono' method='dialog'>
        <header className='flex flex-col items-center gap-4 font-mono'>
          <h2 className='text-center text-3xl font-bold'>
            Personalize
          </h2>
          <p className='text-center text-sm leading-6 font-light'>
            Personalize information for the product license, which could be useful for someone.
          </p>
        </header>
        <main className='flex w-full flex-col items-center justify-center gap-4'>
          <div className='grid w-full grid-cols-[max-content_1fr] items-center gap-2'>
            <label className='min-w-[7.5rem] text-right whitespace-nowrap' htmlFor='email'>
              Email:
            </label>
            <input autoComplete='off' className='w-full rounded-md border border-foreground/20 p-2' defaultValue={email} id='email' name='email' onChange={e => setLocalEmail(e.target.value)} />
          </div>
          <div className='grid w-full grid-cols-[max-content_1fr] items-center gap-2'>
            <label className='min-w-[7.5rem] text-right whitespace-nowrap' htmlFor='username'>
              Username:
            </label>
            <input autoComplete='off' className='w-full rounded-md border border-foreground/20 p-2' defaultValue={username} id='username' name='username' onChange={e => setLocalUsername(e.target.value)} />
          </div>
          <div className='grid w-full grid-cols-[max-content_1fr] items-center gap-2'>
            <label className='min-w-[7.5rem] text-right whitespace-nowrap' htmlFor='expiry'>
              Expiry Date:
            </label>
            <input autoComplete='off' className='w-full rounded-md border border-foreground/20 p-2' defaultValue={expiryDate} id='expiry' name='expiry' onChange={e => setLocalExpiryDate(e.target.value)} type='date' />
          </div>
        </main>
        <footer className='flex items-center justify-between gap-4 font-mono'>
          <button className='w-[min(50%,_14rem)] cursor-pointer rounded-xl bg-foreground/20 px-4 py-3 shadow shadow-foreground/30 hover:bg-foreground/40' type='submit'>
            Cancel
          </button>
          <button className='w-[min(50%,_14rem)] cursor-pointer rounded-xl bg-foreground/40 px-4 py-3 shadow shadow-foreground/40 hover:bg-foreground/60'
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
