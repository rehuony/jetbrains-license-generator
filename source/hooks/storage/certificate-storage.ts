import { create } from 'zustand';
import { storageMiddleware } from '@/hooks/use-storage';

export const certificateStorage = create<CertificateState>()(
  storageMiddleware(
    set => ({
      conf: '',
      vmoptions: '',
      publicPem: '',
      privatePem: '',
      setConf: (conf) => {
        set((state) => {
          state.conf = conf;
        });
      },
      setVMOptions: (vmoptions) => {
        set((state) => {
          state.vmoptions = vmoptions;
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
