import styled from "styled-components";

export const Button = styled.button`
  cursor: pointer;
  width: 180px;
  height: 70px;
  font-size: 14px;
  font-weight: bold;
  margin: 10px;
      svg {
          width: 20px;
      }

  &:hover {
    background-color: lightblue;
  }
`;
