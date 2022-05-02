import React from "react";
import { Video } from "../constants/types/videoTypes";

export interface UserContextInterface {
  userName: string;
  videos: Video[];
  setUser: (newUser: User) => void;
}

export interface User {
  userName?: string;
  videos?: Video[];
}

const defaultContext = {
  userName: "null",
  videos: [] as Video[],
  setUser: () => null,
};

export const UserContext =
  React.createContext<UserContextInterface>(defaultContext);

export const UserContextProvider: React.FC<React.ReactNode> = (props) => {
  const setUser = (newUser: User) => {
    setState((prevUser) => ({
      ...prevUser,
      ...newUser,
    }));
  };

  const [state, setState] = React.useState<UserContextInterface>({
    ...defaultContext,
    setUser,
  });

  return (
    <UserContext.Provider value={state}>{props.children}</UserContext.Provider>
  );
};
