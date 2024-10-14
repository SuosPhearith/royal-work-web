import { MinistryDataType } from "../types/ministry";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getMinistryData(
  lang: string
): Promise<MinistryDataType | null> {
  try {
    const res = await fetch(`${baseUrl}/ministry?lang=${lang}`, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch header links 6");
    }
    const data: MinistryDataType = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
