import React, { useEffect } from "react";
import styles from './Redirection.module.css'
import Header from '../components/commonUse/Header'
import Footer from '../components/commonUse/Footer';

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
  
  return (
    <div>
      <div class="container">
      <Header/>
      <h2 className={styles.loginIng}>로그인 중입니다</h2></div>
      <Footer/>
    </div>
  )
};
export default Redirecion;
