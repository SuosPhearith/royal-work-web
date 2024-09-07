"use client";
import { Drawer, FloatButton, message } from "antd";
import { useRouter } from "next/navigation";
import { useState, useEffect, FormEvent } from "react";
import { BsSearch } from "react-icons/bs";
import { FaArrowUp } from "react-icons/fa";
import { VscRobot } from "react-icons/vsc";

const conversation = [
  {
    text: "តើមានអ្វីអាចអោយខ្ញុំជួយអ្នកទេ?",
  },
];

const SearchArea = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [currentWord, setCurrentWord] = useState("ច្បាប់");
  const [fade, setFade] = useState(true);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const words = ["ច្បាប់", "រាជក្រឹត", "អនុក្រឹត", "ផ្លូវការ"];

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/document/?search=${search}`);
  };

  const askAi = () => {
    if (!text) {
      return message.error("សូមបញ្ចូលអក្សរ");
    }
    conversation.push({ text });
    conversation.push({
      text: "សូមអធ្យាស្រ័យប្រព័ន្ធAIមិនទាន់ដាក់អោយដំំណើរការទេ។",
    });
    setText("");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // Start fade out

      setTimeout(() => {
        setCurrentWord((prevWord) => {
          const currentIndex = words.indexOf(prevWord);
          const nextIndex = (currentIndex + 1) % words.length;
          return words[nextIndex];
        });
        setFade(true);
      }, 100);
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="h-[40rem] bg-primary flex justify-end items-center max-[640px]:h-[20rem] max-[970px]:h-[30rem]">
      <div className="container flex items-center flex-col">
        <h2 className="text-[30px] font-extrabold text-white max-[640px]:text-[20px] text-center max-[640px]:mt-8 ">
          ស្វែងរកឯកសារ{" "}
          <span
            className={`text-green-300 transition-opacity duration-500 ${
              fade ? "opacity-100" : "opacity-0"
            }`}
          >
            {currentWord}
          </span>{" "}
          នៃព្រះរាជាណាចក្រកម្ពុជាតាំងពីឆ្នាំ ១៩៩៣
        </h2>
        <form
          onSubmit={handleSearch}
          className="flex w-1/2 max-[640px]:w-[90%] justify-center items-end border-white border-b-2 mt-10 max-[640px]:mt-5"
        >
          <div className="relative z-0 flex flex-col items-center w-full">
            <div className="w-full relative">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                id="floating_standard"
                className="text-center block py-2 px-0 w-full text-[30px] max-[640px]:text-[20px] max-[970px]:text-[20px] text-white bg-transparent border-0 appearance-none dark:text-white focus:outline-none focus:ring-0 peer"
                placeholder=" "
              />
              <label
                htmlFor="floating_standard"
                className="max-[640px]:text-[18px] max-[970px]:text-[20px] absolute left-1/2 -translate-x-1/2 text-[30px] text-white dark:text-white duration-300 transform -translate-y-6 top-3 origin-[0] peer-focus:-translate-x-1/2 peer-focus:text-white peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:text-[20px] max-[640px]:peer-focus:text-[12px] peer-focus:-translate-y-10 max-[640px]:peer-focus:-translate-y-5"
              >
                ស្វែងរកឯកសារ
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="text-white mb-4 me-2 flex items-center"
          >
            <BsSearch size={20} className="cursor-pointer" />
          </button>
        </form>
      </div>
      <FloatButton.Group
        trigger="click"
        type="primary"
        style={{ insetInlineEnd: 24 }}
        icon={<VscRobot />}
      >
        {/* <FloatButton /> */}
        <FloatButton icon={<VscRobot />} onClick={showDrawer} />
      </FloatButton.Group>
      <Drawer
        title={
          <div className="flex mt-1">
            <VscRobot className="text-secondary w-6 h-6 me-2" />
            <p className="text-[20px]">ជំនួយការAI</p>
          </div>
        }
        onClose={onClose}
        open={open}
      >
        <div className="h-full flex flex-col justify-between">
          <div>
            {conversation.map((item, index) => (
              <div
                className={`w-full flex ${
                  index % 2 === 0 ? "justify-start" : "justify-end"
                }  mb-3`}
                key={index}
              >
                <span className="me-1">{index % 2 === 0 ? "AI:" : "You:"}</span>
                {item.text}
              </div>
            ))}
          </div>
          <div className="flex items-center">
            <div className="relative">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                type="text"
                className="border border-gray-300 rounded-lg pl-10 pr-4 py-2 w-72 focus:outline-none focus:border-blue-500"
                placeholder="ស្វែងរកឯកសារ"
              />
              <VscRobot className="text-secondary w-6 h-6 me-2 absolute left-3 top-[6px]" />
            </div>
            <div
              onClick={askAi}
              className="bg-primary w-[2rem] h-[2rem] rounded-full flex justify-center items-center ms-1 cursor-pointer hover:bg-secondary"
            >
              <FaArrowUp size={18} className="text-white" />
            </div>
          </div>
        </div>
      </Drawer>
    </section>
  );
};

export default SearchArea;
