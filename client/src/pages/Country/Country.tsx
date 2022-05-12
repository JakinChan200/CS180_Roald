import axios from "axios";
import React from "react";
import { SearchBar } from "../../components/Country/SearchBar/SearchBar";
import { DropDown } from "../../components/Country/DropDown/DropDown";
import { BACKEND_URL } from "../../constants/backendURL";
import { getCategories } from "./catHelper/getCategories";
import { LineGraph } from "../../components/Country/LineGraph/LineGraph";
import "./Country.css";
import { BounceLoader } from "react-spinners";
import { RoaldText } from "../../components/RoaldText/RoaldText";
import { Video } from "../../constants/types/videoTypes";
import { UserContext } from "../../contexts/UserContext";
import { getData } from "./dataHelper/getData";
import { CountryContext } from "../../contexts/CountryContext";
import { Averages } from "../../constants/types/averageTypes";
import { averageTitles } from "../../constants/averages";

interface CountryProps {
  country: string;
}

const CategoryGraph = React.memo(({ catResults }: { catResults: Video[] }) => (
  <>
    <h3>Publication Date vs Time to Trend</h3>
    <LineGraph
      results={catResults
        .sort(
          (a: Video, b: Video) =>
            new Date(a.pub_date).getTime() - new Date(b.pub_date).getTime()
        )
        .map((video) => ({
          x: video.pub_date,
          y: video.pub_to_trend,
        }))}
    />
    <div></div>
    <h3>Number of Comments vs Trending Date</h3>
    <LineGraph
      results={catResults
        .sort(
          (a: Video, b: Video) =>
            new Date(a.trend_date).getTime() - new Date(b.trend_date).getTime()
        )
        .map((video) => ({
          x: video.trend_date,
          y: video.comment_count,
        }))}
    />
    <div></div>
    <h3>Number of Likes vs Trending Date</h3>
    <LineGraph
      results={catResults
        .sort(
          (a: Video, b: Video) =>
            new Date(a.trend_date).getTime() - new Date(b.trend_date).getTime()
        )
        .map((video) => ({
          x: video.trend_date,
          y: video.likes,
        }))}
    />
  </>
));

export const Country: React.FC<CountryProps> = ({ country }) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  const expResults = React.useContext(UserContext).videos;
  const countryResults = React.useContext(CountryContext)[country];
  const { setCountry } = React.useContext(CountryContext);
  const genResults = countryResults.videos;
  const avgResults: Averages = countryResults.avgs;
  const [catResults, setCatResults] = React.useState<Video[]>([]);
  const categories = getCategories(country);

  const getResult = (value: string) => {
    axios
      .get(`${BACKEND_URL}/countries/${country}?id=${value}`)
      .then((res) =>
        setCatResults(
          res.data.videos.sort(
            (a: Video, b: Video) =>
              new Date(a.pub_date).getTime() - new Date(b.pub_date).getTime()
          )
        )
      )
      .catch((e) => {
        setCatResults([]);
        console.log(e);
      });
  };

  //can remove getData promise and pull request here - unnecessary remnant of memo testing
  React.useEffect(() => {
    if (countryResults.videos.length < 1) {
      setLoading(true);
      getData({ country })
        .then((res: any) => {
          setCountry({
            name: country,
            videos: res.videos,
            avgs: res.avgs,
          });
          setLoading(false);
        })
        .catch((e) => setError(e));
    }
  }, [country, countryResults, setCountry]);

  React.useMemo(() => {
    //very suboptimal calculation for pub_to_trend
    const calculateExperimental = (expResult: Video) => {
      let pub_to_trend = 0;
      genResults.forEach((video: Video, index: number) => {
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
              {Object.entries(avgResults).map((avg) => {
                const [key, value] = avg;
                return (
                  <div className="avg">
                    <h2>{averageTitles[key as string]}</h2>
                    <RoaldText>{value ? value : "unavailable"}</RoaldText>
                  </div>
                );
              })}
            </div>
            <h3>Publication Date vs Time to Trend</h3>
            <LineGraph
              results={genResults
                .sort((a: Video, b: Video) => {
                  const dateA = new Date(a.pub_date).getTime();
                  const dateB = new Date(b.pub_date).getTime();
                  if (dateA === dateB) {
                    return a.pub_time < b.pub_time;
                  } else return dateA - dateB;
                })
                .map((video: Video) => ({
                  x: video.pub_date,
                  y: video.pub_to_trend,
                }))}
            />
            <div></div>
            <h3>Number of Comments vs Trending Date</h3>
            <LineGraph
              results={genResults
                .sort(
                  (a: Video, b: Video) =>
                    new Date(a.trend_date).getTime() -
                    new Date(b.trend_date).getTime()
                )
                .map((video: Video) => ({
                  x: video.trend_date,
                  y: video.comment_count,
                }))}
            />
            <div></div>
            <h3>Number of Likes vs Trending Date</h3>
            <LineGraph
              results={genResults
                .sort(
                  (a: Video, b: Video) =>
                    new Date(a.trend_date).getTime() -
                    new Date(b.trend_date).getTime()
                )
                .map((video: Video) => ({
                  x: video.trend_date,
                  y: video.likes,
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

        {catResults.length > 0 ? (
          <CategoryGraph catResults={catResults} />
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
                  (a: Video, b: Video) =>
                    new Date(a.pub_date).getTime() -
                    new Date(b.pub_date).getTime()
                )
                .map((video: Video) => ({
                  x: video.pub_date,
                  y: parseInt(video.pub_to_trend),
                  custom: video?.video_id.length < 1,
                }))}
              color
            />
          </>
        )}
      </DropDown>
    </div>
  );
};
