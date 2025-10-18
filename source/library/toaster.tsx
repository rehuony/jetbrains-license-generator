import forge from 'node-forge';
import toast from 'react-hot-toast';

export async function showNoticeCard(icon: string, title: string, message: string) {
  const hash = forge.md5.create();
  hash.update(`${title}:${message}`, 'utf8');
  const cardId = forge.util.bytesToHex(hash.digest().data);

  toast.custom(
    () => (
      <div className='flex max-w-[min(90%,_36rem)] flex-col items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 py-3 text-foreground shadow-2xl backdrop-blur-md transition-all duration-300'>
        <h2 className='flex items-center justify-center gap-2 text-lg font-semibold text-foreground select-none'>
          <span className='animate-slightly-rotated text-accent'>{icon}</span>
          <span>{title}</span>
        </h2>
        <div className='text-center font-mono leading-7 break-all whitespace-normal text-muted select-none'>
          {message}
        </div>
      </div>
    ),
    {
      id: cardId,
      duration: Infinity,
    },
  );

  setTimeout(() => {
    toast.remove(cardId);
  }, 3000);
}
