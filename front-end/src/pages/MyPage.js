import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/commonUse/Header'
import Footer from '../components/commonUse/Footer';
import styles from './MyPage.module.css'

const MyPage = () => {
  const [nickname, setNickname] = useState("Guest")

  return (
    <div>
      <Header/>
        <h1>My Page</h1>
        <h2>{ nickname }님의 마이페이지입니다</h2>
        <Link to="/update" className={ styles.updateBtn }>회원 정보 수정</Link>
        <Link to="/singingAI" className= { styles.singingAI }>AI가 불러주는 노래 들으러 가기</Link>
    </div>
  );
};

export default MyPage;
