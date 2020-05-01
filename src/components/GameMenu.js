import React, { useState } from "react";
import cardNameService from "../services/cardNameService";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const NavContainer = styled.div`
  width: 800px;
  display: flex;
  flex-direction: column;
  margin: 30px auto;
`;

const GamePick = styled.div`
  display: flex;
  justify-content: space-around;
`;

const GamePickSection = styled.div`
  border: 1px solid black;
  width: 50%;
  border-radius: 5px;
  margin: 50px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h4 {
    text-align: center;
  }
  p {
    font-size: 12px;
  }
`;

const TeamRolePick = styled.div`
  display: flex;
  justify-content: center;
  align-self: center;
  border: 1px solid black;
  width: 300px;

  select {
    width: 130px;
    padding: 10px;
    margin: 20px;
  }
`;

const GameMenu = ({
  onHandleGameMenu,
  onRoleSelect,
  onTeamSelect,
  isMentor,
  isBluePlayer,
}) => {
  const [gameId, setGameId] = useState("");
  let history = useHistory();

  const createNewGame = () => {
    return cardNameService.createGame().then((newGameId) => {
      setGameId(newGameId);
    });
  };

  const handleNewGameId = () => {
    onHandleGameMenu(gameId);
    history.push("/game/" + gameId);
  };

  const handleInputId = (e) => {
    e.persist();
    setGameId(e.target.value);
  };

  const handleSubmitFormId = (e) => {
    e.preventDefault();
    handleNewGameId();
  };

  const handleRoleSelect = (e) => {
    e.persist();
    onRoleSelect(e.target.value);
  };
  const handleTeamSelect = (e) => {
    e.persist();
    onTeamSelect(e.target.value);
  };

  return (
    <NavContainer>
      <GamePick>
        <GamePickSection>
          <h4>הצטרף למשחק</h4>
          <form onSubmit={handleSubmitFormId}>
            <button type="submit">הצטרף</button>
            <input onChange={handleInputId} type="text" />
          </form>
        </GamePickSection>
        <GamePickSection>
          <h4>משחק חדש</h4>
          <div>
            <button
              style={gameId ? { display: "none" } : { display: "block" }}
              onClick={createNewGame}
            >
              צור משחק
            </button>
          </div>
          <div style={gameId ? { display: "block" } : { display: "none" }}>
            <p>game id:</p>
            <p>{gameId}</p>
            <button onClick={handleNewGameId}>התחל משחק</button>
          </div>
        </GamePickSection>
      </GamePick>

      <TeamRolePick>
        <select
          onChange={handleRoleSelect}
          value={isMentor ? "mentor" : "player"}
        >
          <option value="player">שחקן</option>
          <option value="mentor">מנטור</option>
        </select>
        <select
          onChange={handleTeamSelect}
          value={isBluePlayer ? "blue" : "red"}
        >
          <option value="blue">קבוצה כחולה</option>
          <option value="red">קבוצה אדומה</option>
        </select>
      </TeamRolePick>
    </NavContainer>
  );
};

export default GameMenu;
