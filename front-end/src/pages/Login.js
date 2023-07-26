import React from "react";

const Login =  () =>{
  
  const GoogleAuthUrl = "http://localhost:8080/oauth2/authorization/google?redirect_uri=http://localhost:3000/oauth/redirect"
  const KakaoAuthUrl = "http://localhost:8080/oauth2/authorization/kakao?redirect_uri=http://localhost:3000/oauth/redirect"

  const handleGoogleLogin = () =>{
    window.location.href = GoogleAuthUrl;
  }
  const handleKakaoLogin = () =>{
    window.location.href = KakaoAuthUrl;
  }

  return (
    <div>
      <h1><a href={GoogleAuthUrl} onClick={handleGoogleLogin}>Google</a></h1>
      <h1><a href={KakaoAuthUrl} onClick={handleKakaoLogin}>Kakao</a></h1>
    </div>
  )
}

export default Login