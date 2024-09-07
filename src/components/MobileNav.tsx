"use client";
import { Link as LinkType } from "@/lib/types/header";
import { Drawer } from "antd";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
// icons
import { IoIosArrowForward } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";

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

const MobileNav = () => {
  // State to controll pathname
  const pathname = usePathname();
  // State to control the visibility of the main drawer
  const [open, setOpen] = useState(false);
  // State to control the visibility of the child drawer (submenu)
  const [childrenDrawer, setChildrenDrawer] = useState(false);
  // State to track the currently selected index (menu item)
  const [index, setIndex] = useState<number | undefined>();

  // Function to show the child drawer for submenu
  const showChildrenDrawer = (index: number) => {
    setIndex(index); // Set the current index for which submenu to show
    setChildrenDrawer(true); // Open the child drawer
  };

  // Function to close all drawers
  const closeAllDrawers = () => {
    setOpen(false); // Close the main drawer
    setChildrenDrawer(false); // Close the child drawer
    setIndex(undefined); // Reset index
  };

  // Function to open the main drawer (hamburger menu)
  const showDrawer = () => {
    setOpen(true);
  };

  return (
    <div>
      {/* Hamburger menu icon to open the drawer */}
      <RxHamburgerMenu
        size={25}
        className={`cursor-pointer ${
          pathname.includes("document") && "text-black"
        }`}
        onClick={showDrawer}
      />
      {/* Main drawer */}
      <Drawer
        title={
          <div className="flex justify-between items-center">
            <div>Royal work</div>
            <div className="flex items-center">
              {/* Display flag and profile images */}
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
            </div>
          </div>
        }
        onClose={closeAllDrawers} // Close all drawers
        open={open} // Control visibility with `open` state
        placement="left" // Drawer placement from the left
      >
        {/* Child drawer for submenu */}
        <Drawer
          title={links[index || 0].title} // Use the title from the selected link
          width={320} // Set the width for the child drawer
          onClose={closeAllDrawers} // Close all drawers
          open={childrenDrawer} // Control visibility with `childrenDrawer` state
          placement="left" // Drawer placement from the left
        >
          {/* Display submenu items */}
          <div>
            {links[index || 0].items?.map((item) => (
              <div className="w-full mt-2" key={item.id}>
                {/* Display the name of each submenu section */}
                <div className="font-semibold text-[18px] text-secondary mb-3">
                  {item.name}
                </div>
                {/* Render each submenu link */}
                {item.items.map((subItem) => (
                  <Link
                    href="/document"
                    key={subItem.id}
                    className="text-black hover:text-primary"
                    onClick={closeAllDrawers} // Close all drawers on link click
                  >
                    <div className="text-text ms-3 mt-2 flex items-center">
                      {subItem.name}
                      {/* Display the value associated with the submenu item */}
                      <span className="bg-slate-300 ms-2 px-3 py-0 text-[10px] rounded-lg">
                        {subItem.value}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </Drawer>

        {/* Main menu items */}
        <div>
          {links.map((item, index) => (
            <div
              className="w-full flex items-center justify-between hover:bg-slate-100 p-2 rounded-md cursor-pointer my-1"
              onClick={() => showChildrenDrawer(index)} // Open the child drawer on click
              key={index}
            >
              <div className="text-text">{item.title}</div>
              <div>
                <IoIosArrowForward /> {/* Icon indicating submenu */}
              </div>
            </div>
          ))}
        </div>
      </Drawer>
    </div>
  );
};

export default MobileNav;
