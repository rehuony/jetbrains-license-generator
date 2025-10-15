import { FooterDisclaimer } from '@/components/footer-disclaimer';
import { FooterDownload } from '@/components/footer-download';
import { FooterQuestion } from '@/components/footer-question';
import { FooterSetting } from '@/components/footer-setting';

export function PageFooter() {
  return (
    <footer className="fixed right-0 bottom-0 z-100 -translate-x-2 -translate-y-2 bg-transparent p-2">
      <div className="flex flex-col items-center justify-center gap-2">
        <FooterDisclaimer />
        <FooterDownload />
        <FooterQuestion />
        <FooterSetting />
      </div>
    </footer>
  );
}
