import { certificatePemPath, filterStringRegex, ideDataPath, pluginDataPath, privatePemPath } from './config/config.js';
import { generateIDEData } from './library/fetch-ide-data.js';
import { generatePluginData } from './library/fetch-plugin-data.js';
import { generateCertificate } from './library/generate-certificate.js';
import { checkPathExist, persistDataToFile } from './utils/system-utils.js';

// Try to generate data about ide products
await checkPathExist([ideDataPath], async () => {
  await persistDataToFile(JSON.stringify({
    data: await generateIDEData(),
    buildtime: Date.now(),
  }, null, 2).replaceAll(filterStringRegex, ''), ideDataPath);
});

// Try to generate data about plugin products
await checkPathExist([pluginDataPath], async () => {
  await persistDataToFile(JSON.stringify({
    data: await generatePluginData(),
    buildtime: Date.now(),
  }, null, 2).replaceAll(filterStringRegex, ''), pluginDataPath);
});

// Try to generate self-signed certificates
await checkPathExist([privatePemPath, certificatePemPath], async () => {
  const { privatePem, certificatePem } = await generateCertificate();

  await persistDataToFile(privatePem, privatePemPath);
  await persistDataToFile(certificatePem, certificatePemPath);
});
