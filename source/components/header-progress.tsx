import { useProgress } from '@/hooks/use-progress';
import { cn } from '@/utils/utils';

export function HeaderProgress({ className }: React.ComponentProps<'div'>) {
  const progress = useProgress();

  return (
    <div className={cn('h-0.5 w-full bg-foreground/20', className)}>
      <div className='relative size-full overflow-hidden bg-transparent'>
        <div
          className='size-full flex-1 bg-foreground/80 transition-all'
          style={{ transform: `translateX(-${100 - (progress || 0)}%)` }}
        />
      </div>
    </div>
  );
}
