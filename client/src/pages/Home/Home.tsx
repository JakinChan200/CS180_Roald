import React from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { BACKEND_URL } from "../../constants/backendURL";
import { countries } from "../../constants/countries";
import { PubForm } from "../../components/Home/PubForm/PubForm";
import { PieChart } from "../../components/Home/PubForm/PieChart/PieChart";
import "./Home.css";
import { BounceLoader } from "react-spinners";

interface CountryNumVids {
  id: string;
  value: null | number;
}

export const Home = () => {
  const [enter, setEnter] = React.useState<boolean>(false);
  const [numCountryVideos, setNumCountryVideos] = React.useState<any>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  //let countryVideos: CountryNumVids[] = [];

  React.useEffect(() => {
    setLoading(true);
    const getCountry = () =>
      new Promise(async (resolve, reject) => {
        let countryVideos: CountryNumVids[] = [];
        for (let i = 0; i < countries.length; i++) {
          let value = countries[i];
          await axios
            .get(`${BACKEND_URL}/countries/${value}`)
            .then((res) => {
              countryVideos.push({
                id: value,
                value: res.data.num_videos,
              });
              if (i === countries.length - 1) {
                setLoading(false);
                return resolve(countryVideos);
              }
            })
            .catch((e) => {
              setLoading(false);
              return reject(e);
            });
        }
      });
    getCountry().then((vids) => {
      setNumCountryVideos(vids);
    });
  }, [setNumCountryVideos, setLoading]);

  return (
    <div className="homeContainer">
      {!enter ? (
        <>
          <motion.div
            animate={{ y: 40 }}
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
            className="chart"
          >
            {loading ? (
              <div
                style={{
                  position: "absolute",
                  top: "20%",
                  left: "60%",
                }}
              >
                <BounceLoader color="var(--light-blue)" size={100}/>
              </div>
            ) : (
              <PieChart results={numCountryVideos} />
            )}
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
