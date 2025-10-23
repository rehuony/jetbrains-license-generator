import { assetsPath, ideProductCodes, publicPath } from '../config/config.js';
import { formatProductName, retryFetch, scheduleAsyncTasks } from '../utils/fetch-utils.js';
import { showInfoText, showProcessText, showSuccessText, showWarnText } from '../utils/prettier-show.js';
import { persistDataToFile, resolveFilePath } from '../utils/system-utils.js';

// Get the target name by comparing the official name and product name
function judgeName(name: string, familyName: string) {
  const ofclName = formatProductName(name);
  const pdfyName = formatProductName(familyName);

  if (ofclName.includes(pdfyName)) return familyName;

  return name;
}

// Get the target file path of icon
function spliceIconPath(iconName: string) {
  return resolveFilePath(assetsPath, `ides/${iconName}.svg`);
}

// Get ide product information through product code
async function fetchIDEData(code: string) {
  const response = await fetch(
    `https://data.services.jetbrains.com/products?code=${code}&release.type=release&fields=code,salesCode,name,productFamilyName,link,description,tags,releases`,
  ).then(res => res.ok ? res.json() as unknown as FIDEDataItem[] : null);

  if (response === null) throw new Error(`failed to fetch ide data for ${code}`);

  const fideDataItem = response.pop();

  if (fideDataItem === undefined) throw new Error(`fetched ide data is empty for ${code}`);

  const ideDataRelease: IDEDataRelease = {};
  fideDataItem.releases.forEach((item) => {
    if (Object.keys(item.downloads).length === 0) return;
    if (Object.hasOwn(ideDataRelease, item.majorVersion)) return;

    ideDataRelease[item.majorVersion] = structuredClone(item.downloads);
  });

  const ideName = judgeName(fideDataItem.name, fideDataItem.productFamilyName);
  const iconName = formatProductName(ideName);
  const iconPath = spliceIconPath(iconName);
  const iconHrefPath = iconPath.replace(publicPath, '').replace(/\\/g, '/');

  // Fetch product icon bytes
  const iconBytes = await fetch(
    `https://resources.jetbrains.com/storage/logos/web/${iconName}/${iconName}.svg`,
  ).then(res => res.ok ? res.bytes() : null);

  if (iconBytes == null) throw new Error(`failed to fetch ide icon for ${code}`);

  // Save the product icon file to the resource directory
  await persistDataToFile(iconBytes, iconPath);

  return {
    type: 'ide',
    code: fideDataItem.salesCode,
    name: ideName,
    link: fideDataItem.link,
    icon: iconHrefPath,
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
      showProcessText(`fetching ide data ... ${count}/${ideProductCodes.length}`);
    }
  });

  // Show start prompt message
  showInfoText('start generating ide data\n');
  // Asynchronous execution of task list
  await scheduleAsyncTasks(allTasks);
  // Show done prompt message
  if (failedCodes.length > 0) {
    showWarnText(`completed with ${failedCodes.length} failures: ${failedCodes.join(', ')}`);
  } else {
    showSuccessText('completed generate ide data');
  }

  return result.sort((left, right) => {
    return left.code.localeCompare(right.code);
  });
}
