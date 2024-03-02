import React, { useState } from 'react';
import Modal from './Modal';
import styled from 'styled-components';

const MainBox = styled.div`
    border: 0.2px solid rgb(131, 131, 131);
    border-radius: 20px;
    height: auto;
    text-align: left;
    margin-bottom: 3vh;
    padding-top: 3.5vh;
    display: inline-block;
    width: 48vw;
    padding-left: 2vw;
    margin-left: 25vw;

    @media all and (max-width:1023px) {
      width: 85vw;
      align-items: center;
      padding-left: 5vw;
      margin-bottom: 4vh;
      padding-top: 3vh;
      margin-left:0;
    }
`;

const MTxt1 = styled.div`
    font-size: 1.5rem;
`;

const MTxt2 = styled.div`
    font-size: 0.8rem;
    color: #5B5B5B;
    padding-bottom: 4vh;
    padding-top: 2px;
    @media all and (min-width:1024px) {
      padding-top: 3px;
    }
`;

const Selectbox = styled.div`
    border-radius: 13px;
    background-color: #F7F7F7;
    height: 7vh;
    margin-bottom: 2vh;
    width: 80vw;
    display: flex;
    @media all and (min-width:1024px) {
      width: 45vw;
    }
`;

const Txtbox = styled.div`
    font-size: 20px;
    width: 90%;
    height: 3.8vh;
    margin-left: 20px;
    margin-top: 2.2vh;
    @media all and (min-width:1024px) {
      margin-top: 2vh;
      width: 38vw;
    }
`;

const SelectboxBtn = styled.button`
    color: #595656;
    background-color: #D9D9D9;
    border: none;
    height: 3.8vh;
    border-radius: 20px;
    margin-top: 1.6vh;
    width: 50px;
    cursor: pointer;
    @media all and (max-width:1023px) {
      margin-right: 2vw;
    }
    
`;

export const Depression = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedRoutine, setSelectedRoutine] = useState('');

  const handleAddClick = (routine) => {
    setSelectedRoutine(routine);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <MainBox>
      <MTxt1>
        Ease depression
      </MTxt1>
      <MTxt2>
        Small changes will lead to big changes.
      </MTxt2>
      <Selectbox>
        <Txtbox>Staring at my emotions as they are</Txtbox>
        <SelectboxBtn onClick={() => handleAddClick('Staring at my emotions as they are')}>Add</SelectboxBtn>
      </Selectbox>
      <Selectbox>
        <Txtbox>Writing about today's mood</Txtbox>
        <SelectboxBtn onClick={() => handleAddClick("Writing about today's mood")}>Add</SelectboxBtn>
      </Selectbox>
      <Selectbox>
        <Txtbox>Writing a gratitude journal</Txtbox>
        <SelectboxBtn onClick={() => handleAddClick('Writing a gratitude journal')}>Add</SelectboxBtn>
      </Selectbox>
      <Selectbox>
        <Txtbox>Listening to fav song</Txtbox>
        <SelectboxBtn onClick={() => handleAddClick('Listening to fav song')}>Add</SelectboxBtn>
      </Selectbox>
      <Selectbox>
        <Txtbox>Taking a walk</Txtbox>
        <SelectboxBtn onClick={() => handleAddClick('Taking a walk')}>Add</SelectboxBtn>
      </Selectbox>
      {showModal && <Modal selectedRoutine={selectedRoutine} onClose={handleCloseModal} />}
    </MainBox>
  );
};
