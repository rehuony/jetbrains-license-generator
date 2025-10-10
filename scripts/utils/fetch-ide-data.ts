import { resolve } from 'node:path';
import { assetsPath, destinationPath, ideProductCodes, processNumber } from './config.js';
import { checkIsFileExist, formatProductName, retryFetch, saveFetchedData } from './fetch-product-utils.js';

// Get the target name by comparing the official name and product name
function judgeIDEName(name: string, familyName: string) {
  const ofclName = formatProductName(name);
  const pdfyName = formatProductName(familyName);

  if (ofclName.includes(pdfyName)) {
    return familyName;
  } else {
    return name;
  }
}

// Get ide product information through product code
async function fetchIDEData(code: string) {
  const response = await fetch(
    `https://data.services.jetbrains.com/products?code=${code}&release.type=release&fields=code,salesCode,name,productFamilyName,link,description,tags,releases`,
  ).then(res => res.ok ? res.json() as unknown as FIDEDataItem[] : null);

  if (response === null) throw new Error(`failed to fetch ide data for ${code}...`);

  const fideDataItem = response.pop();

  if (fideDataItem === undefined) throw new Error(`fetched ide data for ${code} is empty...`);

  const ideDataRelease: IDEDataRelease = {};
  fideDataItem.releases.forEach((item) => {
    if (Object.keys(item.downloads).length === 0) return;
    if (Object.hasOwn(ideDataRelease, item.majorVersion)) return;

    ideDataRelease[item.majorVersion] = structuredClone(item.downloads);
  });

  const ideName = judgeIDEName(fideDataItem.name, fideDataItem.productFamilyName);
  const iconName = formatProductName(ideName);
  const iconPath = resolve(assetsPath, `${iconName}.svg`);

  // Save only if icon file does not exist
  if (!await checkIsFileExist(iconPath)) {
    // Fetch product icon bytes
    const iconData = await fetch(
      `https://resources.jetbrains.com/storage/logos/web/${iconName}/${iconName}.svg`,
    ).then(res => res.ok ? res.bytes() : null);

    if (iconData == null) throw new Error(`failed to fetch ide icon for ${code}...`);

    // Save the product icon file to the resource directory
    await saveFetchedData(iconData, iconPath);
  }

  return {
    type: 'ide',
    code: fideDataItem.salesCode,
    name: ideName,
    link: fideDataItem.link,
    icon: iconPath.replace(destinationPath, ''),
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

  return result.sort((left, right) => {
    return left.code.localeCompare(right.code);
  });
}
