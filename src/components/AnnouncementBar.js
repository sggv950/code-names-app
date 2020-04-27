import React from "react";
import styled from "styled-components";

const Announcement = styled.div`
  padding: 13px;
  background-color: black;
  color: white;

  h3 {
    text-align: center;
    margin: 0;
    font-weight: bold;
  }
`;

const AnnouncementBar = ({ winner }) => {
  return (
    <Announcement style={winner ? { display: "block" } : { display: "none" }}>
      <h3>
        Game Over <span style={{ color: winner }}>{winner}</span> Team Won!
      </h3>
    </Announcement>
  );
};

export default AnnouncementBar;
