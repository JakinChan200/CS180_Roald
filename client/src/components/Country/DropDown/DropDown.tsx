import React from "react";
import "./DropDown.css";
import { motion, useAnimation } from "framer-motion";

interface DropDownProps {
  label: string;
  notOpen?: boolean;
}

export const DropDown: React.FC<DropDownProps> = ({
  label,
  notOpen,
  ...props
}) => {
  const [isOpen, setIsOpen] = React.useState<boolean | undefined>(!notOpen);
  const variant = isOpen ? "open" : "closed";

  return (
    <>
      <div className="container">
        <h2>{label}</h2>
        <button
          className="arrow"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          {isOpen ? "▼" : "◀"}
        </button>
      </div>
      <motion.div
        animate={variant}
        variants={{
          closed: {},
          open: { y: 20 },
        }}
        transition={{ type: "spring", duration: 0.5 }}
      >
        {isOpen && props.children}
      </motion.div>
    </>
  );
};
