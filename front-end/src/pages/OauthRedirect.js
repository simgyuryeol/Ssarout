import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const OauthRedirect = () =>{
  const params = useParams();

  useEffect(() => {
    localStorage.clear();
    localStorage.setItem("token", params.token);
    window.location.replace("/");
  }, []);

  return <>유저프로필</>;
}

export default OauthRedirect