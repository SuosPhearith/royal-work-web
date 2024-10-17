"use client";
import { setCookie } from "nookies";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { LanguageType } from "@/lib/types/language";
import { Dropdown, MenuProps } from "antd";
import { IoIosArrowDown } from "react-icons/io";

const LanguageSwitcher = ({
  lang,
  language,
}: {
  lang: string;
  language: LanguageType[];
}) => {
  const router = useRouter();
  const [selectedLang, setSelectedLang] = useState(lang);
  const pathname = usePathname();

  const switchLanguage = (lang: string) => {
    // Set the language in a cookie
    setCookie(null, "lang", lang, {
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
    });

    // Reload the page to apply the language change
    router.refresh();
    window.location.reload();
  };

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    const newLang = e.key;
    setSelectedLang(newLang);
    switchLanguage(newLang);
  };

  const items: MenuProps["items"] = language.map((lang) => ({
    key: lang.code,
    label: lang.name,
  }));

  return (
    <Dropdown menu={{ items, onClick: handleMenuClick }} trigger={["click"]}>
      <a onClick={(e) => e.preventDefault()} className="cursor-pointer">
        <div
          className={`flex justify-center items-center ${
            pathname === "/document" ? "text-black" : ""
          }`}
        >
          {selectedLang}
          <IoIosArrowDown />
        </div>
      </a>
    </Dropdown>
  );
};

export default LanguageSwitcher;
