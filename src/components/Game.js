import React, { useState, useEffect } from "react";
import AnnouncementBar from "./AnnouncementBar";
import PlayerBoard from "./PlayerBoard";
import MentorBoard from "./MentorBoard";
import { useParams } from "react-router-dom";

const io = require("socket.io-client");
const socket = io();

function Game({ isMentor, isBluePlayer }) {
  let { gameId } = useParams();

  const [isLoading, updateIsLoading] = useState(true);
  const [gameState, updateGameState] = useState(null);

  useEffect(() => {
    socket.emit("game", { game: gameId });
  }, [isLoading, gameId]);

  useEffect(() => {
    socket.on("game updated", (payload) => {
      const gameObj = JSON.parse(payload);
      updateGameState(gameObj);
      updateIsLoading(false);
    });
  }, []);


  const handleBoardClick = (updatedBoard, pickedColor) => {
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
      mentorClue,
    }));

    const gameStateStr = JSON.stringify({
      ...gameState,
      gameModel: updatedBoard,
      colorCounters: updatedColorCounters,
      isGameOver: updatedIsGameOver,
      isBlueTeamTurn,
      winnerTeam: winnerTeam,
      mentorClue,
    });
    socket.emit("update game", { gameStateStr });
  };

  const handleMentorClueChange = (clueObj) => {
    const stateObj = JSON.parse(JSON.stringify(gameState));
    let mentorClue = stateObj.mentorClue;
    mentorClue = clueObj;
    updateGameState((currentValus) => ({
      ...currentValus,
      mentorClue,
    }));

    const gameStateStr = JSON.stringify({
      ...gameState,
      mentorClue,
    });
    socket.emit("update game", { gameStateStr });
  };

  if (isLoading) {
    return <div>loading....</div>;
  } else {
    return (
      <div>
        <AnnouncementBar winner={gameState.winnerTeam} />
        {isMentor ? (
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
        )}
        />
      </div>
    );
  }
}

export default Game;
