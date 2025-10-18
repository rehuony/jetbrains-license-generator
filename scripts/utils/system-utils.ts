import type Stream from 'node:stream';

import { promises } from 'node:fs';
import { resolve } from 'node:path';
import { rootPath } from '../config/config.js';
import { showInfoText } from './prettier-show.js';

// Externally exposed path parsing function
export function resolveFilePath(...paths: string[]) {
  return resolve(...paths);
}

// Detects whether the file array exists and calls a callback function on failure
export async function checkIsPathExist(paths: string[], func: () => Promise<void>) {
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
  const simplePaths = paths.map((item) => {
    let relativePath = item.replace(rootPath, '').replace(/\\/g, '/');

    if (relativePath.startsWith('/') || relativePath.startsWith('\\')) {
      relativePath = relativePath.substring(1);
    }

    return `${relativePath}`;
  });

  if (!isExist) {
    showInfoText(`${simplePaths.join(', ')} not exist, regenerating...`);
    return await func();
  };

  showInfoText(`${simplePaths.join(', ')} existed, skip generation...`);
}

// Read data from the specified file
export async function readFileData(destination: string) {
  return await promises.readFile(destination, { encoding: 'utf8' });
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
  // Ensure the file ends with a newline — only append if the file doesn't already end with LF
  const fileBuffer = await promises.readFile(destination);
  if (fileBuffer.length === 0 || fileBuffer[fileBuffer.length - 1] !== 0x0A) {
    await promises.appendFile(destination, '\n');
  }
}
