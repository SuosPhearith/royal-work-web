import { DocsResponse, DocumentListWeb } from "../types/listDocument";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const emptyDocsResponse: DocsResponse = {
  data: [],
  pagination: {
    totalDocs: 0,
    totalPages: 0,
    currentPage: 0,
  },
};

export async function getDocs(
  limit: number = 10,
  page: number = 1,
  search: string
): Promise<DocsResponse> {
  try {
    const res = await fetch(
      `${baseUrl}/list-docs?limit=${limit}&page=${page}&search=${search}`,
      {
        method: "GET",
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch documents");
    }
    const data: DocsResponse = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return emptyDocsResponse; // Return default empty response in case of an error
  }
}

export async function getWebData(
  lang: string
): Promise<DocumentListWeb | null> {
  try {
    const res = await fetch(`${baseUrl}/list-docs/web?lang=${lang}`, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch");
    }
    const data: DocumentListWeb = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
