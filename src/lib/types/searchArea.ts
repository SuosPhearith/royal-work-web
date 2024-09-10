export interface SearchAreaType {
  startText: string;
  middleTexts: string[];
  endText: string;
  searchText: string;
}

export interface SearchCompleteType {
  data: CompleteText[];
  statusCode: number;
}

export interface CompleteText {
  title: string;
  id: number;
}
