import React from "react";
import { motion } from "framer-motion";
import { PubForm } from "../../components/Home/PubForm/PubForm";
import "./Home.css";

export const Home = () => {
  const [enter, setEnter] = React.useState<boolean>(false);
  return (
    <div className="homeContainer">
      {!enter ? (
        <motion.div>
          <h1>Welcome to Roald.</h1>
          <h2>Custom metrics on YouTube video by countries.</h2>
          <button>Enter Custom Metrics</button>
          <img />
        </motion.div>
      ) : (
        {
          /*<PubForm setResults={setEnter} />*/
        }
      )}
    </div>
  );
};
