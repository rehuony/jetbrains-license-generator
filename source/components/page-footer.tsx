import { ArrowBigUpDash, CloudDownload, ScrollText, Search, Settings, ShieldCheck } from 'lucide-react';
import { IconButton } from '@/components/icon-button';
import { dialogDisclaimerId, dialogSearchId, dialogSettingId, dialogTutorialId } from '@/constants/dialog';
import { useProgress } from '@/hooks/use-progress';
import { openDialog } from '@/utils/dialog';
import { downloadJaNetfilter } from '@/utils/download';

export function PageFooter() {
  const progress = useProgress();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className='fixed right-0 bottom-0 z-100 -translate-x-2 -translate-y-4 bg-transparent'>
      <div className='flex flex-col items-center justify-center gap-2'>
        {/* return top button */}
        {progress >= 10 && (
          <IconButton onClick={scrollToTop} title='Scroll To Top'>
            <ArrowBigUpDash className='size-6 text-foreground' />
          </IconButton>
        )}
        {/* search button */}
        <IconButton className='md:hidden' onClick={() => openDialog(dialogSearchId)} title='Search Production'>
          <Search className='size-6 text-foreground' />
        </IconButton>
        {/* disclaimer button */}
        <IconButton onClick={() => openDialog(dialogDisclaimerId)} title='Disclaimer Terms'>
          <ShieldCheck className='size-6 text-foreground' />
        </IconButton>
        {/* download button */}
        <IconButton onClick={downloadJaNetfilter} title='Download ja-netfilter.zip'>
          <CloudDownload className='size-6 text-foreground' />
        </IconButton>
        {/* tutorial button */}
        <IconButton onClick={() => openDialog(dialogTutorialId)} title='Product Tutorial'>
          <ScrollText className='size-6 text-foreground' />
        </IconButton>
        {/* setting button */}
        <IconButton onClick={() => openDialog(dialogSettingId)} title='Personalize Information'>
          <Settings className='size-6 text-foreground' />
        </IconButton>
      </div>
    </footer>
  );
}
