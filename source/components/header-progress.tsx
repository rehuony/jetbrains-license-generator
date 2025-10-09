import { Progress } from '@/components/shadcn/progress';
import { useProgress } from '@/hooks/use-progress';
import { cn } from '@/utils/shadcn';

export function HeaderProgress({ className }: React.ComponentProps<'div'>) {
  const progress = useProgress();

  return <Progress value={progress} className={cn('h-0.5 rounded-none', className)} />;
}
