import React, { useEffect } from "react";
import axios from "axios";

const Redirecion = () =>{
  const searchParams = new URLSearchParams(window.location.search);
  useEffect(() =>{
    localStorage.clear()
    const token = searchParams.get("token")
    localStorage.setItem("token",token)

    axios.get('http://localhost:8080/api/v1/users',{
      headers: {Authorization: `Bearer ${token}`,},
  }).then(response => console.log(response.data.body.user))
  // 다른 페이지로 이동
  window.location.replace("/")
  },[])
  return(<h1>
    로그인 중입니다
  </h1>)
}
export default Redirecion