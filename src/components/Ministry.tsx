import Image from "next/image";

// Sample Product Data
const items = [
  {
    id: 1,
    name: "Ministry of Agriculture, Forestry, and Fisheries",
    image: "/images/maff.png",
  },
  {
    id: 2,
    name: "Ministry of Economy and Finance",
    image: "/images/mef.png",
  },
  {
    id: 3,
    name: "Ministry of Agriculture, Forestry, and Industry",
    image: "/images/mfaic.png",
  },
  {
    id: 4,
    name: "Ministry of Mines and Energy",
    image: "/images/mme_logo.png",
  },
  {
    id: 5,
    name: "Ministry of Commerce",
    image: "/images/moc.png",
  },
  {
    id: 6,
    name: "Ministry of Environment",
    image: "/images/moenv.png",
  },
  {
    id: 7,
    name: "Ministry of Education, Youth and Sports",
    image: "/images/moeys.png",
  },
  {
    id: 8,
    name: "Ministry of Interior",
    image: "/images/moi.png",
  },
  {
    id: 9,
    name: "Ministry of Information",
    image: "/images/moin.png",
  },
  {
    id: 10,
    name: "Ministry of Tourism",
    image: "/images/mot.png",
  },
  {
    id: 11,
    name: "Ministry of Posts and Telecommunications",
    image: "/images/mptc.png",
  },
  {
    id: 12,
    name: "Ministry of Public Works and Transport",
    image: "/images/mpwt.png",
  },
  {
    id: 13,
    name: "Ministry of Water Resources and Meteorology",
    image: "/images/mwrm_logo.png",
  },
];

const Ministry = () => {
  return (
    <section className=" w-screen">
      <div className="container flex flex-col items-center py-[50px] w-full">
        <div className="text-title font-extrabold text-secondary">
          ក្រសួង-ស្ថាប័ន
        </div>
        <div className="w-full overflow-hidden">
          <div className="flex space-x-8 py-10 w-full animate-scroll">
            {items.concat(items).map((item) => (
              <div className="flex-none h-[70px] w-[70px]" key={item.id}>
                <Image
                  src={item.image}
                  width={70}
                  height={70}
                  alt={item.name}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ministry;
