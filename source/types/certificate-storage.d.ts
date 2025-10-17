interface CertificateState {
  conf: string;
  vmoptions: string;
  publicPem: string;
  privatePem: string;
  setConf: (conf: string) => void;
  setVMOptions: (vmoptions: string) => void;
  setPublicPem: (publicPem: string) => void;
  setPrivatePem: (privatePem: string) => void;
}
