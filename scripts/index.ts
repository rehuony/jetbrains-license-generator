import { buildTimestamp, destDataPath } from './library/config.js';
import { generateIDEData } from './library/fetch-ide-data.js';
import { generatePluginData } from './library/fetch-plugin-data.js';
import { checkFileIsExist, saveFetchedData } from './library/fetch-product-utils.js';

async function prebuild() {
  const isExist = await checkFileIsExist(destDataPath);

  if (isExist) {
    console.log(`destinotion already exists, skip generation: ${destDataPath}`);
    return;
  }
  console.log(`destinotion doesn't exists, regenerating: ${destDataPath}`);

  const idedata = await generateIDEData();
  const plugindata = await generatePluginData();

  const totaldata = {
    ides: idedata,
    plugins: plugindata,
    buildtime: buildTimestamp,
  };

  saveFetchedData(JSON.stringify(totaldata, null, 2), destDataPath);
}

await prebuild();
