import { useQuery } from '@tanstack/react-query';
import { CardIDE } from '@/components/card-ide';
import { CardPlugin } from '@/components/card-plugin';
import { PageError } from '@/components/page-error';
import { PagePending } from '@/components/page-pending';

export function PageMain() {
  const response = useQuery({
    queryKey: ['ide-data', 'plugin-data'],
    queryFn: async () => {
      // Simulate long time loading of resources
      // await new Promise(resolve => setTimeout(resolve, 10000));

      const ideData = await fetch('/generated/ide-data.json').then(res => res.ok ? res.json() as unknown as IDEDataJSON : null);
      if (ideData === null) throw new Error('failed to fetch ide-data.json');
      const pluginData = await fetch('/generated/plugin-data.json').then(res => res.ok ? res.json() as unknown as PluginDataJSON : null);
      if (pluginData === null) throw new Error('failed to fetch plugin-data.json');

      return {
        ides: ideData.data,
        plugins: pluginData.data,
        ideBuildTime: ideData.buildtime,
        pluginBuildTime: pluginData.buildtime,
      };
    },
  });

  // Network request loading
  if (response.isPending) return <PagePending />;
  // An exception occurred when requesting data
  if (response.isError) return <PageError />;

  return (
    <main className="grid grid-cols-[repeat(auto-fill,_minmax(min(20rem,_100%),_1fr))] justify-items-center content-center px-6 py-10 gap-14">
      {response.data.ides.map(item => <CardIDE key={item.code} {...item} />)}
      {response.data.plugins.map(item => <CardPlugin key={item.code} {...item} />)}
    </main>
  );
}
