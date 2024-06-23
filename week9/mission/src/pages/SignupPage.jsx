import React, { useState } from 'react';
import PageContainer from "../styles/PageStyle";
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const TitleP = styled.p`
  font-size: 20px;
  color: white;
  font-weight: bold;
`;

const SignUpDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputSignUp = styled.input`
  width: 400px;
  display: flex;
  margin-top: 1.5vw;
  height: 40px;
  background-color: white;
  border: none;
  border-radius: 50px;
  padding: 0 1vw;
  box-sizing: border-box;
  outline: none;

  @media screen and (max-width: 768px) {
    width: 300px;
    margin-top: 20px;
  }

  @media screen and (max-width: 320px) {
    width: 200px;
  }
`;

const ErrorMsg = styled.span`
  color: red;
  font-size: 12px;
`;

const SignUpButton = styled.button`
  margin: 3vw;
  width: 400px;
  height: 40px;
  border: none;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;

    @media screen and (max-width: 768px) {
    width: 300px;
  }

    @media screen and (max-width: 320px) {
    width: 200px;
  }
`;

const LoginDiv = styled.div`
  color: white;
  font-size: 15px;
  margin: 1vw;

  @media screen and (max-width: 768px) {
    font-size: 12px;
    height: 30px;
  }

  @media screen and (max-width: 320px) {
    font-size: 9px;
  }
`;

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    age: '',
    password: '',
    passwordCheck: ''
  });
  const { name, username, email, age, password, passwordCheck } = formData;

  const [errorMessage, setErrorMessage] = useState({
    nameMessage: '',
    usernameMessage: '',
    emailMessage: '',
    ageMessage: '',
    passwordMessage: '',
    passwordCheckMessage: ''
  });

  const checkName = (name) => {
    setFormData(prev => ({ ...prev, name: name }));
    if (!name) {
      setErrorMessage(prev => ({ ...prev, nameMessage: "이름을 입력해주세요!" }));
      return false;
    } else {
      setErrorMessage(prev => ({ ...prev, nameMessage: '' }));
      return true;
    }
  };

  const checkUsername = (username) => {
    setFormData(prev => ({ ...prev, username: username }));
    if (!username) {
      setErrorMessage(prev => ({ ...prev, usernameMessage: "아이디를 입력해주세요!" }));
      return false;
    } else {
      setErrorMessage(prev => ({ ...prev, usernameMessage: '' }));
      return true;
    }
  };

  const checkEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setFormData(prev => ({ ...prev, email: email }));
    if (!email) {
      setErrorMessage(prev => ({ ...prev, emailMessage: "이메일을 입력해주세요!" }));
      return false;
    } else if (!emailRegex.test(email)) {
      setErrorMessage(prev => ({ ...prev, emailMessage: "이메일 형식에 맞게 다시 입력해주세요!" }));
      return false;
    } else {
      setErrorMessage(prev => ({ ...prev, emailMessage: '' }));
      return true;
    }
  };

  const checkAge = (age) => {
    const ageNumber = Number(age);
    setFormData(prev => ({ ...prev, age: ageNumber }));
    if (!ageNumber) {
      setErrorMessage(prev => ({ ...prev, ageMessage: "나이를 입력해주세요!" }));
      return false;
    } else if (isNaN(ageNumber)) {
      setErrorMessage(prev => ({ ...prev, ageMessage: "나이는 숫자로 입력해주세요!" }));
      return false;
    } else if (ageNumber < 0) {
      setErrorMessage(prev => ({ ...prev, ageMessage: "나이는 양수여야 합니다." }));
      return false;
    } else if (!Number.isInteger(ageNumber)) {
      setErrorMessage(prev => ({ ...prev, ageMessage: "나이를 실수로 입력할 수 없습니다." }));
      return false;
    } else if (ageNumber < 19) {
      setErrorMessage(prev => ({ ...prev, ageMessage: "19세 이상만 사용 가능합니다!" }));
      return false;
    } else {
      setErrorMessage(prev => ({ ...prev, ageMessage: '' }));
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

  const checkPasswordCheck = (passwordCheck) => {
    setFormData(prev => ({ ...prev, passwordCheck: passwordCheck }));
    if (passwordCheck !== formData.password) {
      setErrorMessage(prev => ({ ...prev, passwordCheckMessage: "비밀번호가 일치하지 않습니다." }));
      return false;
    } else {
      setErrorMessage(prev => ({ ...prev, passwordCheckMessage: '' }));
      return true;
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const isValidName = checkName(formData.name);
    const isValidUsername = checkUsername(formData.username);
    const isValidEmail = checkEmail(formData.email);
    const isValidAge = checkAge(formData.age);
    const isValidPassword = checkPassword(formData.password);
    const isValidPasswordCheck = checkPasswordCheck(formData.passwordCheck);

    if (isValidName && isValidUsername && isValidEmail && isValidAge && isValidPassword && isValidPasswordCheck) {
      const newUser = {
        name: formData.name,
        email: formData.email,
        age: Number(formData.age),
        username: formData.username,
        password: formData.password,
        passwordCheck: formData.passwordCheck
      };

      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };
        const body = JSON.stringify(newUser);
        console.log('Sending request with body:', newUser);  // 전송 데이터 로그
        const res = await axios.post("http://localhost:8080/auth/signup", body, config);
        console.log(res.data);
        alert('회원가입이 정상적으로 처리되었습니다!');
        navigate('/login');
      } catch (err) {
        if (err.response && err.response.status === 409) {
          navigate('/login');
        } else {
          console.error(err.response?.data || err.message);
        }
      }
    } else {
      console.error('Validation errors:', errorMessage);
    }
  };

  return (
    <PageContainer>
      <TitleP>회원가입 페이지</TitleP>
      <form>
        <SignUpDiv>
          <InputSignUp type='text' name="name" placeholder='이름을 입력해주세요'
            onChange={(e) => checkName(e.target.value)} />
          {errorMessage.nameMessage && <ErrorMsg>{errorMessage.nameMessage}</ErrorMsg>}

          <InputSignUp type='text' name="username" placeholder='아이디를 입력해주세요'
            onChange={(e) => checkUsername(e.target.value)} />
          {errorMessage.usernameMessage && <ErrorMsg>{errorMessage.usernameMessage}</ErrorMsg>}

          <InputSignUp type='email' name="email" placeholder='이메일을 입력해주세요'
            onChange={(e) => checkEmail(e.target.value)} />
          {errorMessage.emailMessage && <ErrorMsg>{errorMessage.emailMessage}</ErrorMsg>}

          <InputSignUp type='text' name="age" placeholder='나이를 입력해주세요'
            onChange={(e) => checkAge(e.target.value)} />
          {errorMessage.ageMessage && <ErrorMsg>{errorMessage.ageMessage}</ErrorMsg>}

          <InputSignUp type='password' name="password" placeholder='비밀번호를 입력해주세요'
            onChange={(e) => checkPassword(e.target.value)} />
          {errorMessage.passwordMessage && <ErrorMsg>{errorMessage.passwordMessage}</ErrorMsg>}

          <InputSignUp type='password' name="passwordCheck" placeholder='비밀번호 확인'
            onChange={(e) => checkPasswordCheck(e.target.value)} />
          {errorMessage.passwordCheckMessage && <ErrorMsg>{errorMessage.passwordCheckMessage}</ErrorMsg>}

          <SignUpButton onClick={handleSignUp}>제출하기</SignUpButton>
        </SignUpDiv>
      </form>

      <LoginDiv>
        이미 아이디가 있으신가요? <Link to="/login">로그인 페이지로 이동하기</Link>
      </LoginDiv>
    </PageContainer>
  );
}

export default SignupPage;
