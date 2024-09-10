import {
  CompleteText,
  SearchAreaType,
  SearchCompleteType,
} from "../types/searchArea";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getSearchAreaData(
  lang: string
): Promise<SearchAreaType | null> {
  try {
    const res = await fetch(`${baseUrl}/search-area?lang=${lang}`, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch header links");
    }
    const data: SearchAreaType = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getAutoCompleteSearchData(
  search: string
): Promise<CompleteText[] | []> {
  try {
    const res = await fetch(
      `${baseUrl}/search-area/auto-complete?search=${search}`,
      {
        method: "GET",
      }
    );
    if (!res.ok) {
      throw new Error("Failed to fetch header links");
    }
    const data: SearchCompleteType = await res.json();
    return data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
