import { useQuery } from '@tanstack/react-query';
import { MainError } from '@/components/main-error';
import { MainPending } from '@/components/main-pending';
import { ProductCard } from '@/components/product-card';
import { useCertificateStorage } from '@/hooks/use-storage';

export function PageMain() {
  const setConf = useCertificateStorage(state => state.setConf);
  const setVMOptions = useCertificateStorage(state => state.setVMOptions);
  const setPublicPem = useCertificateStorage(state => state.setPublicPem);
  const setPrivatePem = useCertificateStorage(state => state.setPrivatePem);

  const response = useQuery({
    queryKey: ['ide-data', 'plugin-data', 'certificate-data'],
    queryFn: async () => {
      const ideData = await fetch('/generated/ide-data.json').then(res => res.ok ? res.json() as unknown as IDEDataJSON : null);
      if (ideData === null) throw new Error('failed to fetch ide-data.json');
      const pluginData = await fetch('/generated/plugin-data.json').then(res => res.ok ? res.json() as unknown as PluginDataJSON : null);
      if (pluginData === null) throw new Error('failed to fetch plugin-data.json');
      const certificateData = await fetch('/generated/certificate-data.json').then(res => res.ok ? res.json() as unknown as CertificateDataJSON : null);
      if (certificateData === null) throw new Error('failed to fetch certificate-data.json');

      setConf(certificateData.conf);
      setVMOptions(certificateData.vmoptions);
      setPublicPem(certificateData.publicPem);
      setPrivatePem(certificateData.privatePem);

      return {
        ides: ideData.data,
        plugins: pluginData.data,
        ideBuildTime: ideData.buildtime,
        pluginBuildTime: pluginData.buildtime,
      };
    },
  });

  // Network request loading
  if (response.isPending) return <MainPending />;
  // An exception occurred when requesting data
  if (response.isError) return <MainError />;

  return (
    <main className='relative grid grid-cols-[repeat(auto-fill,_minmax(min(20rem,_100%),_1fr))] content-center justify-items-center gap-12 px-8 py-10'>
      {response.data.ides.map(item => (
        <ProductCard key={item.code} {...item} />
      ))}
      {response.data.plugins.map(item => (
        <ProductCard key={item.code} {...item} />
      ))}
    </main>
  );
}
