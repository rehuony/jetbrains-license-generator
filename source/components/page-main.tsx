import { useJsonData } from '@/hooks/use-json-data';

export function PageMain() {
  const [data, isLoading, error] = useJsonData('/generated/product.json');

  if (isLoading) {
    return (
      <div>
        <p>loading</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p>error</p>
      </div>
    );
  }

  return (
    <main>
      {JSON.stringify(data)}
    </main>
  );
}
