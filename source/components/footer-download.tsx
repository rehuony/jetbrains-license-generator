import { CloudDownload } from 'lucide-react';
import { ButtonIcon } from '@/components/button-icon';
import { downloadJaNetfilter } from '@/utils/download';

export function FooterDownload() {
  return (
    <ButtonIcon onClick={downloadJaNetfilter}>
      <CloudDownload
        size={48}
        strokeWidth={4}
        absoluteStrokeWidth
        className="size-6 text-foreground"
      />
    </ButtonIcon>
  );
}
