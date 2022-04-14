import React from "react";
import "./DropDown.css";

interface DropDownProps {
  label: string;
}

export const DropDown: React.FC<DropDownProps> = ({ label, ...props }) => {
  const [open, setOpen] = React.useState(true);
  return (
    <>
      <div className="container">
          <h2>{label}</h2>
        <button className="arrow" onClick={() => setOpen(!open)}>
          {open ? "▼" : "◀"}
        </button>
      </div>
      {open && props.children}
    </>
  );
};
