interface FPluginListItem {
  id: number;
  pricingModel: string;
}

interface FPluginList {
  plugins: FPluginListItem[];
  total: number;
}

interface FPluginDataTag {
  id: number;
  name: string;
}

interface FPluginData {
  id: number;
  name: string;
  link: string;
  icon?: string;
  description: string;
  purchaseInfo?: {
    productCode: string;
  };
  tags?: FPluginDataTag[];
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
