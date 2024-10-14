"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// components
import Nav from "./Nav";
import MobileNav from "./MobileNav";
import { usePathname } from "next/navigation";
import { HeaderDataType } from "@/lib/types/header";
import { LanguageType } from "@/lib/types/language";
const baseFileUrl = process.env.NEXT_PUBLIC_FILE_URL;

interface HeaderProps {
  data: HeaderDataType;
  language: LanguageType[];
  lang: string;
}

export default function Header({ data, language, lang }: HeaderProps) {
  // state
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`h-[5rem] fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex items-center ${
        isScrolled || activeLink
          ? "bg-white text-black border-b-[1px] border-primary shadow-md"
          : "bg-transparent text-white"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* logo */}
        <Link href={"/"}>
          <Image
            className="cursor-pointer me-2"
            src={
              activeLink || isScrolled || pathname.includes("document")
                ? `${baseFileUrl}${data.logo}` || "/images/OSF-04-white.png"
                : `${baseFileUrl}${data.logoWhite}` ||
                  "/images/OSF-04-white.png"
            }
            width={120}
            height={120}
            alt="flag"
          />
        </Link>
        {/* desktop nav */}
        <div className="hidden lg:flex">
          <Nav
            activeLink={activeLink}
            setActiveLink={setActiveLink}
            links={data.links}
            lang={lang}
            language={language}
          />
        </div>
        {/* mobile nav */}
        <div className="lg:hidden">
          <MobileNav links={data.links} lang={lang} language={language} />
        </div>
      </div>
    </header>
  );
}
