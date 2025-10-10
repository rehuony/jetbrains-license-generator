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
    <main className="grid grid-cols-[repeat(auto-fill,_minmax(min(20rem,_100%),_1fr))] justify-items-center content-center px-6 py-10 gap-14">
      {ideList.map((item) => {
        const handleClick = () => {
          console.log(`clicked ${item.name}`);
        };

        return (
          <article key={item.code} className="w-5/6 rounded-lg shadow-xl bg-card-foreground/5 shadow-card-foreground/20 select-none">
            <header className="flex items-center justify-between px-4 py-2 pb-0 border-b-1">
              <span className="size-16 translate-y-1/2">
                <img src={item.icon} alt={`${item.name}'s logo`} className="size-full no-drag" />
              </span>
              <span className="text-sm text-card-foreground/50 rounded-full border cursor-pointer hover:text-card-foreground/80 hover:border-ring">
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="block px-8 py-2 ">
                  website
                </a>
              </span>
            </header>
            <section className="flex flex-col gap-8 px-4 pt-8 pb-4">
              <span className="text-2xl font-mono font-light truncate translate-y-1/2">
                {item.name}
              </span>
              <span onClick={handleClick} className="relative p-2 text-left text-sm text-card-foreground/50 hover:text-transparent text-wrap wrap-anywhere after:absolute after:flex after:items-center after:justify-center after:left-0 after:top-0 after:size-full after:rounded-full after:text-card-foreground/80 after:font-light hover:after:bg-card-foreground/10 hover:after:content-['Copy_to_clipboard']">
                {'*'.repeat(88)}
              </span>
            </section>
          </article>
        );
      })}
    </main>
  );
}
