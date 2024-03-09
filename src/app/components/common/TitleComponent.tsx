import React from "react";

interface Props {
  titleName: string;
}

const TitleComponent = ({ titleName }: Props) => {
  return (
    <div className="text-[#0E436B] font-semibold text-xl mt-5 mb-7">
      {titleName}
    </div>
  );
};

export default TitleComponent;
