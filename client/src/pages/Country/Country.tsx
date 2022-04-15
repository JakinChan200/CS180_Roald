import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { SearchBar } from "../../components/Country/SearchBar/SearchBar";
import { DropDown } from "../../components/Country/DropDown/DropDown";
import { BACKEND_URL } from "../../constants/backendURL";
import { getCategories } from "./catHelper/getCategories";
import "./Country.css";

interface CountryProps {
  country: string;
}

export const Country: React.FC<CountryProps> = ({ country }) => {
  const [results, setResults] = React.useState<string[]>([]);
  const categories = getCategories(country);

  const getResult = (value: string) => {
    axios
      .get(`${BACKEND_URL}/countries/${country}?=${categories}`)
      .then((res) => setResults(res.data))
      .catch((e) => {
        setResults(["An error occurred"]);
      });
  };

  useEffect(() => {
    //temporary request that will simply show country information under experimental results
    //replace with a search bar and proper searching
    axios
      .get(`${BACKEND_URL}/${country}`)
      .then((res) => {
        setResults(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [country]);

  return (
    <div className="page">
      <h1 className="title">{country}</h1>
      <DropDown label="General Metrics">
        <h4>hi</h4>
      </DropDown>
      <DropDown label="Experimental Metrics">
        <h3>Search Categories</h3>
        <SearchBar
          country={country}
          onResult={getResult}
          categories={categories}
        />
        {results.map((result) => (
          <p>{result}</p>
        ))}
      </DropDown>
    </div>
  );
};
