import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import GameMenu from "./components/GameMenu";
import Game from "./components/Game";
import "./App.css";

function App() {
  const [isMentor, updateIsMentor] = useState(false);
  const [isBluePlayer, updateIsBluePlayer] = useState(true);
  const [gameId, updateGameId] = useState("");

  const handleRoleSelect = (role) => {
    updateIsMentor(role === "mentor");
  };

  const handleTeamSelect = (team) => {
    updateIsBluePlayer(team === "blue");
  };

  const handleGameMenu = (gameId) => {
    updateGameId(gameId);
    console.log("from handleGameMenu : " + gameId);
  };

  return (
    <div className="App">
      <Router>
        <Navbar
          gameColor={isMentor ? "mentor" : isBluePlayer ? "blue" : "red"}
          onRoleSelect={handleRoleSelect}
          onTeamSelect={handleTeamSelect}
          isMentor={isMentor}
          isBluePlayer={isBluePlayer}
        />
        <Switch>
          <Route exact path="/">
            <GameMenu
              onHandleGameMenu={handleGameMenu}
              onRoleSelect={handleRoleSelect}
              onTeamSelect={handleTeamSelect}
              isMentor={isMentor}
              isBluePlayer={isBluePlayer}
            />
          </Route>
          <Route path="/game/:gameId">
            <Game
              isMentor={isMentor}
              isBluePlayer={isBluePlayer}
              gameId={gameId}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
