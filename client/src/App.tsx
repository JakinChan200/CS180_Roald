import React from "react";
import "./App.css";
import { DummyBox } from "./components/DummyBox";

export const App: React.FC = () => {
  return (
    <div className="App">
      <DummyBox />
    </div>
  );
};

export default App;
