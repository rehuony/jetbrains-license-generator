import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { Download } from 'lucide-react';
import { ButtonIcon } from '@/components/button-icon';
import { resource } from '@/constants/resource';

export function FooterDownload() {
  const handleDownload = async () => {
    const zip = new JSZip();

    for (const filePath of resource) {
      const data = await fetch(`/${filePath}`).then(res => res.blob());
      zip.file(filePath.replace('ja-netfilter/', ''), data);
    }

    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, 'ja-netfilter.zip');
  };

  return (
    <ButtonIcon onClick={handleDownload}>
      <Download
        size={48}
        strokeWidth={4}
        absoluteStrokeWidth
        className="size-6 text-foreground"
      />
    </ButtonIcon>
  );
}
