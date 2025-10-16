import { useEffect, useRef } from 'react';
import { dialogTutorialId } from '@/constants/dialog';
import { closeDialog } from '@/utils/dialog';

export function DialogTutorial() {
  const dialogRef = useRef<HTMLDialogElement>(null);

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
    <dialog
      ref={dialogRef}
      className='fixed top-1/2 left-1/2 max-h-[85dvh] w-[min(90%,_80rem)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl p-8 text-foreground shadow-2xl select-none [scrollbar-width:none] backdrop:bg-black/40 backdrop:backdrop-blur-md focus:outline-none [&::-webkit-scrollbar]:w-0'
      id={dialogTutorialId}
    >
      <header className='mb-4 flex flex-col gap-4 text-center font-mono'>
        <h2 className='text-3xl font-bold tracking-wide'>
          Tutorial
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
            <span className='pr-2 font-semibold'>Download:</span>
            <span className='font-normal opacity-85'>
              Click the download button to download the ja-netfilter.zip file.
            </span>
          </li>
          <li>
            <span className='pr-2 font-semibold'>Unzip the Package:</span>
            <span className='font-normal opacity-85'>
              Extract ja-netfilter.zip into your desired directory, for example: /path/to/ja-netfilter
            </span>
          </li>
          <li>
            <span className='pr-2 font-semibold'>Check Configuration Files:</span>
            <span className='font-normal opacity-85'>
              Verify that the content under the result section in ja-netfilter/config-jetbrains/power.conf
              matches the configuration provided on this website. If the values differ for any reason,
              replace the original content with the following:
            </span>
            <span className='block select-text'>
              xxxxxxxxxxxxxxxxxx
            </span>
          </li>
          <li>
            <span className='pr-2 font-semibold'>Modify VM Options:</span>
            <span className='font-normal opacity-85'>
              Open the target IDE’s /bin directory. For example: /Applications/CLion.app/Contents/bin.
              Edit the corresponding VM options file, such as clion.vmoptions, and append the following
              lines:
            </span>
            <code className='block select-text'>
              -javaagent:/path/to/ja-netfilter.jar=jetbrains
              <br />
              --add-opens=java.base/jdk.internal.org.objectweb.asm=ALL-UNNAMED
              <br />
              --add-opens=java.base/jdk.internal.org.objectweb.asm.tree=ALL-UNNAMED
            </code>
          </li>
          <li>
            <span className='pr-2 font-semibold'>Activate Product License:</span>
            <span className='font-normal opacity-85'>
              After completing the steps above, restart your IDE and open the activation window.
              Copy the corresponding license key from this website and paste it into the
              activation field, then click Activate button.
            </span>
          </li>
          <li>
            <span className='pr-2 font-semibold'>Enjoy Coding:</span>
            <span className='font-normal opacity-85'>
              Congratulations! 🎉 You’re now ready to enjoy a smooth coding experience.
            </span>
          </li>
        </ol>
      </form>
      <footer className='mt-8 flex w-full items-center justify-center font-mono'>
        <button
          className='w-[max(25%,_8rem)] rounded-lg bg-foreground/15 px-6 py-3 text-sm font-medium shadow-md shadow-foreground/20 transition-all hover:scale-[1.02] hover:bg-foreground/25 active:scale-[0.98]'
          onClick={() => closeDialog(dialogTutorialId)}
          type='button'
        >
          Close This Page
        </button>
      </footer>
    </dialog>
  );
}
