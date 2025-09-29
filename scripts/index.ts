import { buildTimestamp, jsonDataPath } from './library/config.js';
import { generateIDEData } from './library/fetch-ide-data.js';
import { generatePluginData } from './library/fetch-plugin-data.js';
import { checkFileIsExist, saveFetchedData } from './library/fetch-product-utils.js';

async function prebuild() {
  const isExist = await checkFileIsExist(jsonDataPath);

  if (isExist) {
    console.log(`destination already exists, skip generation: ${jsonDataPath}`);
    return;
  }
  console.log(`destination doesn't exists, regenerating: ${jsonDataPath}`);

  const idedata = await generateIDEData();
  const plugindata = await generatePluginData();

  const totaldata = {
    ides: idedata,
    plugins: plugindata,
    buildtime: buildTimestamp,
  };

  saveFetchedData(JSON.stringify(totaldata, null, 2), jsonDataPath);
}

await prebuild();
