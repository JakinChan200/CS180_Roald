import React from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { BACKEND_URL } from "../../constants/backendURL";
import { countries } from "../../constants/countries";
import { PubForm } from "../../components/Home/PubForm/PubForm";
import { PieChart } from "../../components/Home/PubForm/PieChart/PieChart";
import "./Home.css";
import { hasSelectionSupport } from "@testing-library/user-event/dist/utils";

interface CountryNumVids {
  id: string;
  value: null | number;
}

export const Home = () => {
  const [enter, setEnter] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  const [numCountryVideos, setNumCountryVideos] = React.useState<CountryNumVids[]>(
    [
      {id: "", value: null},
    ]
  );

  const getNumVideos = (value: string) => {
    axios
      .get(`${BACKEND_URL}/countries/${value}`)
      .then((res) => {
        setNumCountryVideos((prev) =>
          prev
            .map(() => ({
              id: value,
              value: res.data.num_videos,
            }))
        );
      })
      .catch((e) => {
        setError("Error fetching video data.");
    });
    //console.log(numCountryVideos);
    return numCountryVideos;
  };

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
            <PieChart
               results={getNumVideos(countries[0]).sort()        
                 .map((numVids) => ({
                   id: numVids.id,
                   value: numVids.value,
                 }))}
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
