import { capitalizeFirstLetter } from "@/helpers/capitaliizeFirstLetter";
import React from "react";

interface TableCellProps {
  children: React.ReactNode;
  clickable?: boolean;
}

const TableCell = ({ children, clickable }: TableCellProps) => (
  <td
    className={`text-left  text-sm font-normal capitalize ${
      clickable ? "text-custom-blue font-semibold" : ""
    }`}
  >
    {Array.isArray(children) && typeof children[0] === "object"
      ? children.map(
          (contact: { telefono: string; email: string }, i: number) => (
            <div key={i}>
              <div>
                <span className="text-sm font-normal">
                  {capitalizeFirstLetter(contact.telefono)}
                </span>
              </div>
              <div>
                <span className="text-sm font-normal">
                  {capitalizeFirstLetter(contact.email)}
                </span>
              </div>
            </div>
          )
        )
      : typeof children === "string"
      ? capitalizeFirstLetter(children)
      : children}
  </td>
);

export default TableCell;
