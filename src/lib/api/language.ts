import { LanguageType } from "../types/language";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getLanguageData(): Promise<LanguageType[] | []> {
  try {
    const res = await fetch(`${baseUrl}/language`, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch language");
    }
    const data: LanguageType[] = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
