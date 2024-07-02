import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { IoMdMenu } from 'react-icons/io';
import ShareKakao from '../../api/ShareKakao';
import getRedirectURI from "../../RedirectURI";

const Nav = styled.nav`
  background: #0A0E40;
  color: white;
  position: fixed;
  top: 0;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  z-index: 1000;
`

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

const TitleLink = styled(RouterLink)`
  color: white;
  text-decoration: none;
  margin: 0 10px; 
  cursor: pointer;
  font-weight: bold;
  font-size: 20px;
  &:hover {
    font-size: 22px;
    color: yellow;
  }
`

const Link = styled(RouterLink)`
  color: ${({ $active }) => ($active ? 'yellow' : 'white')};
  text-decoration: none; 
  margin: 0 10px; 
  cursor: pointer;

  &:hover {
    font-size: 1.3vw;
    color: yellow;
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`

const LogoutButton = styled.button`
  color: ${({ $active }) => ($active ? 'yellow' : 'white')};
  background: none;
  border: none;
  margin: 0 10px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;

  &:hover {
    font-size: 1.3vw;
    color: yellow;
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`

const MenuIcon = styled(IoMdMenu)`
  color: white;
  font-size: 6vw;
  margin-right: 20px;
  cursor: pointer;

  @media screen and (min-width: 769px) {
    display: none;
  }
`

const Sidebar = styled.div`
  height: 100%;
  width: ${({ open }) => (open ? '100%' : '0')};
  position: fixed;
  top: 35px;
  right: 0;
  background-color: #0A0E40;
  overflow-x: hidden;
  transition: width 0.5s;
  padding-top: 60px;
  z-index: 1100;

  @media screen and (min-width: 769px) {
    display: none;
  }
`

const SidebarLink = styled(RouterLink)`
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: white;
  display: block;
  transition: 0.3s;

  &:hover {
    color: yellow;
  }
`
const SidebarButton = styled.button`
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: white;
  background: none;
  border: none;
  display: block;
  transition: 0.3s;
  cursor: pointer;

  &:hover {
    color: yellow;
  }

  ${({ $active }) => $active && `
    font-weight: bold;
    color: yellow;
  `}
`
const Navbar = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === 'true';
      setIsLoggedIn(isLoggedIn);
    };

    checkLoginStatus(); 
    window.addEventListener('storage', checkLoginStatus); 

    return () => {
      window.removeEventListener('storage', checkLoginStatus); 
    };
  }, []);

  useEffect(() => {
    const checkLoginStatus = () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === 'true';
      setIsLoggedIn(isLoggedIn);
    };

    checkLoginStatus();
  }, [location]);

  const handleLogout = () => {
    const kakaoRestAPI = import.meta.env.VITE_REST_API;
    const redirectURI = getRedirectURI();
    const kakaoLogoutURL = `https://kauth.kakao.com/oauth/logout?client_id=${kakaoRestAPI}&logout_redirect_uri=${encodeURIComponent(redirectURI)}`;

    localStorage.removeItem("userToken");
    localStorage.removeItem("username");
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    window.dispatchEvent(new Event('storage'));
    window.location.href = kakaoLogoutURL;
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Nav>
      <TitleContainer>
        <TitleLink to="/" $active={location.pathname === '/'}>UMC Movie</TitleLink>
        <ShareKakao/>
      </TitleContainer>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div className="navbar-links">
          {!isLoggedIn ? (
            <>
              <Link to="/login" $active={location.pathname === '/login'}>로그인</Link>
              <Link to="/signup" $active={location.pathname === '/signup'}>회원가입</Link>
            </>
          ) : (
            <LogoutButton $active={false} onClick={handleLogout}>로그아웃</LogoutButton>
          )}
          <Link to="/popular" $active={location.pathname === '/popular'}>Popular</Link>
          <Link to="/nowplaying" $active={location.pathname === '/nowplaying'}>Now Playing</Link>
          <Link to="/toprated" $active={location.pathname === '/toprated'}>Top Rated</Link>
          <Link to="/upcoming" $active={location.pathname === '/upcoming'}>Upcoming</Link>
        </div>
        <MenuIcon onClick={toggleSidebar} />
      </div>
      <Sidebar open={sidebarOpen}>
        <SidebarLink to="/" onClick={toggleSidebar}>UMC Movie</SidebarLink>
        {!isLoggedIn ? (
          <>
            <SidebarLink to="/login" onClick={toggleSidebar} $active={location.pathname === '/login'}>로그인</SidebarLink>
            <SidebarLink to="/signup" onClick={toggleSidebar} $active={location.pathname === '/signup'}>회원가입</SidebarLink>
          </>
        ) : (
          <SidebarButton onClick={handleLogout} $active={false}>로그아웃</SidebarButton>
        )}
        <SidebarLink to="/popular" onClick={toggleSidebar} $active={location.pathname === '/popular'}>Popular</SidebarLink>
        <SidebarLink to="/nowplaying" onClick={toggleSidebar} $active={location.pathname === '/nowplaying'}>Now Playing</SidebarLink>
        <SidebarLink to="/toprated" onClick={toggleSidebar} $active={location.pathname === '/toprated'}>Top Rated</SidebarLink>
        <SidebarLink to="/upcoming" onClick={toggleSidebar} $active={location.pathname === '/upcoming'}>Upcoming</SidebarLink>
      </Sidebar>
    </Nav>
  );
}; 

export default Navbar;
