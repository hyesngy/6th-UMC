const getRedirectURI = () => {
    const hostname = window.location.hostname;

    return hostname === "localhost" ? "http://localhost:5173/login/auth"
    : hostname === "umc-week10.netlify.app" ? "https://umc-week10.netlify.app/login/auth"
    : hostname === "main--umc-week10.netlify.app" ? "https://main--umc-week10.netlify.app/login/auth"
    : "https://umc-week10.netlify.app/login/auth";
    
  };
  
  export default getRedirectURI;