import { HeaderDataType } from "../types/header";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getHeaderData(
  lang: string
): Promise<HeaderDataType | null> {
  try {
    const res = await fetch(`${baseUrl}/header?lang=${lang}`, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch header links 3");
    }
    const data: HeaderDataType = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
