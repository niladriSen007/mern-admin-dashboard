export interface PriceConfiguration {
  [key: string]: {
      priceType: string;
      availableOptions: string[];
      _id: string;
  };
}

export interface Attributes {
  _id: string;
  name: string;
  widgetType: string;
  defaultValue: string;
  availableOptions: string[];
}

export interface Category{
  _id: string;
  name: string;
  priceConfiguration: PriceConfiguration;
  attributes: Attributes[];
}