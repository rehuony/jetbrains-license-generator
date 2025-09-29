import { processNumber } from './config.js';
import { retryFetch } from './fetch-product-utils.js';

// Generate target address by the obtained icon link
function getPluginIconLink(iconLink: string | undefined) {
  iconLink = iconLink ?? '/static/versions/31888/jetbrains-simple.svg';

  while (iconLink.startsWith('/')) iconLink = iconLink?.substring(1);

  return `https://plugins.jetbrains.com/${iconLink}`;
}

// Get the number of all plugins
async function fetchPluginNumber() {
  return await fetch(
    `https://plugins.jetbrains.com/api/searchPlugins?max=1`,
  ).then(res => res.json() as unknown as FPluginList).then(data => data.total);
}

// Get max number data starting from offset, if max = 0, fetch all
async function fetchPluginList(max: number = 0, offset: number = 0, total?: number) {
  if (max < 0 || offset < 0) return [];

  const pluginNumber = total ?? await fetchPluginNumber();

  // Replace the value of max
  max = max === 0 ? pluginNumber : max;
  // Error in request parameters
  if (max + offset > pluginNumber) return [];

  const result: FPluginListItem[] = [];

  // NOTE: The maximum limit for a single request is 20
  for (let step = 20; offset < pluginNumber && max > 0; (offset += step, max -= step)) {
    const pluginList = await fetch(
      `https://plugins.jetbrains.com/api/searchPlugins?max=${max > step ? step : max}&offset=${offset}`,
    ).then(res => res.json() as unknown as FPluginList).then(data => data.plugins);

    result.push(...pluginList);
  }

  return result;
}

// Get plugin information through plugin id
async function fetchPluginData(id: number) {
  const pluginData = await fetch(
    `https://plugins.jetbrains.com/api/plugins/${id}`,
  ).then(res => res.json() as unknown as FPluginData);

  let pluginLink = pluginData.link;

  while (pluginLink.startsWith('/')) pluginLink = pluginLink?.substring(1);

  return {
    type: 'plugin',
    id: pluginData.id,
    code: pluginData.purchaseInfo?.productCode ?? `${pluginData.id}`,
    name: pluginData.name,
    link: `https://plugins.jetbrains.com/${pluginLink}`,
    icon: getPluginIconLink(pluginData.icon),
    description: pluginData.description,
    tagName: pluginData.tags?.map(item => item.name) ?? [],
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

  return result;
}
