import { ideProductCodes, processNumber } from './config.js';
import { retryFetch } from './fetch-product-utils.js';

// Format IDE names into unified format
function formatIDEName(name: string) {
  return name.toLowerCase().split(/\s+/g).join('-').replaceAll('+', 'p');
}

// Get the target name by comparing the official name and product name
function judgeIDEName(name: string, productFamilyName: string) {
  const ofclName = formatIDEName(name);
  const pdfyName = formatIDEName(productFamilyName);

  if (ofclName.includes(pdfyName)) {
    return productFamilyName;
  } else {
    return name;
  }
}

// Get ide product icon link by product name
function getIDEIconLink(name: string) {
  const linkName = formatIDEName(name);

  return `https://resources.jetbrains.com/storage/logos/web/${linkName}/${linkName}.svg`;
}

// Get ide product information through product code
async function fetchIDEData(code: string) {
  const response = await fetch(
    `https://data.services.jetbrains.com/products?code=${code}&release.type=release&fields=code,salesCode,name,productFamilyName,link,description,tags,releases`,
  ).then(res => res.json() as unknown as FIDEDataItem[]);

  const fideDataItem = response.pop();

  if (fideDataItem == null) throw new Error(`failed to fetch data for ${code}...`);

  const ideName = judgeIDEName(fideDataItem.name, fideDataItem.productFamilyName);

  const ideDataRelease: IDEDataRelease = {};
  fideDataItem.releases.forEach((item) => {
    if (Object.hasOwn(ideDataRelease, item.majorVersion)) return;

    ideDataRelease[item.majorVersion] = structuredClone(item.downloads);
  });

  return {
    type: 'ide',
    code: fideDataItem.salesCode,
    name: ideName,
    link: fideDataItem.link,
    icon: getIDEIconLink(ideName),
    description: fideDataItem.description,
    tagName: fideDataItem.tags.map(item => item.name),
    releases: ideDataRelease,
  } as IDEDataItem;
}

// Generate all ide product information
export async function generateIDEData() {
  let count = 0;
  let taskIndex = 0;
  const taskCount = ideProductCodes.length;

  const result: IDEDataItem[] = [];
  const failedCodes: string[] = [];

  // Store the currently executing Promise
  const runningPromises: Promise<void>[] = [];

  const allTasks = ideProductCodes.map(item => async () => {
    try {
      result.push(await retryFetch(item, () => fetchIDEData(item)));
    } catch {
      failedCodes.push(item);
    } finally {
      count++;
      console.log(`fetching data for IDEs ... ${count}/${taskCount}`);
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
