import forge from 'node-forge';
import toast from 'react-hot-toast';

export async function showNoticeCard(icon: string, title: string, message: string) {
  const hash = forge.md5.create();
  hash.update(`${title}:${message}`, 'utf8');
  const cardId = forge.util.bytesToHex(hash.digest().data);

  toast.custom(
    () => (
      <div className='flex max-w-[min(90%,_36rem)] flex-col items-center justify-center gap-2 rounded-xl border border-gray-100 bg-foreground/10 px-4 py-2 shadow-2xl backdrop-blur-sm'>
        <h2 className='flex items-center justify-center gap-2 text-xl font-bold select-none'>
          <span className='animate-slightly-rotated'>{icon}</span>
          <span>{title}</span>
        </h2>
        <div className='font-mono leading-8 break-all whitespace-normal select-none'>
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
