import { resolve } from 'node:path';
import { assetsPath, destinationPath, processNumber } from './config.js';
import { checkIsFileExist, formatProductName, retryFetch, saveFetchedData } from './fetch-product-utils.js';

// Get the number of all plugins
async function fetchPluginNumber() {
  return await fetch(
    `https://plugins.jetbrains.com/api/searchPlugins?max=1`,
  ).then(res => res.json() as unknown as FPluginList).then(data => data.total);
}

// Get max number data starting from offset, if count = 0, fetch all rest plugins
async function fetchPluginList(offset: number = 0, count: number = 0) {
  if (count < 0 || offset < 0) return [];

  // Get the number of all plugins
  const pluginNumber = await fetchPluginNumber();
  // Replace the value of max
  count = count === 0 ? pluginNumber : count;

  const result: FPluginListItem[] = [];

  // NOTE: The maximum limit for a single request is 20
  for (let step = 20; offset < pluginNumber && count > 0; (offset += step, count -= step)) {
    const pluginList = await fetch(
      `https://plugins.jetbrains.com/api/searchPlugins?max=${count > step ? step : count}&offset=${offset}`,
    ).then(res => res.json() as unknown as FPluginList).then(data => data.plugins);

    result.push(...pluginList);
  }

  return result;
}

// Get plugin information through plugin id
async function fetchPluginData(id: number) {
  const response = await fetch(
    `https://plugins.jetbrains.com/api/plugins/${id}`,
  ).then(res => res.ok ? res.json() as unknown as FPluginData : null);

  if (response === null) throw new Error(`failed to fetch plugin data for ${id}...`);

  const pluginCode = response.purchaseInfo?.productCode ?? `${response.id}`;
  const iconName = formatProductName(pluginCode);
  const iconPath = resolve(assetsPath, `${iconName}.svg`);

  // Save only if icon file does not exist
  if (!await checkIsFileExist(iconPath)) {
    // Fetch product icon bytes
    const iconData = await fetch(
      `https://plugins.jetbrains.com${response.icon ?? '/static/versions/31888/jetbrains-simple.svg'}`,
    ).then(res => res.ok ? res.bytes() : null);

    if (iconData == null) throw new Error(`failed to fetch plugin icon for ${id}...`);

    // Save the product icon file to the resource directory
    await saveFetchedData(iconData, iconPath);
  }

  return {
    type: 'plugin',
    id: response.id,
    code: pluginCode,
    name: response.name,
    link: `https://plugins.jetbrains.com${response.link}`,
    icon: iconPath.replace(destinationPath, ''),
    description: response.description,
    tagName: response.tags?.map(item => item.name) ?? [],
  } as PluginDataItem;
}

// Generate all plugin product information
export async function generatePluginData() {
  let count = 0;
  let taskIndex = 0;
  let taskCount = 0;

  const result: PluginDataItem[] = [];
  const failedCodes: string[] = [];

  // Store the currently executing Promise
  const runningPromises: Promise<void>[] = [];

  // Get the total list of plugins
  console.log('fetching all plugin list...');
  const pluginList = await fetchPluginList().then(data => data.filter(
    item => item.pricingModel.toUpperCase() !== 'FREE',
  ));

  taskCount = pluginList.length;

  const allTasks = pluginList.map(item => async () => {
    try {
      result.push(await retryFetch(item.id, () => fetchPluginData(item.id)));
    } catch {
      failedCodes.push(String(item.id));
    } finally {
      count++;
      console.log(`fetching data for plugins ... ${count}/${taskCount}`);
    }
  });

  // Execute the task and schedule the next task recursively
  const scheduleTask = async (func: () => Promise<void>) => {
    await func();

    if (taskIndex < taskCount) {
      return scheduleTask(allTasks[taskIndex++]);
    } else {
      return Promise.resolve();
    }
  };

  while (taskIndex < processNumber && taskIndex < taskCount) {
    const promise = scheduleTask(allTasks[taskIndex++]);
    runningPromises.push(promise);
  }

  // Wait for all tasks to be completed
  await Promise.all(runningPromises);

  if (failedCodes.length > 0) {
    console.warn(`[WARN]: completed with ${failedCodes.length} failures: ${failedCodes.join(', ')}`);
  }

  return result.sort((left, right) => {
    return left.id - right.id;
  });
}
