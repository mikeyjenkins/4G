import React from "react";
import "./styles/custom.scss";
import Game from "./components./Game";

const App: React.FC = () => {
  return (
    <div className="app-wrapper">
      <Game />
    </div>
  );
}

export default App;
