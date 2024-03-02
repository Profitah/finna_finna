import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const HomeWrap = styled.div`
  width: 50vw;
  margin-left: 22.5vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HomeBtn = styled.button`
  margin-top: 10vh;
  padding: 2.3vh;
  font-size: 1rem;
  background-color: gray;
  color: white;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  border-radius: 50px;
  width: 200px;
  border: none;

  &:hover {
    background-color: #ed8c37;
    color: white;
  }
`;

const HomeInput = styled.div`
  width: 300px;
  height: 78px;
  border-radius: 15px;
  background-color: #f6f6f6;
  color: #5b5b5b;
  margin: 20px 0;
  padding-left: 25px;
  font-size: 20px;
  display: flex;
  margin-bottom: 5vh;
  align-items: center;
`;

const PackageName = styled.div`
  border-bottom: 1px solid black;
  width: 130px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  margin-top: 5vh;
  margin-bottom: 9vh;
  @media screen and (min-width: 1280px) {
    margin-top: 12vh;
}
`;

const HomeInputBoxName = styled.input`
  width: 130px;
  outline: none;
  border: none;
  background-color: inherit;
  font-size: 15px;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  padding-bottom: 5px;
`;

const HomeInputBox = styled.input`
  outline: none;
  border: none;
  background-color: inherit;
  font-size: 15px;
  display: flex;
  align-items: center;
  text-align: right;
  justify-content: center;
  border-radius: 50px;
  margin-left: 50px;
  width: 180px;
  margin-right: 10px;
  color: #5b5b5b;
`;

const Datename = styled.div`
  width: 100px;
`;

function Home9() {
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [routine, setRoutine] = useState('');
  const [memo, setMemo] = useState('');
  const navigate = useNavigate(); 

  const handleButtonClick = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post(
        'https://dofarming.duckdns.org/api/v1/track',
        {
          content: `${routine}, ${memo}`,
          startDate: dateRange[0].toISOString().substring(0, 10),
          endDate: dateRange[1].toISOString().substring(0, 10),
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        alert('Saved!');
        navigate('/home'); 
      } else {
        alert('Save failed :(');
      }
    } catch (error) {
      console.error(error);
      alert('Save failed :(');
    }
  };

  return (
    <HomeWrap>
      <PackageName>
        <HomeInputBoxName 
          type="text"
          value={routine}
          onChange={(e) => setRoutine(e.target.value)}
          onBlur={() => setRoutine(routine)}
          placeholder='Track name'
        />
      </PackageName>
      <div className='Home9inputWrap'>
        <HomeInput>
          <div>Memo</div>
          <HomeInputBox 
            type="text"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            onBlur={() => setMemo(memo)}
            placeholder='Write memo'
          />
        </HomeInput>
        <HomeInput>
          <Datename>Start date</Datename>
          <HomeInputBox 
            type="date"
            value={dateRange[0].toISOString().substring(0, 10)}
            onChange={(e) => setDateRange([new Date(e.target.value), dateRange[1]])}
          />
        </HomeInput>
        <HomeInput>
          <Datename>End date</Datename>
          <HomeInputBox 
            type="date"
            value={dateRange[1].toISOString().substring(0, 10)}
            onChange={(e) => setDateRange([dateRange[0], new Date(e.target.value)])}
          />
        </HomeInput>
      </div>
      <div className='BtnWrap'>
          <Link to="/home">
              <HomeBtn onClick={handleButtonClick}>Submit</HomeBtn>  
          </Link>    
      </div>
    </HomeWrap>
  );
}

export default Home9;
