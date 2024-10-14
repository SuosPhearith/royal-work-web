"use client";
import { setCookie } from "nookies";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { LanguageType } from "@/lib/types/language";

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

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = event.target.value;
    setSelectedLang(selectedLang);
    switchLanguage(selectedLang);
  };

  return (
    <select
      value={selectedLang}
      onChange={handleChange}
      className={`bg-transparent border-none outline-none cursor-pointer ${
        pathname === "/document" ? "text-black" : ""
      }`}
    >
      {language.map((lang) => (
        <option
          key={lang.id}
          value={lang.code}
          className="bg-white text-black py-2 px-4"
        >
          {lang.name}
        </option>
      ))}
    </select>
  );
};

export default LanguageSwitcher;
