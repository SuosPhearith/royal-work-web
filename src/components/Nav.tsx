"use client";

import { Link as LinkType } from "@/lib/types/header";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

// icons
import { IoIosArrowDown } from "react-icons/io";

const links: LinkType[] = [
  {
    title: "វិស័យ",
    items: [
      {
        id: 1,
        name: "វិស័យរដ្ឋបាលទូទៅ",
        items: [
          {
            id: 1,
            name: "ក្រសួងមហាផ្ទៃ",
            value: 121,
          },
          {
            id: 2,
            name: "ក្រសួងយុត្តិធម៌",
            value: 85,
          },
          {
            id: 3,
            name: "ក្រសួងការពារជាតិ",
            value: 90,
          },
        ],
      },
      {
        id: 2,
        name: "វិស័យសុខាភិបាល",
        items: [
          {
            id: 4,
            name: "ក្រសួងសុខាភិបាល",
            value: 200,
          },
          {
            id: 5,
            name: "ក្រសួងបរិស្ថាន",
            value: 75,
          },
        ],
      },
      {
        id: 3,
        name: "វិស័យអប់រំ",
        items: [
          {
            id: 6,
            name: "ក្រសួងអប់រំ យុវជន និងកីឡា",
            value: 150,
          },
          {
            id: 7,
            name: "ក្រសួងកសិកម្ម រុក្ខាប្រមាញ់ និងនេសាទ",
            value: 130,
          },
        ],
      },
      {
        id: 4,
        name: "វិស័យទេសចរណ៍ និងពាណិជ្ជកម្ម",
        items: [
          {
            id: 8,
            name: "ក្រសួងទេសចរណ៍",
            value: 95,
          },
          {
            id: 9,
            name: "ក្រសួងពាណិជ្ជកម្ម",
            value: 110,
          },
        ],
      },
    ],
  },
  {
    title: "គតិយុត្ត",
    items: [
      {
        id: 1,
        name: "វិស័យរដ្ឋបាលទូទៅ",
        items: [
          {
            id: 1,
            name: "ក្រសួងមហាផ្ទៃ",
            value: 100,
          },
          {
            id: 2,
            name: "ក្រសួងយុត្តិធម៌",
            value: 85,
          },
          {
            id: 3,
            name: "ក្រសួងការពារជាតិ",
            value: 90,
          },
        ],
      },
      {
        id: 2,
        name: "វិស័យសុខាភិបាល",
        items: [
          {
            id: 4,
            name: "ក្រសួងសុខាភិបាល",
            value: 200,
          },
          {
            id: 5,
            name: "ក្រសួងបរិស្ថាន",
            value: 75,
          },
        ],
      },
      {
        id: 4,
        name: "វិស័យទេសចរណ៍ និងពាណិជ្ជកម្ម",
        items: [
          {
            id: 8,
            name: "ក្រសួងទេសចរណ៍",
            value: 95,
          },
          {
            id: 9,
            name: "ក្រសួងពាណិជ្ជកម្ម",
            value: 110,
          },
        ],
      },
    ],
  },
  {
    title: "កម្មវិធីAI",
    items: [
      {
        id: 3,
        name: "វិស័យអប់រំ",
        items: [
          {
            id: 6,
            name: "ក្រសួងអប់រំ យុវជន និងកីឡា",
            value: 150,
          },
          {
            id: 7,
            name: "ក្រសួងកសិកម្ម រុក្ខាប្រមាញ់ និងនេសាទ",
            value: 130,
          },
        ],
      },
      {
        id: 4,
        name: "វិស័យទេសចរណ៍ និងពាណិជ្ជកម្ម",
        items: [
          {
            id: 8,
            name: "ក្រសួងទេសចរណ៍",
            value: 95,
          },
          {
            id: 9,
            name: "ក្រសួងពាណិជ្ជកម្ម",
            value: 110,
          },
        ],
      },
    ],
  },
];

// Define an interface for props
interface NavProps {
  activeLink: string; // The currently active link
  setActiveLink: (link: string) => void; // Function to update the active link
}

// Component definition
const Nav: React.FC<NavProps> = ({ activeLink, setActiveLink }) => {
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
            key={index}
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
      <Image
        className="cursor-pointer me-2"
        src="/images/flags/khmer.png"
        width={26}
        height={26}
        alt="flag"
      />
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
              <div className="w-1/3 mt-2" key={item.id}>
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
