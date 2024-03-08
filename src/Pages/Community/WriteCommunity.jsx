import React, { useState } from "react";
import styled from "styled-components";
import NavBar from "../Nav/Nav";

const FormContainer = styled.div`
  /* 입력 폼을 감싸는 컨테이너 스타일 */
  margin: 20px;
`;

const InputField = styled.input`
  /* 입력 필드의 스타일 */
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const TextArea = styled.textarea`
  /* 텍스트 영역의 스타일 */
  width: 100%;
  height: 200px;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  /* 버튼의 스타일 */
  background-color: #ED8C37;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  float: right;
`;

const WriteCommunity = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("제목:", title);
    console.log("내용:", content);
  };

  return (
    <div>
        <NavBar />  
      <h2>내 마음을 두드리는 공간</h2>
      <p>마음이 아픈 그대를 위해</p>
      <FormContainer>
          <label htmlFor="content">내용:</label>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p>x</p>
            <p>고민노크</p>
            <Button type="submit">보내기</Button>
          </div>
          <TextArea
            id="content"
            value={content}
            onChange={handleContentChange}
            placeholder="고민이 있다면 작성해주세요.
            작성 시 이런 점을 주의해 주세요!
            - 질문 내용에 개인정보 (실명, 전화번호, 메신저 및 아이디)가 포함되지 않게 해 주세요.)
            - 의료 질문 관련하여 의료인은 SNS 상담을 하지 않고, 신체 사진/동영상을 요구하지 않습니다. 
            악의적인 범죄로 이어질 수 있으니 유의해 주세요. 피해를 입으셨다면, 서비스에 신고, 112 또는 사이버경찰청(www.police.go.kr)으로 신고 부탁드립니다."
          />
        </FormContainer>
    </div>
  );
};

export default WriteCommunity;
