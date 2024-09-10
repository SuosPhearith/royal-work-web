import Document from "@/components/Document";
import ErrorComponent from "@/components/ErrorComponent";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Ministry from "@/components/Ministry";
import SearchArea from "@/components/SearchArea";
import { getFooterData } from "@/lib/api/footer";
import { getHeaderData } from "@/lib/api/header";
import { getMinistryData } from "@/lib/api/ministry";
import { getSearchAreaData } from "@/lib/api/searchArea";
import { FooterDataType } from "@/lib/types/footer";
import { HeaderDataType } from "@/lib/types/header";
import { MinistryDataType } from "@/lib/types/ministry";
import { SearchAreaType } from "@/lib/types/searchArea";
import { cookies } from "next/headers";

export default async function Home() {
  // Get cookies from the request headers
  const cookieStore = cookies();
  const lang: string = cookieStore.get("lang")?.value || "kh"; // Default to 'kh' if no cookie

  try {
    // Fetch all the data based on the selected language
    const [headerData, searchAreaData, ministryData, footerData]: [
      HeaderDataType | null,
      SearchAreaType | null,
      MinistryDataType | null,
      FooterDataType | null
    ] = await Promise.all([
      getHeaderData(lang),
      getSearchAreaData(lang),
      getMinistryData(lang),
      getFooterData(lang),
    ]);

    // Check if any of the data is null and return an error component
    if (!headerData || !searchAreaData || !ministryData || !footerData) {
      return <ErrorComponent />;
    }

    // Render the page with the fetched data
    return (
      <main>
        <Header data={headerData} lang={lang} />
        <SearchArea data={searchAreaData} />
        <Ministry data={ministryData} />
        <Document title="ឯកសារថ្មីៗ" />
        <Document title="ឯកសារសំខាន់ៗ" />
        <Document title="មើលច្រើនជាងគេ" />
        <Footer data={footerData} />
      </main>
    );
  } catch (error) {
    return <ErrorComponent />;
  }
}
