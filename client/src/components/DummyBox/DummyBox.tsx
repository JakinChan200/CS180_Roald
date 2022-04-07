import axios from "axios";
import React, { useEffect } from "react";
import { BACKEND_URL } from "../../constants/backendURL";
import "./DummyBox.css";

//remove this component entirely after demo
export const DummyBox: React.FC = () => {
  const [msg, setMsg] = React.useState<string | null>();
  const getMessage = () => {
    axios
      .get(`${BACKEND_URL}`)
      .then((res) => {
        console.log(res.data);
        setMsg(res.data);
      })
      .catch(() => {
        setMsg("oops, error");
      });
  };
  useEffect(() => getMessage(), []);
  return <div className="container">{msg}</div>;
};
