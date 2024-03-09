"use client";
import React from "react";

interface Props {
  bgColor: string;
  borderColor: string;
  textColor: string;
  text: string;
  onClick: () => void;
}

const BasicButtonComponent = ({
  bgColor,
  borderColor,
  textColor,
  text,
  onClick,
}: Props) => {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: bgColor,
        borderColor: borderColor,
        color: textColor,
      }}
      className="py-3 px-8 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-300"
    >
      {text}
    </button>
  );
};

export default BasicButtonComponent;
