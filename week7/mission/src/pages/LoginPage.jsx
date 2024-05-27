import { useState } from 'react';
import PageContainer from "../styles/PageStyle";
import styled from "styled-components";
import axios from "axios";

const TitleP = styled.p`
  font-size: 2vw;
  color: white;
  font-weight: bold;
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

const ErrorMsg = styled.span`
  color: red;
  font-size: 1vw;
`

const LoginPage = () => {
  const [formData, setFormData] = useState({
    id: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState({
    idMessage: '',
    passwordMessage: '',
  });

  const checkID = (id) => {
    setFormData(prev => ({ ...prev, id: id }));

    if (!id) {
      setErrorMessage(prev => ({ ...prev, idMessage: "아이디를 입력해주세요!" }));
      return false;
    } else { 
      setErrorMessage(prev => ({ ...prev, idMessage: '' }));
      return true;
    }
  };

  const checkPassword = (password) => {
    setFormData(prev => ({ ...prev, password: password }));
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,12}$/;
    
    if (!password) {
      setErrorMessage(prev => ({ ...prev, passwordMessage: "비밀번호를 입력해주세요!" }));
      return false;
    } else if (password.length < 4) {
      setErrorMessage(prev => ({ ...prev, passwordMessage: "최소 4자리 이상 입력해주세요." }));
      return false;
    } else if (password.length > 12) {
      setErrorMessage(prev => ({ ...prev, passwordMessage: "최대 12자까지 입력 가능합니다." }));
      return false;
    } else if (!passwordRegex.test(password)) {
      setErrorMessage(prev => ({ ...prev, passwordMessage: "비밀번호는 영어, 숫자, 특수문자를 포함해주세요." }));
      return false;
    } else {
      setErrorMessage(prev => ({ ...prev, passwordMessage: '' }));
      return true;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { id, password } = formData;
    if (id && password) {
      try {
        const response = await axios.post(
          "http://localhost:8080/auth/login",
          {
            username: id,
            password: password,
          }
        );

        const { token, username } = response.data;

        if (token) {
          localStorage.setItem("userToken", token);
          localStorage.setItem("userNickname", username);
          window.location.href = "/";
        } else {
          console.log("로그인 실패: ", response.data.message);
        }
      } catch (error) {
        console.log("error: ", error.response.data);
      }
    }
  };

  return (
    <PageContainer>
      <TitleP>로그인 페이지</TitleP>
      <LoginDiv>
        <LoginInput 
          type="text" name="id" placeholder="아이디"
          onChange={(e) => checkID(e.target.value)} />
        {errorMessage.idMessage && <ErrorMsg>{errorMessage.idMessage}</ErrorMsg>}

        <LoginInput 
          type="password" name="password" placeholder="비밀번호"
          onChange={(e) => checkPassword(e.target.value)} />
        {errorMessage.passwordMessage && <ErrorMsg>{errorMessage.passwordMessage}</ErrorMsg>}

        <LoginButton onClick={handleLogin}>로그인</LoginButton>
      </LoginDiv>
    </PageContainer>
  )
}

export default LoginPage;
