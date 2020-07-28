import React, { useState, useRef } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { User, UserSecret, Undo } from "@styled-icons/fa-solid";
import { Button } from "./common/styled-comps";

const SettingsButton = styled.button`
  cursor: pointer;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  outline: none;
  margin: 20px;
  background-color: transparent;

  :hover {
    opacity: 0.8;
  }

  :disabled {
    opacity: 0.9;
    color: #ccc !important;
    pointer-events: none;
  }
`;

const SettingsStep = styled.div`
  border: 1px solid #000;
  border-radius: 5px;
  padding: 20px;
  text-align: center;
  margin: 20px auto;
  background-color: #fafafa;
  width: 500px;

  input {
    text-align: center;
  }
`;

const PlayerSettings = ({ players, onSetPlayer, onPlayerReady }) => {
  const initialState = { id: uuidv4(), name: "" };
  const [currentPlayer, setCurrentPlayer] = useState(initialState);
  const step = useRef(1);

  const setPlayerTeam = (color) => {
    setCurrentPlayer((currentValues) => ({
      ...currentValues,
      isBluePlayer: color === "blue",
    }));
    step.current = 2;
  };

  const setPlayerRole = (role) => {
    setCurrentPlayer((currentValues) => ({
      ...currentValues,
      isMentor: role === "mentor",
    }));
    step.current = 3;
  };

  const setPlayerName = (e) => {
    e.persist();
    setCurrentPlayer((currentValues) => ({
      ...currentValues,
      name: e.target.value,
    }));
  };

  const resetPlayerSettings = () => {
    setCurrentPlayer({ name: "" });
    step.current = 1;
  };

  const registerPlayer = () => {
    step.current = 4;
    onSetPlayer(currentPlayer);
  };
  const updatePlayerReady = () => {
    onPlayerReady(currentPlayer);
  };

  return (
    <div>
      <SettingsStep>
        <h2>קבוצה</h2>
        <div>
          <SettingsButton
            onClick={() => setPlayerTeam("blue")}
            style={{ backgroundColor: "blue" }}
          ></SettingsButton>
          <SettingsButton
            onClick={() => setPlayerTeam("red")}
            style={{ backgroundColor: "red" }}
          ></SettingsButton>
        </div>
      </SettingsStep>
      <SettingsStep
        style={
          step.current < 2 ? { opacity: "0.5", pointerEvents: "none" } : {}
        }
      >
        <h2>תפקיד</h2>
        <div>
          <SettingsButton
            onClick={() => setPlayerRole("player")}
            style={{
              color:
                step.current >= 2
                  ? currentPlayer.isBluePlayer
                    ? "blue"
                    : " red"
                  : "black",
            }}
          >
            <User />
          </SettingsButton>
          <SettingsButton
            onClick={() => setPlayerRole("mentor")}
            style={{
              color:
                step.current >= 2
                  ? currentPlayer.isBluePlayer
                    ? "blue"
                    : " red"
                  : "black",
            }}
            disabled={
              currentPlayer.isBluePlayer !== undefined &&
              ((currentPlayer.isBluePlayer &&
                players.find(
                  (player) => player.isBluePlayer && player.isMentor
                )) ||
                (!currentPlayer.isBluePlayer &&
                  players.find(
                    (player) => !player.isBluePlayer && player.isMentor
                  )))
            }
          >
            <UserSecret />
          </SettingsButton>
        </div>
      </SettingsStep>
      <SettingsStep
        style={
          step.current < 3 ? { opacity: "0.5", pointerEvents: "none" } : {}
        }
      >
        שם
        <br />
        <input onChange={setPlayerName} value={currentPlayer.name} />
      </SettingsStep>

      <SettingsStep>
        <Button
          onClick={updatePlayerReady}
          // disabled={
          //   players.some((player) => player.id == currentPlayer.id) &&
          //   players.filter((player) => player.isMentor).length == 2
          // }
        >
           התחל משחק
        </Button>
        <Button onClick={registerPlayer} disabled={!currentPlayer.name}>
          הצטרף
        </Button>
        <Button onClick={resetPlayerSettings}>
          <Undo />
        </Button>
      </SettingsStep>
    </div>
  );
};

export default PlayerSettings;
