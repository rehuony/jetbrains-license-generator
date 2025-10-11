import { resolve } from 'node:path';
import { assetsPath, destinationPath } from './config.js';
import { formatProductName, retryFetch, saveFetchedData, scheduleAsyncTasks } from './fetch-product-utils.js';
import { showInfoText, showProcessText, showSuccessText, showWarnText } from './prettier-show-info.js';

// Get the number of all plugins
async function fetchPluginNumber() {
  const response = await fetch(
    `https://plugins.jetbrains.com/api/searchPlugins?max=1`,
  ).then(res => res.ok ? res.json() as unknown as FPluginList : null);

  if (response === null) return 0;
  return response.total;
}

// Get max number data starting from offset, if count = 0, fetch all rest plugins
async function fetchPluginList(offset: number = 0, count: number = 0) {
  // Fetch the number of all plugins
  const pluginNumber = await fetchPluginNumber();
  // Replace the value of query number
  const queryNumber = count === 0 ? pluginNumber : count;
  // Calculate the number of all plugins in the current query
  const taskPluginNumber = Math.min(queryNumber, pluginNumber - offset);

  // If the current parameter status is incorrect, return empty array
  if (count < 0 || offset < 0 || taskPluginNumber <= 0) return [];

  let index: number = 0;
  const result: FPluginListItem[] = [];
  const failedRanges: string[] = [];

  const allTasks: (() => Promise<void>)[] = [];

  // NOTE: The maximum limit for a single request is 20
  for (let i = 0, step = 20; i < taskPluginNumber; i += step) {
    const maxNumber = Math.min(step, taskPluginNumber - i);
    const queryRange = `${offset + i}~${offset + i + maxNumber}`;

    allTasks.push(async () => {
      try {
        result.push(...await retryFetch(`Fetching[${queryRange}]`, async () => {
          const response = await fetch(
            `https://plugins.jetbrains.com/api/searchPlugins?max=${maxNumber}&offset=${offset + i}`,
          ).then(res => res.ok ? res.json() as unknown as FPluginList : null);

          if (response === null) throw new Error(`failed to fetch plugin list between ${queryRange}`);

          return response.plugins;
        }));
      } catch {
        failedRanges.push(queryRange);
      } finally {
        index += maxNumber;
        showProcessText(`fetching plugin list ... ${index}/${taskPluginNumber}`);
      }
    });
  }

  // Show start prompt message
  showInfoText('start fetching plugin list\n');
  // Asynchronous execution of task list
  await scheduleAsyncTasks(allTasks);
  // Show done prompt message
  if (failedRanges.length > 0) {
    showWarnText(`completed with ${failedRanges.length} failures: ${failedRanges.join(', ')}`);
  } else {
    showSuccessText('completed fetch plugin list');
  }

  return result.sort((left, right) => {
    return left.id - right.id;
  });
}

// Get plugin information through plugin id
async function fetchPluginData(id: number) {
  const response = await fetch(
    `https://plugins.jetbrains.com/api/plugins/${id}`,
  ).then(res => res.ok ? res.json() as unknown as FPluginData : null);

  if (response === null) throw new Error(`failed to fetch plugin data for ${id}`);

  const pluginCode = response.purchaseInfo?.productCode ?? `${response.id}`;
  const iconName = formatProductName(pluginCode);
  const iconPath = resolve(assetsPath, `plugins/${iconName}.svg`);

  // Fetch product icon bytes
  const iconData = await fetch(
    `https://plugins.jetbrains.com${response.icon ?? '/static/versions/31888/jetbrains-simple.svg'}`,
  ).then(res => res.ok ? res.bytes() : null);

  if (iconData == null) throw new Error(`failed to fetch plugin icon for ${id}...`);

  // Save the product icon file to the resource directory
  await saveFetchedData(iconData, iconPath);

  // 0xe28083
  // 0xe2808b

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

  const result: PluginDataItem[] = [];
  const failedCodes: string[] = [];

  // Get the total list of plugins
  const pluginList = await fetchPluginList().then(data => data.filter(
    item => item.pricingModel.toUpperCase() !== 'FREE',
  ));

  const allTasks = pluginList.map(item => async () => {
    try {
      result.push(await retryFetch(item.id, () => fetchPluginData(item.id)));
    } catch {
      failedCodes.push(String(item.id));
    } finally {
      count++;
      showProcessText(`fetching plugin data ... ${count}/${pluginList.length}`);
    }
  });

  // Show start prompt message
  showInfoText('start generating plugin data\n');
  // Asynchronous execution of task list
  await scheduleAsyncTasks(allTasks);
  // Show done prompt message
  if (failedCodes.length > 0) {
    showWarnText(`completed with ${failedCodes.length} failures: ${failedCodes.join(', ')}`);
  } else {
    showSuccessText('completed generate plugin data');
  }

  return result.sort((left, right) => {
    return left.id - right.id;
  });
}
