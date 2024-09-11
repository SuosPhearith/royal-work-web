export interface Doc {
  id: number;
  title: string;
  created_at: string;
  file_uri: string;
  docs_type: DocsType;
  extension: string;
}

export interface DocsType {
  id: number;
  name: string;
}

export interface Pagination {
  totalDocs: number;
  totalPages: number;
  currentPage: number;
}

export interface DocsResponse {
  data: Doc[];
  pagination: Pagination;
}
