import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { resource } from '@/constants/resource';
import { adaptivePath } from '@/utils/utils';

function getCpuCoreCount() {
  if (typeof navigator !== 'undefined' && navigator.hardwareConcurrency) {
    return navigator.hardwareConcurrency;
  }
  return 4;
};

async function scheduleAsyncTasks(
  promiseArray: (() => Promise<void>)[],
  processNumber = getCpuCoreCount(),
) {
  let taskIndex = 0;
  const taskCount = promiseArray.length;

  // Store the currently executing Promise
  const runningPromises: Promise<void>[] = [];

  // Execute the task and schedule the next task recursively
  const scheduleTask = async (func: () => Promise<void>) => {
    await func();

    if (taskIndex < taskCount) {
      return scheduleTask(promiseArray[taskIndex++]!);
    } else {
      return Promise.resolve();
    }
  };

  while (taskIndex < processNumber && taskIndex < taskCount) {
    const promise = scheduleTask(promiseArray[taskIndex++]!);
    runningPromises.push(promise);
  }

  // Wait for all tasks to be completed
  await Promise.all(runningPromises);
}

export async function downloadJaNetfilter() {
  const zip = new JSZip();

  const allTasks = resource.map(item => async () => {
    try {
      const data = await fetch(adaptivePath(`/${item}`)).then(res => res.blob());
      zip.file(item.replace('ja-netfilter/', ''), data);
    } catch (error) {
      if (error instanceof Error) console.warn(error.message);
    }
  });

  // Wait for all requests to complete
  await scheduleAsyncTasks(allTasks);
  // Package and download the downloaded content
  const content = await zip.generateAsync({ type: 'blob' });
  saveAs(content, 'ja-netfilter.zip');
};
