import clipboard from 'clipboardy';
import forge from 'node-forge';
import { useCallback } from 'react';
import { useCertificateStorage, useLicenseStorage, useLocalStorage } from '@/hooks/use-storage';
import { showNoticeCard } from '@/library/toaster';
import { convertPemToString, generateLicenseId } from '@/utils/license';
import { cn, isProductMatch } from '@/utils/utils';

export function ProductCard(props: IDEDataItem | PluginDataItem) {
  const text = useLocalStorage(state => state.text);
  const email = useLicenseStorage(state => state.email);
  const username = useLicenseStorage(state => state.username);
  const expiryDate = useLicenseStorage(state => state.expiryDate);
  const publicPem = useCertificateStorage(state => state.publicPem);
  const privatePem = useCertificateStorage(state => state.privatePem);

  const copyProductLicense = useCallback(async () => {
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

    const pluginLicense = `${licenseId}-${licensePartBase64}-${sigResultsBase64}-${publicPemString}`;

    try {
      await clipboard.write(pluginLicense);
      showNoticeCard('🎉', 'Success', `Successfully copied ${props.name}'s license key`);
    } catch {
      showNoticeCard('❌', 'Error', `Failed to copy ${props.name}'s license key`);
    }
  }, [email, expiryDate, privatePem, props.code, props.name, publicPem, username]);

  return (
    <article className={cn(`w-full rounded-xl bg-foreground/10 shadow-xl ring shadow-foreground/20 ring-foreground/10 duration-300 select-none hover:-translate-y-1 md:w-5/6`, isProductMatch(props.name, text) ? '' : `hidden`)}>
      <header className='flex items-center justify-between border-b-1 px-4'>
        <span className='size-16 translate-y-1/2'>
          <img alt={`${props.name}'s logo`} className='pointer-events-none size-full min-h-16 min-w-16' loading='lazy' src={props.icon} />
        </span>
        <span className='cursor-pointer rounded-full border border-foreground/50 text-sm text-foreground/50 hover:border-foreground/80 hover:text-foreground/80'>
          <a className='block px-8 py-2' href={props.link} rel='noopener noreferrer' target='_blank'>
            official
          </a>
        </span>
      </header>
      <section className='flex flex-col gap-8 px-4 pt-8 pb-4'>
        <span className='w-full translate-y-1/2 overflow-hidden font-mono text-2xl font-light text-ellipsis whitespace-nowrap' title={props.name}>
          {props.name}
        </span>
        <span className='group relative text-left font-mono text-sm text-wrap wrap-anywhere'>
          <span className='block max-h-[calc(1.5em*3)] overflow-hidden tracking-widest text-foreground/50 group-hover:invisible' style={{ lineHeight: '1.5em' }}>
            {'*'.repeat(128)}
          </span>
          <span className='absolute top-0 left-0 flex size-full cursor-pointer items-center justify-center rounded-full bg-foreground/30 font-light text-foreground/80 opacity-100 hover:bg-foreground/40 hover:text-foreground md:invisible md:group-hover:visible md:hover:visible' onClick={copyProductLicense}>
            Copy to clipboard
          </span>
        </span>
      </section>
    </article>
  );
}
