import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/shadcn/tooltip';
import { cn } from '@/utils/shadcn';
import PageLogo from '/pagelogo.svg';

export function HeaderLogo({ className }: React.ComponentProps<'a'>) {
  return (
    <Tooltip>
      <TooltipTrigger>
        <a
          href="https://www.jetbrains.com"
          target="_blank"
          rel="noopener noreferrer"
          className={cn('flex items-center gap-2 cursor-pointer select-none', className)}
        >
          <img src={PageLogo} alt="Website logo" className="size-10" />
          <span className="text-2xl font-bold text-foreground/80">
            JetBrains License Generator
          </span>
        </a>
      </TooltipTrigger>
      <TooltipContent>
        <p>Jump to JetBrains official website</p>
      </TooltipContent>
    </Tooltip>
  );
}
