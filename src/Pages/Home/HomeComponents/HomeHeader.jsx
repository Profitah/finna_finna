import React, { useState, useEffect } from "react";
import styled, { keyframes } from 'styled-components';
import axios from "axios";

const HomeHeaderWrap = styled.div``;

const HomeHeaderContent = styled.div`
  height: 18vh;
  display: flex;
  width: 100%;
  align-items: center;

  @media all and (min-width:768px) and (max-width:3000px) {
    height: 18vh;
    display: flex;
    width: 40vw;
    margin-left: 30vw;
    align-items: center;
  }
`;

const HomeTextBox = styled.div`
  width: 50%;
  padding-left: 5.5vw;

  @media all and (min-width:768px) and (max-width:3000px) {
    padding: 0;
    margin-top: 1vh;
  }
`;

const HelloUser = styled.div`
  font-size: 23px;
  padding-bottom: 7px;
`;

const Fighting = styled.div`
  font-size: 15px;
  line-height: 21px;
  font-weight: 340;
`;

const MoodWrap = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;

  @media all and (min-width:768px) and (max-width:3000px) {
    display: flex;
    justify-content: flex-end;
  }
`;

const Moodlets = styled.div`
  box-shadow: 0 0 13px rgb(0, 0, 0, 0.25);
  width: 122px;
  height: 118px;
  border-radius: 16px;
  cursor: pointer;
  background-size: 70%;
  background-position: center;
  background-repeat: no-repeat;
`;

const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

const ModalContent = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 75%;
  background-color: white;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  border-radius: 20px 20px 0 0;
  animation: ${slideUp} 0.4s ease-out;

  @media all and (min-width:768px) and (max-width:3000px) {
    width: 90%;
    height: 80%;
  }
`;

const CloseModalButton = styled.div`
  height: 5%;
  margin-left: 85vw;
  margin-top: 15px;
  font-size: 25px;
  color: #BFBABA;
`;

const HeaderTxt = styled.div`
  height: 10%;
`;

const HimgWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 60px;
  width: 100%;
  height: 90%;
`;

const ImgWrap = styled.div`
  height: 30%;
  display: flex;
`;

const Div = styled.div`
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  height: 100%;
  width: 30%;
  margin: 0 15px;
`;

const moodToNumber = (mood) => {
  switch (mood) {
    case "HAPPY":
      return 1;
    case "ANGRY":
      return 2;
    case "NERVOUS":
      return 3;
    case "SAD":
      return 4;
    case "EXCITED":
      return 5;
    case "PROUD":
      return 6;
    case "CALM":
      return 7;
    case "DROWSY":
      return 8;
    case "TIRED":
      return 9;
    default:
      return 0;
  }
};

const HomeHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nickname, setNickname] = useState("");
  const [selectedDivImage, setSelectedDivImage] = useState("");
  const token = localStorage.getItem("authToken");

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get("https://dofarming.duckdns.org/api/v1/user", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json" 
        }
      });
      const { nickname, mood } = response.data;
      return { nickname, mood };
    } catch (error) {
      console.error("Error fetching user info:", error);
      return null;
    }
  };
  
  useEffect(() => {
    const getNicknameAndMood = async () => {
      const userData = await fetchUserInfo();
      if (userData) {
        setNickname(userData.nickname);
        setSelectedDivImage(`url("/emotion${moodToNumber(userData.mood)}.png")`);
      }
    };
    getNicknameAndMood();
  }, []);

  const updateMood = async (mood) => {
    try {
      await axios.patch(
        "https://dofarming.duckdns.org/api/v1/user/mood",
        {
          mood: mood
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log("Mood updated successfully:", mood);
      setSelectedDivImage(`url("/emotion${moodToNumber(mood)}.png")`);
    } catch (error) {
      console.error("Error updating mood:", error);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleDivClick = (divNumber, mood) => {
    updateMood(mood);
    closeModal();
  };
  
  return (
    <HomeHeaderWrap>
      <HomeHeaderContent>
        <HomeTextBox>
          <HelloUser id="hello_user">Hello, {nickname}</HelloUser>
          <Fighting id="fighting">
            Let's enjoy the cheerful day!
          </Fighting>
        </HomeTextBox>
        <MoodWrap>
          <Moodlets
            style={{ backgroundImage: selectedDivImage }}
            onClick={openModal}
          ></Moodlets>
        </MoodWrap>
      </HomeHeaderContent>
      {isModalOpen && (
        <ModalOverlay onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseModalButton onClick={closeModal}>x</CloseModalButton>
            <HeaderTxt>
              <div className="hiuser">
                <strong>{nickname}</strong> !
              </div>
              <br />
              <div className="tellme">Let me know how you feel today :)</div>
            </HeaderTxt>
            <HimgWrap>
              <ImgWrap>
                <Div
                  onClick={() => handleDivClick(1, "HAPPY")}
                  style={{ backgroundImage: 'url("/emotion1.png")' }}
                ></Div>
                <Div
                  onClick={() => handleDivClick(2, "ANGRY")}
                  style={{ backgroundImage: 'url("/emotion2.png")' }}
                ></Div>
                <Div
                  onClick={() => handleDivClick(3, "NERVOUS")}
                  style={{ backgroundImage: 'url("/emotion3.png")' }}
                ></Div>
              </ImgWrap>
              <ImgWrap>
                <Div
                  onClick={() => handleDivClick(4, "SAD")}
                  style={{ backgroundImage: 'url("/emotion4.png")' }}
                ></Div>
                <Div
                  onClick={() => handleDivClick(5, "EXCITED")}
                  style={{ backgroundImage: 'url("/emotion5.png")' }}
                ></Div>
                <Div
                  onClick={() => handleDivClick(6, "PROUD")}
                  style={{ backgroundImage: 'url("/emotion6.png")' }}
                ></Div>
              </ImgWrap>
              <ImgWrap>
                <Div
                  onClick={() => handleDivClick(7, "CALM")}
                  style={{ backgroundImage: 'url("/emotion7.png")' }}
                ></Div>
                <Div
                  onClick={() => handleDivClick(8, "DROWSY")}
                  style={{ backgroundImage: 'url("/emotion8.png")' }}
                ></Div>
                <Div
                  onClick={() => handleDivClick(9, "TIRED")}
                  style={{ backgroundImage: 'url("/emotion9.png")' }}
                ></Div>
              </ImgWrap>
            </HimgWrap>
          </ModalContent>
        </ModalOverlay>
      )}
    </HomeHeaderWrap>
  );
};

export default HomeHeader;
