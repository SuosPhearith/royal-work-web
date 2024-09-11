import { Doc } from "./listDocument";

export interface EachDocumentKeyDataType {
  title: string;
  DocKeys: DocKey[];
}

export interface DocKey extends Doc {
  org: Org;
}

export interface Org {
  image_uri: string;
  name: string;
}
