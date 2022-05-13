import React from "react";
import { countries } from "../constants/countries";
import { Video } from "../constants/types/videoTypes";
import { Averages } from "../constants/types/averageTypes";

interface Country {
  avgs: Averages;
  videos: Video[];
}

interface CountryObject {
  [key: string]: Country;
}

const countryObjects = () => {
  let objects = {} as CountryObject;
  countries.map(
    (country) =>
      (objects[country] = {
        videos: [],
        avgs: {} as Averages,
      })
  );
  return objects;
};

const defaultContext = {
  ...countryObjects(),
  setCountry: () => null,
};

// sloppy types - cleanup later
// a cache for all previously recorded countries -> significantly reduces load time for all subsequent page visits
export const CountryContext = React.createContext<any>(defaultContext);
console.log(defaultContext);
export const CountryContextProvider: React.FC<React.ReactNode> = (props) => {
  const setCountry = ({ name, videos, avgs }: any) => {
      console.log("set country")
    setState((prevUser: Country[]) => ({
      ...prevUser,
      [name]: { name, videos, avgs },
    }));
  };

  const [state, setState] = React.useState<any>({
    ...defaultContext,
    setCountry,
  });

  return (
    <CountryContext.Provider value={state}>
      {props.children}
    </CountryContext.Provider>
  );
};
