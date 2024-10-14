import { FooterDataType } from "../types/footer";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getFooterData(
  lang: string
): Promise<FooterDataType | null> {
  try {
    const res = await fetch(`${baseUrl}/footer?lang=${lang}`, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch header links 2");
    }
    const data: FooterDataType = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
