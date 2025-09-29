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

interface ProductJsonData {
  ides: IDEDataItem[];
  plugins: PluginDataItem[];
  buildtime: number;
};
