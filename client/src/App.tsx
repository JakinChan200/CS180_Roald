import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar/NavBar";
import { Home } from "./pages/Home/Home";
import { countries } from "./constants/countries";
import { Country } from "./pages/Country/Country";
import { UserContextProvider } from "./contexts/UserContext";
import { CountryContextProvider } from "./contexts/CountryContext";

const routes = [
  { name: "/", Component: <Home /> },
  ...countries.map((country: string) => ({
    name: country,
    Component: <Country country={country} key={country} />,
  })),
].sort((a, b) => a.name.localeCompare(b.name, "en"));

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          {routes.map((route) => (
            <Route
              path={`/${route.name}`}
              key={route.name}
              element={route.Component}
            />
          ))}
        </Routes>
      </Router>
    </div>
  );
};

const ComposeApp: React.FC = () => {
  return (
    <UserContextProvider>
      <CountryContextProvider>
        <App />
      </CountryContextProvider>
    </UserContextProvider>
  );
};

export { ComposeApp as App };
