interface FIDETag {
  id: string;
  name: string;
}

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

interface FIDERelease {
  date: string;
  type: 'release';
  downloads: FIDEReleaseDownload;
  majorVersion: string;
  build: string;
}

interface FIDEDataItem {
  code: string;
  salesCode: string;
  name: string;
  productFamilyName: string;
  link: string;
  description: string;
  tags: FIDETag[];
  releases: FIDERelease[];
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
