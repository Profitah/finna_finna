import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineUser, AiOutlineMenu } from 'react-icons/ai';
import styled, { keyframes,createGlobalStyle } from 'styled-components';
import LogoImg from './FInna_Logo.png';
import { Link as RouterLink } from 'react-router-dom';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }
`;

const slideDown = keyframes`
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const Nav = styled.div`
  background-color: white;
  border-bottom: ${props => props.isNavVisible ? 'none' : '0.5px solid black'};
  align-items: center;
  text-align: right;
  margin-bottom: 0 auto;
  font-size: 208%;
  height: 30%;
  position: relative;

  @media only screen and (max-width: 479px) {
    text-align:center;
}
`;

const Logo = styled.img`
  vertical-align: left;
  margin-left: 2vw;
  margin-right: 60vw;
  margin-bottom: 1vh;
  width: 15vw;
  height: auto;

  @media only screen and (max-width: 481px) {
    margin-right: 55vw;
    width: 15vw;
  }
  

  @media only screen and (min-width: 481px) {
    margin-right: 65vw;
  }

  @media only screen and (min-width: 769px) {
    margin-right: 70vw;
    width: 8vw;
  }

  @media only screen and (min-width: 1280px) {
    margin-right: 79vw;
    width: 5vw;
  }
`;

const MypageIcon = styled(AiOutlineUser)`
  cursor: pointer;
  padding-top: 3vh;
  padding-bottom: 1.5vh;
  margin-right: 2vw;
`;

const NavIcon = styled(AiOutlineMenu)`
  cursor: pointer;
  padding-top: 3vh;
  padding-bottom: 1.5vh;
  margin-right: 2vw;
  margin-left: 3vw;
`;

const NavMenu = styled.ul`
  position: absolute;
  top: 100%;
  width: 100%;
  z-index: 1;
  animation: ${slideDown} 1s ease-out forwards;
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  background-color: #ED8C37;


  @media only screen and (min-width: 480px) {
        width:100%;
        margin: auto 0;
    }

`;

const NavItem = styled.li`
  text-align: left;
  cursor: pointer;
  font-size: 1.3rem;
  line-height: 2.2em;
  transition: font-size 0.4s ease;
  padding-left: 5.5vw;
  color: white;
  text-decoration: none;

  &:hover {
    background-color: #efad43;
    font-size: 1.7rem;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.4);
  }
`;

const StyledLink = styled(RouterLink)`
  text-decoration: none;
  color: inherit;
`;

const NavBar = () => {
    const [isNavVisible, setIsNavVisible] = useState(false);
    const navigate = useNavigate();
    const navRef = useRef(null); // nav 바 참조 생성

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleClickOutside = (event) => {
        if (navRef.current && !navRef.current.contains(event.target)) {
            setIsNavVisible(false);
        }
    };

    const toggleNav = () => {
        setIsNavVisible(!isNavVisible);
    };

    const handleLogoClick = () => {
        navigate("/");
    };

    const LinktomyPage = () => {
        navigate("/MyPage");
    };

    return (
      <><GlobalStyle /><Nav className={isNavVisible ? 'nav-border' : ''} ref={navRef}>
        <Link to="/home" onClick={handleLogoClick}>
          <Logo src={LogoImg} alt="" />
        </Link>
        <MypageIcon size='24' onClick={LinktomyPage} />
        <NavIcon size='24' onClick={toggleNav} />
        {isNavVisible && (
          <NavMenu>
            <StyledLink to="/home"><NavItem>Home</NavItem></StyledLink>
            <StyledLink to="/routine"><NavItem>Routine</NavItem></StyledLink>
            <StyledLink to="/Map"><NavItem>Find expert</NavItem></StyledLink>
          </NavMenu>
        )}
      </Nav></>
    );
};

export default NavBar;
