import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { DropDown } from "../../components/DropDown/DropDown";
import { BACKEND_URL } from "../../constants/backendURL";
import "./Country.css";

interface CountryProps {
  country: string;
}

export const Country: React.FC<CountryProps> = ({ country }) => {
  const [results, setResults] = React.useState<null | string>(null);

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
        <h4>insert search here?</h4>
        <p>{results}</p>
      </DropDown>
    </div>
  );
};
