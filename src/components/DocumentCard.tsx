"use client";
import { Popover, Modal } from "antd";
import Image from "next/image";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaBookmark } from "react-icons/fa";
import { FiBookmark } from "react-icons/fi";
import { IoEyeOutline } from "react-icons/io5";
import { MdOutlineLink, MdOutlineSaveAlt } from "react-icons/md";

const baseFileUrl = process.env.NEXT_PUBLIC_FILE_URL;

interface DocumentCardProps {
  title: string;
  bookmark: boolean;
  file: string;
  image: string;
  logo: string;
  date: string;
}

const DocumentCard: React.FC<DocumentCardProps> = ({
  title,
  bookmark,
  file,
  image,
  logo,
  date,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const timeAgo = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const intervals: { [key: string]: number } = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
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

  const fileUrl = `${baseFileUrl}${file}`;

  const handleDownload = async () => {
    try {
      const response = await fetch(fileUrl, {
        method: "GET",
        headers: { "Content-Type": "application/octet-stream" },
      });

      if (!response.ok) throw new Error("Failed to fetch the file");

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = file;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Error downloading the file:", error);
    }
  };

  const handlePreview = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const content = (
    <div>
      <button
        onClick={handlePreview}
        className="hover:text-primary cursor-pointer flex items-center"
      >
        <IoEyeOutline className="me-1" />
        មើល
      </button>
      <a
        href={fileUrl}
        target="_blank"
        className="hover:text-primary cursor-pointer flex items-center text-black"
      >
        <MdOutlineLink className="me-1" />
        បើកទំព័រផ្សេង
      </a>
      <button
        onClick={handleDownload}
        className="hover:text-primary cursor-pointer flex items-center"
      >
        <MdOutlineSaveAlt className="me-1" />
        ទាញយក
      </button>
    </div>
  );

  return (
    <div className="w-[20rem] rounded-lg bg-[#F1F5F9] py-2 px-4 relative">
      <div className="flex justify-between items-center my-3">
        <h3 className="text-[14px] text-gray-800 truncate-title" title={title}>
          {title}
        </h3>
        <div className="flex justify-center items-center">
          {bookmark ? (
            <FaBookmark className="w-4 h-4 text-yellow-500 cursor-pointer hover:text-secondary" />
          ) : (
            <FiBookmark className="w-4 h-4 cursor-pointer hover:text-secondary" />
          )}
          <Popover placement="topLeft" content={content}>
            <BsThreeDotsVertical className="w-4 h-4 cursor-pointer hover:text-secondary" />
          </Popover>
        </div>
      </div>

      <div
        className="mb-4 h-[120px] flex justify-center cursor-pointer"
        onClick={handlePreview}
      >
        <Image
          src={`${baseFileUrl}${image}`}
          alt="Document preview"
          width={300}
          height={120}
          className="rounded-lg w-full h-[120px] object-cover bg-slate-400"
        />
      </div>

      <div className="flex justify-between items-center text-gray-500 text-sm">
        <Image
          src={`${baseFileUrl}${logo}`}
          alt="Ministry logo"
          width={20}
          height={29}
          className="rounded-full cursor-pointer"
        />
        <span className="text-[12px]">{timeAgo(date)}</span>
      </div>

      {/* Modal for Preview */}
      <Modal
        style={{ top: 20 }}
        title="ការមើលឯកសារជាមុន"
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        width={1200}
      >
        <embed
          src={fileUrl}
          type="application/pdf"
          width="100%"
          height="600px"
        />
      </Modal>
    </div>
  );
};

export default DocumentCard;
