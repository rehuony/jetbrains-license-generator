import { useEffect, useRef, useState } from 'react';
import { useLicenseStorage, useLocalStorage } from '@/hooks/use-storage';

export function DialogSetting() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isSetting = useLocalStorage(state => state.isSetting);
  const setIsSetting = useLocalStorage(state => state.setIsSetting);

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

    if (isSetting) {
      dialog.showModal();
      document.body.classList.add('overflow-hidden');
    } else {
      dialog.close();
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isSetting]);

  const handleSaveChange = () => {
    setIsSetting(false);
    setEmail(localEmail);
    setUsername(localUsername);
    setExpiryDate(localExpiryDate);
  };

  return (
    <dialog
      ref={dialogRef}
      className="fixed top-1/2 left-1/2 w-[min(90%,600px)] -translate-x-1/2 -translate-y-1/2 rounded-xl p-6 shadow-xl select-none backdrop:bg-foreground/30 backdrop:backdrop-blur-md"
    >
      <header className="flex flex-col gap-4 p-4">
        <h2 className="text-center font-mono text-2xl font-bold">
          Personalize Information
        </h2>
        <p className="font-mono text-sm leading-6 font-light">
          Set personal information for the product license here,
          which could be useful for some users.
        </p>
      </header>

      <form
        method="dialog"
        className="flex flex-col gap-4"
      >
        <div className="grid grid-cols-4 items-center gap-2">
          <label htmlFor="email" className="col-span-1 text-right font-mono">Email:</label>
          <input
            id="email"
            name="email"
            defaultValue={email}
            className="col-span-3 rounded-md border border-foreground/20 p-2 font-mono"
            onChange={event => setLocalEmail(event.target.value)}
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-2">
          <label htmlFor="username" className="col-span-1 text-right font-mono">Username:</label>
          <input
            id="username"
            name="username"
            defaultValue={username}
            className="col-span-3 rounded-md border border-foreground/20 p-2 font-mono"
            onChange={event => setLocalUsername(event.target.value)}
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-2">
          <label htmlFor="expiry" className="col-span-1 text-right font-mono">Expiry Date:</label>
          <input
            id="expiry"
            type="date"
            name="expiry"
            defaultValue={expiryDate}
            className="col-span-3 rounded-md border border-foreground/20 p-2 font-mono"
            onChange={event => setLocalExpiryDate(event.target.value)}
          />
        </div>

        <footer className="flex items-center justify-between p-2 px-12">
          <button
            type="button"
            onClick={() => setIsSetting(false)}
            className="w-48 cursor-pointer rounded-xl bg-foreground/20 px-4 py-3 font-mono shadow shadow-foreground/30 hover:bg-foreground/40"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSaveChange}
            className="w-48 cursor-pointer rounded-xl bg-foreground/40 px-4 py-3 font-mono shadow shadow-foreground/40 hover:bg-foreground/60"
          >
            Save Setting
          </button>
        </footer>
      </form>
    </dialog>
  );
}
