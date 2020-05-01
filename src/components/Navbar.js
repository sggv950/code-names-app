import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.div`
  background-color: #23ac8e;
  position: sticky;
  top: 0;
  left: 0;
  padding: 25px;
  z-index: 5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: black;

  h2 {
    cursor: pointer;
    margin: 0;
    font-weight: bold;
  }
`;

const RightMenu = styled.div`
  display: flex;
  select {
    cursor: pointer;
    margin-right: 20px;
  }
  button {
    cursor: pointer;
    font-size: 22px;
    margin: 0px 5px;
  }
`;

const Navbar = ({
  gameColor,
  onRoleSelect,
  onTeamSelect,
  isMentor,
  isBluePlayer,
}) => {
  const [showSettings, toggleShowSettings] = useState(false);
  let history = useHistory();

  const handleRoleSelect = (e) => {
    e.persist();
    onRoleSelect(e.target.value);
  };

  const handleTeamSelect = (e) => {
    e.persist();
    onTeamSelect(e.target.value);
  };

  const handleShowSetting = () => {
    toggleShowSettings((currentValue) => !currentValue);
  };

  const handleGoToMenu = () => {
    history.push("/");
  };

  return (
    <Nav
      style={
        gameColor === "mentor"
          ? {}
          : { backgroundColor: gameColor, color: "white" }
      }
    >
      <div onClick={handleGoToMenu}>
        <h2>CodeNames App</h2>
      </div>
      <RightMenu>
        {showSettings ? (
          <div>
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
            <button onClick={handleGoToMenu}>⌂</button>
            <button onClick={handleShowSetting}>⚙</button>
          </div>
        ) : (
          <div>
            <button onClick={handleShowSetting}>⚙</button>
          </div>
        )}
      </RightMenu>
    </Nav>
  );
};

export default Navbar;
