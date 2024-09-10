import { IoIosArrowForward } from "react-icons/io";
import { IoDocumentTextOutline } from "react-icons/io5";
import DocumentCard from "./DocumentCard";
import Link from "next/link";

const documentCardsData = [
  {
    title: "ក្រមសីលធម៌ចំពោះ71C",
    bookmark: true,
    image: "/images/photo_2024-09-07_14-37-19.jpg",
    logo: "/images/mpwt.png",
    date: "2 months ago",
  },
  {
    title: "សេចក្តីប្រកាសសំណើរ",
    bookmark: false,
    image: "/images/photo_2024-09-07_14-37-23.jpg",
    logo: "/images/moenv.png",
    date: "3 months ago",
  },
  {
    title: "ច្បាប់ស្តីពីការបែងចែកដីធ្លី",
    bookmark: true,
    image: "/images/photo_2024-09-07_14-37-25.jpg",
    logo: "/images/maff.png",
    date: "1 month ago",
  },
  {
    title: "អនុក្រឹត្យស្តីពីការគ្រប់គ្រងទឹក",
    bookmark: false,
    image: "/images/photo_2024-09-07_14-37-31.jpg",
    logo: "/images/mwrm_logo.png",
    date: "5 months ago",
  },
  {
    title: "សេចក្តីជូនដំណឹងចំពោះរដ្ឋបាល",
    bookmark: true,
    image: "/images/photo_2024-09-07_14-37-35.jpg",
    logo: "/images/moi.png",
    date: "6 months ago",
  },
];

interface DocumentProps {
  title: string;
}

const Document: React.FC<DocumentProps> = ({ title }) => {
  return (
    <section className="w-screen">
      <div className="container flex flex-col items-center py-[50px] h-full w-full">
        <div className="flex justify-between items-center w-full">
          <div className="flex">
            <div className="text-secondary me-2">
              <IoDocumentTextOutline size={30} />
            </div>
            <div className="text-secondary text-title font-bold">{title}</div>
          </div>
          <Link href={"/document"}>
            <div className="flex cursor-pointer">
              <div className="text-primary text-text font-bold">ទាំងអស់</div>
              <div className="text-primary">
                <IoIosArrowForward size={20} />
              </div>
            </div>
          </Link>
        </div>
        <div className="w-full overflow-x-auto whitespace-nowrap flex space-x-4 pb-5 my-10">
          {documentCardsData.map((doc) => (
            <div key={doc.title} className="inline-block">
              <DocumentCard
                // key={index}
                title={doc.title}
                bookmark={doc.bookmark}
                image={doc.image}
                logo={doc.logo}
                date={doc.date}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Document;
