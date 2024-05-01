import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

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
    color: white;          
    text-decoration: none; 
    margin: 0 10px; 
    cursor: pointer;

  &:hover{
    font-size: 1.3vw;
  }
`

const Navbar =()=>{
    return (
        <Nav>
          <Link to="/">UMC Movie</Link>
             <div>
               <Link to="/register">회원가입</Link>
               <Link to="/popular">Popular</Link>
               <Link to="/nowplaying">Now Playing</Link>
               <Link to="/toprated">Top Rated</Link>
               <Link to="/upcoming">Upcoming</Link>
            </div>

        </Nav>
    )

}
export default Navbar;