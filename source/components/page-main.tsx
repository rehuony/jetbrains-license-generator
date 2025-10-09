import { Button } from '@/components/shadcn/button';
import { useJsonData } from '@/hooks/use-json-data';

export function PageMain() {
  const [data, isLoading, error] = useJsonData<ProductJsonData>('/generated/product.json');

  if (isLoading) {
    return <p>loading</p>;
  }

  if (error) {
    return <p>error</p>;
  }

  if (!data) {
    return <p>empty</p>;
  }

  const ideList = data.ides;

  return (
    <main className="relative flex flex-wrap items-center justify-between p-4 gap-12">
      {ideList.map((item) => {
        return (
          <article key={item.code} className="rounded-lg shadow-xl bg-card-foreground/5 shadow-card-foreground/20 select-none w-90">
            <header className="flex items-center justify-between px-6 py-2 pb-0 gap-32 border-b-1">
              <div className="size-16 translate-y-1/2">
                <img src={item.icon} alt={`${item.name}'s logo`} className="size-full" />
              </div>
              <div className="px-8 py-2 text-sm text-card-foreground/50 rounded-full">
                <a href={item.link} target="_blank" rel="noopener noreferrer">website</a>
              </div>
            </header>
            <section className="flex flex-col gap-8 px-4 pt-8 pb-4 container">
              <span className="text-2xl font-mono font-light truncate translate-y-1/2">
                {item.name}
              </span>
              <Button className="w-full text-wrap break-all wrap-anywhere">
                {'*'.repeat(128)}
              </Button>
            </section>
          </article>
        );
      })}
    </main>
  );
}
