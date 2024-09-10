"use client";
import { setCookie } from "nookies";
import { useRouter } from "next/navigation";
import Image from "next/image";

const LanguageSwitcher = ({ lang }: { lang: string }) => {
  const router = useRouter();

  const switchLanguage = (lang: string) => {
    // Set the language in a cookie
    setCookie(null, "lang", lang, {
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
    });

    // Reload the page to apply the language change
    router.refresh();
  };

  return (
    <>
      {lang === "en" ? (
        <Image
          onClick={() => switchLanguage("kh")}
          className="cursor-pointer me-2"
          src="/images/flags/kh.png"
          width={26}
          height={26}
          alt="flag"
        />
      ) : (
        <Image
          onClick={() => switchLanguage("en")}
          className="cursor-pointer me-2"
          src="/images/flags/en.png"
          width={26}
          height={26}
          alt="flag"
        />
      )}
    </>
  );
};

export default LanguageSwitcher;
