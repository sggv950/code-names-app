import React, { useState, useEffect } from "react";
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
  const [isMentor, updateIsMentor] = useState(false);
  const [isBluePlayer, updateIsBluePlayer] = useState(true);

  const [gameState, updateGameState] = useState(gameObj);
  useEffect(() => {
    console.log(gameState);
    console.log("isMentor: " + isMentor);
    console.log("isBluePlayer: " + isBluePlayer);
  });

  const handleBoardClick = (updatedBoard, pickedColor) => {
    console.log(pickedColor);
    const stateObj = JSON.parse(JSON.stringify(gameState));
    const updatedColorCounters = { ...stateObj.colorCounters };
    let isBlueTeamTurn = stateObj.isBlueTeamTurn;
    let updatedIsGameOver = stateObj.isGameOver;
    let winnerTeam = stateObj.winnerTeam;
    let mentorClue = stateObj.mentorClue;
    updatedColorCounters[pickedColor]++;
    mentorClue.wordNum--;
    if (pickedColor === "black") {
      winnerTeam = isBlueTeamTurn ? "red" : "blue";
      updatedIsGameOver = !updatedIsGameOver;
      mentorClue = { wordNum: 0, clue: "" };
    }
    if (mentorClue.wordNum === 0) {
      mentorClue = { wordNum: 0, clue: "" };
      isBlueTeamTurn = !isBlueTeamTurn;
    }
    if (mentorClue.wordNum > 0) {
      if (
        (isBlueTeamTurn && pickedColor !== "blue") ||
        (!isBlueTeamTurn && pickedColor !== "red")
      ) {
        isBlueTeamTurn = !isBlueTeamTurn;
        mentorClue = { wordNum: 0, clue: "" };
      }
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
      isBlueTeamTurn,
      winnerTeam: winnerTeam,
      mentorClue
    }));
  };

  const handleRoleSelect = (role) => {
    updateIsMentor(role === "mentor");
  };

  const handleTeamSelect = (team) => {
    updateIsBluePlayer(team === "blue");
  };

  const handleMentorClueChange = (clueObj) => {
    const stateObj = JSON.parse(JSON.stringify(gameState));
    let mentorClue = stateObj.mentorClue;
    mentorClue = clueObj;
    updateGameState((currentValus) => ({
      ...currentValus,
      mentorClue,
    }));
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
                  mentorClue={gameState.mentorClue}
                  teamTurn={gameState.isBlueTeamTurn ? "blue" : "red"}
                  mentorColor={isBluePlayer ? "blue" : "red"}
                  isGameOver={gameState.isGameOver}
                />
              ) : (
                <PlayerBoard
                  board={gameState.gameModel}
                  onBoardClick={handleBoardClick}
                  mentorClue={gameState.mentorClue}
                  teamTurn={gameState.isBlueTeamTurn ? "blue" : "red"}
                  playerColor={isBluePlayer ? "blue" : "red"}
                  isGameOver={gameState.isGameOver}
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
