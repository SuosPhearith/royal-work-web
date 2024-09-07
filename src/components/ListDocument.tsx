"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FiDownload } from "react-icons/fi"; // Download icon for the download column
import { IoIosArrowForward } from "react-icons/io";
import { SlHome } from "react-icons/sl";

const documents = [
  {
    id: 1,
    number: "១៥១៤",
    title: "កាលបរិច្ឆេទកំណត់សម្រាប់ការប្រឡងជ្រើសរើសមន្ត្រី ២០២២ - ២០២៣",
    description: "ផ្សព្វផ្សាយ - ១ ខែមុន",
  },
  {
    id: 2,
    number: "៣០៣",
    title: "លិខិតដៃគូទាក់ទងនឹងការអនុវត្តន៍ច្បាប់ការរដ្ឋបាល",
    description: "ប្រកាសជាផ្លូវការ - ៥ ខែមុន",
  },
  {
    id: 3,
    number: "១២២",
    title: "ប្រកាសអំពីការកែសម្រួលមួយចំនួននៃគោលការណ៍",
    description: "អនុគ្រោ - ១០ ខែមុន",
  },
  {
    id: 4,
    number: "២៥២",
    title: "ការជំរុញការអនុវត្តន៍សុវត្ថិភាពចំពោះអន្តរជាតិ",
    description: "ប្រាសាទនាគ - ១៥ ខែមុន",
  },
  {
    id: 5,
    number: "៦៥៤",
    title: "កំណត់ហេតុប្រតិបត្តិការប្រជុំសាធារណជន",
    description: "ផ្សព្វផ្សាយ - ២ ខែមុន",
  },
  {
    id: 6,
    number: "៧៨៧",
    title: "ប្រកាសស្តីពីការផ្លាស់ប្តូរគោលនយោបាយដើម",
    description: "សេចក្ដីជូនដំណឹង - ៣ ខែមុន",
  },
  {
    id: 7,
    number: "៨៨៩",
    title: "កិច្ចព្រមព្រៀងអន្តរជាតិស្តីពីការអភិវឌ្ឍន៍និងសន្តិសុខ",
    description: "សេចក្ដីជូនដំណឹង - ៤ ខែមុន",
  },
  {
    id: 8,
    number: "៩១១",
    title: "សេចក្ដីណែនាំស្តីពីការគ្រប់គ្រងទិន្នន័យ",
    description: "ផ្សព្វផ្សាយ - ២ ខែមុន",
  },
  {
    id: 9,
    number: "៩៧៥",
    title: "ប្រកាសស្តីពីការបង្កើនសមត្ថភាពការងារសាធារណៈ",
    description: "ផ្សព្វផ្សាយ - ៦ ខែមុន",
  },
  {
    id: 10,
    number: "៩៨៧",
    title: "ប្រកាសអំពីការផ្លាស់ប្តូរផ្នែកសេដ្ឋកិច្ច",
    description: "អនុគ្រោ - ១ ខែមុន",
  },
];

const ListDocument = () => {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search");
  return (
    <section className="px-4 py-6">
      <div className="container mx-auto my-24">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between border-secondary border-b-[1px] pb-5 mb-10 max-[830px]:flex-col max-[830px]:items-start">
          <div className="flex items-center space-x-2 text-sm text-[20px] text-secondary font-bold max-[830px]:text-[16px]">
            <SlHome className="mb-2" />
            <Link href={"/"}>
              <div className="min-w-[60px]">ទំព័រដើម</div>
            </Link>
            <IoIosArrowForward className="mb-1" />
            <span>ស្វែងរក</span>
            <div>៖</div>
            <span className="w-[9rem] truncate">{searchTerm}</span>
          </div>
          <div className="relative">
            <input
              type="text"
              className="border border-gray-300 rounded-lg pl-10 pr-4 py-2 w-80 focus:outline-none focus:border-blue-500"
              placeholder="ស្វែងរកឯកសារ"
            />
            <svg
              className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 2a8 8 0 015.293 13.293l5.707 5.707-1.414 1.414-5.707-5.707A8 8 0 1110 2zm0 2a6 6 0 100 12 6 6 0 000-12z"
              />
            </svg>
          </div>
        </div>

        {/* Document List Table */}
        <div className="overflow-hidden rounded-lg">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm font-semibold">
                <th className="py-3 px-4 text-text">លេខសម្គាល់</th>
                <th className="py-3 px-4 text-text">ចំណងជើង</th>
                <th className="py-3 px-4 text-right text-text">ទាញយក</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc, index) => (
                <tr
                  key={doc.id}
                  className={`hover:bg-gray-100 text-gray-700 ${
                    index % 2 === 0 ? "bg-[#F3F4F5]" : ""
                  }`}
                >
                  <td className="py-3 px-4 text-text">{doc.number}</td>
                  <td className="py-3 px-4 text-text">
                    <div className="text-sm font-medium">{doc.title}</div>
                    <div className="text-gray-500 text-[12px]">
                      {doc.description}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button className="text-blue-500 hover:text-blue-600">
                      <FiDownload size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ListDocument;
