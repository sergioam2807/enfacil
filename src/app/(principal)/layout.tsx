import Search from "@/components/common/Search";
import { Sidebar } from "@/components/sidebar/Sidebar";
import Image from "next/image";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen md:overflow-hidden">
      <Sidebar />

      <div className="flex flex-col flex-grow">
        <div className="w-full p-4 bg-[#FAFCFE] h-fit flex justify-between items-center pr-32 pl-12">
          <Search />
          <div className="flex justify-center">
            <span className="font-medium">Henry</span>
          </div>
        </div>

        <div className="flex-grow overflow-y-auto pt-8 pl-8 pr-8 bg-[#EFF4FC]">
          {children}
        </div>
      </div>
    </div>
  );
}
