import React, { useState } from "react";
import cardNameService from "../services/cardNameService";
import { useHistory } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import styled from "styled-components";
import Spinner from "./LoaderComp";
import { Button } from "./common/styled-comps";
import { Copy } from "@styled-icons/fa-regular/Copy";

const NavContainer = styled.div`
  width: 70%;
  margin: 30px auto;
`;

const GamePickButtons = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`;

const GamePickSection = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  margin: 50px;
  padding: 20px;
  display: flex;
  align-items: center;

  h4 {
    text-align: center;
  }

  p {
    font-size: 12px;
  }
`;

const GameSettingsSection = styled.div`
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h2 {
    text-align: center;
    margin-bottom: 50px;
  }

  ${Button} {
    margin-bottom: 30px;
  }
`;

const GameIdArea = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 30px;

  button {
    width: 30px;
    border: none;
    background-color: #fff;
    cursor: pointer;
    outline: none;
  }
`;

const GameIdText = styled.div`
  background-color: #fafafa;
  border: 1px solid #000000;
  border-radius: 5px;
  padding: 20px;
  margin-right: 10px;
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
  const [createOrJoinGame, setCreateOrJoinGame] = useState("");
  const [menuStep, setMenuStep] = useState("game");
  const [gameId, setGameId] = useState("");
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  let history = useHistory();

  const createNewGame = () => {
    return cardNameService.createGame().then((gameId) => {
      setGameId(gameId);
    });
  };

  // const handleGameId = () => {
  //   onHandleGameMenu(gameId);
  //   history.push("/game/" + gameId);
  // };

  // const handlestartGame = () => {
  //   onHandleGameMenu(gameId);
  //   history.push("/game/" + gameId);
  // };

  const handleInputId = (e) => {
    e.persist();
    setGameId(e.target.value);
  };

  const handleMenuStep = () => {
    onHandleGameMenu(gameId);
    setMenuStep("players");
    history.push("/game/" + gameId);
  };

  const handleCreateOrJoinGame = (startType) => {
    setCreateOrJoinGame(startType);
    console.log(startType);
  };

  // const handleRoleSelect = (e) => {
  //   e.persist();
  //   onRoleSelect(e.target.value);
  // };
  // const handleTeamSelect = (e) => {
  //   e.persist();
  //   onTeamSelect(e.target.value);
  // };

  return (
    <NavContainer>
      {menuStep === "game" && (
        <GamePickSection>
          {!createOrJoinGame && (
            <GamePickButtons>
              <div>
                <Button onClick={() => handleCreateOrJoinGame("create")}>
                  צור משחק חדש
                </Button>
              </div>
              <div>
                <Button onClick={() => handleCreateOrJoinGame("join")}>
                  הצטרף למשחק
                </Button>
              </div>
            </GamePickButtons>
          )}
          {createOrJoinGame === "create" && (
            <GameSettingsSection>
              <h2>משחק חדש</h2>
              {!gameId && <Button onClick={createNewGame}>צור משחק</Button>}
              {gameId && (
                <div>
                  <GameIdArea>
                    <GameIdText>{gameId}</GameIdText>
                    <CopyToClipboard
                      text={gameId}
                      onCopy={() => setCopiedToClipboard(true)}
                    >
                      <button>
                        <Copy />
                      </button>
                    </CopyToClipboard>
                  </GameIdArea>
                  <Button onClick={handleMenuStep}>בחר קבוצה</Button>
                </div>
              )}
              <Button onClick={() => handleCreateOrJoinGame("")}>חזור</Button>
            </GameSettingsSection>
          )}
          {createOrJoinGame === "join" && (
            <GameSettingsSection>
              <h2>הצטרף למשחק</h2>
              <Button onClick={() => handleCreateOrJoinGame("")}>חזור</Button>
              <input onChange={handleInputId} type="text" />
              <Button disabled={gameId.trim() === ""} onClick={handleMenuStep}>
                בחר קבוצה
              </Button>
            </GameSettingsSection>
          )}
        </GamePickSection>
      )}
    </NavContainer>
  );
};

export default GameMenu;
