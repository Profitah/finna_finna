import React from 'react';
import styled from 'styled-components';

const Routinebtn = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 3vh 6vw;
  color: black;
  @media all and (min-width:1024px) {
    display: flex;
    justify-content: space-between;
    margin: 3vh 0;
    color: black;
    width:50vw;
    margin-left:25vw;
  }
`;

const Active = styled.button`
  background-color: #ED8C37;
  border: 0.2px solid black;
  border-radius: 50px;
  width: 18vw;
  height: 4.5vh;
  color: white;
  cursor: pointer;
  @media all and (min-width:1024px) {
    width: 9vw;
  }
  @media all and (min-width:768px) and (max-width:1023px) {
    width: 13vw;
  }
`;

const Inactive = styled.button`
  border: 0.2px solid rgb(131, 131, 131);
  border-radius: 50px;
  background-color: white;
  width: 18vw;
  height: 4.5vh;
  color: black;
  cursor: pointer;
  @media all and (min-width:1024px) {
    width: 9vw;
  }
  @media all and (min-width:768px) and (max-width:1023px) {
    width: 13vw;
  }
`;

const ButtonGroup = ({ activeBtn, handleBtnClick }) => (
  <Routinebtn>
    {activeBtn === 'morning' ? 
      <Active onClick={() => handleBtnClick('morning')}>Morning</Active> : 
      <Inactive onClick={() => handleBtnClick('morning')}>Morning</Inactive>}
    {activeBtn === 'evening' ? 
      <Active onClick={() => handleBtnClick('evening')}>Evening</Active> : 
      <Inactive onClick={() => handleBtnClick('evening')}>Evening</Inactive>}
    {activeBtn === 'health' ? 
      <Active onClick={() => handleBtnClick('health')}>Health</Active> : 
      <Inactive onClick={() => handleBtnClick('health')}>Health</Inactive>}
    {activeBtn === 'mood' ? 
      <Active onClick={() => handleBtnClick('mood')}>Feeling</Active> : 
      <Inactive onClick={() => handleBtnClick('mood')}>Feeling</Inactive>}
  </Routinebtn>
);

export default ButtonGroup;
