interface CertificateState {
  conf: string;
  publicPem: string;
  privatePem: string;
  setConf: (conf: string) => void;
  setPublicPem: (publicPem: string) => void;
  setPrivatePem: (privatePem: string) => void;
}
