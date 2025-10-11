import type Stream from 'node:stream';

import { promises } from 'node:fs';
import { resolve } from 'node:path';
import { processNumber as processes } from './config.js';

// Format IDE names into unified format
export function formatProductName(name: string) {
  return name.toLowerCase().split(/\s+/g).join('-').replaceAll('+', 'p');
}

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

// Asynchronously executing functions in a promise array, the execution order cannot be guaranteed
export async function scheduleAsyncTasks(promiseArray: (() => Promise<void>)[], processNumber = processes) {
  let taskIndex = 0;
  const taskCount = promiseArray.length;

  // Store the currently executing Promise
  const runningPromises: Promise<void>[] = [];

  // Execute the task and schedule the next task recursively
  const scheduleTask = async (func: () => Promise<void>) => {
    await func();

    if (taskIndex < taskCount) {
      return scheduleTask(promiseArray[taskIndex++]);
    } else {
      return Promise.resolve();
    }
  };

  while (taskIndex < processNumber && taskIndex < taskCount) {
    const promise = scheduleTask(promiseArray[taskIndex++]);
    runningPromises.push(promise);
  }

  // Wait for all tasks to be completed
  await Promise.all(runningPromises);
}

// Check if the file exists
export async function checkIsFileExist(destination: string) {
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
  // The directory where the recursively generated files are located
  await promises.mkdir(resolve(destination, '..'), { recursive: true });
  // Save data to specified destination
  await promises.writeFile(destination, data, 'utf-8');
}
