import React, { useState, useRef, useEffect } from "react";
import styled from 'styled-components';
import NavBar from "../Nav/Nav.jsx";
import axios from "axios";
import myimg from "./eximg.png";

const ProfileWrap = styled.div``;

const ProfileContainer = styled.div`
    margin-left: 10vw;
`;

const ProfileTxt = styled.div`
    font-size: 2rem;
    margin-top: 4vh;
    margin-bottom: 5vh;
`;

const ProfileContent = styled.div`
    width: 50vw;
    margin-left: 15vw;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ProfileimgWrap = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 70%;
    overflow: hidden;
    margin-bottom: 20px;
`;

const Profileimg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`;

const Profileinputnic = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Profilenickname = styled.input`
    border: none;
    background-color: inherit;
    width: 277.5px;
    height: 44.5px;
    border-radius: 15px;
    background-color: #f6f6f6;
    color: #5B5B5B;
    margin: 20px 0;
    padding-left: 25px;
    padding-top: 28px;
    font-size: 20px;
    text-align: center;
    padding: 15px 25px;

    &:focus {
        outline: none;
    }
`;

const Profileinput = styled.div`
    width: 300px;
    height: 52px;
    border-radius: 15px;
    background-color: #f6f6f6;
    color: #5B5B5B;
    margin: 20px 0;
    padding-left: 25px;
    padding-top: 28px;
    font-size: 20px;
`;

const Profilegender = styled.select`
    margin-left: 180px;
    border: none;
    background-color: inherit;
    appearance: none;
    color: #5B5B5B;

    &:focus {
        outline: none;
    }
`;

const Profileage = styled.input`
    margin-left: 180px;
    border: none;
    width: 50px;
    background-color: inherit;
    color: #5B5B5B;

    &:focus {
        outline: none;
    }
`;

const Profilesubmit = styled.button`
    margin-top: 35px;
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
        background-color: #ED8C37;
        color: white;
    }
