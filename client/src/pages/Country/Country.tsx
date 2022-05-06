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
      { name: "Average Time to Trend", short: "avg_time_to_trend", value: null },
    ].sort((a, b) => a.name.localeCompare(b.name, "en"))
  );

  const categories = getCategories(country);

  const getResult = (value: string) => {
    axios
      .get(`${BACKEND_URL}/countries/${country}?id=${value}`)
      .then((res) => setCatResults(res.data.videos))
      .catch((e) => {
        setCatResults([]);
        console.log(e);
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
        setError("");
      })
      .catch((err) => {
        setError("Error fetching video data.");
        setLoading(false);
      });
  }, [country]);

  useEffect(() => {
    //very suboptimal calculation for pub_to_trend
    const calculateExperimental = (expResult: Video) => {
      let pub_to_trend = 0;
      genResults.forEach((video, index) => {
        if (
          new Date(video.pub_date).getDate() ===
            new Date(expResult.pub_date).getDate() - 1 &&
          genResults[index + 1]
        )
          return (pub_to_trend =
            Math.floor(
              parseInt(genResults[index + 1].pub_to_trend) +
                parseInt(video.pub_to_trend)
            ) / 2);
        if (
          new Date(video.pub_date).getDate() ===
            new Date(expResult.pub_date).getDate() + 1 &&
          genResults[index - 1]
        )
          return (pub_to_trend =
            Math.floor(
              parseInt(genResults[index - 1].pub_to_trend) +
                parseInt(video.pub_to_trend)
            ) / 2);
        pub_to_trend = parseInt(video.pub_to_trend);
      });
      return pub_to_trend;
    };
    expResults.forEach((result: Video) => {
      result.pub_to_trend = calculateExperimental(result).toString();
    });
  }, [expResults, genResults]);

  return (
    <div className="page">
      <h1 className="title">{country}</h1>
      {error.length > 0 && <p>{error}</p>}
      <DropDown label="General Metrics">
        {loading ? (
          <>
            <br />
            <br />
            <BounceLoader color="var(--light-blue)" />
          </>
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
                title = {'Gen'}
            />
            <div></div>
            <h3>Number of Comments vs Trending Date</h3>
            <LineGraph
              results={genResults
                .map((video) => ({
                  ...video,
                }))
                .sort(
                  (a, b) =>
                    new Date(a.trend_date).getTime() -
                    new Date(b.trend_date).getTime()
                )
                .map((video) => ({
                  x: video.trend_date,
                  y: video.comment_count,
                }))}
                title = {'Gen'}
            />
            <div></div>
            <h3>Number of Likes vs Trending Date</h3>
            <LineGraph
              results={genResults
                .map((video) => ({
                  ...video,
                }))
                .sort(
                  (a, b) =>
                    new Date(a.trend_date).getTime() -
                    new Date(b.trend_date).getTime()
                )
                .map((video) => ({
                  x: video.trend_date,
                  y: video.likes,
                }))}
                title = {'Gen'}
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

        {catResults.length > 0 ? (
          <>
            <h3>Publication Date vs Time to Trend</h3>
             <LineGraph
              results={catResults
                .sort(
                  (a, b) => new Date(a.pub_date).getTime() -
                    new Date(b.pub_date).getTime()
                )
                .map((video) => ({
                  x: video.pub_date,
                  y: video.pub_to_trend,
                }))}
                title = {'Query'} 
              /><div></div>
            <h3>Number of Comments vs Trending Date</h3>
             <LineGraph
              results={catResults
                .map((video) => ({
                  ...video,
                }))
                .sort(
                  (a, b) => new Date(a.trend_date).getTime() -
                    new Date(b.trend_date).getTime()
                )
                .map((video) => ({
                  x: video.trend_date,
                  y: video.comment_count,
                }))}
                title = {'Query'}
                /><div></div>
            <h3>Number of Likes vs Trending Date</h3>
            <LineGraph
              results={catResults
                .map((video) => ({
                  ...video,
                }))
                .sort(
                  (a, b) =>
                    new Date(a.trend_date).getTime() -
                    new Date(b.trend_date).getTime()
                )
                .map((video) => ({
                  x: video.trend_date,
                  y: video.likes,
                }))}
                title = {'Query'}
            />
          </> 
        ) : (
          <p>No videos for provided category.</p>
        )}
      </DropDown>
      <DropDown label="Experimental Metrics" notOpen>
        <h3>Experimental Metrics</h3>
        {expResults.length < 1 ? (
          <p>
            No experimental metrics found. Try entering some from the home page!
          </p>
        ) : (
          <>
            <h3>Publication Date vs Time to Trend</h3>
            <LineGraph
              results={genResults
                .concat(expResults)
                .sort(
                  (a, b) =>
                    new Date(a.pub_date).getTime() -
                    new Date(b.pub_date).getTime()
                )
                .map((video) => ({
                  x: video.pub_date,
                  y: video.pub_to_trend,
                  custom: video.video_id.length < 1,
                }))}
                title = {"Experimental"}
              color
            />
          </>
        )}
      </DropDown>
    </div>
  );
};
