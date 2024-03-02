import styled from 'styled-components';

const Gotoroutine = styled.div`
    display: flex;
    flex-direction: column;
    @media all and (max-width:1023px) {
      margin-left: 2vw;
    }
`;

const GoButton = styled.button`
    border: 0.2px solid rgb(131, 131, 131);
    border-radius: 20px;
    height: 10vh;
    font-size: 1.4rem;
    margin-bottom: 2vh;
    margin-top: 1.5vh;
    font-weight: 100;
    color: black;
    background-color: white;
    text-align: left;
    padding-left: 5vh;
    width:50vw;
    margin-left:25vw;
    @media all and (max-width:1023px) {
      width: 85vw;
      align-items: center;
      display: flex;
      padding-left: 5vw;
      margin-left: 5vw;
    }
`;

export const GoToRoutine = ({ activeBtn, handleMiracleMorningClick, handleDayStartClick, handleCheerfulClick, handleJoggingClick, handleDayEndClick, handleBathClick, handleMeditationClick, handleReadingClick, handleMyselfClick, handleInsomniaClick, handleDepressionClick, handleFamilyClick, handlePmsClick, handleDepression1Click, handleFrustrationClick, handleRestClick}) => (
    <Gotoroutine>
      {activeBtn === 'morning' && (
        <>
          <GoButton onClick={handleMiracleMorningClick}>Miracle morning</GoButton>
          <GoButton onClick={handleDayStartClick}>Beginning of the day</GoButton>
          <GoButton onClick={handleCheerfulClick}>Cheerful morning</GoButton>
          <GoButton onClick={handleJoggingClick}>Refreshing jogging</GoButton>
        </>
      )}
      {activeBtn === 'evening' && (
        <>
          <GoButton onClick={handleDayEndClick}>Wraping up the day</GoButton>
          <GoButton onClick={handleBathClick}>A warm bath</GoButton>
          <GoButton onClick={handleMeditationClick}>Meditation</GoButton>
          <GoButton onClick={handleReadingClick}>Reading before bed</GoButton>
        </>
      )}
      {activeBtn === 'health' && (
        <>
          <GoButton onClick={handleMyselfClick}>Taking care of myself</GoButton>
          <GoButton onClick={handleInsomniaClick}>Overcoming insomnia</GoButton>
          <GoButton onClick={handleDepressionClick}>Ease depression</GoButton>
          <GoButton onClick={handleFamilyClick}>Sharing time with family</GoButton>
        </>
      )}
      {activeBtn === 'mood' && (
        <>
          <GoButton onClick={handlePmsClick}>PMS</GoButton>
          <GoButton onClick={handleDepression1Click}>Ease depression</GoButton>
          <GoButton onClick={handleFrustrationClick}>When you feel discouraged</GoButton>
          <GoButton onClick={handleRestClick}>Rest after work</GoButton>
        </>
      )}
    </Gotoroutine>
  );