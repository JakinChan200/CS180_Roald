import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { SearchBar } from "../../components/Country/SearchBar/SearchBar";
import { DropDown } from "../../components/Country/DropDown/DropDown";
import { LineGraph } from "../../components/Country/LineGraph/LineGraph";
import { BACKEND_URL } from "../../constants/backendURL";
import { getCategories } from "./catHelper/getCategories";
import "./Country.css";
import { BounceLoader } from "react-spinners";
import { RoaldText } from "../../components/RoaldText/RoaldText";
import { Video } from "../../constants/types/videoTypes";
import { UserContext } from "../../contexts/UserContext";

interface CountryProps {
  country: string;
}

interface Average {
  short: string;
  name: string;
  value: null | number;
}

export const Country: React.FC<CountryProps> = ({ country }) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  const [catResults, setCatResults] = React.useState<Video[]>([]);
  const [genResults, setGenResults] = React.useState<Video[]>([]);
  const expResults = React.useContext(UserContext).videos;
  const [avgResults, setAvgResults] = React.useState<Average[]>(
    [
      { name: "Average Comments", short: "avg_comments", value: null },
      { name: "Average Likes", short: "avg_likes", value: null },
      { name: "Average Dislikes", short: "avg_dislikes", value: null },
      { name: "Average Views", short: "avg_views", value: null },
    ].sort((a, b) => a.name.localeCompare(b.name, "en"))
  );
  const categories = getCategories(country);

  const getResult = (value: string) => {
    axios
      .get(`${BACKEND_URL}/countries/${country}?id=${value}`)
      .then((res) => setCatResults(res.data.videos))
      .catch((e) => {
        setError("Error fetching video data.");
      });
  };

  useEffect(() => {
    //temporary request that will simply show country information under experimental results
    //replace with a search bar and proper searching
    setLoading(true);
    axios
      .get(`${BACKEND_URL}/countries/${country}`)
      .then((res) => {
        setGenResults(res.data.videos.splice(0, 15));
        setAvgResults((prev) =>
          prev
            .map((avg) => ({
              name: avg.name,
              short: avg.short,
              value: res.data[avg.short],
            }))
            .sort((a, b) => a.name.localeCompare(b.name, "en"))
        );
        setLoading(false);
      })
      .catch((err) => {
        setError("Error fetching video data.");
        setLoading(false);
      });
  }, [country]);

  return (
    <div className="page">
      <h1 className="title">{country}</h1>
      {error && <p>{error}</p>}
      <DropDown label="General Metrics">
        {loading ? (
          <BounceLoader color="var(--light-blue)" />
        ) : (
          <>
            <div className="avgContainer">
              {avgResults.map((avg, index) => (
                <div className="avg">
                  <h2>{avg.name}</h2>
                  <RoaldText>{avg.value ? avg.value : "unavailable"}</RoaldText>
                </div>
              ))}
            </div>
            <h3>Publication Date vs Time to Trend</h3>
            <LineGraph
              results={genResults
                .sort(
                  (a, b) =>
                    new Date(a.pub_date).getTime() -
                    new Date(b.pub_date).getTime()
                )
                .map((video) => ({
                  x: video.pub_date,
                  y: video.pub_to_trend,
                }))}
            />
            <div></div>
            <h3>Number of Comments vs Trending Date</h3>
            <LineGraph
              results={genResults
                .sort(
                  (a, b) =>
                    new Date(a.trend_date).getTime() -
                    new Date(b.trend_date).getTime()
                )
                .map((video) => ({
                  x: video.trend_date,
                  y: video.comment_count,
                }))}
            />
          </>
        )}
      </DropDown>
      <DropDown label="Query Metrics" notOpen>
        <h3>Search Categories</h3>
        <SearchBar
          country={country}
          onResult={getResult}
          categories={categories}
        />
        <div className="resultContainer">
          {catResults.map((result, index) => (
            <div key={index}>
              <p>{result?.title}</p>
              <hr style={{ width: "30%" }} />
            </div>
          ))}
        </div>
      </DropDown>
      <DropDown label="Experimental Metrics" notOpen>
        <h3>Experimental Metrics</h3>
        {expResults.length < 1 ? (
          <p>
            No experimental metrics found. Try entering some from the home page!
          </p>
        ) : (
          <div className="resultContainer">
            {expResults.map((result, index) => (
              <div key={index}>
                <p>{result}</p>
                <hr style={{ width: "30%" }} />
              </div>
            ))}
          </div>
        )}
      </DropDown>
    </div>
  );
};
