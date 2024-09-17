import Document from "@/components/Document";
import ErrorComponent from "@/components/ErrorComponent";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Ministry from "@/components/Ministry";
import SearchArea from "@/components/SearchArea";
import { getDocumentsData } from "@/lib/api/document";
import { getFooterData } from "@/lib/api/footer";
import { getHeaderData } from "@/lib/api/header";
import { getMinistryData } from "@/lib/api/ministry";
import { getSearchAreaData } from "@/lib/api/searchArea";
import { EachDocumentKeyDataType } from "@/lib/types/document";
import { FooterDataType } from "@/lib/types/footer";
import { HeaderDataType } from "@/lib/types/header";
import { MinistryDataType } from "@/lib/types/ministry";
import { SearchAreaType } from "@/lib/types/searchArea";
import Head from "next/head";
import { cookies } from "next/headers";

export default async function Home() {
  // Get cookies from the request headers
  const cookieStore = cookies();
  const lang: string = cookieStore.get("lang")?.value || "kh"; // Default to 'kh' if no cookie

  try {
    // Fetch all the data based on the selected language
    const [
      headerData,
      searchAreaData,
      ministryData,
      footerData,
      documentsData,
    ]: [
      HeaderDataType | null,
      SearchAreaType | null,
      MinistryDataType | null,
      FooterDataType | null,
      EachDocumentKeyDataType[] | null
    ] = await Promise.all([
      getHeaderData(lang),
      getSearchAreaData(lang),
      getMinistryData(lang),
      getFooterData(lang),
      getDocumentsData(lang),
    ]);

    // Check if any of the data is null and return an error component
    if (!headerData || !searchAreaData || !ministryData || !footerData) {
      return <ErrorComponent />;
    }

    // Render the page with the fetched data
    return (
      <>
        <Head>
          <title>Royal Work App</title>
          <meta property="og:title" content="Royal Work App" key="title" />
          <meta
            property="og:description"
            content="Generated by the Royal Work App"
          />
          <meta property="og:image" content="/images/CamCyber_Logo_Draft.png" />
          <meta
            property="og:url"
            content="https://royal-work-web.vercel.app/"
          />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Royal Work App" />
          <meta property="og:locale" content="en_US" />
        </Head>
        <main>
          <Header data={headerData} lang={lang} />
          <SearchArea data={searchAreaData} />
          <Ministry data={ministryData} />
          {documentsData?.map((item) => (
            <Document data={item} key={item.title} />
          ))}
          <Footer data={footerData} />
        </main>
      </>
    );
  } catch (error) {
    return <ErrorComponent />;
  }
}
