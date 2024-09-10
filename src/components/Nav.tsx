"use client";

import { Link } from "@/lib/types/header";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

// icons
import { IoIosArrowDown } from "react-icons/io";
import LanguageSwitcher from "./LanguageSwitcher";

// Define an interface for props
interface NavProps {
  links: Link[];
  activeLink: string; // The currently active link
  setActiveLink: (link: string) => void; // Function to update the active link
  lang: string;
}

// Component definition
const Nav: React.FC<NavProps> = ({
  activeLink,
  setActiveLink,
  links,
  lang,
}) => {
  const [isDropdownNav, setIsDropdownNav] = useState(false);
  const [indexDropdown, setIndexDropdown] = useState<number | null>(null);
  const pathname = usePathname();
  const router = useRouter(); // Use Next.js router

  /**
   * Function to handle dropdown menu logic
   * @param title - The title of the menu item
   * @param index - The index of the dropdown menu to be toggled
   */
  const handleDropdown = (title: string, index: number) => {
    // If no active link is selected, open the dropdown and set the active link
    if (!activeLink) {
      setIsDropdownNav(true);
      setActiveLink(title);
      setIndexDropdown(index);
    }
    // If a different link is clicked while a dropdown is open, switch to that dropdown
    else if (activeLink !== title && isDropdownNav) {
      setActiveLink(title);
      setIndexDropdown(index);
    }
    // If the same link is clicked, close the dropdown
    else if (activeLink === title) {
      setIsDropdownNav(false);
      setActiveLink("");
      setIndexDropdown(null);
    }
  };

  // Function to handle navigation and close dropdown
  const handleLinkClick = (href: string) => {
    setIsDropdownNav(false); // Close the dropdown
    setActiveLink(""); // Reset active link
    setIndexDropdown(null); // Reset index
    router.push(href); // Navigate to the link
  };

  return (
    <nav className="flex gap-2 items-center">
      {/* Links section */}
      <div className="flex items-center gap-7 me-4">
        {links.map((item, index) => (
          <div
            className={`text-text hover:text-secondary cursor-pointer flex items-center ${
              pathname === "/document" ? "text-black" : "" // Highlight the link if the path is /document
            } ${activeLink === item.title ? "text-primary" : ""}`} // Apply primary color if link is active
            key={item.title}
            onClick={() => handleDropdown(item.title, index)} // Handle dropdown logic
          >
            {/* Link title */}
            <div>{item.title}</div>
            {/* Dropdown arrow icon */}
            <div className="ms-1">
              <IoIosArrowDown />
            </div>
          </div>
        ))}
      </div>

      {/* Flags and profile images */}
      <LanguageSwitcher lang={lang} />
      <Image
        className="cursor-pointer rounded-full"
        src="/images/flags/profile.png"
        width={40}
        height={40}
        alt="flag"
      />

      {/* Dropdown menu logic */}
      {isDropdownNav && (
        <div className="w-full fixed top-[5rem] left-0 right-0 bg-slate-500 h-screen bg-opacity-50">
          <div className="container bg-white flex justify-between p-6 rounded-b-lg flex-wrap">
            {/* Dynamically render items of the active dropdown */}
            {links[indexDropdown || 0].items?.map((item) => (
              <div className="w-1/3 mt-2" key={item.name}>
                {/* Section title */}
                <div className="font-semibold text-[18px] text-secondary mb-3">
                  {item.name}
                </div>
                {/* Links inside dropdown */}
                {item.items.map((subItem) => (
                  <div
                    key={subItem.id}
                    className="text-black hover:text-primary cursor-pointer"
                    onClick={() => handleLinkClick("/document")} // Handle link click and close dropdown
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
    </nav>
  );
};

export default Nav;
