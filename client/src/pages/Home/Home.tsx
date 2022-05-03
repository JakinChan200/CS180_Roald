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
  short: string;
  value: null | number;
}

// export const Country: React.FC<CountryProps> = ({ country }) => {
//   const [loading, setLoading] = React.useState<boolean>(false);
//   const [error, setError] = React.useState<string>("");
//   const [catResults, setCatResults] = React.useState<Video[]>([]);
//   const [genResults, setGenResults] = React.useState<Video[]>([]);
//   const expResults = React.useContext(UserContext).videos;
//   const [avgResults, setAvgResults] = React.useState<Average[]>(
//     [
//       { name: "Average Comments", short: "avg_comments", value: null },
//       { name: "Average Likes", short: "avg_likes", value: null },
//       { name: "Average Dislikes", short: "avg_dislikes", value: null },
//       { name: "Average Views", short: "avg_views", value: null },
//     ].sort((a, b) => a.name.localeCompare(b.name, "en"))
//   );
//   const categories = getCategories(country);

//   const getResult = (value: string) => {
//     axios
//       .get(`${BACKEND_URL}/countries/${country}?id=${value}`)
//       .then((res) => setCatResults(res.data.videos))
//       .catch((e) => {
//         setError("Error fetching video data.");
//       });
// };

// const routes = [
//   { name: "/", Component: <Home /> },
//   ...countries.map((country: string) => ({
//     name: country,
//     Component: <Country country={country} key={country} />,
//   })),
// ].sort((a, b) => a.name.localeCompare(b.name, "en"));

export const Home = () => {
  const [enter, setEnter] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  const [numCountryVideos, setNumCountryVideos] = React.useState<CountryNumVids[]>(
    [
      {id: "", short: "video_count", value: null},
    ]
  );
  

  const getResult = (value: string) => {
    axios
      .get(`${BACKEND_URL}/countries/${countries}`)
      .then((res) => setNumCountryVideos(res.data.num_videos))
      .catch((e) => {
        setError("Error fetching video data.");
    });
  };
  console.log(getResult)

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
              results={numCountryVideos.sort()        
                .map((CountryNumVids) => ({
                  id: CountryNumVids.id,
                  value: CountryNumVids.value,
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
