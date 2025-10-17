import { availableParallelism } from 'node:os';
import { resolve } from 'node:path';

// Define regular expressions for filtering strings
export const filterRegexp = /[\u2003\u200B]/g;

// Define the current working project directory
export const rootPath = resolve(import.meta.dirname, '../..');
export const publicPath = resolve(import.meta.dirname, '../../public');
// File path for saving the results
export const assetsPath = resolve(publicPath, 'assets');
export const ideDataPath = resolve(publicPath, 'generated/ide-data.json');
export const pluginDataPath = resolve(publicPath, 'generated/plugin-data.json');
export const certificateDataPath = resolve(publicPath, 'generated/certificate-data.json');
// File path for saving the certificates
export const rootPemPath = resolve(rootPath, 'scripts/storage/root.crt');
export const publicPemPath = resolve(rootPath, 'scripts/storage/cert.crt');
export const privatePemPath = resolve(rootPath, 'scripts/storage/cert.key');

// Number of concurrent requests processed by the process
export const parallelismNumber = availableParallelism();

// Visiting https://www.jetbrains.com/products/ for resource sniffing.
export const ideProductCodes = ['CL', 'DC', 'DG', 'DM', 'DP', 'DS', 'GO', 'IIU', 'PCP', 'PS', 'RC', 'RD', 'RM', 'RR', 'RS', 'TC', 'WS'];

// Define the java vmoptions of the product
export const productVMOptions = `
-javaagent:/path/to/ja-netfilter/ja-netfilter.jar=jetbrains
--add-opens=java.base/jdk.internal.org.objectweb.asm=ALL-UNNAMED
--add-opens=java.base/jdk.internal.org.objectweb.asm.tree=ALL-UNNAMED
`;
