import styled from 'styled-components';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Nav = styled.nav`
  background: #0A0E40;
  color: white;
  position: fixed;
  top: 0;
  width: 100%;
  height: 3vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  z-index: 1000;
`;

const Link = styled(RouterLink)`
  color: ${({ $active }) => ($active ? 'yellow' : 'white')};
  text-decoration: none; 
  margin: 0 10px; 
  cursor: pointer;

  &:hover {
    font-size: 1.3vw;
    color: yellow;
  }
`;

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
`;

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userNickname");
    setIsLoggedIn(false);
    window.dispatchEvent(new Event('storage')); // Trigger storage event
    navigate('/');
  };

  return (
    <Nav>
      <Link to="/" $active={location.pathname === '/'}>UMC Movie</Link>
      <div>
        {!isLoggedIn ? (
          <>
            <Link to="/login" $active={location.pathname === '/login'}>로그인</Link>
            <Link to="/signup" $active={location.pathname === '/signup'}>회원가입</Link>
          </>
        ) : (
          <LogoutButton 
            $active={false} 
            onClick={handleLogout}
          >
            로그아웃
          </LogoutButton>
        )}
        <Link to="/popular" $active={location.pathname === '/popular'}>Popular</Link>
        <Link to="/nowplaying" $active={location.pathname === '/nowplaying'}>Now Playing</Link>
        <Link to="/toprated" $active={location.pathname === '/toprated'}>Top Rated</Link>
        <Link to="/upcoming" $active={location.pathname === '/upcoming'}>Upcoming</Link>
      </div>
    </Nav>
  );
};

export default Navbar;
