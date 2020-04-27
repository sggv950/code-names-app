import React from "react";
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
    margin: 0;
    font-weight: bold;
  }

  select {
    margin-right: 20px;
  }
`;

const Navbar = ({ gameColor, onRoleSelect, onTeamSelect }) => {
  const handleRoleSelect = (e) => {
    e.persist();
    onRoleSelect(e.target.value);
  };
  const handleTeamSelect = (e) => {
    e.persist();
    onTeamSelect(e.target.value);
  };

  return (
    <Nav
      style={
        gameColor === "mentor"
          ? {}
          : { backgroundColor: gameColor, color: "white" }
      }
    >
      <h2>CodeNames App</h2>
      <div>
        <select onChange={handleRoleSelect}>
          <option value="player">Player</option>
          <option value="mentor">Mentor</option>
        </select>
        <select onChange={handleTeamSelect}>
          <option value="blue">Blue Team</option>
          <option value="red">Red Team</option>
        </select>
      </div>
    </Nav>
  );
};

export default Navbar;
