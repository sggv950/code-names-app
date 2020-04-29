import React from "react";
import cardNameService from "../services/cardNameService";
import { useHistory } from "react-router-dom";

// import styled from "styled-components";

const GameMenu = ({ onHandleGameMenu }) => {
  let history = useHistory();
  const createNewGame = () => {
    return cardNameService
      .createGame()
      .then((gameId) => {
        handleId(gameId);
        // handleId("gameId");
        history.push("/game/"+gameId);
      })
      
  };

  const handleId = (gameId) => {
    onHandleGameMenu(gameId);
  };

  return (
    <div>
      <h1>game menu</h1>
      <button onClick={createNewGame}>New Game</button>
    </div>
  );
};

export default GameMenu;
