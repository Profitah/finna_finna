import React, { useState, useEffect } from "react";
import { IoTrashSharp } from "react-icons/io5";
import styled from "styled-components";
import axios from "axios";
import Todoselect1 from "./TodoSection1";

const TodoSection2Wrap = styled.div`
  width: 40vw;
  margin-left: 35vw;
  margin-top: 5vh;
  height: auto;
  font-weight: 100; 

  @media all and (min-width: 300px) and (max-width: 1023px) {
    width: 83vw;
    margin-left: 8.5vw;
    font-weight: 100; 
  }
`;

const TodoAddRoutineBtn = styled.button`
  width: 30vw;
  color: #bfbaba;
  border-radius: 20px;
  background-color: inherit;
  border: 0.5px solid #bfbaba;
  height: 7vh;
  font-size: 20px;
  margin-top: 2vw;

  @media all and (min-width: 300px) and (max-width: 1023px) {
    width: 330px;
    height: 70px;
    margin-top: 20px;
  }
`;

const CheckboxContainer = styled.div`
  width: 30vw;
  display: flex;
  margin-top: 4vh;
  border: 0.5px solid #bfbaba;
  border-radius: 20px;

  @media all and (min-width: 300px) and (max-width: 1023px) {
    width: 83vw;
    margin-top: 20px;
  }
`;

const TodoSection2Routine = styled.input`
  background-color: inherit;
  border: none;
  height: 7vh;
  font-size: 20px;
  text-align: center;
  width: 75%;
  padding-top: 2px;
  font-weight: 100;
  outline: none;
  text-decoration: ${({ completed }) => (completed ? "line-through" : "none")};
  text-decoration-thickness: ${({ completed }) =>
    completed ? "1px" : "initial"};
  ::placeholder {
    color: #bfbaba;
  }

  @media all and (min-width: 300px) and (max-width: 1023px) {
    height: 70px;
  }
`;

const TodoDelete = styled.button`
  color: #ed8c37;
  background-color: white;
  border: none;
  height: 7vh;
  width: 15%;
  padding-top: 8px;
  border-radius: 20px;

  @media all and (min-width: 300px) and (max-width: 1023px) {
    padding-top: 15px;
  }
`;

const Check1 = styled.div`
  width: 10%;
  padding-top: 12.5px;
  padding-left: 10px;

  @media all and (min-width: 300px) and (max-width: 1023px) {
    padding-top: 16.5px;
  }
`;

const Checkbox = styled.input`
  display: none;
`;

const CheckboxLabel = styled.label`
  margin-top: 5px;
  margin-left: 5px;
  display: inline-block;
  width: 25px;
  height: 25px;
  border: 1px solid #ed8c37;
  border-radius: 50%;
  position: relative;
  background-color: inherit;

  ${Checkbox}:checked + &::after {
    content: "✔";
    font-size: 23px;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    text-align: center;
    position: absolute;
    left: 0;
    top: 0;
    background-color: #ed8c37;
    color: white;
  } 
`;

