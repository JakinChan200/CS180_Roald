import React from "react";

export interface UserContextInterface {
  userName: string;
  videos: string[];
  setUser: (newUser: User) => void;
}

export interface User {
  userName?: string;
  videos?: string[];
}

const defaultContext = {
  userName: "null",
  videos: [] as string[],
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
