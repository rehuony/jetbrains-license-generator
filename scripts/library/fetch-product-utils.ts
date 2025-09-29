import type Stream from 'node:stream';

import { promises } from 'node:fs';
import { resolve } from 'node:path';

// Try to re-fetch data
export async function retryFetch<T>(
  name: string | number,
  func: () => Promise<T>,
  retries = 3,
  waittime = 3,
): Promise<T> {
  let lastError: unknown;

  for (let i = 0; i < retries; i++) {
    try {
      return await func();
    } catch (err) {
      lastError = err;
      console.warn(`[${name}]: ${i + 1}/${retries} failed, try again in ${waittime} seconds...`);
      await new Promise(resolve => setTimeout(resolve, waittime * 1000));
    }
  }

  const errMessage = lastError instanceof Error ? lastError.message : 'unknow error~';
  console.error(`[${name}]: failed to fetch data because of ${errMessage}`);
  throw lastError;
}

export async function checkFileIsExist(destination: string) {
  try {
    await promises.access(destination);
    return true;
  } catch {
    return false;
  }
}

// Save data to local specified directory
export async function saveFetchedData<T extends
  | string
  | NodeJS.ArrayBufferView
  | Iterable<string | NodeJS.ArrayBufferView>
  | AsyncIterable<string | NodeJS.ArrayBufferView>
  | Stream>(data: T, destination: string) {
  await promises.mkdir(resolve(destination, '..'), { recursive: true });

  await promises.writeFile(destination, data, 'utf-8');
}
