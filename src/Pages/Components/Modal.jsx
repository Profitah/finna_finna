import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalBox = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
  max-height: 700px;
  box-sizing: border-box;
  width: 70%;
  height: auto;
  position: relative;
  overflow: hidden;
  @media (min-width: 576px) {
    width: 80%;
  }

  @media (min-width: 768px) {
    width: 70%;
  }

  @media (min-width: 992px) {
    width: 50%;
  }

  @media (min-width: 1200px) {
    width: 30%;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5%;
`;

const ModalTitle = styled.h3`
  margin: 0;
  margin: auto;
  padding-top: 13%;
`;

const CloseButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const ModalBody = styled.div`
  margin-bottom: 20px;
`;

const ModalSelect = styled.select`
  width: 100%;
  padding: 10px;
  margin-top: 5%;
  margin-bottom: 15%;
  border-radius: 10px;
  border: none;
  background-color: rgb(232, 232, 232);
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  padding-bottom: 20px;
`;

const BtnAdd = styled.button`
  border: none;
  cursor: pointer;
  background-color: white;
  color: black;
  font-weight: bold;
  flex: 1;

  &:hover {
    color: #ed8c37;
    cursor: pointer;
  }
`;

const Modal = ({ selectedRoutine, onClose }) => {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    const getTracks = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        const response = await fetch('https://dofarming.duckdns.org/api/v1/track', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        });
        const data = await response.json();
        setTracks(data);
      } catch (error) {
        console.error('Error fetching tracks:', error);
      }
    };

    getTracks();
  }, []);

  const handleAddClick = async () => {
    const selectElement = document.querySelector('.modal-select');
    const trackId = selectElement.value;
    const content = selectElement.options[selectElement.selectedIndex].text;
    const authToken = localStorage.getItem('authToken');

    try {
      const response = await fetch(`https://dofarming.duckdns.org/api/v1/routine/${trackId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ content: selectedRoutine }),

      });

      if (response.ok) {
        const responseData = await response.json();
        onClose(); 
        alert('Added!'); 
      } else {
        alert('Failed to add routine :('); 
        onClose(); 
      }
    } catch (error) {
      console.error('Error adding routine:', error);
      alert('Failed to add routine:('); 
      onClose(); 
    }
  };

  return (
    <ModalBackdrop>
      <ModalBox>
        <ModalHeader>
          <ModalTitle>Add to Routine</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <ModalSelect className="modal-select">
            <option value="">Select</option>
            {tracks && tracks.map(track => ( 
              <option key={track.trackId} value={track.trackId}>{track.content.split(',')[0]}</option>
            ))}
          </ModalSelect>
        </ModalBody>
        <ModalFooter>
          <BtnAdd onClick={handleAddClick}>Add</BtnAdd>
          <BtnAdd onClick={onClose}>Close</BtnAdd>
        </ModalFooter>
      </ModalBox>
    </ModalBackdrop>
  );
};

export default Modal;