const TodoSection2 = ({ selectedTrackId }) => {
  const [routineList, setRoutineList] = useState([]);
  const [inputValues, setInputValues] = useState({});
  const [hasRoutine, setHasRoutine] = useState(false);

  const toggleComplete = async (index) => {
    const routine = routineList[index];
    const token = localStorage.getItem("authToken");
    const routineStatus = routine.completed ? "PROCEEDING" : "COMPLETE";
  
    try {
      const response = await axios.patch(
        `https://dofarming.duckdns.org/api/v1/routine/${routine.routineId}`,
        { routineStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.status === 200) {
        // 서버에 상태 업데이트가 성공한 후에 상태를 변경
        setRoutineList(prevRoutines =>
          prevRoutines.map((r, idx) =>
            idx === index ? { ...r, completed: !r.completed } : r
          )
        );
      } else {
        console.error("루틴 상태 업데이트 실패:", response.statusText);
      }
    } catch (error) {
      console.error("루틴 상태 업데이트 오류:", error);
    }
  };
  
  const handleInputBlur = async (routineId) => {
    const token = localStorage.getItem("authToken");
    const content = inputValues[routineId];
  
    try {
      const response = await axios.post(
        `https://dofarming.duckdns.org/api/v1/routine/${selectedTrackId}`,
        { content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.status === 200) {
        // 서버에 내용 업데이트가 성공한 후에 상태를 변경
        setRoutineList(prevRoutines =>
          prevRoutines.map((r) =>
            r.routineId === routineId ? { ...r, content } : r
          )
        );
      } else {
        console.error("루틴 내용 업데이트 실패:", response.statusText);
      }
    } catch (error) {
      console.error("루틴 내용 업데이트 오류:", error);
    }
  };
  
  const addRoutine = async () => {
    const token = localStorage.getItem("authToken");
    const content = "";

    try {
      const response = await axios.post(
        `https://dofarming.duckdns.org/api/v1/routine/${selectedTrackId}?trackId=${encodeURIComponent(
          selectedTrackId
        )}`,
        { content, routineStatus: "PROCEEDING" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setRoutineList(prevRoutines => [...prevRoutines, response.data]);
      } else {
        console.error("루틴 추가 실패:", response.statusText);
      }
    } catch (error) {
      console.error("루틴 추가 오류:", error);
    }
  };

  const fetchRoutines = async () => {
    const token = localStorage.getItem("authToken");
  
    try {
      const response = await axios.get(
        `https://dofarming.duckdns.org/api/v1/routine/${selectedTrackId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.status === 200) {
        const fetchedRoutines = response.data.map((routine) => ({
          ...routine,
          completed: routine.routineStatus === "COMPLETE",
        }));
  
        // 빈 내용인 루틴을 필터링하여 가져옴
        const nonEmptyRoutines = fetchedRoutines.filter(routine => routine.content.trim() !== '');
  
        setRoutineList(nonEmptyRoutines);
        setInputValues(
          nonEmptyRoutines.reduce((values, routine) => {
            values[routine.routineId] = routine.content;
            return values;
          }, {})
        );
        setHasRoutine(nonEmptyRoutines.length > 0);
      } else {
        console.error("루틴 가져오기 실패:", response.statusText);
      }
    } catch (error) {
      console.error("루틴 가져오기 오류:", error);
    }
  };
  
  const handleInputChange = (routineId, e) => {
    const { value } = e.target;
    setInputValues(prevInputValues => ({
      ...prevInputValues,
      [routineId]: value,
    }));
  };

  const deleteRoutine = async (routineId) => {
    const token = localStorage.getItem("authToken");

    try {
      const response = await axios.delete(
        `https://dofarming.duckdns.org/api/v1/routine/${routineId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 204) {
        setRoutineList(prevRoutines =>
          prevRoutines.filter((routine) => routine.routineId !== routineId)
        );
      } else {
        console.error("루틴 삭제 실패:", response.statusText);
      }
    } catch (error) {
      console.error("루틴 삭제 오류:", error);
    }
  };

  useEffect(() => {
    if (selectedTrackId) {
      fetchRoutines();
    }
  }, [selectedTrackId]);

  return (
  <TodoSection2Wrap style={{ fontWeight: 100 }}>
      {!hasRoutine && <Todoselect1 />}
      {hasRoutine && (
        <>
          {routineList.map((routine, index) => (
            <CheckboxContainer key={index}>
              <Check1>
                <Checkbox
                  id={`checkbox-${index}`}
                  type="checkbox"
                  onChange={() => toggleComplete(index)}
                  checked={routine.completed}
                />
                <CheckboxLabel htmlFor={`checkbox-${index}`} />
              </Check1>
              <TodoSection2Routine
                value={inputValues[routine.routineId] || ""}
                onChange={(e) => handleInputChange(routine.routineId, e)}
                onBlur={() => handleInputBlur(routine.routineId)}
                completed={routine.completed}
              />
              <TodoDelete onClick={() => deleteRoutine(routine.routineId)}>
                <IoTrashSharp />
              </TodoDelete>
            </CheckboxContainer>
          ))}
          <TodoAddRoutineBtn onClick={addRoutine}>
            + Add Routine
          </TodoAddRoutineBtn>
        </>
      )}
    </TodoSection2Wrap>
  );
};

export default TodoSection2;