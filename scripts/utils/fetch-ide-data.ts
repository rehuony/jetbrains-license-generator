import { resolve } from 'node:path';
import { assetsPath, destinationPath, ideProductCodes } from './config.js';
import { formatProductName, retryFetch, saveFetchedData, scheduleAsyncTasks } from './fetch-product-utils.js';

// Get the target name by comparing the official name and product name
function judgeName(name: string, familyName: string) {
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

  if (response === null) throw new Error(`${code}: failed to fetch ide data...`);

  const fideDataItem = response.pop();

  if (fideDataItem === undefined) throw new Error(`${code}: fetched data is empty...`);

  const ideDataRelease: IDEDataRelease = {};
  fideDataItem.releases.forEach((item) => {
    if (Object.keys(item.downloads).length === 0) return;
    if (Object.hasOwn(ideDataRelease, item.majorVersion)) return;

    ideDataRelease[item.majorVersion] = structuredClone(item.downloads);
  });

  const ideName = judgeName(fideDataItem.name, fideDataItem.productFamilyName);
  const iconName = formatProductName(ideName);
  const iconPath = resolve(assetsPath, `ides/${iconName}.svg`);

  // Fetch product icon bytes
  const iconBytes = await fetch(
    `https://resources.jetbrains.com/storage/logos/web/${iconName}/${iconName}.svg`,
  ).then(res => res.ok ? res.bytes() : null);

  if (iconBytes == null) throw new Error(`failed to fetch ide icon for ${code}...`);

  // Save the product icon file to the resource directory
  await saveFetchedData(iconBytes, iconPath);

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

  const result: IDEDataItem[] = [];
  const failedCodes: string[] = [];

  const allTasks = ideProductCodes.map(item => async () => {
    try {
      result.push(await retryFetch(item, () => fetchIDEData(item)));
    } catch {
      failedCodes.push(item);
    } finally {
      count++;
      console.log(`fetching data for ides ... ${count}/${ideProductCodes.length}`);
    }
  });

  // Asynchronous execution of task list
  await scheduleAsyncTasks(allTasks);

  if (failedCodes.length > 0) {
    console.warn(`[WARN]: completed with ${failedCodes.length} failures: ${failedCodes.join(', ')}`);
  }

  return result.sort((left, right) => {
    return left.code.localeCompare(right.code);
  });
}
