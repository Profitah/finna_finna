import React from "react";
import NavBar from "../Nav/Nav";
import styled from "styled-components";
import Boardcomponets from "./Boardcomponets";  

const BoardWrap = styled.div`

`;


const Board = () => {
  return (
    <BoardWrap>
      <NavBar />
      <Boardcomponets />    
    </BoardWrap>
  );
};

export default Board;