import PageContainer from "../styles/PageStyle";
import styled from "styled-components";

const TitleP = styled.p`
    font-size : 1.5vw;
    font-weight : bold;
    color : white;
`

const LoginDiv = styled.div`
    display: flex;
    flex-direction: column; 
    align-items: center;  
    gap: 10px;             
`

const LoginInput = styled.input`
    width: 400px;
    display:flex;
    margin-top: 1.5vw;
    height: 3vw;
    background-color: white;
    border: none;
    border-radius: 2.5vw;
    padding: 0 1vw;
    box-sizing: border-box;
    outline: none;

`

const LoginButton = styled.button`
    margin: 3vw;
    width: 400px;
    height: 3vw;
    border: none;
    border-radius: 2.5vw;
    display: flex;
    justify-content: center;
    align-items: center;
`

const LoginPage=() => {
    return (
      <PageContainer>
        <TitleP>로그인 페이지</TitleP>
         <LoginDiv>
            <LoginInput type="text" placeholder="아이디" />
            <LoginInput type="password" placeholder="비밀번호" />
            <LoginButton>로그인</LoginButton>
         </LoginDiv>
      </PageContainer>
    )
}

export default LoginPage;