import React from "react";
import styled from "styled-components";

const Board = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const Row = styled.div`
  display: flex;
  justify-content: center;
`;

const Card = styled.div`
  width: 200px;
  height: 100px;
  margin: 10px;
  border: 1px solid #000;
  border-radius: 10px;
  color: #ffffff;
  position: relative;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`;

const CardTitle = styled.p`
  position: absolute;
  font-size: 20px;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0px;
  cursor: pointer;
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
  const handleCardClick = (e) => {
    e.persist();
    const pickedWord = e.target.innerText;
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
        {board.map((row, ri) => {
          return (
            <Row key={ri}>
              {row.map((card) => {
                return (
                  <Card
                    key={card.id}
                    style={
                      card.revealed
                        ? { backgroundColor: card.color, pointerEvents: "none" }
                        : { backgroundColor: "#E7DCC9", color: "#000000" }
                    }
                    onClick={handleCardClick}
                  >
                    <CardTitle>{card.word}</CardTitle>
                  </Card>
                );
              })}
            </Row>
          );
        })}
      </div>
      <SideBoard>
        <GameMoves>
          <p
            style={
              isGameOver
                ? { display: "none" }
                : { color: teamTurn, fontWeight: "bold" }
            }
          >
            <span>{teamTurn}</span> team turn
          </p>
          <div>
            <p>CodeName:</p>
            <p>{mentorClue.clue}</p>
          </div>
          <div>
            <p>Number of Words:</p>
            <p>{mentorClue.wordNum}</p>
          </div>
        </GameMoves>
      </SideBoard>
    </Board>
  );
};

export default PlayerBoard;