`;

const Profile = () => {
    // 상태 관리
    const [nickname, setNickname] = useState(""); // 서버에서 사용자 닉네임 가져오기
    const [gender, setGender] = useState(""); //서버에서 사용자 성별 가져오기
    const [age, setAge] = useState(""); //서버에서 사용자 나이 가져오기
    const [profileImageUrl, setProfileImageUrl] = useState(""); // 사용자의 프로필 이미지 URL

    // input 요소에 대한 참조
    const fileInputRef = useRef(null);

    // 닉네임 유효성 검사 함수
    const validateNickname = (input) => {
        // 닉네임은 1자 이상 12자 이하이며, 영어, 한글, 숫자만 포함되어야 함
        const regex = /^[a-zA-Z0-9가-힣]{1,12}$/;
        return regex.test(input);
    };

    // 나이 유효성 검사 함수
    const validateAge = (input) => {
        // 나이는 세 자리 이하이어야 함
        const regex = /^[0-9]{1,3}$/;
        return regex.test(input);
    };

    // 컴포넌트가 마운트될 때 사용자 정보를 가져오는 효과
    useEffect(() => {
      // 서버로부터 사용자 정보를 가져오는 함수 호출
      fetchUserInfo();
  }, []);

    // 컴포넌트가 마운트될 때 사용자 정보를 가져오는 효과
    useEffect(() => {
        // 서버로부터 사용자 정보를 가져오는 함수 호출
        fetchUserInfo();
    }, []);

    // 서버로부터 사용자 정보를 가져오는 함수
    const fetchUserInfo = async () => {
        try {
            // 서버 URL
            const apiUrl = "https://dofarming.duckdns.org/api/v1/user";

            // 로그인 토큰 가져오기
            const token = localStorage.getItem('authToken');

            if (token) {
                // 서버로 GET 요청을 보냄
                const response = await axios.get(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // 응답 데이터에서 사용자 정보 추출하여 상태 업데이트
                const userData = response.data;
                setNickname(userData.nickname);
                setGender(userData.gender);
                setAge(userData.age);
                
                // 사용자의 프로필 이미지 URL 설정
                setProfileImageUrl(userData.profileImageUrl);
            }
        } catch (error) {
            console.error("Error fetching user info:", error);
        }
    };

    // 파일 입력 변경 핸들러
    const handleImageChange = async (e) => {
        const selectedImage = e.target.files[0];

        // FormData 객체 생성
        const formData = new FormData();
        formData.append("multipartFile", selectedImage); // 'multipartFile' 파트에 이미지 추가

        try {
            // 서버 URL
            const imageUrlApiUrl = "https://dofarming.duckdns.org/api/v1/user/image";
            const userInfoApiUrl = "https://dofarming.duckdns.org/api/v1/user";

            // 로그인 토큰 가져오기
            const token = localStorage.getItem('authToken');

            if (token) {
                // 서버로 PUT 요청을 보냄
                await axios.put(imageUrlApiUrl, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    },
                });

                // 이미지 업로드 성공 시 사용자 정보 다시 가져오기
                const response = await axios.get(userInfoApiUrl, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // 응답 데이터에서 사용자 정보 추출하여 상태 업데이트
                const userData = response.data;
                setNickname(userData.nickname);
                setGender(userData.gender);
                setAge(userData.age);
                setProfileImageUrl(userData.profileImageUrl);

                console.log("User profile image uploaded successfully");
            }
        } catch (error) {
            console.error("Error uploading profile image:", error);
        }
    };

    // 커스텀 버튼 클릭 핸들러
    const handleCustomButtonClick = () => {
        fileInputRef.current.click();
    };

    // 사용자 정보를 수정하는 함수
    const updateUserInfo = async () => {
        try {
            // 닉네임 유효성 검사
                if (!validateNickname(nickname)) {
                   alert("Nicknames must be at least 1 to 12 characters, including English, Korean, and numbers, and must not contain special symbols.");
                    return;
                }
    
                // 나이 유효성 검사
                if (!validateAge(age)) {
                    alert("The age must be no more than three digits.");
                    return;
                }
            // 서버 URL
            const apiUrl = "https://dofarming.duckdns.org/api/v1/user/info";

            // 로그인 토큰 가져오기
            const token = localStorage.getItem('authToken');

            if (token) {
                // 서버로 PATCH 요청을 보냄
                const response = await axios.patch(apiUrl, {
                    nickname,
                    gender,
                    age,
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // 수정이 성공하면 메시지 출력
                console.log("User info updated successfully");
                alert("Saved!"); // 저장 성공 시 알림
            }
        } catch (error) {
            console.error("Error updating user info:", error);
        }
    };

    // JSX 반환
    return (
        <ProfileWrap>
            <NavBar />

            <ProfileContainer>
                <ProfileTxt>Profile</ProfileTxt>
                <ProfileContent>
                    {/* 이미지, 닉네임 수정 */}
                    <ProfileimgWrap>
                        <Profileimg
                            onClick={handleCustomButtonClick}
                            src={profileImageUrl || myimg} // 프로필 이미지가 없을 경우 기본 이미지(myimg) 사용
                            alt="Profile"
                        />
                        <div>
                            {/* 숨겨진 파일 입력 */}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                ref={fileInputRef}
                                style={{ display: "none" }}
                            />
                        </div>
                    </ProfileimgWrap>

                    <Profileinputnic>
                        <Profilenickname
                            type="text"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                        />
                    </Profileinputnic>

                    <Profileinput>
                        <label>Sex</label>
                        <Profilegender
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <option value="MALE">Male</option>
                            <option value="FEMALE">Female</option>
                        </Profilegender>
                    </Profileinput>

                    <Profileinput>
                        <label>Age</label>
                        <Profileage
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </Profileinput>
                    <Profilesubmit onClick={updateUserInfo}>
                        Submit
                    </Profilesubmit>
                </ProfileContent>
            </ProfileContainer>
        </ProfileWrap>
    );
};

export default Profile;
