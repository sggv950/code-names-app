import React from "react";
import styled from "styled-components";

const Row = styled.div`
  display: flex;
  justify-content: center;
`;

const Card = styled.div`
  width: 150px;
  height: 100px;
  margin: 15px;
  border: 2px solid #000;
  border-radius: 10px;
  color: #ffffff;
  position: relative;
  cursor: pointer;
`;

const CardTitle = styled.p`
  position: absolute;
  font-size: 24px;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0px;
  cursor: pointer;
`;

const PlayerBoard = ({board, onBoardClick}) => {

  const handleCardClick = (e) => {
    e.persist();
    const pickedWord = e.target.innerText;
    const updatedBoard = JSON.parse(JSON.stringify(board));
    const wordObjIdx = updatedBoard.findIndex(row => row.find(card => card.word === pickedWord));
    const wordObj = updatedBoard[wordObjIdx].find(card => card.word === pickedWord);
    wordObj.revealed = !wordObj.revealed;
    onBoardClick(updatedBoard, wordObj.color);
  }

  return (
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
                      ? { backgroundColor: card.color, pointerEvents: 'none' }
                      : { backgroundColor: "#663300" }
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
  );
};

export default PlayerBoard;
