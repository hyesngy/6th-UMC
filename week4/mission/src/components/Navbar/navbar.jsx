import styled from 'styled-components';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useState } from 'react';

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
`

const Link = styled(RouterLink)`
    color: ${({ active }) => (active ? 'yellow' : 'white')};
    text-decoration: none; 
    margin: 0 10px; 
    cursor: pointer;

    &:hover{
      font-size: 1.3vw;
      color: yellow;
    }
`

const Navbar =()=>{
  const [isLogin, setIsLogin] = useState(false);
  const location = useLocation();

  const handleLoginClick= () => {
    setIsLogin(!isLogin);
  };


    return (
        <Nav>
          <Link to="/">UMC Movie</Link>
             <div>
               <Link onClick={handleLoginClick} active={location.pathname === '/'}>
                {isLogin ? '로그아웃' : '로그인'}
               </Link>
                <Link to="/popular" active={location.pathname === '/popular'}>Popular</Link>
                <Link to="/nowplaying" active={location.pathname === '/nowplaying'}>Now Playing</Link>
                <Link to="/toprated" active={location.pathname === '/toprated'}>Top Rated</Link>
                <Link to="/upcoming" active={location.pathname === '/upcoming'}>Upcoming</Link>
            </div>

        </Nav>
    )

}
export default Navbar;