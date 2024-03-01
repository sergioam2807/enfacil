import React from "react";

const BaseSmallCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-[#FFFFFF] px-16 pt-12 pb-16 rounded-lg w-fit h-fit ">
      {children}
    </div>
  );
};

export default BaseSmallCard;
