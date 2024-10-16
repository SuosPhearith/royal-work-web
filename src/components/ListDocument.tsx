"use client";
import { getAllOrgs, getAllOrgsType, getDocs } from "@/lib/api/listDocument";
import {
  Doc,
  DocsResponse,
  DocumentListWeb,
  Org,
} from "@/lib/types/listDocument";
import { Select } from "antd";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import { FiDownload } from "react-icons/fi"; // Download icon for the download column
import { IoIosArrowForward } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdOutlineCancel,
} from "react-icons/md";
import { SlHome } from "react-icons/sl";
const baseFileUrl = process.env.NEXT_PUBLIC_FILE_URL;
const baseApiUrl = process.env.NEXT_PUBLIC_API_URL;

interface ListDocumentType {
  dataWeb: DocumentListWeb;
}

const ListDocument = ({ dataWeb }: ListDocumentType) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search");
  const orgsTerm = searchParams.get("orgs");
  const orgsTypeTerm = searchParams.get("orgs_type");
  // Data state
  const [selectedOrgs, setSelectedOrgs] = useState(orgsTerm || undefined);
  const [selectedOrgsType, setSelectedOrgsType] = useState(
    orgsTypeTerm || undefined
  );
  const [orgs, setOrgs] = useState<Org[]>([]);
  const [orgsType, setOrgsType] = useState<Org[]>([]);
  const [docs, setDocs] = useState<Doc[]>([]);
  const [limit, setLimit] = useState<number>(25);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [query, setQeury] = useState<string>(searchTerm || "");
  // Fetch data
  const getDocsData = async () => {
    try {
      const res: DocsResponse = await getDocs(
        limit,
        page,
        query,
        selectedOrgs,
        selectedOrgsType
      );
      const orgsRes: Org[] = await getAllOrgs();
      const orgsTypeRes: Org[] = await getAllOrgsType();
      setOrgs(orgsRes);
      setOrgsType(orgsTypeRes);
      setDocs(res.data);
      setTotalPages(res.pagination.totalPages);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDocsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, page, limit, selectedOrgs, selectedOrgsType]);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQeury(newQuery);
    setPage(1);
    router.push(`?search=${newQuery}`);
  };
  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };
  const handlePageChange = (page: number) => {
    setPage(page);
  };
  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPage(1);
    setLimit(parseInt(e.target.value));
  };
  const handleClearSearch = () => {
    setQeury("");
    setPage(1);
    router.push(`?search=${""}`);
  };

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
  const handleChangeOrgs = (value: string) => {
    router.push("/document");
    setSelectedOrgs(value);
  };
  const handleChangeOrgsType = (value: string) => {
    router.push("/document");
    setSelectedOrgsType(value);
  };
  return (
    <section className="px-4 py-6">
      <div className="container mx-auto my-24">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center justify-between border-secondary border-b-[1px] pb-5 mb-10 max-[830px]:flex-col max-[830px]:items-start">
          <div className="flex items-center space-x-2 text-sm text-[20px] text-secondary font-bold max-[830px]:text-[16px]">
            <SlHome className="mb-2" />
            <Link href={"/"}>
              <div className="min-w-[60px]">
                {dataWeb.homePage || "ទំព័រដើម"}
              </div>
            </Link>
            <IoIosArrowForward className="mb-1" />
            <span>{dataWeb.currectPage || "ស្វែងរក"}</span>
          </div>
          <div className="w-3/4 flex justify-end items-end gap-3">
            <Select
              value={selectedOrgsType}
              allowClear
              style={{ width: "25%" }}
              placeholder="វិស័យទាំងអស់"
              onChange={handleChangeOrgsType}
              options={orgsType}
              size="large"
              showSearch
              optionFilterProp="label"
            />
            <Select
              value={selectedOrgs}
              allowClear
              style={{ width: "25%" }}
              placeholder="អង្គភាពទាំងអស់"
              onChange={handleChangeOrgs}
              options={orgs}
              size="large"
              showSearch
              optionFilterProp="label"
            />

            <div className="relative">
              <input
                value={query}
                onChange={handleSearch}
                type="text"
                className="border border-gray-300 rounded-lg pl-10 pr-12 py-[7px] w-80 focus:outline-none focus:border-blue-500"
                placeholder={dataWeb.SearchPaceholder || "ស្វែងរកឯកសារ"}
              />
              <IoSearchOutline className="absolute left-3 top-[9px] w-6 h-6 text-gray-400" />

              <MdOutlineCancel
                onClick={handleClearSearch}
                className="absolute right-3 top-[9px] w-6 h-6 text-gray-400 cursor-pointer hover:text-secondary"
              />
            </div>
          </div>
        </div>

        {/* Document List Table */}
        <div className="overflow-hidden rounded-lg">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm font-semibold">
                <th className="py-3 px-4 text-text w-[120px]">
                  {dataWeb.id || "លេខសម្គាល់"}
                </th>
                <th className="py-3 px-4 text-text">
                  {dataWeb.title || "ចំណងជើង"}
                </th>
                <th className="py-3 px-4 text-right text-text w-[100px]">
                  {dataWeb.download || "ទាញយក"}
                </th>
              </tr>
            </thead>
            <tbody>
              {docs.map((doc, index) => (
                <tr
                  key={doc.id}
                  className={`hover:bg-gray-200 text-gray-700 ${
                    index % 2 === 0 ? "bg-[#F3F4F5]" : ""
                  }`}
                >
                  <td className="py-3 px-4 text-text">{doc.id}</td>
                  <td className="py-3 px-4 text-text">
                    <div className="text-sm font-medium">{doc.title}</div>
                    <div className="text-gray-500 text-[12px]">
                      {doc.docs_type.name} - {timeAgo(doc.created_at)}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right flex">
                    <a
                      href={`${baseFileUrl}${doc.file_uri}`}
                      target="_blank"
                      className="me-2 text-primary hover:text-secondary"
                    >
                      <FaRegEye size={20} />
                    </a>
                    <a
                      href={`${baseApiUrl}/list-docs/download?fileUrl=${encodeURIComponent(
                        `${baseFileUrl}${doc.file_uri}`
                      )}`}
                      className="text-primary hover:text-secondary"
                    >
                      <FiDownload size={20} />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-full mt-10 flex justify-center">
          <div
            onClick={handlePrevious}
            className="border px-3 py-2 rounded-md cursor-pointer hover:bg-slate-100 m-1 flex items-center"
          >
            <MdKeyboardDoubleArrowLeft />
            {dataWeb.previous || "មុន"}
          </div>
          <div className="flex">
            {Array.from({ length: totalPages }, (_, index) => {
              const start = Math.max(0, page - 3); // Adjust to show 5 items around current page
              const end = Math.min(totalPages, start + 5); // Ensure it shows 5 or less

              // Display only if index is within range
              if (index >= start && index < end) {
                return (
                  <div
                    key={index}
                    className={`border px-4 py-2 rounded-md cursor-pointer hover:bg-slate-100 m-1 flex items-center ${
                      index + 1 === page && "bg-slate-200"
                    }`}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </div>
                );
              }
            })}
          </div>
          <div
            onClick={handleNext}
            className="border px-3 py-2 rounded-md cursor-pointer hover:bg-slate-100 m-1 flex items-center"
          >
            {dataWeb.next || "បន្ទាប់"}
            <MdKeyboardDoubleArrowRight />
          </div>
          <div className="border px-3 py-2 rounded-md cursor-pointer hover:bg-slate-100 m-1 flex items-center">
            <select
              value={limit}
              onChange={handleLimitChange}
              className="bg-transparent outline-none cursor-pointer"
            >
              {[limit, 50, 100].map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListDocument;
