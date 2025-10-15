import { useEffect, useRef } from 'react';
import { useLocalStorage } from '@/hooks/use-storage';

export function DialogQuestion() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isQuestion = useLocalStorage(state => state.isQuestion);
  const setIsQuestion = useLocalStorage(state => state.setIsQuestion);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isQuestion) {
      dialog.showModal();
      document.body.classList.add('overflow-hidden');
    } else {
      dialog.close();
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isQuestion]);

  return (
    <dialog
      ref={dialogRef}
      className="fixed top-1/2 left-1/2 max-h-[85dvh] w-[min(90%,700px)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl p-8 text-foreground shadow-2xl select-none backdrop:bg-black/40 backdrop:backdrop-blur-md"
    >
      <header className="mb-4 flex flex-col gap-4 text-center">
        <h2 className="font-mono text-3xl font-bold tracking-wide">
          Tutorial
        </h2>
        <p className="text-sm font-light opacity-70">
          <span className="pr-2 font-bold">
            Author:
          </span>
          <a href="mailto:rehuony@gmail.com" className="underline">
            rehuony@gmail.com
          </a>
        </p>
      </header>

      <form method="dialog" className="font-mono text-sm leading-relaxed">
        <ol className="flex list-decimal flex-col gap-4 pl-6 leading-6 text-pretty break-words">
          <li>
            <span className="pr-2 font-semibold">Purpose:</span>
            <span className="font-normal opacity-85">
              This project is designed solely for learning and educational
              purposes. It is intended for academic settings or personal
              practice, and not for commercial or production environments.
            </span>
          </li>
          <li>
            <span className="pr-2 font-semibold">Accuracy:</span>
            <span className="font-normal opacity-85">
              All information and functionalities are provided “as is” without
              warranties of any kind. The authors make no representations or
              guarantees regarding accuracy, reliability, or completeness.
            </span>
          </li>

          <li>
            <span className="pr-2 font-semibold">Responsibility:</span>
            <span className="font-normal opacity-85">
              The authors are not responsible for any damages, losses, or issues
              arising from the use or inability to use this project. Users assume
              full responsibility for all consequences of usage.
            </span>
          </li>

          <li>
            <span className="pr-2 font-semibold">Third-Party Content:</span>
            <span className="font-normal opacity-85">
              This project may include third-party libraries or resources. Their
              inclusion does not imply endorsement or responsibility for their
              contents or services.
            </span>
          </li>

          <li>
            <span className="pr-2 font-semibold">Modification:</span>
            <span className="font-normal opacity-85">
              You may modify this project for personal or educational purposes.
              Public or commercial redistribution is prohibited unless explicitly
              permitted by the authors.
            </span>
          </li>

          <li>
            <span className="pr-2 font-semibold">Feedback:</span>
            <span className="font-normal opacity-85">
              Feedback and contributions are welcome, but do not obligate the
              authors to incorporate them into future versions.
            </span>
          </li>
        </ol>
      </form>

      <footer className="mt-8 flex w-full items-center justify-center">
        <button
          type="button"
          onClick={() => setIsQuestion(false)}
          className="rounded-lg bg-foreground/15 px-6 py-3 font-mono text-sm font-medium shadow-md shadow-foreground/20 transition-all hover:scale-[1.02] hover:bg-foreground/25 active:scale-[0.98]"
        >
          Agree to the terms above
        </button>
      </footer>
    </dialog>
  );
}
