import { availableParallelism } from 'node:os';
import { resolve } from 'node:path';

// Define whether the data should be regenerated
export const regenerate = false;

// Define regular expressions for filtering strings
export const filterStringRegex = /[\u2003\u200B]/g;

// File path for saving the results
export const destinationPath = resolve(import.meta.dirname, '../../public');
export const assetsPath = resolve(destinationPath, 'assets');
export const ideDataPath = resolve(destinationPath, 'generated/ide-data.json');
export const pluginDataPath = resolve(destinationPath, 'generated/plugin-data.json');

// Number of concurrent requests processed by the process
export const processNumber = availableParallelism();

// Visiting https://www.jetbrains.com/products/ for resource sniffing.
export const ideProductCodes = ['CL', 'DC', 'DG', 'DM', 'DP', 'DS', 'GO', 'IIU', 'PCP', 'PS', 'RC', 'RD', 'RM', 'RR', 'RS', 'TC', 'WS'];
