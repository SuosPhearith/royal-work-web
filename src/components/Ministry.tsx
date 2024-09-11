import { MinistryDataType } from "@/lib/types/ministry";
import Image from "next/image";
const baseFileUrl = process.env.NEXT_PUBLIC_FILE_URL;

interface MinistryProps {
  data: MinistryDataType;
}

const Ministry = ({ data }: MinistryProps) => {
  return (
    <section className=" w-screen">
      <div className="container flex flex-col items-center py-[50px] w-full">
        <div className="text-title font-extrabold text-secondary">
          {data.title || "ក្រសួង-ស្ថាប័ន"}
        </div>
        <div className="w-full overflow-hidden">
          <div className="flex space-x-8 py-10 w-full animate-scroll">
            {data.logo.concat(data.logo).map((item) => (
              <div className="flex-none h-[70px] w-[70px]" key={item.id}>
                <Image
                  src={`${baseFileUrl}${item.image}`}
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
