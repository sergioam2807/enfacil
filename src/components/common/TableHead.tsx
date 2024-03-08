import React from "react";

const TableHead = ({ children }: { children: React.ReactNode }) => (
  <th className="text-left pb-8 pt-5">{children}</th>
);

export default TableHead;
