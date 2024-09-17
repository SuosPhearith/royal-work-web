import { Doc } from "./listDocument";

export interface EachDocumentKeyDataType {
  title: string;
  seeAll: string;
  docKeys: DocKey[];
}

export interface DocKey extends Doc {
  org: Org;
  markbook: boolean;
}

export interface Org {
  image_uri: string;
  name: string;
}
