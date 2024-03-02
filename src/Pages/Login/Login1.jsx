import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Login1Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  overflow: hidden;

  @media screen and (max-width: 873px) {
    height: 90vh;
  }
`;

const MainText = styled.div`
  text-align: left;
  margin-top: 6vh;
  margin-left: 35vw;
  margin-bottom: 0.2vh;

  @media screen and (max-width: 873px) {
    margin-top: 3vh;
    margin-left: 10vw;
    margin-bottom: 0.2vh;
  }
`;

const Text1 = styled.p`
  font-size: 2.5rem;
  width: 30vw;
  font-weight: 730;
  margin-bottom: 0.3vh;
  letter-spacing: 1px;
  margin-top: 2.5vh;
  line-height: 2.8rem;
  white-space: pre-line;

  @media screen and (max-width: 873px) {
    width: 70vw;
  }
`;

const Text2 = styled.p`
  position: relative;
  bottom: 6vh;
  font-size: 0.8rem;
  width: 70vw;
  margin-top: 6vh;
  line-height: 2.2vh;
  letter-spacing: 0.05px;

  @media screen and (max-width: 873px) {
    width: 70vw;
  }
`;

const SubmitButton = styled.button`
  padding: 2.3vh;
  font-size: 1.25rem;
  background-color: #ed8c37;
  text-align: center;
  cursor: pointer;
  border-radius: 50px;
  margin-bottom: 10vh;
  width: 430px;
  align-items: center;
  margin: 10vh auto;
  color: white;
  border: none;

  &:hover {
    background-color: #ed8c37;
    color: white;
  }

  @media screen and (max-width: 873px) {
    width: 300px;
  }
`;

const Login1 = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/login2");
  };

  return (
    <Login1Container>
      <MainText>
        <Text1>
          A fair day<br></br>for us
        </Text1>
        <Text2>
        Not looking at what is in others, <br></br>but being grateful for what is given to me
        </Text2>
      </MainText>
      <SubmitButton id="login1_submit_btn" onClick={handleButtonClick}>
        <strong>Hello👋</strong>
      </SubmitButton>
    </Login1Container>
  );
};

export default Login1;
