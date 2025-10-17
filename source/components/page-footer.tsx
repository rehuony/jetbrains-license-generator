import { ArrowBigUpDash, CloudDownload, ScrollText, Settings, ShieldCheck } from 'lucide-react';
import { ButtonIcon } from '@/components/button-icon';
import { dialogDisclaimerId, dialogSettingId, dialogTutorialId } from '@/constants/dialog';
import { useProgress } from '@/hooks/use-progress';
import { openDialog } from '@/utils/dialog';
import { downloadJaNetfilter } from '@/utils/download';

export function PageFooter() {
  const progress = useProgress();

  return (
    <footer className='fixed right-0 bottom-0 z-100 -translate-x-2 -translate-y-2 bg-transparent p-2'>
      <div className='flex flex-col items-center justify-center gap-2'>
        {/* return top button */}
        {progress >= 5 && (
          <ButtonIcon onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <ArrowBigUpDash className='size-6 text-foreground' />
          </ButtonIcon>
        )}
        {/* disclaimer button */}
        <ButtonIcon onClick={() => openDialog(dialogDisclaimerId)}>
          <ShieldCheck className='size-6 text-foreground' />
        </ButtonIcon>
        {/* download button */}
        <ButtonIcon onClick={downloadJaNetfilter}>
          <CloudDownload className='size-6 text-foreground' />
        </ButtonIcon>
        {/* tutorial button */}
        <ButtonIcon onClick={() => openDialog(dialogTutorialId)}>
          <ScrollText className='size-6 text-foreground' />
        </ButtonIcon>
        {/* setting button */}
        <ButtonIcon onClick={() => openDialog(dialogSettingId)}>
          <Settings className='size-6 text-foreground' />
        </ButtonIcon>
      </div>
    </footer>
  );
}
