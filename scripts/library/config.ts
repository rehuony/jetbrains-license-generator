import os from 'node:os';
import { resolve as resolvePath } from 'node:path';

// Timestamp at the time of build
export const buildTimestamp = Date.now();

// File path for saving the results
export const destinationPath = resolvePath(import.meta.dirname, '../../public');
export const jsonDataPath = resolvePath(destinationPath, 'generated/product.json');

// Number of concurrent requests processed by the process
export const processNumber = os.availableParallelism();

// Visiting https://www.jetbrains.com/products/ for resource sniffing.
export const ideProductCodes = ['CL', 'DC', 'DG', 'DM', 'DP', 'DS', 'GO', 'IIU', 'PCP', 'PS', 'RC', 'RD', 'RM', 'RR', 'RS', 'TC', 'WS'];
