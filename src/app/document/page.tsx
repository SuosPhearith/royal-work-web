import ErrorComponent from "@/components/ErrorComponent";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ListDocument from "@/components/ListDocument";
import { getFooterData } from "@/lib/api/footer";
import { getHeaderData } from "@/lib/api/header";
import { getWebData } from "@/lib/api/listDocument";
import { FooterDataType } from "@/lib/types/footer";
import { HeaderDataType } from "@/lib/types/header";
import { DocumentListWeb } from "@/lib/types/listDocument";
import { cookies } from "next/headers";
import { Suspense } from "react";

export default async function Document() {
  // Get cookies from the request headers
  const cookieStore = cookies();
  const lang = cookieStore.get("lang")?.value || "kh";

  try {
    // Fetch all data concurrently using Promise.all
    const [headerData, footerData, webData]: [
      HeaderDataType | null,
      FooterDataType | null,
      DocumentListWeb | null
    ] = await Promise.all([
      getHeaderData(lang), // Fetch header data
      getFooterData(lang), // Fetch footer data
      getWebData(lang), // Fetch document list data
    ]);

    // Check if any of the fetched data is null
    if (!headerData || !footerData || !webData) {
      return <ErrorComponent />;
    }

    return (
      <main>
        <Header data={headerData} lang={lang} />
        <Suspense>
          <ListDocument dataWeb={webData} />
        </Suspense>
        <Footer data={footerData} />
      </main>
    );
  } catch (error) {
    // Handle any errors in fetching data
    return <ErrorComponent />;
  }
}
