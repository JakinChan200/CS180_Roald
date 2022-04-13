import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NavBar } from "./components/NavBar/NavBar";
import { Home } from "./pages/Home/Home";
import { ThemeContextProvider } from "./contexts/ThemeContext";

const routes = [
  { name: "home", Component: Home },
  { name: "US", Component: <></> },
  { name: "DE", Component: <></> },
  { name: "CA", Comoponent: <></> }
]

export const App: React.FC = () => {
  return (
    <div className="App">
      <ThemeContextProvider>
        <Router>
          <NavBar />
          <Routes>
            {routes.map((route) => <Route path={`/${route.name}`}>{route.Component}</Route>)}
          </Routes>
        </Router>
      </ThemeContextProvider>
    </div>
  );
};

export default App;
