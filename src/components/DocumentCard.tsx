import Image from "next/image";
import { FaBookmark } from "react-icons/fa";
import { FiBookmark } from "react-icons/fi";

const baseFileUrl = process.env.NEXT_PUBLIC_FILE_URL;

interface DocumentCardProps {
  title: string;
  bookmark: boolean;
  image: string;
  logo: string;
  date: string;
}

const DocumentCard: React.FC<DocumentCardProps> = ({
  title,
  bookmark,
  image,
  logo,
  date,
}) => {
  const timeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const intervals: { [key: string]: number } = {
      year: 31536000, // 60 * 60 * 24 * 365
      month: 2592000, // 60 * 60 * 24 * 30
      week: 604800, // 60 * 60 * 24 * 7
      day: 86400, // 60 * 60 * 24
      hour: 3600, // 60 * 60
      minute: 60, // 60
      second: 1,
    };

    for (const [key, value] of Object.entries(intervals)) {
      const count = Math.floor(seconds / value);
      if (count >= 1) {
        return count === 1 ? `1 ${key} ago` : `${count} ${key}s ago`;
      }
    }

    return "just now";
  };
  return (
    <div className="w-[20rem] rounded-lg bg-[#F1F5F9] py-2 px-4 relative">
      {/* Title */}
      <div className="flex justify-between items-center my-3">
        <h3 className="text-[14px] text-gray-800">{title}</h3>
        {/* Bookmark Icon */}
        {bookmark ? (
          <FaBookmark className="w-6 h-6 text-yellow-500" />
        ) : (
          <FiBookmark className="w-6 h-6" />
        )}
      </div>
      <a
        className="mb-4 h-[120px] flex justify-center cursor-pointer"
        href={`${baseFileUrl}${image}`}
        target="_blank"
      >
        <Image
          src={`/images/photo_2024-09-07_14-37-23.jpg`}
          alt="Document preview"
          width={300}
          height={120}
          className="rounded-lg w-full h-[120px] object-cover bg-slate-400"
        />
      </a>

      {/* Footer */}
      <div className="flex justify-between items-center text-gray-500 text-sm">
        {/* Organization Logo */}
        <Image
          src={`${baseFileUrl}${logo}`}
          alt="Ministry logo"
          width={20}
          height={29}
          className="rounded-full"
        />
        {/* Time Ago */}
        <span className="text-[12px]">{timeAgo(date)}</span>
      </div>
    </div>
  );
};

export default DocumentCard;

// "use client";
// import Image from "next/image";
// import { FaBookmark } from "react-icons/fa";
// import { FiBookmark } from "react-icons/fi";
// import PdfViewer from "./PdfViewer";
// import { useState } from "react";
// import { Modal } from "antd";

// const baseFileUrl = process.env.NEXT_PUBLIC_FILE_URL;

// interface DocumentCardProps {
//   title: string;
//   bookmark: boolean;
//   image: string;
//   logo: string;
//   date: string;
// }

// const DocumentCard: React.FC<DocumentCardProps> = ({
//   title,
//   bookmark,
//   image,
//   logo,
//   date,
// }) => {
//   const [showPdf, setShowPdf] = useState(false);

//   return (
//     <div className="w-[20rem] rounded-lg bg-[#F1F5F9] py-2 px-4 relative">
//       {/* Title */}
//       <div className="flex justify-between items-center my-3">
//         <h3 className="text-[14px] text-gray-800">{title}</h3>
//         {/* Bookmark Icon */}
//         {bookmark ? (
//           <FaBookmark className="w-6 h-6 text-yellow-500" />
//         ) : (
//           <FiBookmark className="w-6 h-6" />
//         )}
//       </div>

//       {/* Image Preview */}
//       {/* <div
//         className="mb-4 h-[120px] flex justify-center cursor-pointer"
//         onClick={() => setShowPdf(true)}
//       >
//         <Image
//           src={`/images/photo_2024-09-07_14-37-23.jpg`}
//           alt="Document preview"
//           width={300}
//           height={120}
//           className="rounded-lg w-full h-[120px] object-cover bg-slate-400"
//         />
//       </div> */}
//       <a
//         className="mb-4 h-[120px] flex justify-center cursor-pointer"
//         href={`${baseFileUrl}${image}`}
//         target="_blank"
//       >
//         <Image
//           src={`/images/photo_2024-09-07_14-37-23.jpg`}
//           alt="Document preview"
//           width={300}
//           height={120}
//           className="rounded-lg w-full h-[120px] object-cover bg-slate-400"
//         />
//       </a>

//       {/* Footer */}
//       <div className="flex justify-between items-center text-gray-500 text-sm">
//         {/* Organization Logo */}
//         <Image
//           title={title}
//           src={`${baseFileUrl}${logo}`}
//           alt="Ministry logo"
//           width={20}
//           height={29}
//           className="rounded-full"
//         />
//         {/* Time Ago */}
//         <span className="text-[12px]">{date}</span>
//       </div>
//       <Modal
//         width={1400}
//         style={{ top: 10 }}
//         onClose={() => setShowPdf(false)}
//         onCancel={() => setShowPdf(false)}
//         title="Basic Modal"
//         footer={false}
//         open={showPdf}
//       >
//         <div className="relative w-full h-full p-5">
//           <PdfViewer pdfUrl={`${baseFileUrl}${image}`} />
//         </div>
//       </Modal>
//     </div>
//   );
// };

// export default DocumentCard;
