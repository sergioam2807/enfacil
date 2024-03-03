import React from "react";

const BaseTableCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-[#FFFFFF] rounded-lg w-full h-fit pt-2 pb-4">
      {children}
    </div>
  );
};

export default BaseTableCard;
