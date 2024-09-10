"use client";
import Image from "next/image";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi"; // Icons for contact details
import { FaFacebook, FaTelegram, FaYoutube } from "react-icons/fa"; // Social media icons
import { FooterDataType } from "@/lib/types/footer";

interface FooterProps {
  data: FooterDataType;
}

const Footer = ({ data }: FooterProps) => {
  return (
    <footer className="bg-primary text-white py-10">
      <div className="mb-20 container mx-auto px-4 md:px-0 flex flex-col md:flex-row justify-between items-center md:items-start space-y-8 md:space-y-0">
        {/* Left section with logo and description */}
        <div className="text-center md:text-left">
          <Image
            src={data.logo || "/images/CamCyber_Logo_white.png"}
            alt="CamCyber Logo"
            width={150}
            height={50}
            className="mx-auto md:mx-0"
          />
          <div className="mt-4 text-sm md:w-3/4 text-text">
            {data.description ||
              "ផលិតផលនិងសេវាទំនើបឌីជីថលកម្ពុជា សម្រាប់កុំព្យូទ័រ ឧបករណ៍ និងអនាគត"}
          </div>
        </div>

        {/* Right section with contact details */}
        <div className="text-center md:text-left">
          <h4 className="font-bold mb-4 text-title">
            {data.contact || "ទំនាក់ទំនង"}
          </h4>
          <div className="border-t-[1px] border-white w-full mb-4"></div>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center justify-center md:justify-start">
              <FiMail className="mr-2 text-text" />{" "}
              {data.email || "info@camcyberdigital.com"}
            </li>
            <li className="flex items-center justify-center md:justify-start">
              <FiPhone className="mr-2 text-text" />{" "}
              {data.phone || "+855 87 955 888"}
            </li>
            <li className="flex items-center justify-center md:justify-start">
              <FiMapPin className="mr-2 text-text" />{" "}
              {data.location || "Phnom Penh"}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t-[1px] border-white w-full"></div>

      {/* Bottom section with copyright and social media icons */}
      <div className="container mx-auto px-4 md:px-0 mt-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-center md:text-left">
          © {data.copyright || "2024 CamCyber Digital Tech Team"}
        </p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a
            target="_blank"
            href={data.facebookLink}
            aria-label="Facebook"
            className="text-white hover:text-gray-300"
          >
            <FaFacebook size={24} />
          </a>
          <a
            target="_blank"
            href={data.telegramLink}
            aria-label="Telegram"
            className="text-white hover:text-gray-300"
          >
            <FaTelegram size={24} />
          </a>
          <a
            target="_blank"
            href={data.youtubeLink}
            aria-label="YouTube"
            className="text-white hover:text-gray-300"
          >
            <FaYoutube size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
