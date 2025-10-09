import { useCallback, useEffect, useState } from 'react';

export function useJsonData<T = any>(
  source: string,
): [data: T | null, isLoading: boolean, error: Error | null] {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const parseProductDate = useCallback(async () => {
    setData(null);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(source);

      if (!response.ok) throw new Error(`HTTP Error: ${response.statusText}`);

      const jsonData = await response.json().then(data => data as unknown as T);

      setData(jsonData);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [source]);

  useEffect(() => {
    parseProductDate();
  }, [parseProductDate]);

  return [data, isLoading, error];
}
