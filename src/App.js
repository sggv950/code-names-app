import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import AnnouncementBar from "./components/AnnouncementBar";
import GameMenu from "./components/GameMenu";
import PlayerBoard from "./components/PlayerBoard";
import MentorBoard from "./components/MentorBoard";
import "./App.css";
import createBoard from "./services/cardNameService";
// import io from 'socket.io-client';

function App() {
  // console.log('before socket connection');
  // const socket = io('localhost:5000');
  // socket.emit('message', 'hi');

  const gameObj = createBoard();
  const [isMentor, updateIsMentor] = useState(true);
  const [isBluePlayer, updateIsBluePlayer] = useState(true);
  let mentorClue = useRef({ wordNum: 0, clue: "" });

  const [gameState, updateGameState] = useState(gameObj);
  useEffect(() => {
    console.log(mentorClue);
    console.log(gameState);
    console.log("isMentor: " + isMentor);
    console.log("isBluePlayer: " + isBluePlayer);
  });

  const handleBoardClick = (updatedBoard, pickedColor) => {
    console.log(pickedColor);
    const stateObj = JSON.parse(JSON.stringify(gameState));
    const isBlueTeamTurn = stateObj.isBlueTeamTurn;
    const updatedColorCounters = { ...stateObj.colorCounters };
    let updatedIsGameOver = stateObj.isGameOver;
    let winnerTeam = stateObj.winnerTeam;
    updatedColorCounters[pickedColor]++;
    if (pickedColor === "black") {
      winnerTeam = isBlueTeamTurn ? "red" : "blue";
      updatedIsGameOver = !updatedIsGameOver;
    }
    if (
      pickedColor !== "black" &&
      pickedColor !== "grey" &&
      updatedColorCounters[pickedColor] === gameState.colorLimits[pickedColor]
    ) {
      winnerTeam = pickedColor;
      updatedIsGameOver = !updatedIsGameOver;
    }

    updateGameState((currentValus) => ({
      ...currentValus,
      gameModel: updatedBoard,
      colorCounters: updatedColorCounters,
      isGameOver: updatedIsGameOver,
      isBlueTeamTurn: !isBlueTeamTurn,
      winnerTeam: winnerTeam,
    }));
  };

  const handleRoleSelect = (role) => {
    updateIsMentor(role === "mentor");
  };

  const handleTeamSelect = (team) => {
    updateIsBluePlayer(team === "blue");
  };

  const handleMentorClueChange = (input) => {
    console.log(input);
    
  };

  return (
    <div className="App">
      <Navbar
        gameColor={isMentor ? "mentor" : isBluePlayer ? "blue" : "red"}
        onRoleSelect={handleRoleSelect}
        onTeamSelect={handleTeamSelect}
      />
      <AnnouncementBar winner={gameState.winnerTeam} />
      <Router>
        <Switch>
          <Route exact path="/">
            <GameMenu />
          </Route>
          <Route
            path="/:id"
            children={
              isMentor ? (
                <MentorBoard
                  onMentorClueChange={handleMentorClueChange}
                  board={gameState.gameModel}
                />
              ) : (
                <PlayerBoard
                  board={gameState.gameModel}
                  onBoardClick={handleBoardClick}
                />
              )
            }
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
