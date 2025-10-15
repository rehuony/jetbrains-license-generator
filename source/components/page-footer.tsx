import { FooterDownload } from '@/components/footer-download';

export function PageFooter() {
  return (
    <footer className="fixed right-0 bottom-0 z-100 -translate-x-4 -translate-y-4 bg-transparent p-2">
      <div className="flex flex-col items-center justify-center gap-2">
        <FooterDownload />
      </div>
    </footer>
  );
}
