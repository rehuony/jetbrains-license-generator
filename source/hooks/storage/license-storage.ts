import { create } from 'zustand';
import { storageMiddleware } from '@/hooks/use-storage';
import { getExpiryDate } from '@/utils/utils';

export const licenseStorage = create<LicenseState>()(
  storageMiddleware(
    set => ({
      email: 'rehuony@gmail.com',
      username: 'rehuony',
      expiryDate: getExpiryDate(),
      setEmail: (email) => {
        set((state) => {
          state.email = email;
        });
      },
      setUsername: (username) => {
        set((state) => {
          state.username = username;
        });
      },
      setExpiryDate: (expiryDate) => {
        set((state) => {
          state.expiryDate = expiryDate;
        });
      },
    }),
    'licenseStorage',
  ),
);
