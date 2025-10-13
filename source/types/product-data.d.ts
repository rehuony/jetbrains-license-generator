interface FIDEReleaseDownloadInfo {
  link: string;
  size: number;
  checksumLink: string;
}

interface FIDEReleaseDownload {
  linuxARM64?: FIDEReleaseDownloadInfo;
  linux?: FIDEReleaseDownloadInfo;
  windows?: FIDEReleaseDownloadInfo;
  windowsZip?: FIDEReleaseDownloadInfo;
  windowsZipWithOracleJRE?: FIDEReleaseDownloadInfo;
  windowsARM64?: FIDEReleaseDownloadInfo;
  mac?: FIDEReleaseDownloadInfo;
  macM1?: FIDEReleaseDownloadInfo;
}

interface IDEDataRelease {
  [version: string]: {
    [arch in keyof FIDEReleaseDownload]: FIDEReleaseDownloadInfo;
  };
}

interface IDEDataItem {
  type: 'ide';
  code: string;
  name: string;
  link: string;
  icon: string;
  description: string;
  tagName: string[];
  releases: IDEDataRelease;
}

interface PluginDataItem {
  type: 'plugin';
  id: number;
  code: string;
  name: string;
  link: string;
  icon: string;
  description: string;
  tagName: string[];
}

interface IDEDataJSON {
  data: IDEDataItem[];
  buildtime: number;
}

interface PluginDataJSON {
  data: PluginDataItem[];
  buildtime: number;
}

interface CertificateDataJSON {
  conf: string;
  publicPem: string;
  privatePem: string;
}
