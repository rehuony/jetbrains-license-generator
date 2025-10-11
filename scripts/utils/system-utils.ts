import type Stream from 'node:stream';

import { promises } from 'node:fs';
import { resolve } from 'node:path';
import { showInfoText } from './prettier-show.js';

// Externally exposed path parsing function
export function resolveFilePath(...paths: string[]) {
  return resolve(...paths);
}

// Detects whether the file array exists and calls a callback function on failure
export async function checkPathExist(paths: string[], func: () => Promise<void>) {
  const existResults = await Promise.all(
    paths.map(async (item) => {
      try {
        await promises.access(item);
        return true;
      } catch {
        return false;
      }
    }),
  );
  const isExist = existResults.every(Boolean);

  if (!isExist) {
    showInfoText(`${paths.join(', ')} not exist, regenerating...`);
    return await func();
  };

  showInfoText(`${paths.join(', ')} existed, skip generation...`);
}

// Save data to local specified directory
export async function persistDataToFile<T extends
  | string
  | NodeJS.ArrayBufferView
  | Iterable<string | NodeJS.ArrayBufferView>
  | AsyncIterable<string | NodeJS.ArrayBufferView>
  | Stream>(data: T, destination: string) {
  // The directory where the recursively generated files are located
  await promises.mkdir(resolve(destination, '..'), { recursive: true });
  // Save data to specified destination
  await promises.writeFile(destination, data, 'utf-8');
}
