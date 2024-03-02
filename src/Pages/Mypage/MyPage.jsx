import React from "react";
import NavBar from "../Nav/Nav.jsx";
import { useNavigate } from 'react-router-dom';
import { GoChevronRight } from "react-icons/go";
import styled from 'styled-components';


const MyPageText = styled.div`
  font-size: 2rem;
  margin-top: 4vh;
  margin-left: 10vw;
  margin-bottom: 5vh;
`;

const MyPageNavi = styled.div`
  border-bottom: 0.5px solid #BFBABA;
  margin-top: 2vh;
  margin-left: 10vw;
  width: 75%;
  padding: 12px;
  display: flex;
`;

const MyPageTextNavi = styled.div`
  width: 95%;
`;

const MyPage = () => {
  const navigate = useNavigate();

  const goToProfile = () => {
    navigate('/Profile');
  };

  const goToRoutineReset = () => {
    navigate('/Reset');
  };

  return (
    <div>
      <NavBar />
      <div>
        <MyPageText>My Page</MyPageText>
        <MyPageNavi>
          <MyPageTextNavi>User info</MyPageTextNavi>
          <GoChevronRight onClick={goToProfile} color="gray"/>
        </MyPageNavi>
        <MyPageNavi>
          <MyPageTextNavi>Routine Initialization</MyPageTextNavi> 
          <GoChevronRight onClick={goToRoutineReset} color="gray"/>
        </MyPageNavi>
      </div>
    </div>
  );
};

export default MyPage;
