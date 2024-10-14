import { IoIosArrowForward } from "react-icons/io";
import { IoDocumentTextOutline } from "react-icons/io5";
import DocumentCard from "./DocumentCard";
import Link from "next/link";
import { EachDocumentKeyDataType } from "@/lib/types/document";

interface DocumentProps {
  data: EachDocumentKeyDataType;
}

const Document: React.FC<DocumentProps> = ({ data }) => {
  return (
    <section className="w-screen">
      <div className="container flex flex-col items-center py-[50px] h-full w-full">
        <div className="flex justify-between items-center w-full">
          <div className="flex">
            <div className="text-secondary me-2">
              <IoDocumentTextOutline size={30} />
            </div>
            <div className="text-secondary text-title font-bold">
              {data.title || "ឯកសារ"}
            </div>
          </div>
          <Link href={"/document"}>
            <div className="flex cursor-pointer">
              <div className="text-primary text-text font-bold">
                {data.seeAll || "ឯកសារ"}
              </div>
              <div className="text-primary">
                <IoIosArrowForward size={20} />
              </div>
            </div>
          </Link>
        </div>
        {/* <Suspense> */}
        <div className="w-full overflow-x-auto whitespace-nowrap flex space-x-4 pb-5 my-10">
          {data.docKeys.map((doc) => (
            <div key={doc.title} className="inline-block">
              <DocumentCard
                title={doc.title}
                bookmark={doc.markbook}
                image={doc.file_uri}
                logo={doc.org.image_uri}
                date={doc.created_at}
              />
            </div>
          ))}
        </div>
        {/* </Suspense> */}
      </div>
    </section>
  );
};

export default Document;
