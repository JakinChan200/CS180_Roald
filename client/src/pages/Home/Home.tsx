import React from "react";
import { motion } from "framer-motion";
import { PubForm } from "../../components/Home/PubForm/PubForm";
import "./Home.css";

export const Home = () => {
  const [enter, setEnter] = React.useState<boolean>(false);
  return (
    <div className="homeContainer">
      {!enter ? (
        <>
          <motion.div
            animate={{ y: 50 }}
            transition={{ type: "spring", duration: 1 }}
          >
            <h1>Welcome to Roald App.</h1>
            <h2>Custom metrics on YouTube videos by countries.</h2>
            <button onClick={() => setEnter(true)}>
              Enter Custom Video Data
            </button>
          </motion.div>
          <motion.div
            animate={{ y: -50 }}
            transition={{ type: "spring", duration: 1 }}
          >
            <img
              src={require("../../assets/chartsvg.svg").default}
              alt="woman by charts"
            />
          </motion.div>
        </>
      ) : (
        <motion.div
          animate={{ y: 60 }}
          transition={{ type: "spring", duration: 1 }}
        >
          <h2>Submit Data to Use</h2>
          <p>Data will be analyzed under 'Experimental Metrics' per country.</p>
          <PubForm />
          <button onClick={() => setEnter(false)}>Return to Home</button>
        </motion.div>
      )}
    </div>
  );
};
