import clipboard from 'clipboardy';
import forge from 'node-forge';
import { useCallback } from 'react';
import { toast } from 'sonner';
import { useCertificateStorage, useLicenseStorage, useLocalStorage } from '@/hooks/use-storage';
import { cn } from '@/utils/shadcn';
import { convertPemToString, generateLicenseId, isProductMatch } from '@/utils/utils';

export function CardPlugin(props: PluginDataItem) {
  const text = useLocalStorage(state => state.text);
  const email = useLicenseStorage(state => state.email);
  const username = useLicenseStorage(state => state.username);
  const expiryDate = useLicenseStorage(state => state.expiryDate);
  const publicPem = useCertificateStorage(state => state.publicPem);
  const privatePem = useCertificateStorage(state => state.privatePem);

  const copyPluginLicense = useCallback(async () => {
    const licenseId = generateLicenseId();
    const productInfo = Array.from(props.code.split(',')).map((code) => {
      return {
        code,
        paidUpTo: expiryDate,
        fallbackDate: expiryDate,
      };
    });
    const licensePartString = JSON.stringify({
      licenseId,
      licenseeName: username,
      assigneeName: username,
      assigneeEmail: email,
      licenseRestriction: '',
      checkConcurrentUse: false,
      products: productInfo,
      trial: false,
      aiAllowed: true,
      gracePeriodDays: 7,
      autoProlongated: true,
      isAutoProlongated: true,
      hash: '41472961/0:1563609451',
      metadata: '0120230102PPAA013009',
    });

    const licensePartBase64 = window.btoa(licensePartString);

    const md = forge.md.sha1.create();
    md.update(licensePartString, 'utf8');

    const privateKey = forge.pki.privateKeyFromPem(privatePem);
    const signatureBytes = privateKey.sign(md);
    const sigResultsBase64 = forge.util.encode64(signatureBytes);

    const publicPemString = convertPemToString(publicPem);
    // eslint-disable-next-line style/max-len
    const pluginLicense = `${licenseId}-${licensePartBase64}-${sigResultsBase64}-${publicPemString}`;

    await clipboard.write(pluginLicense);
    toast(`successfully copy ${props.name}'s license`);
  }, [email, expiryDate, privatePem, props.code, props.name, publicPem, username]);

  return (
    <article className={cn('w-5/6 rounded-lg shadow-xl bg-card-foreground/5 shadow-card-foreground/20 select-none', isProductMatch(props.name, text) ? '' : 'hidden')}>
      <header className="flex items-center justify-between px-4 border-b-1">
        <span className="size-16 translate-y-1/2">
          <img src={props.icon} alt={`${props.name}'s logo`} className="size-full no-drag" />
        </span>
        <span className="text-sm text-card-foreground/50 rounded-full border cursor-pointer hover:text-card-foreground/80 hover:border-ring">
          <a href={props.link} target="_blank" rel="noopener noreferrer" className="block px-8 py-2 ">
            official
          </a>
        </span>
      </header>
      <section className="flex flex-col gap-8 px-4 pt-8 pb-4">
        <span className="text-2xl font-mono font-light truncate translate-y-1/2">
          {props.name}
        </span>
        <span className="relative text-left text-sm text-wrap wrap-anywhere group">
          <span className="text-card-foreground/50 group-hover:invisible">
            {'*'.repeat(126)}
          </span>
          <span onClick={copyPluginLicense} className="invisible absolute left-0 top-0 flex items-center justify-center size-full rounded-full font-light text-card-foreground/80 group-hover:visible group-hover:bg-card-foreground/10">
            Copy to clipboard
          </span>
        </span>
      </section>
    </article>
  );
}
