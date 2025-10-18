import { useProgress } from '@/hooks/use-progress';
import { cn } from '@/utils/utils';

export function HeaderProgress({ className }: React.ComponentProps<'div'>) {
  const progress = useProgress();

  return (
    <div className={cn('absolute bottom-0 left-0 w-full', className)}>
      <div className='relative h-full overflow-hidden bg-border'>
        <div className='h-full bg-accent transition-all duration-300 ease-out' style={{ transform: `translateX(-${100 - (progress || 0)}%)` }} />
      </div>
    </div>
  );
}
