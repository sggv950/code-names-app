import React from "react";
import styled from "styled-components";
import NameCard from "./NameCard";

const Board = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
`;

const SideBoard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const GameMoves = styled.div`
  width: 200px;
  height: 200px;
  border: 2px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  p {
    padding: 0;
    margin: 0;
    text-align: center;
  }
`;

const PlayerBoard = ({
  board,
  onBoardClick,
  mentorClue,
  teamTurn,
  playerColor,
  isGameOver,
}) => {
  const handleCardClick = (pickedWord) => {
    const updatedBoard = JSON.parse(JSON.stringify(board));
    const wordObjIdx = updatedBoard.findIndex((row) =>
      row.find((card) => card.word === pickedWord)
    );
    const wordObj = updatedBoard[wordObjIdx].find(
      (card) => card.word === pickedWord
    );
    wordObj.revealed = !wordObj.revealed;
    onBoardClick(updatedBoard, wordObj.color);
  };

  return (
    <Board
      style={
        mentorClue.wordNum < 1 ||
        mentorClue.clue === "" ||
        teamTurn !== playerColor
          ? { pointerEvents: "none" }
          : {}
      }
    >
      <div>
        {board.map((row, rowIdx) => {
          return (
            <Row key={rowIdx}>
              {row.map((card, cardIdx) => {
                return (
                  <NameCard
                    key={card.id}
                    color={card.color}
                    revealed={card.revealed}
                    word={card.word}
                    onCardClick={handleCardClick}
                    coor={rowIdx+cardIdx}
                  />
                );
              })}
            </Row>
          );
        })}
      </div>
      <SideBoard style={isGameOver ? { display: "none" } : {}}>
        <GameMoves>
          <p style={{ color: teamTurn, fontWeight: "bold" }}>
            תור הקבוצה <span>{teamTurn === "blue" ? "הכחולה" : "האדומה"}</span>
          </p>
          <div>
            <p>מילת קוד</p>
            <p>{mentorClue.clue}</p>
          </div>
          <div>
            <p>מספר מילים</p>
            <p>{mentorClue.wordNum}</p>
          </div>
        </GameMoves>
      </SideBoard>
    </Board>
  );
};

export default PlayerBoard;
