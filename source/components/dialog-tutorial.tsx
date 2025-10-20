import { useEffect, useRef } from 'react';
import { CodeViewport } from '@/components/code-viewport';
import { dialogTutorialId } from '@/constants/dialog';
import { useCertificateStorage } from '@/hooks/use-storage';

export function DialogTutorial() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const powerConf = useCertificateStorage(state => state.conf);
  const vmOptions = useCertificateStorage(state => state.vmoptions);

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
    <dialog ref={dialogRef} className='absolute top-1/2 left-1/2 max-h-[85dvh] w-[min(90%,_50rem)] animate-dialog-in overflow-y-auto rounded-2xl bg-surface p-8 text-foreground shadow-2xl ring-1 ring-border select-none [scrollbar-width:none] backdrop:bg-surface/40 backdrop:backdrop-blur-md focus:outline-none' id={dialogTutorialId}>
      <form className='flex flex-col gap-6 font-mono' method='dialog'>
        <header className='flex flex-col items-center gap-2 text-center'>
          <h2 className='text-3xl font-bold tracking-wide text-foreground'>
            Tutorial
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
            <span className='pr-2 font-semibold'>Download:</span>
            Click the download button to download the ja-netfilter.zip file.
          </li>
          <li>
            <span className='pr-2 font-semibold'>Unzip the Package:</span>
            Extract ja-netfilter.zip into your desired directory, e.g., /path/to/ja-netfilter
          </li>
          <li>
            <span className='pr-2 font-semibold'>Check Configuration Files:</span>
            Verify the content under the result section in ja-netfilter/config-jetbrains/power.conf
            matches the website-provided configuration.
            <CodeViewport code={powerConf} language='power.conf' />
          </li>
          <li>
            <span className='pr-2 font-semibold'>Modify VM Options:</span>
            Open the target product’s /bin directory, edit the corresponding VM options file
            (e.g., clion.vmoptions), and append the required lines.
            <CodeViewport code={vmOptions} language='clion.vmoptions' />
          </li>
          <li>
            <span className='pr-2 font-semibold'>Activate Product License:</span>
            Restart your IDE, open the activation window, paste the license key, and click activate
            button.
          </li>
          <li>
            <span className='pr-2 font-semibold'>Enjoy Coding:</span>
            🎉 You’re ready to enjoy a smooth coding experience.
          </li>
        </ol>
        <footer className='flex w-full justify-center'>
          <button className='w-[min(50%,_24rem)] min-w-fit cursor-pointer rounded-lg bg-accent/80 px-6 py-3 text-sm font-medium text-accent-foreground shadow-md shadow-accent/60 transition-all duration-150 hover:scale-[1.02] hover:bg-accent active:scale-[0.98]' type='submit'>
            Close This Page
          </button>
        </footer>
      </form>
    </dialog>

  );
}
