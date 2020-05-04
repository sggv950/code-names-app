import React from "react";
import styled from "styled-components";
import blueCard1 from "../images/blue-card-1.png";
import blueCard2 from "../images/blue-card-2.png";
import redCard1 from "../images/red-card-1.png";
import redCard2 from "../images/red-card-2.png";
import greyCard1 from "../images/grey-card-1.png";
import greyCard2 from "../images/grey-card-2.png";
import blackCard from "../images/black-card.png";
import regularCard from "../images/card.png";

const Card = styled.div`
  width: 180px;
  height: 120px;
  margin: 7px;
  border: 1px solid #000;
  border-radius: 10px;
  color: snow;
  position: relative;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
  }
`;

const CardTitle = styled.div`
  position: absolute;
  width: 100%;
  height: 20px;
  font-size: 16px;
  text-align: center;
  bottom: 18%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 2px 0;
  cursor: pointer;
`;

const NameCard = ({ color, revealed, word, onCardClick, coor }) => {
  const handleClick = (e) => {
    e.persist();
    const pickedWord = e.target.innerText;
    onCardClick(pickedWord);
  };

  const setCardImg = (color, coor) => {
    if(color === "blue") {
      if(coor % 2 === 0) return blueCard2;
      else return blueCard1;
    }
    if(color === "red") {
      if(coor % 2 === 0) return redCard2;
      else return redCard1;
    }
    if(color === "grey") {
      if(coor % 2 === 0) return greyCard2;
      else return greyCard1;
    }
    if(color === "black") return blackCard;
  };

  return (
    <Card
      style={
        revealed
          ? {
              pointerEvents: "none",
              backgroundSize: "cover",
              backgroundImage: `url(${setCardImg(color, coor)})`
            }
          : {
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundImage: `url(${regularCard})`,
            }
      }
      onClick={handleClick}
    >
      <CardTitle
        style={
          revealed
            ? {}
            : { top: "unset", backgroundColor: "transparent", color: "black" }
        }
      >
        {word}
      </CardTitle>
    </Card>
  );
};

export default NameCard;
