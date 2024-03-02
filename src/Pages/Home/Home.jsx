import React from "react";
import HomeSection2 from "./HomeComponents/HomeSection2.jsx";
import NavBar from "../Nav/Nav";
import HomeHeader from "./HomeComponents/HomeHeader.jsx";

const Home = () => {

  //토큰 가져오기
  const token = localStorage.getItem('authToken');
  if (!token) {
    return <Login2 />;
  }


  return (
    <div>
      <div className="HomeWrap">
        <NavBar />
        <HomeHeader/>
        <HomeSection2 />
      </div>
    </div>
  );
};

export default Home;
