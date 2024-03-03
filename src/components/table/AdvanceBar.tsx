import React from "react";

interface IRow {
  avance: number | string;
}

const AdvanceBar = ({ avance }: IRow) => {
  return (
    <div className="flex items-center">
      <div className="w-1/3 overflow-hidden h-3 text-xs flex rounded-xl bg-[#EAEAEA] mr-2">
        <div
          style={{ width: `${Number(avance)}%` }}
          className={`shadow-none text-center whitespace-nowrap text-white justify-center  ${
            Number(avance) < 50
              ? "bg-[#FF6060]"
              : Number(avance) < 75
              ? "bg-[#FBB214]"
              : "bg-[#1BCB80]"
          }`}
        />
      </div>
      <span className="text-sm">
        {typeof avance === "number" ? `${avance}%` : `${avance}%`}
      </span>
    </div>
  );
};

export default AdvanceBar;
