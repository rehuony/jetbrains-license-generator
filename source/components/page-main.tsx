import { useQuery } from '@tanstack/react-query';
import { CardProduct } from '@/components/card-product';
import { MainError } from '@/components/main-error';
import { MainPending } from '@/components/main-pending';
import { useCertificateStorage } from '@/hooks/use-storage';

export function PageMain() {
  const setConf = useCertificateStorage(state => state.setConf);
  const setVMOptions = useCertificateStorage(state => state.setVMOptions);
  const setPublicPem = useCertificateStorage(state => state.setPublicPem);
  const setPrivatePem = useCertificateStorage(state => state.setPrivatePem);

  const response = useQuery({
    queryKey: ['ide-data', 'plugin-data', 'certificate-data'],
    queryFn: async () => {
      // Simulate long time loading of resources
      // await new Promise(resolve => setTimeout(resolve, 10000));

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
    <main className='grid grid-cols-[repeat(auto-fill,_minmax(min(20rem,_100%),_1fr))] content-center justify-items-center gap-14 px-6 py-10'>
      {response.data.ides.map(item => (
        <CardProduct key={item.code} {...item} />
      ))}
      {response.data.plugins.map(item => (
        <CardProduct key={item.code} {...item} />
      ))}
    </main>
  );
}
