import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import styled from 'styled-components';
import getRedirectURI from "../RedirectURI";
import kakaoLoginBtn from "../assets/KakaoLogin.png";

const KakaoLoginButton = styled.button`
  padding: 0;
  cursor: pointer;
  width: 400px; 
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 768px) {
    width: 300px;
  }

  @media screen and (max-width: 320px) {
    width: 200px;
  }

  img {
    width: 100%;
    height: auto;
  }
`;

const LoginKakao = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const kakaoRestAPI = import.meta.env.VITE_REST_API;
  const redirectURI = getRedirectURI();
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoRestAPI}&redirect_uri=${encodeURIComponent(redirectURI)}&response_type=code`;

  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  useEffect(() => {
    const code = new URLSearchParams(location.search).get("code");

    const getToken = async (code) => {
      try {
        const response = await axios.post(
          `https://kauth.kakao.com/oauth/token`,
          null,
          {
            params: {
              grant_type: "authorization_code",
              client_id: kakaoRestAPI,
              redirect_uri: redirectURI,
              code,
            },
            headers: {
              "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
            },
          }
        );
        console.log(response.data);
        const { access_token } = response.data;
        localStorage.setItem("kakao_access_token", access_token);

        const userInfo = await axios.get("https://kapi.kakao.com/v2/user/me", {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        console.log(response.data);
        const username = userInfo.data.kakao_account.profile.nickname;
        localStorage.setItem('username', username);
        localStorage.setItem('isLoggedIn', 'true'); // 로그인 상태 저장

        navigate("/");
      } catch (error) {
        console.error("Failed to fetch token or user info", error.response ? error.response.data : error.message);
      }
    };

    if (code) {
      getToken(code);
    }
  }, [location, navigate, kakaoRestAPI, redirectURI]);

  return (
    <KakaoLoginButton onClick={handleLogin}>
      <img src={kakaoLoginBtn} alt="kakaoLoginBtn" />
    </KakaoLoginButton>
  );
};

export default LoginKakao;
