import { ideDataPath, pluginDataPath } from './utils/config.js';
import { generateIDEData } from './utils/fetch-ide-data.js';
import { generatePluginData } from './utils/fetch-plugin-data.js';
import { checkIsFileExist, saveFetchedData } from './utils/fetch-product-utils.js';

// Try to get information about ide products
if (await checkIsFileExist(ideDataPath)) {
  console.log(`ide data already exists, skip generation: ${ideDataPath}`);
} else {
  console.log(`ide data doesn't exists, regenerating: ${ideDataPath}`);
  await saveFetchedData(JSON.stringify({
    data: await generateIDEData(),
    buildtime: Date.now(),
  }, null, 2), ideDataPath);
}

// Try to get information about plugin products
if (await checkIsFileExist(pluginDataPath)) {
  console.log(`plugin data already exists, skip generation: ${pluginDataPath}`);
} else {
  console.log(`plugin data doesn't exists, regenerating: ${pluginDataPath}`);
  await saveFetchedData(JSON.stringify({
    data: await generatePluginData(),
    buildtime: Date.now(),
  }, null, 2), pluginDataPath);
}
