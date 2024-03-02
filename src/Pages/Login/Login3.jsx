import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 90vh;
  overflow: hidden;
  @media screen and (min-width: 1280px) {
    height: 100vh;
}
`;

const Text1 = styled.p`
  text-align: center;
  font-size: 2.2rem;
  margin: 0 auto;
  padding-top: 3vh;
  width: 90vw;
  font-weight: 400;

  strong {
    font-weight: bolder;
  }
`;

const Options = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: row;
`;

const Option = styled.div`
  width: 40vw;
  height: 12vh;
  background-color: ${props => props.selected ? '#ED8C37' : '#f3f3f3'};
  color: ${props => props.selected ? 'white' : 'black'};
  font-size: 1.3rem;
  font-weight: 600;
  border-radius: 20px;
  text-align: center;
  margin: 1.5vh;
  cursor: pointer;
  flex-basis: 40%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 768px) {
        width: 3vw;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        flex-direction: row;
        align-items: center;
    }
`;

const SelectButton = styled.button`
  padding: 2.3vh;
  font-size: 1.25rem;
  background-color: ${props => props.disabled ? 'grey' : '#ED8C37'};
  color: white;
  border: ${props => props.disabled ? 'grey' : '#ED8C37'};
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  border-radius: 50px;
  margin-bottom: 6vh;
  align-items: center;
  width: 65vw;

  @media (min-width: 768px) {
    width: 250px;
    cursor: pointer;
  }
`;


const Login3 = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const toggleOption = (option) => {
    setSelectedOptions((prevOptions) => {
      if (prevOptions.includes(option)) {
        return prevOptions.filter((selected) => selected !== option);
      } else {
        return [...prevOptions, option];
      }
    });
  };

  const handleButtonClick = async () => {
    const keywords = {};
    selectedOptions.forEach((option, index) => {
      keywords[`keyword${index + 1}`] = option;
    });

    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        return;
      }

      const apiUrl = 'https://dofarming.duckdns.org/api/v1/user/keywords';

      await axios.patch(apiUrl, keywords, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      return;
    }
  };

  const options = [
    'Study',
    'Work life',
    'Love',
    'Relationship',
    'Economic stability',
    'Self-esteem',
    'Future anxiety',
    'Health',
  ];

  return (
    <Container>
      <Text1>
      What’s your <strong>Concerns?</strong>
      </Text1>
      <Options id="options">
        {options.map((option) => (
          <Option
            key={option}
            selected={selectedOptions.includes(option)}
            onClick={() => toggleOption(option)}
          >
            {option}
          </Option>
        ))}
      </Options>

      <Link to="/Login4">
        <SelectButton
          id="SelectclearBtn"
          onClick={handleButtonClick}
          disabled={selectedOptions.length === 0}
        >
          Complete
        </SelectButton>
      </Link>
    </Container>
  );
};

export default Login3;
