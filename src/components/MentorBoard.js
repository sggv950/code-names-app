import React, { useState, useEffect } from "react";
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

const CardMark = styled.p`
  position: absolute;
  font-size: 100px;
  font-weight: lighter;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0px;
`;

const SideBoard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const Control = styled.form`
  width: 200px;
  height: 200px;
  border: 2px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  input {
    width: 150px;
    margin-top: 10px;
    margin-bottom: 30px;
    text-align: center;
  }

  button {
    width: 100px;
  }
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

const MentorBoard = ({
  board,
  onMentorClueChange,
  mentorClue,
  teamTurn,
  mentorColor,
  isGameOver,
}) => {
  const [formValues, setFormValues] = useState({ wordNum: 0, clue: "" });
  useEffect(() => {
    console.log("from mentor clue: " + formValues.clue);
    console.log("from mentor num: " + formValues.wordNum);
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    //TODO: handle the submit object to app component
    onMentorClueChange(formValues);
    setFormValues({ wordNum: 0, clue: "" });
  };

  const handleInputChange = (e) => {
    e.persist();
    setFormValues((currentValues) => ({
      ...currentValues,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Board style={teamTurn !== mentorColor ? { pointerEvents: "none" } : {}}>
      <div>
        {board.map((row, ri) => {
          return (
            <Row key={ri}>
              {row.map((card) => {
                if (!card.revealed) {
                  return (
                    <Card key={card.id} style={{ backgroundColor: card.color }}>
                      <CardTitle>{card.word}</CardTitle>
                    </Card>
                  );
                } else {
                  return (
                    <Card key={card.id} style={{ backgroundColor: card.color }}>
                      <CardTitle>{card.word}</CardTitle>
                      <CardMark>X</CardMark>
                    </Card>
                  );
                }
              })}
            </Row>
          );
        })}
      </div>
      <SideBoard style={isGameOver ? { display: "none" } : {}}>
        <Control onSubmit={handleSubmit}>
          Code Name:
          <input
            type="text"
            onChange={handleInputChange}
            value={formValues.clue}
            name="clue"
          />
          Number of Words:
          <input
            type="text"
            onChange={handleInputChange}
            value={formValues.wordNum}
            name="wordNum"
          />
          <button type="submit">Send</button>
        </Control>
        <GameMoves>
          <p style={{ color: teamTurn, fontWeight: "bold" }}>
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

export default MentorBoard;
