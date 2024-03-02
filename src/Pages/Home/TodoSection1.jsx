import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "../Nav/Nav.jsx";

const TodoSection1Wrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: 340;
`;

const GoRoutine = styled.p`
    color: blue;
    text-decoration: underline blue;

`;

const Todoselect1= () => {
  return (
    <TodoSection1Wrap>
      <p>There's nothing to do</p> 
      <Link to="/routine">
        <GoRoutine>Shall we make a new routine?</GoRoutine>
      </Link>
    </TodoSection1Wrap>
  );
};

export default Todoselect1;
