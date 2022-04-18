import { IconZoomQuestion } from "@tabler/icons";
import React from "react";
import "./Hover.css";

interface HoverProps {
  text: string;
}

export const Hover: React.FC<HoverProps> = ({ text }) => {
  const [hover, setHover] = React.useState<boolean>(false);
  return (
    <>
      <IconZoomQuestion
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        height="30px"
        width="30px"
      />
      <p
        className="tooltip"
        style={hover ? { display: "flex" } : { display: "none" }}
      >
        {text}
      </p>
    </>
  );
};
