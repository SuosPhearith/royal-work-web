import { DocsResponse, DocumentListWeb, Org } from "../types/listDocument";
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
  search: string = "",
  orgs: string = "",
  orgs_type: string = ""
): Promise<DocsResponse> {
  try {
    const res = await fetch(
      `${baseUrl}/list-docs?limit=${limit}&page=${page}&search=${search}&orgs=${orgs}&orgs_type=${orgs_type}`,
      {
        method: "GET",
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch documents 4");
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
      throw new Error("Failed to fetch 5");
    }
    const data: DocumentListWeb = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getAllOrgs(): Promise<Org[] | []> {
  try {
    const res = await fetch(`${baseUrl}/list-docs/orgs`, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch 5");
    }
    const data: Org[] = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getAllOrgsType(): Promise<Org[] | []> {
  try {
    const res = await fetch(`${baseUrl}/list-docs/orgs-type`, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch 5");
    }
    const data: Org[] = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
