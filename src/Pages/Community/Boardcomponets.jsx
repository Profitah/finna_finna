import React from "react";
import styled from "styled-components";
import { TfiPencil } from "react-icons/tfi";
import { Link } from "react-router-dom";

// BoardWrap에 대한 스타일 컴포넌트 정의
const BoardWrap = styled.div`
  /* BoardWrap 스타일링 */
`;

// UserWrite에 대한 스타일 컴포넌트 정의
const UserWrite = styled.div`
  /* UserWrite 스타일링 */
`;

// UserInfoBox에 대한 스타일 컴포넌트 정의
const UserInfoBox = styled.div`
  /* UserInfoBox 스타일링 */
`;

// UserPhotoBox에 대한 스타일 컴포넌트 정의
const UserPhotoBox = styled.div`
  /* UserPhotoBox 스타일링 */
`;

// UserNickname에 대한 스타일 컴포넌트 정의
const UserNickname = styled.div`
  /* UserNickname 스타일링 */
`;

// UserText에 대한 스타일 컴포넌트 정의
const UserText = styled.div`
  /* UserText 스타일링 */
`;

// 글씨 크기를 조정하기 위한 스타일
const HeartBeat = styled.p`
  font-size: 30px;
`;

// BoardBottom에 대한 스타일 컴포넌트 정의
const BoardBottom = styled.p`
  color: grey;
`;

// 마음이 아픈 그대를 위한 스타일
const HeartAche = styled.p`
    padding-top: 10px;  
    font-size: 22px;`;

// 연필 아이콘 스타일
const PencilIcon = styled.span`
  /* 연필 아이콘 스타일 */
`;

const Boardcomponets = () => {
  return (
    <BoardWrap>
      <HeartBeat id="BoardMain">내 마음을 두드리는 공간</HeartBeat>
      <HeartAche id="BoardMiddle">마음이 아픈 그대를 위해</HeartAche>
      <BoardBottom id="BoardBottom">
        <span style={{ color: "grey" }}># 고민노크</span>
        <Link to="/WriteCommunity" id="Go_Wirte">
          <TfiPencil /> 글쓰기
        </Link>
      </BoardBottom>
      <hr />
      <UserWrite>
        <UserInfoBox>
          <UserPhotoBox></UserPhotoBox>
          <UserNickname></UserNickname>
        </UserInfoBox>
        <UserText></UserText>
      </UserWrite>
    </BoardWrap>
  );
};

export default Boardcomponets;
