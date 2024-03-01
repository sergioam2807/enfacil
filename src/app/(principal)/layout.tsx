import Search from "@/components/common/Search";
import { Sidebar } from "@/components/sidebar/Sidebar";
import Image from "next/image";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="flex flex-col md:flex-row w-full">
        <Sidebar />

        <div className="w-full p-4 bg-[#FAFCFE] h-fit flex justify-between items-center pr-32 pl-12">
          <Search />
          <div className="flex justify-center">
            <span className="font-medium">Henry</span>
          </div>
        </div>
      </div>
      {/* <div className="flex-grow md:overflow-y-auto md:p-12">{children}</div> */}
    </div>
  );
}
