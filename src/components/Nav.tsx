"use client";

import { Link } from "@/lib/types/header";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import LanguageSwitcher from "./LanguageSwitcher";
import { LanguageType } from "@/lib/types/language";
import { IoImageOutline } from "react-icons/io5";
import { PiUserSound } from "react-icons/pi";
import { MdOutlineKeyboardVoice } from "react-icons/md";

interface NavProps {
  links: Link[];
  activeLink: string;
  setActiveLink: (link: string) => void;
  lang: string;
  language: LanguageType[];
}

const Nav: React.FC<NavProps> = ({
  activeLink,
  setActiveLink,
  links,
  lang,
  language,
}) => {
  const [isDropdownNav, setIsDropdownNav] = useState(false);
  const [indexDropdown, setIndexDropdown] = useState<number | null>(null);
  const [aiMenuText, setAiMenuText] = useState("ទាញអក្សរខ្មែរពីរូបភាព");
  const pathname = usePathname();
  const router = useRouter();

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownNav(false);
        setActiveLink("");
        setIndexDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setActiveLink]);

  const handleDropdown = (title: string, index: number) => {
    if (activeLink !== title) {
      setIsDropdownNav(true);
      setActiveLink(title);
      setIndexDropdown(index);
    } else {
      setIsDropdownNav(false);
      setActiveLink("");
      setIndexDropdown(null);
    }
  };

  const handleLinkClick = (href: string) => {
    setIsDropdownNav(false);
    setActiveLink("");
    setIndexDropdown(null);
    router.push(href);
  };

  return (
    <nav className="flex gap-2 items-center">
      <div className="flex items-center gap-7 me-4">
        {links.map((item, index) => (
          <div
            key={item.title}
            onClick={() => handleDropdown(item.title, index)}
            className={`text-text hover:text-secondary cursor-pointer flex items-center ${
              pathname === "/document" ? "text-black" : ""
            } ${activeLink === item.title ? "text-primary" : ""}`}
          >
            <div className="text-[18px]">{item.title}</div>
            <div className="ms-1">
              <IoIosArrowDown />
            </div>
          </div>
        ))}
        <div
          onClick={() => handleDropdown("AI", -1)}
          className={`text-text hover:text-secondary cursor-pointer flex items-center ${
            pathname === "/document" ? "text-black" : ""
          } ${activeLink === "AI" ? "text-primary" : ""}`}
        >
          <div className="text-[18px]">
            {lang === "kh" ? "កម្មវិធីAI" : "AI software"}
          </div>
          <div className="ms-1">
            <IoIosArrowDown />
          </div>
        </div>
      </div>

      <LanguageSwitcher lang={lang} language={language} />

      {isDropdownNav && activeLink !== "AI" && (
        <div className="w-full fixed top-[5rem] left-0 right-0 bg-slate-500 h-screen bg-opacity-50">
          <div
            className="container bg-white flex justify-between p-6 rounded-b-lg flex-wrap"
            ref={dropdownRef}
          >
            {links[indexDropdown || 0].items?.map((item) => (
              <div className="w-1/3 mt-2" key={item.name}>
                <div className="font-semibold text-[18px] text-secondary mb-3">
                  {item.name}
                </div>
                {item.items.map((subItem) => (
                  <div
                    key={subItem.id}
                    className="text-black hover:text-primary cursor-pointer"
                    onClick={() =>
                      handleLinkClick(
                        indexDropdown === 1
                          ? `/document?orgs_type=${subItem.id}`
                          : `/document?orgs=${subItem.id}`
                      )
                    }
                  >
                    <div className="text-text ms-3 mt-2 flex items-center">
                      {subItem.name}
                      <span className="bg-slate-300 ms-2 px-3 py-0 text-[10px] rounded-lg">
                        {subItem.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {isDropdownNav && activeLink === "AI" && (
        <div className="w-full fixed top-[5rem] left-0 right-0 bg-slate-500 h-screen bg-opacity-50">
          <div
            className="container px-0 bg-white flex justify-between rounded-b-lg flex-wrap"
            ref={dropdownRef}
          >
            <div className="w-full text-[18px] flex ">
              <div className="w-1/4 flex flex-col p-5 my-6">
                <div
                  className={`flex items-center rounded-[20px] py-2 mb-2 cursor-pointer hover:text-primary ${
                    aiMenuText === "ទាញអក្សរខ្មែរពីរូបភាព"
                      ? "text-primary bg-[#EAEFF3]"
                      : ""
                  }`}
                  onClick={() => setAiMenuText("ទាញអក្សរខ្មែរពីរូបភាព")}
                >
                  <div className="me-2 flex items-center justify-center w-[60px]">
                    <IoImageOutline size={20} />
                  </div>
                  <div>ទាញអក្សរខ្មែរពីរូបភាព</div>
                </div>
                <div
                  className={`flex items-center rounded-[20px] py-2 mb-2 cursor-pointer hover:text-primary ${
                    aiMenuText === "បំប្លែងសំលេងទៅជាអក្សរ"
                      ? "text-primary bg-[#EAEFF3]"
                      : ""
                  }`}
                  onClick={() => setAiMenuText("បំប្លែងសំលេងទៅជាអក្សរ")}
                >
                  <div className="me-2 flex items-center justify-center w-[60px]">
                    <PiUserSound size={20} />
                  </div>
                  <div>បំប្លែងសំលេងទៅជាអក្សរ</div>
                </div>
                <div
                  className={`flex items-center rounded-[20px] py-2 mb-2 cursor-pointer hover:text-primary ${
                    aiMenuText === "បំប្លែងអក្សរទៅជាសំលេង"
                      ? "text-primary bg-[#EAEFF3]"
                      : ""
                  }`}
                  onClick={() => setAiMenuText("បំប្លែងអក្សរទៅជាសំលេង")}
                >
                  <div className="me-2 flex items-center justify-center w-[60px]">
                    <MdOutlineKeyboardVoice size={23} />
                  </div>
                  <div>បំប្លែងអក្សរទៅជាសំលេង</div>
                </div>
              </div>
              <div className="w-3/4 p-5 bg-[#ECF3FB] rounded-b-lg">
                <div className="my-6">
                  <div className="text-secondary">{aiMenuText}</div>
                  <p className="">Description</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
