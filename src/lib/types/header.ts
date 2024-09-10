export interface HeaderDataType {
  logo: string;
  logoWhite: string;
  links: Link[];
}
export interface Link {
  title: string;
  items: Item[];
}

export interface Item {
  id: string | number;
  name: string;
  items: EachItem[];
}

export interface EachItem {
  id: string | number;
  name: string;
  value: string | number;
}
