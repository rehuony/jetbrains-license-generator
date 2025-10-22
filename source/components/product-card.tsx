import clipboard from 'clipboardy';
import forge from 'node-forge';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useCertificateStorage, useLicenseStorage, useLocalStorage } from '@/hooks/use-storage';
import { showNoticeCard } from '@/library/toaster';
import { convertPemToString, generateLicenseId } from '@/utils/license';
import { adaptivePath, cn, isProductMatch } from '@/utils/utils';

export function ProductCard(props: IDEDataItem | PluginDataItem) {
  const [isCopied, setIsCopied] = useState<boolean | null>(null);

  const imgRef = useRef<HTMLImageElement>(null);
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
      setIsCopied(true);
      showNoticeCard('🎉', 'Success', `Successfully copied ${props.name}'s license key`);
    } catch {
      setIsCopied(false);
      showNoticeCard('❌', 'Error', `Failed to copy ${props.name}'s license key`);
    }

    setTimeout(() => {
      setIsCopied(null);
    }, 3000);
  }, [email, expiryDate, privatePem, props.code, props.name, publicPem, username]);

  useEffect(() => {
    const realImg = new Image();
    realImg.src = adaptivePath(props.icon);
    realImg.onload = () => {
      if (imgRef.current) {
        imgRef.current.src = adaptivePath(props.icon);
        imgRef.current.classList.add('loaded');
      }
    };
  }, [props.icon]);

  return (
    <article className={cn(`w-full rounded-xl bg-surface text-foreground shadow-xl ring-1 ring-border select-none hover:-translate-y-[2px] hover:ring-accent/40 md:w-5/6`, isProductMatch(props.name, text) ? '' : `hidden`)}>
      <header className='flex items-center justify-between border-b border-border px-4 pb-1'>
        <span className='size-16 translate-y-1/2'>
          <img ref={imgRef} alt={`${props.name}'s logo`} className='pointer-events-none size-full' loading='lazy' src={adaptivePath('/pagelogo.svg')} />
        </span>
        <span className='cursor-pointer rounded-full border border-border text-sm text-muted hover:border-accent hover:text-accent'>
          <a className='block px-8 py-2' href={props.link} rel='noopener noreferrer' target='_blank'>
            official
          </a>
        </span>
      </header>
      <section className='flex flex-col gap-8 px-4 pt-8 pb-4'>
        <span className='w-full translate-y-1/2 overflow-hidden font-mono text-2xl font-light text-ellipsis whitespace-nowrap text-foreground' title={props.name}>
          {props.name}
        </span>
        <span className='group relative font-mono text-sm text-wrap wrap-anywhere'>
          <button className='h-[4.5rem] w-full cursor-pointer rounded-full bg-muted/20 text-center font-light text-muted opacity-100 transition-all duration-200 hover:bg-muted/40 hover:text-foreground' onClick={copyProductLicense} type='button'>
            {isCopied === null ? 'Copy to clipboard' : isCopied ? '🎉 Copied' : '❌ Error'}
          </button>
          <span className='absolute top-0 left-0 hidden size-full items-center justify-center overflow-hidden bg-surface tracking-widest text-muted group-hover:hidden md:flex'>
            <p className='h-[calc(1.5em*3)]' style={{ lineHeight: '1.5em' }}>
              {'*'.repeat(128)}
            </p>
          </span>
        </span>
      </section>
    </article>
  );
}
