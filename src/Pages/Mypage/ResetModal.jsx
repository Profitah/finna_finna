import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ResetModalBackdrop = styled.div`
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-color: rgba(0, 0, 0, 0.2);
display: flex;
justify-content: center;
align-items: center;
z-index: 9999;
`;


const ResetModalBoxContainer = styled.div`
background-color: white;
border-radius: 10px;
text-align: center;
height: auto;
width: 80%;

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

const ResetModalTitle = styled.div`
font-size: 1rem;
margin-bottom: 40px;
margin: 60px;
`;


const ResetModalButton = styled.button`
cursor: pointer;
color: gray;
background-color: white;
border-top: 0.5px solid #BFBABA;
border-right: 0.5px solid #BFBABA;
border-radius: 0 0 0 10px;
width: 50%;
height: auto;
padding: 15px;
border-bottom: none;
border-left: none;

&:hover {
  background-color: #ED8C37;
  color: white;
}
`;

const ResetModalButtonNo = styled.button`
  cursor: pointer;
  color: black;
  background-color: white;
  border-top: 0.5px solid #BFBABA;
  border-radius: 0 0 10px 0;
  width: 50%;
  height: auto;
  padding: 15px;
  border-bottom: none;
  border-left: none;
  border-right: none;
  
  &:hover {
    background-color: #ED8C37;
    color: white;
  }
`;

const ResetModalBox = ({ onConfirm, onClose }) => {
  const [deleting, setDeleting] = useState(false);

  const handleDeleteRoutine = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const apiUrl = "https://dofarming.duckdns.org/api/v1/track"; 
      await axios.delete(apiUrl, {
        headers: {
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${token}`, 
        }
      });

      onConfirm();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ResetModalBackdrop>
      <ResetModalBoxContainer>
        <ResetModalTitle><strong>Initialization</strong><br /> all Routine?</ResetModalTitle>
        <div>
          <Link to="/home">
            <ResetModalButton yes onClick={handleDeleteRoutine}>Yes</ResetModalButton>
          </Link>
          <ResetModalButtonNo onClick={onClose}>No</ResetModalButtonNo>
        </div>
      </ResetModalBoxContainer>
    </ResetModalBackdrop>
  );
};

export default ResetModalBox;
