import React, { useEffect } from "react";

const Redirecion = () => {
  const searchParams = new URLSearchParams(window.location.search);
  useEffect(() => {
    f1();
  }, []);
  const f1 = async () => {
    const token = searchParams.get("token");
    localStorage.setItem("token", token);

    window.location.replace("/nickNamePage");
  };
  return <h1>로그인 중입니다</h1>;
};
export default Redirecion;
