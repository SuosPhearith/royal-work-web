import Image from "next/image";
import { FaBookmark } from "react-icons/fa";
import { FiBookmark } from "react-icons/fi"; // Using react-icons for the bookmark icon

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

      {/* Image Preview */}
      <div className="mb-4 h-[120px] flex justify-center">
        <Image
          src={image}
          alt="Document preview"
          width={300}
          height={120}
          className="rounded-lg w-full h-[120px] object-cover bg-slate-400"
        />
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center text-gray-500 text-sm">
        {/* Organization Logo */}
        <Image
          src={logo}
          alt="Ministry logo"
          width={20}
          height={29}
          className="rounded-full"
        />
        {/* Time Ago */}
        <span className="text-[12px]">{date}</span>
      </div>
    </div>
  );
};

export default DocumentCard;
