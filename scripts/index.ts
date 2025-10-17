import { certificateDataPath, filterRegexp, ideDataPath, pluginDataPath, privatePemPath, productVMOptions, publicPemPath, rootPemPath } from './config/config.js';
import { generateIDEData } from './library/fetch-ide-data.js';
import { generatePluginData } from './library/fetch-plugin-data.js';
import { generateCertificate, generateCertificateConf } from './library/generate-certificate.js';
import { checkIsPathExist, persistDataToFile, readFileData } from './utils/system-utils.js';

// Try to generate data about ide products
await checkIsPathExist([ideDataPath], async () => {
  await persistDataToFile(JSON.stringify({
    data: await generateIDEData(),
    buildtime: Date.now(),
  }, null, 2).replaceAll(filterRegexp, ''), ideDataPath);
});

// Try to generate data about plugin products
await checkIsPathExist([pluginDataPath], async () => {
  await persistDataToFile(JSON.stringify({
    data: await generatePluginData(),
    buildtime: Date.now(),
  }, null, 2).replaceAll(filterRegexp, ''), pluginDataPath);
});

// Try to generate data about certificate
await checkIsPathExist([certificateDataPath], async () => {
  // Generate self-signed certificates
  await checkIsPathExist([publicPemPath, privatePemPath], async () => {
    const { publicPem, privatePem } = await generateCertificate();

    await persistDataToFile(publicPem, publicPemPath);
    await persistDataToFile(privatePem, privatePemPath);
  });

  const rootPem = await readFileData(rootPemPath);
  const publicPem = await readFileData(publicPemPath);
  const privatePem = await readFileData(privatePemPath);

  await persistDataToFile(JSON.stringify({
    conf: await generateCertificateConf(rootPem, publicPem),
    vmoptions: productVMOptions.trim(),
    publicPem: publicPem.trim(),
    privatePem: privatePem.trim(),
  }, null, 2).replaceAll(filterRegexp, ''), certificateDataPath);
});
