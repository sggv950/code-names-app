import React, { useState, useEffect } from "react";
import AnnouncementBar from "./AnnouncementBar";
import PlayerBoard from "./PlayerBoard";
import MentorBoard from "./MentorBoard";
import { useParams } from "react-router-dom";

const io = require("socket.io-client");
const socket = io("http://localhost:5000");

function Game({ isMentor, isBluePlayer }) {
  let { gameId } = useParams();

  const [isLoading, updateIsLoading] = useState(true);
  const [gameState, updateGameState] = useState(null);

  useEffect(() => {
    if (isLoading) {
      console.log("joining game");
      socket.emit("game", { game: gameId });
    }

    return () => {
      if (isLoading) {
        console.log("leaving room");
        socket.emit("leave game", {
          game: gameId,
        });
      }
    };
  });

  useEffect(() => {
    socket.on("game updated", (payload) => {
      const gameObj = JSON.parse(payload);
      console.log("from 2nd effect payload: ", payload);
      console.log("from 2nd effect: ", gameObj);
      updateGameState(gameObj);
      updateIsLoading(false);
      console.log("from 2nd effect, gameState: ", gameState);
    });
  }, []);

  useEffect(() => {
    if (gameState) {
      const gameStateStr = JSON.stringify(gameState);
      socket.emit("update game", { gameStateStr });
    }
  }, [gameState]);

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
      mentorClue,
    }));
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
