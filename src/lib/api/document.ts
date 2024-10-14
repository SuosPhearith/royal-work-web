import { EachDocumentKeyDataType } from "../types/document";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getDocumentsData(
  lang: string
): Promise<EachDocumentKeyDataType[] | null> {
  try {
    const res = await fetch(`${baseUrl}/documents?lang=${lang}`, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch 1");
    }
    const data: EachDocumentKeyDataType[] = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
