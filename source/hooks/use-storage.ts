import type { StateCreator } from 'zustand';

import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

// Define a zustand middleware
export function storageMiddleware<T>(
  initialize: StateCreator<T, [['zustand/immer', never]], []>,
  storageName: string,
) {
  return persist(immer(initialize), {
    name: storageName,
  });
}

export { certificateStorage as useCertificateStorage } from '@/hooks/storage/certificate-storage';
export { licenseStorage as useLicenseStorage } from '@/hooks/storage/license-storage';
export { localStorage as useLocalStorage } from '@/hooks/storage/local-storage';
