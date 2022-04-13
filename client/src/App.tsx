import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar/NavBar";
import { Home } from "./pages/Home/Home";
import { countries } from "./constants/countries";
import { Country } from "./pages/Country/Country";

const routes = [
  { name: "home", Component: Home },
  ...countries.map((country: string) => ({
    name: country,
    Component: <Country country={country} key={country} />,
  })),
].sort((a, b) => a.name.localeCompare(b.name, "en"));

export const App: React.FC = () => {
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

export default App;
