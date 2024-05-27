import React, {useState} from 'react';
import PageContainer from "../styles/PageStyle";
import styled from 'styled-components';
import { Link,  useNavigate  } from 'react-router-dom';
import axios from "axios";

const TitleP = styled.p`
  font-size: 2vw;
  color: white;
  font-weight: bold;
`
const SignUpDiv = styled.div`
  width: 100%;
  display:flex;
  flex-direction: column;
  justify-content:center;
  align-items: center;
`

const InputSignUp = styled.input`
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

const ErrorMsg = styled.span`
  color: red;
  font-size: 1vw;
`

const SignUpButton = styled.button`
  margin: 3vw;
  width: 400px;
  height: 3vw;
  border: none;
  border-radius: 2.5vw;
  display: flex;
  justify-content: center;
  align-items: center;
`

const LoginDiv = styled.div`
  color: white;
  font-size: 1vw;
  margin: 1vw;
`

const SignupPage =() => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      name: '',
      id: '',
      email: '',
      age: '',
      password: '',
      passwordConfirm:''
    });
    const { name, id, email, age, password, passwordConfirm } = formData;

    const [errorMessage, setErrorMessage] = useState({
      nameMessage: '',
      idMessage: '',
      emailMessage: '',
      ageMessage: '',
      passwordMessage: '',
      passwordConfirmMessage: ''
    });

  const checkName = (name) => {
    setFormData(prev => ({ ...prev, name: name }));

    if (!name) {
      setErrorMessage(prev => ({ ...prev, nameMessage: "이름을 입력해주세요!" }));
      return false;
    }
    else { 
      setErrorMessage(prev => ({ ...prev, nameMessage: '' }));
      return true;
    }
  };

  const checkID = (id) => {
    setFormData(prev => ({ ...prev, id: id }));

    if (!id) {
      setErrorMessage(prev => ({ ...prev, idMessage: "아이디를 입력해주세요!" }));
      return false;
    }
    else { 
      setErrorMessage(prev => ({ ...prev, idMessage: '' }));
      return true;
    }
  };

  const checkEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setFormData(prev => ({ ...prev, email: email }));

    if(!email){
      setErrorMessage(prev => ({ ...prev, emailMessage: "이메일을 입력해주세요!" }));
      return false;
    }
    else if (!emailRegex.test(email)) {
      setErrorMessage(prev => ({ ...prev, emailMessage: "이메일 형식에 맞게 다시 입력해주세요!" }));
      return false;
    } 
    else {
      setErrorMessage(prev => ({ ...prev, emailMessage: '' }));
      return true;
    }
  };

  const checkAge = (age) =>{
    const ageNumber = Number(age);
    setFormData(prev => ({ ...prev, age: ageNumber }));

    if(!ageNumber){
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

  const checkPassword = (password) =>{
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
        setErrorMessage(prev => ({ ...prev, passwordMessage: "비밀번호는 영어, 숫자, 특수문자를 포함해주세요.."}));
        return false;
    } else {
        setErrorMessage(prev => ({ ...prev, passwordMessage: '' }));
        return true;
    }
  };
 
  const checkPasswordConfirm = (passwordConfirm) =>{
    setFormData(prev => ({ ...prev, passwordConfirm: passwordConfirm }));
    if (passwordConfirm !== formData.password) {
      setErrorMessage(prev => ({ ...prev, passwordConfirmMessage: "비밀번호가 일치하지 않습니다." }));
      return false;
    } else {
      setErrorMessage(prev => ({ ...prev, passwordConfirmMessage: '' }));
      return true;
    }
  };

const handleSignUp = async (e) => {
    e.preventDefault();
    if (checkName(formData.name) && checkID(formData.id) && checkEmail(formData.email) && checkAge(formData.age) &&
      checkPassword(formData.password) && checkPasswordConfirm(formData.passwordConfirm)) {
    
    const newUser = {
        age: formData.age,
        id: formData.id,
        checkpassword: formData.passwordConfirm,
        email: formData.email,
        password: formData.password,
        username: formData.name
    };

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const body = JSON.stringify(newUser);
      const res = await axios.post("https://jsonplaceholder.typicode.com/posts", body, config);
      console.log(res.data);
      navigate('/login');  
    } catch (err) {
      if (err.response && err.response.status === 409) {
        navigate('/login');
      } else {
        console.error(err.response.data);
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
              onChange={(e) => checkName(e.target.value)}/>
            {errorMessage.nameMessage && <ErrorMsg>{errorMessage.nameMessage}</ErrorMsg>}

            <InputSignUp type='text' name="id" placeholder='아이디를 입력해주세요' 
              onChange={(e) => checkID(e.target.value)}/>
            {errorMessage.idMessage && <ErrorMsg>{errorMessage.idMessage}</ErrorMsg>}
             
            <InputSignUp type='email' name="email" placeholder='이메일을 입력해주세요' 
              onChange={(e) => checkEmail(e.target.value)}/>
          {errorMessage.emailMessage && <ErrorMsg>{errorMessage.emailMessage}</ErrorMsg>}

            <InputSignUp type='text' name="age" placeholder='나이를 입력해주세요' 
              onChange={(e) => checkAge(e.target.value)}/>
          {errorMessage.ageMessage && <ErrorMsg>{errorMessage.ageMessage}</ErrorMsg>}

            <InputSignUp type='password' name="password" placeholder='비밀번호를 입력해주세요' 
              onChange={(e) => checkPassword(e.target.value)}/>
          {errorMessage.passwordMessage && <ErrorMsg>{errorMessage.passwordMessage}</ErrorMsg>}

            <InputSignUp type='password' name="passwordConfirm" placeholder='비밀번호 확인'
              onChange={(e) => checkPasswordConfirm(e.target.value)}/>
          {errorMessage.passwordConfirmMessage && <ErrorMsg>{errorMessage.passwordConfirmMessage}</ErrorMsg>}

          <SignUpButton onClick={handleSignUp}>제출하기</SignUpButton>
          </SignUpDiv>
        </form>

        <LoginDiv> 
          이미 아이디가 있으신가요? <Link to="/login">로그인 페이지로 이동하기</Link> 
        </LoginDiv>

      </PageContainer>
    )

  }

export default SignupPage;