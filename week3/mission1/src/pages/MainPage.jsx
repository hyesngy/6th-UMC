
import styled from 'styled-components';
import { IoSearchCircle } from "react-icons/io5";

const Banner = styled.div`
    width: 100%;
    height: 35vh;
    display: flex;
    background: black;
    color:white;
    justify-content:center;
    align-items: center;
    font-weight: bold;
    font-size: 2vw;
`
const FindMoviediv = styled.div`
    width:100%;
    height:60vh;
    display: flex;
    background: #232649;
    justify-content: center;
    align-items: center;
    flex-direction: column;

`
const Searchdiv = styled.div`
    width:100%;
    display: flex;
    justify-content:center;
    align-items: center;
`
const Titlep = styled.p`
    color: white;
    font-weight: bold;
    font-size: 2vw;
`
const SearchInput = styled.input`
    width: 20vw;
    height: 2.5vw;
    padding: 0 1vw;
    background: white;
    color: black;
    border: none;
    border-radius: 50px;
    font-size: 1vw;
`

const MainPage = () => {
    return (
        <>
            <Banner>환영합니다</Banner>
            <FindMoviediv>
            <Titlep>Find your movies!</Titlep>
            <Searchdiv>
            <SearchInput></SearchInput>
            <IoSearchCircle size="40" color="yellow"/>
            </Searchdiv>
            </FindMoviediv>
            
        </>
    )

}

export default MainPage;