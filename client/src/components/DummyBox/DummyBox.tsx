import axios from "axios";
import React, { useEffect } from "react";
import { BACKEND_URL } from "../../constants/backendURL";
import "./DummyBox.css";

//remove this component entirely after demo
export const DummyBox: React.FC = () => {
  const [msg, setMsg] = React.useState<string | null>();
  const getMessage = () => {
    axios
      .get(`${BACKEND_URL}/test`)
      .then((res) => {
        setMsg(res.data);
      })
      .catch((e) => {
        setMsg("oops, error");
      });
  };
  useEffect(() => getMessage(), []);
  return <div className="container">{msg}</div>;
};
