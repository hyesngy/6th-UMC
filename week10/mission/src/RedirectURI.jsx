const getRedirectURI = () => {
    const hostname = window.location.hostname;

    return hostname === "localhost" ? "http://localhost:5173/login/auth"
    : hostname === "hansung-kakao-login.netlify.app" ? "https://hansung-kakao-login.netlify.app/login/auth"
    : hostname === "main--hansung-kakao-login.netlify.app" ? "https://main--hansung-kakao-login.netlify.app/login/auth"
    : "https://default-url.com/login/auth";
    
  };
  
  export default getRedirectURI;