// components
import Document from "@/components/Document";
import Ministry from "@/components/Ministry";
import SearchArea from "@/components/SearchArea";

export default function Home() {
  return (
    <main>
      <SearchArea />
      <Ministry />
      <Document title="ឯកសារថ្មីៗ" />
      <Document title="ឯកសារសំខាន់ៗ" />
      <Document title="មើលច្រើនជាងគេ" />
    </main>
  );
}
