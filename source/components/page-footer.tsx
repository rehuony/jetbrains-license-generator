import { ArrowBigUpDash, CloudDownload, ScrollText, Search, Settings, ShieldCheck } from 'lucide-react';
import { IconButton } from '@/components/icon-button';
import { dialogDisclaimerId, dialogSearchId, dialogSettingId, dialogTutorialId } from '@/constants/dialog';
import { useProgress } from '@/hooks/use-progress';
import { openDialog } from '@/utils/dialog';
import { downloadJaNetfilter } from '@/utils/download';
import { cn } from '@/utils/utils';

export function PageFooter() {
  const progress = useProgress();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className='fixed right-4 bottom-4 z-100 flex items-center justify-center gap-2 rounded-2xl border border-border bg-surface/60 p-2 shadow-md shadow-border/30 backdrop-blur-md transition-all duration-300 md:right-0 md:bottom-[0.6rem] md:flex-col'>
      {/* Scroll to Top */}
      <IconButton className={cn('transition-transform hover:-translate-y-[1px]', progress >= 10 ? '' : 'hidden')} onClick={scrollToTop} title='Scroll To Top'>
        <ArrowBigUpDash className='size-5 text-foreground' />
      </IconButton>
      {/* Search (mobile only) */}
      <IconButton className='transition-transform hover:-translate-y-[1px] md:hidden' onClick={() => openDialog(dialogSearchId)} title='Search Production'>
        <Search className='size-5 text-foreground' />
      </IconButton>
      {/* Disclaimer */}
      <IconButton className='transition-transform hover:-translate-y-[1px]' onClick={() => openDialog(dialogDisclaimerId)} title='Disclaimer Terms'>
        <ShieldCheck className='size-5 text-foreground' />
      </IconButton>
      {/* Download */}
      <IconButton className='transition-transform hover:-translate-y-[1px]' onClick={downloadJaNetfilter} title='Download ja-netfilter.zip'>
        <CloudDownload className='size-5 text-foreground' />
      </IconButton>
      {/* Tutorial */}
      <IconButton className='transition-transform hover:-translate-y-[1px]' onClick={() => openDialog(dialogTutorialId)} title='Product Tutorial'>
        <ScrollText className='size-5 text-foreground' />
      </IconButton>
      {/* Settings */}
      <IconButton className='transition-transform hover:-translate-y-[1px]' onClick={() => openDialog(dialogSettingId)} title='Personalize Information'>
        <Settings className='size-5 text-foreground' />
      </IconButton>
    </footer>

  );
}
