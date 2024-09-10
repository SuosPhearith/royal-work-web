import ErrorComponent from "@/components/ErrorComponent";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ListDocument from "@/components/ListDocument";
import { getFooterData } from "@/lib/api/footer";
import { getHeaderData } from "@/lib/api/header";
import { FooterDataType } from "@/lib/types/footer";
import { HeaderDataType } from "@/lib/types/header";
import { cookies } from "next/headers";
import { Suspense } from "react";

export default async function Document() {
  // Get cookies from the request headers
  const cookieStore = cookies();
  const lang = cookieStore.get("lang")?.value || "kh"; // Default to 'en' if no cookie

  // Fetch header data based on the selected language
  const headerData: HeaderDataType | null = await getHeaderData(lang);

  // Fetch ministry data based on the selected language
  const footerData: FooterDataType | null = await getFooterData(lang);

  // Check data not null
  if (!headerData || !footerData) {
    return <ErrorComponent />;
  }
  return (
    <main>
      <Header data={headerData} lang={lang} />
      <Suspense>
        <ListDocument />
      </Suspense>
      <Footer data={footerData} />
    </main>
  );
}
