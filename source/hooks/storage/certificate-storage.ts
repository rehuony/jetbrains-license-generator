import { create } from 'zustand';
import { storageMiddleware } from '@/hooks/use-storage';

export const certificateStorage = create<CertificateState>()(
  storageMiddleware(
    set => ({
      conf: '',
      publicPem: '',
      privatePem: '',
      setConf: (conf) => {
        set((state) => {
          state.conf = conf;
        });
      },
      setPublicPem: (publicPem) => {
        set((state) => {
          state.publicPem = publicPem;
        });
      },
      setPrivatePem: (privatePem) => {
        set((state) => {
          state.privatePem = privatePem;
        });
      },
    }),
    'certificateStorage',
  ),
);
