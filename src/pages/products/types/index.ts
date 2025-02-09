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

export interface Product {
  _id: string;
  name: string;
  imageUrl: string;
  description: string;
  category: Category;
  priceConfiguration: PriceConfiguration;
  attributes: Attributes[];
  isPublished: boolean;
  createdAt: string;
}

export interface FileldData{
  name: string[]
  value?: string
}

