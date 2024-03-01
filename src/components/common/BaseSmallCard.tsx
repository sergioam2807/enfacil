import React from "react";

const BaseSmallCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-[#FFFFFF] px-6 pt-6 pb-12 rounded-sm">{children}</div>
  );
};

export default BaseSmallCard;
