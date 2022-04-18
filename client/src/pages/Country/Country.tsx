import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { SearchBar } from "../../components/Country/SearchBar/SearchBar";
import { DropDown } from "../../components/Country/DropDown/DropDown";
import { BACKEND_URL } from "../../constants/backendURL";
import { getCategories } from "./catHelper/getCategories";
import "./Country.css";
import { PubForm } from "../../components/Country/PubForm/PubForm";

interface CountryProps {
  country: string;
}

export const Country: React.FC<CountryProps> = ({ country }) => {
  const [catResults, setCatResults] = React.useState<any[]>([]);
  const [genResults, setGenResults] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const categories = getCategories(country);

  const getResult = (value: string) => {
    axios
      .get(`${BACKEND_URL}/countries/${country}?id=${value}`)
      .then((res) => setCatResults(res.data))
      .catch((e) => {
        setCatResults([{ title: "an error occurred" }]);
      });
  };

  useEffect(() => {
    //temporary request that will simply show country information under experimental results
    //replace with a search bar and proper searching
    axios
      .get(`${BACKEND_URL}/countries/${country}`)
      .then((res) => {
        setCatResults([{ title: "no results" }]);
        setGenResults(res.data);
      })
      .catch((err) => {
        setGenResults([{ title: "an error occurred" }]);
      });
  }, [country]);

  return (
    <div className="page">
      <h1 className="title">{country}</h1>
      <DropDown label="General Metrics">
        {genResults.map((result, index) => (
          <div key={index}>
            <p>{result?.title}</p>
            <hr style={{ width: "30%" }} />
          </div>
        ))}
      </DropDown>
      <DropDown label="Query Metrics" notOpen>
        <h3>Search Categories</h3>
        <SearchBar
          country={country}
          onResult={getResult}
          categories={categories}
        />
        {catResults.map((result, index) => (
          <div key={index}>
            <p>{result?.title}</p>
            <hr style={{ width: "30%" }} />
          </div>
        ))}
      </DropDown>
      <DropDown label="Submit Video Data" notOpen>
        <h3>Submit Test Video</h3>
        <PubForm />
      </DropDown>
    </div>
  );
};
