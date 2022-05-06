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
  const [gottenData, setGottenData] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  const [numCountryVideos, setNumCountryVideos] = React.useState<CountryNumVids[]>(
    [
      {id: "", value: null},
    ]
  );
  const [temp, setTemp] = React.useState<number>();
  //let countryVideos: CountryNumVids[] = [];
  let countryVideos = { CountryNumVids : []};

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
    // console.log("numCountryVideos");
    // console.log(numCountryVideos);
    return numCountryVideos;
  };

  // const getNumVideos = (value: string) => {
  //   axios
  //     .get(`${BACKEND_URL}/countries/${value}`)
  //     .then((res) => {
  //       setTemp(res.data.num_videos);
  //     })
  //     .catch((e) => {
  //       setError("Error fetching video data.");
  //   });
  //   console.log(temp);
  //   return temp;
  // };

  // const getAllData = () => {
  //   if(!gottenData){
  //     const countryVideos = [
  //       {id: countries[0], value: getNumVideos(countries[0])},
  //       {id: countries[1], value: getNumVideos(countries[1])},
  //       {id: countries[2], value: getNumVideos(countries[2])},
  //       {id: countries[3], value: getNumVideos(countries[3])},
  //       {id: countries[4], value: getNumVideos(countries[4])},
  //       {id: countries[5], value: getNumVideos(countries[5])},
  //       {id: countries[6], value: getNumVideos(countries[6])},
  //       {id: countries[7], value: getNumVideos(countries[7])},
  //       {id: countries[8], value: getNumVideos(countries[8])},
  //       {id: countries[9], value: getNumVideos(countries[9])},
  //     ];
  //     setGottenData(true);
  //   }
  //   //console.log(countryVideos);
  //   //console.log(getNumVideos(countries[1]));
  //   return countryVideos;
  // };

  // const getAllData = () => {
  //   if(!gottenData){
  //     for(let i = 0; i < countries.length; i++){
  //         console.log(i);
  //         getNumVideos(countries[i]);
  //         console.log(numCountryVideos);
  //         //setNumCountryVideos(numCountryVideos, getNumVideos(countries[i]));
  //         //console.log("temporary " + temporary);
  //         //console.log(getNumVideos(countries[i]));
  //         //numCountryVideos.push(getNumVideos(countries[i]));
  //         //countryVideos = {...countryVideos, temporary};
  //         //countryVideos =  countryVideos.concat(temporary);
  //     }

  //     setGottenData(true);
  //     //console.log(countryVideos);
  //   }
  //   //console.log(numCountryVideos);
  //   return getNumVideos(countries[0]);
  // };

  // const dataFormat = () => {
  //   const pieData[] = [
  //     getNumVideos(countries[0]).concat(
  //       getNumVideos(countries[1]),
  //       getNumVideos(countries[2]),
  //     )
  //   ];
  //   return pieData;
  // }

  // const pieData = [
  //   getNumVideos(countries[0]).concat(
  //     getNumVideos(countries[1]),
  //     getNumVideos(countries[2]),
  //     getNumVideos(countries[3]),
  //     getNumVideos(countries[4]),
  //     getNumVideos(countries[5]),
  //     getNumVideos(countries[6]),
  //     getNumVideos(countries[7]),
  //     getNumVideos(countries[8]),
  //   )
  // ];
  //console.log(pieData);

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
            <PieChart //results = {numCountryVideos}
               results={(    getNumVideos(countries[0]).concat(
                getNumVideos(countries[1]),
                getNumVideos(countries[2]),
                getNumVideos(countries[3]),
                getNumVideos(countries[4]),
                getNumVideos(countries[5]),
                getNumVideos(countries[6]),
                getNumVideos(countries[7]),
                getNumVideos(countries[8]),
              ))}        
                //  .map((numVids) => ({
                //    id: numVids.id,
                //    value: numVids.value,
                //}))}
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
