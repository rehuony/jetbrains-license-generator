import clipboard from 'clipboardy';
import forge from 'node-forge';
import { useCallback } from 'react';
import { useCertificateStorage, useLicenseStorage, useLocalStorage } from '@/hooks/use-storage';
import { cn, convertPemToString, generateLicenseId, isProductMatch } from '@/utils/utils';

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

    const pluginLicense = `${licenseId}-${licensePartBase64}-${sigResultsBase64}-${publicPemString}`;

    await clipboard.write(pluginLicense);
    // toast(`successfully copy ${props.name}'s license`);
  }, [email, expiryDate, privatePem, props.code, publicPem, username]);

  return (
    <article className={cn(`w-5/6 rounded-xl bg-foreground/10 shadow-xl ring shadow-foreground/20 ring-foreground/10 duration-300 select-none hover:-translate-y-1`, isProductMatch(props.name, text) ? '' : `hidden`)}>
      <header className="flex items-center justify-between border-b-1 px-4">
        <span className="size-16 translate-y-1/2">
          <img
            src={props.icon}
            alt={`${props.name}'s logo`}
            className="pointer-events-none size-full min-h-16 min-w-16"
          />
        </span>
        <span className="cursor-pointer rounded-full border border-foreground/50 text-sm text-foreground/50 hover:border-foreground/80 hover:text-foreground/80">
          <a
            href={props.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block px-8 py-2"
          >
            official
          </a>
        </span>
      </header>
      <section className="flex flex-col gap-8 px-4 pt-8 pb-4">
        <span className="translate-y-1/2 truncate font-mono text-2xl font-light">
          {props.name}
        </span>
        <span className="group relative text-left text-sm text-wrap wrap-anywhere">
          <span
            className="block max-h-[calc(1.5em*3)] overflow-hidden text-foreground/50 group-hover:invisible"
            style={{
              lineHeight: '1.5em',
            }}
          >
            {'*'.repeat(128)}
          </span>
          <span
            onClick={copyPluginLicense}
            className="invisible absolute top-0 left-0 flex size-full items-center justify-center rounded-full font-light text-foreground/80 group-hover:visible group-hover:bg-foreground/30"
          >
            Copy to clipboard
          </span>
        </span>
      </section>
    </article>
  );
}
