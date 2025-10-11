import { processNumber as processes } from '../config/config.js';
import { showErrorText, showWarnText } from './prettier-show.js';

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
      showWarnText(`[${name}]: ${i + 1}/${retries} failed, try again in ${waittime} seconds...`);
      await new Promise(resolve => setTimeout(resolve, waittime * 1000));
    }
  }

  const errMessage = lastError instanceof Error ? lastError.message : 'unknow error~';
  showErrorText(`[${name}]: failed to fetch data because of ${errMessage}`);
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