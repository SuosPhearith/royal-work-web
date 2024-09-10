"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// components
import Nav from "./Nav";
import MobileNav from "./MobileNav";
import { usePathname } from "next/navigation";
import { HeaderDataType } from "@/lib/types/header";

interface HeaderProps {
  data: HeaderDataType;
  lang: string;
}

export default function Header({ data, lang }: HeaderProps) {
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
                ? data.logo
                : data.logoWhite
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
          />
        </div>
        {/* mobile nav */}
        <div className="lg:hidden">
          <MobileNav links={data.links} lang={lang} />
        </div>
      </div>
    </header>
  );
}
