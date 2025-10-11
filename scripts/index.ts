import { filterStringRegex, ideDataPath, pluginDataPath, regenerate } from './utils/config.js';
import { generateIDEData } from './utils/fetch-ide-data.js';
import { generatePluginData } from './utils/fetch-plugin-data.js';
import { checkIsFileExist, saveFetchedData } from './utils/fetch-product-utils.js';
import { showInfoText } from './utils/prettier-show-info.js';

// Try to generate data about ide products
if (await checkIsFileExist(ideDataPath) && !regenerate) {
  showInfoText(`ide data already exists, skip generation: ${ideDataPath}`);
} else {
  showInfoText(`ide data doesn't exists, regenerating: ${ideDataPath}`);
  await saveFetchedData(JSON.stringify({
    data: await generateIDEData(),
    buildtime: Date.now(),
  }, null, 2).replaceAll(filterStringRegex, ''), ideDataPath);
}

// Try to generate data about plugin products
if (await checkIsFileExist(pluginDataPath) && !regenerate) {
  showInfoText(`plugin data already exists, skip generation: ${pluginDataPath}`);
} else {
  showInfoText(`plugin data doesn't exists, regenerating: ${pluginDataPath}`);
  await saveFetchedData(JSON.stringify({
    data: await generatePluginData(),
    buildtime: Date.now(),
  }, null, 2).replaceAll(filterStringRegex, ''), pluginDataPath);
}
