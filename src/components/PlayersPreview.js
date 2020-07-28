import React from "react";
import styled from "styled-components";
import { User, UserSecret, Undo } from "@styled-icons/fa-solid";

const PlayersPreviewContainer = styled.div`
  border: 1px solid #000;
  border-radius: 5px;
  padding: 20px;
  text-align: center;
  margin: 20px;
  background-color: #fafafa;
  width: 150px;

  h2 {
      margin-bottom: 30px;
  }
`;

const PlayersPreviewList = styled.div``;

const PlayersPreviewItem = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;

  svg {
    width: 20px;
    margin: 5px;
  }
`;

const PlayerPreview = ({players}) => {
 

  return (
    <PlayersPreviewContainer>
        <h2>משתתפים</h2>
      <PlayersPreviewList>
        {players
          .filter((player) => player.isBluePlayer)
          .map((player) => {
            return (
              <PlayersPreviewItem
                key={player.id}
                style={{
                  color: player.isBluePlayer ? "blue" : " red",
                }}
              >
                {player.name}
                {player.isMentor && <UserSecret />}
              </PlayersPreviewItem>
            );
          })}
      </PlayersPreviewList>
      <PlayersPreviewList>
        {players
          .filter((player) => !player.isBluePlayer)
          .map((player) => {
            return (
              <PlayersPreviewItem
                key={player.id}
                style={{
                  color: player.isBluePlayer ? "blue" : " red",
                }}
              >
                {player.name}
                {player.isMentor && <UserSecret />}
              </PlayersPreviewItem>
            );
          })}
      </PlayersPreviewList>
    </PlayersPreviewContainer>
  );
};

export default PlayerPreview;
